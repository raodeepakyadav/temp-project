import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useAlert } from '../hooks/useAlert';
import { clubService } from '../services/clubService';
import { eventService } from '../services/eventService';
import { announcementService } from '../services/announcementService';
import Sidebar from '../components/common/Sidebar';
import StatsCard from '../components/dashboard/StatsCard';
import QuickActions from '../components/dashboard/QuickActions';
import RecentActivity from '../components/dashboard/RecentActivity';
import RegistrationTable from '../components/events/RegistrationTable';
import ClubFormModal from '../components/clubs/ClubFormModal';
import EventFormModal from '../components/events/EventFormModal';
import AnnouncementFormModal from '../components/announcements/AnnouncementFormModal';
import AnnouncementCard from '../components/announcements/AnnouncementCard';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import {
  ShieldCheck,
  PlusCircle,
  CalendarPlus,
  BellRing,
  Users,
  Calendar,
  Ticket,
  Edit2,
  Trash2,
} from 'lucide-react';
import { formatDate, formatTime } from '../utils/formatDate';

/**
 * AdminDashboard provides faculty advisors and Dean of Student Affairs with:
 * 1. KPI analytics (total clubs, events, registrations, memberships)
 * 2. Club Portfolio CRUD (create, update, delete)
 * 3. Event Scheduling CRUD & Live Attendee Rosters with CSV download
 * 4. Campus-wide Notice Broadcasting & deletion
 */
export default function AdminDashboard() {
  const { user } = useAuth();
  const { showToast } = useAlert();

  const [activeTab, setActiveTab] = useState('overview');
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  // Modal visibility states
  const [clubModalOpen, setClubModalOpen] = useState(false);
  const [selectedClubToEdit, setSelectedClubToEdit] = useState(null);

  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [selectedEventToEdit, setSelectedEventToEdit] = useState(null);

  const [noticeModalOpen, setNoticeModalOpen] = useState(false);

  // Fetch complete campus data for administrative overview
  const loadAdminData = useCallback(async () => {
    try {
      const [c, e, a] = await Promise.all([
        clubService.getAllClubs(),
        eventService.getAllEvents(),
        announcementService.getAllAnnouncements(),
      ]);
      setClubs(c);
      setEvents(e);
      setAnnouncements(a);

      // Aggregate all attendee registrations across all events
      const allRegs = [];
      for (const ev of e) {
        const attendees = await eventService.getEventAttendees(ev._id);
        allRegs.push(...attendees);
      }
      setRegistrations(allRegs);
    } catch (err) {
      console.error('Error loading admin dashboard data', err);
    }
  }, []);

  useEffect(() => {
    loadAdminData();
  }, [loadAdminData]);

  // Club Handlers
  const handleCreateClub = () => {
    setSelectedClubToEdit(null);
    setClubModalOpen(true);
  };

  const handleEditClub = (club) => {
    setSelectedClubToEdit(club);
    setClubModalOpen(true);
  };

  const handleDeleteClub = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await clubService.deleteClub(id);
        showToast('Club deleted', 'info');
        loadAdminData();
      } catch (err) {
        showToast(err.message || 'Failed to delete', 'error');
      }
    }
  };

  // Event Handlers
  const handleCreateEvent = () => {
    setSelectedEventToEdit(null);
    setEventModalOpen(true);
  };

  const handleEditEvent = (evt) => {
    setSelectedEventToEdit(evt);
    setEventModalOpen(true);
  };

  const handleDeleteEvent = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete event "${title}"?`)) {
      try {
        await eventService.deleteEvent(id);
        showToast('Event deleted', 'info');
        loadAdminData();
      } catch (err) {
        showToast(err.message || 'Failed to delete', 'error');
      }
    }
  };

  // Notice Handlers
  const handleBroadcastNotice = () => {
    setNoticeModalOpen(true);
  };

  const handleDeleteNotice = async (id) => {
    try {
      await announcementService.deleteAnnouncement(id);
      showToast('Notice deleted', 'info');
      loadAdminData();
    } catch (err) {
      showToast(err.message || 'Failed to delete notice', 'error');
    }
  };

  const totalMembers = clubs.reduce((acc, c) => acc + (c.membersCount || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
      {/* Welcome & Admin Status Banner */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'}
            alt={user?.name}
            className="w-14 h-14 rounded-lg object-cover border-2 border-slate-200"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Administration Portal
              </h1>
              <Badge variant="purple" size="sm">
                Faculty / Dean
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {user?.name} • {user?.department || 'Dean of Student Affairs'} • Chitkara University
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant="primary" icon={PlusCircle} onClick={handleCreateClub}>
            Add Club
          </Button>
          <Button size="sm" variant="secondary" icon={CalendarPlus} onClick={handleCreateEvent}>
            Schedule Event
          </Button>
          <Button size="sm" variant="secondary" icon={BellRing} onClick={handleBroadcastNotice}>
            Broadcast Notice
          </Button>
        </div>
      </div>

      {/* Main Admin Dashboard Layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left: Sidebar */}
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} mode="admin" />

        {/* Right: Tab Content Area */}
        <main className="flex-1 w-full space-y-6">
          {/* TAB 1: OVERVIEW & ANALYTICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Analytics KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                  title="Registered Clubs"
                  value={clubs.length}
                  subtitle="Active campus teams"
                  icon={Users}
                  trend="+2 this term"
                  variant="indigo"
                />
                <StatsCard
                  title="Published Events"
                  value={events.length}
                  subtitle="Hackathons & fests"
                  icon={Calendar}
                  trend="+5 upcoming"
                  variant="purple"
                />
                <StatsCard
                  title="Total Attendee Passes"
                  value={registrations.length}
                  subtitle="Verified check-ins"
                  icon={Ticket}
                  trend="+18% growth"
                  variant="emerald"
                />
                <StatsCard
                  title="Club Memberships"
                  value={totalMembers}
                  subtitle="Enrolled students"
                  icon={ShieldCheck}
                  trend="High Engagement"
                  variant="amber"
                />
              </div>

              {/* Quick Actions Shortcuts */}
              <QuickActions
                mode="admin"
                onOpenCreateClub={handleCreateClub}
                onOpenCreateEvent={handleCreateEvent}
                onOpenCreateNotice={handleBroadcastNotice}
              />

              {/* Recent Activity Log */}
              <RecentActivity registrations={registrations} announcements={announcements} />
            </div>
          )}

          {/* TAB 2: CLUB MANAGEMENT */}
          {activeTab === 'clubs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Campus Club Portfolio</h2>
                  <p className="text-xs text-slate-500">
                    Create, update, and manage official university clubs and student organizations.
                  </p>
                </div>
                <Button size="sm" variant="primary" icon={PlusCircle} onClick={handleCreateClub}>
                  New Club
                </Button>
              </div>

              {/* Clubs Management Table */}
              <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                        <th className="py-3.5 px-6">Club Name & Category</th>
                        <th className="py-3.5 px-6">Student Coordinator</th>
                        <th className="py-3.5 px-6">Faculty Advisor</th>
                        <th className="py-3.5 px-6">Members</th>
                        <th className="py-3.5 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {clubs.map((c) => (
                        <tr key={c._id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-6">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{c.logo || '🎓'}</span>
                              <div>
                                <span className="font-semibold text-slate-900">{c.name}</span>
                                <div className="mt-0.5">
                                  <Badge variant="primary" size="sm">
                                    {c.category}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-6">{c.leadCoordinator || 'N/A'}</td>
                          <td className="py-3.5 px-6 text-slate-500">{c.facultyAdvisor || 'N/A'}</td>
                          <td className="py-3.5 px-6 font-semibold text-slate-900">
                            {c.membersCount || 0}
                          </td>
                          <td className="py-3.5 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleEditClub(c)}
                                className="p-1.5 rounded-md text-slate-500 hover:text-[#1e3a5f] hover:bg-slate-100 transition-colors cursor-pointer"
                                title="Edit club"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteClub(c._id, c.name)}
                                className="p-1.5 rounded-md text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                title="Delete club"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EVENT MANAGEMENT & ROSTERS */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Events & Attendee Rosters</h2>
                  <p className="text-xs text-slate-500">
                    Publish workshops, check live registrations, and export attendee rosters to CSV.
                  </p>
                </div>
                <Button size="sm" variant="primary" icon={CalendarPlus} onClick={handleCreateEvent}>
                  Schedule Event
                </Button>
              </div>

              {/* Events List Table */}
              <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <div className="p-4 bg-slate-50 border-b border-slate-200 font-semibold text-xs text-slate-700">
                  Published Events
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                        <th className="py-3.5 px-6">Event Title & Host</th>
                        <th className="py-3.5 px-6">Date & Time</th>
                        <th className="py-3.5 px-6">Venue</th>
                        <th className="py-3.5 px-6">Registrations / Capacity</th>
                        <th className="py-3.5 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {events.map((evt) => (
                        <tr key={evt._id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-6">
                            <div className="font-semibold text-slate-900">{evt.title}</div>
                            <div className="text-[11px] text-[#1e3a5f] font-medium">{evt.clubName}</div>
                          </td>
                          <td className="py-3.5 px-6 text-slate-600">
                            {formatDate(evt.date)} • {formatTime(evt.time)}
                          </td>
                          <td className="py-3.5 px-6 text-slate-600">{evt.venue}</td>
                          <td className="py-3.5 px-6">
                            <span className="font-semibold text-slate-900">{evt.registeredCount || 0}</span>
                            <span className="text-slate-400"> / {evt.capacity || 100}</span>
                          </td>
                          <td className="py-3.5 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleEditEvent(evt)}
                                className="p-1.5 rounded-md text-slate-500 hover:text-[#1e3a5f] hover:bg-slate-100 transition-colors cursor-pointer"
                                title="Edit event"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteEvent(evt._id, evt.title)}
                                className="p-1.5 rounded-md text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                title="Delete event"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Attendee Roster Table Component */}
              <div className="pt-2">
                <RegistrationTable events={events} />
              </div>
            </div>
          )}

          {/* TAB 4: BROADCAST NOTICES */}
          {activeTab === 'announcements' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Broadcast Campus Bulletins</h2>
                  <p className="text-xs text-slate-500">
                    Publish urgent campus advisories and event alerts to all student dashboards.
                  </p>
                </div>
                <Button size="sm" variant="primary" icon={BellRing} onClick={handleBroadcastNotice}>
                  Broadcast Notice
                </Button>
              </div>

              <div className="space-y-3">
                {announcements.map((anc) => (
                  <AnnouncementCard
                    key={anc._id}
                    announcement={anc}
                    onDelete={handleDeleteNotice}
                    canDelete={true}
                  />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Admin Modals */}
      <ClubFormModal
        isOpen={clubModalOpen}
        onClose={() => setClubModalOpen(false)}
        clubToEdit={selectedClubToEdit}
        onSaved={loadAdminData}
      />

      <EventFormModal
        isOpen={eventModalOpen}
        onClose={() => setEventModalOpen(false)}
        eventToEdit={selectedEventToEdit}
        onSaved={loadAdminData}
      />

      <AnnouncementFormModal
        isOpen={noticeModalOpen}
        onClose={() => setNoticeModalOpen(false)}
        onSaved={loadAdminData}
      />
    </div>
  );
}
