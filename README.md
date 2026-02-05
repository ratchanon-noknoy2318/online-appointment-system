# Online Appointment System

| PROJECT ARCHITECTURE & GOVERNANCE |
| :--- |
| **Real-time Clinical Scheduling & Management Platform** |
| ![Project Header](https://telemedscheduler.vercel.app/og-image.png) |

---

| SYSTEM STRATEGY & REQUIREMENTS | | |
| :--- | :--- | :--- |
| **Source of Requirement** | **Clinical Target** | **Architectural Solution** |
| **Senior Nursing Staff** | Optimized Patient Flow | Real-time scheduling to reduce OPD congestion. |
| **Clinical Standard** | Appointment Accuracy | Conflict prevention logic for double-booking protection. |
| **Management** | Resource Allocation | Headless CMS (Sheets) for agile schedule adjustment by staff. |

---

| 1. TECHNICAL ARCHITECTURE (STACK) | | |
| :--- | :--- | :--- |
| **Layer** | **Specification** | **Architectural Role** |
| **Frontend** | Next.js (App Router) | React Server Components (RSC) for optimized hydration. |
| **Logic** | Edge Runtime (Vercel) | Low-latency server-side processing for global access. |
| **Database** | Google Sheets API | Lightweight, real-time data source for clinical staff. |
| **Design** | CSS Modules (BEM) | Scalable and maintainable component-level styling. |

---

| 2. ENGINEERING & DESIGN PATTERNS | | |
| :--- | :--- | :--- |
| **Component** | **Implementation** | **Benefit** |
| **UI Pattern** | Atomic Design | Modular and reusable interface elements. |
| **Data Fetching** | React Suspense | Smooth loading states for high-traffic appointment slots. |
| **Logic Layer** | API Abstraction | Decouples frontend from the specific data source (Sheets). |
| **Reliability** | Server-side Validation | Ensures clinical data integrity before storage. |

---

| 3. DATA GOVERNANCE & PDPA ARCHITECTURE | | |
| :--- | :--- | :--- |
| **Feature** | **Implementation** | **Compliance Detail** |
| **Standard** | PDPA (Thailand) | Strictly aligned with healthcare data privacy laws. |
| **Security** | Data Isolation | Processing sensitive info on server-side only. |
| **Transparency** | Purpose-Limited Use | Data is strictly utilized for scheduling, no secondary use. |
| **Ethics** | Data Rights | Integrated system for data access and deletion requests. |

---

| 4. CONFIGURATION & DEPLOYMENT | |
| :--- | :--- |
| **Key Item** | **Value / Command** |
| **Installation** | `npm install && cp .env.example .env.local` |
| **Development** | `npm run dev` |
| **Sheet ID** | `GOOGLE_SHEET_ID` |
| **Credential** | `GOOGLE_SERVICE_ACCOUNT` |

---

| 5. METADATA & CONTACT | |
| :--- | :--- |
| **Lead Architect** | Ratchanon Noknoy |
| **Professional Role** | Developer in Collaboration with Senior Nursing Experts |
| **LinkedIn** | [linkedin.com/in/ratchanon-noknoy/](https://www.linkedin.com/in/ratchanon-noknoy/) |
| **GitHub** | [github.com/Ratchanon2318](https://github.com/Ratchanon2318) |
| **License** | MIT © 2026 |
