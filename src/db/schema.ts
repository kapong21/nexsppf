import { sql } from 'drizzle-orm';
import { boolean, date, index, integer, pgTable, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

export const dealers = pgTable('dealers', {
  id: uuid('id').primaryKey().defaultRandom(),
  dealerName: text('dealer_name').notNull(),
  contactName: text('contact_name'),
  phone: text('phone'),
  email: text('email'),
  address: text('address'),
  province: text('province'),
  dealerTier: text('dealer_tier'),
  status: text('status').notNull().default('active'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').unique(),
  phone: text('phone'),
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull(),
  dealerId: uuid('dealer_id').references(() => dealers.id),
  status: text('status').notNull().default('active'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index('users_dealer_id_idx').on(table.dealerId),
]);

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  modelCode: text('model_code').notNull().unique(),
  productName: text('product_name').notNull(),
  warrantyYears: integer('warranty_years').notNull(),
  publicMvp: boolean('public_mvp').notNull().default(false),
  parentModelCode: text('parent_model_code'),
  status: text('status').notNull().default('active'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const serials = pgTable('serials', {
  id: uuid('id').primaryKey().defaultRandom(),
  serialCode: text('serial_code').notNull(),
  modelCode: text('model_code').notNull().references(() => products.modelCode),
  productId: uuid('product_id').references(() => products.id),
  factoryName: text('factory_name'),
  batchNo: text('batch_no'),
  dealerId: uuid('dealer_id').references(() => dealers.id),
  status: text('status').notNull().default('issued'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  registeredAt: timestamp('registered_at', { withTimezone: true }),
}, (table) => [
  uniqueIndex('serials_serial_code_unique').on(table.serialCode),
  index('serials_dealer_id_idx').on(table.dealerId),
  index('serials_model_code_idx').on(table.modelCode),
]);

export const warranties = pgTable('warranties', {
  id: uuid('id').primaryKey().defaultRandom(),
  serialId: uuid('serial_id').notNull().references(() => serials.id),
  dealerId: uuid('dealer_id').notNull().references(() => dealers.id),
  customerName: text('customer_name').notNull(),
  customerPhone: text('customer_phone').notNull(),
  customerEmail: text('customer_email'),
  carBrand: text('car_brand').notNull(),
  carModel: text('car_model').notNull(),
  carYear: integer('car_year'),
  licensePlate: text('license_plate').notNull(),
  province: text('province'),
  chassisNo: text('chassis_no'),
  installDate: date('install_date').notNull(),
  warrantyStartDate: date('warranty_start_date').notNull(),
  warrantyEndDate: date('warranty_end_date').notNull(),
  coverageType: text('coverage_type').notNull(),
  carSize: text('car_size').notNull(),
  status: text('status').notNull().default('active'),
  notes: text('notes'),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  uniqueIndex('warranties_one_active_per_serial_unique').on(table.serialId).where(sql`${table.status} = 'active'`),
  index('warranties_dealer_id_idx').on(table.dealerId),
  index('warranties_serial_id_idx').on(table.serialId),
]);

export const warrantyPhotos = pgTable('warranty_photos', {
  id: uuid('id').primaryKey().defaultRandom(),
  warrantyId: uuid('warranty_id').notNull().references(() => warranties.id, { onDelete: 'cascade' }),
  photoType: text('photo_type').notNull(),
  fileUrl: text('file_url').notNull(),
  uploadedBy: uuid('uploaded_by').references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index('warranty_photos_warranty_id_idx').on(table.warrantyId),
]);

export const scanLogs = pgTable('scan_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  serialCode: text('serial_code').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  scannedAt: timestamp('scanned_at', { withTimezone: true }).notNull().defaultNow(),
  result: text('result').notNull(),
}, (table) => [
  index('scan_logs_serial_code_idx').on(table.serialCode),
]);

// Public lead submissions — Contact / Quote / Find Installer forms.
// Routes to nexsppf channel per Sprint 0 Decision Lock v5.2.
export const leads = pgTable('leads', {
  id: uuid('id').primaryKey().defaultRandom(),
  formType: text('form_type').notNull(),
  name: text('name'),
  phone: text('phone'),
  line: text('line'),
  email: text('email'),
  province: text('province'),
  vehicle: text('vehicle'),
  productInterest: text('product_interest'),
  contactType: text('contact_type'),
  message: text('message'),
  sourcePage: text('source_page'),
  status: text('status').notNull().default('new'),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  consentAt: timestamp('consent_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index('leads_form_type_idx').on(table.formType),
  index('leads_status_idx').on(table.status),
  index('leads_created_at_idx').on(table.createdAt),
  index('leads_ip_address_idx').on(table.ipAddress),
]);

// B2B dealer applications — For Dealers page.
export const dealerApplications = pgTable('dealer_applications', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessName: text('business_name').notNull(),
  ownerName: text('owner_name'),
  phone: text('phone').notNull(),
  line: text('line'),
  email: text('email'),
  province: text('province').notNull(),
  experience: text('experience'),
  currentServices: text('current_services'),
  notes: text('notes'),
  status: text('status').notNull().default('new'),
  reviewedBy: uuid('reviewed_by').references(() => users.id),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  consentAt: timestamp('consent_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index('dealer_applications_status_idx').on(table.status),
  index('dealer_applications_province_idx').on(table.province),
  index('dealer_applications_created_at_idx').on(table.createdAt),
  index('dealer_applications_ip_address_idx').on(table.ipAddress),
]);
