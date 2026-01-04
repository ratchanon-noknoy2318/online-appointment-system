// app/config.js

// --- CONFIGURATION: ส่วนตั้งค่าหลักของแอปพลิเคชัน ---
export const GOOGLE_SHEET_ID = '1pry74Fs_pXDHduMQI1hUyfve8GQSB62qZ_ZgTQ1fpuc'; // <--- ใส่ Google Sheet ID ของคุณ
export const SHEET_NAME = 'ชีต1'; // <--- ใส่ชื่อ Sheet ที่ต้องการค้นหา (เช่น Sheet1)

// [สำคัญ] แก้ไขตัวเลข Index ให้ตรงกับคอลัมน์ใน Google Sheet ของคุณ
// การนับ Index (ตำแหน่ง) ของคอลัมน์ในการเขียนโปรแกรมจะเริ่มจาก 0
// คอลัมน์ A = 0, คอลัมน์ B = 1, คอลัมน์ C = 2, และต่อไปเรื่อยๆ
// **หมายเหตุ:** หากใช้ Google Form, คอลัมน์แรก (A) มักจะเป็น 'Timestamp' โดยอัตโนมัติ
export const NATIONAL_ID_COLUMN_INDEX = 0;    // คอลัมน์สำหรับ 'หมายเลขบัตรประชาชน'
export const FIRST_NAME_COLUMN_INDEX = 3;     // คอลัมน์สำหรับ 'ชื่อ'
export const LAST_NAME_COLUMN_INDEX = 4;      // คอลัมน์สำหรับ 'นามสกุล'
export const DOCTOR_NAME_COLUMN_INDEX = 23;   // คอลัมน์สำหรับ 'ชื่อแพทย์'
export const APPOINTMENT_DATE_COLUMN_INDEX = 20; // คอลัมน์สำหรับ 'วันที่นัด'
export const APPOINTMENT_TIME_COLUMN_INDEX = 21; // คอลัมน์สำหรับ 'เวลานัด'