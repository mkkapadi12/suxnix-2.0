import React, { useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { Outlet } from 'react-router-dom';
import { getProfile } from '@/Store/features/auth/user.auth.slice';
import { useDispatch, useSelector } from 'react-redux';

const Layout = () => {
  // Hide Navbar/Footer for auth routes & worker dashboard routes
  // const hideLayout =
  //   location.pathname === '/login' || location.pathname === '/signup';

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('suxnixToken');

    if (token && !user) {
      dispatch(getProfile());
    }
  }, [dispatch, user]);

  return (
    <div>
      {<Navbar />}
      <main className="min-h-screen">
        <Outlet />
      </main>
      {<Footer />}
    </div>
  );
};

export default Layout;
