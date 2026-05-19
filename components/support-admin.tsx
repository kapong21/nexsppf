'use client';

import { useState } from 'react';
import { Eyebrow, Icon } from './shared';
import { useGo } from '@/lib/use-go';

export const SupportWarrantyPage = () => {
  const go = useGo();
  const [submitted, setSubmitted] = useState(false);
  return (
    <main data-screen-label="08 Support · Warranty Lost" style={{ paddingBottom: 80 }}>
      <section className="page-hero">
        <div className="container-narrow">
          <Eyebrow>Support · Lost Warranty</Eyebrow>
          <h1 className="h-1 thai" style={{ marginTop: 14 }}>แจ้งบัตรรับประกันหรือ QR สูญหาย</h1>
          <p className="lede thai">
            กรอกข้อมูลเบื้องต้น ทีมงาน NEXS หรือตัวแทนจำหน่ายจะตรวจสอบสิทธิ์ของคุณ ก่อนแสดง record และดำเนินการออกบัตร / QR ใหม่
          </p>
        </div>
      </section>
      <section className="section-tight">
        <div className="container-narrow">
          {submitted ? (
            <div className="card thai" style={{ textAlign: 'center', padding: '56px 32px' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(27,127,79,0.1)', color: 'var(--status-active)', display: 'grid', placeItems: 'center', margin: '0 auto' }}>
                <Icon name="check" size={22}/>
              </div>
              <h3 className="h-2" style={{ marginTop: 24 }}>ส่งคำขอเรียบร้อย</h3>
              <p className="body" style={{ marginTop: 12, maxWidth: 480, margin: '12px auto 0' }}>
                ทีมงานจะตรวจสอบสิทธิ์ของคุณตามขั้นตอนความปลอดภัย และติดต่อกลับผ่านช่องทางที่คุณให้ไว้
              </p>
              <button className="btn btn-secondary btn-sm" style={{ marginTop: 24 }} onClick={() => go('home')}>กลับหน้าแรก</button>
            </div>
          ) : (
            <form className="card thai" style={{ padding: 40 }} onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <div className="field">
                <label className="label">Serial Code <span className="opt">(ถ้ามี)</span></label>
                <input className="input" placeholder="เช่น PRO-1196MXY0401178Q" style={{ fontFamily: 'var(--font-mono)' }}/>
              </div>
              <div className="field-row">
                <div className="field">
                  <label className="label">ชื่อ–นามสกุล</label>
                  <input className="input" required/>
                </div>
                <div className="field">
                  <label className="label">เบอร์ติดต่อ</label>
                  <input className="input" required placeholder="ใช้สำหรับยืนยันสิทธิ์"/>
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label className="label">วันที่ติดตั้ง <span className="opt">(โดยประมาณ)</span></label>
                  <input className="input" placeholder="เดือน / ปี"/>
                </div>
                <div className="field">
                  <label className="label">ตัวแทนจำหน่ายที่ติดตั้ง <span className="opt">(ถ้าจำได้)</span></label>
                  <input className="input"/>
                </div>
              </div>
              <div className="field">
                <label className="label">รายละเอียดเบื้องต้น</label>
                <textarea className="textarea" placeholder="แจ้งสาเหตุการสูญหาย / รายละเอียดที่จำได้"/>
              </div>
              <div className="card-flat" style={{ padding: 18, background: 'var(--soft-grey)', border: 'none', marginTop: 8 }}>
                <p className="caption" style={{ lineHeight: 1.6, color: 'var(--muted)' }}>
                  ข้อมูลจริงจะต้องตรวจสอบสิทธิ์ก่อนแสดง record และรูปที่เกี่ยวข้อง ระบบจะไม่เปิดเผยข้อมูลของบัตรทันทีเพื่อความปลอดภัย
                </p>
              </div>
              <div className="checkbox-row" style={{ marginTop: 18, marginBottom: 24 }}>
                <input id="pdpa-w" type="checkbox" required/>
                <label htmlFor="pdpa-w">ยินยอมตาม PDPA และเข้าใจว่าเป็นคำขอตรวจสอบ ไม่ใช่การออกบัตรอัตโนมัติ</label>
              </div>
              <button className="btn btn-primary btn-lg" type="submit">ส่งคำขอตรวจสอบ <Icon name="arrow-right" size={14}/></button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export const SupportInspectionPage = () => {
  const go = useGo();
  const [submitted, setSubmitted] = useState(false);
  return (
    <main data-screen-label="09 Support · Inspection" style={{ paddingBottom: 80 }}>
      <section className="page-hero">
        <div className="container-narrow">
          <Eyebrow>Support · Inspection</Eyebrow>
          <h1 className="h-1 thai" style={{ marginTop: 14 }}>แจ้งนัดตรวจสอบฟิล์มและงานหลังการติดตั้ง</h1>
          <p className="lede thai">
            ส่งคำขอตรวจสอบให้ทีม NEXS หรือตัวแทนจำหน่ายในพื้นที่ ทีมงานจะตรวจสอบ record ตามสิทธิ์ก่อนนัดหมายต่อไป
          </p>
        </div>
      </section>
      <section className="section-tight">
        <div className="container-narrow">
          {submitted ? (
            <div className="card thai" style={{ textAlign: 'center', padding: '56px 32px' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(27,127,79,0.1)', color: 'var(--status-active)', display: 'grid', placeItems: 'center', margin: '0 auto' }}>
                <Icon name="check" size={22}/>
              </div>
              <h3 className="h-2" style={{ marginTop: 24 }}>คำขออยู่ระหว่างตรวจสอบ</h3>
              <p className="body" style={{ marginTop: 12, maxWidth: 480, margin: '12px auto 0' }}>
                ทีมงานจะตรวจสอบ record ตามสิทธิ์และประสานงานต่อ การส่งคำขอนี้ไม่ใช่การอนุมัติเคลมโดยอัตโนมัติ
              </p>
              <button className="btn btn-secondary btn-sm" style={{ marginTop: 24 }} onClick={() => go('home')}>กลับหน้าแรก</button>
            </div>
          ) : (
            <form className="card thai" style={{ padding: 40 }} onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <div className="field-row">
                <div className="field">
                  <label className="label">Serial Code</label>
                  <input className="input" required style={{ fontFamily: 'var(--font-mono)' }}/>
                </div>
                <div className="field">
                  <label className="label">กลุ่มฟิล์ม</label>
                  <select className="select">
                    <option>Clear PPF</option>
                    <option>Matte PPF</option>
                    <option>Color PPF</option>
                  </select>
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label className="label">วันที่ติดตั้ง <span className="opt">(โดยประมาณ)</span></label>
                  <input className="input" placeholder="เดือน / ปี"/>
                </div>
                <div className="field">
                  <label className="label">ตัวแทนจำหน่าย</label>
                  <input className="input" placeholder="ชื่อร้าน / สาขา"/>
                </div>
              </div>
              <div className="field">
                <label className="label">รายละเอียดที่ต้องการให้ตรวจสอบ</label>
                <textarea className="textarea" placeholder="ระบุพื้นที่ / อาการ / สิ่งที่สังเกตเห็น"/>
              </div>
              <div className="field">
                <label className="label">รูปประกอบ <span className="opt">(แนบในขั้นตอนต่อไป)</span></label>
                <div style={{
                  border: '1px dashed var(--border)', borderRadius: 14,
                  padding: 24, textAlign: 'center', color: 'var(--muted-2)', fontSize: 13,
                }}>กรุณาเลือกรูปที่ไม่ติดข้อมูลส่วนตัว เช่น ทะเบียนรถ</div>
              </div>
              <div className="card-flat" style={{ padding: 18, background: 'var(--soft-grey)', border: 'none' }}>
                <p className="caption" style={{ lineHeight: 1.6, color: 'var(--muted)' }}>
                  การส่งคำขอนี้ ไม่ใช่ การอนุมัติเคลมอัตโนมัติ ทีมงานจะตรวจสอบ record ตามสิทธิ์ก่อนนัดหมายหรือเปิดเคสในระบบจริง
                </p>
              </div>
              <div className="checkbox-row" style={{ marginTop: 18, marginBottom: 24 }}>
                <input id="pdpa-i" type="checkbox" required/>
                <label htmlFor="pdpa-i">ยินยอมตาม PDPA และยอมรับว่าเป็นคำขอตรวจสอบ</label>
              </div>
              <button className="btn btn-primary btn-lg" type="submit">ส่งคำขอตรวจสอบ <Icon name="arrow-right" size={14}/></button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};
