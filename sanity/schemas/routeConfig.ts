import { defineField, defineType } from 'sanity';

export const routeConfig = defineType({
  name: 'routeConfig',
  title: 'Route Config',
  type: 'document',
  fields: [
    defineField({ name: 'path', title: 'Route Path', type: 'string' }),
    defineField({ name: 'label', title: 'Label', type: 'string' }),
    defineField({
      name: 'pageRef',
      title: 'Page Reference',
      type: 'reference',
      to: [{ type: 'page' }],
    }),
    defineField({ name: 'redirectTo', title: 'Redirect To', type: 'string' }),
    defineField({
      name: 'redirectType',
      title: 'Redirect Type',
      type: 'string',
      options: { list: [{ title: 'Permanent (301)', value: 'permanent' }, { title: 'Temporary (302)', value: 'temporary' }] },
    }),
    defineField({ name: 'isActive', title: 'Active', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'path', subtitle: 'label' },
  },
});
