'use client';

import { useState } from 'react';

export default function InspectionRequestPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="variant-b-shell variant-b-support-shell">
      <section className="variant-b-support-hero">
        <p className="variant-b-eyebrow">Support · Inspection</p>
        <h1>แจ้งนัดตรวจสอบฟิล์มและงานหลังการติดตั้ง</h1>
        <p>
          ส่งคำขอตรวจสอบให้ทีม NEXS หรือตัวแทนจำหน่ายในพื้นที่
          ทีมงานจะตรวจสอบ record ตามสิทธิ์ก่อนนัดหมายต่อไป
        </p>
      </section>

      <section className="variant-b-support-body">
        {submitted ? (
          <div className="variant-b-support-success">
            <span className="variant-b-support-success-dot" aria-hidden>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5 10 17 19 7" />
              </svg>
            </span>
            <h2>คำขออยู่ระหว่างตรวจสอบ</h2>
            <p>
              ทีมงานจะตรวจสอบ record ตามสิทธิ์และประสานงานต่อ
              การส่งคำขอนี้ไม่ใช่การอนุมัติเคลมโดยอัตโนมัติ
            </p>
            <a className="variant-b-small-cta" href="/">
              กลับหน้าแรก
            </a>
          </div>
        ) : (
          <form
            className="variant-b-support-form"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <label>
              Serial Code
              <input required className="mono" />
            </label>
            <label>
              รุ่นสินค้า
              <select defaultValue="PRIME">
                <option>BEGIN</option>
                <option>PRIME</option>
                <option>PRO</option>
                <option>ULTIMATE</option>
              </select>
            </label>
            <label>
              วันที่ติดตั้ง <span className="opt">(โดยประมาณ)</span>
              <input placeholder="เดือน / ปี" />
            </label>
            <label>
              ตัวแทนจำหน่าย
              <input placeholder="ชื่อร้าน / สาขา" />
            </label>
            <label className="wide">
              รายละเอียดที่ต้องการให้ตรวจสอบ
              <textarea placeholder="ระบุพื้นที่ / อาการ / สิ่งที่สังเกตเห็น" />
            </label>
            <div className="variant-b-support-photo wide">
              <span>รูปประกอบ</span>
              <span className="opt">แนบในขั้นตอนต่อไป</span>
              <p>กรุณาเลือกรูปที่ไม่ติดข้อมูลส่วนตัว เช่น ทะเบียนรถ</p>
            </div>
            <p className="variant-b-support-note wide">
              การส่งคำขอนี้ ไม่ใช่ การอนุมัติเคลมอัตโนมัติ ทีมงานจะตรวจสอบ record
              ตามสิทธิ์ก่อนนัดหมายหรือเปิดเคสในระบบจริง
            </p>
            <label className="variant-b-checkbox wide">
              <input type="checkbox" required /> ยินยอมตาม PDPA และยอมรับว่าเป็นคำขอตรวจสอบ
            </label>
            <button type="submit">ส่งคำขอตรวจสอบ</button>
          </form>
        )}
      </section>
    </main>
  );
}
