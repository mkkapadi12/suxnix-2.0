import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '@/Store/features/auth/auth.slice';
import ProfileHeader from './components/ProfileHeader';
import ProfileForm from './components/ProfileForm';
import CommonHero from '@/pages/components/CommonHero';
import { Button } from '@/components/ui/button';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.user);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch user profile if not already loaded
    if (!user) {
      dispatch(getProfile());
    }
  }, [token, user, dispatch, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <CommonHero title="My Profile" />

      <section className="py-12 lg:py-16">
        <div className="max-w-330 mx-auto px-4 container">
          <ProfileHeader user={user} />

          <div className="mt-12">
            <ProfileForm user={user} />
          </div>
          <div className="mt-10 flex justify-end items-center">
            <Button
              variant="primary"
              className="cursor-pointer"
              onClick={() => navigate('/addresses')}
            >
              View Addresses
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
