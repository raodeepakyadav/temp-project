# High-Level Design (HLD): CampusConnect

## 1. Executive Overview & System Vision
**CampusConnect** is a centralized, role-based campus portal designed to bridge the operational gap between student organizations, attendees, and academic administration. It provides real-time event discovery, seat-capacity-managed registration with verifiable QR e-tickets, and club portfolio administration.

---

## 2. System Architecture

```
+-------------------------------------------------------------------------+
|                           CLIENT LAYER (SPA)                            |
|             React.js (Vite) + Tailwind CSS + Framer Motion              |
|                                                                         |
|  [ Student Portal View ]                       [ Faculty / Admin View ] |
|  - Club Explorer & Joining                     - Analytics & KPI Dash   |
|  - Event Passes & QR Ticket                    - Club Portfolio CRUD    |
|  - Campus Notice Board Feed                    - Live Attendee Rosters  |
|                                                - Notice Broadcasting    |
+-------------------------------------------------------------------------+
                                    |
                    RESTful HTTPS / JSON (JWT Protected)
                                    |
+-------------------------------------------------------------------------+
|                         APPLICATION SERVICE LAYER                       |
|                   Node.js + Express.js REST API Server                  |
|                                                                         |
|  +--------------------+  +--------------------+  +-------------------+  |
|  |    Auth Service    |  |    Club Service    |  |   Event Service   |  |
|  |  JWT / bcrypt.js   |  |  Category & Search |  | Capacity & Passes |  |
|  +--------------------+  +--------------------+  +-------------------+  |
|  +--------------------+  +--------------------+  +-------------------+  |
|  | Announcement Hub   |  |   Roster & Export  |  | Role Guard (RBAC) |  |
|  |  Priority Broadcast|  |     CSV Generator  |  | Student vs Admin  |  |
|  +--------------------+  +--------------------+  +-------------------+  |
+-------------------------------------------------------------------------+
                                    |
                             Mongoose ODM
                                    |
+-------------------------------------------------------------------------+
|                           DATA PERSISTENCE                              |
|                       MongoDB NoSQL Database                            |
|                                                                         |
|  [ Users ]       [ Clubs ]       [ Events ]       [ Registrations ]     |
|  - Name, Email   - Lead, Category- Venue, Capacity- Ticket Number, QR   |
|  - Role, RollNo  - Schedules     - Timings, Hosts - Student & Event FK  |
+-------------------------------------------------------------------------+
```

---

## 3. Core Functional Modules

### 3.1 Authentication & RBAC Layer
- Multi-role support (`student`, `admin`)
- Fast 1-click role switcher for live demonstration and evaluator review
- Token verification interceptor for protected API routes

### 3.2 Club Discovery & Membership Engine
- Category classification (`Technical`, `Cultural`, `Sports`, `Arts`, `Social & Welfare`, `Literary`)
- Search across club names, skills, and tags
- Real-time membership subscription tracking

### 3.3 Event Lifecycle & QR Admission Engine
- Capacity-constrained event registration preventing double bookings
- Dynamic SVG QR code and digital admission pass generation
- Live attendee rosters with CSV export for event coordinators

### 3.4 Campus Broadcast & Notification Center
- Priority level tags: `Urgent`, `Event Alert`, `General`, `Academic`
- Real-time notification banners on student dashboards
