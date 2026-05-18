// BlogPost — future resources / care guide / installation articles
export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: R => R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: R => R.required() },
    { name: 'excerpt', title: 'Excerpt', type: 'text' },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
    { name: 'seoTitle', title: 'SEO Title', type: 'string' },
    { name: 'seoDescription', title: 'SEO Description', type: 'text' },
    { name: 'coverImage', title: 'Cover Image', type: 'reference', to: [{ type: 'asset' }] },
    { name: 'publishedAt', title: 'Published At', type: 'datetime' },
    { name: 'category', title: 'Category', type: 'string', options: { list: ['Care Guide', 'Installation', 'Technology', 'Press', 'News'] } },
  ],
};
