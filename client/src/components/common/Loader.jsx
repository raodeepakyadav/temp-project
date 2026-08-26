import React from 'react';
import { Loader2 } from 'lucide-react';

export function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };
  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      <Loader2 className={`${sizes[size]} animate-spin text-[#1e3a5f]`} />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse flex flex-col gap-4">
      <div className="w-full h-40 bg-slate-100 rounded-lg" />
      <div className="h-5 bg-slate-100 rounded w-3/4" />
      <div className="h-4 bg-slate-100/80 rounded w-full" />
      <div className="h-4 bg-slate-100/80 rounded w-2/3" />
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="h-4 bg-slate-100 rounded w-20" />
        <div className="h-8 bg-slate-100 rounded-md w-24" />
      </div>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 py-4 px-6 border-b border-slate-100 animate-pulse">
      <div className="w-10 h-10 bg-slate-100 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-slate-100 rounded w-1/3" />
        <div className="h-3 bg-slate-100/70 rounded w-1/4" />
      </div>
      <div className="h-6 bg-slate-100 rounded w-20" />
    </div>
  );
}

export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="min-h-[300px] flex flex-col items-center justify-center gap-3">
      <Spinner size="lg" />
      <p className="text-sm font-medium text-slate-500">{text}</p>
    </div>
  );
}
