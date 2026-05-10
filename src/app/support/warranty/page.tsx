'use client';

import { useState } from 'react';

export default function LostWarrantySupportPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="variant-b-shell variant-b-support-shell">
      <section className="variant-b-support-hero">
        <p className="variant-b-eyebrow">Support · Lost Warranty</p>
        <h1>แจ้งบัตรรับประกันหรือ QR สูญหาย</h1>
        <p>
          กรอกข้อมูลเบื้องต้น ทีมงาน NEXS หรือตัวแทนจำหน่ายจะตรวจสอบสิทธิ์ของคุณ
          ก่อนแสดง record และดำเนินการออกบัตร / QR ใหม่
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
            <h2>ส่งคำขอเรียบร้อย</h2>
            <p>ทีมงานจะตรวจสอบสิทธิ์ของคุณตามขั้นตอนความปลอดภัย และติดต่อกลับผ่านช่องทางที่คุณให้ไว้</p>
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
            <label className="wide">
              Serial Code <span className="opt">(ถ้ามี)</span>
              <input className="mono" placeholder="เช่น PRO-1196MXY0401178Q" />
            </label>
            <label>
              ชื่อ–นามสกุล
              <input required />
            </label>
            <label>
              เบอร์ติดต่อ
              <input required placeholder="ใช้สำหรับยืนยันสิทธิ์" />
            </label>
            <label>
              วันที่ติดตั้ง <span className="opt">(โดยประมาณ)</span>
              <input placeholder="เดือน / ปี" />
            </label>
            <label>
              ตัวแทนจำหน่ายที่ติดตั้ง <span className="opt">(ถ้าจำได้)</span>
              <input />
            </label>
            <label className="wide">
              รายละเอียดเบื้องต้น
              <textarea placeholder="แจ้งสาเหตุการสูญหาย / รายละเอียดที่จำได้" />
            </label>
            <p className="variant-b-support-note wide">
              ข้อมูลจริงจะต้องตรวจสอบสิทธิ์ก่อนแสดง record และรูปที่เกี่ยวข้อง
              ระบบจะไม่เปิดเผยข้อมูลของบัตรทันทีเพื่อความปลอดภัย
            </p>
            <label className="variant-b-checkbox wide">
              <input type="checkbox" required /> ยินยอมตาม PDPA และเข้าใจว่าเป็นคำขอตรวจสอบ ไม่ใช่การออกบัตรอัตโนมัติ
            </label>
            <button type="submit">ส่งคำขอตรวจสอบ</button>
          </form>
        )}
      </section>
    </main>
  );
}
