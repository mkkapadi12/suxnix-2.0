import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/useToast';

const GeneralSettingsTab = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    promotionalEmails: false,
    smsNotifications: true,
    privacyProfile: 'private',
    shareActivity: false,
  });

  const handleCheckboxChange = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handlePrivacyChange = (value) => {
    setSettings((prev) => ({
      ...prev,
      privacyProfile: value,
    }));
  };

  const handleSaveSettings = () => {
    // TODO: Implement API call to save settings
    toast({
      title: 'Success',
      description: 'Settings saved successfully',
    });
  };

  return (
    <div className="space-y-6">
      {/* Notification Preferences */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-suxnix-heading mb-6">Notification Preferences</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="font-medium text-suxnix-heading">Email Notifications</label>
              <p className="text-sm text-suxnix-body">Receive updates via email</p>
            </div>
            <Checkbox
              checked={settings.emailNotifications}
              onCheckedChange={() => handleCheckboxChange('emailNotifications')}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="font-medium text-suxnix-heading">Order Updates</label>
              <p className="text-sm text-suxnix-body">Get notified about order status changes</p>
            </div>
            <Checkbox
              checked={settings.orderUpdates}
              onCheckedChange={() => handleCheckboxChange('orderUpdates')}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="font-medium text-suxnix-heading">Promotional Emails</label>
              <p className="text-sm text-suxnix-body">Receive offers and promotions</p>
            </div>
            <Checkbox
              checked={settings.promotionalEmails}
              onCheckedChange={() => handleCheckboxChange('promotionalEmails')}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="font-medium text-suxnix-heading">SMS Notifications</label>
              <p className="text-sm text-suxnix-body">Receive updates via SMS</p>
            </div>
            <Checkbox
              checked={settings.smsNotifications}
              onCheckedChange={() => handleCheckboxChange('smsNotifications')}
            />
          </div>
        </div>
      </Card>

      {/* Privacy Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-suxnix-heading mb-6">Privacy Settings</h3>

        <div className="space-y-4">
          <div>
            <label className="font-medium text-suxnix-heading mb-3 block">Profile Visibility</label>
            <div className="space-y-3">
              {[
                { value: 'private', label: 'Private', description: 'Only you can see your profile' },
                {
                  value: 'friends',
                  label: 'Friends Only',
                  description: 'Only your connections can see your profile',
                },
                { value: 'public', label: 'Public', description: 'Everyone can see your profile' },
              ].map((option) => (
                <div
                  key={option.value}
                  className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  onClick={() => handlePrivacyChange(option.value)}
                >
                  <input
                    type="radio"
                    name="privacy"
                    value={option.value}
                    checked={settings.privacyProfile === option.value}
                    onChange={() => handlePrivacyChange(option.value)}
                    className="mr-3"
                  />
                  <div>
                    <p className="font-medium text-suxnix-heading">{option.label}</p>
                    <p className="text-sm text-suxnix-body">{option.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mt-4">
            <div>
              <label className="font-medium text-suxnix-heading">Share Activity</label>
              <p className="text-sm text-suxnix-body">Let others see your purchases (anonymously)</p>
            </div>
            <Checkbox
              checked={settings.shareActivity}
              onCheckedChange={() => handleCheckboxChange('shareActivity')}
            />
          </div>
        </div>
      </Card>

      {/* Account Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-suxnix-heading mb-6">Account Settings</h3>

        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">Change Password</h4>
            <p className="text-sm text-yellow-800 mb-4">
              Keep your account secure by changing your password regularly
            </p>
            <Button variant="outline">Change Password</Button>
          </div>

          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-semibold text-red-900 mb-2">Delete Account</h4>
            <p className="text-sm text-red-800 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button variant="primary" onClick={handleSaveSettings}>
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default GeneralSettingsTab;
