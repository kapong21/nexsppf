'use client';

import { useState, useTransition } from 'react';
import { submitLeadAction, type SubmitLeadResult } from '@/app/actions/submit-lead';
import { SITE_COPY } from '@/content/site-content';
import { trackEvent } from '@/lib/analytics';

const PRODUCT_INTEREST_OPTIONS = [
  'Not sure / Need recommendation',
  'Clear PPF',
  'Matte PPF',
  'Color PPF',
  'Ultimate Carbon Fiber',
  'Dealer / Installer inquiry',
  'Digital Warranty inquiry',
] as const;

export function ContactLeadForm() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<SubmitLeadResult | null>(null);

  const onSubmit = (formData: FormData) => {
    startTransition(async () => {
      formData.set('formType', 'contact');
      if (typeof window !== 'undefined') {
        formData.set('sourcePage', window.location.pathname);
      }
      const r = await submitLeadAction(formData);
      setResult(r);
      if (r.ok) {
        trackEvent({
          event: 'lead_submit_contact',
          product_interest: formData.get('productInterest')?.toString(),
          source_page: window.location.pathname,
        });
      }
    });
  };

  if (result?.ok) {
    return (
      <div className="form-shell premium-form-shell" role="status" aria-live="polite">
        <h3>ได้รับข้อมูลแล้ว</h3>
        <p>ทีมงาน NEXS หรือตัวแทนจำหน่ายในพื้นที่จะติดต่อกลับโดยเร็วที่สุด</p>
        <p className="muted">Reference: {result.id.slice(0, 8)}</p>
      </div>
    );
  }

  const fieldError = (k: string) =>
    !result?.ok && result?.errors[k] ? <p className="form-error">{result.errors[k]}</p> : null;

  return (
    <form action={onSubmit} className="form-shell premium-form-shell" noValidate>
      <label htmlFor="contact-name">Name <span className="required-mark">*</span></label>
      <input id="contact-name" name="name" placeholder="Your name" required />

      <label htmlFor="contact-phone">Phone <span className="required-mark">*</span></label>
      <input id="contact-phone" name="phone" placeholder="08x-xxx-xxxx" required />
      {fieldError('phone')}

      <label htmlFor="contact-line">LINE ID</label>
      <input id="contact-line" name="line" placeholder="nexsppf or your LINE ID" />

      <label htmlFor="contact-email">Email</label>
      <input id="contact-email" type="email" name="email" placeholder="you@example.com" />
      {fieldError('email')}

      <label htmlFor="contact-province">Province <span className="required-mark">*</span></label>
      <input id="contact-province" name="province" placeholder="Province" required />

      <label htmlFor="contact-car">Vehicle model</label>
      <input id="contact-car" name="vehicle" placeholder="Porsche 911 / Tesla Model Y / etc." />

      <label htmlFor="contact-product">Product interest</label>
      <select id="contact-product" name="productInterest" defaultValue={PRODUCT_INTEREST_OPTIONS[0]}>
        {PRODUCT_INTEREST_OPTIONS.map((option) => <option key={option}>{option}</option>)}
      </select>

      <label htmlFor="contact-type">Contact type <span className="required-mark">*</span></label>
      <select id="contact-type" name="contactType" defaultValue={SITE_COPY.leadForm.customerTypes[0]}>
        {SITE_COPY.leadForm.customerTypes.map((type) => <option key={type}>{type}</option>)}
      </select>

      <label htmlFor="contact-message">Message</label>
      <textarea id="contact-message" name="message" placeholder="Tell us about your vehicle, preferred finish, city, or dealer inquiry" />

      <label className="checkbox-row" htmlFor="contact-pdpa">
        <input id="contact-pdpa" name="consent" type="checkbox" value="true" required />
        <span>{SITE_COPY.leadForm.pdpaConsentLabel} <a href={SITE_COPY.leadForm.privacyPolicyHref}>Privacy Policy</a></span>
      </label>
      {fieldError('consent')}

      <p className="form-note">Required: name, phone, province, contact consent.</p>
      <button className="button primary" type="submit" disabled={pending}>
        {pending ? 'กำลังส่ง...' : SITE_COPY.leadForm.submitCta}
      </button>
      {!result?.ok && result?.errors._global && (
        <p className="form-error">เกิดข้อผิดพลาด กรุณาลองอีกครั้งหรือติดต่อทีมงานโดยตรง</p>
      )}
    </form>
  );
}
