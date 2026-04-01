import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProfile } from '@/Store/features/admin/features/admin.auth.slice';
import { Card, CardContent } from '@/components/ui/card';
import {
  Users,
  ShoppingBag,
  Package,
  TrendingUp,
  ArrowUpRight,
  LayoutGrid,
  CheckCircle2,
  Clock,
  AlertCircle,
  User,
  Shield,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatCard } from './components/StatCard';
import { ADMIN_ICONS } from '@/lib/icons/admin.icons';

const QuickAction = ({ label, icon: Icon, to, color }) => (
  <Link
    to={to}
    className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-gray-100 hover:border-[#0d9b4d]/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-center group"
  >
    <div
      className={`w-11 h-11 rounded-xl flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}
    >
      <Icon size={20} />
    </div>
    <span className="text-xs font-semibold text-gray-600 group-hover:text-[#0d9b4d]">
      {label}
    </span>
  </Link>
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { admin, role, permissions } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    if (!admin) dispatch(getAdminProfile());
  }, [dispatch, admin]);

  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: ADMIN_ICONS.USERS,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      change: '+12%',
      show: permissions.includes('manage_users'),
    },
    {
      title: 'Total Orders',
      value: '5,678',
      icon: ADMIN_ICONS.SHOPPINGBAG,
      color: 'text-[#0d9b4d]',
      bg: 'bg-[#0d9b4d]/10',
      change: '+8%',
      show: permissions.includes('manage_orders'),
    },
    {
      title: 'Products',
      value: '234',
      icon: ADMIN_ICONS.PACKAGE,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      change: '+3%',
      show: permissions.includes('manage_products'),
    },
    {
      title: 'Revenue',
      value: '$45,678',
      icon: ADMIN_ICONS.TRENDINGUP,
      color: 'text-[#faa432]',
      bg: 'bg-[#faa432]/10',
      change: '+18%',
      show: permissions.includes('view_reports'),
    },
  ];

  const recentActivity = [
    {
      icon: ADMIN_ICONS.CHECKCIRCLE2,
      text: 'New order #1042 placed',
      time: '2m ago',
      color: 'text-[#0d9b4d]',
    },
    {
      icon: ADMIN_ICONS.CLOCK,
      text: 'User Jane Doe registered',
      time: '15m ago',
      color: 'text-blue-500',
    },
    {
      icon: ADMIN_ICONS.ALERTCIRCLE,
      text: 'Low stock alert: Protein Shake',
      time: '1h ago',
      color: 'text-[#faa432]',
    },
    {
      icon: ADMIN_ICONS.CHECKCIRCLE2,
      text: 'Order #1039 shipped',
      time: '3h ago',
      color: 'text-[#0d9b4d]',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#222222] normal-case tracking-tight">
            Welcome back, {admin?.firstName || 'Admin'}! 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Here's what's happening in your store today.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm w-fit">
          <span className="w-2 h-2 bg-[#0d9b4d] rounded-full animate-pulse" />
          Live data
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} size='md'/>
        ))}
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Profile card */}
        <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-linear-to-br from-[#1a1f2e] to-[#0d9b4d]/30 p-6 pb-10">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#0d9b4d] to-[#0a7d3e] flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-[#0d9b4d]/40">
                  {admin?.firstName?.charAt(0)}
                  {admin?.lastName?.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white text-lg leading-tight">
                    {admin?.firstName} {admin?.lastName}
                  </p>
                  <span className="text-xs bg-[#faa432]/20 text-[#faa432] px-2 py-0.5 rounded-full font-semibold capitalize">
                    {role?.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
            <div className="-mt-6 mx-4 bg-white rounded-xl shadow border border-gray-100 p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <User size={14} className="text-gray-400 shrink-0" />
                <span className="text-gray-500 truncate">{admin?.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield size={14} className="text-gray-400 shrink-0" />
                <span className="text-gray-500">
                  {permissions.length} permissions
                </span>
              </div>
            </div>
            <div className="px-4 pb-4 pt-2">
              <div className="flex flex-wrap gap-1.5 mt-2">
                {permissions.map((p, i) => (
                  <span
                    key={i}
                    className="text-xs bg-[#0d9b4d]/10 text-[#0d9b4d] px-2 py-0.5 rounded-full font-medium capitalize"
                  >
                    {p.replace(/_/g, ' ')}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card className="border-0 shadow-sm rounded-2xl lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="font-bold text-[#222222] mb-4 normal-case tracking-normal text-base">
              Recent Activity
            </h3>
            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className={`${item.color} shrink-0`}>
                    <item.icon size={18} />
                  </div>
                  <p className="text-sm text-gray-700 flex-1">{item.text}</p>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      {permissions.length > 0 && (
        <Card className="border-0 shadow-sm rounded-2xl">
          <CardContent className="p-6">
            <h3 className="font-bold text-[#222222] mb-4 normal-case tracking-normal text-base">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {permissions.includes('manage_users') && (
                <QuickAction
                  label="View Users"
                  icon={Users}
                  to="/admin/users"
                  color="bg-blue-50 text-blue-600"
                />
              )}
              {permissions.includes('manage_products') && (
                <QuickAction
                  label="Manage Products"
                  icon={Package}
                  to="/admin/products"
                  color="bg-purple-50 text-purple-600"
                />
              )}
              {permissions.includes('manage_orders') && (
                <QuickAction
                  label="View Orders"
                  icon={ShoppingBag}
                  to="/admin/orders"
                  color="bg-[#0d9b4d]/10 text-[#0d9b4d]"
                />
              )}
              {permissions.includes('view_reports') && (
                <QuickAction
                  label="Reports"
                  icon={TrendingUp}
                  to="/admin/reports"
                  color="bg-[#faa432]/10 text-[#faa432]"
                />
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
