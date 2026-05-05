# UI Skeleton Result — nexppf-web

Last Updated: 2026-05-05T17:35:00+00:00
Status: Local implementation; not pushed/deployed yet

## Summary

Updated static UI skeleton foundation to follow the 3-layer framing: Information Website + Sales/Product Website + Warranty/After-sales System. Latest pass adds Curated Visual System improvements: web-native Why PPF education, Why NEXS brand story, and reference-poster guardrails before push/deploy approval.

This is not connected to real PostgreSQL/auth yet.

## Pages Added / Updated

- `/` Home
- `/products` Products page
- `/contact` public contact / lead form skeleton
- `/warranty` Warranty search skeleton
- `/r/[serial]` Digital Warranty Card mock
- `/support/warranty` lost warranty / lost QR support skeleton
- `/support/inspection` inspection request skeleton
- `/login` Dealer/Admin login skeleton
- `/dealer` dealer dashboard skeleton
- `/admin` admin dashboard skeleton

## Content Sources Used

- `src/content/site-content.ts`
- `src/content/image-assets.ts`
- `src/content/ui-skeleton.ts`

## Files Changed

- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/app/page.tsx`
- `src/app/products/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/warranty/page.tsx`
- `src/app/r/[serial]/page.tsx`
- `src/app/support/warranty/page.tsx`
- `src/app/support/inspection/page.tsx`
- `src/app/login/page.tsx`
- `src/app/dealer/page.tsx`
- `src/app/admin/page.tsx`
- `src/content/site-content.ts`
- `src/content/ui-skeleton.ts`
- `tests/site-content.test.ts`
- `tests/ui-skeleton.test.ts`

## UI Description

### Home

Apple-inspired light premium sales + trust landing page with:
- NEXS logo/header navigation
- sales-first hero headline and 3 CTAs
- web-native Why PPF education section
- product line section for BEGIN / PRIME / PRO / ULTIMATE
- curated Why NEXS brand story section using safe wording
- Digital Warranty System section as trust/after-sales feature
- Dealer recruitment / dealer login section
- customer-facing QR / product proof section
- Contact / lead form section

### Products

Shows 4 public product groups:
- BEGIN
- PRIME
- PRO
- ULTIMATE

Each card uses approved warranty years, model code, color direction, safe product copy, recommended use case, and CTA to ask for price/contact dealer without showing public price.

### Warranty

Static warranty search skeleton with serial input and sample link to Digital Warranty Card mock.

### Digital Warranty Card

Mobile-first mock with 3 possible states driven by content config:
- active
- not_registered
- invalid

Mock card avoids customer email/chassis and uses masked phone/license only.

### Login

Dealer/Admin login skeleton for future server-side auth/session integration.

### Support Warranty

Static lost warranty / lost QR support skeleton with safe intake fields and no sensitive record exposure.

### Support Inspection

Static inspection request skeleton for initial customer intake before real claim/inspection workflow integration.

### Dealer Public + Dashboard

Dealer page now includes public dealer recruitment/information with สมัครตัวแทนจำหน่าย and Dealer Login CTA, plus private workflow preview modules: warranty registration, own records, and after-sales follow-up. Real backend must bind dealer records to verified session/dealerId.

### Contact / Lead Form

Public contact page and homepage lead form collect name, phone, optional LINE ID, province, optional car model, interested product, customer type, and message. Current submit button is static and does not send production/customer data.

### Admin Dashboard

Static admin dashboard skeleton showing intended admin-only modules: serial import, dealer oversight, support triage, and future approved policy configuration.

## Visual Direction

Current public UI uses Apple-inspired light premium theme:
- White / soft grey / graphite base palette
- clean white cards with subtle shadow
- product cards carry BEGIN / PRIME / PRO / ULTIMATE accents
- Digital Warranty System appears as premium support/status card
- Dealer Login remains visible but secondary

## Curated Visual System Pass

Completed before production approval:

- Added a new `Why PPF` education section immediately after the hero to explain paint protection in four short customer-facing cards.
- Replaced the older generic Why NEXS grid with a curated brand-story section that connects product selection, surface care, QR/Serial, and Digital Warranty trust.
- Recreated reference-poster ideas as web-native UI (`paint-layer-stack`, `visual-orbit`, curated cards) instead of placing poster screenshots/images directly on the site.
- Changed homepage contact eyebrow from internal `Lead Generation` wording to `ปรึกษา NEXS`.
- Expanded tests and forbidden-term guardrails for reference-derived risks: claim-heavy terms, risky domains, origin/supplier claims, pricing lineups, and long poster-style clutter.

Details: `docs/CURATED_VISUAL_SYSTEM_RESULT.md`.

## Launch Readiness Polish Pass

Completed after Nex reviewed design direction but did not approve final go-live:

- Removed internal/product-management words from public page source: `warranty years`, `positioning`, `CTA`, compliance notes, and database identity wording.
- Product Line intro changed to customer-facing Thai: `เลือก NEXS PPF จาก 4 รุ่นหลัก ตามระดับการปกป้อง อายุการรับประกัน และงบประมาณที่เหมาะกับคุณ`.
- Why NEXS description changed to: `มั่นใจได้ด้วยระบบลงทะเบียนสินค้า ตรวจสอบสถานะรับประกัน และติดตามประวัติการดูแลหลังติดตั้ง`.
- Product cards now show Thai warranty labels, badges, short benefit bullets, and lead-first CTA order.
- Warranty section now includes 4-step flow: install with dealer → Dealer registers Serial/car → customer scans QR → customer sees Digital Warranty Card and care history.
- Warranty mockup now has NEXS logo, `NEXS Digital Warranty`, QR placeholder, product accent, Thai labels, Dealer name, install date, and `ตัวอย่างข้อมูล` note.
- Contact form now has Thai customer-type dropdowns, required markers, PDPA consent checkbox, Privacy Policy link placeholder, success/error messages, and validation/anti-spam readiness note.
- Footer now includes brand/contact/warranty/dealer/privacy/warranty-policy/login/copyright links.
- Image asset rights remain unconfirmed; all nexslabs-derived images are marked placeholder/staging until NEXS commercial-use confirmation.

Details: `docs/LAUNCH_READINESS_POLISH_RESULT.md`.

## Copy Cleanup + Image Composition Pass

Completed before production approval:

- Dealer heading changed to two intentional Thai lines: `สำหรับตัวแทนจำหน่าย` / `และร้านติดตั้ง`, avoiding broken Thai line break around `ติดตั้ง`.
- Public warranty copy no longer uses machine-like wording such as placeholder English phrases or backend workflow labels.
- Public QR section no longer exposes database-oriented wording such as `serial_code`, primary identity logic, or full-URL identity logic.
- Homepage QR copy is now customer-facing: QR Code + Serial Number help customers check product and Digital Warranty Card status after Dealer registration.
- Hero visual uses `/images/hero-porsche.jpg` as a larger visual lead with intentional crop.
- Dealer visual uses `/images/installer-hood.jpg` with editorial crop around professional installation craft.
- Packaging visual uses `/images/nexs-ultimate-box.jpg` as a product-proof block with breathing space instead of a random full-card filler.
- Product cards remain image-light Apple-style tiles with product accent colors, not cluttered photo cards.
- Image role map is centralized in `src/content/image-assets.ts` and documented in `docs/IMAGE_ASSET_MANIFEST.md`.

## Guardrails

- No supplier/material/performance claims added.
- Public UI supports pre-purchase sales/education/lead generation before warranty workflows.
- PRO is public as required.
- Operational photos are not used as marketing assets.
- Image references use centralized slots/config.
- Current UI is static and does not touch production/customer data.

## Verification

Run before completion:

- `npm test`
- `npm run check:content`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- Local HTTP 200 check for `/`, `/products`, `/contact`, `/dealer`, `/warranty`, `/support/warranty`, `/support/inspection`, `/admin`, and `/r/PRO-1196MXY0401178Q`
- Browser visual check screenshot: `/opt/data/profiles/treee-tech-lead/cache/screenshots/browser_screenshot_ca290dc26ee249a9b74ceea0e33574a6.png`

## Limitations

- No real DB integration yet.
- No real auth/session yet.
- Warranty page does not submit/search real serial yet.
- Digital Warranty Card uses mock state selection only.
- No production deploy performed.
