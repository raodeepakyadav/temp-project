import React from 'react';

export default function Card({
  children,
  header,
  footer,
  hoverable = false,
  className = '',
  onClick,
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-slate-200/90 shadow-sm shadow-slate-100 overflow-hidden ${
        hoverable ? 'card-hover cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {header && (
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          {header}
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && (
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/40">
          {footer}
        </div>
      )}
    </div>
  );
}
