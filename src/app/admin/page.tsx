export default function AdminDashboardPage() {
  return (
    <main className="site-shell">
      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Admin Dashboard Skeleton</p>
            <h1>NEXS admin operations preview</h1>
          </div>
          <p>พื้นที่สำหรับผู้ดูแลระบบในการจัดการ Serial, Warranty, Dealer และคำขอหลังการขาย โดยต้องเข้าสู่ระบบก่อนใช้งาน</p>
        </div>
        <div className="grid three">
          <article className="card">
            <h2>Serial Import</h2>
            <p>นำเข้า serial แบบ dry-run, ตรวจ duplicate และ map model code หลายตัวอักษรได้ถูกต้อง</p>
          </article>
          <article className="card">
            <h2>Dealer Oversight</h2>
            <p>ตรวจสถานะ dealer, warranty registrations และ support queue โดยต้องมี audit trail</p>
          </article>
          <article className="card">
            <h2>Policy Config</h2>
            <p>พื้นที่อนาคตสำหรับ approved config/admin policy โดยต้องไม่ hardcode business rule ใน public page</p>
          </article>
        </div>
      </section>
    </main>
  );
}
