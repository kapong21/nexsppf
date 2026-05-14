import { defineField, defineType } from 'sanity';

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string' }),
    defineField({ name: 'answer', title: 'Answer', type: 'text' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Products', value: 'products' },
          { title: 'Warranty', value: 'warranty' },
          { title: 'Dealer', value: 'dealer' },
          { title: 'Care Guide', value: 'care_guide' },
        ],
      },
    }),
    defineField({ name: 'sortOrder', title: 'Sort Order', type: 'number' }),
    defineField({ name: 'includeInFaqSchema', title: 'Include in FAQ schema', type: 'boolean', initialValue: true }),
    defineField({ name: 'isActive', title: 'Active', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'question', subtitle: 'category' },
  },
});
