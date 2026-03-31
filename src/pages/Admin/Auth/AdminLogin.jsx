import React from 'react';
import AdminLoginForm from './components/AdminLoginForm';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const AdminLogin = () => {
  return (
    <div className="min-h-screen bg-[#f4f6fa] flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-[#1a1f2e] via-[#0d9b4d]/20 to-[#1a1f2e] relative overflow-hidden flex-col justify-between p-12">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#0d9b4d] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-56 h-56 bg-[#faa432] rounded-full blur-3xl" />
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute border border-white/10 rounded-full"
              style={{
                width: `${(i + 1) * 120}px`,
                height: `${(i + 1) * 120}px`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 bg-linear-to-br from-[#faa432] to-[#e8920a] rounded-xl flex items-center justify-center shadow-lg">
            <Shield size={20} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-lg leading-tight">Suxnix</p>
            <p className="text-gray-400 text-xs">Admin Panel</p>
          </div>
        </div>

        {/* Center content */}
        <div className="relative space-y-6 text-center">
          <div className="w-24 h-24 bg-linear-to-br from-[#0d9b4d] to-[#0a7d3e] rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-[#0d9b4d]/50">
            <Shield size={40} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white normal-case tracking-tight">
              Admin Portal
            </h2>
            <p className="text-gray-400 mt-2 text-sm leading-relaxed max-w-xs mx-auto">
              Secure access to your dashboard. Manage users, products, orders,
              and reports all in one place.
            </p>
          </div>
          <div className="flex items-center justify-center gap-6">
            {['Secure', 'Reliable', 'Fast'].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#0d9b4d] rounded-full" />
                <span className="text-gray-400 text-xs">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-center text-gray-500 text-xs">
          © 2025 Suxnix. All rights reserved.
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="w-9 h-9 bg-linear-to-br from-[#faa432] to-[#e8920a] rounded-xl flex items-center justify-center">
              <Shield size={18} className="text-white" />
            </div>
            <p className="font-bold text-[#222222]">Suxnix Admin</p>
          </div>

          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-[#222222] normal-case tracking-tight">
              Welcome back 👋
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Sign in to access your admin dashboard.
            </p>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <AdminLoginForm />
          </div>

          {/* Footer link */}
          <p className="text-center text-sm text-gray-500">
            New admin?{' '}
            <Link
              to="/admin/register"
              className="text-[#0d9b4d] font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
