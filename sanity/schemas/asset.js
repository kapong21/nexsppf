// Asset — images and AI renders
// Mapped to NEXS_Image_Asset_Tracker_v3_1_AI_Render.xlsx
export default {
  name: 'asset',
  title: 'Asset',
  type: 'document',
  fields: [
    { name: 'assetId', title: 'Asset ID', type: 'string', description: 'e.g. HOME-001, CLR-002', validation: R => R.required() },
    { name: 'title', title: 'Title', type: 'string', validation: R => R.required() },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'alt', title: 'Alt Text', type: 'string', validation: R => R.required().error('Alt text required for accessibility') },
    {
      name: 'pageUsage', title: 'Page Usage', type: 'array',
      of: [{ type: 'string' }],
      options: { list: ['home', 'clear-ppf', 'matte-ppf', 'color-ppf', 'technology', 'compare', 'for-dealers', 'about-nexs', 'faq', 'contact', 'warranty', 'global'] },
    },
    { name: 'ratio', title: 'Ratio', type: 'string', options: { list: ['16:9', '4:3', '3:2', '4:5', '3:4', '1:1', 'vector'] } },
    { name: 'sourceType', title: 'Source Type', type: 'string', options: { list: ['AI render (Launch v1)', '3D render', 'Real photo', 'Stock placeholder', 'Vector icon', 'UI screenshot'] } },
    { name: 'priority', title: 'Priority', type: 'string', options: { list: ['P0', 'P1', 'P2'] } },
    { name: 'status', title: 'Status', type: 'string', options: { list: ['To produce', 'In progress', 'Need review', 'Approved', 'Replace later', 'On hold'] } },
    { name: 'owner', title: 'Owner', type: 'string' },
    { name: 'dueDate', title: 'Due Date', type: 'date' },
    { name: 'promptNotes', title: 'Prompt / Shot Notes', type: 'text' },
    { name: 'qaNotes', title: 'QA Notes', type: 'text' },
  ],
  preview: { select: { title: 'assetId', subtitle: 'title', media: 'image' } },
};
