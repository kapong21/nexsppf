// Lead — PRIVATE form captures (Contact / Quote / Installer)
// Routes to nexsppf channel per Sprint 0 Decision Lock v5.2
export default {
  name: 'lead',
  title: 'Lead',
  type: 'document',
  fields: [
    { name: 'formType', title: 'Form Type', type: 'string', options: { list: ['contact', 'quote', 'installer', 'warranty-support', 'inspection-request'] }, validation: R => R.required() },
    {
      name: 'contactInfo', title: 'Contact Info', type: 'object',
      fields: [
        { name: 'name', type: 'string', title: 'Name' },
        { name: 'phone', type: 'string', title: 'Phone' },
        { name: 'line', type: 'string', title: 'LINE ID' },
        { name: 'email', type: 'string', title: 'Email' },
        { name: 'province', type: 'string', title: 'Province' },
      ],
    },
    { name: 'productInterest', title: 'Product Interest', type: 'string' },
    { name: 'vehicle', title: 'Vehicle', type: 'string' },
    { name: 'serviceLocation', title: 'Service Location', type: 'string' },
    { name: 'message', title: 'Message', type: 'text' },
    { name: 'source', title: 'Source', type: 'string', description: 'page or campaign' },
    { name: 'status', title: 'Status', type: 'string', options: { list: ['new', 'contacted', 'qualified', 'converted', 'closed'] }, initialValue: 'new' },
    { name: 'createdAt', title: 'Created At', type: 'datetime', initialValue: () => new Date().toISOString() },
    { name: 'consentAt', title: 'PDPA Consent At', type: 'datetime' },
  ],
  preview: { select: { title: 'contactInfo.name', subtitle: 'formType' } },
};
