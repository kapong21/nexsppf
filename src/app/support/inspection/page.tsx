import { getImageSlot } from '@/content/image-assets';

export default function InspectionRequestPage() {
  const visual = getImageSlot('maintenance_after_sales_visual');

  return (
    <main className="site-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Inspection Request</p>
          <h1>แจ้งนัดตรวจสอบฟิล์มและงานหลังการติดตั้ง</h1>
          <p className="lead">
            Static inspection skeleton สำหรับให้ลูกค้าส่งคำขอตรวจสอบเบื้องต้น โดยยังไม่เปิดเผยข้อมูล warranty record หรือรูปภายในระบบ
          </p>
          <div className="grid two">
            <article className="card">
              <h2>ข้อมูลที่ควรเตรียม</h2>
              <p>Serial code, รุ่นสินค้า, วันที่ติดตั้งโดยประมาณ, ชื่อตัวแทนจำหน่าย และรูปประกอบที่ไม่ติดข้อมูลส่วนตัว</p>
            </article>
            <article className="card">
              <h2>ขั้นตอนถัดไป</h2>
              <p>ทีม NEXS หรือตัวแทนจำหน่ายตรวจสอบ record ตามสิทธิ์ ก่อนนัดหมายหรือเปิดเคสในระบบจริง</p>
            </article>
          </div>
        </div>
        <div className="hero-visual">{visual.path && <img src={visual.path} alt={visual.alt} />}</div>
      </section>
    </main>
  );
}
