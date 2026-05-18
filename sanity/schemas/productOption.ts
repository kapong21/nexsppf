import { defineField, defineType } from 'sanity';

export const productOption = defineType({
  name: 'productOption',
  title: 'Product Option',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Product Name', type: 'string' }),
    defineField({ name: 'sku', title: 'SKU', type: 'string' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'productCategory' }],
    }),
    defineField({
      name: 'tier',
      title: 'Tier',
      type: 'string',
      options: {
        list: [
          { title: 'Begin', value: 'begin' },
          { title: 'Prime', value: 'prime' },
          { title: 'Pro', value: 'pro' },
          { title: 'Ultimate', value: 'ultimate' },
          { title: 'Ultimate Carbon Fiber', value: 'ultimate_cf' },
        ],
      },
    }),
    defineField({ name: 'warrantyYears', title: 'Warranty Years', type: 'number' }),
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'thaiDescription', title: 'Thai Description', type: 'text' }),
    defineField({ name: 'badge', title: 'Badge', type: 'string' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
    defineField({ name: 'isActive', title: 'Active', type: 'boolean', initialValue: true }),
    defineField({
      name: 'publicSpecs',
      title: 'Public Specs (comparison rows)',
      description:
        'Spec v5.2 — rendered in ComparisonMatrix and product detail pages. ' +
        'NO PRICE FIELDS allowed (audit-enforced).',
      type: 'object',
      fields: [
        defineField({ name: 'gloss', title: 'Gloss Level', type: 'string' }),
        defineField({ name: 'selfHealing', title: 'Self-Healing', type: 'string' }),
        defineField({ name: 'yellowing', title: 'Yellowing Resistance', type: 'string' }),
        defineField({ name: 'idealUser', title: 'Ideal User', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'sku' },
  },
});
