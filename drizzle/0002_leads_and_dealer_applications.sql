-- Spec v5.2 — Lead capture (public forms) + Dealer applications (B2B)
-- Routes all submissions to nexsppf channel per Sprint 0 Decision Lock v5.2.

CREATE TABLE leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type text NOT NULL CHECK (form_type IN ('contact', 'quote', 'installer', 'warranty_support', 'inspection_request')),
  name text,
  phone text,
  line text,
  email text,
  province text,
  vehicle text,
  product_interest text,
  contact_type text,
  message text,
  source_page text,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'closed')),
  consent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX leads_form_type_idx ON leads(form_type);
CREATE INDEX leads_status_idx ON leads(status);
CREATE INDEX leads_created_at_idx ON leads(created_at DESC);

CREATE TABLE dealer_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text NOT NULL,
  owner_name text,
  phone text NOT NULL,
  line text,
  email text,
  province text NOT NULL,
  experience text,
  current_services text,
  notes text,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'approved', 'rejected')),
  reviewed_by uuid REFERENCES users(id),
  consent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX dealer_applications_status_idx ON dealer_applications(status);
CREATE INDEX dealer_applications_province_idx ON dealer_applications(province);
CREATE INDEX dealer_applications_created_at_idx ON dealer_applications(created_at DESC);
