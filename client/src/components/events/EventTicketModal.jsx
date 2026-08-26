import React from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { QrCode, Calendar, Clock, MapPin, CheckCircle, Download, Share2 } from 'lucide-react';
import { formatDate, formatTime } from '../../utils/formatDate';

export default function EventTicketModal({ isOpen, onClose, ticket }) {
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
      <div className="bg-[#1e3a5f] text-white rounded-xl p-6 border border-[#2c5282] shadow-lg relative overflow-hidden space-y-6">
        <div className="flex items-center justify-between border-b border-white/20 pb-4">
          <div>
            <span className="text-[10px] uppercase font-semibold tracking-widest text-amber-300">
              CampusConnect Pass
            </span>
            <p className="text-xs font-semibold text-slate-200 mt-0.5">{ticket.ticketNumber}</p>
          </div>
          <Badge variant="success" size="sm" dot>
            Verified Confirmed
          </Badge>
        </div>

        <div className="space-y-1">
          <h4 className="text-lg font-bold text-white leading-snug">
            {ticket.eventTitle}
          </h4>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/15">
          <div>
            <span className="text-[10px] text-slate-300 uppercase font-semibold">Attendee</span>
            <p className="font-semibold text-white mt-0.5">{ticket.studentName}</p>
            <p className="text-[10px] text-slate-300 mt-0.5">Roll: {ticket.rollNo}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-300 uppercase font-semibold">Department</span>
            <p className="font-medium text-slate-100 line-clamp-1 mt-0.5">{ticket.department}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-300 uppercase font-semibold">Date &amp; Time</span>
            <p className="font-semibold text-white mt-0.5">{formatDate(ticket.eventDate)}</p>
            <p className="text-[10px] text-amber-300 mt-0.5">{formatTime(ticket.eventTime)}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-300 uppercase font-semibold">Venue</span>
            <p className="font-semibold text-white line-clamp-1 mt-0.5">{ticket.eventVenue}</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl gap-2">
          <svg
            className="w-32 h-32"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="5" y="5" width="28" height="28" fill="#0f172a" />
            <rect x="9" y="9" width="20" height="20" fill="white" />
            <rect x="13" y="13" width="12" height="12" fill="#1e3a5f" />

            <rect x="67" y="5" width="28" height="28" fill="#0f172a" />
            <rect x="71" y="9" width="20" height="20" fill="white" />
            <rect x="75" y="13" width="12" height="12" fill="#1e3a5f" />

            <rect x="5" y="67" width="28" height="28" fill="#0f172a" />
            <rect x="9" y="71" width="20" height="20" fill="white" />
            <rect x="13" y="75" width="12" height="12" fill="#1e3a5f" />

            <rect x="38" y="10" width="8" height="8" fill="#0f172a" />
            <rect x="50" y="10" width="8" height="8" fill="#0f172a" />
            <rect x="38" y="22" width="8" height="8" fill="#0f172a" />
            <rect x="50" y="22" width="8" height="8" fill="#b7791f" />

            <rect x="10" y="38" width="8" height="8" fill="#0f172a" />
            <rect x="22" y="38" width="8" height="8" fill="#0f172a" />
            <rect x="38" y="38" width="8" height="8" fill="#0f172a" />
            <rect x="50" y="38" width="8" height="8" fill="#0f172a" />
            <rect x="65" y="38" width="8" height="8" fill="#0f172a" />
            <rect x="78" y="38" width="8" height="8" fill="#0f172a" />

            <rect x="38" y="50" width="8" height="8" fill="#b7791f" />
            <rect x="50" y="50" width="8" height="8" fill="#0f172a" />
            <rect x="65" y="50" width="8" height="8" fill="#0f172a" />
            <rect x="78" y="50" width="8" height="8" fill="#0f172a" />

            <rect x="38" y="65" width="8" height="8" fill="#0f172a" />
            <rect x="50" y="65" width="8" height="8" fill="#0f172a" />
            <rect x="65" y="65" width="8" height="8" fill="#b7791f" />
            <rect x="78" y="65" width="8" height="8" fill="#0f172a" />

            <rect x="38" y="78" width="8" height="8" fill="#0f172a" />
            <rect x="50" y="78" width="8" height="8" fill="#0f172a" />
            <rect x="65" y="78" width="8" height="8" fill="#0f172a" />
            <rect x="78" y="78" width="8" height="8" fill="#0f172a" />
          </svg>
          <p className="text-[10px] font-mono text-slate-500 tracking-wider">
            SCAN AT ENTRY DESK
          </p>
        </div>

        <p className="text-[10px] text-center text-slate-300">
          Present this digital QR badge at the registration desk for instant entry.
        </p>
      </div>
    </Modal>
  );
}
