# Edge Cases, Risks, and Open Decisions — nexppf-web

Last Updated: 2026-05-05T14:53:21+00:00
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

### Factory / Import / Activation
- Factory produced serial but NEXS has not imported it yet.
- Serial exists in a pending/import context but batch is not approved/opened yet (`not_activated`).
- QR sample path/domain is wrong.
- Packing list quantity does not match serial CSV quantity.
- Serial is from a test batch.
- Serial model_code is unknown or mismatched with CSV tier.

### Customer Scan Timing
- Customer scans before Dealer registers warranty; show Not Registered, not error.
- Customer scans valid in-stock serial before dealer assignment; show Not Registered without exposing stock state.
- Customer scans serial not found; use Not Found / under-verification wording and support request, do not call it fake immediately.
- Customer scans active serial but says the vehicle is not theirs; route to support/admin review.

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

### Website Framing / Sales Journey Risks
- Public website may feel like only a warranty database or backend portal.
- Customers who have not purchased may not understand what NEXS is, which product tier fits them, or how to contact/buy.
- Dealer Login may dominate the public website and make it feel operational instead of sales-ready.
- Warranty system may be presented as the whole product instead of a trust/after-sales feature.

Mitigation:
- Lock 3-layer model: Information Website + Sales/Product Website + Warranty/After-sales System.
- Homepage must sell brand/trust/product first, then present warranty as confidence feature.
- Products page must educate and support product selection.
- Dealer page must include public recruitment/information before private login workflow.
- Keep public CTA clear: ดูสินค้า, สอบถามราคา, ติดต่อ Dealer, ขอคำแนะนำเลือกรุ่น, สมัครตัวแทนจำหน่าย, ตรวจสอบบัตรรับประกัน.

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

### Lifecycle / Workflow Risks
- Customer may receive warranty card before Dealer registers warranty.
- Launch dealers may have real stock that is valid but not correctly assigned in system yet.
- Strict dealer assignment could block real installations during launch.
- Flexible launch assignment could weaken stock control if not flagged/audited.
- Not Found wording could alarm customers if it implies fake immediately.

Mitigation:
- Show Not Registered for known valid unused serials.
- Add recommended `not_activated` status for known pending/not-approved serials.
- Use flexible launch mode only with `assignment_review_required` and audit trail.
- Move to strict dealer assignment after launch operations stabilize.
- Not Found page should offer verification request with QR/card photo.

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

### Website Framing / Sales Content
1. Final homepage sales copy and CTA priority.
2. Whether to add separate `/why-nexs` page or keep Why NEXS as a homepage section in v1.
3. Whether to add separate `/warranty-info` page or keep Warranty Information as a homepage/products section in v1.
4. Dealer public page content and dealer application fields.
5. Lead/contact routing: send to NEXS central, assigned dealer, or both.
6. Approved wording for “why choose NEXS” without supplier/material/performance claims.

### Product / Brand
1. Final approved public copy for each product tier.
2. Whether approved nexslabs.com image assets may be reused on nexsppf.com and whether the rights are confirmed.
3. Whether product color directions are approved:
   - BEGIN: Silver / Light Grey / White
   - PRIME: Graphite / Blue Silver / Premium Grey
   - PRO: Carbon Black / Red Accent / Dark Red
   - ULTIMATE: Deep Black / Gold / Platinum
3. Whether PRO 7.5 / PRO 8.5 should ever be visible publicly or always grouped under PRO.
4. Final warranty policy text shown on public pages.
5. Film care guide content.

### Digital Warranty Lifecycle
1. Should customer QR page show dealer name before warranty is Active?
   - Recommendation: no, show dealer only after Active unless NEXS approves otherwise.
2. Should serial pending import/batch approval have explicit `not_activated` status?
   - Recommendation: yes, to separate known-but-not-opened from truly not found.
3. Launch dealer assignment policy:
   - Option A Strict: block serial not assigned to current dealer.
   - Option B Flexible launch: allow valid unused serial registration, flag admin review, audit assignment.
   - Recommendation: Option B during launch, Option A long term.
4. Dealer edit window after registration.
   - Recommendation: 72 hours for non-critical fields; admin-only after that; serial/vehicle identity admin-only.
5. Not Found wording.
   - Recommendation: “ไม่พบข้อมูล / ส่งคำขอตรวจสอบ” and do not call it fake immediately.

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

