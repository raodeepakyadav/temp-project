import React from 'react';
import { Calendar, UserPlus, Bell, Ticket, Sparkles } from 'lucide-react';

export default function RecentActivity({ registrations = [], announcements = [] }) {
  // Combine registrations and notices into an activity timeline
  const activities = [
    ...registrations.slice(0, 3).map((r) => ({
      id: r._id,
      icon: Ticket,
      iconColor: 'bg-emerald-50 text-emerald-600',
      title: `${r.studentName} registered for ${r.eventTitle}`,
      time: r.registeredAt,
      type: 'Registration',
    })),
    ...announcements.slice(0, 2).map((a) => ({
      id: a._id,
      icon: Bell,
      iconColor: 'bg-indigo-50 text-indigo-600',
      title: `Notice issued: ${a.title}`,
      time: a.createdAt,
      type: 'Notice',
    })),
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-indigo-600" />
        Live Campus Activity Feed
      </h3>

      {activities.length === 0 ? (
        <p className="text-xs text-slate-500 py-4 text-center">No recent activity logged.</p>
      ) : (
        <div className="space-y-3">
          {activities.map((act) => {
            const Icon = act.icon;
            return (
              <div key={act.id} className="flex items-start gap-3 text-xs">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${act.iconColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 line-clamp-1">{act.title}</p>
                  <span className="text-[10px] text-slate-400">{act.type}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
