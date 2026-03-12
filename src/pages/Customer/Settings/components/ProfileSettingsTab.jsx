import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfileForm from '@/pages/Customer/Profile/components/ProfileForm';
import ProfileHeader from '@/pages/Customer/Profile/components/ProfileHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ProfileSettingsTab = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <ProfileHeader user={user} />

      {/* Profile Form */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-suxnix-heading mb-6">Edit Profile Information</h3>
        <ProfileForm user={user} />
      </Card>

      {/* Address Management */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-suxnix-heading mb-4">Manage Addresses</h3>
        <p className="text-suxnix-body mb-4">
          Manage your delivery addresses for quick checkout
        </p>
        <Button variant="primary" onClick={() => navigate('/addresses')}>
          Go to Address Manager
        </Button>
      </Card>
    </div>
  );
};

export default ProfileSettingsTab;
