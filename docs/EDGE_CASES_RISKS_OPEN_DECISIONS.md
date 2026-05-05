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
- Reused nexslabs.com images may imply unapproved NEXS PPF v1 claims if paired with wrong copy.
- Matte vehicle images may imply all product tiers are matte film if used without context.
- Color PPF/headlight/self-healing/non-yellowing/optical-clarity images may expand perceived product scope beyond approved v1.

Mitigation:
- Use only approved public claims.
- Do not reuse nexslabs.com public claim copy.
- Use approved v1 image list from `docs/IMAGE_ASSET_REQUIREMENTS.md`.
- Avoid risky images in v1 unless explicitly approved and context-controlled.
- Product content and image usage must be reviewed by NEXS admin before production.

### Pricing / Commercial Risks
- Public pages may accidentally show unapproved retail price, dealer price, factory cost, margin, discount, or promotion rules.
- Dealer-facing pricing may be exposed before Tor S / NEXS admin approves final dealer rollout.
- Hardcoded pricing in UI would create stale or unauthorized commercial information.

Mitigation:
- v1 public pages must use CTA instead of price.
- Do not show public price, dealer roll price, factory cost, margin, discount structure, or promotion policy until approved.
- If pricing is added later, source it from approved config/admin policy with explicit visibility control for public / dealer / admin.
- Keep pricing terms in claim/content guardrail tests.

### Privacy / PDPA Risks
- Public warranty page could leak personal data.
- Support forms collect sensitive data.
- Dealer/Admin exports may include too much data.
- Operational warranty, maintenance, inspection, plate, customer, document, or claim photos could leak sensitive data if reused publicly.

Mitigation:
- Mask public data.
- Never show customer email/chassis/full phone publicly.
- Route-level access control for Dealer/Admin.
- Export policy before production.
- Do not use operational photos as marketing assets by default.
- Require separate consent/approval before real customer/installation photos are used publicly.

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

### Pricing Approval
1. Final dealer roll price for BEGIN / PRIME / PRO / ULTIMATE.
2. Whether PRO 7.5 / PRO 8.5 have separate internal dealer roll prices.
3. Final retail installed price for standard size.
4. XL and XXL surcharge policy.
5. Dealer tier discount rules for Tier 1 / Tier 2 / TOP / ULTIMATE eligibility.
6. Promotion policy for launch promotion, opening bill campaign, training package, and dealer starter package.
7. Whether dealers may discount to customers, allowed percentage, minimum advertised installed price, and whether discount requires approval.
8. Whether public website can ever show retail installed price, and if yes which approved price source controls it.
9. Which dealer-facing pricing fields may be visible after login.

### Product / Brand
1. Final approved public copy for each product tier.
2. Whether approved nexslabs.com image assets may be reused on nexppf.com and whether the rights are confirmed.
3. Whether product color directions are approved:
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

