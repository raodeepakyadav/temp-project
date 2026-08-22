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
  options = [], // For select type
  ...props
}) {
  const baseInputStyles =
    'w-full bg-white text-slate-900 border rounded-xl px-3.5 py-2.5 text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed';

  const borderStyles = error
    ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20 text-rose-900'
    : 'border-slate-300 hover:border-slate-400 focus:border-indigo-600';

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-xs font-semibold text-slate-700 flex items-center gap-1">
          {label}
          {required && <span className="text-rose-500 font-bold">*</span>}
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
            className={`${baseInputStyles} ${borderStyles} ${Icon ? 'pl-10' : ''} cursor-pointer bg-no-repeat`}
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

      {error && <p className="text-xs text-rose-600 font-medium mt-0.5">{error}</p>}
      {!error && helperText && <p className="text-xs text-slate-500 mt-0.5">{helperText}</p>}
    </div>
  );
}
