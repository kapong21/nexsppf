'use server';

import { drizzleLeadRepository } from '@/db/repositories/leads';
import {
  InvalidLeadError,
  submitLead as submitLeadDomain,
  type LeadFormType,
  type LeadRepository,
} from '@/lib/lead-capture';
import { publicFormRateLimiter, type RateLimiter } from '@/lib/rate-limit';
import { safeError } from '@/lib/safe-log';
import { getClientContext } from '@/lib/server-context';

export type SubmitLeadResult =
  | { ok: true; id: string }
  | { ok: false; errors: Record<string, string> };

// Honeypot field — the form renders this hidden + tab-disabled. Bots that
// blindly fill every input trip it; we pretend the submission succeeded so
// they don't try a different evasion.
function isHoneypotTripped(formData: FormData): boolean {
  const honey = formData.get('website')?.toString().trim();
  return Boolean(honey && honey.length > 0);
}

function makeFakeReceipt(): string {
  return `dup-${Math.random().toString(36).slice(2, 10)}`;
}

export type SubmitLeadDeps = {
  repository: LeadRepository;
  rateLimiter: RateLimiter;
  context: { ipAddress?: string; userAgent?: string };
};

// Pure implementation — exposed for integration tests so they can pass in
// a fake repository, fake limiter, and synthetic headers without touching
// `next/headers` or Postgres.
export async function submitLeadActionWithDeps(
  formData: FormData,
  deps: SubmitLeadDeps,
): Promise<SubmitLeadResult> {
  if (isHoneypotTripped(formData)) {
    return { ok: true, id: makeFakeReceipt() };
  }

  const formType = (formData.get('formType') ?? 'contact') as LeadFormType;
  const rateKey = `${deps.context.ipAddress ?? 'anon'}|lead|${formType}`;
  const limit = deps.rateLimiter.check(rateKey);
  if (!limit.allowed) {
    return {
      ok: false,
      errors: { _global: limit.reason === 'too_soon' ? 'too_soon' : 'rate_limited' },
    };
  }

  try {
    const consent = formData.get('consent') === 'on' || formData.get('consent') === 'true';
    const lead = await submitLeadDomain(
      {
        formType,
        name: formData.get('name')?.toString(),
        phone: formData.get('phone')?.toString(),
        line: formData.get('line')?.toString(),
        email: formData.get('email')?.toString(),
        province: formData.get('province')?.toString(),
        vehicle: formData.get('vehicle')?.toString(),
        productInterest: formData.get('productInterest')?.toString(),
        contactType: formData.get('contactType')?.toString(),
        message: formData.get('message')?.toString(),
        sourcePage: formData.get('sourcePage')?.toString(),
        ipAddress: deps.context.ipAddress,
        userAgent: deps.context.userAgent,
        consent: consent as true,
      },
      deps.repository,
    );
    return { ok: true, id: lead.id };
  } catch (e) {
    if (e instanceof InvalidLeadError) {
      return { ok: false, errors: e.fieldErrors };
    }
    safeError('submit-lead', e);
    return { ok: false, errors: { _global: 'unexpected_error' } };
  }
}

export async function submitLeadAction(formData: FormData): Promise<SubmitLeadResult> {
  const context = await getClientContext();
  return submitLeadActionWithDeps(formData, {
    repository: drizzleLeadRepository,
    rateLimiter: publicFormRateLimiter,
    context,
  });
}
