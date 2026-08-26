import React from 'react';
import ClubList from '../components/clubs/ClubList';
import { Compass, Home, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ClubsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
      <div className="mb-8">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
          <Link to="/" className="hover:text-[#1e3a5f] flex items-center gap-1">
            <Home className="w-3 h-3" />
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-700 font-medium">Clubs & Societies</span>
        </nav>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1e3a5f]/5 border border-[#1e3a5f]/10 text-[#1e3a5f] text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>Student Directory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
            Explore Campus Clubs & Societies
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Browse the 18 official clubs and student organizations at Chitkara University.
            Filter by category, search by name, and join the communities that match your interests.
          </p>
        </div>
      </div>

      <ClubList />
    </div>
  );
}
