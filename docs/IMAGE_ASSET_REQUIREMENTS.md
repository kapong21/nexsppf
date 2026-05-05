# Image Asset Requirements — nexppf-web

Last Updated: 2026-05-05T12:06:12+00:00
Owner: Tor S / NEXS admin
Executor: treee-tech-lead
Status: Requirement added before image/UI implementation

## 1. Purpose

nexppf-web may use selected image assets from nexslabs.com if they are NEXS-owned assets and the brand owner confirms usage rights.

Goal:
- Reuse visual mood from nexslabs.com so nexppf.com feels connected to the NEXS brand.
- Keep nexppf.com content/copy specific to NEXS PPF products, QR verification, Digital Warranty Card, dealer workflow, and after-sales support.
- Do not copy unapproved public claims from nexslabs.com.

## 2. Hard Rules

1. Images may be reused only when they are NEXS assets and NEXS has rights to use them.
2. Do not lift public claims/copy from nexslabs.com into nexppf-web.
3. Do not use images in a way that implies unapproved claims.
4. Do not use operational warranty/maintenance/inspection photos as public marketing images by default.
5. Product page must show 4 public product groups:
   - BEGIN
   - PRIME
   - PRO
   - ULTIMATE
6. Image slots must be config-driven or easy to replace later, not buried in layout logic.

## 3. Approved v1 Assets

| Asset | Allowed Use |
|---|---|
| `/nexs-logo.png` | Header, Footer, Login, Digital Warranty Card, Dealer/Admin dashboard |
| `/images/hero-porsche.jpg` | Home hero, Warranty hero, Product overview hero |
| `/images/installer-hood.jpg` | Dealer workflow, Warranty registration, Installation/after-sales, Maintenance placeholder |
| `/images/nexs-ultimate-box.jpg` | Packaging, Product proof, Warranty/QR explanation |
| `/images/matte-bmw-full.jpg` | Product mood/detail/supporting image only |
| `/images/matte-bmw-closeup.jpg` | Film surface/detail/supporting image only |

Important: If matte BMW images are used, the copy and layout must not imply that all 4 public product groups are matte film. Use them only as mood/detail visuals.

## 4. Assets to Avoid or Use Only with Strong Context Control in v1

Avoid in v1 unless cropped/context-adjusted and explicitly approved:

| Asset | Risk |
|---|---|
| `/images/self-healing-closeup.jpg` | May imply self-healing claim |
| `/images/non-yellowing.jpg` | May imply anti-yellowing/non-yellowing claim |
| `/images/optical-clarity-maserati.jpg` | May imply high optical clarity performance claim |
| `/images/color-ppf-mclaren.jpg` | May imply color PPF scope |
| `/images/color-1000-swatchbook.jpg` | May imply 1000+ colors |
| `/images/color-ppf-green.jpg` | May imply color PPF scope |
| `/images/headlight-install.jpg` | May imply headlight PPF scope |

If any of these are later needed:
- Use as neutral mood image only.
- Do not place near unapproved claim text.
- Do not use filename/alt/caption wording that contains unapproved claims.
- Require NEXS admin approval before production.

## 5. Prohibited Claim Copy from nexslabs.com

Do not reuse or imply these claims in nexppf-web public pages until approved:

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
- highest optical clarity / advanced optical clarity performance claim
- highest quality raw materials
- made in USA
- performance claims not explicitly approved for NEXS PPF v1

## 6. Allowed Public Wording

Use safer wording such as:

- NEXS Paint Protection Film
- QR-based warranty verification
- Digital warranty card
- Professional dealer installation workflow
- Warranty-backed after-sales support
- Product tier names
- Warranty years as approved

Suggested neutral copy examples:

### Home Hero
- English: `NEXS Paint Protection Film with Digital Warranty Verification`
- Thai: `ฟิล์มปกป้องสีรถ NEXS พร้อมระบบบัตรรับประกันดิจิทัล`

### Warranty / QR Section
- English: `Scan QR to verify warranty status and product registration.`
- Thai: `สแกน QR เพื่อตรวจสอบสถานะการรับประกันและข้อมูลการลงทะเบียนสินค้า`

### Dealer Workflow
- English: `Professional dealer installation workflow with warranty-backed after-sales support.`
- Thai: `ขั้นตอนติดตั้งโดยตัวแทนจำหน่าย พร้อมระบบดูแลหลังการขายและบันทึกการรับประกัน`

### Product Proof / Packaging
- English: `Product registration starts from approved serial and QR records.`
- Thai: `การรับประกันเริ่มจาก serial และ QR ที่ผ่านการลงทะเบียนในระบบ`

### Maintenance
- English: `Maintenance records help customers and dealers track after-sales care.`
- Thai: `บันทึกการดูแลรักษาช่วยให้ลูกค้าและตัวแทนจำหน่ายติดตามการดูแลหลังการติดตั้งได้ชัดเจน`

## 7. Product Page Requirement

`/products` must show 4 public groups:

| Product | Warranty | Color Direction | Image Approach |
|---|---:|---|---|
| BEGIN | 5 years | silver / light grey | product card + color system; image slot if available |
| PRIME | 6 years | graphite / blue silver | product card + color system; image slot if available |
| PRO | 8 years | carbon black / red accent | product card + color system; image slot if available |
| ULTIMATE | 9 years | deep black / gold or platinum | product card + color system; image slot if available |

PRO must be shown publicly as a main product group even if manufactured by a different factory. Internal variants may remain grouped under PRO unless NEXS admin approves separate public display.

If specific product photos are not ready, use premium product cards + color system first and reserve image slots for future real assets.

## 8. Page-by-Page Image Usage v1

| Page | Image Usage |
|---|---|
| Home | Hero: `/images/hero-porsche.jpg`; Dealer/workflow: `/images/installer-hood.jpg`; Product proof/packaging: `/images/nexs-ultimate-box.jpg` |
| Products | Product cards + color system for BEGIN/PRIME/PRO/ULTIMATE; optional supporting image: `/images/matte-bmw-full.jpg` or `/images/matte-bmw-closeup.jpg` with matte-only risk controlled |
| Warranty | `/images/nexs-ultimate-box.jpg` or packaging/sticker visual; add QR scan / Digital Warranty Card mockup placeholder |
| Digital Warranty Card | `/nexs-logo.png`; minimal vehicle images; prioritize readable mobile status |
| Dealer Login / Dealer Section | `/images/installer-hood.jpg` |
| Maintenance / After-sales | `/images/installer-hood.jpg` as placeholder; reserve slot for real maintenance photo later |
| Admin / Dealer Dashboard | Logo and theme colors only; avoid heavy images; prioritize speed and readability |

## 9. Crop / Context Adjustments Needed

| Asset | Adjustment |
|---|---|
| `/images/hero-porsche.jpg` | Crop for responsive hero; add dark gradient overlay for readable copy; avoid claim-heavy captions |
| `/images/installer-hood.jpg` | Crop to focus on professional installation workflow; do not imply unsupported service scope |
| `/images/nexs-ultimate-box.jpg` | Use as packaging/product-proof visual; avoid implying only ULTIMATE has QR/warranty if used on general warranty page |
| `/images/matte-bmw-full.jpg` | Use as supporting mood image only; add neutral context if near products |
| `/images/matte-bmw-closeup.jpg` | Use for detail/mood only; do not label as product default finish |

## 10. Required Image Slots

Prepare image slots that can be changed later:

- `hero_image`
- `begin_product_visual`
- `prime_product_visual`
- `pro_product_visual`
- `ultimate_product_visual`
- `qr_warranty_visual`
- `packaging_visual`
- `dealer_workflow_visual`
- `maintenance_visual`
- `support_request_visual`

Implementation note:
- Prefer config/database-driven asset references before production.
- For POC/UI prototype, temporary static config is acceptable only if marked as non-production and easy to replace.
- Do not embed asset paths in many components. Centralize them in one content/config layer.

## 11. Operational Photos Rule

Operational photos must not become marketing assets automatically.

Operational photos include:
- customer car photos
- license plate photos
- door sticker photos
- warranty card photos
- claim/defect photos
- maintenance photos
- receipts/pricing documents
- chassis/VIN documents
- photos containing faces or personal data

Allowed access:
- Dealer can see only records belonging to that dealer.
- Admin can see all records.

Public default:
- Do not show full license plate publicly.
- Do not show customer face publicly.
- Do not show documents publicly.
- Do not show chassis/VIN publicly.
- Do not show receipt/price publicly.
- Do not show claim photos publicly while under review.

If real customer/installation photos are needed for marketing, require separate approval and consent tracking before use.

## 12. Risks

### Claim Risk

Risk:
- Reusing nexslabs images may accidentally bring nexslabs performance claims into nexppf-web.

Mitigation:
- Use image-only reuse with new approved copy.
- Block prohibited claim words in public content review.
- Require NEXS admin approval before production.

### Product Scope Risk

Risk:
- Certain images may imply color PPF, headlight PPF, self-healing, non-yellowing, or optical clarity claims.

Mitigation:
- Avoid risky images in v1.
- Use product cards + approved product tiers instead.
- Add clear neutral context for mood images.

### PDPA Risk

Risk:
- Operational photos can expose plate number, customer data, chassis, documents, claim condition, or faces.

Mitigation:
- Keep operational photos protected behind auth.
- Do not create public URLs for sensitive photos by default.
- Require consent/approval before marketing use.

### Maintainability Risk

Risk:
- Hardcoding image paths in components makes later replacement difficult.

Mitigation:
- Centralize image slots in content/config layer.
- Later move image policy to DB/config table before production.

## 13. Required Output Before Implementation

Before implementing image usage, report:

1. Which images will be used on which pages.
2. Which images can be used immediately.
3. Which images should be avoided in v1.
4. Which images require crop/context adjustment.
5. Which image slots will be prepared.
6. Which copy will replace old claim text.
7. Claim / PDPA / product scope risks.

## 14. Implementation Recommendation

Recommended v1 approach:

1. Add centralized asset/content config.
2. Add safe copy only from this document and approved product docs.
3. Build UI using product cards + image slots.
4. Do not use risky images in v1.
5. Do not use operational photos for marketing.
6. Run public-content claim review before production.
