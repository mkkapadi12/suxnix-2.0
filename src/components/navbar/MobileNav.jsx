import {
  homenavigation,
  newsnavigation,
  shopnavigation,
} from '@/constants/navbar';
import { PAGE_ICONS } from '@/lib/icons/page.icons';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo/logo.png';

const MobileNav = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <Dialog
      open={mobileMenuOpen}
      onClose={setMobileMenuOpen}
      className="lg:hidden"
    >
      <div className="fixed inset-0 z-99 bg-black opacity-[.6]! visible" />
      <DialogPanel className="fixed inset-y-0 right-0 w-full p-6 overflow-y-auto bg-white z-99 max-w-74 sm:max-w-76 sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img alt="" src={logo} className="w-auto h-12" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Close menu</span>
            <PAGE_ICONS.XMARK aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="flow-root mt-6">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="py-6 space-y-0">
              <Disclosure as="div" className="-mx-3">
                <DisclosureButton className="group border-y flex w-full items-center justify-between py-2 pl-3 pr-3.5 text-base/7 font-medium text-gray-900 hover:bg-gray-50">
                  Home
                  <PAGE_ICONS.DOWN
                    aria-hidden="true"
                    className="flex-none size-5 group-data-open:rotate-180"
                  />
                </DisclosureButton>
                <DisclosurePanel className="mt-2 space-y-2">
                  {homenavigation.map((item) => (
                    <DisclosureButton
                      key={item.id}
                      className="block w-full py-2 pl-6 pr-3 font-medium text-left text-gray-900 border-b-2 text-sm/7 hover:bg-gray-50"
                    >
                      <Link to={item.path}>{item.name}</Link>
                    </DisclosureButton>
                  ))}
                </DisclosurePanel>
              </Disclosure>
              <Link
                to="/"
                className="block px-3 py-2 -mx-3 font-medium text-gray-900 border-b text-base/7 hover:bg-gray-50"
              >
                Features
              </Link>
              <Link
                to="/"
                className="block px-3 py-2 -mx-3 font-medium text-gray-900 border-b text-base/7 hover:bg-gray-50"
              >
                Product
              </Link>
              <Link
                to="/"
                className="block px-3 py-2 -mx-3 font-medium text-gray-900 border-b text-base/7 hover:bg-gray-50"
              >
                Ingredients
              </Link>
              <Link
                to="/"
                className="block px-3 py-2 -mx-3 font-medium text-gray-900 border-b text-base/7 hover:bg-gray-50"
              >
                Pricing
              </Link>
              <Disclosure as="div" className="-mx-3">
                <DisclosureButton className="group border-b flex w-full items-center justify-between py-2 pl-3 pr-3.5 text-base/7 font-medium text-gray-900 hover:bg-gray-50">
                  Shop
                  <PAGE_ICONS.DOWN
                    aria-hidden="true"
                    className="flex-none size-5 group-data-open:rotate-180"
                  />
                </DisclosureButton>
                <DisclosurePanel className="mt-2">
                  {shopnavigation.map((item) => (
                    <DisclosureButton
                      key={item.id}
                      className="block w-full py-2 pl-6 pr-3 font-medium text-left text-gray-900 border-b-2 text-sm/7 hover:bg-gray-50"
                    >
                      <Link to={item.path}>{item.name}</Link>
                    </DisclosureButton>
                  ))}
                </DisclosurePanel>
              </Disclosure>
              <Disclosure as="div" className="-mx-3">
                <DisclosureButton className="group border-b flex w-full items-center justify-between py-2 pl-3 pr-3.5 text-base/7 font-medium text-gray-900 hover:bg-gray-50">
                  News
                  <PAGE_ICONS.DOWN
                    aria-hidden="true"
                    className="flex-none size-5 group-data-open:rotate-180"
                  />
                </DisclosureButton>
                <DisclosurePanel className="mt-2">
                  {newsnavigation.map((item) => (
                    <DisclosureButton
                      key={item.id}
                      className="block w-full py-2 pl-6 pr-3 font-medium text-left text-gray-900 border-b-2 text-sm/7 hover:bg-gray-50"
                    >
                      <Link to={item.path}>{item.name}</Link>
                    </DisclosureButton>
                  ))}
                </DisclosurePanel>
              </Disclosure>
              <Link
                to="/contact"
                className="block px-3 py-2 -mx-3 font-medium text-gray-900 border-b text-base/7 hover:bg-gray-50"
              >
                Contacts
              </Link>
            </div>
            {/* <Link
                to="/login"
                className="-mx-3 block border-y  px-3 py-2.5 text-base/7 font-medium text-gray-900 hover:bg-gray-50"
              >
                Log in
              </Link> */}
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default MobileNav;
