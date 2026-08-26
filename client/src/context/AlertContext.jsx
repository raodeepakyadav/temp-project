import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

/**
 * AlertContext provides global toast notifications across all pages and components.
 * Useful for showing feedback when users login, join clubs, register for events, etc.
 */
const AlertContext = createContext(null);

export const AlertProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Dismiss a specific toast notification by its unique ID
  const hideToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Display a new toast notification with an auto-dismiss timer
  const showToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const newToast = { id, message, type, duration };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        hideToast(id);
      }, duration);
    }
  }, [hideToast]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />,
    error: <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-400 flex-shrink-0" />,
  };

  const bgStyles = {
    success: 'bg-zinc-900 border-emerald-800/70 text-zinc-100 shadow-xl',
    error: 'bg-zinc-900 border-red-800/70 text-zinc-100 shadow-xl',
    warning: 'bg-zinc-900 border-amber-800/70 text-zinc-100 shadow-xl',
    info: 'bg-zinc-900 border-zinc-700 text-zinc-100 shadow-xl',
  };

  return (
    <AlertContext.Provider value={{ showToast, hideToast }}>
      {children}
      {/* Toast Notification Container positioned at bottom-right */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 ${bgStyles[toast.type] || bgStyles.info}`}
          >
            <div className="flex items-center gap-3">
              {icons[toast.type] || icons.info}
              <p className="text-sm font-medium text-white">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={() => hideToast(toast.id)}
              className="text-zinc-500 hover:text-zinc-200 p-1 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Close alert"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </AlertContext.Provider>
  );
};

// Custom hook to consume alert context in components
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
