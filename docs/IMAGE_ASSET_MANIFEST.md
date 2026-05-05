# Image Asset Manifest — nexppf-web

Last Updated: 2026-05-05T12:20:00+00:00
Source: `/opt/data/agents/treee-tech-lead/projects/nexslabs-web/repo/public`
Destination: `/opt/data/agents/treee-tech-lead/projects/nexppf-web/repo/public`
Status: v1 allowed assets copied locally; production use still requires NEXS rights confirmation.

## Copied v1 Assets

| Destination | Source | SHA256 | Intended Usage |
|---|---|---|---|
| `public/nexs-logo.png` | `nexslabs-web/repo/public/nexs-logo.png` | `21d0ba3f52515e21cf24ee0d170907f8b8f037f268923546f398e018ea6f2eee` | Header, Footer, Login, Digital Warranty Card, Dealer/Admin dashboard |
| `public/images/hero-porsche.jpg` | `nexslabs-web/repo/public/images/hero-porsche.jpg` | `1baa679f1f73d0afdfa3357949537e96851a258ca6a343ed9312576fab04a3b6` | Home hero, Warranty hero, Product overview hero |
| `public/images/installer-hood.jpg` | `nexslabs-web/repo/public/images/installer-hood.jpg` | `1780185ee1941b0cb7545ad6a4ecfe3f3b2f513b1b4d3766db739eb9212296f8` | Dealer workflow, Warranty registration, After-sales, Maintenance placeholder |
| `public/images/nexs-ultimate-box.jpg` | `nexslabs-web/repo/public/images/nexs-ultimate-box.jpg` | `71edf9520f13366e349217ac22096bf3f5b6742127be4c7f7e33f1832f8a560f` | Packaging, Product proof, QR/Warranty explanation |
| `public/images/matte-bmw-full.jpg` | `nexslabs-web/repo/public/images/matte-bmw-full.jpg` | `c6ec29dc724b88337fe8203e4977e6fe71055bc2616a571d1460bffc8b95aab3` | Product mood/detail only; do not imply all products are matte |
| `public/images/matte-bmw-closeup.jpg` | `nexslabs-web/repo/public/images/matte-bmw-closeup.jpg` | `374da8f90d997ca897d075aaff588a8254a27f3ab56ce1ca8e6a69fdd81497c3` | Film surface/detail mood only; do not imply matte-only product scope |

## Not Copied into nexppf v1

These source assets were intentionally not copied because they may imply unapproved claims/product scope:

- `self-healing-closeup.jpg`
- `non-yellowing.jpg`
- `optical-clarity.jpg`
- `optical-clarity-maserati.jpg`
- `color-ppf-mclaren.jpg`
- `color-1000-swatchbook.jpg`
- `color-ppf-green.jpg`
- `headlight-install.jpg`

## Guardrails

- Do not reuse nexslabs public claim copy.
- Do not use risky/not-copied images in v1 unless NEXS admin approves.
- Do not use operational warranty/maintenance/inspection photos as marketing assets automatically.
- Keep future asset references centralized via image slots/content config.
