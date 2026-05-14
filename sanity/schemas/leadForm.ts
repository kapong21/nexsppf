import { defineField, defineType } from 'sanity';

export const leadForm = defineType({
  name: 'leadForm',
  title: 'Lead / Contact Form Config',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Form Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'submitCta', title: 'Submit CTA', type: 'string' }),
    defineField({ name: 'successMessage', title: 'Success Message', type: 'text' }),
    defineField({ name: 'errorMessage', title: 'Error Message', type: 'text' }),
    defineField({ name: 'pdpaConsentLabel', title: 'PDPA Consent Label', type: 'string' }),
    defineField({ name: 'privacyPolicyHref', title: 'Privacy Policy Href', type: 'string' }),
    defineField({ name: 'fields', title: 'Form Fields', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'requiredFields', title: 'Required Fields', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'customerTypes', title: 'Customer Types', type: 'array', of: [{ type: 'string' }] }),
  ],
  preview: {
    select: { title: 'title' },
  },
});
