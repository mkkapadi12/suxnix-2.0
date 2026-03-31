import React from 'react';
import AdminRegisterForm from './components/AdminRegisterForm';
import { Link } from 'react-router-dom';
import { Shield, UserPlus, Lock, BarChart3 } from 'lucide-react';

const AdminRegister = () => {
  return (
    <div className="min-h-screen bg-[#f4f6fa] flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-5/12 bg-linear-to-br from-[#1a1f2e] via-[#faa432]/10 to-[#1a1f2e] relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-72 h-72 bg-[#faa432] rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-56 h-56 bg-[#0d9b4d] rounded-full blur-3xl" />
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

        {/* Features */}
        <div className="relative space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white normal-case tracking-tight">
              Join the Team
            </h2>
            <p className="text-gray-400 mt-2 text-sm leading-relaxed">
              Create your admin account and start managing the platform.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { icon: UserPlus, label: 'Manage Users & Admins', color: 'bg-blue-500/20 text-blue-400' },
              { icon: Lock, label: 'Secure Role-Based Access', color: 'bg-[#0d9b4d]/20 text-[#0d9b4d]' },
              { icon: BarChart3, label: 'Full Dashboard Analytics', color: 'bg-[#faa432]/20 text-[#faa432]' },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                  <Icon size={18} />
                </div>
                <span className="text-gray-300 text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-center text-gray-500 text-xs">
          © 2025 Suxnix. All rights reserved.
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-start justify-center p-6 md:p-12 overflow-y-auto">
        <div className="w-full max-w-xl space-y-8 py-4">
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
              Create Account 🚀
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Fill in the details below to register a new admin account.
            </p>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <AdminRegisterForm />
          </div>

          {/* Footer link */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link
              to="/admin/login"
              className="text-[#0d9b4d] font-semibold hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
