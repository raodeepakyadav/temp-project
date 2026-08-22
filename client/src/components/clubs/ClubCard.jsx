import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAlert } from '../../hooks/useAlert';
import { clubService } from '../../services/clubService';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { Users, CheckCircle, ArrowUpRight, Sparkles } from 'lucide-react';

export default function ClubCard({ club, onClubUpdated }) {
  const { user, isAuthenticated, isStudent, updateUserProfile } = useAuth();
  const { showToast } = useAlert();

  const isMember = user?.joinedClubs?.includes(club._id);

  const handleJoin = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      showToast('Please log in as a student to join clubs', 'warning');
      return;
    }

    try {
      if (isMember) {
        const res = await clubService.leaveClub(club._id, user);
        if (res.user) updateUserProfile(res.user);
        showToast(`You left ${club.name}`, 'info');
      } else {
        const res = await clubService.joinClub(club._id, user);
        if (res.user) updateUserProfile(res.user);
        showToast(`🎉 You have joined ${club.name}!`, 'success');
      }
      if (onClubUpdated) onClubUpdated();
    } catch (err) {
      showToast(err.message || 'Action failed', 'error');
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
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-slate-300 group">
      {/* Club Banner Header */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <img
          src={club.bannerImage}
          alt={club.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        
        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <Badge variant={getCategoryVariant(club.category)} size="sm">
            {club.category}
          </Badge>
        </div>

        {/* Members Count Badge */}
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border border-white/20">
          <Users className="w-3.5 h-3.5" />
          <span>{club.membersCount || 0} Members</span>
        </div>

        {/* Club Logo Floating Avatar */}
        <div className="absolute -bottom-3 left-5 w-12 h-12 bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-center text-2xl">
          {club.logo || '🎓'}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 pt-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {club.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
            {club.tagline || club.description}
          </p>

          {/* Tags */}
          {club.tags && club.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {club.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer & Actions */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <Link
            to={`/clubs/${club._id}`}
            className="text-xs font-bold text-slate-700 hover:text-indigo-600 flex items-center gap-1 transition-colors"
          >
            Details <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <Button
            size="sm"
            variant={isMember ? 'success' : 'secondary'}
            icon={isMember ? CheckCircle : Sparkles}
            onClick={handleJoin}
          >
            {isMember ? 'Joined' : 'Join Club'}
          </Button>
        </div>
      </div>
    </div>
  );
}
