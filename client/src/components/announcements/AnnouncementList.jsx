import React, { useState, useEffect } from 'react';
import { announcementService } from '../../services/announcementService';
import AnnouncementCard from './AnnouncementCard';
import { useAuth } from '../../hooks/useAuth';
import { useAlert } from '../../hooks/useAlert';
import { Bell } from 'lucide-react';

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
      console.error('Failed to load announcements:', err);
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
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {['All', 'Urgent', 'Event Alert', 'General'].map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPriority(p)}
              className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors duration-150 cursor-pointer border ${
                selectedPriority === p
                  ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]'
                  : 'bg-white text-slate-600 hover:text-slate-800 border-slate-200 hover:bg-slate-50'
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
            <div key={i} className="h-28 bg-white border border-slate-200 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : displayList.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400">
            <Bell className="w-5 h-5" />
          </div>
          <p className="text-sm text-slate-500">No campus announcements found in this category.</p>
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
