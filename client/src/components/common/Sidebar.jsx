import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Badge from './Badge';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Bell,
  Compass,
  QrCode,
} from 'lucide-react';

export default function Sidebar({ activeTab, onTabChange, mode = 'student' }) {
  const { user } = useAuth();

  const studentTabs = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'clubs', label: 'My Subscribed Clubs', icon: Users },
    { id: 'events', label: 'My Event Passes (QR)', icon: QrCode },
    { id: 'announcements', label: 'Campus Bulletins', icon: Bell },
  ];

  const adminTabs = [
    { id: 'overview', label: 'Analytics & KPIs', icon: LayoutDashboard },
    { id: 'clubs', label: 'Club Management', icon: Users },
    { id: 'events', label: 'Event Management & Rosters', icon: CalendarCheck },
    { id: 'announcements', label: 'Broadcast Notices', icon: Bell },
  ];

  const tabs = mode === 'admin' ? adminTabs : studentTabs;

  return (
    <aside className="w-full lg:w-64 bg-white rounded-lg border border-slate-200 p-4 flex flex-col gap-6">
      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-md border border-slate-200">
        <img
          src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
          alt={user?.name || 'User'}
          className="w-11 h-11 rounded-md object-cover border border-slate-200"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900 truncate">{user?.name}</p>
          <p className="text-[11px] text-slate-500 truncate">{user?.department || 'Student'}</p>
          <div className="mt-1">
            <Badge variant={mode === 'admin' ? 'purple' : 'primary'} size="sm">
              {mode === 'admin' ? 'Faculty Admin' : 'Student'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
          {mode === 'admin' ? 'Administration' : 'Student Space'}
        </p>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-left cursor-pointer ${
                isActive
                  ? 'bg-[#1e3a5f]/10 text-[#1e3a5f] font-semibold border border-[#1e3a5f]/15'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#1e3a5f]' : 'text-slate-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-4 border-t border-slate-200 space-y-1">
        <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Quick Links
        </p>
        <NavLink
          to="/clubs"
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
        >
          <Compass className="w-3.5 h-3.5 text-slate-400" />
          Browse All Clubs
        </NavLink>
        <NavLink
          to="/events"
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
        >
          <CalendarCheck className="w-3.5 h-3.5 text-slate-400" />
          Browse Events
        </NavLink>
      </div>
    </aside>
  );
}
