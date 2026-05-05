# NEXPPF Product Owner Direction Summary

Last Updated: 2026-05-05T17:40:59+00:00

## Framing ที่ต้องล็อกใหม่

nexsppf.com ไม่ใช่เว็บระบบประกันอย่างเดียว และไม่ใช่ backend dashboard อย่างเดียว

เว็บต้องเป็น 3 อย่างในเว็บเดียว:
1. Information Website — ให้ข้อมูล NEXS PPF สำหรับคนที่ยังไม่รู้จักแบรนด์
2. Sales / Product Website — ขายสินค้า, ช่วยเลือกรุ่น, เก็บ lead, สมัคร dealer
3. Warranty / After-sales System — QR verification, Digital Warranty Card, dealer/admin, maintenance, support, inspection

สรุป: เว็บต้องขายของและสร้างความเชื่อมั่นก่อนซื้อ แล้วดูแลหลังการขายต่อด้วยระบบ warranty lifecycle

## สิ่งที่ทำไปแล้วใช้ต่อได้

1. POC core logic
- QR serial parser
- product model flexibility: B / P / PRO / R75 / R85 / U
- serial_code as primary identity, not full QR URL
- QR status resolver
- PDPA masking guardrails
- dealer/admin role concept
- dealer warranty registration service
- admin CSV import dry-run service
- photo storage adapter

2. Technical foundation
- Next.js + TypeScript + Vitest
- PostgreSQL migration draft
- Drizzle schema foundation
- test/lint/typecheck/build/audit passing
- pre-push review passed after fix round

3. Guardrails
- no unapproved public claims
- no public pricing in v1 until Tor S / NEXS admin approval
- no dealer price / factory cost / margin / discount structure on public pages
- no full customer data on public warranty page
- no hardcoded 3-product limit
- supports BEGIN / PRIME / PRO / ULTIMATE
- model_code may be multi-character

4. Curated Visual System direction
- `Curated Visual System, Not Asset Dump` is now the locked public website visual principle.
- Reference posters/images are art direction and storytelling inspiration only; do not paste old posters, embedded text, or legacy claim-heavy layouts directly into the website.
- Recreate web-native sections with short copy, premium whitespace, mobile-first readability, and clear CTA hierarchy.
- Global UI direction is Apple-inspired light premium: white / soft grey / graphite, with NEXS red used sparingly and product colors used only as accents.
- Website story flow must stay: Hero → Why PPF → Product Line → Why NEXS / Brand Story → Digital Warranty → Dealer / Installer → Contact / Lead.
- Source-of-truth detail: `docs/CURATED_VISUAL_SYSTEM_DIRECTION.md`

## สิ่งที่ต้องเพิ่ม

1. Product / Brand
- Product Design System
- public product content for 4 groups
- product color system
- Image Asset System using approved NEXS-owned nexslabs.com assets
- centralized image slots for hero/product/warranty/dealer/maintenance/support visuals
- page copy in Thai/English

2. UX / Pages
- Home must be sales + trust page, not only warranty portal
- Why NEXS / trust content using safe claims
- Contact / lead form
- Dealer recruitment/information section
- Home
- Products
- Warranty Search
- Digital Warranty Card
- Login
- Dealer Dashboard
- Admin Dashboard
- Maintenance Record
- Warranty Support Request
- Inspection Request

3. Lifecycle workflows
- Full Digital Warranty Conceptual Workflow in `docs/DIGITAL_WARRANTY_CONCEPTUAL_WORKFLOW.md`
- QR scans anytime, but Active only after authorized Dealer/Admin registration
- Factory handoff flow
- Maintenance workflow
- Lost warranty / lost QR support
- Customer inquiry flow
- Claim / inspection request flow

4. Admin/Dealer operations
- dealer maintenance records
- admin maintenance overview
- admin support request management
- admin inspection request management
- product/warranty policy management
- pricing approval policy/config with visibility control, after Tor S / NEXS admin approval only

## สิ่งที่ต้องแก้

1. Website framing
- Do not focus only on warranty registration.
- Public pages must support pre-purchase customer journey: understand NEXS, compare products, ask for price, contact dealer, apply as dealer.

2. Warranty page
- Change from simple status page to Digital Warranty Card.

3. Lost card flow
- Must be support request, not public search by phone/license plate.

4. Claim flow
- Must be inspection request / under review, not auto-approved claim.

5. Product policy source
- Current product config works for POC but should move to DB/config repository before production.

6. Integration
- Current logic is service-level POC; must be wired to real routes, DB, session, and access control.

7. Pricing visibility
- v1 public pages must use CTA instead of price.
- Pricing must not be hardcoded into public pages.
- If pricing is added later, it must come from approved config/admin policy with public/dealer/admin visibility control.

## Conceptual Workflow Decision Summary

หัวใจของระบบ:
- QR เป็น serial key สำหรับตรวจสอบและเริ่ม lifecycle ได้ทุกเวลา
- ลูกค้าสแกนก่อน dealer ลงทะเบียนได้ แต่ต้องเห็น Not Registered ไม่ใช่ error
- ลูกค้า activate warranty เองไม่ได้
- Digital Warranty Card Active ได้เฉพาะหลัง Dealer/Admin ลงทะเบียนถูกต้อง
- Not Found ต้องใช้คำว่าอยู่ระหว่างตรวจสอบได้ ไม่ควรเรียกว่าปลอมทันที
- Duplicate registration ต้องถูก block และ admin override ต้องมี audit trail

Recommended launch policy:
- Dealer assignment ใช้ flexible launch mode ได้: allow valid unused serial + flag admin review
- หลัง stock/dealer operation เสถียร ค่อยเปลี่ยนเป็น strict assignment
- Dealer edit window แนะนำ 72 ชั่วโมงสำหรับ non-critical fields; หลังจากนั้น admin-only
- Cross-dealer maintenance แนะนำ limited + log + admin visibility

## สิ่งที่ต้องให้ Tor S / NEXS admin ตัดสินใจ

1. Final product copy and tone.
2. Whether approved nexslabs.com assets are confirmed NEXS-owned and allowed for nexsppf.com.
3. Product color direction approval.
4. Pricing approval before public/dealer rollout:
   - dealer roll price final by tier
   - retail installed price and XL/XXL surcharge
   - dealer tier discount
   - promotion policy
   - dealer-to-customer discount rule
   - public website pricing rule
3. PRO 7.5 / PRO 8.5 public visibility or internal-only grouping.
4. Maintenance quota per product tier.
5. Maintenance interval policy.
6. Whether cross-dealer maintenance is allowed.
7. Public visibility of vehicle brand/model and dealer/installer.
8. License plate masking level.
9. Warranty/inspection status wording.
10. Who approves inspection outcomes.
11. PostgreSQL provisioning path.
12. Staging domain/country structure.
13. DNS/Cloudflare/registrar details.
14. Initial admin email/phone.
15. Whether to push current POC commits to GitHub now or include these PRD/UX docs first.

## Documents created from this direction

1. `docs/UPDATED_PRODUCT_REQUIREMENTS.md`
2. `docs/UX_FLOW_AND_SITEMAP.md`
3. `docs/EDGE_CASES_RISKS_OPEN_DECISIONS.md`
4. `docs/NEXPPF_PRODUCT_OWNER_DIRECTION_SUMMARY.md`
5. `docs/IMAGE_ASSET_REQUIREMENTS.md`
6. `docs/DIGITAL_WARRANTY_CONCEPTUAL_WORKFLOW.md`
7. `docs/CURATED_VISUAL_SYSTEM_DIRECTION.md`

