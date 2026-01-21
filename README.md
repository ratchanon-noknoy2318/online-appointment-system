# Online Appointment System
**Real-time Clinical Scheduling & Management Platform**

---

### Technical Specification
| Category | Detail | Implementation |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (App Router) | Server Components & Server Actions |
| **Data Engine** | Google Sheets API | Asynchronous Headless CMS |
| **Styling** | CSS Modules | BEM Methodology & Scoped Architecture |
| **Deployment** | Vercel | Edge Runtime & Automated CI/CD |

---

### Architecture & Engineering
| Component | Implementation Detail |
| :--- | :--- |
| **Presentation** | Atomic Design Pattern with React Server Components (RSC) |
| **Data Access** | Abstraction layer mapping raw API data to structured JSON |
| **Performance** | Granular loading states via React.Suspense & Edge Caching |
| **Validation** | Server-side conflict prevention logic for appointment booking |

---

### Configuration (`.env`)
| Variable | Description |
| :--- | :--- |
| `GOOGLE_SHEET_ID` | Target Google Spreadsheet ID |
| `NEXT_PUBLIC_THEME_PRIMARY` | Global primary theme color (Hex) |

---

### Quick Start & Contact
- **Setup:** `npm install && cp .env.example .env.local`
- **Run:** `npm run dev`
- **License:** MIT © 2026 Ratchanon Noknoy
- **Connect:** [LinkedIn](https://www.linkedin.com/in/ratchanon-noknoy/) | [GitHub](https://github.com/Ratchanon2318)