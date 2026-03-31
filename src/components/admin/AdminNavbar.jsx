import React from 'react';
import { useSelector } from 'react-redux';
import AdminMenu from './AdminMenu';
import { PAGE_ICONS } from '@/lib/icons/page.icons';
import logo from '../../assets/images/logo/logo.png';
import { Link } from 'react-router-dom';

const AdminNavbar = ({ onMenuClick }) => {
  const { admin } = useSelector((state) => state.adminAuth);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left - Menu toggle and logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            aria-label="Toggle sidebar"
          >
            <PAGE_ICONS.GRID size={24} className="text-suxnix-heading" />
          </button>
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <img src={logo} alt="Suxnix" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Right - Admin menu */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
            <p className="text-sm font-medium text-suxnix-heading">
              {admin?.firstName} {admin?.lastName}
            </p>
            <p className="text-xs text-gray-500 capitalize">{admin?.role}</p>
          </div>
          <AdminMenu />
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
