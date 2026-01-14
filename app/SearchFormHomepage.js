// --- SearchFormHomepage.js ---

// ประกาศว่าคอมโพเนนต์นี้เป็น "Client Component"
// ทำให้สามารถใช้ Hooks ของ React เช่น useFormState, useState, useEffect ได้
'use client';

// นำเข้า Hooks ที่จำเป็นจาก react-dom และไฟล์ CSS
import { useFormState, useFormStatus } from 'react-dom';
import styles from './styles/page.module.css';

// กำหนดค่าเริ่มต้นสำหรับ state ของฟอร์ม
// message จะเป็น null ในตอนแรก และจะถูกอัปเดตเมื่อ Server Action ทำงานเสร็จ
const initialState = {
  message: null,
};

/**
 * คอมโพเนนต์สำหรับปุ่ม Submit ของฟอร์ม
 * ใช้ useFormStatus Hook เพื่อตรวจสอบสถานะของฟอร์ม (เช่น กำลังรอการตอบกลับจากเซิร์ฟเวอร์)
 */
function SubmitButton() {
  // `pending` จะเป็น true เมื่อฟอร์มกำลังถูกส่งและรอการตอบกลับ
  const { pending } = useFormStatus();

  return (
    // ปุ่มจะถูกปิดใช้งาน (disabled) และเปลี่ยนข้อความเป็น "กำลังค้นหา..." ขณะที่ `pending` เป็น true
    <button
      type="submit"
      aria-disabled={pending}
      className={styles.submitButton}
      disabled={pending}
    >
      {pending ? 'กำลังค้นหา...' : 'ค้นหา'}
    </button>
  );
}

/**
 * คอมโพเนนต์หลักสำหรับฟอร์มค้นหาและแสดงผลลัพธ์
 * @param {{ searchAction: Function }} props - รับ Server Action ที่จะใช้ในการค้นหาข้อมูล
 */
export default function SearchFormHomepage({ searchAction }) {
  // `useFormState` เป็น Hook ที่ใช้จัดการ state ของฟอร์มที่ทำงานร่วมกับ Server Action
  // - `state`: คือ state ปัจจุบันของฟอร์ม (จะถูกอัปเดตด้วยค่าที่ Server Action return กลับมา)
  // - `formAction`: คือฟังก์ชันที่จะถูกเรียกเมื่อฟอร์มถูก submit
  const [state, formAction] = useFormState(searchAction, initialState);

  return (
    // กรอบสีขาวที่หุ้มฟอร์มและผลลัพธ์
    <div className={styles.formWrapper}>
      {/* ฟอร์มสำหรับกรอกข้อมูล */}
      <form action={formAction} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="nationalId" className={styles.label}>
            กรอกหมายเลขบัตรประชาชน 13 หลัก
          </label>
          <input
            id="nationalId" // id สำหรับเชื่อมกับ label
            name="nationalId" // name ที่จะใช้ใน Server Action เพื่อดึงข้อมูล (formData.get('nationalId'))
            type="tel" // ใช้ type="tel" เพื่อให้คีย์บอร์ดบนมือถือแสดงเป็นตัวเลข
            maxLength="13" // จำกัดความยาว 13 ตัวอักษร
            required // บังคับให้ต้องกรอกข้อมูล
            className={styles.input} // ใช้สไตล์จาก CSS Module
            placeholder="xxxxxxxxxxxxx" // ข้อความตัวอย่างในช่องกรอก
          />
        </div>
        <SubmitButton />
      </form>

      {/* --- ส่วนแสดงผลลัพธ์ --- */}
      {/* แสดงกล่องนี้ก็ต่อเมื่อ state.message มีค่า (ไม่ใช่ null) */}
      {state?.message && (
        <div
          // กำหนด class ของกล่องผลลัพธ์
          // ถ้ามี `state.data` (ค้นหาสำเร็จ) จะใช้สไตล์ resultSuccess
          // ถ้าไม่มี `state.data` (เกิดข้อผิดพลาด) จะใช้สไตล์ resultError
          className={`${styles.resultBox} ${
            state.data ? styles.resultSuccess : styles.resultError
          }`}
        >
          {/* แสดงข้อความหลักที่ได้จาก Server Action */}
          <p className={styles.resultMessage}>{state.message}</p>
          
          {/* ถ้ามีข้อมูล (state.data) ให้แสดงรายละเอียดข้อมูลนัดหมาย */}
          {state.data && (
            <div className={styles.resultData}>
              <p><strong>ชื่อ-สกุล:</strong> {state.data.name}</p>
              <p><strong>วันที่นัด:</strong> {state.data.appointmentDate}</p>
              <p><strong>เวลานัด:</strong> {state.data.appointmentTime}</p>
              <p><strong>แพทย์ผู้นัด:</strong> {state.data.doctorName}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}