import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/logo/logo.png';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { PAGE_ICONS } from '@/lib/icons/page.icons';
import DesktopNav from './Desktopnav';
import MobileNav from './MobileNav';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '@/Store/features/auth/auth.slice';
import UserMenu from './UserMenu';

export default function Navbar() {
  const { user } = useSelector((state) => state.user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  console.log(user);

  return (
    <header
      className={`fixed left-0 top-0 z-9 w-full px-5 sm:px-0 ${
        scrolled
          ? 'transition-all py-3 lg:py-0 m-auto duration-500 bg-white animate-[1s_ease-in-out_0s_normal_none_1_running_fadeInDown] shadow-[0_10px_15px_#1919191a]'
          : 'py-4 lg:py-2 duration-500 bg-transparent'
      }`}
    >
      <div className="mx-auto sm:px-10 lg:px-0">
        <nav
          aria-label="Global"
          className={`flex items-center justify-between max-w-full w-full lg:py-5 mx-auto lg:px-6`}
        >
          <div className="flex">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="" src={logo} className="w-auto h-14" />
            </Link>
          </div>

          <DesktopNav />

          <div className="flex items-center justify-end sm:gap-10">
            {/* Cart */}
            {/* <div className="hidden text-suxnix-heading sm:block cursor-pointer">
              <PAGE_ICONS.CART size={24} className="w-8 h-8" />
            </div> */}

            {/* User Menu / Login */}
            <div className="hidden sm:block">
              <UserMenu />
            </div>

            {/* Mobile Menu */}
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
              >
                <span className="sr-only">Open main menu</span>

                <div className="p-4 text-white rounded-full bg-suxnix-secondary">
                  <PAGE_ICONS.GRID size={24} />
                </div>
              </button>
            </div>
            <Drawer direction="right">
              {!user && (
                <DrawerTrigger asChild className="hidden lg:flex">
                  <div className="p-4 text-white transition bg-suxnix-secondary rounded-full cursor-pointer hover:bg-green-700">
                    <PAGE_ICONS.GRID size={24} />
                  </div>
                </DrawerTrigger>
              )}

              <DrawerContent className="flex flex-col h-full max-w-md ml-auto bg-white border-l shadow-2xl">
                <DrawerTitle className="sr-only" />

                {/* Header */}
                <DrawerHeader className="flex flex-row items-center justify-between px-8 py-6 border-b">
                  <h2 className="text-xl font-semibold text-suxnix-heading">
                    About Us
                  </h2>

                  <DrawerClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-gray-100"
                    >
                      <PAGE_ICONS.XMARK className="w-5 h-5" />
                    </Button>
                  </DrawerClose>
                </DrawerHeader>

                {/* Body */}
                <div className="flex flex-col flex-1 px-8 py-8 space-y-6 overflow-y-auto">
                  <h3 className="text-3xl font-semibold leading-tight uppercase text-suxnix-heading">
                    Getting all of the{' '}
                    <span className="text-suxnix-secondary">Nutrients</span> you
                    need simply cannot be done without supplements.
                  </h3>

                  <p className="text-base leading-relaxed text-gray-600">
                    Nam libero tempore, cum soluta nobis eligendi cumque quod
                    placeat facere possimus assumenda omnis dolor repellendu
                    sautem temporibus officiis.
                  </p>

                  <div className="pt-6 mt-auto border-t">
                    <div className="space-y-2">
                      <h4 className="text-2xl font-semibold text-suxnix-heading">
                        +1 599 162 4545
                      </h4>
                      <h4 className="text-lg font-medium text-gray-700">
                        info@example.com
                      </h4>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-gray-500">
                      5689 Lotaso Terrace, Culver City, CA, United States
                    </p>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </nav>
      </div>

      {/* mobile menu */}
      <MobileNav
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
    </header>
  );
}
