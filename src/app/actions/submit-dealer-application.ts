'use server';

import { drizzleDealerApplicationRepository } from '@/db/repositories/leads';
import {
  InvalidLeadError,
  submitDealerApplication as submitDealerApplicationDomain,
  type DealerApplicationRepository,
} from '@/lib/lead-capture';
import { publicFormRateLimiter, type RateLimiter } from '@/lib/rate-limit';
import { safeError } from '@/lib/safe-log';
import { getClientContext } from '@/lib/server-context';

export type SubmitDealerApplicationResult =
  | { ok: true; id: string }
  | { ok: false; errors: Record<string, string> };

function isHoneypotTripped(formData: FormData): boolean {
  const honey = formData.get('website')?.toString().trim();
  return Boolean(honey && honey.length > 0);
}

function makeFakeReceipt(): string {
  return `dup-${Math.random().toString(36).slice(2, 10)}`;
}

export type SubmitDealerApplicationDeps = {
  repository: DealerApplicationRepository;
  rateLimiter: RateLimiter;
  context: { ipAddress?: string; userAgent?: string };
};

export async function submitDealerApplicationActionWithDeps(
  formData: FormData,
  deps: SubmitDealerApplicationDeps,
): Promise<SubmitDealerApplicationResult> {
  if (isHoneypotTripped(formData)) {
    return { ok: true, id: makeFakeReceipt() };
  }

  const rateKey = `${deps.context.ipAddress ?? 'anon'}|dealer`;
  const limit = deps.rateLimiter.check(rateKey);
  if (!limit.allowed) {
    return {
      ok: false,
      errors: { _global: limit.reason === 'too_soon' ? 'too_soon' : 'rate_limited' },
    };
  }

  try {
    const consent = formData.get('consent') === 'on' || formData.get('consent') === 'true';
    const record = await submitDealerApplicationDomain(
      {
        businessName: formData.get('businessName')?.toString() ?? '',
        ownerName: formData.get('ownerName')?.toString(),
        phone: formData.get('phone')?.toString() ?? '',
        line: formData.get('line')?.toString(),
        email: formData.get('email')?.toString(),
        province: formData.get('province')?.toString() ?? '',
        experience: formData.get('experience')?.toString(),
        currentServices: formData.get('currentServices')?.toString(),
        notes: formData.get('notes')?.toString(),
        ipAddress: deps.context.ipAddress,
        userAgent: deps.context.userAgent,
        consent: consent as true,
      },
      deps.repository,
    );
    return { ok: true, id: record.id };
  } catch (e) {
    if (e instanceof InvalidLeadError) {
      return { ok: false, errors: e.fieldErrors };
    }
    safeError('submit-dealer-application', e);
    return { ok: false, errors: { _global: 'unexpected_error' } };
  }
}

export async function submitDealerApplicationAction(
  formData: FormData,
): Promise<SubmitDealerApplicationResult> {
  const context = await getClientContext();
  return submitDealerApplicationActionWithDeps(formData, {
    repository: drizzleDealerApplicationRepository,
    rateLimiter: publicFormRateLimiter,
    context,
  });
}
