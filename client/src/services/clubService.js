import api, { storageHelper } from './api';
import { STORAGE_KEYS } from '../utils/constants';
import { INITIAL_CLUBS } from '../data/initialData';

const OFFICIAL_CLUB_NAMES = new Set(INITIAL_CLUBS.map((club) => club.name));

function usesOfficialClubNames(clubs) {
  return Array.isArray(clubs) && clubs.every((club) => OFFICIAL_CLUB_NAMES.has(club.name));
}

export const clubService = {
  getAllClubs: async (filters = {}) => {
    try {
      const res = await api.get('/clubs', { params: filters });
      const clubsFromApi = res.data;
      const unfiltered =
        (!filters.category || filters.category === 'All') && !filters.search;
      if (
        !usesOfficialClubNames(clubsFromApi) ||
        (unfiltered && clubsFromApi.length !== INITIAL_CLUBS.length)
      ) {
        throw new Error('Stale club payload');
      }
      return clubsFromApi;
    } catch {
      let clubs = storageHelper.get(STORAGE_KEYS.CLUBS);

      if (filters.category && filters.category !== 'All') {
        clubs = clubs.filter(
          (c) => c.category.toLowerCase() === filters.category.toLowerCase()
        );
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        clubs = clubs.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.tagline?.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q) ||
            c.tags?.some((t) => t.toLowerCase().includes(q))
        );
      }
      return clubs;
    }
  },

  getClubById: async (id) => {
    try {
      const res = await api.get(`/clubs/${id}`);
      if (!res.data || !OFFICIAL_CLUB_NAMES.has(res.data.name)) {
        throw new Error('Stale club payload');
      }
      return res.data;
    } catch {
      const clubs = storageHelper.get(STORAGE_KEYS.CLUBS);
      const club = clubs.find((c) => c._id === id || c.slug === id);
      if (!club) throw new Error('Club not found');
      return club;
    }
  },

  createClub: async (clubData) => {
    try {
      const res = await api.post('/clubs', clubData);
      return res.data;
    } catch {
      const clubs = storageHelper.get(STORAGE_KEYS.CLUBS);
      const newClub = {
        _id: `club_${Date.now()}`,
        slug: clubData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        membersCount: 1,
        foundedYear: new Date().getFullYear(),
        createdAt: new Date().toISOString(),
        bannerImage:
          clubData.bannerImage ||
          'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
        logo: clubData.logo || '✨',
        tags: clubData.tags || ['Campus', 'StudentActivity'],
        ...clubData,
      };
      clubs.unshift(newClub);
      storageHelper.set(STORAGE_KEYS.CLUBS, clubs);
      return newClub;
    }
  },

  updateClub: async (id, clubData) => {
    try {
      const res = await api.put(`/clubs/${id}`, clubData);
      return res.data;
    } catch {
      const clubs = storageHelper.get(STORAGE_KEYS.CLUBS);
      const index = clubs.findIndex((c) => c._id === id);
      if (index === -1) throw new Error('Club not found');
      clubs[index] = { ...clubs[index], ...clubData };
      storageHelper.set(STORAGE_KEYS.CLUBS, clubs);
      return clubs[index];
    }
  },

  deleteClub: async (id) => {
    try {
      const res = await api.delete(`/clubs/${id}`);
      return res.data;
    } catch {
      let clubs = storageHelper.get(STORAGE_KEYS.CLUBS);
      clubs = clubs.filter((c) => c._id !== id);
      storageHelper.set(STORAGE_KEYS.CLUBS, clubs);
      return { success: true, message: 'Club deleted successfully' };
    }
  },

  joinClub: async (clubId, user) => {
    try {
      const res = await api.post(`/clubs/${clubId}/join`);
      return res.data;
    } catch {
      const clubs = storageHelper.get(STORAGE_KEYS.CLUBS);
      const index = clubs.findIndex((c) => c._id === clubId);
      if (index !== -1) {
        clubs[index].membersCount = (clubs[index].membersCount || 0) + 1;
        storageHelper.set(STORAGE_KEYS.CLUBS, clubs);
      }

      // Update current user
      if (user) {
        const joinedClubs = user.joinedClubs || [];
        if (!joinedClubs.includes(clubId)) {
          const updatedUser = { ...user, joinedClubs: [...joinedClubs, clubId] };
          storageHelper.set(STORAGE_KEYS.AUTH_USER, updatedUser);
          return { success: true, user: updatedUser, message: 'Joined club successfully!' };
        }
      }
      return { success: true, message: 'Joined club successfully!' };
    }
  },

  leaveClub: async (clubId, user) => {
    try {
      const res = await api.post(`/clubs/${clubId}/leave`);
      return res.data;
    } catch {
      const clubs = storageHelper.get(STORAGE_KEYS.CLUBS);
      const index = clubs.findIndex((c) => c._id === clubId);
      if (index !== -1 && clubs[index].membersCount > 0) {
        clubs[index].membersCount -= 1;
        storageHelper.set(STORAGE_KEYS.CLUBS, clubs);
      }

      if (user) {
        const joinedClubs = (user.joinedClubs || []).filter((id) => id !== clubId);
        const updatedUser = { ...user, joinedClubs };
        storageHelper.set(STORAGE_KEYS.AUTH_USER, updatedUser);
        return { success: true, user: updatedUser, message: 'Left club successfully' };
      }
      return { success: true, message: 'Left club successfully' };
    }
  },
};
