import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import CommonHero from './components/CommonHero';
import { PAGE_ICONS } from '@/lib/icons/page.icons';
import ShopButton from '@/hooks/button/ShopButton';

const Contact = () => {
  return (
    <div>
      <main className="min-h-screen">
        <CommonHero title={'Contact Us'} />
        <div>
          <section className="pb-30">
            <div className="max-w-full sm:max-w-180 md:max-w-240 xl:max-w-330 mx-auto px-4 container">
              {/* Address & Contact */}
              <div className="p-[120px_0px_90px]">
                <div className="flex flex-row flex-wrap items-center justify-between">
                  <div className="px-3 sm:w-[33%]">
                    <div className="p-[40px_30px] text-center space-y-4">
                      {/* icon */}
                      <div className="flex items-center justify-center">
                        <PAGE_ICONS.MAP className="w-16 h-16 md:w-24 md:h-24 text-suxnix-secondary" />
                      </div>
                      <h1 className="text-3xl font-medium">office address</h1>
                      <div className="text-base font-medium text-center">
                        <p>99 NY Address Street, Brooklyn, United State</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 sm:w-[33%]">
                    <div className="p-[40px_30px] text-center space-y-4">
                      {/* icon */}
                      <div className="flex items-center justify-center">
                        <PAGE_ICONS.PHONE className="w-16 h-16 md:h-24 md:w-24 text-suxnix-secondary" />
                      </div>
                      <h1 className="text-3xl font-medium">Phone Number</h1>
                      <div className="text-base font-medium text-center">
                        <p>875 7556 464 7658</p>
                        <p>765 648 567 98</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 sm:w-[33%]">
                    <div className="p-[40px_30px] text-center space-y-4">
                      {/* icon */}
                      <div className="flex items-center justify-center">
                        <PAGE_ICONS.BROWSER className="w-16 h-16 md:h-24 md:w-24 text-suxnix-secondary" />
                      </div>
                      <h1 className="text-3xl font-medium">Web Connect</h1>
                      <div className="text-base font-medium text-center">
                        <p>suxnixexample.com</p>
                        <p>info@suxnixmail.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col items-center justify-between gap-10 xl:items-start xl:flex-row xl:gap-0">
                  {/* map */}
                  <div className="w-full h-[60vh] xl:h-[95vh] xl:w-[50%] px-3">
                    <div className="w-full h-full">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d89449.44196293506!2d-74.02835507193313!3d40.70268485407642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25bae694479a3%3A0xb9949385da52e69e!2sBarclays%20Center!5e0!3m2!1sen!2sin!4v1771503825661!5m2!1sen!2sin"
                        allowFullScreen=""
                        loading="lazy"
                        className="w-full h-full"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                  {/* contact form */}
                  <div className="w-full xl:w-[50%] px-3">
                    <div className="xl:pl-7.5 space-y-7">
                      {/* title */}
                      <div className="space-y-5 text-center xl:text-start">
                        <p className="text-base font-medium uppercase text-suxnix-primary">
                          .. request make ..
                        </p>
                        <h1 className="text-3xl md:text-4xl xl:text-5xl leading-tight!">
                          Asked Anything You Want To Know
                        </h1>
                      </div>
                      <div>
                        <form action="">
                          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            {/*  name*/}
                            <div className="col-span-2 px-2 space-y-2 md:col-span-1">
                              <Label
                                htmlFor="username"
                                className="text-base text-suxnix-heading"
                              >
                                Name
                              </Label>
                              <Input
                                type="text"
                                name="username"
                                id="username"
                                className="text-base! font-normal rounded-sm text-suxnix-heading p-7"
                                placeholder="Enter here"
                                required
                              />
                            </div>
                            {/* email */}
                            <div className="col-span-2 px-2 space-y-2 md:col-span-1">
                              <Label
                                htmlFor="email"
                                className="text-base text-suxnix-heading"
                              >
                                Email
                              </Label>
                              <Input
                                type="email"
                                name="email"
                                id="email"
                                className="text-base! font-normal rounded-sm text-suxnix-heading p-7"
                                placeholder="Enter here"
                                required
                              />
                            </div>
                            {/* Select Subject */}
                            <div className="col-span-2 px-2 md:col-span-2">
                              <Select className="">
                                <SelectTrigger className="w-full max-w-full p-7">
                                  <SelectValue placeholder="Select Subject" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup className="text-base! font-normal rounded-sm text-suxnix-heading">
                                    {/* <SelectLabel>Select Subject</SelectLabel> */}
                                    <SelectItem value="apple">
                                      Delivery & Orders
                                    </SelectItem>
                                    <SelectItem value="banana">
                                      Diet & Exceries
                                    </SelectItem>
                                    <SelectItem value="blueberry">
                                      Marketing & Press
                                    </SelectItem>
                                    <SelectItem value="grapes">
                                      Share your Success
                                    </SelectItem>
                                    <SelectItem value="pineapple">
                                      Wholesale And Returns
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                            {/* message */}
                            <div className="col-span-2 px-2 space-y-2">
                              <Label
                                htmlFor="message"
                                className="text-base text-suxnix-heading"
                              >
                                Message
                              </Label>
                              <Textarea
                                name="message"
                                id="message"
                                rows={5}
                                className="text-base! font-normal rounded-sm text-suxnix-heading p-7"
                                placeholder="Enter here"
                                required
                              />
                            </div>
                            {/* button submit */}
                            <div className="flex items-center justify-center col-span-2 xl:justify-start xl:col-span-1">
                              <div className="">
                                <ShopButton
                                  title={'Make Request'}
                                  path={'/'}
                                  size="md"
                                  type="submit"
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Contact;
