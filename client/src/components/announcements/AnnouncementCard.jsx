import React from 'react';
import Badge from '../common/Badge';
import { Clock, User, Pin, Trash2 } from 'lucide-react';
import { formatRelativeTime } from '../../utils/formatDate';

export default function AnnouncementCard({ announcement, onDelete, canDelete = false }) {
  const getPriorityVariant = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'urgent':
        return 'danger';
      case 'event alert':
        return 'warning';
      default:
        return 'info';
    }
  };

  const getBorderAccent = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'urgent':
        return 'border-l-red-500';
      case 'event alert':
        return 'border-l-amber-500';
      default:
        return 'border-l-slate-300';
    }
  };

  return (
    <div
      className={`bg-white rounded-lg border border-slate-200 border-l-4 ${getBorderAccent(announcement.priority)} p-4 hover:border-slate-300 card-hover`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <Badge variant={getPriorityVariant(announcement.priority)} size="sm" dot>
            {announcement.priority || 'General'}
          </Badge>
          {announcement.isPinned && (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
              <Pin className="w-3 h-3" /> Pinned
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
            <Clock className="w-3 h-3" />
            {formatRelativeTime(announcement.createdAt)}
          </span>
          {canDelete && onDelete && (
            <button
              onClick={() => onDelete(announcement._id)}
              className="text-slate-400 hover:text-red-600 p-1 rounded transition-colors cursor-pointer"
              title="Delete announcement"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-2.5">
        <h4 className="text-sm font-semibold text-slate-900 leading-snug">
          {announcement.title}
        </h4>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
          {announcement.content}
        </p>
      </div>

      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5 font-medium">
          <User className="w-3.5 h-3.5 text-slate-400" />
          <span>
            Issued by: <strong className="text-slate-800">{announcement.author}</strong>
          </span>
        </div>
        {announcement.targetAudience && (
          <span className="text-[11px] text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
            To: {announcement.targetAudience}
          </span>
        )}
      </div>
    </div>
  );
}
