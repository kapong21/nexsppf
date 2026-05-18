import { defineField, defineType } from 'sanity';

// Spec v5.2 — generic comparison row, can apply to one or many product options.
// Useful when comparing custom labels (e.g., "Gloss Level") across tiers.
export const productSpec = defineType({
  name: 'productSpec',
  title: 'Product Spec',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label (EN)',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'labelTH',
      title: 'Label (TH)',
      type: 'string',
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
    }),
    defineField({
      name: 'product',
      title: 'Product Option',
      type: 'reference',
      to: [{ type: 'productOption' }],
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'value' },
  },
});
