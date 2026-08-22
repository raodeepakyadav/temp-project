import React, { useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Badge from '../common/Badge';
import confetti from 'canvas-confetti';
import { QrCode, Calendar, Clock, MapPin, CheckCircle, Download, Share2 } from 'lucide-react';
import { formatDate, formatTime } from '../../utils/formatDate';

export default function EventTicketModal({ isOpen, onClose, ticket, triggerConfetti = false }) {
  useEffect(() => {
    if (isOpen && triggerConfetti) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  }, [isOpen, triggerConfetti]);

  if (!ticket) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Digital Admission Pass"
      subtitle="Official event entry badge with verifiable QR credential."
      maxWidth="max-w-md"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" size="sm" icon={Download} onClick={handlePrint}>
            Download Pass
          </Button>
        </>
      }
    >
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-2xl relative overflow-hidden space-y-6">
        {/* Top pass badge */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400">
              CampusConnect Pass
            </span>
            <p className="text-xs font-mono font-bold text-slate-200">{ticket.ticketNumber}</p>
          </div>
          <Badge variant="success" size="sm" dot>
            Verified Confirmed
          </Badge>
        </div>

        {/* Event Info */}
        <div className="space-y-1">
          <h4 className="text-lg font-extrabold text-white leading-snug">
            {ticket.eventTitle}
          </h4>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/50">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Attendee</span>
            <p className="font-bold text-slate-100">{ticket.studentName}</p>
            <p className="text-[10px] text-slate-400">Roll: {ticket.rollNo}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Department</span>
            <p className="font-medium text-slate-200 line-clamp-1">{ticket.department}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Date & Time</span>
            <p className="font-bold text-slate-100">{formatDate(ticket.eventDate)}</p>
            <p className="text-[10px] text-indigo-300">{formatTime(ticket.eventTime)}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Venue</span>
            <p className="font-bold text-slate-100 line-clamp-1">{ticket.eventVenue}</p>
          </div>
        </div>

        {/* Simulated QR Code Box */}
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl text-slate-900 gap-2">
          {/* Custom SVG QR Representation */}
          <div className="p-2 bg-white rounded-lg border border-slate-200">
            <svg
              className="w-32 h-32"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Top-left Corner Square */}
              <rect x="5" y="5" width="28" height="28" fill="#0F172A" />
              <rect x="9" y="9" width="20" height="20" fill="white" />
              <rect x="13" y="13" width="12" height="12" fill="#4F46E5" />

              {/* Top-right Corner Square */}
              <rect x="67" y="5" width="28" height="28" fill="#0F172A" />
              <rect x="71" y="9" width="20" height="20" fill="white" />
              <rect x="75" y="13" width="12" height="12" fill="#4F46E5" />

              {/* Bottom-left Corner Square */}
              <rect x="5" y="67" width="28" height="28" fill="#0F172A" />
              <rect x="9" y="71" width="20" height="20" fill="white" />
              <rect x="13" y="75" width="12" height="12" fill="#4F46E5" />

              {/* Data Blocks */}
              <rect x="38" y="10" width="8" height="8" fill="#0F172A" />
              <rect x="50" y="10" width="8" height="8" fill="#0F172A" />
              <rect x="38" y="22" width="8" height="8" fill="#0F172A" />
              <rect x="50" y="22" width="8" height="8" fill="#4F46E5" />

              <rect x="10" y="38" width="8" height="8" fill="#0F172A" />
              <rect x="22" y="38" width="8" height="8" fill="#0F172A" />
              <rect x="38" y="38" width="8" height="8" fill="#0F172A" />
              <rect x="50" y="38" width="8" height="8" fill="#0F172A" />
              <rect x="65" y="38" width="8" height="8" fill="#0F172A" />
              <rect x="78" y="38" width="8" height="8" fill="#0F172A" />

              <rect x="38" y="50" width="8" height="8" fill="#4F46E5" />
              <rect x="50" y="50" width="8" height="8" fill="#0F172A" />
              <rect x="65" y="50" width="8" height="8" fill="#0F172A" />
              <rect x="78" y="50" width="8" height="8" fill="#0F172A" />

              <rect x="38" y="65" width="8" height="8" fill="#0F172A" />
              <rect x="50" y="65" width="8" height="8" fill="#0F172A" />
              <rect x="65" y="65" width="8" height="8" fill="#4F46E5" />
              <rect x="78" y="65" width="8" height="8" fill="#0F172A" />

              <rect x="38" y="78" width="8" height="8" fill="#0F172A" />
              <rect x="50" y="78" width="8" height="8" fill="#0F172A" />
              <rect x="65" y="78" width="8" height="8" fill="#0F172A" />
              <rect x="78" y="78" width="8" height="8" fill="#0F172A" />
            </svg>
          </div>
          <p className="text-[10px] font-mono text-slate-500 tracking-wider">
            SCAN AT ENTRY DESK
          </p>
        </div>

        <p className="text-[10px] text-center text-slate-400">
          Present this digital QR badge at the registration desk for instant entry.
        </p>
      </div>
    </Modal>
  );
}
