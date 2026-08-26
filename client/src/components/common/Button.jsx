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
    'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-sm px-5 py-2.5 gap-2.5 font-medium',
  };

  const variantStyles = {
    primary:
      'bg-[#1e3a5f] hover:bg-[#152a45] text-white focus:ring-[#1e3a5f]/30 border border-[#1e3a5f]/20',
    secondary:
      'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 focus:ring-slate-300',
    outline:
      'bg-transparent hover:bg-slate-50 text-slate-700 border border-slate-300 focus:ring-slate-300',
    accent:
      'bg-[#8b6914] hover:bg-[#6e5310] text-white focus:ring-[#8b6914]/30 border border-[#8b6914]/20',
    danger:
      'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 focus:ring-red-300',
    success:
      'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 focus:ring-emerald-300',
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
