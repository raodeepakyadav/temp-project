import React from 'react';
import AnnouncementList from '../components/announcements/AnnouncementList';
import { Bell, Home, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AnnouncementsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
      <div className="mb-8">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
          <Link to="/" className="hover:text-[#1e3a5f] flex items-center gap-1">
            <Home className="w-3 h-3" />
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-700 font-medium">Campus Notices</span>
        </nav>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#8b6914]/5 border border-[#8b6914]/15 text-[#8b6914] text-xs font-semibold">
            <Bell className="w-3.5 h-3.5" />
            <span>Official Bulletins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
            Campus Notice Board
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Stay updated with real-time announcements from the Dean of Student Affairs,
            faculty advisors, and club organizing committees.
          </p>
        </div>
      </div>

      <AnnouncementList showFilter={true} />
    </div>
  );
}
