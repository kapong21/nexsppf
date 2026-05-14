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
  ],
  preview: {
    select: { title: 'name', subtitle: 'sku' },
  },
});
