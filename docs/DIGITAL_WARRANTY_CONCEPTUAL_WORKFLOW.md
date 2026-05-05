# NEXS Digital Warranty Conceptual Workflow

Last Updated: 2026-05-05T14:42:36+00:00
Owner: Tor S / NEXS admin
Executor: treee-tech-lead
Status: Conceptual workflow design for review before backend implementation

## Core Principle

QR must be scannable at any time, but warranty becomes Active only after an authorized Dealer or Admin correctly registers the installation.

The QR code is not only a link. It is a serial key tied to one product/warranty unit and must be controlled by NEXS serial lifecycle, dealer authorization, duplicate protection, and PDPA-safe public display.

## Goals

1. Verify genuine NEXS serials from QR / warranty card / door sticker.
2. Support factory-to-NEXS serial import and batch approval.
3. Support dealer installation and warranty activation.
4. Support customer QR scan before and after registration without scary errors.
5. Support maintenance, lost card/lost QR, support request, and inspection lifecycle.
6. Prevent duplicate registration, fake QR misuse, dealer wrong-scope access, and customer data leakage.

## Actors and Responsibilities

| Actor | Responsibilities | Must Not Do |
|---|---|---|
| Factory | Produce film, sticker/card/QR, serial list, QR sample, batch/quantity/product information, packing list | Factory data alone must not auto-activate warranty |
| NEXS Admin | Import serial CSV, dry-run validate, approve batch, assign serials to dealers, manage overrides, audit actions | Do not approve malformed/duplicate/unknown serials without review |
| Dealer / Installer | Install film, scan/enter serial, register warranty after real installation, maintain own records, add maintenance records | Must not activate customer warranty without valid serial/installation; must not access other dealers' records |
| Customer | Scan QR, view PDPA-safe Digital Warranty Card, submit lost card/QR support or inspection request | Must not self-activate warranty |
| NEXS Support / Claim Team | Review support requests, verify not found/invalid cases, coordinate inspection, contact customer | Must not auto-approve claim without inspection/review |

## End-to-End Timeline

| Time | Stage | Actor | Action | Resulting Status |
|---|---|---|---|---|
| T0 | Factory produces | Factory | Produce film + card/sticker/QR + serial list | produced_pending_import outside NEXS system |
| T1 | NEXS imports | Admin | Import CSV, validate, scan QR sample, approve batch | issued_in_stock |
| T2 | Dealer assignment | Admin / Warehouse | Assign serial batch to dealer or keep stockกลาง | assigned_to_dealer or issued_in_stock |
| T3 | Installation | Dealer | Install film, give warranty card/door sticker | serial remains assigned/in_stock until registration |
| T4 | Warranty activation | Dealer/Admin | Register warranty with customer/vehicle/install information | registered_active + warranty active |
| T5 | Customer scan | Customer | Scan QR | Active Digital Warranty Card or safe non-active status |
| T6 | Maintenance | Dealer/Admin | Add maintenance records | maintenance used/remaining updated |
| T7 | Support / Inspection | Customer/Admin/Dealer | Lost card/QR support or inspection request | request lifecycle under review until closed |

## Serial Lifecycle

### Serial Status State Machine

1. `produced_pending_import`
   - Factory has produced serial/QR but NEXS has not accepted it yet.
   - Public scan policy depends on whether this pending batch exists in the system.

2. `issued_in_stock`
   - NEXS Admin has imported, validated, and approved serial/batch.
   - Serial is valid but not assigned to a dealer and not registered to a car.

3. `assigned_to_dealer`
   - Serial/batch is assigned to a dealer.
   - Dealer can register according to assignment policy.

4. `registered_active`
   - Warranty registration is complete.
   - Exactly one active warranty may exist for this serial.

5. `suspended`
   - Temporarily paused due to investigation, dispute, suspicious case, or admin action.

6. `invalid`
   - Cancelled, confirmed invalid, test batch, fake, or unusable serial.

### Warranty Status State Machine

1. `not_registered`
2. `active`
3. `expired`
4. `under_review`
5. `cancelled`

### Support Request Status State Machine

1. `pending_review`
2. `in_progress`
3. `matched`
4. `not_matched`
5. `closed`

### Inspection Status State Machine

1. `submitted`
2. `under_review`
3. `need_inspection`
4. `approved`
5. `rejected`
6. `more_info_required`
7. `closed`

### Maintenance Status State Machine

1. `scheduled`
2. `completed`
3. `no_show`
4. `cancelled`
5. `under_review`

## Factory Stage

Factory must provide to NEXS:

1. Serial list / CSV
2. QR sample
3. Product model code
4. Batch number
5. Quantity
6. Product tier
7. Production date if available
8. Sticker/card sample photo
9. Packing list / roll count

QR format:

`https://nexppf.com/r/[serial]`

Examples:

- `https://nexppf.com/r/B-1196MXY0401175Q`
- `https://nexppf.com/r/P-1196MXY0401176Q`
- `https://nexppf.com/r/PRO-1196MXY0401178Q`
- `https://nexppf.com/r/U-1196MXY0401177Q`

Important rules:

- Parse `model_code` from everything before the first hyphen.
- Do not assume model_code is one character.
- Store `serial_code` as the primary identity.
- Do not use full QR URL as primary identity.

## NEXS Admin Import Stage

Admin flow:

1. Receive factory CSV / serial list.
2. Run import dry-run.
3. Validate:
   - serial format
   - known model_code
   - duplicate within file
   - duplicate against database
   - batch consistency
   - quantity against invoice/packing list
   - QR sample scan path
4. Approve or reject batch.
5. Approved serials become `issued_in_stock`.

Recommended public scan split:

1. `not_found` — serial is not in NEXS system at all; may be typo, not imported, test, or suspicious.
2. `not_activated` — serial exists in pending/import context but NEXS has not approved/opened it yet.

Customer-facing wording should avoid calling anything fake immediately.

## Inventory / Dealer Assignment Stage

After NEXS receives goods:

1. Admin / warehouse confirms roll/card counts.
2. Randomly scans QR from each batch.
3. Assigns serial batch to dealer or stockกลาง.
4. Serial status changes `issued_in_stock` → `assigned_to_dealer` when assigned.

Dealer should see:

- own assigned serials
- product tier
- batch
- status

Dealer should not see:

- customer data before installation
- other dealers' assigned stock
- pricing/cost/internal notes unless explicitly approved

## Dealer Installation and Registration Stage

Dealer installation flow:

1. Customer enters shop.
2. Dealer installs NEXS film.
3. Dealer gives warranty card / door sticker / QR.
4. Dealer logs in at `/login`.
5. Dealer scans QR or enters serial.
6. System validates serial and dealer rights.
7. Dealer enters customer, vehicle, install, coverage, car size, and optional photos.
8. Submit activates warranty if validation passes.

System must validate before activation:

1. Serial exists in system.
2. Serial status is `issued_in_stock` or `assigned_to_dealer` according to policy.
3. Serial does not already have an active warranty.
4. Serial belongs to this dealer if strict assignment policy is active.
5. Product model code maps to product master/config.
6. Dealer account is active.
7. Dealer session has verified `dealerId`; do not accept dealerId/createdBy from user input.

After successful registration:

- warranty status = `active`
- serial status = `registered_active`
- warranty_start_date = install_date
- warranty_end_date = install_date + approved warranty years
- maintenance entitlement is created from approved product policy
- QR page displays Digital Warranty Card

## Customer Scan Cases and Messages

### Case A: Active Warranty

Condition:

- serial status = `registered_active`
- warranty status = `active`

Customer sees:

- Status: Active
- Product
- Serial
- Vehicle information if allowed
- Install date
- Expiry date
- Dealer / Installer if policy allows
- Maintenance used / remaining
- Last maintenance
- Next recommended maintenance
- Contact Dealer
- Request Inspection
- Lost Card Support
- Film Care Guide

Privacy:

- mask phone
- mask license plate if needed
- no customer email
- no chassis/VIN
- no internal notes
- no sensitive photos without access control
- no price/cost/dealer price/factory cost/margin/discount/promotion

### Case B: Customer scans before Dealer registration

Condition:

- serial exists
- serial status = `issued_in_stock` or `assigned_to_dealer`
- no active warranty record exists

Customer-facing message:

`รหัสรับประกัน NEXS นี้ยังไม่ได้ลงทะเบียน กรุณาติดต่อร้านติดตั้งเพื่อดำเนินการลงทะเบียนบัตรรับประกัน`

Show:

- Product tier
- Serial number
- Status: Not Registered
- Contact NEXS / support CTA
- Dealer Login CTA
- Optional: “แจ้งให้ตรวจสอบ / แจ้งร้านติดตั้งลืมลงทะเบียน”

Do not show:

- customer data
- stock data
- price/cost
- dealer assignment unless approved

Protection:

- Customer cannot activate warranty.
- Customer cannot self-fill vehicle/customer information to create Active warranty.
- Support request may be created for Admin/Dealer review only.

### Case C: Serial exists but not assigned to Dealer

Condition:

- serial status = `issued_in_stock`
- no active warranty

Customer view:

- Same safe Not Registered wording.
- Do not reveal stockกลาง status.

Dealer registration policy options:

Option A — Strict:

- Block registration if serial not assigned to current dealer.
- Show dealer: `Serial นี้ยังไม่ได้ assign ให้บัญชี dealer นี้ กรุณาติดต่อ NEXS Admin`
- Best for long-term stock/claim control.

Option B — Flexible launch mode:

- Allow registration if serial is valid and unused.
- Flag warranty/assignment for admin review.
- Optionally auto-assign to dealer after submit with audit log.
- Best for launch period to reduce dealer blockage.

Recommendation:

- Use Option B during launch with explicit `assignment_review_required` flag and audit trail.
- Move to Option A after inventory/dealer assignment operation is stable.

### Case D: Serial Not Found

Condition:

- serial is not in NEXS system

Customer-facing message:

`ไม่พบข้อมูลรหัสนี้ในระบบ NEXS กรุณาตรวจสอบหมายเลขอีกครั้ง หรือส่งคำขอตรวจสอบให้ทีม NEXS`

Avoid wording:

- fake
- ปลอม
- invalid product

CTA:

- Contact NEXS
- Submit QR verification request
- Attach QR / warranty card photo

Admin actions:

- Search serial
- Check factory batch
- Check CSV/import history
- Check typo
- Mark as valid-but-not-imported, invalid, suspicious, or needs factory confirmation

### Case E: Serial already registered / Duplicate attempt

Condition:

- existing active warranty for serial

Dealer view:

`Serial นี้ถูกลงทะเบียนแล้ว ไม่สามารถลงทะเบียนซ้ำได้`

System behavior:

- block duplicate registration
- one serial = one active warranty
- admin override only with audit trail

Customer scan:

- show active warranty card for existing record

If customer reports wrong car:

- provide “แจ้งข้อมูลไม่ถูกต้อง” support/inspection path
- admin reviews history and audit log

### Case F: Dealer registers wrong data

Examples:

- wrong plate
- wrong phone
- wrong car model
- wrong coverage
- wrong serial/car mapping

Policy recommendation:

1. Dealer may edit non-critical fields within 72 hours after submit.
2. After 72 hours, admin approval is required.
3. Changing serial or vehicle identity requires admin only.
4. All edits require audit trail: who/when/old/new/reason.

### Case G: Lost card / lost QR

Public flow:

1. Customer opens `/support/warranty`.
2. Customer submits name, phone, plate, vehicle, province, expected dealer, approximate install date, optional photos, issue type, and message.
3. System creates support request with `pending_review`.
4. Admin/Dealer reviews internally.
5. NEXS contacts customer back.

Protection:

- No public lookup by phone or license plate that reveals results immediately.
- Do not expose warranty details before review.
- Reduce PDPA risk and prevent third-party lookup abuse.

## Maintenance Workflow

After warranty becomes Active, system creates maintenance entitlement based on approved product policy.

Draft policy requiring approval:

- BEGIN: 1 time
- PRIME: 1–2 times
- PRO: 2 times
- ULTIMATE: 2 times

Dealer maintenance flow:

1. Customer visits dealer.
2. Dealer searches by serial / plate / phone provided by customer.
3. Dealer opens warranty record according to access policy.
4. Dealer adds maintenance record:
   - date
   - type
   - result
   - note
   - optional photo
   - next recommended date
5. System updates used/remaining.

Cross-dealer options:

Option A:
- Other dealer cannot view/add; admin approval required.

Option B:
- Other dealer can search with customer-provided serial/plate/phone, see limited info, and request/add maintenance with cross-dealer log.

Option C:
- Dealer network can see maintenance broadly with masked customer data.

Recommendation:

- Start with Option B: limited info + explicit cross-dealer log + admin visibility.

## Claim / Inspection Workflow

Customer-facing CTA:

- `แจ้งปัญหา / ขอให้ตรวจสอบ`
- `Request Inspection`

Flow:

1. Customer submits request.
2. Attach photos: close-up, wide-angle, serial/QR if available.
3. inspection status = `submitted` or `under_review`.
4. Dealer/Admin reviews.
5. Dealer schedules inspection if needed.
6. Admin/authorized reviewer marks: need_inspection, approved, rejected, more_info_required, or closed.

Protection:

- Do not auto-approve claim.
- Use inspection/review wording, not guaranteed claim wording.
- Every claim outcome must pass review/inspection policy.

## Protection Rules

1. QR can be scanned anytime, but only Dealer/Admin can activate warranty.
2. Customer self-activation is not allowed.
3. One serial = one active warranty.
4. Duplicate registration must be blocked at service and database levels.
5. Dealer sees own records only unless approved cross-dealer policy applies.
6. Dealer registration must bind to verified server-side session/dealerId.
7. Public page must mask customer personal data.
8. No open public lookup by phone/license plate.
9. Sensitive photos require access control and must not be public by default.
10. Pricing/cost/margin/discount/promotion must not appear in public v1.
11. Factory data must pass NEXS import/approval before considered valid.
12. Admin override requires audit trail.
13. Claim is inspection request, not automatic approval.

## Open Decisions for Tor S / NEXS Admin

1. When customer scans before dealer registration, should dealer name be visible?
   - Recommendation: do not show dealer name until warranty is Active.

2. Should a dealer register a valid serial not assigned to them?
   - Recommendation: launch mode Option B allow + flag admin review; later switch to strict Option A.

3. How long can dealer edit warranty after submit?
   - Recommendation: 72 hours for non-critical fields; admin-only afterward.

4. Can cross-dealer maintenance be added?
   - Recommendation: limited flow + log + admin visibility.

5. Maintenance allowance per product tier.
   - Draft exists but requires approval before public/dealer rollout.

6. Not found wording.
   - Recommendation: use “ไม่พบข้อมูล / ส่งคำขอตรวจสอบ” and do not call it fake immediately.

7. Lost card lookup.
   - Recommendation: no instant public lookup by phone/license plate; use support request review.

8. Whether `not_activated` should be an explicit public/internal status.
   - Recommendation: add it to separate pending/imported-but-not-approved from truly not found.

9. Who can approve/reject inspection outcome.

10. Required inspection photos and retention policy.
