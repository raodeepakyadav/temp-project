import React, { useState, useEffect } from 'react';
import { clubService } from '../../services/clubService';
import ClubCard from './ClubCard';
import { SkeletonCard } from '../common/Loader';
import { Search, SlidersHorizontal, Compass, Sparkles } from 'lucide-react';
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
      console.error(err);
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {CLUB_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  category === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search clubs, skills, tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl pl-9 pr-3.5 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            />
          </div>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : clubs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
            <Compass className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-800">No clubs found</h4>
          <p className="text-xs text-slate-500 max-w-sm mt-1">
            Try adjusting your search criteria or category filter to discover student clubs.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <ClubCard key={club._id} club={club} onClubUpdated={fetchClubs} />
          ))}
        </div>
      )}
    </div>
  );
}
