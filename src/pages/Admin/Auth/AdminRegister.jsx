import React from 'react';
import CommonHero from '@/pages/components/CommonHero';
import AdminRegisterForm from './components/AdminRegisterForm';
import { Link } from 'react-router-dom';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';

const AdminRegister = () => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen">
        <CommonHero title={'Admin Registration'} />

        <section className="py-30 lg:py-32.5">
          <div className="max-w-330 mx-auto px-4 container">
            <div className="flex items-center justify-center">
              <div className="md:w-[66%] lg:w-[90%] mx-auto p-[30px_20px] sm:p-[25px_50px] border border-[#e1e1e1] space-y-5 rounded-md bg-[#f5f5f5]">
                <h1 className="text-2xl font-semibold sm:text-4xl text-suxnix-secondary">
                  Admin Registration
                </h1>

                <p className="text-base font-normal">
                  Create a new admin account. Please fill in all the required
                  fields below.
                </p>

                <AdminRegisterForm />

                <div className="text-base font-normal text-center">
                  <p>
                    Already have an account?
                    <Link
                      to="/admin/login"
                      className="pl-1 underline text-suxnix-secondary"
                    >
                      Login Here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AdminRegister;
