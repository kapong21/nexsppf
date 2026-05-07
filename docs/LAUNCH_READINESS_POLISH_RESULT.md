# Launch Readiness Polish Result — nexsppf-web

Last Updated: 2026-05-05T17:00:00+00:00
Status: Local only; not pushed/deployed

## Summary

NEXS approved the design direction but not final go-live. This pass polishes public copy, product decision support, warranty flow clarity, warranty card brand detail, contact form readiness, footer/legal links, and image-rights status notes without changing the overall layout or visual direction.

## Copy Polish

### Hero

Updated the Thai hero direction to a more customer-facing sales line:

`ปกป้องสีรถให้สวยเหมือนวันแรก พร้อมระบบบัตรรับประกันดิจิทัล ตรวจสอบได้ผ่าน QR Code`

No unapproved performance, supplier, or material claims were added.

### Product Line Intro

Updated public intro to:

`เลือก NEXS PPF จาก 4 รุ่นหลัก ตามระดับการปกป้อง อายุการรับประกัน และงบประมาณที่เหมาะกับคุณ`

Removed internal words from public source such as `warranty years`, `positioning`, and `CTA`.

### Why NEXS

Updated section description to:

`มั่นใจได้ด้วยระบบลงทะเบียนสินค้า ตรวจสอบสถานะรับประกัน และติดตามประวัติการดูแลหลังติดตั้ง`

Removed compliance/internal wording from public page source.

## Product Cards

Product cards now use:

| Product | Badge | Warranty Display | Benefits |
|---|---|---|---|
| BEGIN | เริ่มต้น | รับประกัน 5 ปี | สำหรับลูกค้าที่เริ่มต้นดูแลสีรถ; คุ้มค่า ใช้งานประจำวัน |
| PRIME | รุ่นแนะนำ | รับประกัน 6 ปี | รุ่นหลักของ NEXS; สมดุลระหว่างการปกป้องและความคุ้มค่า |
| PRO | พรีเมียม | รับประกัน 8 ปี | สำหรับลูกค้าที่ต้องการระดับพรีเมียม; เหมาะกับรถที่ต้องการการดูแลสูงขึ้น |
| ULTIMATE | รุ่นสูงสุด | รับประกัน 9 ปี | รุ่นสูงสุดของ NEXS; สำหรับลูกค้าที่ต้องการตัวเลือกระดับเรือธง |

CTA order:
1. Primary: `สอบถามราคา`
2. Secondary: `ดูรายละเอียด`

No public price is shown.

## Warranty Flow

Added 4-step warranty flow on homepage:

1. ติดตั้งกับตัวแทนจำหน่าย
2. Dealer ลงทะเบียน Serial และข้อมูลรถ
3. ลูกค้าสแกน QR Code
4. ดู Digital Warranty Card และประวัติการดูแลได้

Warranty copy now emphasizes after-sales trust and does not imply automatic claim approval.

## Warranty Mockup Brand Detail

Homepage warranty mockup now includes:

- NEXS logo
- `NEXS Digital Warranty`
- `ตัวอย่างข้อมูล`
- QR placeholder
- Product accent top border
- Thai labels:
  - รุ่นสินค้า
  - หมายเลข Serial
  - รถ
  - ตัวแทนจำหน่าย
  - วันที่ติดตั้ง
  - วันหมดอายุ

The `/r/[serial]` public warranty card also uses Thai labels instead of English dashboard labels.

## Dealer Section

Dealer section now adds customer-facing dealer benefits:

- ลงทะเบียนบัตรรับประกันให้ลูกค้า
- ตรวจสอบ Serial / QR Code
- ดูประวัติงานติดตั้งของร้าน
- บันทึกการดูแลหลังการติดตั้ง
- เพิ่มความน่าเชื่อถือให้ร้านติดตั้ง

CTA hierarchy remains:

1. สมัครตัวแทนจำหน่าย
2. Dealer Login

## Contact Form Readiness

Contact form now includes:

- Required field indicators for name, phone, province, customer type
- PDPA consent checkbox
- Privacy Policy link placeholder: `/privacy`
- Thai customer type dropdown values:
  - ลูกค้าสนใจติดตั้ง
  - ร้านค้าสนใจสมัครตัวแทนจำหน่าย
  - สอบถามเรื่องบัตรรับประกัน
  - อื่น ๆ
- CTA: `ส่งข้อมูลให้ทีมงานติดต่อกลับ`
- Success message placeholder
- Error message placeholder
- Phone validation / anti-spam readiness note for real form integration

Current form remains static and does not submit real customer data yet.

## Footer / Legal Links

Homepage footer now includes:

- NEXS Paint Protection Film
- ติดต่อเรา
- บัตรรับประกัน
- สำหรับตัวแทนจำหน่าย
- Privacy Policy
- Warranty Policy
- Dealer Login
- Copyright

`/privacy` and `/warranty-policy` are placeholder links that need real pages/content before final go-live.

## Image Rights / Asset Status

Image rights are not yet legally confirmed for final production. Current status:

| Asset | Status |
|---|---|
| `/nexs-logo.png` | Need NEXS commercial-use confirmation before go-live |
| `/images/hero-porsche.jpg` | Placeholder/staging until rights confirmed |
| `/images/installer-hood.jpg` | Placeholder/staging until rights confirmed |
| `/images/nexs-ultimate-box.jpg` | Placeholder/staging until rights confirmed |
| `/images/matte-bmw-full.jpg` | Placeholder/staging until rights confirmed; mood only |
| `/images/matte-bmw-closeup.jpg` | Placeholder/staging until rights confirmed; mood only |

Hold/avoid assets remain excluded from v1 due to claim/product-scope risk.

## Verification

Required before reporting complete:

- `npm test`
- `npm run check:content`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- Visual/HTTP check for public routes

## Deployment Status

- GitHub push: not done
- Production deploy: not done
- Final go-live approval: not granted
