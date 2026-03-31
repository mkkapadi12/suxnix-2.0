import React from 'react';
import CommonHero from '@/pages/components/CommonHero';
import AdminLoginForm from './components/AdminLoginForm';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
  return (
    <div>
      <main className="min-h-screen">
        <CommonHero title={'Admin Login'} />

        <section className="py-30 lg:py-32.5">
          <div className="max-w-330 mx-auto px-4 container">
            <div className="flex items-center justify-center">
              <div className="md:w-[66%] lg:w-[50%] mx-auto p-[30px_20px] sm:p-[25px_50px] border border-[#e1e1e1] space-y-5 rounded-md bg-[#f5f5f5]">
                <h1 className="text-2xl font-semibold sm:text-4xl text-suxnix-secondary">
                  Admin Access
                </h1>

                <p className="text-base font-normal">
                  Welcome to the admin panel. Please log in with your admin
                  credentials to continue.
                </p>

                <AdminLoginForm />

                <div className="text-base font-normal text-center">
                  <p>
                    New admin?
                    <Link
                      to="/admin/register"
                      className="pl-1 underline text-suxnix-secondary"
                    >
                      Register Here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminLogin;
