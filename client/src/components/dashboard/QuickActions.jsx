import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, CalendarPlus, BellRing, Compass, Calendar } from 'lucide-react';

export default function QuickActions({
  mode = 'student',
  onOpenCreateClub,
  onOpenCreateEvent,
  onOpenCreateNotice,
}) {
  if (mode === 'admin') {
    return (
      <div className="bg-white border border-slate-200 rounded-md p-5 space-y-4">
        <div>
          <span className="text-[11px] uppercase font-semibold tracking-wider text-slate-400">
            Admin Quick Actions
          </span>
          <h3 className="text-base font-semibold text-slate-900 mt-0.5">Management Shortcuts</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={onOpenCreateClub}
            className="flex items-center gap-2.5 p-3 rounded-md bg-slate-50 hover:bg-[#1e3a5f]/5 border border-slate-200 hover:border-[#1e3a5f]/20 transition-colors text-left cursor-pointer"
          >
            <PlusCircle className="w-5 h-5 text-[#1e3a5f] flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-slate-900">Add Club</p>
              <p className="text-[10px] text-slate-500">Register new club</p>
            </div>
          </button>

          <button
            type="button"
            onClick={onOpenCreateEvent}
            className="flex items-center gap-2.5 p-3 rounded-md bg-slate-50 hover:bg-[#1e3a5f]/5 border border-slate-200 hover:border-[#1e3a5f]/20 transition-colors text-left cursor-pointer"
          >
            <CalendarPlus className="w-5 h-5 text-[#1e3a5f] flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-slate-900">Schedule Event</p>
              <p className="text-[10px] text-slate-500">Publish workshop/fest</p>
            </div>
          </button>

          <button
            type="button"
            onClick={onOpenCreateNotice}
            className="flex items-center gap-2.5 p-3 rounded-md bg-slate-50 hover:bg-[#1e3a5f]/5 border border-slate-200 hover:border-[#1e3a5f]/20 transition-colors text-left cursor-pointer"
          >
            <BellRing className="w-5 h-5 text-[#8b6914] flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-slate-900">Broadcast Notice</p>
              <p className="text-[10px] text-slate-500">Send urgent alert</p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-md p-5 space-y-4">
      <div>
        <span className="text-[11px] uppercase font-semibold tracking-wider text-slate-400">
          Student Portal
        </span>
        <h3 className="text-base font-semibold text-slate-900 mt-0.5">Explore Campus Life</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link
          to="/clubs"
          className="flex items-center gap-3 p-3 rounded-md bg-slate-50 hover:bg-[#1e3a5f]/5 border border-slate-200 hover:border-[#1e3a5f]/20 transition-colors"
        >
          <Compass className="w-5 h-5 text-[#1e3a5f] flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-slate-900">Discover Clubs</p>
            <p className="text-[10px] text-slate-500">Find coding, drama, sports</p>
          </div>
        </Link>

        <Link
          to="/events"
          className="flex items-center gap-3 p-3 rounded-md bg-slate-50 hover:bg-[#1e3a5f]/5 border border-slate-200 hover:border-[#1e3a5f]/20 transition-colors"
        >
          <Calendar className="w-5 h-5 text-[#1e3a5f] flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-slate-900">Browse Events</p>
            <p className="text-[10px] text-slate-500">Hackathons & cultural fests</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
