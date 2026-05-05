# Image Asset Requirements — nexppf-web

Last Updated: 2026-05-05T16:30:00+00:00
Owner: Tor S / NEXS admin
Executor: treee-tech-lead
Status: Updated after Copy Cleanup + Image Composition Pass

## 1. Purpose

nexppf-web may use selected image assets from nexslabs.com only when they are NEXS-owned assets and the brand owner confirms usage rights.

The image system must support the Apple-inspired light premium direction:

- White / soft grey / graphite page theme
- Product tier colors as accents only
- Images as visual storytelling, not random section fillers
- Centralized, replaceable image slots
- No unapproved public claim text

## 2. Hard Rules

1. Images may be reused only when they are NEXS assets and NEXS has rights to use them.
2. Do not lift public claims/copy from nexslabs.com into nexppf-web.
3. Do not use images in a way that implies unapproved claims.
4. Do not use operational warranty/maintenance/inspection photos as public marketing images by default.
5. Product page must show 4 public product groups: BEGIN, PRIME, PRO, ULTIMATE.
6. Image slots must be centralized in `src/content/image-assets.ts` and replaceable later.
7. Every public image role must define source, page/section, crop direction, visual purpose, claim risk, and readiness.

## 3. Approved v1 Assets

| Asset | Allowed Use |
|---|---|
| `/nexs-logo.png` | Header, Footer, Login, Digital Warranty Card, Dealer/Admin dashboard |
| `/images/hero-porsche.jpg` | Hero / brand visual, product overview mood |
| `/images/installer-hood.jpg` | Dealer installation, after-sales, maintenance/support mood |
| `/images/nexs-ultimate-box.jpg` | Packaging/product proof, QR/warranty explanation |
| `/images/matte-bmw-full.jpg` | Contact/brand mood only; do not imply matte-only scope |
| `/images/matte-bmw-closeup.jpg` | Product/detail mood only; do not label as product proof |

## 4. Hold / Avoid v1 Assets

Avoid in v1 unless explicitly approved and context-controlled:

| Asset | Risk |
|---|---|
| `/images/self-healing-closeup.jpg` | May imply self-healing claim |
| `/images/non-yellowing.jpg` | May imply anti-yellowing/non-yellowing claim |
| `/images/optical-clarity-maserati.jpg` | May imply optical clarity performance claim |
| `/images/color-ppf-mclaren.jpg` | May imply color PPF scope |
| `/images/color-1000-swatchbook.jpg` | May imply 1000+ colors |
| `/images/color-ppf-green.jpg` | May imply color PPF scope |
| `/images/headlight-install.jpg` | May imply headlight PPF scope |

If any of these are later needed, require NEXS admin approval before production.

## 5. Required Image Role Map

Implemented in `src/content/image-assets.ts`:

| Role | Source | Section | Crop Direction | Visual Purpose | Readiness |
|---|---|---|---|---|---|
| `hero_brand_visual` | `/images/hero-porsche.jpg` | Home hero | Wide editorial crop, car dominant, clean breathing space | Premium vehicle protection lead visual | public-ready |
| `product_line_visual` | `/images/matte-bmw-closeup.jpg` | Product line support | Surface/detail crop | Premium finish mood without cluttering product cards | public-ready |
| `begin_product_visual` | none / graphical tile | BEGIN card | Silver/light-grey accent | Entry product identity | placeholder |
| `prime_product_visual` | none / graphical tile | PRIME card | Graphite/blue-silver accent | Core product identity | placeholder |
| `pro_product_visual` | none / graphical tile | PRO card | Carbon/red accent | Premium public product identity | placeholder |
| `ultimate_product_visual` | none / graphical tile | ULTIMATE card | Platinum/gold accent | Flagship identity | placeholder |
| `warranty_qr_visual` | `/images/nexs-ultimate-box.jpg` | Warranty QR | Product proof crop with negative space | Connect packaging with QR verification | public-ready |
| `digital_warranty_card_mockup` | UI mockup | Digital Warranty System | Clean card UI | AppleCare-style support/status visual | public-ready |
| `dealer_installation_visual` | `/images/installer-hood.jpg` | Dealer / installer | Hands/tool/film/surface crop | Professional installation craft | public-ready |
| `packaging_product_proof_visual` | `/images/nexs-ultimate-box.jpg` | Product proof | Contained product proof with breathing space | Premium physical product proof | public-ready |
| `maintenance_after_sales_visual` | `/images/installer-hood.jpg` | Support / inspection | Detail workflow crop | After-sales care story | public-ready |
| `contact_lead_visual` | `/images/matte-bmw-full.jpg` | Contact lead | Calm brand mood crop | Premium context for lead form | public-ready |

## 6. Page-by-Page Image Direction

| Page/Section | Decision |
|---|---|
| Home Hero | Use `/images/hero-porsche.jpg` as larger visual lead with intentional crop. |
| Product Line | Do not force real photos into every product card. Use Apple-style product tiles with accent colors. |
| Why NEXS | Keep clean benefit cards, avoid overusing car photos. |
| Digital Warranty | Use card mockup as main visual. Keep customer data masked. |
| Dealer / Installer | Use `/images/installer-hood.jpg` with editorial crop around craft/work surface. |
| QR / Product Proof | Use `/images/nexs-ultimate-box.jpg` as product proof block with breathing space. |
| Contact | Keep form simple; use only calm brand mood if needed. |

## 7. Copy Cleanup Rules

Public pages must not expose machine/database wording such as:

- `serial_code`
- `primary identity`
- `full URL as primary identity`
- `database logic`
- placeholder-style machine wording

Customer-facing QR explanation:

`QR Code และ Serial Number ช่วยให้ลูกค้าตรวจสอบสถานะสินค้าและบัตรรับประกันได้อย่างชัดเจน เมื่อ Dealer ลงทะเบียนการติดตั้งแล้ว ลูกค้าจะสามารถสแกนเพื่อดูข้อมูลบัตรรับประกันดิจิทัลได้ทันที`

Warranty copy must stay Thai-readable and support-style, not backend-style.

## 8. Operational Photos Rule

Operational photos must not become marketing assets automatically.

Operational photos include customer car photos, license plate photos, door sticker photos, warranty card photos, claim/defect photos, maintenance photos, receipts/pricing documents, chassis/VIN documents, and photos containing faces or personal data.

If real customer/installation photos are needed for marketing, require separate approval and consent tracking before use.

## 9. Verification Requirements

After changing image roles/composition, run:

- `npm test`
- `npm run check:content`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- Local route/visual checks for `/`, `/products`, `/contact`, `/dealer`, `/warranty`, `/support/warranty`, `/support/inspection`, `/admin`, `/r/PRO-1196MXY0401178Q`
