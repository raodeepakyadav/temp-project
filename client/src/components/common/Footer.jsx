import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">
                Campus<span className="text-indigo-600">Connect</span>
              </span>
            </div>
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              The unified digital operating portal for university student clubs, technical hackathons,
              cultural festivals, and campus-wide administrative broadcasts.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Chitkara University • Course 25CS022 (CA-II Portal)
            </div>
          </div>

          {/* Col 2: Discovery */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/clubs" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  All Student Clubs
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link to="/announcements" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  Campus Bulletins
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  Student Registration
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal Roles */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Portals & Roles
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/student/dashboard" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  Faculty / Admin Panel
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  1-Click Role Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CampusConnect. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for University Campus
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
