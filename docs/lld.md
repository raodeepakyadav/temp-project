# Low-Level Design (LLD): CampusConnect Frontend

---

## 1. Directory Structure (`/client`)

```text
client/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── assets/
│       └── images/
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   └── illustrations/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Badge.jsx
│   │   │   └── Alert.jsx
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   └── RegisterForm.jsx
│   │   ├── clubs/
│   │   │   ├── ClubCard.jsx
│   │   │   ├── ClubList.jsx
│   │   │   ├── ClubDetailView.jsx
│   │   │   └── ClubFormModal.jsx
│   │   ├── events/
│   │   │   ├── EventCard.jsx
│   │   │   ├── EventList.jsx
│   │   │   ├── EventDetailModal.jsx
│   │   │   ├── EventFormModal.jsx
│   │   │   └── RegistrationTable.jsx
│   │   ├── announcements/
│   │   │   ├── AnnouncementCard.jsx
│   │   │   ├── AnnouncementList.jsx
│   │   │   └── AnnouncementFormModal.jsx
│   │   └── dashboard/
│   │       ├── StatsCard.jsx
│   │       ├── RecentActivity.jsx
│   │       └── QuickActions.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── AlertContext.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useAlert.js
│   │   └── useFetch.js
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ClubsPage.jsx
│   │   ├── ClubDetailPage.jsx
│   │   ├── EventsPage.jsx
│   │   ├── AnnouncementsPage.jsx
│   │   ├── StudentDashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── NotFoundPage.jsx
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   └── ProtectedRoute.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── clubService.js
│   │   ├── eventService.js
│   │   └── announcementService.js
│   ├── utils/
│   │   ├── constants.js
│   │   ├── formatDate.js
│   │   └── validators.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── package.json
├── tailwind.config.js (or vite.config.js / postcss.config.js)
└── README.md
```

---

## 2. Routing Architecture & Access Matrix

### 2.1 Route Definitions (`routes/AppRoutes.jsx`)
```text
/ (Public)                      -> HomePage
/login (Public)                 -> LoginPage
/register (Public)              -> RegisterPage
/clubs (Public/Protected)       -> ClubsPage
/clubs/:id (Public/Protected)   -> ClubDetailPage
/events (Public/Protected)      -> EventsPage
/announcements (Public)         -> AnnouncementsPage

/student/dashboard (Protected)  -> StudentDashboard (Role: 'student')
/student/my-clubs (Protected)   -> StudentDashboard (Tab: My Clubs)
/student/my-events (Protected)  -> StudentDashboard (Tab: Registered Events)

/admin/dashboard (Protected)    -> AdminDashboard (Role: 'admin')
/admin/clubs (Protected)        -> AdminDashboard (Tab: Club Management)
/admin/events (Protected)       -> AdminDashboard (Tab: Event Management)
/admin/announcements (Protected)-> AdminDashboard (Tab: Announcement Broadcast)

* (Fallback)                    -> NotFoundPage
```

### 2.2 Route Guarding (`routes/ProtectedRoute.jsx`)
* **Logic:**
  1. Checks `AuthContext` for `isAuthenticated` and `token`.
  2. If not authenticated, redirects to `/login` with `state.from`.
  3. If authenticated, validates user `role` against allowed roles:
     * Student attempting `/admin/*` $\rightarrow$ Redirected to `/student/dashboard` or `403 Access Denied`.
     * Admin attempting `/student/*` $\rightarrow$ Allowed or redirected to `/admin/dashboard`.

---

## 3. State Management & Context Layer

### 3.1 `AuthContext`
* **State Values:**
  * `user`: `{ id, name, email, role, department, rollNo }` or `null`
  * `token`: JWT string stored in `localStorage`
  * `isAuthenticated`: `boolean`
  * `loading`: `boolean`
* **Methods:**
  * `login(credentials)`: Calls API, stores token, updates `user` state.
  * `register(formData)`: Calls API, signs up user.
  * `logout()`: Clears `localStorage`, resets state, redirects to `/login`.
  * `updateUser(profileData)`: Updates user profile state.

### 3.2 `AlertContext` (Notification System)
* **State Values:**
  * `alert`: `{ show: boolean, type: 'success' | 'error' | 'warning' | 'info', message: string }`
* **Methods:**
  * `showAlert(message, type, duration = 3000)`
  * `hideAlert()`

---

## 4. API Service Layer (Axios Architecture)

### 4.1 Axios Base Setup (`services/api.js`)
* **Base URL:** `import.meta.env.VITE_API_URL || 'http://localhost:5000/api'`
* **Request Interceptor:** Injects `Authorization: Bearer <token>` from `localStorage`.
* **Response Interceptor:** Intercepts `401 Unauthorized` responses $\rightarrow$ triggers auto-logout and redirects to `/login`.

### 4.2 Endpoint Mapping Contracts
```javascript
// authService.js
POST /api/auth/register       -> authService.register(userData)
POST /api/auth/login          -> authService.login(credentials)
GET  /api/auth/me             -> authService.getCurrentUser()

// clubService.js
GET    /api/clubs             -> clubService.getAllClubs(params)
GET    /api/clubs/:id         -> clubService.getClubById(id)
POST   /api/clubs             -> clubService.createClub(clubData) [Admin]
PUT    /api/clubs/:id         -> clubService.updateClub(id, clubData) [Admin]
DELETE /api/clubs/:id         -> clubService.deleteClub(id) [Admin]
POST   /api/clubs/:id/join    -> clubService.joinClub(id) [Student]

// eventService.js
GET    /api/events            -> eventService.getAllEvents(filters)
GET    /api/events/:id        -> eventService.getEventById(id)
POST   /api/events            -> eventService.createEvent(eventData) [Admin]
PUT    /api/events/:id        -> eventService.updateEvent(id, eventData) [Admin]
DELETE /api/events/:id        -> eventService.deleteEvent(id) [Admin]
POST   /api/events/:id/register -> eventService.registerForEvent(id) [Student]
GET    /api/events/:id/attendees -> eventService.getEventAttendees(id) [Admin]

// announcementService.js
GET    /api/announcements     -> announcementService.getAllAnnouncements()
POST   /api/announcements     -> announcementService.createAnnouncement(data) [Admin]
DELETE /api/announcements/:id -> announcementService.deleteAnnouncement(id) [Admin]
```

---

## 5. UI Component Specs & Prop Interfaces

### 5.1 Common Components
* **`Button`**: `variants` (`primary`, `secondary`, `danger`, `outline`), `isLoading`, `disabled`, `onClick`, `icon`.
* **`Input`**: `label`, `name`, `type`, `value`, `onChange`, `error`, `placeholder`, `required`.
* **`Modal`**: `isOpen`, `onClose`, `title`, `children`, `footerButtons`.
* **`Card`**: `header`, `footer`, `hoverable`, `children`, `className`.
* **`Badge`**: `variant` (`success`, `warning`, `info`, `purple`), `text`.

### 5.2 Business Components
* **`ClubCard`**: Displays club logo, name, category, member count, short description, "View Details" & "Join" button.
* **`EventCard`**: Displays banner, title, associated club, event date/time, venue, fee (free/paid), "Register" button.
* **`AnnouncementCard`**: Priority badge (`High`, `Normal`), author/club, timestamp, title, description body.
* **`StatsCard`**: Metric title, count value, icon, percentage trend.

---

## 6. Page Specifications & Layouts

1. **`HomePage`**:
   * Hero section with call-to-action ("Explore Clubs", "Upcoming Events").
   * Quick statistics counters (Total Clubs, Total Events, Active Students).
   * Featured upcoming events carousel/grid.
   * Latest campus notices banner.
2. **`ClubsPage`**:
   * Filter controls (Category: Technical, Cultural, Sports, Arts; Search bar).
   * Responsive grid of `ClubCard` components.
3. **`ClubDetailPage`**:
   * Banner, lead coordinator info, list of club members, upcoming events hosted by the club, and "Join Club" action.
4. **`EventsPage`**:
   * Date and club-wise filter toggles.
   * Responsive cards with real-time seat availability and registration status.
5. **`StudentDashboard`**:
   * User profile summary.
   * Subscribed clubs with quick leave/view options.
   * Registered events with QR/ticket pass view.
6. **`AdminDashboard`**:
   * Overview metrics (Total users, clubs, events, registrations).
   * Tabbed interface:
     * **Clubs Tab:** Create, edit, delete clubs, manage members.
     * **Events Tab:** Create events, view attendee list, export to CSV/view.
     * **Announcements Tab:** Publish notifications.

---

## 7. Granular Git Commit Strategy (Step-by-Step Checkpoints)

To demonstrate progressive development on GitHub, each incremental step should be committed individually using standard semantic commit messages:

| Commit # | Branch / Checkpoint | Commit Message | Scope of Work |
| :--- | :--- | :--- | :--- |
| **01** | `main` | `feat: initialize React project with Vite, Tailwind CSS, and base folders` | Vite + Tailwind + Directory scaffolding |
| **02** | `main` | `feat: configure base styles, theme tokens, and custom fonts` | `index.css`, Tailwind theme variables |
| **03** | `main` | `feat: implement reusable UI components (Button, Input, Card, Modal, Loader)` | `src/components/common/*` |
| **04** | `main` | `feat: create Navbar, Footer, and responsive Sidebar layout` | `Navbar.jsx`, `Footer.jsx`, `Sidebar.jsx` |
| **05** | `main` | `feat: configure Axios HTTP client and API error handling interceptors` | `services/api.js`, `utils/constants.js` |
| **06** | `main` | `feat: setup AuthContext and AlertContext with custom hooks` | `AuthContext.jsx`, `AlertContext.jsx`, `useAuth.js` |
| **07** | `main` | `feat: implement React Router with public and ProtectedRoute wrappers` | `AppRoutes.jsx`, `ProtectedRoute.jsx` |
| **08** | `main` | `feat: build user Authentication pages (Login and Register) with form validation` | `LoginPage.jsx`, `RegisterPage.jsx`, `validators.js` |
| **09** | `main` | `feat: build interactive Landing/Home page with Hero and feature highlights` | `HomePage.jsx` |
| **10** | `main` | `feat: implement Clubs listing page with category filters and search` | `ClubsPage.jsx`, `ClubCard.jsx`, `clubService.js` |
| **11** | `main` | `feat: implement Club Detail page with membership joining flow` | `ClubDetailPage.jsx`, `ClubDetailView.jsx` |
| **12** | `main` | `feat: create Events exploration page with registration modal` | `EventsPage.jsx`, `EventCard.jsx`, `eventService.js` |
| **13** | `main` | `feat: create Announcements board page with priority tags` | `AnnouncementsPage.jsx`, `AnnouncementCard.jsx` |
| **14** | `main` | `feat: build Student Dashboard for tracking joined clubs and registered events` | `StudentDashboard.jsx` |
| **15** | `main` | `feat: implement Admin Dashboard metrics and Club management CRUD modals` | `AdminDashboard.jsx`, `ClubFormModal.jsx` |
| **16** | `main` | `feat: implement Admin Event management and attendee viewer` | `EventFormModal.jsx`, `RegistrationTable.jsx` |
| **17** | `main` | `feat: implement Admin Announcement broadcast modal` | `AnnouncementFormModal.jsx` |
| **18** | `main` | `feat: implement 404 NotFound page and responsive mobile drawer menu` | `NotFoundPage.jsx`, mobile navigation |
| **19** | `main` | `refactor: optimize UI animations, loading skeletons, and empty state screens` | Polish UX, transitions, loaders |
| **20** | `main` | `docs: add comprehensive project README and frontend setup instructions` | `README.md` |