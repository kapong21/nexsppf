# Updated Product Requirement Document — nexppf-web

Last Updated: 2026-05-05T11:14:36+00:00
Owner: Tor S / NEXS admin
Executor: treee-tech-lead
Status: Draft for Product Owner / NEXS review before more implementation

## 1. Product Direction

nexppf.com must be treated as a complete NEXS PPF product + warranty lifecycle platform, not only a programming task and not only a warranty database.

The site must support:
1. NEXS PPF product website
2. QR serial verification
3. Digital warranty card
4. Dealer login
5. Admin login
6. Dealer warranty registration
7. Maintenance record
8. Lost warranty card / lost QR support
9. Customer inquiry
10. Claim / inspection request

## 2. Brand / Design Direction

Mood & tone should be close to nexslabs while staying correct for NEXS PPF.

Design mood:
- Premium automotive
- Clean black / white / silver
- Minimal but strong
- Technology + trust
- High contrast
- Mobile-first
- Fast loading
- QR scan page must be very easy to read
- Dealer/Admin must be simple and uncluttered

The website must feel like a premium PPF brand, not a generic shop website and not just a back-office system.

Image direction:
- Selected NEXS-owned assets from nexslabs.com may be used for v1 mood and continuity if NEXS has usage rights.
- Allowed v1 assets include `/nexs-logo.png`, `/images/hero-porsche.jpg`, `/images/installer-hood.jpg`, `/images/nexs-ultimate-box.jpg`, `/images/matte-bmw-full.jpg`, and `/images/matte-bmw-closeup.jpg`.
- Do not reuse nexslabs.com claim copy directly.
- Avoid risky images that imply self-healing, non-yellowing, color PPF, headlight PPF, 1000+ colors, or unapproved optical/performance claims.
- Full image policy is documented in `docs/IMAGE_ASSET_REQUIREMENTS.md`.

## 3. Public Claim Rules

Allowed public claims for now:
- NEXS Paint Protection Film
- QR-based warranty verification
- Professional dealer installation workflow
- Warranty-backed after-sales support
- Digital warranty card
- Product tier names
- Warranty years as defined below

Prohibited until explicitly approved by Tor S / NEXS admin:
- Bayer
- Wanhua
- Covestro
- Lubrizol
- Ashland
- supplier/material claims
- self-healing
- anti-yellowing
- non-yellowing
- chemical resistance
- 1000+ colors
- optical clarity performance claim
- highest quality raw materials
- made in USA
- TPU source claim
- PCU claim
- factory cost
- dealer price
- specific unapproved performance claims

## 4. Public Product Groups

The public website must show 4 product groups.

### BEGIN
- Warranty: 5 years
- Positioning: Entry / Value Protection
- Color direction: Silver / Light Grey / White
- Mood: clean / value / daily protection
- Public text: NEXS BEGIN — Essential paint protection for daily use.
- Thai: ฟิล์มปกป้องสีรถสำหรับการใช้งานประจำวัน คุ้มค่า เข้าถึงง่าย

### PRIME
- Warranty: 6 years
- Positioning: Core / Hero SKU
- Color direction: Graphite / Blue Silver / Premium Grey
- Mood: balanced / trusted / hero product
- Public text: NEXS PRIME — Balanced clarity, protection, and value for everyday premium use.
- Thai: รุ่นหลักของ NEXS สำหรับลูกค้าที่ต้องการความสมดุลระหว่างความใส การปกป้อง และความคุ้มค่า

### PRO
- Warranty: 8 years
- Positioning: Premium Performance
- Color direction: Carbon Black / Red Accent / Dark Red
- Mood: premium performance / aggressive / serious
- Public text: NEXS PRO — Premium-grade paint protection film for higher protection demand.
- Thai: ฟิล์มปกป้องสีรถระดับพรีเมียม สำหรับลูกค้าที่ต้องการการปกป้องที่สูงขึ้น

Important: PRO must be public as a main product group even if it comes from another factory. Internal variants may include PRO 7.5 and PRO 8.5. Public page may group these under one “PRO” card, but system/database must support variants.

### ULTIMATE
- Warranty: 9 years
- Positioning: Flagship / Top-tier
- Color direction: Deep Black / Gold / Platinum
- Mood: flagship / luxury / highest tier
- Public text: NEXS ULTIMATE — Flagship protection for customers who want the highest NEXS tier.
- Thai: ฟิล์มปกป้องสีรถรุ่นสูงสุดของ NEXS สำหรับลูกค้าที่ต้องการตัวเลือกระดับเรือธง

## 5. Product Code / QR / Serial Rules

QR format:
`https://nexppf.com/r/[serial]`

Serial format:
`[model_code]-[factory_serial]`

Model codes:
- B = BEGIN
- P = PRIME
- PRO = PRO
- U = ULTIMATE
- R75 = PRO 7.5 internal variant
- R85 = PRO 8.5 internal variant

Important rules:
- Do not assume model_code is one character.
- Parse model_code from everything before the first hyphen.
- serial_code is the primary identity.
- Do not use full QR URL as primary identity.
- Do not hardcode only 3 products.
- Must support BEGIN / PRIME / PRO / ULTIMATE from the start.

## 6. Core Functional Scope

Public:
- Home
- Products
- Warranty check
- QR landing / Digital warranty card
- Warranty support request
- Claim / inspection request
- Contact

Dealer:
- Login
- Dashboard
- Register warranty
- Search own warranty records
- View registered cars
- Maintenance records
- Profile

Admin:
- Dashboard
- Serial management
- Warranty records
- Dealer management
- Product management
- Maintenance records
- Warranty support requests
- Inspection requests
- Warranty policy
- Export CSV

## 7. Digital Warranty Card

The QR landing page `/r/[serial]` must be a Digital Warranty Card, not just a status page.

Statuses:
1. Active
2. Not Registered
3. Invalid / Not Found
4. Expired
5. Suspended / Under Review

Public page must not expose full customer personal data.

## 8. Maintenance Requirement

The system must support maintenance records per warranty/car.

Maintenance data:
- warranty_id
- maintenance_date
- dealer_id
- performed_by
- maintenance_type
- result/status
- note
- photos optional
- next_recommended_date
- created_at

Maintenance policy must be editable/config-driven where possible. Draft assumptions are not approved final policy:
- BEGIN: 1 time
- PRIME: 1–2 times
- PRO: 2 times
- ULTIMATE: 2 times

Do not show these as final public policy until approved.

## 9. Lost Warranty / Lost QR Support

Public users must not search openly by phone/license plate. Instead, they submit a support request.

URL:
`/support/warranty`

Request collects:
- name
- phone
- license_plate
- car_brand
- car_model
- province
- expected dealer/install shop if known
- approximate install date if known
- optional photo upload
- issue_type
- message

After submit:
- status = pending_review
- Admin/Dealer checks internally
- NEXS contacts customer back
- no warranty details are revealed immediately on public page

## 10. Claim / Inspection Request

URL:
`/support/inspection`

Use wording:
- Request inspection
- แจ้งปัญหา / ขอให้ตรวจสอบ
- Under review
- Pending dealer inspection

Avoid wording:
- Claim approved
- เคลมได้ทันที
- รับประกันแน่นอน
- เปลี่ยนฟรีแน่นอน

Workflow:
1. Customer submits request
2. Status = under_review
3. Admin/Dealer reviews photos
4. Dealer schedules inspection
5. Admin marks need_inspection / approved / rejected / more_info_required
6. Customer is contacted back

## 11. Current POC Assets to Keep

Keep and build on:
- QR serial logic
- dealer/admin role concept
- duplicate serial protection
- PDPA masking guardrails
- product model flexibility
- database foundation
- photo storage POC

## 12. Required Changes Before More Feature Implementation

Before more implementation, create/approve:
1. UX flow for factory/dealer/customer/admin/maintenance/support/inspection
2. sitemap
3. page-by-page requirements
4. wireframe descriptions
5. edge cases
6. risks
7. open decisions for Tor S / NEXS admin

