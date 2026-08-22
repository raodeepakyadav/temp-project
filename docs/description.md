# CampusConnect: Centralized Campus Club & Event Management Portal

> **Course Code:** 25CS022 – Back-end Engineering  
> **Evaluation:** Continuous Assessment-II (CA-II)  
> **Institution:** Chitkara University, Himachal Pradesh  
> **Tech Stack:** MERN (MongoDB, Express.js, React.js, Node.js)  

---

## 1. Project Overview & Abstract

**CampusConnect** is a full-stack web platform developed to unify and streamline extracurricular management across college campuses. In typical university ecosystems, student engagement is heavily hindered because event updates, club registrations, and administrative announcements are fragmented across informal WhatsApp groups, physical notice boards, scattered emails, and third-party social media channels. 

CampusConnect solves this by providing a unified, role-based platform where:
- **Students** can discover campus clubs, apply for memberships, register for events with real-time seat tracking, and view centralized campus notifications.
- **Club Leads & Administrators** can manage club portfolios, schedule and publicize campus events, review registration rosters, and broadcast official announcements.

The application follows an industry-standard **3-tier architecture**, utilizing **React.js** on the frontend, **Node.js with Express.js** for the REST API layer, **MongoDB** for flexible NoSQL data persistence, and **JWT (JSON Web Tokens)** alongside **bcrypt.js** for role-based authentication and secure session handling.

---

## 2. Problem Statement & Motivation

### 2.1 The Problem
In most academic institutions, student engagement suffers from:
1. **Information Fragmentation:** Club announcements, event posters, and registration links are scattered across unorganized WhatsApp chats, Instagram stories, and static notice boards.
2. **High Administrative Friction:** Club coordinators manually track registrations through Google Forms/Sheets, resulting in duplicate entries, lack of verified student identity, and poor data tracking.
3. **Low Student Participation:** Students frequently miss registration deadlines or fail to discover clubs aligned with their interests due to the lack of a centralized directory.
4. **Lack of Auditability:** Campus authorities lack centralized analytics regarding student club involvement and event turnouts.

### 2.2 The Solution
CampusConnect provides a single, responsive portal that digitizes the entire lifecycle of student activities. It offers transparent club directories, self-service event registration, real-time status updates, and granular administrative controls for faculty and club coordinators.

---

## 3. Project Objectives & Goals

- **Centralize Information:** Consolidate all clubs, upcoming workshops, hackathons, cultural fests, and announcements into a single digital dashboard.
- **Role-Based Access Control (RBAC):** Provide distinct access levels and user experiences for **Students** and **Administrators**.
- **Automate Registrations:** Replace third-party forms with built-in one-click event registrations with seat limits and attendee lists.
- **Mobile-First & Responsive Experience:** Ensure all students can browse and register seamlessly across desktops, tablets, and smartphones.
- **Industry Standards & Version Control:** Maintain clean, modular code with systematic, atomic Git commits demonstrating continuous development.

---

## 4. System Architecture & Tech Stack

### 4.1 3-Tier Architecture
```text
+-------------------------------------------------------------+
|                      PRESENTATION LAYER                     |
|         React.js + Tailwind CSS + Axios + React Router      |
+-------------------------------------------------------------+
                              |
                     RESTful API / HTTPS (JSON)
                              |
+-------------------------------------------------------------+
|                      APPLICATION LAYER                      |
|          Node.js + Express.js + JWT Auth + Middleware       |
+-------------------------------------------------------------+
                              |
                        Mongoose ODM
                              |
+-------------------------------------------------------------+
|                       DATABASE LAYER                        |
|                     MongoDB (NoSQL Cluster)                 |
+-------------------------------------------------------------+
```

### 4.2 Technologies Used
| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React.js (Vite) | Component-driven, dynamic Single Page Application (SPA) |
| **Styling** | Tailwind CSS | Modern utility-first responsive styling framework |
| **Routing** | React Router DOM v6 | Client-side routing with guarded role-based access |
| **HTTP Client**| Axios | Promise-based HTTP client with token interceptors |
| **Backend** | Node.js & Express.js | Event-driven runtime with a lightweight REST API server |
| **Database** | MongoDB (Mongoose) | Scalable document database for users, clubs, and events |
| **Security** | JWT & bcrypt.js | Token-based stateless authentication & password hashing |
| **Dev Tools** | VS Code, Postman, Compass| Development, API testing, and database visualization |

---

## 5. Requirements Specification (Phase 1)

### 5.1 Functional Requirements (FR)

#### Module 1: Authentication & User Management
- **FR 1.1:** Users must be able to register using their Name, College Email, Roll Number, Department, and Password.
- **FR 1.2:** Passwords must be securely hashed before storage (`bcrypt.js`, salt rounds $\ge 10$).
- **FR 1.3:** Authenticated sessions must issue signed JWT tokens containing user ID and Role (`student` or `admin`).
- **FR 1.4:** Token verification middleware must guard protected endpoints.

#### Module 2: Club Management
- **FR 2.1:** Any visitor/student can browse clubs categorized by Technical, Cultural, Sports, Arts, and Social.
- **FR 2.2:** Students can view individual club details, faculty coordinators, and active members.
- **FR 2.3:** Students can click "Join Club" to subscribe to club updates.
- **FR 2.4:** Admins have full CRUD access: create new clubs, update club banners/descriptions, and archive clubs.

#### Module 3: Event Management & Registration
- **FR 3.1:** Admins can publish events with title, description, category, date, time, venue, max capacity, and banner image.
- **FR 3.2:** Students can browse upcoming and past events with search/filter options.
- **FR 3.3:** Students can register for events with one click (system prevents duplicate registrations).
- **FR 3.4:** Admins can view the real-time list of registered attendees for any event.

#### Module 4: Campus Announcements
- **FR 4.1:** Admins can broadcast official notices with priority tags (`Urgent`, `General`, `Event Alert`).
- **FR 4.2:** Announcements are displayed in a real-time chronological feed on the student dashboard.

#### Module 5: Role-Specific Dashboards
- **FR 5.1 (Student):** Overview of joined clubs, registered events, and recent campus notices.
- **FR 5.2 (Admin):** Analytics metrics (Total Clubs, Total Events, Total Registered Students) and administrative action tabs.

### 5.2 Non-Functional Requirements (NFR)
- **Performance:** Frontend initial page load under 1.5 seconds; API response time under 200ms.
- **Security:** Protection against SQL/NoSQL Injection, Cross-Origin Resource Sharing (CORS) configuration, secure HTTP headers, sanitization of inputs.
- **Responsiveness:** Fluid adaptation to Mobile ($< 640\text{px}$), Tablet ($640\text{px}-1024\text{px}$), and Desktop ($> 1024\text{px}$).
- **Usability:** Intuitive navigation, clear validation error states, and responsive loaders for async actions.

---

## 6. Database Schema Design (Phase 2)

```text
+-----------------------+       +-----------------------+
|        USERS          |       |         CLUBS         |
+-----------------------+       +-----------------------+
| _id: ObjectId (PK)    |       | _id: ObjectId (PK)    |
| name: String          |       | name: String          |
| email: String (Unique)|       | category: String      |
| passwordHash: String  |       | description: String   |
| role: 'student'|'admin|       | leadCoordinator: Str  |
| rollNo: String        |       | bannerImage: String   |
| department: String    |       | membersCount: Number  |
| joinedClubs: [ClubId] |       | createdAt: Date       |
| createdAt: Date       |       +-----------------------+
+-----------------------+                   |
           |                                |
           | 1:N                            | 1:N
           v                                v
+-----------------------+       +-----------------------+
|     REGISTRATIONS     |       |        EVENTS         |
+-----------------------+       +-----------------------+
| _id: ObjectId (PK)    |       | _id: ObjectId (PK)    |
| studentId: UserId (FK)|<------| clubId: ClubId (FK)   |
| eventId: EventId (FK) |------>| title: String         |
| registeredAt: Date    |       | description: String   |
| status: 'confirmed'   |       | date: Date            |
+-----------------------+       | venue: String         |
                                | capacity: Number      |
                                | bannerImage: String   |
                                +-----------------------+
```

---

## 7. Frontend Structure & UI Modules (Phase 3)

```text
client/src/
├── components/
│   ├── common/         # Button, Input, Modal, Card, Navbar, Footer, Loader, Alert
│   ├── auth/           # LoginForm, RegisterForm
│   ├── clubs/          # ClubCard, ClubList, ClubDetailView, ClubFormModal
│   ├── events/         # EventCard, EventList, EventDetailModal, EventFormModal, RegistrationTable
│   ├── announcements/  # AnnouncementCard, AnnouncementList, AnnouncementFormModal
│   └── dashboard/      # StatsCard, RecentActivity, QuickActions
├── context/            # AuthContext, AlertContext
├── hooks/              # useAuth, useAlert, useFetch
├── pages/              # Home, Login, Register, Clubs, ClubDetail, Events, StudentDashboard, AdminDashboard, 404
├── routes/             # AppRoutes, ProtectedRoute (RBAC Guard)
├── services/           # api.js (Axios Base), authService, clubService, eventService, announcementService
└── utils/              # constants, formatDate, validators
```

---

## 8. Multi-Commit & Continuous Push Strategy

To reflect systematic, professional development progress on GitHub, the project is structured into **20 discrete, modular checkpoints**. Every small unit of work is pushed as an independent commit.

```text
Local Work  ──(Complete Small Module)──>  git add .  ──>  git commit -m "feat/fix: ..."  ──>  git push origin main
```

### Granular Commit Checkpoints:

| Step | Commit Type & Scope | Commit Message | Files Affected |
| :---: | :--- | :--- | :--- |
| **01** | `feat(init)` | `feat: initialize React project with Vite, Tailwind CSS, and base folders` | `package.json`, `tailwind.config.js`, root dirs |
| **02** | `feat(styles)` | `feat: configure base styles, theme tokens, and custom fonts` | `index.css`, `tailwind.config.js` |
| **03** | `feat(common-ui)` | `feat: implement reusable UI components (Button, Input, Card, Modal, Loader)` | `src/components/common/*` |
| **04** | `feat(layout)` | `feat: create Navbar, Footer, and responsive Sidebar layout` | `Navbar.jsx`, `Footer.jsx`, `Sidebar.jsx` |
| **05** | `feat(api)` | `feat: configure Axios HTTP client and API error handling interceptors` | `services/api.js`, `utils/constants.js` |
| **06** | `feat(context)` | `feat: setup AuthContext and AlertContext with custom hooks` | `AuthContext.jsx`, `AlertContext.jsx`, `useAuth.js` |
| **07** | `feat(routes)` | `feat: implement React Router with public and ProtectedRoute wrappers` | `AppRoutes.jsx`, `ProtectedRoute.jsx` |
| **08** | `feat(auth-ui)` | `feat: build user Authentication pages (Login and Register) with form validation` | `LoginPage.jsx`, `RegisterPage.jsx`, `validators.js` |
| **09** | `feat(home)` | `feat: build interactive Landing/Home page with Hero and feature highlights` | `HomePage.jsx` |
| **10** | `feat(clubs-list)`| `feat: implement Clubs listing page with category filters and search` | `ClubsPage.jsx`, `ClubCard.jsx`, `clubService.js` |
| **11** | `feat(club-view)` | `feat: implement Club Detail page with membership joining flow` | `ClubDetailPage.jsx`, `ClubDetailView.jsx` |
| **12** | `feat(events-ui)` | `feat: create Events exploration page with registration modal` | `EventsPage.jsx`, `EventCard.jsx`, `eventService.js` |
| **13** | `feat(notices)` | `feat: create Announcements board page with priority tags` | `AnnouncementsPage.jsx`, `AnnouncementCard.jsx` |
| **14** | `feat(student-dash)`| `feat: build Student Dashboard for tracking joined clubs and registered events` | `StudentDashboard.jsx` |
| **15** | `feat(admin-clubs)`| `feat: implement Admin Dashboard metrics and Club management CRUD modals` | `AdminDashboard.jsx`, `ClubFormModal.jsx` |
| **16** | `feat(admin-events)`| `feat: implement Admin Event management and attendee viewer` | `EventFormModal.jsx`, `RegistrationTable.jsx` |
| **17** | `feat(admin-notices)`| `feat: implement Admin Announcement broadcast modal` | `AnnouncementFormModal.jsx` |
| **18** | `feat(error-pages)`| `feat: implement 404 NotFound page and responsive mobile drawer menu` | `NotFoundPage.jsx`, mobile drawer UI |
| **19** | `refactor(ux)` | `refactor: optimize UI animations, loading skeletons, and empty state screens` | UI transitions, skeleton loaders |
| **20** | `docs(readme)` | `docs: add comprehensive project README and setup documentation` | `README.md`, `description.md` |

---

## 9. Local Installation & Development Setup

### 9.1 Prerequisites
- **Node.js:** `v18.x` or higher
- **npm:** `v9.x` or higher
- **Git:** Installed and configured locally

### 9.2 Frontend Setup
```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/CampusConnect.git

# 2. Navigate to client directory
cd CampusConnect/client

# 3. Install dependencies
npm install

# 4. Configure environment variables
# Create a .env file in the /client root:
# VITE_API_URL=http://localhost:5000/api

# 5. Start development server
npm run dev
```
The client application will start at `http://localhost:5173`.

---

## 10. CA-II Examination Assessment Alignment

| Assessment Component | Weightage | Alignment in CampusConnect |
| :--- | :---: | :--- |
| **Phase 1: Requirement Analysis** | 20 Marks (Combined) | Detailed Functional/Non-Functional Specs, User Roles, and Use Cases defined in `description.md`. |
| **Phase 2: System Design** | 20 Marks (Combined) | 3-Tier Architecture, Complete NoSQL Database Models, and REST Endpoint specifications in LLD. |
| **Phase 3: Frontend Development** | 20 Marks (Combined) | Modular React component hierarchy, dynamic routing, RBAC protection, and responsive Tailwind UI. |
| **GitHub Repository & Checkpoints**| 20 Marks (Combined) | 20 step-by-step modular commits proving continuous contribution and clean repository structure. |
| **Individual Module Viva & Code Understanding**| 10 Marks | Modular separation allows each team member to explain their specific module (Auth, Clubs, Events, Admin) with full technical clarity. |