'use server';

import { drizzleDealerApplicationRepository } from '@/db/repositories/leads';
import {
  InvalidLeadError,
  submitDealerApplication as submitDealerApplicationDomain,
} from '@/lib/lead-capture';

export type SubmitDealerApplicationResult =
  | { ok: true; id: string }
  | { ok: false; errors: Record<string, string> };

export async function submitDealerApplicationAction(
  formData: FormData,
): Promise<SubmitDealerApplicationResult> {
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
        consent: consent as true,
      },
      drizzleDealerApplicationRepository,
    );
    return { ok: true, id: record.id };
  } catch (e) {
    if (e instanceof InvalidLeadError) {
      return { ok: false, errors: e.fieldErrors };
    }
    return { ok: false, errors: { _global: 'unexpected_error' } };
  }
}
