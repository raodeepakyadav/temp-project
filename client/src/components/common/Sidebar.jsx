import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Badge from './Badge';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Bell,
  PlusCircle,
  ShieldCheck,
  Compass,
  QrCode,
  Sparkles,
} from 'lucide-react';

export default function Sidebar({ activeTab, onTabChange, mode = 'student' }) {
  const { user, isAdmin } = useAuth();

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
    <aside className="w-full lg:w-64 bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm flex flex-col gap-6">
      {/* User Mini Profile */}
      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
        <img
          src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
          alt={user?.name || 'User'}
          className="w-11 h-11 rounded-lg object-cover border border-slate-200"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-slate-900 truncate">{user?.name}</p>
          <p className="text-[11px] text-slate-500 truncate">{user?.department || 'Student'}</p>
          <div className="mt-1">
            <Badge variant={mode === 'admin' ? 'purple' : 'primary'} size="sm">
              {mode === 'admin' ? 'Faculty Admin' : 'Student'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="space-y-1">
        <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
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
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs shadow-indigo-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Quick Nav Shortcuts */}
      <div className="mt-auto pt-4 border-t border-slate-100 space-y-1">
        <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          Quick Links
        </p>
        <NavLink
          to="/clubs"
          className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <Compass className="w-3.5 h-3.5 text-slate-400" />
          Browse All Clubs
        </NavLink>
        <NavLink
          to="/events"
          className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <CalendarCheck className="w-3.5 h-3.5 text-slate-400" />
          Browse Events
        </NavLink>
      </div>
    </aside>
  );
}
