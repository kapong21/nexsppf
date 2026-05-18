'use server';

import { drizzleLeadRepository } from '@/db/repositories/leads';
import {
  InvalidLeadError,
  submitLead as submitLeadDomain,
  type LeadFormType,
} from '@/lib/lead-capture';

export type SubmitLeadResult =
  | { ok: true; id: string }
  | { ok: false; errors: Record<string, string> };

export async function submitLeadAction(formData: FormData): Promise<SubmitLeadResult> {
  try {
    const formType = (formData.get('formType') ?? 'contact') as LeadFormType;
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
        consent: consent as true,
      },
      drizzleLeadRepository,
    );
    return { ok: true, id: lead.id };
  } catch (e) {
    if (e instanceof InvalidLeadError) {
      return { ok: false, errors: e.fieldErrors };
    }
    return { ok: false, errors: { _global: 'unexpected_error' } };
  }
}
