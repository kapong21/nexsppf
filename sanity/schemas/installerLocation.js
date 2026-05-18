// InstallerLocation — find installer / authorized dealer
export default {
  name: 'installerLocation',
  title: 'Installer / Dealer Location',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: R => R.required() },
    { name: 'province', title: 'Province', type: 'string', validation: R => R.required() },
    { name: 'region', title: 'Region', type: 'string', options: { list: ['BKK', 'Central', 'North', 'NE', 'South', 'East', 'West'] } },
    { name: 'address', title: 'Address', type: 'text' },
    { name: 'phone', title: 'Phone', type: 'string' },
    { name: 'line', title: 'LINE OA', type: 'string' },
    { name: 'products', title: 'Products Offered', type: 'array', of: [{ type: 'reference', to: [{ type: 'productCategory' }] }] },
    { name: 'active', title: 'Active', type: 'boolean', initialValue: true },
    { name: 'tier', title: 'Dealer Tier', type: 'string', options: { list: ['Authorized', 'Pending', 'Premium'] } },
  ],
};
