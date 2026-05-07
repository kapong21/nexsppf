# Image Asset Manifest — nexsppf-web

Last Updated: 2026-05-05T17:35:00+00:00
Source: `/opt/data/agents/treee-tech-lead/projects/nexslabs-web/repo/public`
Destination: `/opt/data/agents/treee-tech-lead/projects/nexsppf-web/repo/public`
Status: v1 allowed assets copied locally; production use still requires NEXS rights confirmation.

## Copied v1 Assets

| Destination | Source | SHA256 | Intended Usage | Rights / Launch Status |
|---|---|---|---|---|
| `public/nexs-logo.png` | `nexslabs-web/repo/public/nexs-logo.png` | `21d0ba3f52515e21cf24ee0d170907f8b8f037f268923546f398e018ea6f2eee` | Header, Footer, Login, Digital Warranty Card, Dealer/Admin dashboard | Need NEXS commercial-use confirmation before go-live |
| `public/images/hero-porsche.jpg` | `nexslabs-web/repo/public/images/hero-porsche.jpg` | `1baa679f1f73d0afdfa3357949537e96851a258ca6a343ed9312576fab04a3b6` | `hero_brand_visual`: home hero / product overview; wide aspirational crop | Placeholder/staging until rights confirmed |
| `public/images/installer-hood.jpg` | `nexslabs-web/repo/public/images/installer-hood.jpg` | `1780185ee1941b0cb7545ad6a4ecfe3f3b2f513b1b4d3766db739eb9212296f8` | `dealer_installation_visual`, `maintenance_after_sales_visual`: editorial crop around hands/tool/vehicle surface | Placeholder/staging until rights confirmed |
| `public/images/nexs-ultimate-box.jpg` | `nexslabs-web/repo/public/images/nexs-ultimate-box.jpg` | `71edf9520f13366e349217ac22096bf3f5b6742127be4c7f7e33f1832f8a560f` | `warranty_qr_visual`, `packaging_product_proof_visual`: product proof with breathing space; avoid readable risky copy | Placeholder/staging until rights confirmed |
| `public/images/matte-bmw-full.jpg` | `nexslabs-web/repo/public/images/matte-bmw-full.jpg` | `c6ec29dc724b88337fe8203e4977e6fe71055bc2616a571d1460bffc8b95aab3` | `contact_lead_visual`: mood only; do not imply matte-only product scope | Placeholder/staging until rights confirmed |
| `public/images/matte-bmw-closeup.jpg` | `nexslabs-web/repo/public/images/matte-bmw-closeup.jpg` | `374da8f90d997ca897d075aaff588a8254a27f3ab56ce1ca8e6a69fdd81497c3` | `product_line_visual`: detail/surface mood only; do not label as product proof | Placeholder/staging until rights confirmed |

## Image Role Map

| Role | Source | Page/Section | Crop Direction | Visual Purpose | Claim Risk | Readiness |
|---|---|---|---|---|---|---|
| `hero_brand_visual` | `/images/hero-porsche.jpg` | Home hero, product overview | Wide editorial crop, car dominant, clean breathing space | Lead the page visually as premium vehicle protection | Low if used as mood only | public-ready |
| `product_line_visual` | `/images/matte-bmw-closeup.jpg` | Product line support | Tight surface/detail crop | Material mood without forcing a photo into every SKU card | Medium; avoid matte-only implication | public-ready |
| `begin_product_visual` | graphical tile | BEGIN card | Silver/light-grey accent tile | Clean entry product identity | Low | placeholder |
| `prime_product_visual` | graphical tile | PRIME card | Graphite/blue-silver accent tile | Core product identity | Low | placeholder |
| `pro_product_visual` | graphical tile | PRO card | Carbon/red accent tile | Premium product identity | Low | placeholder |
| `ultimate_product_visual` | graphical tile | ULTIMATE card | Platinum/gold accent tile | Flagship product identity | Low | placeholder |
| `warranty_qr_visual` | `/images/nexs-ultimate-box.jpg` | Warranty / QR explanation | Product proof crop with white/grey negative space | Connect physical product with QR warranty trust | Medium; avoid visible risky package text | public-ready |
| `digital_warranty_card_mockup` | UI mockup | Digital Warranty System | Clean card composition | AppleCare-style warranty status visual | Low if data masked | public-ready |
| `dealer_installation_visual` | `/images/installer-hood.jpg` | Dealer / installer | Crop around hands/tool/film/surface | Professional installation craft | Low | public-ready |
| `packaging_product_proof_visual` | `/images/nexs-ultimate-box.jpg` | QR / product proof | Contain/crop with breathing space | Product proof, not random box filler | Medium; avoid risky package text | public-ready |
| `maintenance_after_sales_visual` | `/images/installer-hood.jpg` | Support / inspection | Detail workflow crop | After-sales care mood | Low | public-ready |
| `contact_lead_visual` | `/images/matte-bmw-full.jpg` | Contact lead | Calm wide vehicle mood crop | Premium brand context for lead form | Medium; avoid matte-only implication | public-ready |

## Hold / Avoid for v1

These source assets are intentionally not copied/assigned because they may imply unapproved claims or product scope:

- `self-healing-closeup.jpg`
- `non-yellowing.jpg`
- `optical-clarity.jpg`
- `optical-clarity-maserati.jpg`
- `color-ppf-mclaren.jpg`
- `color-1000-swatchbook.jpg`
- `color-ppf-green.jpg`
- `headlight-install.jpg`

## Reference Poster / Curated Visual System Policy

Latest Curated Visual System Pass uses reference posters/images as art direction only, not as website assets.

Allowed adaptation:
- Recreate the `Why PPF` education concept as short web-native cards.
- Recreate the `Why NEXS` brand-story concept as short web-native cards.
- Use CSS/HTML visuals such as `paint-layer-stack` and `visual-orbit` for premium composition.

Not allowed without explicit NEXS approval:
- Direct poster screenshots on public pages.
- Embedded poster text.
- Claim-heavy blocks such as Self-Healing, UV & Stain Resistant, Crystal Clear Finish, Hydrophobicity, Yellowing Resistance, Gloss >90 / >94, 10-Year Warranty, origin flags, or `nexsfilm.com`.
- Price/dealer/cost/promotion lineups.

## Guardrails

- Do not reuse nexslabs public claim copy.
- Do not use risky/not-copied images in v1 unless NEXS admin approves.
- Do not use operational warranty/maintenance/inspection photos as marketing assets automatically.
- Keep image references centralized via `src/content/image-assets.ts`.
- For public pages, every image must have a role, crop direction, visual purpose, claim-risk note, and readiness status.
- Prefer web-native curated visuals over poster/image dumps.
