import { defineField, defineType } from 'sanity';

export const productCategory = defineType({
  name: 'productCategory',
  title: 'Product Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      options: {
        list: [
          { title: 'Clear PPF', value: 'clear' },
          { title: 'Matte PPF', value: 'matte' },
          { title: 'Color PPF', value: 'color' },
        ],
      },
    }),
    defineField({ name: 'label', title: 'Display Label', type: 'string' }),
    defineField({ name: 'thaiLabel', title: 'Thai Display Label', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'name' },
  },
});
