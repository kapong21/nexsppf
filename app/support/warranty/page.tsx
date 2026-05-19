import type { Metadata } from 'next';
import { SupportWarrantyPage } from '@/components/support-admin';

export const metadata: Metadata = {
  title: 'แจ้งบัตรรับประกัน / QR สูญหาย — NEXS',
  description: 'ส่งคำขอตรวจสอบสิทธิ์เพื่อออกบัตรรับประกัน / QR ใหม่ ทีมงาน NEXS จะตรวจสอบก่อนดำเนินการ',
  alternates: { canonical: 'https://nexsppf.com/support/warranty' },
};

export default function Page() {
  return <SupportWarrantyPage />;
}
