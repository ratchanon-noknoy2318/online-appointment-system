import { Kanit, Sarabun } from 'next/font/google';
import './globals.css';

// --- Font Configuration: การตั้งค่าฟอนต์ ---
// นำเข้าฟอนต์ Kanit จาก Google Fonts
const kanit = Kanit({
  subsets: ['latin', 'thai'], // ระบุ subsets ที่ต้องการใช้งาน
  display: 'swap', // ให้เบราว์เซอร์แสดงฟอนต์สำรองก่อน แล้วค่อยสลับเป็นฟอนต์นี้เมื่อโหลดเสร็จ
  variable: '--font-kanit', // กำหนดชื่อ CSS variable สำหรับฟอนต์นี้
  weight: ['400', '600'], // ระบุน้ำหนักของฟอนต์ที่ต้องการ
});

// นำเข้าฟอนต์ Sarabun จาก Google Fonts
const sarabun = Sarabun({
  subsets: ['latin', 'thai'],
  display: 'swap',
  variable: '--font-sarabun',
  weight: ['400', '700'],
});

// --- SEO Configuration: การตั้งค่าเพื่อผลลัพธ์ที่ดีในการค้นหา (SEO) ---
// URL หลักของเว็บไซต์ ใช้สำหรับสร้าง URL แบบเต็ม (Absolute URL) ใน metadata
const siteUrl = 'https://telemedscheduler.vercel.app';

// `metadata` object นี้จะถูกใช้โดย Next.js เพื่อสร้าง <head> tag ใน HTML
// ซึ่งมีความสำคัญต่อ SEO และการแสดงผลเมื่อแชร์ลิงก์ไปยัง Social Media
export const metadata = {
  // `metadataBase` ช่วยให้ Next.js สร้าง URL ที่สมบูรณ์สำหรับ metadata อื่นๆ
  // เช่น openGraph.images โดยอัตโนมัติ
  metadataBase: new URL(siteUrl),

  // `title` กำหนดชื่อของหน้าเว็บที่จะแสดงบนแท็บของเบราว์เซอร์และในผลการค้นหา
  title: {
    // `template` คือรูปแบบของ title สำหรับหน้าย่อยๆ
    // `%s` จะถูกแทนที่ด้วย title ที่กำหนดในแต่ละหน้า (page.js)
    template: '%s | ค้นหานัดหมาย Telemedicine โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร',
    // `default` คือ title ที่จะใช้เมื่อหน้านั้นๆ ไม่ได้กำหนด title ของตัวเอง
    default: 'ค้นหานัดหมาย Telemedicine | โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร',
  },

  // `description` คือคำอธิบายสั้นๆ เกี่ยวกับเว็บไซต์ จะแสดงในผลการค้นหาของ Google
  description: 'ตรวจสอบและค้นหาวัน-เวลานัดหมายการทำ Telemedicine (แพทย์ทางไกล) กับโรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร ได้ง่ายๆ เพียงกรอกหมายเลขบัตรประชาชน',

  // `keywords` คือคำค้นหาที่เกี่ยวข้องกับเว็บไซต์ ช่วยให้ Search Engine เข้าใจเนื้อหาของเว็บ
  keywords: ['ค้นหานัด', 'Telemedicine', 'แพทย์ทางไกล', 'โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร', 'KPPMCH', 'ตรวจสอบนัดหมาย', 'เช็คคิวนัด'],

  // `authors` ระบุผู้สร้างหรือเจ้าของเว็บไซต์
  authors: [{ name: 'โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร', url: siteUrl }],

  // `alternates.canonical` ระบุ URL หลักของหน้านั้นๆ เพื่อป้องกันปัญหาเนื้อหาซ้ำซ้อน (Duplicate Content)
  alternates: {
    canonical: '/',
  },

  // `icons` ใช้สำหรับกำหนด Favicon (ไอคอนบนแท็บเบราว์เซอร์) และไอคอนสำหรับอุปกรณ์ต่างๆ
  icons: {
    icon: '/favicon.ico', // ไอคอนหลัก
    shortcut: '/favicon-16x16.png', // ไอคอนสำหรับ shortcut
    apple: '/apple-touch-icon.png', // ไอคอนสำหรับอุปกรณ์ Apple
  },

  // `openGraph` คือการตั้งค่าการแสดงผลเมื่อมีการแชร์ลิงก์ไปยัง Social Media (เช่น Facebook, LINE)
  openGraph: {
    title: 'ค้นหานัดหมาย Telemedicine | โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร',
    description: 'ตรวจสอบนัดหมายแพทย์ทางไกลง่ายๆ เพียงกรอกหมายเลขบัตรประชาชน',
    url: siteUrl,
    siteName: 'KPPMCH Telemedicine Appointment',
    // `images` คือรูปภาพที่จะแสดงเมื่อแชร์ลิงก์ (ควรมีขนาด 1200x630 pixels)
    images: [
      {
        url: '/og-image.png', // URL ของรูปภาพ (ต้องอยู่ในโฟลเดอร์ public)
        width: 1200,
        height: 630,
      },
    ],
    locale: 'th_TH', // ระบุภาษาและประเทศ
    type: 'website', // ประเภทของเนื้อหา
  },
};

export default function RootLayout({ children }) {
  return (
    // `lang="th"` ช่วยให้ Search Engine และเบราว์เซอร์รู้ว่าเนื้อหาหลักในหน้านี้เป็นภาษาไทย
    <html lang="th" className={`${kanit.variable} ${sarabun.variable}`}>
      <body className={`${kanit.variable} ${sarabun.variable}`}>
        {children}
      </body>
    </html>
  );
}