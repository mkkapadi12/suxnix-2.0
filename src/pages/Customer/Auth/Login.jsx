import React from 'react';

import CommonHero from '@/pages/components/CommonHero';
import LoginForm from './components/LoginForm';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <main className="min-h-screen">
        <CommonHero title={'Login'} />

        <section className="py-30 lg:py-32.5">
          <div className="max-w-330 mx-auto px-4 container">
            <div className="flex items-center justify-center">
              <div className="md:w-[66%] lg:w-[50%] mx-auto p-[30px_20px] sm:p-[25px_50px] border border-[#e1e1e1] space-y-5 rounded-md bg-[#f5f5f5]">
                <h1 className="text-2xl font-semibold sm:text-4xl">
                  Welcome Back!
                </h1>

                <p className="text-base font-normal">
                  Hey there! Ready to log in? Just enter your username and
                  password below and you'll be back in action in no time. Let's
                  go!
                </p>

                <LoginForm />

                <div className="text-base font-normal text-center">
                  <p>
                    Don't have an account?
                    <Link
                      to="/register"
                      className="pl-1 underline text-suxnix-primary"
                    >
                      Sign Up
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

export default Login;
