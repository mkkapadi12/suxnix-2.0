import React, { useEffect } from 'react';
import HeroSection from './components/HeroSection';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '@/components/ui/card';
import { getProfile } from '@/Store/features/auth/auth.slice';

const Home = () => {
  const { user, loading } = useSelector((state) => state.user);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <main>
      <HeroSection />
    </main>
  );
};

export default Home;
