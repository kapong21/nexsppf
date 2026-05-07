# Updated Product Requirement Document — nexsppf-web

Last Updated: 2026-05-05T14:53:21+00:00
Owner: Tor S / NEXS admin
Executor: treee-tech-lead
Status: Draft for Product Owner / NEXS review before more implementation

## 1. Product Direction

nexsppf.com must be treated as a complete NEXS PPF product + sales + warranty lifecycle platform, not only a programming task, not only a warranty database, and not only a backend dashboard.

The website must sell the product and build trust before purchase, then support warranty and after-sales after purchase.

The site must support:
1. Information website for customers who do not know NEXS yet.
2. Sales / product website for people interested in buying PPF or becoming a dealer.
3. Warranty / after-sales system for customers, dealers, and admins after purchase.
4. QR serial verification.
5. Digital warranty card.
6. Dealer login.
7. Admin login.
8. Dealer warranty registration.
9. Maintenance record.
10. Lost warranty card / lost QR support.
11. Customer inquiry / lead generation.
12. Claim / inspection request.

## 2. Three-Layer Website Model

nexsppf.com must be designed as 3 layers in one website.

### Layer 1: Public Brand & Information Website

Audience:
- People who do not know NEXS yet.
- Customers researching PPF before purchase.

Goal:
- Explain what NEXS is.
- Explain what PPF is in the NEXS context.
- Show the 4 product groups.
- Build trust.
- Explain QR-based warranty as a trust feature.
- Guide customers to contact, ask for price, or find/request dealer help.

Pages / sections:
- Home
- About NEXS / Why NEXS
- Products
- Warranty Information
- Dealer / Installer Network
- Contact

### Layer 2: Sales / Lead Generation Website

Audience:
- Customers interested in buying.
- Dealers/installers interested in becoming NEXS dealers.

Goal:
- Help customers compare product tiers.
- Help customers choose a suitable product tier.
- Generate lead/contact requests for NEXS/dealer.
- Support dealer application CTA.

Allowed v1 CTA:
- สอบถามราคา
- ติดต่อ Dealer
- ขอคำแนะนำเลือกรุ่น
- สมัครตัวแทนจำหน่าย
- ตรวจสอบบัตรรับประกัน

Important:
- Do not show public price in v1 unless Tor S / NEXS admin approves.
- Do not show dealer price, margin, discount, factory cost, or promotion publicly.

### Layer 3: Warranty / After-sales System

Audience:
- Customers who already bought the product.
- Dealers/installers.
- Admin/support team.

Goal:
- QR verification.
- Digital Warranty Card.
- Dealer warranty registration.
- Maintenance records.
- Lost warranty / lost QR support.
- Inspection request.
- Admin serial/dealer/warranty management.

Pages / sections:
- `/warranty`
- `/r/[serial]`
- `/login`
- `/dealer`
- `/admin`
- `/support/warranty`
- `/support/inspection`

## 3. Brand / Design Direction

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

## 4. Public Claim Rules

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

## 5. Pricing Approval Gate

Pricing is not final approved for public website or dealer rollout.

For v1, public pages must not show:
- public retail installed price
- dealer roll price
- factory cost
- margin
- discount structure
- internal promotion rules
- cost assumptions
- supplier cost
- dealer tier price

Use CTA instead of price:
- สอบถามราคา
- ติดต่อ Dealer
- ตรวจสอบบัตรรับประกัน
- สมัครตัวแทนจำหน่าย

Pricing items requiring Tor S / NEXS admin approval before use:
1. Dealer roll price final for BEGIN / PRIME / PRO / ULTIMATE / PRO 7.5 / PRO 8.5 if separated internally.
2. Retail installed price final for standard size, XL surcharge, and XXL surcharge.
3. Dealer tier discount final for Tier 1, Tier 2, and TOP / ULTIMATE eligibility.
4. Promotion policy for launch promotion, opening bill campaign, training package, and dealer starter package.
5. Dealer-to-customer discount rule:
   - whether dealers may discount to customers
   - allowed discount percentage
   - minimum advertised installed price if any
   - whether discount requires approval
6. Public website pricing rule:
   - v1 must not show public price until approved
   - use CTA instead of price

Visibility rule:
- Public users must not see dealer roll price, factory cost, margin, discount structure, internal promotion rule, cost assumptions, supplier cost, or retail installed price unless approved.
- Dealer users may see only pricing information NEXS admin explicitly allows. v1 does not need dealer pricing if not approved.
- Admin may have pricing policy/config in the future, but pricing must not be hardcoded into public pages.

Implementation rule:
- Pricing content must not be hardcoded into public pages.
- If pricing is added later, it must come from approved config/admin policy and include visibility control for public / dealer / admin.
- For v1, Products page shows product tier, warranty year, positioning, and CTA only.
- For v1, Products page must not show price, discount, promotion, or dealer tier price.

## 6. Public Product Groups

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

## 7. Product Code / QR / Serial Rules

QR format:
`https://nexsppf.com/r/[serial]`

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

## 8. Public Website and Sales Requirements

Public website must answer pre-purchase customer questions:
1. What is NEXS?
2. What NEXS PPF product tiers exist?
3. How are BEGIN / PRIME / PRO / ULTIMATE different?
4. Which tier suits which customer/use case?
5. Why choose NEXS?
6. How does QR Digital Warranty work?
7. How can the customer contact, ask for price, or reach a dealer?
8. How can an installer apply to become a dealer?

Homepage must be a sales + trust page, not only a warranty portal.

Required homepage sections:
1. Hero: NEXS Paint Protection Film / ฟิล์มปกป้องสีรถ NEXS, with CTA to Products, Warranty Check, and Ask for Price.
2. Product Line: BEGIN / PRIME / PRO / ULTIMATE cards with warranty years, positioning, short description, and CTA.
3. Why NEXS: safe trust reasons such as product tier system, QR verification, digital warranty card, dealer workflow, and after-sales support.
4. Digital Warranty System: explain scan QR, warranty status, maintenance summary, and inspection request.
5. For Dealers: explain dealer registration workflow and after-sales workflow; CTA for dealer application and Dealer Login.
6. Contact / Lead Form: collect name, phone, province, interested product, customer type, and message.

Products page must educate and sell:
- Show all 4 public product groups.
- Explain positioning, warranty years, recommended customer/use case, visual color system, and CTA.
- Do not show public price in v1 unless approved.
- Do not show supplier/material/performance claims unless approved.

Dealer public page/section must support both dealer recruitment and login:
- Explain dealer benefits.
- Explain warranty registration workflow.
- Explain after-sales support workflow.
- CTA: สมัครตัวแทนจำหน่าย.
- CTA: Dealer Login.
- Do not show dealer price or margin publicly.

Warranty page must not replace the homepage:
- `/warranty` is for customers who already have serial/QR.
- It should support manual serial check, QR system explanation, lost card support, and inspection request links.

## 9. Core Functional Scope

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

## 10. Digital Warranty Card

The QR landing page `/r/[serial]` must be a Digital Warranty Card, not just a status page.

Statuses:
1. Active
2. Not Registered
3. Invalid / Not Found
4. Expired
5. Suspended / Under Review

Public page must not expose full customer personal data.

## 11. Digital Warranty Lifecycle Workflow

The system must follow the conceptual workflow in `docs/DIGITAL_WARRANTY_CONCEPTUAL_WORKFLOW.md`.

Core principle:
- QR can be scanned at any time.
- QR/serial becomes Active only after an authorized Dealer or Admin registers the real installation.
- Customer self-activation is not allowed.

Required lifecycle:
1. Factory produces film + QR + serial.
2. Factory sends serial list, QR sample, product code, batch, quantity, product tier, production date if available, sample photo, and packing list to NEXS.
3. NEXS Admin imports serials and validates duplicate, malformed serial, unknown model_code, batch, quantity, and QR sample scan.
4. NEXS Admin approves batch; serial status becomes `issued_in_stock`.
5. NEXS assigns serial batch to dealer or keeps stockกลาง.
6. Dealer installs film.
7. Dealer/Admin registers warranty with customer, vehicle, installation, coverage, and optional photo data.
8. Digital Warranty Card becomes Active.
9. Dealer/Admin records maintenance.
10. Customer can submit lost card/lost QR support or inspection request.

Serial status state machine:
- `produced_pending_import`
- `issued_in_stock`
- `assigned_to_dealer`
- `registered_active`
- `suspended`
- `invalid`

Warranty status state machine:
- `not_registered`
- `active`
- `expired`
- `under_review`
- `cancelled`

Important customer scan cases:
- Active: show Digital Warranty Card with PDPA-safe fields.
- Not Registered: serial exists but warranty is not active; show product/serial/status only and provide Contact NEXS / Dealer Login / support CTA.
- Not Found: do not call it fake immediately; allow QR verification support request with photo.
- Not Activated: recommended explicit status when serial/batch is known but not approved/opened yet.

Dealer assignment policy:
- Strict mode blocks registration if serial is not assigned to current dealer.
- Flexible launch mode allows valid unused serial registration but flags admin review.
- Recommendation: use flexible launch mode during launch, then strict mode after operations stabilize.

Protection rules:
- one serial = one active warranty
- no customer self-activation
- no public lookup by phone/license plate
- dealer sees own records only
- public PDPA masking
- admin override requires audit trail
- claim is inspection request, not automatic approval

## 12. Maintenance Requirement

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

## 13. Lost Warranty / Lost QR Support

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

## 14. Claim / Inspection Request

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

## 15. Current POC Assets to Keep

Keep and build on:
- QR serial logic
- dealer/admin role concept
- duplicate serial protection
- PDPA masking guardrails
- product model flexibility
- database foundation
- photo storage POC

## 16. Required Changes Before More Feature Implementation

Before more implementation, create/approve:
1. UX flow for factory/dealer/customer/admin/maintenance/support/inspection
2. sitemap
3. page-by-page requirements
4. wireframe descriptions
5. edge cases
6. risks
7. open decisions for Tor S / NEXS admin

