import React from 'react';

export default function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error,
  helperText,
  required = false,
  disabled = false,
  icon: Icon,
  endIcon: EndIcon,
  className = '',
  rows = 3,
  options = [],
  ...props
}) {
  const baseInputStyles =
    'w-full bg-white text-slate-800 placeholder:text-slate-400 border rounded-md px-3.5 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed';

  const borderStyles = error
    ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20 text-red-700'
    : 'border-slate-200 hover:border-slate-300 focus:border-[#1e3a5f] focus:ring-[#1e3a5f]/20';

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-xs font-semibold text-slate-700 flex items-center gap-1">
          {label}
          {required && <span className="text-red-500 font-bold">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 pointer-events-none text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}

        {type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            rows={rows}
            className={`${baseInputStyles} ${borderStyles} ${Icon ? 'pl-10' : ''} resize-none`}
            {...props}
          />
        ) : type === 'select' ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className={`${baseInputStyles} ${borderStyles} ${Icon ? 'pl-10' : ''} cursor-pointer bg-no-repeat appearance-none pr-8`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value ?? opt} value={opt.value ?? opt}>
                {opt.label ?? opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={`${baseInputStyles} ${borderStyles} ${Icon ? 'pl-10' : ''} ${EndIcon ? 'pr-10' : ''}`}
            {...props}
          />
        )}

        {EndIcon && (
          <div className="absolute right-3.5 text-slate-400">
            <EndIcon className="w-4 h-4" />
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-600 font-medium mt-0.5">{error}</p>}
      {!error && helperText && <p className="text-xs text-slate-500 mt-0.5">{helperText}</p>}
    </div>
  );
}
