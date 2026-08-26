import React from 'react';
import { Bell, Ticket, Activity } from 'lucide-react';

export default function RecentActivity({ registrations = [], announcements = [] }) {
  const activities = [
    ...registrations.slice(0, 3).map((r) => ({
      id: r._id,
      icon: Ticket,
      iconColor: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
      title: `${r.studentName} registered for ${r.eventTitle}`,
      time: r.registeredAt,
      type: 'Registration',
    })),
    ...announcements.slice(0, 2).map((a) => ({
      id: a._id,
      icon: Bell,
      iconColor: 'bg-amber-50 text-amber-700 border border-amber-100',
      title: `Notice issued: ${a.title}`,
      time: a.createdAt,
      type: 'Notice',
    })),
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
      <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
        <Activity className="w-4 h-4 text-[#1e3a5f]" />
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
                <div className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${act.iconColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-700 line-clamp-1">{act.title}</p>
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
