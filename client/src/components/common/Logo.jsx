import React from 'react';
import logoSrc from '../../assets/logo.png';

export default function Logo({ light = false, size = 'md', showSubtitle = true }) {
  const height = size === 'sm' ? 'h-7' : size === 'lg' ? 'h-12' : 'h-9';

  return (
    <div className="flex items-center gap-2">
      <img
        src={logoSrc}
        alt="CampusConnect Logo"
        className={`${height} w-auto object-contain flex-shrink-0`}
        draggable={false}
      />
      <div className="flex flex-col leading-tight">
        <div
          className={`text-[15px] font-semibold tracking-tight ${
            light ? 'text-white' : 'text-slate-900'
          }`}
        >
          CampusConnect
        </div>
        {showSubtitle && (
          <span className={`text-[11px] font-normal ${light ? 'text-slate-300' : 'text-slate-500'}`}>
            Chitkara University
          </span>
        )}
      </div>
    </div>
  );
}
