// DealerApplication — B2B form (private)
export default {
  name: 'dealerApplication',
  title: 'Dealer Application',
  type: 'document',
  fields: [
    { name: 'businessName', title: 'Business Name', type: 'string', validation: R => R.required() },
    { name: 'ownerName', title: 'Owner / Contact Name', type: 'string' },
    { name: 'phone', title: 'Phone', type: 'string', validation: R => R.required() },
    { name: 'line', title: 'LINE ID', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'province', title: 'Province', type: 'string', validation: R => R.required() },
    { name: 'experience', title: 'Experience (years / details)', type: 'text' },
    { name: 'currentServices', title: 'Current Services', type: 'text' },
    { name: 'notes', title: 'Notes', type: 'text' },
    { name: 'status', title: 'Status', type: 'string', options: { list: ['new', 'reviewing', 'approved', 'rejected'] }, initialValue: 'new' },
    { name: 'createdAt', title: 'Created At', type: 'datetime', initialValue: () => new Date().toISOString() },
  ],
};
