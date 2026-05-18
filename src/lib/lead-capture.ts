// Lead capture domain logic — Contact / Quote / Installer / Dealer Application.
// Repository pattern matches /src/lib/warranty-registration.ts so tests can inject mocks.
//
// Source: Sprint 0 Decision Lock v5.2 — all public lead forms route to nexsppf channel.
// Rule: PUBLIC pricing must not appear on any path that reaches users (audit-enforced).

export type LeadFormType =
  | 'contact'
  | 'quote'
  | 'installer'
  | 'warranty_support'
  | 'inspection_request';

export type LeadInput = {
  formType: LeadFormType;
  name?: string;
  phone?: string;
  line?: string;
  email?: string;
  province?: string;
  vehicle?: string;
  productInterest?: string;
  contactType?: string;
  message?: string;
  sourcePage?: string;
  ipAddress?: string;
  userAgent?: string;
  consent: true;
};

export type LeadRecord = {
  id: string;
  formType: LeadFormType;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
  createdAt: Date;
};

export type LeadRepository = {
  createLead(input: LeadInput): Promise<LeadRecord>;
};

export type DealerApplicationInput = {
  businessName: string;
  ownerName?: string;
  phone: string;
  line?: string;
  email?: string;
  province: string;
  experience?: string;
  currentServices?: string;
  notes?: string;
  ipAddress?: string;
  userAgent?: string;
  consent: true;
};

export type DealerApplicationRecord = {
  id: string;
  status: 'new' | 'reviewing' | 'approved' | 'rejected';
  createdAt: Date;
};

export type DealerApplicationRepository = {
  createDealerApplication(input: DealerApplicationInput): Promise<DealerApplicationRecord>;
};

export class InvalidLeadError extends Error {
  constructor(public readonly fieldErrors: Record<string, string>) {
    super(`Invalid lead input: ${Object.keys(fieldErrors).join(', ')}`);
    this.name = 'InvalidLeadError';
  }
}

// Format-only screen — leaves digit-count check to `isValidPhone`. This way
// the regex stays permissive about Thai conventions ("081-234-5678",
// "+66 81 234 5678", "(02) 123-4567") while obvious garbage like
// "no thanks" still fails.
const PHONE_FORMAT_RE = /^\+?[0-9\-\s()]{8,20}$/;
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const VALID_FORM_TYPES: readonly LeadFormType[] = [
  'contact',
  'quote',
  'installer',
  'warranty_support',
  'inspection_request',
];

function countDigits(s: string): number {
  let n = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    if (c >= 48 && c <= 57) n++;
  }
  return n;
}

export function isValidPhone(s: string): boolean {
  if (!PHONE_FORMAT_RE.test(s)) return false;
  const digits = countDigits(s);
  return digits >= 9 && digits <= 15;
}

function trimOrUndef(v: string | undefined | null): string | undefined {
  if (v == null) return undefined;
  const t = v.trim();
  return t.length === 0 ? undefined : t;
}

export function validateLeadInput(raw: Partial<LeadInput>): LeadInput {
  const errors: Record<string, string> = {};
  const formType = raw.formType;
  if (!formType || !VALID_FORM_TYPES.includes(formType)) {
    errors.formType = 'invalid_form_type';
  }
  const name = trimOrUndef(raw.name);
  const phone = trimOrUndef(raw.phone);
  const email = trimOrUndef(raw.email);

  // PDPA consent is non-negotiable
  if (raw.consent !== true) {
    errors.consent = 'pdpa_consent_required';
  }
  // Need at least one way to contact back: phone or email
  if (!phone && !email) {
    errors.phone = 'phone_or_email_required';
  }
  if (phone && !isValidPhone(phone)) {
    errors.phone = 'invalid_phone';
  }
  if (email && !EMAIL_RE.test(email)) {
    errors.email = 'invalid_email';
  }
  if (Object.keys(errors).length > 0) {
    throw new InvalidLeadError(errors);
  }
  return {
    formType: formType as LeadFormType,
    name,
    phone,
    email,
    line: trimOrUndef(raw.line),
    province: trimOrUndef(raw.province),
    vehicle: trimOrUndef(raw.vehicle),
    productInterest: trimOrUndef(raw.productInterest),
    contactType: trimOrUndef(raw.contactType),
    message: trimOrUndef(raw.message),
    sourcePage: trimOrUndef(raw.sourcePage),
    ipAddress: trimOrUndef(raw.ipAddress),
    userAgent: trimOrUndef(raw.userAgent),
    consent: true,
  };
}

export async function submitLead(
  raw: Partial<LeadInput>,
  repository: LeadRepository,
): Promise<LeadRecord> {
  const input = validateLeadInput(raw);
  return repository.createLead(input);
}

export function validateDealerApplication(raw: Partial<DealerApplicationInput>): DealerApplicationInput {
  const errors: Record<string, string> = {};
  const businessName = trimOrUndef(raw.businessName);
  const phone = trimOrUndef(raw.phone);
  const province = trimOrUndef(raw.province);
  const email = trimOrUndef(raw.email);

  if (!businessName) errors.businessName = 'required';
  if (!phone) errors.phone = 'required';
  else if (!isValidPhone(phone)) errors.phone = 'invalid_phone';
  if (!province) errors.province = 'required';
  if (email && !EMAIL_RE.test(email)) errors.email = 'invalid_email';
  if (raw.consent !== true) errors.consent = 'pdpa_consent_required';

  if (Object.keys(errors).length > 0) {
    throw new InvalidLeadError(errors);
  }
  return {
    businessName: businessName!,
    phone: phone!,
    province: province!,
    ownerName: trimOrUndef(raw.ownerName),
    line: trimOrUndef(raw.line),
    email,
    experience: trimOrUndef(raw.experience),
    currentServices: trimOrUndef(raw.currentServices),
    notes: trimOrUndef(raw.notes),
    ipAddress: trimOrUndef(raw.ipAddress),
    userAgent: trimOrUndef(raw.userAgent),
    consent: true,
  };
}

export async function submitDealerApplication(
  raw: Partial<DealerApplicationInput>,
  repository: DealerApplicationRepository,
): Promise<DealerApplicationRecord> {
  const input = validateDealerApplication(raw);
  return repository.createDealerApplication(input);
}
