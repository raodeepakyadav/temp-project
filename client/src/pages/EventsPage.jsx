import React from 'react';
import EventList from '../components/events/EventList';
import { Calendar, Home, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EventsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
      <div className="mb-8">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
          <Link to="/" className="hover:text-[#1e3a5f] flex items-center gap-1">
            <Home className="w-3 h-3" />
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-700 font-medium">Events Calendar</span>
        </nav>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1e3a5f]/5 border border-[#1e3a5f]/10 text-[#1e3a5f] text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            <span>Campus Calendar</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
            Workshops, Hackathons & Cultural Fests
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Browse upcoming campus activities, check seat availability, and register with
            instant digital QR admission passes.
          </p>
        </div>
      </div>

      <EventList />
    </div>
  );
}
