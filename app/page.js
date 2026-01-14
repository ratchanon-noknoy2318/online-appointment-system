import Link from 'next/link';
import styles from './page.module.css';
import SearchFormHomepage from './SearchFormHomepage';
import {
  GOOGLE_SHEET_ID,
  SHEET_NAME,
  NATIONAL_ID_COLUMN_INDEX,
  FIRST_NAME_COLUMN_INDEX,
  LAST_NAME_COLUMN_INDEX,
  DOCTOR_NAME_COLUMN_INDEX,
  APPOINTMENT_DATE_COLUMN_INDEX,
  APPOINTMENT_TIME_COLUMN_INDEX,
} from './config';



/**
 * Server Action: ฟังก์ชันสำหรับค้นหาข้อมูลนัดหมายจาก Google Sheet
 * ฟังก์ชันนี้จะทำงานบนฝั่งเซิร์ฟเวอร์เท่านั้น เพื่อความปลอดภัยและประสิทธิภาพ
 * @param {object} prevState - state ก่อนหน้า (ไม่ได้ใช้งานในที่นี้ แต่เป็นข้อกำหนดของ useFormState)
 * @param {FormData} formData - ข้อมูลที่ส่งมาจากฟอร์ม (ในที่นี้คือ nationalId)
 * @returns {Promise<object>} - อ็อบเจกต์ที่ประกอบด้วย message และ data (ถ้ามี) เพื่อส่งกลับไปแสดงผลที่ Client
 */
async function searchAppointment(prevState, formData) {
  'use server'; // ประกาศให้ฟังก์ชันนี้เป็น Server Action

  // 1. ดึงและตรวจสอบข้อมูลที่ผู้ใช้กรอก
  const nationalId = formData.get('nationalId')?.trim();

  if (!nationalId || nationalId.length !== 13 || !/^\d+$/.test(nationalId)) {
    return { message: 'กรุณากรอกหมายเลขบัตรประชาชน 13 หลักให้ถูกต้อง' };
  }

  try {
    // 2. สร้าง URL สำหรับดึงข้อมูลจาก Google Sheet ในรูปแบบ CSV
    const url = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;
    
    // 3. ดึงข้อมูลจาก URL พร้อมตั้งค่า Cache (revalidate) เพื่อให้ข้อมูลสดใหม่อยู่เสมอ
    const response = await fetch(url, { next: { revalidate: 60 } }); // Cache for 60 seconds

    if (!response.ok) {
      throw new Error(`ไม่สามารถเชื่อมต่อ Google Sheet ได้ (Status: ${response.status})`);
    }

    // 4. แปลงข้อมูลที่ได้ให้เป็น Text (ข้อความ)
    const csvText = await response.text();
    
    // 5. แปลงข้อความ CSV ให้กลายเป็น Array สองมิติ (แถวและคอลัมน์)
    const rows = csvText.split('\n').map(row =>
      row.split(',').map(cell =>
        // ทำความสะอาดข้อมูลแต่ละช่อง โดยการลบช่องว่างและเครื่องหมายคำพูด (") ที่อาจติดมา
        cell.trim().replace(/^"|"$/g, '')
      )
    );

    // 6. ตัดแถวหัวข้อ (header) ซึ่งเป็นแถวแรกออก และกลับลำดับข้อมูล (reverse)
    // เพื่อให้ค้นหาจากข้อมูลที่ถูกเพิ่มเข้ามาล่าสุดก่อน ซึ่งมักจะเป็นนัดหมายล่าสุด
    const dataRows = rows.slice(1).reverse();

    // 7. ค้นหาแถวที่มีหมายเลขบัตรประชาชนตรงกับที่ผู้ใช้กรอก
    const appointmentRow = dataRows.find(row => row[NATIONAL_ID_COLUMN_INDEX] === nationalId);

    // 8. ตรวจสอบผลลัพธ์และส่งข้อมูลกลับไปแสดงผล
    if (appointmentRow) {
      // หากพบข้อมูล
      return {
        message: 'พบข้อมูลนัดหมาย',
        data: {
          name: `${appointmentRow[FIRST_NAME_COLUMN_INDEX]} ${appointmentRow[LAST_NAME_COLUMN_INDEX]}`,
          appointmentDate: appointmentRow[APPOINTMENT_DATE_COLUMN_INDEX],
          appointmentTime: appointmentRow[APPOINTMENT_TIME_COLUMN_INDEX],
          doctorName: appointmentRow[DOCTOR_NAME_COLUMN_INDEX] || 'ไม่ระบุ', // ใช้ 'ไม่ระบุ' หากช่องข้อมูลแพทย์ว่าง
        }
      };
    } else {
      // หากไม่พบข้อมูล
      return { message: 'ไม่พบข้อมูลนัดหมายสำหรับหมายเลขบัตรประชาชนนี้' };
    }
  } catch (error) {
    // 9. จัดการข้อผิดพลาดที่อาจเกิดขึ้นระหว่างการเชื่อมต่อหรือประมวลผล
    console.error('Search Error:', error);
    return { message: 'เกิดข้อผิดพลาดในการค้นหา กรุณาลองใหม่อีกครั้ง' };
  }
}

export default function HomePage() {
  const navLinks = [
    { text: 'หน้าหลักบริการแพทย์ทางไกล', href: 'https://kppmch-register.vercel.app/' },
    { text: 'บริการแพทย์ทางไกล คืออะไร?', href: 'https://kppmch-register.vercel.app/what-is-it' },
    { text: 'ข้อมูลติดต่ออย่างเป็นทางการ', href: 'https://kppmch-register.vercel.app/contact' },
    { text: 'คำถามเกี่ยวกับการใช้บริการ (FAQ)', href: 'https://kppmch-register.vercel.app/#faq' },
    { text: 'ลงทะเบียนใช้บริการแพทย์ทางไกล', href: 'https://kppmch-register.vercel.app/PatientRegister' },
  ];

  return (
    <main className={styles.main}>
      {/* --- ส่วนแสดงผลด้านซ้าย (ฟอร์มค้นหา) --- */}
      <div className={styles.leftColumn}>
        <header className={styles.header}>
          <h1 className={styles.companyName}>ค้นหานัดหมาย Telemedicine</h1>
          <p className={styles.tagline}>โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร</p>
        </header>

        <SearchFormHomepage searchAction={searchAppointment} />
      </div>

      {/* --- ส่วนแสดงผลด้านขวา (เมนูนำทาง) --- */}
      <nav className={styles.rightColumn} aria-label="ลิงก์บริการที่เกี่ยวข้อง">
        
        <ul className={styles.navList}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={styles.navLink}
                target="_blank"
                rel="noopener noreferrer">
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}