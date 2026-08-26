import React, { useState, useEffect } from 'react';
import { clubService } from '../../services/clubService';
import ClubCard from './ClubCard';
import { SkeletonCard } from '../common/Loader';
import { Search, Compass } from 'lucide-react';
import { CLUB_CATEGORIES } from '../../utils/constants';

export default function ClubList({ showHeader = true, limit, selectedCategory = 'All' }) {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(selectedCategory);
  const [search, setSearch] = useState('');

  const fetchClubs = async () => {
    setLoading(true);
    try {
      const data = await clubService.getAllClubs({ category, search });
      setClubs(limit ? data.slice(0, limit) : data);
    } catch (err) {
      console.error('Failed to load clubs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, [category, search, limit]);

  return (
    <div className="space-y-6">
      {showHeader && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {CLUB_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  category === cat
                    ? 'bg-[#1e3a5f] text-white border border-[#1e3a5f]'
                    : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
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
              placeholder="Search clubs, skills, tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 text-slate-800 placeholder:text-slate-400 text-xs rounded-md pl-9 pr-3.5 py-2 border border-slate-200 focus:outline-none focus:border-[#1e3a5f]/40 focus:bg-white transition-colors"
            />
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : clubs.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center flex flex-col items-center justify-center shadow-sm">
          <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 mb-3">
            <Compass className="w-6 h-6" />
          </div>
          <h4 className="text-base font-semibold text-slate-900">No clubs found</h4>
          <p className="text-xs text-slate-500 max-w-sm mt-1">
            Try adjusting your search criteria or category filter to discover student clubs.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {clubs.map((club) => (
            <ClubCard key={club._id} club={club} onClubUpdated={fetchClubs} />
          ))}
        </div>
      )}
    </div>
  );
}
