// FAQ — schema-ready content
export default {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    { name: 'question', title: 'Question', type: 'string', validation: R => R.required() },
    { name: 'answer', title: 'Answer', type: 'text', validation: R => R.required() },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['general', 'product', 'warranty', 'care', 'dealer', 'contact'] },
    },
    { name: 'usePages', title: 'Use On Pages', type: 'array', of: [{ type: 'string' }] },
    { name: 'sortOrder', title: 'Sort Order', type: 'number' },
  ],
  preview: { select: { title: 'question', subtitle: 'category' } },
};
