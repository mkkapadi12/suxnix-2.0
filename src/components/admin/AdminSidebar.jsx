import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { cn } from '@/lib/utils';
import { menuItems } from '@/constants/admin/admin.data';
import { ADMIN_ICONS } from '@/lib/icons/admin.icons';

const SidebarNavItem = ({ item, isActive, open, onClick }) => {
  const Icon = item.icon;
  return (
    <li>
      <Link
        to={item.href}
        onClick={onClick}
        title={!open ? item.label : undefined}
        className={cn(
          'group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm',
          isActive
            ? 'bg-linear-to-r from-[#0d9b4d] to-[#0a7d3e] text-white shadow-md shadow-[#0d9b4d]/30'
            : 'text-gray-400 hover:text-white hover:bg-white/10',
        )}
      >
        <span
          className={cn(
            'shrink-0 flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200',
            isActive
              ? 'bg-white/20 text-white'
              : 'text-gray-400 group-hover:text-white group-hover:bg-white/10',
          )}
        >
          <Icon size={18} />
        </span>

        {open && (
          <>
            <span className="flex-1 truncate">{item.label}</span>
            {isActive && (
              <ADMIN_ICONS.CHEVRONRIGHT size={14} className="text-white/70 shrink-0" />
            )}
          </>
        )}

        {/* Active indicator bar */}
        {isActive && (
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#faa432] rounded-l-full" />
        )}
      </Link>
    </li>
  );
};

const AdminSidebar = ({ open, setOpen }) => {
  const location = useLocation();
  const { permissions } = useSelector((state) => state.adminAuth);

  const filteredItems = menuItems.filter((item) => {
    if (!item.show) return false;
    if (item.permission && !permissions.includes(item.permission)) return false;
    return true;
  });

  const isActive = (href) => location.pathname === href;

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo area */}
      <div
        className={cn(
          'flex items-center gap-3 px-4 py-5 border-b border-white/10',
          !open && 'justify-center',
        )}
      >
        <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#faa432] to-[#e8920a] flex items-center justify-center shadow-lg shrink-0">
          <ADMIN_ICONS.SHIELD size={18} className="text-white" />
        </div>
        {open && (
          <div>
            <p className="text-white font-bold text-sm leading-tight">Admin</p>
            <p className="text-gray-400 text-xs">Panel</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {open && (
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest px-3 mb-3">
            Navigation
          </p>
        )}
        <ul className="space-y-1">
          {filteredItems.map((item) => (
            <SidebarNavItem
              key={item.href}
              item={item}
              isActive={isActive(item.href)}
              open={open}
              onClick={() =>
                setOpen && window.innerWidth < 768 && setOpen(false)
              }
            />
          ))}
        </ul>
      </nav>

      {/* Bottom branding */}
      {open && (
        <div className="px-4 py-4 border-t border-white/10">
          <p className="text-gray-500 text-xs text-center">
            © 2025 Suxnix Admin
          </p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          'bg-[#1a1f2e] transition-all duration-300 hidden md:flex md:flex-col shrink-0 relative',
          open ? 'w-60' : 'w-[72px]',
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 w-64 bg-[#1a1f2e] z-50 transition-transform duration-300 md:hidden flex flex-col',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default AdminSidebar;
