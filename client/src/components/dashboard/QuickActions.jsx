import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, CalendarPlus, BellRing, Compass, Calendar, QrCode } from 'lucide-react';

export default function QuickActions({
  mode = 'student',
  onOpenCreateClub,
  onOpenCreateEvent,
  onOpenCreateNotice,
}) {
  if (mode === 'admin') {
    return (
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-md space-y-4 border border-indigo-800/40">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-300">
            Admin Quick Actions
          </span>
          <h3 className="text-base font-bold text-white mt-0.5">Management Shortcuts</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={onOpenCreateClub}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors text-left cursor-pointer"
          >
            <PlusCircle className="w-5 h-5 text-indigo-400 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">Add Club</p>
              <p className="text-[10px] text-slate-300">Register new club</p>
            </div>
          </button>

          <button
            type="button"
            onClick={onOpenCreateEvent}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors text-left cursor-pointer"
          >
            <CalendarPlus className="w-5 h-5 text-purple-400 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">Schedule Event</p>
              <p className="text-[10px] text-slate-300">Publish workshop/fest</p>
            </div>
          </button>

          <button
            type="button"
            onClick={onOpenCreateNotice}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors text-left cursor-pointer"
          >
            <BellRing className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">Broadcast Notice</p>
              <p className="text-[10px] text-slate-300">Send urgent alert</p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-2xl p-6 shadow-md space-y-4">
      <div>
        <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-200">
          Student Portal
        </span>
        <h3 className="text-base font-bold text-white mt-0.5">Explore Campus Life</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link
          to="/clubs"
          className="flex items-center gap-3 p-3 rounded-xl bg-white/15 hover:bg-white/20 border border-white/10 transition-colors"
        >
          <Compass className="w-5 h-5 text-indigo-200 flex-shrink-0" />
          <div>
            <p className="text-xs font-bold text-white">Discover Clubs</p>
            <p className="text-[10px] text-indigo-100">Find coding, drama, sports</p>
          </div>
        </Link>

        <Link
          to="/events"
          className="flex items-center gap-3 p-3 rounded-xl bg-white/15 hover:bg-white/20 border border-white/10 transition-colors"
        >
          <Calendar className="w-5 h-5 text-indigo-200 flex-shrink-0" />
          <div>
            <p className="text-xs font-bold text-white">Browse Events</p>
            <p className="text-[10px] text-indigo-100">Hackathons & cultural fests</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
