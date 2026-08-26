import React, { useState, useEffect } from 'react';
import { eventService } from '../../services/eventService';
import EventCard from './EventCard';
import EventDetailModal from './EventDetailModal';
import { SkeletonCard } from '../common/Loader';
import { Search, Calendar } from 'lucide-react';
import { EVENT_CATEGORIES } from '../../utils/constants';

export default function EventList({ showHeader = true, limit, initialCategory = 'All' }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await eventService.getAllEvents({ category, search });
      setEvents(limit ? data.slice(0, limit) : data);
    } catch (err) {
      console.error('Failed to load events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [category, search, limit]);

  const handleOpenDetail = (evt) => {
    setSelectedEvent(evt);
    setDetailModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {showHeader && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {EVENT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors duration-150 cursor-pointer border ${
                  category === cat
                    ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800 border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search events, venues, topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 text-slate-800 placeholder:text-slate-400 text-xs rounded-md pl-9 pr-3.5 py-2 border border-slate-200 focus:outline-none focus:border-[#1e3a5f] focus:ring-1 focus:ring-[#1e3a5f]/20 transition-colors"
            />
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mb-3">
            <Calendar className="w-6 h-6" />
          </div>
          <h4 className="text-base font-semibold text-slate-900">No events found</h4>
          <p className="text-xs text-slate-500 max-w-sm mt-1">
            There are currently no events matching your selected filter or keyword.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((evt) => (
            <EventCard
              key={evt._id}
              event={evt}
              onEventUpdated={fetchEvents}
              onSelectEvent={handleOpenDetail}
            />
          ))}
        </div>
      )}

      {selectedEvent && (
        <EventDetailModal
          isOpen={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          event={selectedEvent}
          onEventUpdated={fetchEvents}
        />
      )}
    </div>
  );
}
