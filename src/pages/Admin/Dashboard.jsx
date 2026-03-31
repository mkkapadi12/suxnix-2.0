import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProfile } from '@/Store/features/admin/admin.auth.slice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PAGE_ICONS } from '@/lib/icons/page.icons';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { admin, role, permissions, loading } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    if (!admin) {
      dispatch(getAdminProfile());
    }
  }, [dispatch, admin]);

  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: PAGE_ICONS.USERS,
      color: 'bg-blue-100 text-blue-600',
      show: permissions.includes('manage_users'),
    },
    {
      title: 'Total Orders',
      value: '5,678',
      icon: PAGE_ICONS.GRID,
      color: 'bg-green-100 text-suxnix-secondary',
      show: permissions.includes('manage_orders'),
    },
    {
      title: 'Products',
      value: '234',
      icon: PAGE_ICONS.GRID,
      color: 'bg-purple-100 text-purple-600',
      show: permissions.includes('manage_products'),
    },
    {
      title: 'Revenue',
      value: '$45,678',
      icon: PAGE_ICONS.GRID,
      color: 'bg-yellow-100 text-yellow-600',
      show: permissions.includes('view_reports'),
    },
  ];

  const filteredStats = stats.filter((stat) => stat.show);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-suxnix-heading">
          Welcome, {admin?.firstName}!
        </h1>
        <p className="text-gray-600">
          Here's a quick overview of your admin dashboard.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredStats.map((stat, index) => (
          <Card key={index} className="border-none shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-suxnix-heading">
                {stat.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Admin Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Card */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Admin Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-lg font-semibold text-suxnix-heading">
                {admin?.firstName} {admin?.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-semibold text-suxnix-heading">
                {admin?.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-lg font-semibold text-suxnix-heading">
                {admin?.phone || 'Not provided'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Permissions Card */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Role & Permissions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="inline-block px-3 py-1 mt-2 bg-suxnix-secondary text-white rounded-full text-sm font-semibold capitalize">
                {role}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-3">Permissions</p>
              <div className="space-y-2">
                {permissions && permissions.length > 0 ? (
                  permissions.map((permission, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium mr-2 mb-2 capitalize"
                    >
                      {permission.replace(/_/g, ' ')}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No permissions assigned</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {permissions.includes('manage_users') && (
              <button className="p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-center">
                <p className="text-sm font-semibold text-suxnix-heading">
                  View Users
                </p>
              </button>
            )}
            {permissions.includes('manage_products') && (
              <button className="p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-center">
                <p className="text-sm font-semibold text-suxnix-heading">
                  Manage Products
                </p>
              </button>
            )}
            {permissions.includes('manage_orders') && (
              <button className="p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-center">
                <p className="text-sm font-semibold text-suxnix-heading">
                  View Orders
                </p>
              </button>
            )}
            {permissions.includes('view_reports') && (
              <button className="p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-center">
                <p className="text-sm font-semibold text-suxnix-heading">
                  View Reports
                </p>
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
