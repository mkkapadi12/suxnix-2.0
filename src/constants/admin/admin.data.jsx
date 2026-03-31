import { ADMIN_ICONS } from '@/lib/icons/admin.icons';

export const menuItems = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: ADMIN_ICONS.LAYOUTGRID,
    show: true,
  },
  {
    label: 'Profile',
    href: '/admin/profile',
    icon: ADMIN_ICONS.USER,
    show: true,
  },
  {
    label: 'Manage Admins',
    href: '/admin/manage-admins',
    icon: ADMIN_ICONS.SHIELD,
    show: true,
    permission: 'manage_admins',
  },
  {
    label: 'Users',
    href: '/admin/users',
    icon: ADMIN_ICONS.USERS,
    show: true,
    permission: 'manage_users',
  },
  {
    label: 'Products',
    href: '/admin/products',
    icon: ADMIN_ICONS.PACKAGE,
    show: true,
    permission: 'manage_products',
  },
  {
    label: 'Orders',
    href: '/admin/orders',
    icon: ADMIN_ICONS.SHOPPINGBAG,
    show: true,
    permission: 'manage_orders',
  },
  {
    label: 'Reports',
    href: '/admin/reports',
    icon: ADMIN_ICONS.BARCHART3,
    show: true,
    permission: 'view_reports',
  },
  {
    label: 'Settings',
    href: '/admin/settings',
    icon: ADMIN_ICONS.SETTINGS,
    show: true,
  },
];
