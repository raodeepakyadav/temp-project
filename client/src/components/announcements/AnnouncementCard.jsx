import React from 'react';
import Badge from '../common/Badge';
import { Bell, AlertCircle, Pin, Clock, User, Trash2 } from 'lucide-react';
import { formatRelativeTime } from '../../utils/formatDate';

export default function AnnouncementCard({ announcement, onDelete, canDelete = false }) {
  const getPriorityVariant = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'urgent':
        return 'urgent';
      case 'event alert':
        return 'eventAlert';
      default:
        return 'general';
    }
  };

  return (
    <div
      className={`rounded-2xl p-5 border transition-all duration-150 ${
        announcement.priority?.toLowerCase() === 'urgent'
          ? 'bg-rose-50/40 border-rose-200/80 shadow-xs'
          : announcement.isPinned
          ? 'bg-indigo-50/30 border-indigo-200/70'
          : 'bg-white border-slate-200/90 shadow-xs hover:border-slate-300'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <Badge variant={getPriorityVariant(announcement.priority)} size="sm" dot>
            {announcement.priority || 'General'}
          </Badge>
          {announcement.isPinned && (
            <span className="flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-full">
              <Pin className="w-3 h-3 rotate-45" /> Pinned Notice
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-600 flex items-center gap-1 font-medium">
            <Clock className="w-3 h-3" />
            {formatRelativeTime(announcement.createdAt)}
          </span>
          {canDelete && onDelete && (
            <button
              onClick={() => onDelete(announcement._id)}
              className="text-slate-400 hover:text-rose-600 p-1 rounded-lg transition-colors cursor-pointer"
              title="Delete announcement"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-3">
        <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
          {announcement.title}
        </h4>
        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
          {announcement.content}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5 font-medium">
          <User className="w-3.5 h-3.5 text-slate-400" />
          <span>Issued by: <strong className="text-slate-700">{announcement.author}</strong></span>
        </div>
        {announcement.targetAudience && (
          <span className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md font-medium">
            To: {announcement.targetAudience}
          </span>
        )}
      </div>
    </div>
  );
}
