import type { Metadata } from 'next';
import { SupportInspectionPage } from '@/components/support-admin';

export const metadata: Metadata = {
  title: 'นัดตรวจสอบฟิล์ม — NEXS',
  description: 'ส่งคำขอตรวจสอบฟิล์มและงานหลังการติดตั้งกับ NEXS หรือตัวแทนจำหน่ายในพื้นที่',
  alternates: { canonical: 'https://nexsppf.com/support/inspection' },
};

export default function Page() {
  return <SupportInspectionPage />;
}
