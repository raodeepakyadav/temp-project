export const USER_ROLES = {
  STUDENT: 'student',
  ADMIN: 'admin',
};

export const CLUB_CATEGORIES = [
  'All',
  'Technical',
  'Cultural',
  'Sports',
  'Arts',
  'Social & Welfare',
  'Literary',
];

export const ANNOUNCEMENT_PRIORITIES = {
  URGENT: 'Urgent',
  EVENT_ALERT: 'Event Alert',
  GENERAL: 'General',
  ACADEMIC: 'Academic',
};

export const DEMO_USERS = {
  STUDENT: {
    _id: 'usr_student_01',
    name: 'Aarav Sharma',
    email: 'student@chitkara.edu.in',
    role: 'student',
    rollNo: '2310990001',
    department: 'Computer Science & Engineering',
    semester: '4th Semester',
    joinedClubs: ['club_01', 'club_03'],
    registeredEvents: ['evt_01', 'evt_03'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  ADMIN: {
    _id: 'usr_admin_01',
    name: 'Dr. Rajesh Verma',
    email: 'admin@chitkara.edu.in',
    role: 'admin',
    department: 'Dean of Student Affairs',
    designation: 'Faculty Head & Club Coordinator',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  },
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'cc_auth_token',
  AUTH_USER: 'cc_auth_user',
  CLUBS: 'cc_clubs_data',
  EVENTS: 'cc_events_data',
  ANNOUNCEMENTS: 'cc_announcements_data',
  REGISTRATIONS: 'cc_registrations_data',
};
