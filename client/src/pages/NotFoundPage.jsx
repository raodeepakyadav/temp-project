import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
        <Compass className="w-8 h-8" />
      </div>
      <span className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
        404
      </span>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mt-2">
        Page Not Found
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 max-w-sm mt-1 mb-6 leading-relaxed">
        The campus link you are looking for might have been moved or does not exist on the portal.
      </p>
      <Link to="/">
        <Button variant="primary" icon={ArrowLeft}>
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
