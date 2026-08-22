import React from 'react';
import EventList from '../components/events/EventList';
import { Calendar, Sparkles } from 'lucide-react';

export default function EventsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2 max-w-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
          <Calendar className="w-3.5 h-3.5" />
          <span>Campus Calendar</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Workshops, Hackathons & Cultural Fests
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Browse upcoming campus activities, check remaining seat availability, and register with
          instant digital QR admission passes.
        </p>
      </div>

      {/* Main Event Explorer Grid & Filters */}
      <EventList />
    </div>
  );
}
