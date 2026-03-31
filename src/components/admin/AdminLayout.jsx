import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAdminProfile } from '@/Store/features/admin/admin.auth.slice';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminProfile());
  }, [dispatch]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar */}
        <AdminNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
