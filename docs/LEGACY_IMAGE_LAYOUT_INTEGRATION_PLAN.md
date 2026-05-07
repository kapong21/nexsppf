# Legacy Image Layout Integration Pass

Date: 2026-05-06
Status: Pre-implementation plan
Scope: Local repo only. No production deploy, no DNS, no Cloudflare, no real customer data flow.

## 1. Current Image Problem

The site already has approved legacy images and a centralized `src/content/image-assets.ts` map, but the visual system is still only partially integrated:

- Homepage uses hero, dealer, and packaging visuals, but the layout metadata is spread across component class names rather than the image slot config.
- Products page uses only the hero visual; product-family storytelling is mostly gradient cards and does not yet use a replaceable product-line visual role.
- Contact page has a `contact_lead_visual` slot in config, but the page does not render it.
- Dealer page has an approved dealer/installer image slot, but the page does not render it.
- Existing image slots describe purpose/risk, but do not define reusable layout metadata such as aspect ratio, object position, placement, or layout class.

The goal of this pass is not to add many photos. The goal is to make every approved legacy image intentional, replaceable, and visually controlled.

## 2. Image Mapping Plan

Use approved nexslabs/NEXS-owned assets only as curated visual roles:

| Section / Route | Slot | Asset | Purpose |
| --- | --- | --- | --- |
| Home hero | `hero_brand_visual` | `/images/hero-porsche.jpg` | Premium first impression and NEXS brand mood |
| Home Why PPF / Products supporting visual | `product_line_visual` | `/images/matte-bmw-closeup.jpg` | Surface/film detail mood without product-specific claim |
| Products hero | `hero_brand_visual` | `/images/hero-porsche.jpg` | Consistent brand/product overview mood |
| Products family strip | `product_line_visual` | `/images/matte-bmw-closeup.jpg` | Product-line visual rhythm, not per-tier proof |
| Warranty / QR | `warranty_qr_visual` | `/images/nexs-ultimate-box.jpg` | Packaging and product-proof trust cue |
| Digital warranty proof | `packaging_product_proof_visual` | `/images/nexs-ultimate-box.jpg` | QR/warranty story support |
| Dealer / Installer | `dealer_installation_visual` | `/images/installer-hood.jpg` | Professional installation workflow |
| Contact | `contact_lead_visual` | `/images/matte-bmw-full.jpg` | Minimal lead-support visual; not a product claim |
| Maintenance / after-sales | `maintenance_after_sales_visual` | `/images/installer-hood.jpg` | Service workflow mood only |

Product-specific slots for BEGIN / PRIME / PRO / ULTIMATE remain `null` until exact product-tier images are approved.

## 3. Images Used

Use in this pass:

- `/images/hero-porsche.jpg`
- `/images/matte-bmw-closeup.jpg`
- `/images/matte-bmw-full.jpg`
- `/images/nexs-ultimate-box.jpg`
- `/images/installer-hood.jpg`
- `/nexs-logo.png`

All usage must go through centralized config, not duplicated ad-hoc paths.

## 4. Images Avoided

Do not use in public layout in this pass:

- `/images/self-healing-closeup.jpg` — may imply self-healing claim.
- `/images/non-yellowing.jpg` — may imply anti-yellowing/non-yellowing claim.
- `/images/optical-clarity.jpg` and `/images/optical-clarity-maserati.jpg` — may imply optical clarity/performance claim.
- `/images/color-ppf-mclaren.jpg`, `/images/color-ppf-green.jpg`, `/images/color-1000-swatchbook.jpg` — may imply Color PPF / 1000+ colors scope.
- `/images/headlight-install.jpg` — may imply Headlight PPF scope.

## 5. Section-by-Section Visual Change

- Home: keep premium hero; add controlled product-line/surface visual rhythm near Product Line / Why PPF; keep dealer and warranty visuals intentional.
- Products: add a product-line editorial visual band and keep product tier cards concise; avoid one real image per card until tier-specific assets are approved.
- Contact: convert single-column hero into a two-column curated hero with minimal lead-support visual.
- Dealer: convert single-column hero into a two-column curated hero using installer visual.
- Warranty: preserve packaging/QR visual with explicit aspect/crop metadata.
- QR route `/r/[serial]`: keep PDPA-safe digital warranty card UI; do not add sensitive or operational photos.

## 6. Risk Control

- No public price, dealer price, cost, margin, discount, promotion.
- No supplier/material/performance claims.
- No self-healing, anti-yellowing, non-yellowing, optical clarity, Color PPF, Headlight PPF scope creep.
- No embedded poster text reuse.
- No operational/customer/warranty photos as marketing assets.
- Public warranty/QR remains PDPA-masked.
- Existing `npm run check:content` must pass.

## 7. Expected Files to Change

Implementation candidates:

- `src/content/image-assets.ts` — extend slot metadata with layout/crop/placement fields.
- `src/app/page.tsx` — consume metadata and improve product-line/visual rhythm.
- `src/app/products/page.tsx` — add product-line visual band from config.
- `src/app/contact/page.tsx` — render `contact_lead_visual`.
- `src/app/dealer/page.tsx` — render `dealer_installation_visual`.
- `src/app/warranty/page.tsx` — use slot layout metadata.
- `src/app/globals.css` — add reusable image layout classes, aspect ratios, object-position helpers, mobile rules.
- `tests/legacy-image-layout-integration.test.ts` — TDD coverage for config metadata, page usage, guardrails, and docs.

## 8. Verification Plan

Run:

```bash
npm test
npm run check:content
npm run lint
npm run typecheck
npm run build
npm audit --audit-level=moderate
```

Visual/local route checks:

- `/`
- `/products`
- `/contact`
- `/dealer`
- `/warranty`
- `/r/PRO-1196MXY0401178Q`

Final report must explicitly say: local only, no commit/push unless separately approved, no production deploy, no DNS, no Cloudflare, no real customer data flow.
