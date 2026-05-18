import { defineField, defineType } from 'sanity';

// Spec v5.2 — Find Installer feature (Copy Lock v1.2 §7).
// Public lookup of authorized installers / dealers in Thailand.
export const installerLocation = defineType({
  name: 'installerLocation',
  title: 'Installer / Dealer Location',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'province',
      title: 'Province',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: ['BKK', 'Central', 'North', 'NE', 'South', 'East', 'West'],
      },
    }),
    defineField({ name: 'address', title: 'Address', type: 'text' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'lineOA', title: 'LINE OA', type: 'string' }),
    defineField({
      name: 'products',
      title: 'Products Offered',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'productCategory' }] }],
    }),
    defineField({
      name: 'tier',
      title: 'Dealer Tier',
      type: 'string',
      options: {
        list: ['Authorized', 'Pending', 'Premium'],
      },
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'mapUrl',
      title: 'Map URL',
      type: 'url',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'province' },
  },
});
