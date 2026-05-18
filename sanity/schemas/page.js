// Page — editable marketing pages (home, technology, about, faq…)
// Rule: no pricing fields.
export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: R => R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: R => R.required() },
    { name: 'seoTitle', title: 'SEO Title', type: 'string' },
    { name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2 },
    { name: 'ogImage', title: 'OG Image', type: 'image' },
    { name: 'heroImage', title: 'Hero Image', type: 'reference', to: [{ type: 'asset' }] },
    {
      name: 'sections', title: 'Sections', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'sectionType', type: 'string', options: { list: ['hero', 'pillars', 'products', 'comparison', 'quote', 'technology', 'gallery', 'cta', 'faq'] } },
          { name: 'eyebrow', type: 'string' },
          { name: 'title', type: 'string' },
          { name: 'titleTH', type: 'string' },
          { name: 'body', type: 'text' },
          { name: 'bodyTH', type: 'text' },
          { name: 'assets', type: 'array', of: [{ type: 'reference', to: [{ type: 'asset' }] }] },
        ],
      }],
    },
  ],
};
