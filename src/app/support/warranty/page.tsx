import { getImageSlot } from '@/content/image-assets';

export default function LostWarrantySupportPage() {
  const visual = getImageSlot('support_request_visual');

  return (
    <main className="site-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Warranty Support</p>
          <h1>แจ้งบัตรรับประกันหรือ QR สูญหาย</h1>
          <p className="lead">
            Static support skeleton สำหรับรับเรื่องบัตรรับประกันหรือ QR สูญหาย ก่อนเชื่อมต่อฐานข้อมูลและระบบยืนยันตัวตนจริง
          </p>
          <div className="form-shell compact">
            <label htmlFor="support-serial">Serial code ถ้ามี</label>
            <input id="support-serial" placeholder="เช่น PRO-1196MXY0401178Q" />
            <label htmlFor="support-phone">เบอร์ติดต่อแบบปลอดภัย</label>
            <input id="support-phone" placeholder="เช่น 081-xxx-1234" />
            <label htmlFor="support-note">รายละเอียดเบื้องต้น</label>
            <textarea id="support-note" placeholder="ระบุปัญหาโดยไม่ใส่ข้อมูลส่วนตัวเกินจำเป็น" />
            <p>ข้อมูลจริงจะต้องตรวจสิทธิ์ก่อนแสดง record และรูปที่เกี่ยวข้อง</p>
          </div>
        </div>
        <div className="hero-visual">{visual.path && <img src={visual.path} alt={visual.alt} />}</div>
      </section>
    </main>
  );
}
