import React from 'react';

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
}) {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-medium',
    lg: 'text-sm px-3 py-1.5 font-semibold',
  };

  const variantStyles = {
    default: 'bg-slate-100 text-slate-700 border border-slate-200/80',
    primary: 'bg-indigo-50 text-indigo-700 border border-indigo-200/80',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200/80',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200/80',
    purple: 'bg-purple-50 text-purple-700 border border-purple-200/80',
    cyan: 'bg-cyan-50 text-cyan-800 border border-cyan-200/80',
    // Priority specific
    urgent: 'bg-rose-100 text-rose-800 border border-rose-300 font-semibold',
    eventAlert: 'bg-amber-100 text-amber-800 border border-amber-300 font-semibold',
    general: 'bg-slate-100 text-slate-700 border border-slate-300 font-medium',
  };

  const dotColors = {
    default: 'bg-slate-400',
    primary: 'bg-indigo-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    purple: 'bg-purple-500',
    cyan: 'bg-cyan-500',
    urgent: 'bg-rose-600 animate-pulse',
    eventAlert: 'bg-amber-600',
    general: 'bg-slate-500',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${sizeStyles[size]} ${variantStyles[variant] || variantStyles.default} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${dotColors[variant] || 'bg-current'}`}
        />
      )}
      {children}
    </span>
  );
}
