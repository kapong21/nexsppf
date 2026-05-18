// ProductSpec — Public comparison rows
export default {
  name: 'productSpec',
  title: 'Product Spec',
  type: 'document',
  fields: [
    { name: 'label', title: 'Label (EN)', type: 'string', validation: R => R.required() },
    { name: 'labelTH', title: 'Label (TH)', type: 'string' },
    { name: 'value', title: 'Value', type: 'string' },
    { name: 'product', title: 'Product', type: 'reference', to: [{ type: 'product' }] },
    { name: 'sortOrder', title: 'Sort Order', type: 'number' },
  ],
};
