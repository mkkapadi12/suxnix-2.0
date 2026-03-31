import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminProfileForm from './components/AdminProfileForm';
import AdminChangePasswordForm from './components/AdminChangePasswordForm';
import { getAdminProfile } from '@/Store/features/admin/admin.auth.slice';

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminProfile());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-suxnix-heading">
          Admin Profile
        </h1>
        <p className="text-gray-600">
          Manage your admin profile and security settings.
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-200">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-suxnix-secondary data-[state=active]:text-white"
          >
            Profile Information
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="data-[state=active]:bg-suxnix-secondary data-[state=active]:text-white"
          >
            Change Password
          </TabsTrigger>
        </TabsList>

        {/* Profile Information Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <AdminProfileForm />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Change Password Tab */}
        <TabsContent value="password" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <AdminChangePasswordForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
