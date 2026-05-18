// Product — 12 public film options
// RULE: NO price, dealer cost, supplier price, roll price.
export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: R => R.required() },
    { name: 'code', title: 'Code', type: 'string', description: 'Internal code (e.g. CLEAR_PRIME)' },
    { name: 'category', title: 'Category', type: 'reference', to: [{ type: 'productCategory' }] },
    { name: 'tier', title: 'Tier', type: 'string', options: { list: ['Begin', 'Prime', 'Pro', 'Ultimate', 'Ultimate Carbon Fiber'] } },
    { name: 'role', title: 'Role', type: 'string', description: 'e.g. "Entry", "Best Balance", "Flagship"' },
    { name: 'positioning', title: 'Positioning Copy (TH)', type: 'text', rows: 3 },
    { name: 'finish', title: 'Finish', type: 'string' },
    { name: 'warrantyText', title: 'Warranty Text', type: 'string', initialValue: 'Warranty up to 10 years' },
    {
      name: 'publicSpecs', title: 'Public Specs', type: 'object',
      fields: [
        { name: 'gloss', type: 'string', title: 'Gloss Level' },
        { name: 'selfHealing', type: 'string', title: 'Self-Healing' },
        { name: 'yellowing', type: 'string', title: 'Yellowing Resistance' },
        { name: 'idealUser', type: 'string', title: 'Ideal User' },
      ],
    },
    { name: 'cta', title: 'Primary CTA Label', type: 'string', initialValue: 'ขอใบเสนอราคา' },
    { name: 'heroImage', title: 'Hero Image', type: 'reference', to: [{ type: 'asset' }] },
    { name: 'sortOrder', title: 'Sort Order', type: 'number' },
  ],
  // Defensive validation: prevent accidental price/cost fields from being added downstream
  preview: { select: { title: 'name', subtitle: 'tier' } },
};
