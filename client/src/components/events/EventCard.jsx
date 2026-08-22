import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useAlert } from '../../hooks/useAlert';
import { eventService } from '../../services/eventService';
import Badge from '../common/Badge';
import Button from '../common/Button';
import EventTicketModal from './EventTicketModal';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Ticket,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { formatDate, formatTime } from '../../utils/formatDate';

export default function EventCard({ event, onEventUpdated, onSelectEvent }) {
  const { user, isAuthenticated, isStudent, updateUserProfile } = useAuth();
  const { showToast } = useAlert();

  const [loading, setLoading] = useState(false);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState(null);

  const isRegistered =
    user?.registeredEvents?.includes(event._id) ||
    event.userRegistered;

  const capacity = event.capacity || 100;
  const registeredCount = event.registeredCount || 0;
  const percentFilled = Math.min(100, Math.round((registeredCount / capacity) * 100));
  const isFull = registeredCount >= capacity;

  const handleRegister = async (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      showToast('Please sign in as a student to register for events', 'warning');
      return;
    }

    if (isRegistered) {
      // Find ticket and open pass
      try {
        const userRegistrations = await eventService.getUserRegistrations(user._id, user.email);
        const match = userRegistrations.find((r) => r.eventId === event._id);
        if (match) {
          setGeneratedTicket(match);
          setTicketModalOpen(true);
        } else {
          showToast('Already registered! Check your dashboard for the ticket pass.', 'info');
        }
      } catch {
        showToast('Ticket pass active in dashboard', 'info');
      }
      return;
    }

    if (isFull) {
      showToast('This event has reached full capacity!', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await eventService.registerForEvent(event._id, user);
      showToast('🎉 Registration confirmed! Your digital admission pass is ready.', 'success');
      setGeneratedTicket(res.registration);
      setTicketModalOpen(true);

      // Update user state
      if (user) {
        const registeredEvents = [...(user.registeredEvents || []), event._id];
        updateUserProfile({ registeredEvents });
      }

      if (onEventUpdated) onEventUpdated();
    } catch (err) {
      showToast(err.message || 'Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryVariant = (cat) => {
    switch (cat) {
      case 'Technical':
        return 'primary';
      case 'Cultural':
        return 'purple';
      case 'Sports':
        return 'success';
      case 'Arts':
        return 'cyan';
      default:
        return 'default';
    }
  };

  return (
    <>
      <div
        onClick={() => onSelectEvent && onSelectEvent(event)}
        className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-slate-300 group cursor-pointer"
      >
        {/* Banner with badging */}
        <div className="relative h-44 w-full overflow-hidden bg-slate-100">
          <img
            src={event.bannerImage}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

          <div className="absolute top-3 left-3 flex items-center gap-2">
            <Badge variant={getCategoryVariant(event.category)} size="sm">
              {event.category}
            </Badge>
          </div>

          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-xs font-semibold border border-white/20">
            {event.fee || 'Free'}
          </div>

          {/* Date Tag */}
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-slate-900 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-indigo-600" />
            <span>{formatDate(event.date)}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wide">
              {event.clubName}
            </span>
            <h3 className="text-base font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors mt-0.5">
              {event.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
              {event.shortDescription || event.description}
            </p>

            {/* Venue & Time info */}
            <div className="mt-3 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>{formatTime(event.time)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span className="truncate">{event.venue}</span>
              </div>
            </div>
          </div>

          {/* Seat Capacity Bar & Actions */}
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
            {/* Seat capacity bar */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
                <span>Seats Available</span>
                <span className={isFull ? 'text-rose-600' : 'text-slate-900'}>
                  {registeredCount} / {capacity} ({capacity - registeredCount} left)
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    percentFilled > 85 ? 'bg-rose-500' : percentFilled > 60 ? 'bg-amber-500' : 'bg-indigo-600'
                  }`}
                  style={{ width: `${percentFilled}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-1">
              <button
                type="button"
                className="text-xs font-bold text-slate-600 group-hover:text-indigo-600 flex items-center gap-1"
              >
                Full Details <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <Button
                size="sm"
                variant={isRegistered ? 'success' : isFull ? 'secondary' : 'primary'}
                icon={isRegistered ? Ticket : CheckCircle2}
                isLoading={loading}
                disabled={isFull && !isRegistered}
                onClick={handleRegister}
              >
                {isRegistered ? 'View Pass' : isFull ? 'Sold Out' : 'Register Now'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Pass Modal */}
      {generatedTicket && (
        <EventTicketModal
          isOpen={ticketModalOpen}
          onClose={() => setTicketModalOpen(false)}
          ticket={generatedTicket}
          triggerConfetti={true}
        />
      )}
    </>
  );
}
