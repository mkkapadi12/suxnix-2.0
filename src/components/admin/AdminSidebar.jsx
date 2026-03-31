import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PAGE_ICONS } from '@/lib/icons/page.icons';
import { cn } from '@/lib/utils';

const AdminSidebar = ({ open, setOpen }) => {
  const location = useLocation();
  const { role, permissions } = useSelector((state) => state.adminAuth);

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/admin/dashboard',
      icon: PAGE_ICONS.GRID,
      show: true,
    },
    {
      label: 'Profile',
      href: '/admin/profile',
      icon: PAGE_ICONS.USERS,
      show: true,
    },
    {
      label: 'Manage Admins',
      href: '/admin/manage-admins',
      icon: PAGE_ICONS.USERS,
      show: role === 'admin', // super admin only
      permission: 'manage_admins',
    },
    {
      label: 'Users',
      href: '/admin/users',
      icon: PAGE_ICONS.USERS,
      show: true,
      permission: 'manage_users',
    },
    {
      label: 'Products',
      href: '/admin/products',
      icon: PAGE_ICONS.GRID,
      show: true,
      permission: 'manage_products',
    },
    {
      label: 'Orders',
      href: '/admin/orders',
      icon: PAGE_ICONS.GRID,
      show: true,
      permission: 'manage_orders',
    },
    {
      label: 'Reports',
      href: '/admin/reports',
      icon: PAGE_ICONS.GRID,
      show: true,
      permission: 'view_reports',
    },
    {
      label: 'Settings',
      href: '/admin/settings',
      icon: PAGE_ICONS.GRID,
      show: true,
    },
  ];

  const filteredMenuItems = menuItems.filter((item) => {
    if (!item.show) return false;
    if (item.permission && !permissions.includes(item.permission)) return false;
    return true;
  });

  const isActive = (href) => location.pathname === href;

  return (
    <>
      {/* Sidebar */}
      <aside
        className={cn(
          'bg-white shadow-lg transition-all duration-300 border-r border-gray-200',
          open ? 'w-64' : 'w-20',
          'hidden md:flex md:flex-col',
        )}
      >
        {/* Sidebar content */}
        <nav className="flex-1 px-4 py-8">
          <ul className="space-y-2">
            {filteredMenuItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    'flex items-center gap-4 px-4 py-3 rounded-lg transition-colors',
                    isActive(item.href)
                      ? 'bg-suxnix-secondary text-white'
                      : 'text-gray-700 hover:bg-gray-100',
                  )}
                  title={!open ? item.label : undefined}
                >
                  <item.icon
                    size={24}
                    className={cn(
                      'shrink-0 w-6 h-6',
                      isActive(item.href)
                        ? 'text-white'
                        : 'text-suxnix-secondary',
                    )}
                  />
                  {open && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 transition-transform md:hidden',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <nav className="px-4 py-8">
          <ul className="space-y-2">
            {filteredMenuItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-4 px-4 py-3 rounded-lg transition-colors',
                    isActive(item.href)
                      ? 'bg-suxnix-secondary text-white'
                      : 'text-gray-700 hover:bg-gray-100',
                  )}
                >
                  <item.icon
                    size={24}
                    className={
                      isActive(item.href)
                        ? 'text-white'
                        : 'text-suxnix-secondary'
                    }
                  />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
