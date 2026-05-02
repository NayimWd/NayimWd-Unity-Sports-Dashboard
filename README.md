<div align="center">

# 🏏 Unity Sports Dashboard

### A feature-rich Sports Tournament Management Dashboard built to handle real-world complexity — role-based access, tournament workflows, team management, and more.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![RTK Query](https://img.shields.io/badge/RTK_Query-Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)](https://react-hook-form.com/)
[![Zod](https://img.shields.io/badge/Zod-3-3E67B1?style=for-the-badge)](https://zod.dev/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radixui&logoColor=white)](https://www.radix-ui.com/)

<br/>

🔗 **Live Dashboard** → `[Deployment in progress — coming soon]`
&nbsp;&nbsp;|&nbsp;&nbsp;
🔗 **Live API** → [Railway](https://nayimwd-unitysportsclubapi-production.up.railway.app/api/v1)
&nbsp;&nbsp;|&nbsp;&nbsp;
🔗 **API Docs** → [Swagger UI](https://nayimwd-unitysportsclubapi-production.up.railway.app/api-docs/)

🔗 **Frontend Repo** → [GitHub](https://github.com/NayimWd/NayimWd-Unity-Sports-Dashboard)
&nbsp;&nbsp;|&nbsp;&nbsp;
🔗 **Backend Repo** → [GitHub](https://github.com/NayimWd/nayimwd-Unity_Sports_Club_Api)
&nbsp;&nbsp;|&nbsp;&nbsp;
🔗 **Data Model** → [Schema Diagram](https://drive.google.com/file/d/1DgaWpyFdYuJjKmeVMf8zARfbjvqLuZwq/view?usp=sharing)

</div>

---

## 📸 Screenshots

### 🗺️ Frontend Architecture Diagram
<img width="700" src="https://github.com/user-attachments/assets/24a7061c-db56-434f-aa06-eeeeedac30ab" alt="Frontend Architecture Diagram" />

### 🗺️ Backend Architecture Diagram
<img width="700" src="https://github.com/user-attachments/assets/6d314f7a-4e36-4b6d-ba6a-4a0db54f53b0" alt="Backend Architecture Diagram" />

### 🏠 Dashboard Overview
<img width="700" src="https://github.com/user-attachments/assets/8c9ae66e-b654-4307-8503-a7ba2e2a9314" alt="Dashboard Overview" />

### ⚙️ Admin Dashboard
<img width="700" src="https://github.com/user-attachments/assets/050fc9b9-2933-4b4e-b35a-4f9acdddca04" alt="Admin Dashboard" />

### 🏆 Tournament Application Management
<img width="700" src="https://github.com/user-attachments/assets/45b41ec5-486c-4902-9dd3-18fc3b132165" alt="Tournament Application Management" />

### 👥 Team Management — Manager Role
<img width="700" src="https://github.com/user-attachments/assets/46cacf88-b6fd-433b-ae85-119ca98a17ab" alt="Team Management" />

### 📝 Blog Section
<img width="700" src="https://github.com/user-attachments/assets/023d63c9-5865-43fd-a872-bc958018f5a8" alt="Blog Section" />

### 📋 Login Form 
<img width="700" src="https://github.com/user-attachments/assets/c24a1484-c4b2-463e-afb6-a292fbde55b9" alt="Login Form" />

### 📋 Multi-Step Form (Stepper)
<img width="1440" height="882" alt="Image" src="https://github.com/user-attachments/assets/e9ba5107-10c1-4301-9a44-5c5d36542bf4" alt="stepper Form"/>

## 🧭 The Story Behind Unity Sports

This project started with a LinkedIn post.

A senior engineer from Bangladesh — **HM Nayeem** — shared a project idea that caught my eye. At the time, I was still at a relatively early stage in my journey as a developer. But something about the scope felt right — not too simple, not unreachable, but genuinely challenging.

What made it personal was closer to home. In my local area, **cricket tournaments are a regular thing** — community-run, informally organized, and always chaotic to manage. I thought: *what if there was a proper system for this?* So I built one — from scratch. Requirements analysis, schema design, implementation — all of it.

### What I Learned (The Hard Way)

**Backend:** I had no idea about database normalization or query optimization when I started. I was querying full documents just to check if a record existed — then chaining `.select('_id').lean().exists()` only after I learned better. I was making multiple round-trips where one query would do. As I learned each concept, I went back and refactored immediately.

**Frontend:** I'll be honest — I didn't design the UI myself. I'm not a designer, so I used Claude (AI) to generate UI chunks step by step from my prompts. What I focused on was the architecture and logic layer. My early reusable components were just heavy prop-passing — messy and hard to scale. Then I came across **[Tapas Script](https://www.youtube.com/@tapasadhikary)** on YouTube — a channel by **Tapas Adhikary** that gave me a clear, practical understanding of React design patterns. Genuine credit where it's due — that channel directly shaped how I think about component architecture. I refactored my components immediately. A concrete example: I had 3 different profile views for 3 roles — I replaced the conditional mess with the **Strategy Pattern**, selecting the right profile component based on the user's role at runtime.

**Architecture:** Midway through, I realized **feature-based architecture** was the right fit for both the backend and the dashboard — but the codebase was already structured differently. Rather than stopping for a full rewrite, I applied the pattern going forward. It was a real lesson in *architectural decision-making under existing constraints* — something you rarely learn from tutorials.

The dashboard is one part of a larger vision — a **public-facing landing page** (CPL/IPL-inspired) is planned as a companion to this admin system.

---

## ✨ Features

### 🏆 Tournament Management *(Admin)*
- Create and manage tournaments end-to-end
- Assign umpires to matches
- Control tournament lifecycle and status

### 👥 Team & Player Management *(Manager)*
- Create and manage teams
- Apply teams to tournaments
- Manage player rosters

### 👤 Player & Umpire Profiles
- Profile creation and management
- Read access to tournaments, matches, and standings

### 📝 Blog Section
- Fully reusable blog UI built with `cn` (clsx + tailwind-merge)
- Consistent, scalable design system across all blog components

### 🔐 Role-Based Access Control
- 4 user roles: **Admin**, **Manager**, **Player**, **Umpire**
- Route-level and UI-level access enforcement
- Protected routes with auth guards per role

### 📋 Advanced Form Handling
- React Hook Form + Zod validation across all forms
- Reusable form components with consistent error UX
- Schema-driven validation — no duplicated logic

### 📊 Data Tables
- TanStack React Table integration
- Sortable, filterable, paginated tables
- Reusable table component with composable columns

### 🎨 Scalable Theme System
- CSS variable-based theming via TailwindCSS
- `cn` utility for conditional, conflict-free class merging
- Consistent design tokens across all components

### 🚨 Error Handling
- Global error boundary for runtime crashes
- Local error states per feature/component
- RTK Query error normalization and display layer

### 🔭 Observability *(Planned)*
- Sentry integration for error tracking and performance monitoring
- *To be added post-deployment*

### 📖 Component Documentation *(Planned)*
- Storybook integration for isolated component development
- *To be added in next iteration*

---

## ⚡ Performance & Architecture Decisions

### Code Splitting & Lazy Loading
- All feature routes are **lazily loaded** via `React.lazy()` + `Suspense`
- Each feature bundle is split at the route level — users only download what they need
- Suspense fallback UI (skeleton/spinner) per feature for smooth loading UX

### Feature-Based Architecture
- Codebase is organized **by feature, not by type** — each feature owns its components, hooks, API slice, and types
- This keeps related code co-located, makes features independently maintainable, and scales well as the project grows
- *Recognized late in the project — partially applied, with full refactor planned*

### Feature-Based Routing
- Routes are defined **per feature** and composed into a central route config
- Role guards (`ProtectedRoute`, `RoleRoute`) wrap routes declaratively — no scattered auth checks
- Lazy-loaded route components ensure the router itself stays lightweight

### Feature-Based State Management
- Each feature has its own **RTK Query API slice** — no monolithic API file
- Server state (RTK Query) and client state (Redux slices) are separated by concern
- Cache invalidation is handled per feature tag — updates in one feature don't pollute another's cache

### Optimizations
| Technique | Details |
|---|---|
| Route-level code splitting | `React.lazy()` + `Suspense` on every page component |
| Suspense fallback UI | Skeleton loaders per feature, not just a global spinner |
| RTK Query caching | Automatic background refetch, cache invalidation by tag |
| `cn` (clsx + twMerge) | Prevents Tailwind class conflicts at runtime |
| Component memoization | `React.memo` and `useMemo` applied where re-renders were profiled |

---

## 🧱 React Design Patterns Used

One of the core goals of this project was to practice and apply real-world React architecture patterns. Here's what's implemented and why:

| Pattern | Where Used | Purpose |
|---|---|---|
| **Compound Components** | Dropdown, Modal, Table | Co-located subcomponents sharing implicit state |
| **Composition (Prop Spreading)** | Button, Input, Card | Flexible, extensible base components via HTML prop forwarding |
| **Render Props / Slot Pattern** | Layout, Sidebar, Modal | Inversion of control for flexible UI injection |
| **Custom Hooks** | Auth, Form, Table, API | Encapsulating and reusing stateful logic |
| **Container / Presenter** | Feature pages | Separating data-fetching logic from pure UI |
| **Strategy Pattern** | Role-based rendering | Swapping behavior at runtime based on user role |
| **Provider Pattern** | Theme, Auth context | Scoped global state without prop drilling |

> Each pattern was learned and then **immediately applied or refactored into the codebase** — making this project a direct reflection of growing architectural knowledge.

---

## 🔐 Role-Based Access Control

| Feature | Admin | Manager | Player | Umpire |
|---|:---:|:---:|:---:|:---:|
| Create & manage tournaments | ✅ | ❌ | ❌ | ❌ |
| Assign umpires to matches | ✅ | ❌ | ❌ | ❌ |
| Create & manage teams | ❌ | ✅ | ❌ | ❌ |
| Apply to tournaments | ❌ | ✅ | ❌ | ❌ |
| Create player profile | ❌ | ❌ | ✅ | ❌ |
| Create umpire profile | ❌ | ❌ | ❌ | ✅ |
| View tournaments & matches | ✅ | ✅ | ✅ | ✅ |
| Blog access | ✅ | ✅ | ✅ | ✅ |

Route guards and UI rendering are both controlled by role — no UI leakage.

---

## 🗂️ Folder Structure

```
src/
├── app/store/          # Redux store + RTK Query setup
├── assets/             # Constants, images, global css
├── component/
│   └── common/
│       ├── card/       # Reusable card variants
│       ├── input/      # RHF-ready input components
│       ├── dropdown/   # Compound dropdown components
│       ├── Table/      # Headless table system
│       ├── skeleton/   # Per-feature skeleton loaders
│       ├── error/      # Global & section error boundaries
│       ├── loader/     # Suspense fallback loaders
│       └── Form/       # Form container wrapper
├── features/           # Feature-based modules (routes, state, UI)
├── hooks/              # Shared custom hooks
├── routes/             # Role guards + route config
└── services/           # RTK Query API slices
````

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + TypeScript | Core framework |
| RTK Query (Redux Toolkit) | Server state, caching, data fetching |
| React Hook Form + Zod | Form state + schema validation |
| React Router DOM v6 | Feature-based routing |
| TanStack React Table | Headless data tables |
| Radix UI | Accessible headless primitives (Modal, Dropdown...) |
| TailwindCSS + `cn` | Styling + conditional class merging |
| Sentry *(planned)* | Error tracking & performance monitoring |
| Storybook *(planned)* | Component documentation |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| Mongoose + MongoDB | Database ODM |
| JWT | Authentication |
| Swagger | API documentation |

---

## 🚀 Getting Started

### Prerequisites
- Node.js `>=18`
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/NayimWd/NayimWd-Unity-Sports-Dashboard.git
cd NayimWd-Unity-Sports-Dashboard

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### Environment Variables

```env
VITE_API_BASE_URL=https://nayimwd-unitysportsclubapi-production.up.railway.app/api/v1
# Add Sentry DSN here after setup
VITE_SENTRY_DSN=
```

### Run Locally

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## 📡 API Reference

Full API documentation is available via Swagger UI:

🔗 **Swagger Docs** → [https://nayimwd-unitysportsclubapi-production.up.railway.app/api-docs/](https://nayimwd-unitysportsclubapi-production.up.railway.app/api-docs/)

🔗 **Database Schema** → [View on Google Drive](https://drive.google.com/file/d/1DgaWpyFdYuJjKmeVMf8zARfbjvqLuZwq/view?usp=sharing)

---

## 🗺️ Roadmap

- [ ] Deploy frontend (Vercel)
- [ ] Sentry integration for error tracking
- [ ] Storybook component documentation
- [ ] Full refactor to feature-based architecture (backend + dashboard)
- [ ] Public-facing landing page (CPL/IPL-inspired) for tournaments
- [ ] Real-time match updates
- [ ] Notification system

---

## 👨‍💻 Author

**Nayim Hasan**

[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white)](http://nayim-hasan-portfolio.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/NayimWd)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nayim-hasan/)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:nayim.wd@gmail.com)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Built with curiosity, refactored with growth. ⚡</sub>
</div>