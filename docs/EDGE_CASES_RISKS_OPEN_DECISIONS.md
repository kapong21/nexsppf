# Edge Cases, Risks, and Open Decisions — nexppf-web

Last Updated: 2026-05-05T11:14:36+00:00
Status: Draft for Tor S / NEXS admin review

## 1. Edge Cases

### QR / Serial
- Serial exists and active warranty exists.
- Serial exists but no warranty registered.
- Serial not found.
- Serial suspended or invalid.
- Warranty expired.
- Warranty under review.
- QR URL contains full URL but system must store only serial_code.
- model_code is multi-character, e.g. PRO/R75/R85.
- factory serial contains unexpected characters.
- duplicate serial in import file.
- duplicate serial already in database.
- serial model_code mismatch, e.g. serial starts B but CSV model_code says P.

### Dealer
- dealer tries to access another dealer’s records.
- dealer session has no dealer_id.
- serial assigned to another dealer.
- dealer tries to register already registered serial.
- dealer enters customer data incorrectly.
- dealer uploads sensitive or invalid photo type.
- dealer re-uploads same photo type and overwrites old file.

### Admin
- admin imports malformed CSV.
- admin imports large CSV.
- admin imports unknown model_code.
- admin edits/cancels warranty incorrectly.
- admin needs audit trail for changes.
- admin needs export without leaking excessive personal data.

### Customer
- customer scans lost/stolen/fake QR.
- customer loses warranty card.
- customer cannot find serial.
- customer bought second-hand car.
- customer asks where the car was installed.
- customer asks maintenance remaining.
- customer submits inspection request with no serial.
- customer submits support request by phone/license plate; public page must not reveal match immediately.

### Maintenance
- maintenance policy not final.
- customer visits different dealer.
- maintenance quota exceeded.
- maintenance record entered incorrectly.
- maintenance status under_review.
- photos include sensitive information.

## 2. Risks

### Product / Brand Risks
- Public pages might accidentally overclaim product performance.
- Supplier/material claims may be shown before approval.
- PRO variants may confuse customers if not grouped clearly.

Mitigation:
- Use only approved public claims.
- Product content must be reviewed by NEXS admin before production.

### Privacy / PDPA Risks
- Public warranty page could leak personal data.
- Support forms collect sensitive data.
- Dealer/Admin exports may include too much data.

Mitigation:
- Mask public data.
- Never show customer email/chassis/full phone publicly.
- Route-level access control for Dealer/Admin.
- Export policy before production.

### Security Risks
- Auth/session not yet implemented at route level.
- Dealer authorization must be enforced server-side.
- File upload route must validate access, type, size, and storage path.
- CSV import could create bad data without validation.

Mitigation:
- Server-side sessions.
- Role-based access controls.
- Existing service-level tests must be backed by integration tests.

### Data Integrity Risks
- Duplicate registration race condition.
- DB schema/migration drift.
- Import race between dry-run and confirm.
- Product policy hardcoded in code rather than DB/config.

Mitigation:
- DB unique constraints.
- Transactions.
- Migration integration tests.
- Move config/policy to DB/config tables before production.

### Operational Risks
- PostgreSQL server is not provisioned yet.
- No deployment pipeline for nexppf-web yet.
- DNS still pending.
- No monitoring/audit logging yet.

Mitigation:
- Provision DB/staging first.
- Build integration environment.
- Add monitoring/audit before production.

## 3. Open Decisions for Tor S / NEXS Admin

### Product / Brand
1. Final approved public copy for each product tier.
2. Whether product color directions are approved:
   - BEGIN: Silver / Light Grey / White
   - PRIME: Graphite / Blue Silver / Premium Grey
   - PRO: Carbon Black / Red Accent / Dark Red
   - ULTIMATE: Deep Black / Gold / Platinum
3. Whether PRO 7.5 / PRO 8.5 should ever be visible publicly or always grouped under PRO.
4. Final warranty policy text shown on public pages.
5. Film care guide content.

### Maintenance Policy
1. Maintenance quota per product tier.
2. Maintenance interval rules.
3. Whether cross-dealer maintenance is allowed.
4. Whether special maintenance allowance can be granted by admin.
5. Who can edit/cancel maintenance records.

### Privacy / PDPA
1. Whether vehicle brand/model can be shown publicly.
2. Whether dealer/installer name can be shown publicly.
3. How much license plate masking is required.
4. Data retention policy for support/inspection requests.
5. Export CSV fields allowed for admin/dealer.

### Claim / Inspection
1. Official inspection statuses.
2. Who can approve/reject after inspection.
3. Customer-facing wording for rejected/more-info cases.
4. Whether dealer or admin contacts customer first.
5. Required photos for inspection request.

### Technical / Ops
1. PostgreSQL provisioning path.
2. Staging domain/country structure.
3. DNS/Cloudflare/registrar details.
4. Initial admin email/phone.
5. Whether to push current POC commits to GitHub now or wait until PRD/UX docs are also committed.
6. Storage path for production: local volume vs R2/S3.
7. Deployment workflow for nexppf-web.

## 4. What is reusable from current POC

- Next.js/TypeScript/Vitest skeleton
- QR serial parser supporting multi-character model codes
- Product config covering B/P/PRO/R75/R85/U
- QR status resolver with masking
- Auth role isolation service-level tests
- Dealer warranty registration service-level tests
- Admin CSV dry-run service-level tests
- Local photo storage adapter with validation/compression/path metadata
- PostgreSQL migration draft and Drizzle schema foundation

## 5. What must be added

- Product design system
- Public product content 4 groups
- Digital Warranty Card UX for all statuses
- Maintenance models/services/pages
- Warranty support request models/services/pages
- Inspection request models/services/pages
- Dealer maintenance record function
- Admin maintenance/support/inspection management
- Page-by-page UI implementation
- Route-level auth/session
- PostgreSQL integration tests

## 6. What must be changed

- Current warranty page concept must become Digital Warranty Card.
- Customer lost card flow must be support request, not public search by phone/plate.
- Claim flow must be inspection request / under review, not automatic claim approval.
- Product runtime policy should move from hardcoded config to DB/config before production.
- Current POC services must be wired to real routes, DB, and access control.

