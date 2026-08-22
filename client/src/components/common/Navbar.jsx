import React, { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAlert } from '../../hooks/useAlert';
import Button from './Button';
import Badge from './Badge';
import {
  GraduationCap,
  Compass,
  Calendar,
  Bell,
  LayoutDashboard,
  ShieldCheck,
  LogOut,
  User,
  Menu,
  X,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { USER_ROLES } from '../../utils/constants';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout, switchDemoRole } = useAuth();
  const { showToast } = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleRoleToggle = () => {
    const nextRole = isAdmin ? USER_ROLES.STUDENT : USER_ROLES.ADMIN;
    switchDemoRole(nextRole);
    showToast(
      `Switched to ${nextRole === USER_ROLES.ADMIN ? 'Admin (Dean/Faculty)' : 'Student'} mode`,
      'info'
    );
    if (nextRole === USER_ROLES.ADMIN) {
      navigate('/admin/dashboard');
    } else {
      navigate('/student/dashboard');
    }
  };

  const handleLogout = () => {
    logout();
    showToast('You have been logged out', 'info');
    navigate('/login');
    setUserDropdownOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home', icon: Sparkles },
    { to: '/clubs', label: 'Clubs', icon: Compass },
    { to: '/events', label: 'Events', icon: Calendar },
    { to: '/announcements', label: 'Notices', icon: Bell },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-600/30 group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg text-slate-900 tracking-tight">Campus<span className="text-indigo-600">Connect</span></span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                  Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-600 -mt-0.5 font-medium hidden sm:block">
                Chitkara University
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-50/80 border border-slate-200/80 p-1 rounded-xl">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-150 ${
                    isActive
                      ? 'bg-white text-indigo-600 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-70" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5">
            {/* Quick 1-Click Role Switcher */}
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleRoleToggle}
                title="Click to toggle between Student & Admin view"
                className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
              >
                <span className="text-slate-400 text-[10px]">Role:</span>
                <Badge
                  variant={isAdmin ? 'purple' : 'primary'}
                  size="sm"
                  dot
                >
                  {isAdmin ? 'Admin View' : 'Student View'}
                </Badge>
                <span className="text-[10px] text-indigo-600 underline font-normal ml-0.5">
                  (switch)
                </span>
              </button>
            )}

            {/* Dashboard Shortcut Button */}
            {isAuthenticated && (
              <Link
                to={isAdmin ? '/admin/dashboard' : '/student/dashboard'}
                className="hidden sm:inline-flex"
              >
                <Button
                  variant={isAdmin ? 'primary' : 'secondary'}
                  size="sm"
                  icon={isAdmin ? ShieldCheck : LayoutDashboard}
                >
                  {isAdmin ? 'Admin Portal' : 'My Dashboard'}
                </Button>
              </Link>
            )}

            {/* Auth Dropdown / Buttons */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                >
                  <img
                    src={user?.avatar || DEMO_USERS.STUDENT.avatar}
                    alt={user?.name || 'User'}
                    className="w-8 h-8 rounded-lg object-cover border border-slate-200"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>

                {userDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setUserDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-20 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-3 py-2.5 border-b border-slate-100">
                        <p className="text-sm font-bold text-slate-900 truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                        <div className="mt-2 flex items-center gap-1.5">
                          <Badge variant={isAdmin ? 'purple' : 'primary'} size="sm">
                            {isAdmin ? 'Faculty / Admin' : 'Student'}
                          </Badge>
                          {user?.rollNo && (
                            <span className="text-[11px] text-slate-400">
                              #{user.rollNo}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="py-1">
                        <Link
                          to={isAdmin ? '/admin/dashboard' : '/student/dashboard'}
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-slate-400" />
                          Dashboard
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            handleRoleToggle();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-slate-400" />
                            <span>Switch Mode</span>
                          </div>
                          <span className="text-xs font-semibold text-indigo-600">
                            {isAdmin ? 'To Student' : 'To Admin'}
                          </span>
                        </button>
                      </div>

                      <div className="pt-1 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-600 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </NavLink>
              );
            })}
            {isAuthenticated && (
              <NavLink
                to={isAdmin ? '/admin/dashboard' : '/student/dashboard'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                <LayoutDashboard className="w-4 h-4" />
                {isAdmin ? 'Admin Dashboard' : 'Student Dashboard'}
              </NavLink>
            )}
          </div>

          {isAuthenticated && (
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  handleRoleToggle();
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-2 rounded-xl"
              >
                Switch to {isAdmin ? 'Student View' : 'Admin View'}
              </button>
              <button
                type="button"
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-semibold text-rose-600 px-3 py-2"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
