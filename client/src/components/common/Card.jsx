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
      className={`bg-white rounded-lg border border-slate-200 text-slate-800 overflow-hidden ${
        hoverable ? 'card-hover cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {header && (
        <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          {header}
        </div>
      )}
      <div className="p-5">{children}</div>
      {footer && (
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50">
          {footer}
        </div>
      )}
    </div>
  );
}
