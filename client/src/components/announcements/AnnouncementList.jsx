import React, { useState, useEffect } from 'react';
import { announcementService } from '../../services/announcementService';
import AnnouncementCard from './AnnouncementCard';
import { SkeletonCard } from '../common/Loader';
import { useAuth } from '../../hooks/useAuth';
import { useAlert } from '../../hooks/useAlert';
import { Bell, Filter } from 'lucide-react';
import { ANNOUNCEMENT_PRIORITIES } from '../../utils/constants';

export default function AnnouncementList({ limit, showFilter = true }) {
  const { isAdmin } = useAuth();
  const { showToast } = useAlert();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPriority, setSelectedPriority] = useState('All');

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const data = await announcementService.getAllAnnouncements();
      setAnnouncements(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleDelete = async (id) => {
    try {
      await announcementService.deleteAnnouncement(id);
      showToast('Announcement removed', 'info');
      fetchAnnouncements();
    } catch (err) {
      showToast('Failed to delete announcement', 'error');
    }
  };

  const filtered = announcements.filter((a) => {
    if (selectedPriority === 'All') return true;
    return a.priority?.toLowerCase() === selectedPriority.toLowerCase();
  });

  const displayList = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div className="space-y-4">
      {showFilter && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {['All', 'Urgent', 'Event Alert', 'General'].map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPriority(p)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedPriority === p
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-slate-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : displayList.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 text-xs">
          No campus announcements found in this category.
        </div>
      ) : (
        <div className="space-y-3.5">
          {displayList.map((anc) => (
            <AnnouncementCard
              key={anc._id}
              announcement={anc}
              onDelete={handleDelete}
              canDelete={isAdmin}
            />
          ))}
        </div>
      )}
    </div>
  );
}
