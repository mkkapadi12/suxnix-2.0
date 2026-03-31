import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminProfileForm from './components/AdminProfileForm';
import AdminChangePasswordForm from './components/AdminChangePasswordForm';
import { getAdminProfile } from '@/Store/features/admin/admin.auth.slice';
import { ADMIN_ICONS } from '@/lib/icons/admin.icons';

const Profile = () => {
  const dispatch = useDispatch();
  const { admin, role, permissions } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    dispatch(getAdminProfile());
  }, [dispatch]);

  const initials = admin?.firstName
    ? `${admin.firstName.charAt(0)}${admin.lastName?.charAt(0) || ''}`.toUpperCase()
    : 'A';

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#222222] normal-case tracking-tight">
          My Profile
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your personal information and security settings.
        </p>
      </div>

      {/* Profile overview card */}
      <div className="bg-linear-to-br from-[#1a1f2e] to-[#0a7d3e]/40 rounded-2xl p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-[#0d9b4d] to-[#0a7d3e] flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-[#0d9b4d]/40 shrink-0">
            {initials}
          </div>
          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-bold text-white normal-case tracking-tight">
              {admin?.firstName} {admin?.lastName}
            </h2>
            <span className="inline-block mt-1 text-xs bg-[#faa432]/20 text-[#faa432] px-3 py-1 rounded-full font-semibold capitalize">
              {role?.replace('_', ' ')}
            </span>
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <ADMIN_ICONS.MAIL size={14} />
                <span className="truncate max-w-[200px]">{admin?.email}</span>
              </div>
              {admin?.phone && (
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <ADMIN_ICONS.PHONE size={14} />
                  <span>{admin.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <ADMIN_ICONS.SHIELD size={14} />
                <span>{permissions.length} permissions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Permission chips */}
        {permissions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/10">
            {permissions.map((p, i) => (
              <span
                key={i}
                className="text-xs bg-white/10 text-white px-3 py-1 rounded-full capitalize"
              >
                {p.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-white border border-gray-100 p-1 rounded-xl shadow-sm h-auto">
          <TabsTrigger
            value="profile"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium data-[state=active]:bg-[#0d9b4d] data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-gray-500 transition-all"
          >
            <ADMIN_ICONS.USER size={15} />
            Profile Info
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium data-[state=active]:bg-[#0d9b4d] data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-gray-500 transition-all"
          >
            <ADMIN_ICONS.LOCK size={15} />
            Change Password
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            <h3 className="font-bold text-[#222222] text-base normal-case mb-6">
              Personal Information
            </h3>
            <AdminProfileForm />
          </div>
        </TabsContent>

        <TabsContent value="password" className="mt-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            <h3 className="font-bold text-[#222222] text-base normal-case mb-1">
              Change Password
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Use a strong password to keep your account secure.
            </p>
            <AdminChangePasswordForm />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
