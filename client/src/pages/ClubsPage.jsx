import React from 'react';
import ClubList from '../components/clubs/ClubList';
import { Compass, Sparkles } from 'lucide-react';

export default function ClubsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2 max-w-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>Student Directory</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Explore Campus Clubs & Societies
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Discover coding societies, theatre groups, sports councils, social welfare leagues, and
          literary teams at Chitkara University.
        </p>
      </div>

      {/* Main Club Directory Grid & Filter */}
      <ClubList />
    </div>
  );
}
