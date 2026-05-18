// ProductCategory — Clear / Matte / Color grouping
export default {
  name: 'productCategory',
  title: 'Product Category',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: R => R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: R => R.required() },
    { name: 'code', title: 'Code', type: 'string', options: { list: ['CLEAR', 'MATTE', 'COLOR'] } },
    { name: 'tagline', title: 'Tagline', type: 'string' },
    { name: 'taglineTH', title: 'Tagline (TH)', type: 'string' },
    { name: 'homepageCopy', title: 'Homepage Copy (TH)', type: 'text' },
    { name: 'heroImage', title: 'Hero Image', type: 'reference', to: [{ type: 'asset' }] },
    { name: 'products', title: 'Products', type: 'array', of: [{ type: 'reference', to: [{ type: 'product' }] }] },
    { name: 'faqs', title: 'FAQs', type: 'array', of: [{ type: 'reference', to: [{ type: 'faq' }] }] },
    { name: 'sortOrder', title: 'Sort Order', type: 'number' },
  ],
  preview: { select: { title: 'name', subtitle: 'code' } },
};
