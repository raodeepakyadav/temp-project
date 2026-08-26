import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import {
  Compass,
  Calendar,
  Bell,
  LayoutDashboard,
  Mail,
  Phone,
  MapPin,
  UserPlus,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <Logo size="md" />
            </Link>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              The official student activity portal of Chitkara University. Discover clubs,
              register for events, stay updated with campus notices, and manage your
              extracurricular journey — all in one place.
            </p>
            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <span>Dean of Student Affairs • Chitkara University</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <a
                  href="mailto:student.affairs@chitkara.edu.in"
                  className="text-[#1e3a5f] hover:underline"
                >
                  student.affairs@chitkara.edu.in
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <span>+91 (01762) 507-000</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4">
              Directory
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/clubs"
                  className="flex items-center gap-2 text-slate-600 hover:text-[#1e3a5f] transition-colors"
                >
                  <Compass className="w-4 h-4 text-slate-400" />
                  All Student Clubs
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="flex items-center gap-2 text-slate-600 hover:text-[#1e3a5f] transition-colors"
                >
                  <Calendar className="w-4 h-4 text-slate-400" />
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link
                  to="/announcements"
                  className="flex items-center gap-2 text-slate-600 hover:text-[#1e3a5f] transition-colors"
                >
                  <Bell className="w-4 h-4 text-slate-400" />
                  Campus Notices
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="flex items-center gap-2 text-slate-600 hover:text-[#1e3a5f] transition-colors"
                >
                  <UserPlus className="w-4 h-4 text-slate-400" />
                  Student Registration
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4">
              Portals
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/student/dashboard"
                  className="flex items-center gap-2 text-slate-600 hover:text-[#1e3a5f] transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4 text-slate-400" />
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-2 text-slate-600 hover:text-[#1e3a5f] transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4 text-slate-400" />
                  Faculty / Admin Panel
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-slate-600 hover:text-[#1e3a5f] transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4 text-slate-400" />
                  Role-based Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} CampusConnect • Chitkara University. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            Managed by <span className="font-medium text-slate-700">Dean of Student Affairs</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
