CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE dealers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dealer_name text NOT NULL,
  contact_name text,
  phone text,
  email text,
  address text,
  province text,
  dealer_tier text,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE,
  phone text,
  password_hash text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'dealer')),
  dealer_id uuid REFERENCES dealers(id),
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model_code text NOT NULL UNIQUE,
  product_name text NOT NULL,
  warranty_years integer NOT NULL CHECK (warranty_years > 0),
  public_mvp boolean NOT NULL DEFAULT false,
  parent_model_code text,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO products (model_code, product_name, warranty_years, public_mvp, parent_model_code, status) VALUES
  ('B', 'BEGIN', 5, true, NULL, 'active'),
  ('P', 'PRIME', 6, true, NULL, 'active'),
  ('PRO', 'PRO', 8, true, NULL, 'active'),
  ('R75', 'PRO 7.5', 8, false, 'PRO', 'active'),
  ('R85', 'PRO 8.5', 8, false, 'PRO', 'active'),
  ('U', 'ULTIMATE', 9, true, NULL, 'active');

CREATE TABLE serials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  serial_code text NOT NULL,
  model_code text NOT NULL REFERENCES products(model_code),
  product_id uuid REFERENCES products(id),
  factory_name text,
  batch_no text,
  dealer_id uuid REFERENCES dealers(id),
  status text NOT NULL DEFAULT 'issued' CHECK (status IN ('issued', 'assigned', 'registered', 'suspended', 'invalid')),
  created_at timestamptz NOT NULL DEFAULT now(),
  registered_at timestamptz
);

CREATE UNIQUE INDEX serials_serial_code_unique ON serials (serial_code);

CREATE TABLE warranties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  serial_id uuid NOT NULL REFERENCES serials(id),
  dealer_id uuid NOT NULL REFERENCES dealers(id),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text,
  car_brand text NOT NULL,
  car_model text NOT NULL,
  car_year integer,
  license_plate text NOT NULL,
  province text,
  chassis_no text,
  install_date date NOT NULL,
  warranty_start_date date NOT NULL,
  warranty_end_date date NOT NULL,
  coverage_type text NOT NULL,
  car_size text NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('pending', 'active', 'expired', 'cancelled')),
  notes text,
  created_by uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX warranties_one_active_per_serial_unique
  ON warranties (serial_id)
  WHERE status = 'active';

CREATE TABLE warranty_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  warranty_id uuid NOT NULL REFERENCES warranties(id) ON DELETE CASCADE,
  photo_type text NOT NULL,
  file_url text NOT NULL,
  uploaded_by uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE scan_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  serial_code text NOT NULL,
  ip_address inet,
  user_agent text,
  scanned_at timestamptz NOT NULL DEFAULT now(),
  result text NOT NULL
);
