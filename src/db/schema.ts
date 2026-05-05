import { boolean, date, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const dealers = pgTable('dealers', {
  id: uuid('id').primaryKey().defaultRandom(),
  dealerName: text('dealer_name').notNull(),
  status: text('status').notNull().default('active'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  modelCode: text('model_code').notNull().unique(),
  productName: text('product_name').notNull(),
  warrantyYears: integer('warranty_years').notNull(),
  publicMvp: boolean('public_mvp').notNull().default(false),
  status: text('status').notNull().default('active'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const serials = pgTable('serials', {
  id: uuid('id').primaryKey().defaultRandom(),
  serialCode: text('serial_code').notNull(),
  modelCode: text('model_code').notNull(),
  status: text('status').notNull().default('issued'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  registeredAt: timestamp('registered_at', { withTimezone: true }),
});

export const warranties = pgTable('warranties', {
  id: uuid('id').primaryKey().defaultRandom(),
  serialId: uuid('serial_id').notNull(),
  dealerId: uuid('dealer_id').notNull(),
  customerName: text('customer_name').notNull(),
  customerPhone: text('customer_phone').notNull(),
  customerEmail: text('customer_email'),
  carBrand: text('car_brand').notNull(),
  carModel: text('car_model').notNull(),
  licensePlate: text('license_plate').notNull(),
  installDate: date('install_date').notNull(),
  warrantyStartDate: date('warranty_start_date').notNull(),
  warrantyEndDate: date('warranty_end_date').notNull(),
  coverageType: text('coverage_type').notNull(),
  carSize: text('car_size').notNull(),
  status: text('status').notNull().default('active'),
});
