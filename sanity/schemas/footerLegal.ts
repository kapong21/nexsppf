import { defineField, defineType } from 'sanity';

export const footerLegal = defineType({
  name: 'footerLegal',
  title: 'Footer / Legal Config',
  type: 'document',
  fields: [
    defineField({ name: 'copyright', title: 'Copyright Text', type: 'string' }),
    defineField({ name: 'companyName', title: 'Company Name', type: 'string' }),
    defineField({
      name: 'footerLinks',
      title: 'Footer Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'Href', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({ name: 'privacyPolicyHref', title: 'Privacy Policy Href', type: 'string' }),
    defineField({ name: 'cookiePolicyText', title: 'Cookie Policy Text', type: 'text' }),
    defineField({ name: 'legalDisclaimer', title: 'Legal Disclaimer', type: 'text' }),
  ],
  preview: {
    select: { title: 'companyName', subtitle: 'copyright' },
  },
});
