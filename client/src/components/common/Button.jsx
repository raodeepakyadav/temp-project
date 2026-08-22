import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  iconRight: IconRight,
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/20 focus:ring-indigo-500 border border-transparent',
    secondary:
      'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80 focus:ring-slate-400',
    outline:
      'bg-transparent hover:bg-slate-50 text-slate-700 border border-slate-300 focus:ring-indigo-500',
    danger:
      'bg-rose-600 hover:bg-rose-700 text-white shadow-sm shadow-rose-500/20 focus:ring-rose-500 border border-transparent',
    success:
      'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-500/20 focus:ring-emerald-500 border border-transparent',
    ghost:
      'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-transparent focus:ring-slate-300',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        Icon && <Icon className="w-4 h-4 flex-shrink-0" />
      )}
      {children}
      {!isLoading && IconRight && <IconRight className="w-4 h-4 flex-shrink-0" />}
    </button>
  );
}
