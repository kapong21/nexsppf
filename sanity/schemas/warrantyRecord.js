// WarrantyRecord — Digital Warranty Card (NEXS differentiator)
// Public read with PDPA masking; private write/admin only.
export default {
  name: 'warrantyRecord',
  title: 'Warranty Record',
  type: 'document',
  fields: [
    { name: 'serial', title: 'Serial Number', type: 'string', validation: R => R.required(), description: 'Unique product serial used for QR lookup' },
    { name: 'status', title: 'Status', type: 'string', options: { list: ['active', 'not-registered', 'invalid', 'expired'] }, initialValue: 'not-registered' },
    { name: 'product', title: 'Product', type: 'reference', to: [{ type: 'product' }] },
    { name: 'warrantyYears', title: 'Warranty Years', type: 'number' },
    {
      name: 'vehicle', title: 'Vehicle', type: 'object',
      fields: [
        { name: 'model', type: 'string', title: 'Model / Type' },
        { name: 'color', type: 'string', title: 'Color' },
        { name: 'plate', type: 'string', title: 'License Plate (will be masked on public view)' },
      ],
    },
    { name: 'dealer', title: 'Dealer', type: 'reference', to: [{ type: 'installerLocation' }] },
    { name: 'installDate', title: 'Install Date', type: 'date' },
    { name: 'expiryDate', title: 'Expiry Date', type: 'date' },
    { name: 'careTimeline', title: 'Care Timeline', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'date', type: 'date' },
          { name: 'title', type: 'string' },
          { name: 'by', type: 'string' },
          { name: 'notes', type: 'text' },
        ],
      }],
    },
    { name: 'createdAt', title: 'Created At', type: 'datetime', initialValue: () => new Date().toISOString() },
  ],
  preview: { select: { title: 'serial', subtitle: 'status' } },
};
