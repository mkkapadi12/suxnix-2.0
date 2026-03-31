import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAdmin } from '@/Store/features/admin/admin.auth.slice';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ADMIN_ICONS } from '@/lib/icons/admin.icons';

const AdminMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin, role } = useSelector((state) => state.adminAuth);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const initials = admin?.firstName
    ? `${admin.firstName.charAt(0)}${admin.lastName?.charAt(0) || ''}`.toUpperCase()
    : 'A';

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100 transition-colors group outline-none">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#0d9b4d] to-[#0a7d3e] flex items-center justify-center text-white text-sm font-bold shadow-md shadow-[#0d9b4d]/30 shrink-0">
            {initials}
          </div>
          <ADMIN_ICONS.CHEVRONDOWN
            size={14}
            className={`text-gray-400 hidden md:block transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-60 p-2 rounded-2xl shadow-xl border border-gray-100"
      >
        {/* Admin header */}
        <div className="flex items-center gap-3 px-3 py-3 mb-1 bg-linear-to-r from-[#0d9b4d]/8 to-[#faa432]/8 rounded-xl">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#0d9b4d] to-[#0a7d3e] flex items-center justify-center text-white text-sm font-bold shadow-md shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm text-[#222222] truncate">
              {admin?.firstName} {admin?.lastName}
            </p>
            <p className="text-xs text-[#0d9b4d] font-medium capitalize">
              {role?.replace('_', ' ')}
            </p>
            <p className="text-xs text-gray-400 truncate">{admin?.email}</p>
          </div>
        </div>

        <DropdownMenuItem
          onClick={() => {
            navigate('/admin/profile');
            setOpen(false);
          }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-gray-600 hover:text-[#0d9b4d] hover:bg-[#0d9b4d]/8 transition-colors"
        >
          <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
            <ADMIN_ICONS.USER size={14} />
          </div>
          <span className="text-sm font-medium">My Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            navigate('/admin/settings');
            setOpen(false);
          }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-gray-600 hover:text-[#0d9b4d] hover:bg-[#0d9b4d]/8 transition-colors"
        >
          <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
            <ADMIN_ICONS.SETTINGS size={14} />
          </div>
          <span className="text-sm font-medium">Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
            <ADMIN_ICONS.LOGOUT size={14} />
          </div>
          <span className="text-sm font-medium">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminMenu;
