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
import { Button } from '@/components/ui/button';
import { PAGE_ICONS } from '@/lib/icons/page.icons';

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

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full hover:bg-gray-100"
        >
          <div className="w-10 h-10 rounded-full bg-suxnix-secondary flex items-center justify-center text-white font-bold">
            {admin?.firstName?.charAt(0).toUpperCase()}
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        {/* Admin Info */}
        <div className="px-4 py-3 border-b">
          <p className="font-semibold text-sm text-suxnix-heading">
            {admin?.firstName} {admin?.lastName}
          </p>
          <p className="text-xs text-gray-500 capitalize mt-1">{role}</p>
          <p className="text-xs text-gray-400 mt-1">{admin?.email}</p>
        </div>

        {/* Menu Items */}
        <DropdownMenuItem
          onClick={() => {
            navigate('/admin/profile');
            setOpen(false);
          }}
          className="cursor-pointer"
        >
          <PAGE_ICONS.USERS className="w-4 h-4 mr-2" />
          <span>Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            navigate('/admin/settings');
            setOpen(false);
          }}
          className="cursor-pointer"
        >
          <PAGE_ICONS.GRID className="w-4 h-4 mr-2" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
        >
          <PAGE_ICONS.XMARK className="w-4 h-4 mr-2" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminMenu;
