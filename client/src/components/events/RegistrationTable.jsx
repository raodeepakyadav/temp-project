import React, { useState, useEffect } from 'react';
import { eventService } from '../../services/eventService';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { SkeletonRow } from '../common/Loader';
import { Download, Search, Users, CheckCircle2, QrCode } from 'lucide-react';
import { formatDate, formatTime } from '../../utils/formatDate';

export default function RegistrationTable({ selectedEventId, events = [] }) {
  const [currentEventId, setCurrentEventId] = useState(selectedEventId || (events[0]?._id ?? ''));
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (selectedEventId) {
      setCurrentEventId(selectedEventId);
    } else if (events.length > 0 && !currentEventId) {
      setCurrentEventId(events[0]._id);
    }
  }, [selectedEventId, events]);

  useEffect(() => {
    const loadAttendees = async () => {
      if (!currentEventId) return;
      setLoading(true);
      try {
        const data = await eventService.getEventAttendees(currentEventId);
        setAttendees(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadAttendees();
  }, [currentEventId]);

  const filteredAttendees = attendees.filter((a) => {
    const q = search.toLowerCase();
    return (
      a.studentName?.toLowerCase().includes(q) ||
      a.studentEmail?.toLowerCase().includes(q) ||
      a.rollNo?.toLowerCase().includes(q) ||
      a.ticketNumber?.toLowerCase().includes(q) ||
      a.department?.toLowerCase().includes(q)
    );
  });

  const exportCSV = () => {
    if (filteredAttendees.length === 0) return;
    const currentEvent = events.find((e) => e._id === currentEventId);
    const headers = ['Ticket Number,Student Name,Email,Roll Number,Department,Registration Date,Status'];
    const rows = filteredAttendees.map((a) =>
      `"${a.ticketNumber}","${a.studentName}","${a.studentEmail}","${a.rollNo || ''}","${a.department || ''}","${a.registeredAt || ''}","${a.status}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `attendees_${currentEvent?.title.replace(/\s+/g, '_') || 'event'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const activeEvent = events.find((e) => e._id === currentEventId);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Control Header */}
      <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Select Event Roster:
          </label>
          <select
            value={currentEventId}
            onChange={(e) => setCurrentEventId(e.target.value)}
            className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 max-w-xs"
          >
            {events.map((e) => (
              <option key={e._id} value={e._id}>
                {e.title} ({e.registeredCount || 0} registered)
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          {/* Search bar */}
          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search attendee by name/roll..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white text-slate-900 text-xs rounded-xl pl-9 pr-3 py-1.5 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <Button
            size="sm"
            variant="outline"
            icon={Download}
            onClick={exportCSV}
            disabled={filteredAttendees.length === 0}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats Mini Bar */}
      {activeEvent && (
        <div className="px-6 py-3 bg-indigo-50/40 border-b border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <div>
            Event: <span className="font-bold text-slate-900">{activeEvent.title}</span> • Venue:{' '}
            <span className="font-semibold text-slate-800">{activeEvent.venue}</span>
          </div>
          <div className="font-bold text-indigo-900">
            {attendees.length} / {activeEvent.capacity || 100} Registered
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-4 space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonRow key={i} />
            ))}
          </div>
        ) : filteredAttendees.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Users className="w-8 h-8 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-semibold text-slate-700">No registered attendees yet</p>
            <p className="text-xs text-slate-400 mt-0.5">
              Registrations submitted by students will appear in this roster live.
            </p>
          </div>
        ) : (
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-6">Ticket #</th>
                <th className="py-3.5 px-6">Student Name & Roll</th>
                <th className="py-3.5 px-6">Department</th>
                <th className="py-3.5 px-6">Email</th>
                <th className="py-3.5 px-6">Registration Time</th>
                <th className="py-3.5 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredAttendees.map((att) => (
                <tr key={att._id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-6 font-mono text-indigo-700 font-bold">
                    {att.ticketNumber}
                  </td>
                  <td className="py-3.5 px-6">
                    <div className="font-bold text-slate-900">{att.studentName}</div>
                    <div className="text-[11px] text-slate-400 font-normal">
                      Roll: {att.rollNo || 'N/A'}
                    </div>
                  </td>
                  <td className="py-3.5 px-6 text-slate-600">{att.department || 'CSE'}</td>
                  <td className="py-3.5 px-6 text-slate-500">{att.studentEmail}</td>
                  <td className="py-3.5 px-6 text-slate-500">
                    {formatDate(att.registeredAt)} • {formatTime(att.registeredAt)}
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <Badge variant="success" size="sm" dot>
                      Confirmed
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
