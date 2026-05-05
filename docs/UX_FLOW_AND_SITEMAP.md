# UX Flows, Sitemap, Page Requirements, and Wireframe Descriptions — nexppf-web

Last Updated: 2026-05-05T11:14:36+00:00
Status: Draft for review before more implementation

## 1. Sitemap

### Public
- `/` Home
- `/products` Product page
- `/warranty` Warranty check
- `/r/[serial]` QR landing / Digital warranty card
- `/support/warranty` Lost warranty / lost QR support request
- `/support/inspection` Claim / inspection request
- `/contact` Contact

Image usage v1:
- Home: `/images/hero-porsche.jpg`, `/images/installer-hood.jpg`, `/images/nexs-ultimate-box.jpg`
- Products: product cards + color system for BEGIN/PRIME/PRO/ULTIMATE; optional mood/detail image `/images/matte-bmw-full.jpg` or `/images/matte-bmw-closeup.jpg`
- Warranty: `/images/nexs-ultimate-box.jpg` or packaging/sticker visual + QR/Digital Warranty Card mockup slot
- Digital Warranty Card: `/nexs-logo.png`, minimal images, mobile-readable status first
- Dealer/Login/Maintenance: `/images/installer-hood.jpg` where useful
- Admin/Dealer dashboard: logo and theme only, minimal heavy imagery

Full image policy: `docs/IMAGE_ASSET_REQUIREMENTS.md`.

### Login
- `/login` Dealer/Admin login

### Dealer
- `/dealer` Dashboard
- `/dealer/register-warranty`
- `/dealer/warranties`
- `/dealer/maintenance`
- `/dealer/profile`

### Admin
- `/admin` Dashboard
- `/admin/serials`
- `/admin/warranties`
- `/admin/dealers`
- `/admin/products`
- `/admin/maintenance`
- `/admin/support-requests`
- `/admin/inspection-requests`
- `/admin/policy`

## 2. UX Flow — Factory

1. Factory prepares serial list and QR samples.
2. Factory sends NEXS:
   - serial list
   - QR sample
   - product model code
   - batch number
   - quantity
   - SKU/product tier
   - production date if available
   - sticker sample/photo
   - CSV serial file if available
3. NEXS Admin imports serial list through dry-run.
4. System validates duplicate serial, model_code, malformed values, batch.
5. NEXS Admin tests scan QR sample.
6. NEXS Admin approves before mass printing.
7. After goods arrive, NEXS randomly scans QR samples again.

## 3. UX Flow — Dealer

1. Dealer logs in.
2. Dealer opens Register New Warranty.
3. Dealer scans QR or enters serial.
4. System auto-detects product from model_code.
5. Dealer fills customer info.
6. Dealer fills vehicle info.
7. Dealer fills installation info.
8. Dealer uploads optional photos.
9. Dealer submits.
10. System validates serial exists, is not registered, and belongs to this dealer if assigned.
11. Warranty becomes Active.
12. Customer scans QR and sees Digital Warranty Card.

Dealer can see:
- own records only
- registered cars
- warranty status
- maintenance history
- maintenance remaining
- next recommended maintenance date
- search by serial / license plate / phone / customer name

Dealer must not see:
- other dealer records
- factory cost
- dealer price
- supplier data
- admin-only internal note
- full system-wide data unless admin grants exception

## 4. UX Flow — Customer

Customer does not need login.

Customer can:
1. Scan QR from warranty card / door sticker / roll sticker.
2. Enter serial manually on `/warranty`.
3. Submit support request if warranty card/QR is lost.
4. Submit inspection request if there is a film concern.

Customer QR page can show:
- warranty status
- product series
- serial number
- vehicle
- masked license plate if needed
- install date
- warranty expiry date
- dealer / installer
- maintenance used / remaining
- last maintenance date
- next recommended maintenance date
- contact dealer button
- request inspection button
- lost warranty / QR support button
- film care guide button

Customer must not see:
- full phone number
- email
- chassis number
- full customer personal data
- internal notes
- price/cost
- dealer price
- factory cost
- supplier/material info

## 5. UX Flow — Maintenance

1. Dealer/Admin opens maintenance record for a warranty/car.
2. Dealer/Admin adds maintenance record.
3. Record includes maintenance type, result/status, note, photos optional, next recommended date.
4. Customer QR page updates maintenance used/remaining/last/next info.
5. Admin can edit/cancel incorrect records.
6. Admin can add special maintenance allowance or handle cross-dealer cases.

Maintenance types:
- Film condition check
- Edge inspection / edge correction
- Stain / mark inspection
- Peeling / lifting inspection
- Basic care / cleaning guidance
- Claim inspection

Maintenance statuses:
- scheduled
- completed
- no_show
- rejected
- under_review

## 6. UX Flow — Lost Warranty / Lost QR

1. Customer opens `/support/warranty`.
2. Customer submits name, phone, license plate, vehicle, province, expected dealer if known, approximate install date if known, optional photo, issue type, message.
3. System creates support request with `pending_review`.
4. Public page confirms request received but does not reveal warranty details.
5. Admin/Dealer checks internally.
6. NEXS contacts customer back.

Important: Do not allow open public search by phone/license plate.

## 7. UX Flow — Claim / Inspection Request

1. Customer opens `/support/inspection`.
2. Customer submits serial if available, name, phone, license_plate, problem_type, description, photos, preferred contact.
3. System creates inspection request with `under_review`.
4. Admin/Dealer reviews photos.
5. Dealer schedules inspection if needed.
6. Admin marks need_inspection / approved / rejected / more_info_required.
7. Customer is contacted back.

Use inspection language, not automatic claim approval language.

## 8. UX Flow — Admin

1. Admin logs in.
2. Admin dashboard shows overview: serials, active warranties, pending support, pending inspection, dealer activity.
3. Admin manages serial import with dry-run.
4. Admin manages warranty records.
5. Admin manages dealers.
6. Admin manages products and warranty policy.
7. Admin manages maintenance records.
8. Admin handles support and inspection requests.
9. Admin exports CSV.

## 9. Page-by-page Requirements and Wireframe Descriptions

### Home `/`
Purpose: premium brand landing page for NEXS PPF.
Sections:
- Hero: NEXS Paint Protection Film + QR warranty verification CTA
- Product tier preview: BEGIN / PRIME / PRO / ULTIMATE
- Warranty verification CTA
- Dealer login CTA
- Trust/process section: professional dealer installation + digital warranty
- Contact CTA
Wireframe: dark premium hero, high contrast CTA, product cards with tier colors, QR verification card prominent on mobile.

### Products `/products`
Purpose: show 4 public product groups.
Sections:
- Intro: NEXS PPF product lineup
- BEGIN card
- PRIME card
- PRO card
- ULTIMATE card
- Warranty years table
- Warranty check CTA
Wireframe: 4 cards in responsive grid, each with color accent and Thai/English text. Avoid unapproved material/performance claims.

### Warranty Search `/warranty`
Purpose: manual serial check.
Fields:
- serial input
- example serial
- submit
- explanation of QR scan
Wireframe: large centered input, mobile-first, simple status guidance.

### Digital Warranty Card `/r/[serial]`
Purpose: QR landing and warranty card.
Cases:
- Active
- Not Registered
- Invalid / Not Found
- Expired
- Under Review / Suspended
Wireframe: status badge at top, product/serial card, vehicle/warranty details, maintenance summary, support buttons. Public data must be masked.

### Login `/login`
Purpose: dealer/admin login.
Fields:
- email or phone
- password
- forgot password placeholder
Behavior:
- admin -> /admin
- dealer -> /dealer
Wireframe: premium dark card, minimal fields, no customer login.

### Dealer Dashboard `/dealer`
Purpose: dealer work hub.
Cards:
- Register New Warranty
- Search Own Warranty Records
- My Registered Cars
- Maintenance
- Profile
Wireframe: simple operational dashboard, fast actions, uncluttered.

### Dealer Register Warranty `/dealer/register-warranty`
Purpose: activate warranty.
Steps:
1. scan/enter serial
2. auto-detect product
3. customer info
4. vehicle info
5. installation info
6. optional photo upload
7. submit
Wireframe: stepper form optimized for mobile/tablet.

### Admin Dashboard `/admin`
Purpose: control center.
Cards:
- serial import
- warranties
- dealers
- products
- maintenance
- support requests
- inspection requests
Wireframe: data/admin layout but premium and uncluttered.

### Maintenance Record `/dealer/maintenance` and `/admin/maintenance`
Purpose: manage after-sales maintenance.
Features:
- search by serial/license/phone/customer
- add maintenance record
- view history
- next recommended date
Wireframe: search table + record timeline.

### Warranty Support Request `/support/warranty`
Purpose: lost card/QR support.
Form fields:
- name, phone, license plate, vehicle, province, expected dealer, approximate date, issue type, message, optional photo
Wireframe: friendly support form with privacy notice.

### Inspection Request `/support/inspection`
Purpose: film problem inspection request.
Form fields:
- serial optional, name, phone, license plate, problem type, description, photos, preferred contact
Wireframe: guided form with “under review” wording.

## 10. UI Notes

- Mobile-first QR page is highest priority.
- Public pages must feel premium, not admin-like.
- Dealer/Admin pages should be practical, fast, and uncluttered.
- Avoid all unapproved public claims.

