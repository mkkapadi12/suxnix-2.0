import React from 'react';
import { useSelector } from 'react-redux';
import AdminMenu from './AdminMenu';
import logo from '../../assets/images/logo/logo.png';
import { Link } from 'react-router-dom';
import { ADMIN_ICONS } from '@/lib/icons/admin.icons';

const AdminNavbar = ({ onMenuClick }) => {
  const { admin } = useSelector((state) => state.adminAuth);

  return (
    <header className="h-16 bg-white border-b border-gray-100 shadow-sm flex items-center shrink-0 z-30">
      <div className="flex items-center justify-between w-full px-4 md:px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500 hover:text-[#222222]"
            aria-label="Toggle sidebar"
          >
            <ADMIN_ICONS.MENU size={20} />
          </button>
          <Link to="/admin/dashboard" className="hidden sm:block">
            <img src={logo} alt="Suxnix" className="h-8 w-auto" />
          </Link>
        </div>

        {/* Center - Search bar */}
        <div className="hidden md:flex flex-1 max-w-sm mx-8">
          <div className="relative w-full">
            <ADMIN_ICONS.SEARCH
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0d9b4d]/30 focus:border-[#0d9b4d] transition-all"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Notification bell */}
          <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500 hover:text-[#222222]">
            <ADMIN_ICONS.BELL size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#faa432] rounded-full ring-2 ring-white" />
          </button>

          {/* Admin name – hidden on mobile */}
          <div className="hidden md:flex flex-col items-end leading-tight">
            <p className="text-sm font-semibold text-[#222222]">
              {admin?.firstName} {admin?.lastName}
            </p>
            <p className="text-xs text-gray-400 capitalize">
              {admin?.role?.replace('_', ' ')}
            </p>
          </div>

          {/* Avatar dropdown */}
          <AdminMenu />
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
