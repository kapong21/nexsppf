export default function DealerDashboardPage() {
  return (
    <main className="site-shell">
      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Dealer Dashboard Skeleton</p>
            <h1>Dealer workflow preview</h1>
          </div>
          <p>หน้านี้เป็น static skeleton ก่อนต่อ auth/session และ dealerId isolation จริง</p>
        </div>
        <div className="grid three">
          <article className="card">
            <h2>Register Warranty</h2>
            <p>ลงทะเบียน warranty จาก serial ที่ตรวจสอบแล้ว โดย backend จริงต้อง bind กับ session ของ dealer เท่านั้น</p>
          </article>
          <article className="card">
            <h2>Own Records</h2>
            <p>dealer เห็นเฉพาะ records ของตัวเอง และข้อมูลลูกค้าต้อง masked ตาม PDPA ในหน้าที่ไม่จำเป็นต้องเห็นข้อมูลเต็ม</p>
          </article>
          <article className="card">
            <h2>After-sales Follow-up</h2>
            <p>ติดตาม maintenance, support request และ inspection request ที่เกี่ยวข้องกับ dealer account</p>
          </article>
        </div>
      </section>
    </main>
  );
}
