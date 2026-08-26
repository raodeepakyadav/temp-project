import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import Logo from '../components/common/Logo';

export default function RegisterPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <Logo />
          <h2 className="text-xl font-semibold text-slate-900 tracking-tight mt-3">
            Create University Account
          </h2>
          <p className="text-xs text-slate-500">
            Join collegiate organizations, register for fests, and get verified digital entry passes
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}
