# Curated Visual System Direction — nexsppf-web

Last Updated: 2026-05-05T17:40:59+00:00
Owner: Tor S / NEXS admin
Executor: treee-tech-lead
Status: Source of truth for public website visual/content direction before push/deploy

## 1. Project Framing

`nexsppf.com` is a 3-layer website:

1. Information Website — educate customers about NEXS PPF and why paint protection matters.
2. Sales / Product Website — present products, help customers choose a tier, generate leads, and support dealer applications.
3. Warranty / After-sales System — QR verification, Digital Warranty Card, dealer/admin workflows, maintenance, support, and inspection requests.

This project is not only a warranty-card system and not only a backend dashboard. Public pages must help sell the product, give clear information, build trust before purchase, and continue into after-sales support.

## 2. Core Visual Principle

Core rule: **Curated Visual System, Not Asset Dump**.

Meaning:

- Do not paste reference images, old posters, poster screenshots, or legacy assets directly into the site.
- Use reference material only as art direction, storytelling inspiration, product-role inspiration, and layout inspiration.
- Select only the concepts that fit a premium public website.
- Recreate visuals specifically for web and mobile UX.
- Rewrite copy for nexsppf.com instead of copying old poster text.
- Keep UI/UX clean, trustworthy, premium, and easy to use.
- Avoid clutter, information overload, oversized text blocks, and claims that are not needed.

## 3. Visual Direction

The visual direction must stay:

- Apple-inspired white/grey premium theme.
- White / soft grey / graphite as the global UI base.
- Product colors used as controlled accents, not as the whole page theme.
- NEXS red accent used sparingly.
- Premium automotive but not dark, tuner-like, or cluttered.
- Mobile-first: readable typography, short sections, clear CTAs, and enough whitespace.
- Cleaner than the reference posters.

## 4. Website Story Flow

The public website story flow should follow this order unless NEXS approves a different information architecture:

1. Hero — premium first impression, product/trust positioning, clear CTAs.
2. Why PPF — short education for customers who do not yet understand PPF.
3. Product Line — BEGIN / PRIME / PRO / ULTIMATE, warranty years, lead-first CTAs.
4. Why NEXS / Brand Story — curated trust story without unapproved performance claims.
5. Digital Warranty — QR verification and warranty-card trust layer.
6. Dealer / Installer — professional installation and dealer workflow.
7. Contact / Lead — ask for price, contact Dealer/NEXS, apply as dealer.

One section should communicate one main idea. One visual should have one purpose.

## 5. Public Products

Public website product groups:

- BEGIN — 5 years
- PRIME — 6 years
- PRO — 8 years
- ULTIMATE — 9 years

Rules:

- PRO is a public product group.
- `R75` and `R85` are internal PRO variants unless NEXS admin approves separate public display.
- Do not hardcode a 3-product limitation.
- Product/model logic must support multi-character model codes.

## 6. Guardrails

Public pages must not show:

- public price
- dealer price
- factory cost
- margin
- discount
- promotion
- supplier cost
- material/supplier/performance claims unless explicitly approved

Forbidden claims/terms include, unless approved by NEXS admin:

- Bayer
- Wanhua
- Covestro
- Lubrizol
- Ashland
- self-healing
- anti-yellowing
- non-yellowing
- chemical resistance
- hydrophobicity
- gloss numbers
- 1000+ colors
- made in USA
- origin flag/material claims
- PCU / TPU source claims
- UV & Stain Resistant
- Crystal Clear Finish / optical clarity claims
- Yellowing Resistance
- 10-Year Warranty if public config remains 5/6/8/9
- nexsfilm.com

Use safe CTA wording instead, such as:

- สอบถามราคา
- ติดต่อ Dealer
- ตรวจสอบบัตรรับประกัน
- สมัครตัวแทนจำหน่าย

## 7. Warranty System Direction

Warranty is an after-sales trust feature, not the whole website.

Core warranty rules:

- QR scan can happen at any time.
- Customer cannot activate warranty by themselves.
- Dealer/Admin must register the installation before a Digital Warranty Card becomes Active.
- If a customer scans before Dealer registration, the page must show safe `Not Registered` status, not an error.
- No public lookup by phone number or license plate.
- Public warranty pages must be PDPA-safe and must not expose full customer data, email, chassis/VIN, sensitive photos, or internal dealer notes.

## 8. Execution Rule

Until Tor S / NEXS explicitly approves otherwise:

- Work local only.
- Do not push GitHub.
- Do not deploy production.
- Do not change production files or infrastructure.
- Report screenshot and verification before asking for approval.

Required verification before reporting UI/content changes:

- `git diff --check`
- `npm test`
- `npm run check:content`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- HTTP route checks for required pages
- Visual QA screenshot for layout/readability

## 9. Current Local Reference Point

Current local reference commit for this direction:

- `e07d85c3c66e633f66f46dcc37d80c40060c0b4c`
- `feat(nexppf): add curated visual system pass`

Current status at the time this direction was saved:

- Local branch is ahead of `origin/main` by 10 commits.
- GitHub has not been pushed with these 10 local commits.
- Production has not been deployed.
