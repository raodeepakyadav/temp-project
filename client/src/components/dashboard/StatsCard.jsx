import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendPositive = true,
  variant = 'indigo',
}) {
  const iconVariants = {
    indigo: 'bg-indigo-50 text-indigo-600',
    purple: 'bg-purple-50 text-purple-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between transition-all hover:border-slate-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
            {value}
          </h3>
        </div>
        {Icon && (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconVariants[variant] || iconVariants.indigo}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          {subtitle && <span className="text-slate-500 font-medium">{subtitle}</span>}
          {trend && (
            <span
              className={`inline-flex items-center gap-0.5 font-bold ${
                trendPositive ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {trendPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5" />
              )}
              {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
