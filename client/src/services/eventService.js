import api, { storageHelper } from './api';
import { STORAGE_KEYS } from '../utils/constants';

export const eventService = {
  getAllEvents: async (filters = {}) => {
    try {
      const res = await api.get('/events', { params: filters });
      return res.data;
    } catch {
      let events = storageHelper.get(STORAGE_KEYS.EVENTS);

      if (filters.category && filters.category !== 'All') {
        events = events.filter(
          (e) => e.category.toLowerCase() === filters.category.toLowerCase()
        );
      }
      if (filters.clubId) {
        events = events.filter((e) => e.clubId === filters.clubId);
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        events = events.filter(
          (e) =>
            e.title.toLowerCase().includes(q) ||
            e.shortDescription?.toLowerCase().includes(q) ||
            e.clubName?.toLowerCase().includes(q) ||
            e.venue?.toLowerCase().includes(q) ||
            e.tags?.some((t) => t.toLowerCase().includes(q))
        );
      }
      return events;
    }
  },

  getEventById: async (id) => {
    try {
      const res = await api.get(`/events/${id}`);
      return res.data;
    } catch {
      const events = storageHelper.get(STORAGE_KEYS.EVENTS);
      const event = events.find((e) => e._id === id);
      if (!event) throw new Error('Event not found');
      return event;
    }
  },

  createEvent: async (eventData) => {
    try {
      const res = await api.post('/events', eventData);
      return res.data;
    } catch {
      const events = storageHelper.get(STORAGE_KEYS.EVENTS);
      const newEvent = {
        _id: `evt_${Date.now()}`,
        registeredCount: 0,
        isRegistrationOpen: true,
        fee: eventData.fee || 'Free',
        bannerImage:
          eventData.bannerImage ||
          'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
        tags: eventData.tags || ['CampusEvent'],
        createdAt: new Date().toISOString(),
        ...eventData,
      };
      events.unshift(newEvent);
      storageHelper.set(STORAGE_KEYS.EVENTS, events);
      return newEvent;
    }
  },

  updateEvent: async (id, eventData) => {
    try {
      const res = await api.put(`/events/${id}`, eventData);
      return res.data;
    } catch {
      const events = storageHelper.get(STORAGE_KEYS.EVENTS);
      const index = events.findIndex((e) => e._id === id);
      if (index === -1) throw new Error('Event not found');
      events[index] = { ...events[index], ...eventData };
      storageHelper.set(STORAGE_KEYS.EVENTS, events);
      return events[index];
    }
  },

  deleteEvent: async (id) => {
    try {
      const res = await api.delete(`/events/${id}`);
      return res.data;
    } catch {
      let events = storageHelper.get(STORAGE_KEYS.EVENTS);
      events = events.filter((e) => e._id !== id);
      storageHelper.set(STORAGE_KEYS.EVENTS, events);

      // Clean registrations
      let regs = storageHelper.get(STORAGE_KEYS.REGISTRATIONS);
      regs = regs.filter((r) => r.eventId !== id);
      storageHelper.set(STORAGE_KEYS.REGISTRATIONS, regs);

      return { success: true, message: 'Event deleted successfully' };
    }
  },

  registerForEvent: async (eventId, user) => {
    try {
      const res = await api.post(`/events/${eventId}/register`);
      return res.data;
    } catch {
      if (!user) throw new Error('You must be logged in to register');

      const events = storageHelper.get(STORAGE_KEYS.EVENTS);
      const eventIndex = events.findIndex((e) => e._id === eventId);
      if (eventIndex === -1) throw new Error('Event not found');

      const event = events[eventIndex];
      const registrations = storageHelper.get(STORAGE_KEYS.REGISTRATIONS);

      // Check if already registered
      const existing = registrations.find(
        (r) => r.eventId === eventId && (r.userId === user._id || r.studentEmail === user.email)
      );
      if (existing) {
        throw new Error('You are already registered for this event');
      }

      // Check capacity
      if (event.capacity && (event.registeredCount || 0) >= event.capacity) {
        throw new Error('This event has reached full capacity');
      }

      // Increment registered count
      events[eventIndex].registeredCount = (events[eventIndex].registeredCount || 0) + 1;
      storageHelper.set(STORAGE_KEYS.EVENTS, events);

      // Create new registration record
      const ticketNumber = `CC-${event.category.substring(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newRegistration = {
        _id: `reg_${Date.now()}`,
        ticketNumber,
        eventId: event._id,
        eventTitle: event.title,
        eventDate: event.date,
        eventTime: event.time,
        eventVenue: event.venue,
        userId: user._id,
        studentName: user.name,
        studentEmail: user.email,
        rollNo: user.rollNo || '2310990001',
        department: user.department || 'Computer Science',
        registeredAt: new Date().toISOString(),
        status: 'confirmed',
        qrCodeData: `CAMPUSCONNECT-TICKET-${ticketNumber}-${user.name.toUpperCase().replace(/\s+/g, '-')}`,
      };

      registrations.unshift(newRegistration);
      storageHelper.set(STORAGE_KEYS.REGISTRATIONS, registrations);

      // Update user state
      const registeredEvents = user.registeredEvents || [];
      if (!registeredEvents.includes(eventId)) {
        const updatedUser = { ...user, registeredEvents: [...registeredEvents, eventId] };
        storageHelper.set(STORAGE_KEYS.AUTH_USER, updatedUser);
      }

      return {
        success: true,
        registration: newRegistration,
        message: 'Registration confirmed! Your e-Ticket is ready.',
      };
    }
  },

  getEventAttendees: async (eventId) => {
    try {
      const res = await api.get(`/events/${eventId}/attendees`);
      return res.data;
    } catch {
      const registrations = storageHelper.get(STORAGE_KEYS.REGISTRATIONS);
      return registrations.filter((r) => r.eventId === eventId);
    }
  },

  getUserRegistrations: async (userId, userEmail) => {
    try {
      const res = await api.get('/user/registrations');
      return res.data;
    } catch {
      const registrations = storageHelper.get(STORAGE_KEYS.REGISTRATIONS);
      return registrations.filter(
        (r) => r.userId === userId || (userEmail && r.studentEmail === userEmail)
      );
    }
  },
};
