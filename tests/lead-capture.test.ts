import { describe, expect, it } from 'vitest';
import {
  InvalidLeadError,
  submitDealerApplication,
  submitLead,
  validateDealerApplication,
  validateLeadInput,
  type DealerApplicationRepository,
  type LeadRepository,
} from '@/lib/lead-capture';

function makeLeadRepository(): LeadRepository {
  return {
    async createLead(input) {
      return {
        id: 'lead-1',
        formType: input.formType,
        status: 'new',
        createdAt: new Date('2026-05-18T00:00:00Z'),
      };
    },
  };
}

function makeDealerRepository(): DealerApplicationRepository {
  return {
    async createDealerApplication() {
      return {
        id: 'dealer-app-1',
        status: 'new',
        createdAt: new Date('2026-05-18T00:00:00Z'),
      };
    },
  };
}

describe('Lead capture — submitLead', () => {
  it('accepts a valid contact lead with phone + consent', async () => {
    const result = await submitLead(
      {
        formType: 'contact',
        name: 'Somchai',
        phone: '081-234-5678',
        province: 'Bangkok',
        consent: true,
      },
      makeLeadRepository(),
    );
    expect(result.id).toBe('lead-1');
    expect(result.formType).toBe('contact');
    expect(result.status).toBe('new');
  });

  it('rejects lead without PDPA consent', async () => {
    await expect(
      submitLead(
        { formType: 'contact', phone: '081-234-5678' } as never,
        makeLeadRepository(),
      ),
    ).rejects.toBeInstanceOf(InvalidLeadError);
  });

  it('rejects lead without phone or email', async () => {
    await expect(
      submitLead(
        { formType: 'contact', name: 'A', consent: true },
        makeLeadRepository(),
      ),
    ).rejects.toBeInstanceOf(InvalidLeadError);
  });

  it('rejects lead with invalid email', async () => {
    try {
      validateLeadInput({ formType: 'quote', email: 'not-an-email', consent: true });
      expect.fail('should have thrown');
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidLeadError);
      expect((e as InvalidLeadError).fieldErrors.email).toBe('invalid_email');
    }
  });

  it('rejects unknown form type', async () => {
    try {
      validateLeadInput({ formType: 'bogus' as never, phone: '081-2345678', consent: true });
      expect.fail('should have thrown');
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidLeadError);
      expect((e as InvalidLeadError).fieldErrors.formType).toBe('invalid_form_type');
    }
  });

  it('trims whitespace and drops empty optional fields', () => {
    const input = validateLeadInput({
      formType: 'quote',
      name: '  Somchai  ',
      phone: '081-2345678',
      line: '   ',
      message: '',
      consent: true,
    });
    expect(input.name).toBe('Somchai');
    expect(input.line).toBeUndefined();
    expect(input.message).toBeUndefined();
  });
});

describe('Lead capture — submitDealerApplication', () => {
  it('accepts a valid dealer application', async () => {
    const result = await submitDealerApplication(
      {
        businessName: 'NEXS Authorized Test',
        phone: '081-234-5678',
        province: 'Bangkok',
        ownerName: 'Owner',
        consent: true,
      },
      makeDealerRepository(),
    );
    expect(result.id).toBe('dealer-app-1');
    expect(result.status).toBe('new');
  });

  it('rejects without businessName or phone or province', () => {
    try {
      validateDealerApplication({ consent: true });
      expect.fail('should have thrown');
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidLeadError);
      const errors = (e as InvalidLeadError).fieldErrors;
      expect(errors.businessName).toBe('required');
      expect(errors.phone).toBe('required');
      expect(errors.province).toBe('required');
    }
  });

  it('rejects without consent', () => {
    try {
      validateDealerApplication({
        businessName: 'X',
        phone: '081-234-5678',
        province: 'Bangkok',
      } as never);
      expect.fail('should have thrown');
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidLeadError);
      expect((e as InvalidLeadError).fieldErrors.consent).toBe('pdpa_consent_required');
    }
  });
});
