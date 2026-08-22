import api, { storageHelper } from './api';
import { STORAGE_KEYS } from '../utils/constants';

export const announcementService = {
  getAllAnnouncements: async () => {
    try {
      const res = await api.get('/announcements');
      return res.data;
    } catch {
      return storageHelper.get(STORAGE_KEYS.ANNOUNCEMENTS);
    }
  },

  createAnnouncement: async (data) => {
    try {
      const res = await api.post('/announcements', data);
      return res.data;
    } catch {
      const announcements = storageHelper.get(STORAGE_KEYS.ANNOUNCEMENTS);
      const newNotice = {
        _id: `anc_${Date.now()}`,
        title: data.title,
        content: data.content,
        priority: data.priority || 'General',
        author: data.author || 'Campus Administration',
        targetAudience: data.targetAudience || 'All Students',
        isPinned: !!data.isPinned,
        createdAt: new Date().toISOString(),
      };
      announcements.unshift(newNotice);
      storageHelper.set(STORAGE_KEYS.ANNOUNCEMENTS, announcements);
      return newNotice;
    }
  },

  deleteAnnouncement: async (id) => {
    try {
      const res = await api.delete(`/announcements/${id}`);
      return res.data;
    } catch {
      let announcements = storageHelper.get(STORAGE_KEYS.ANNOUNCEMENTS);
      announcements = announcements.filter((a) => a._id !== id);
      storageHelper.set(STORAGE_KEYS.ANNOUNCEMENTS, announcements);
      return { success: true, message: 'Announcement removed' };
    }
  },
};
