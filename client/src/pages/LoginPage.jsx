import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import Logo from '../components/common/Logo';

export default function LoginPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <Logo />
          <h2 className="text-xl font-semibold text-slate-900 tracking-tight mt-3">
            Sign In to Campus Portal
          </h2>
          <p className="text-xs text-slate-500">
            Access your student activity passbook or administrative panel
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
