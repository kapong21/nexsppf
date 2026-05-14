import { defineField, defineType } from 'sanity';

export const imageAsset = defineType({
  name: 'imageAsset',
  title: 'Image Asset',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({
      name: 'context',
      title: 'Usage Context',
      type: 'string',
      options: {
        list: [
          { title: 'Hero', value: 'hero' },
          { title: 'Product', value: 'product' },
          { title: 'Gallery', value: 'gallery' },
          { title: 'Logo', value: 'logo' },
          { title: 'Background', value: 'background' },
        ],
      },
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'alt', media: 'image' },
  },
});
