import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { clubService } from '../services/clubService';
import { eventService } from '../services/eventService';
import { announcementService } from '../services/announcementService';
import ClubCard from '../components/clubs/ClubCard';
import EventCard from '../components/events/EventCard';
import AnnouncementCard from '../components/announcements/AnnouncementCard';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  Compass,
  Calendar,
  Bell,
  Users,
  CheckCircle2,
  Trophy,
  ShieldCheck,
} from 'lucide-react';

export default function HomePage() {
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [c, e, a] = await Promise.all([
          clubService.getAllClubs(),
          eventService.getAllEvents(),
          announcementService.getAllAnnouncements(),
        ]);
        setClubs(c.slice(0, 3));
        setEvents(e.slice(0, 3));
        setAnnouncements(a.slice(0, 2));
      } catch (err) {
        console.error(err);
      }
    };
    loadHomeData();
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-14 pb-10 overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-50/70 via-slate-50/50 to-transparent pointer-events-none -z-10 rounded-full blur-3xl opacity-60" />

        <div className="max-w-4xl mx-auto text-center space-y-6 px-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-xs font-semibold text-indigo-700 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Centralized Student Activity Portal • Chitkara University</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]"
          >
            Your Entire Campus Life, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800">
              One Unified Portal.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Say goodbye to scattered WhatsApp groups and missing notice boards. Discover
            technical coding societies, cultural drama clubs, sports tournaments, and register for
            campus events with instant digital entry passes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <Link to="/events">
              <Button size="lg" variant="primary" icon={Calendar} iconRight={ArrowRight}>
                Explore Campus Events
              </Button>
            </Link>
            <Link to="/clubs">
              <Button size="lg" variant="secondary" icon={Compass}>
                Browse Student Clubs
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Quick Stats Ticker */}
        <div className="max-w-5xl mx-auto mt-12 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="text-center p-2">
              <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600">25+</p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">Active Campus Clubs</p>
            </div>
            <div className="text-center p-2 border-l border-slate-100">
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">120+</p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">Annual Events & Fests</p>
            </div>
            <div className="text-center p-2 border-l border-slate-100">
              <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600">4,500+</p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">Student Registrations</p>
            </div>
            <div className="text-center p-2 border-l border-slate-100">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600">100%</p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">Verified Digital Entry</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Clubs Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Student Organizations
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-0.5">
              Featured Campus Clubs
            </h2>
          </div>
          <Link
            to="/clubs"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            View all clubs <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <ClubCard key={club._id} club={club} />
          ))}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Happening Next
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-0.5">
              Upcoming Workshops & Fests
            </h2>
          </div>
          <Link
            to="/events"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            Explore all events <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((evt) => (
            <EventCard key={evt._id} event={evt} />
          ))}
        </div>
      </section>

      {/* Urgent Announcements Banner Feed */}
      {announcements.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Bell className="w-4 h-4 text-indigo-600" />
              Latest Campus Notices
            </h3>
            <Link
              to="/announcements"
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              Notice Board
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {announcements.map((anc) => (
              <AnnouncementCard key={anc._id} announcement={anc} />
            ))}
          </div>
        </section>
      )}

      {/* Why CampusConnect Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Built for Modern Academia
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Engineered to streamline campus engagement.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              CampusConnect bridges the gap between students looking to build careers through
              extracurriculars and coordinators organizing university initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                01
              </div>
              <h4 className="text-base font-bold text-white">Centralized Discovery</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Filter and browse all campus clubs across Technical, Cultural, Sports, Arts, and
                Social categories with accurate meeting schedules.
              </p>
            </div>

            <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                02
              </div>
              <h4 className="text-base font-bold text-white">Instant QR Passes</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Register for events in one click. Get auto-generated digital tickets with seat
                tracking that coordinators can scan at event entry.
              </p>
            </div>

            <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                03
              </div>
              <h4 className="text-base font-bold text-white">Audited Admin Control</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Club coordinators and faculty dean have live attendee lists with CSV export, notice
                broadcasting, and full management controls.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
