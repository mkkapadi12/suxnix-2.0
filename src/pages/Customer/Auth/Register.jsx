import React from 'react';
import { Link } from 'react-router-dom';
import CommonHero from '@/pages/components/CommonHero';
import RegisterForm from './components/RegisterForm';

const Register = () => {
  return (
    <div>
      <main className="min-h-screen">
        <CommonHero title={'Create account'} />

        <section className="py-30 lg:py-32.5">
          <div className="max-w-330 mx-auto px-4 container">
            <div className="flex items-center justify-center">
              <div className="md:w-[66%] lg:w-[50%] mx-auto p-[30px_20px] sm:p-[25px_50px] border border-[#e1e1e1] space-y-5 rounded-md bg-[#f5f5f5]">
                <h1 className="text-2xl font-semibold sm:text-4xl">
                  Create your account
                </h1>

                <p className="text-base font-normal">
                  Hey there! Ready to join the party? We just need a few details
                  from you to get started.
                </p>

                <RegisterForm />

                <div className="text-base font-normal text-center">
                  <p>
                    Already have an account?
                    <Link
                      to="/login"
                      className="pl-1 underline text-suxnix-primary"
                    >
                      Log In
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

export default Register;
