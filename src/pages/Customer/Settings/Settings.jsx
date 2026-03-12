import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CommonHero from '@/pages/components/CommonHero';
import ProfileSettingsTab from './components/ProfileSettingsTab';
import OrdersTab from './components/OrdersTab';
import WishlistTab from './components/WishlistTab';
import GeneralSettingsTab from './components/GeneralSettingsTab';

const tabs = [
  { id: 'profile', label: 'Profile Settings', icon: '👤' },
  { id: 'orders', label: 'My Orders', icon: '📦' },
  { id: 'wishlist', label: 'Wishlist', icon: '❤️' },
  { id: 'general', label: 'General Settings', icon: '⚙️' },
];

const Settings = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!token) {
      navigate('/login');
      return;
    }
  }, [token, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettingsTab />;
      case 'orders':
        return <OrdersTab />;
      case 'wishlist':
        return <WishlistTab />;
      case 'general':
        return <GeneralSettingsTab />;
      default:
        return <ProfileSettingsTab />;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <CommonHero title="Settings" />

      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
                <h2 className="text-lg font-bold text-suxnix-heading mb-4">Settings</h2>
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all font-medium ${
                        activeTab === tab.id
                          ? 'bg-suxnix-primary text-white shadow-md'
                          : 'text-suxnix-heading hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                {/* Tab Title */}
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-suxnix-heading">
                    {tabs.find((t) => t.id === activeTab)?.label}
                  </h1>
                  <p className="text-suxnix-body mt-2">
                    Manage your account settings and preferences
                  </p>
                </div>

                {/* Tab Content */}
                <div className="mt-8">{renderTabContent()}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Settings;
