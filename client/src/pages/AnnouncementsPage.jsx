import React from 'react';
import AnnouncementList from '../components/announcements/AnnouncementList';
import { Bell, ShieldAlert } from 'lucide-react';

export default function AnnouncementsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
          <Bell className="w-3.5 h-3.5" />
          <span>Official Bulletins</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Campus Notice Board
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Stay updated with real-time announcements from the Dean of Student Affairs, faculty advisors,
          and club organizing committees.
        </p>
      </div>

      {/* Announcements List */}
      <AnnouncementList showFilter={true} />
    </div>
  );
}
