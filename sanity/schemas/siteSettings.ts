import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Site Name', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'subTagline', title: 'Sub-tagline', type: 'string' }),
    defineField({ name: 'heroHeadline', title: 'Hero Headline (EN)', type: 'string' }),
    defineField({ name: 'heroThaiHeadline', title: 'Hero Headline (TH)', type: 'string' }),
    defineField({ name: 'heroQuote', title: 'Hero Quote', type: 'string' }),
    defineField({ name: 'contactHandle', title: 'Contact Handle (Social)', type: 'string' }),
    defineField({ name: 'defaultSeoTitle', title: 'Default SEO Title', type: 'string' }),
    defineField({ name: 'defaultSeoDescription', title: 'Default SEO Description', type: 'text' }),
  ],
  preview: {
    select: { title: 'siteName', subtitle: 'tagline' },
  },
});
