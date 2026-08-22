import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import { GraduationCap } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Sign In to CampusConnect
          </h2>
          <p className="text-xs text-slate-500">
            Access your student activity dashboard or faculty administration portal
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
