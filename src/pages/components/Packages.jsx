import { Card } from '@/components/ui/card';
import { pricingPlans } from '@/constants/home';
import React from 'react';
import { Link } from 'react-router-dom';

const Packages = () => {
  return (
    <div>
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container max-w-330 mx-auto px-4 space-y-8">
          {/* title */}
          <div className="flex flex-col items-center justify-center sm:max-w-xl lg:max-w-[869px] mx-auto text-center space-y-5  lg:space-y-5">
            <p className="font-bold uppercase text-suxnix-primary tracking-[.095em]">
              .. Suxnix Plans ..
            </p>
            <h2 className="leading-tight! text-suxnix-heading text-5xl sm:text-6xl lg:text-5xl">
              SUPPLEMENT PACKAGES
            </h2>
          </div>
          {/* Plans */}
          <div className="lg:p-[0px_50px]">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 sm:grid-cols-2">
              {pricingPlans.map((item) => {
                return (
                  <div key={item.id} className="flex flex-col gap-3">
                    <div className="text-lg text-center text-white! bg-suxnix-primary rounded-md p-2">
                      {item.highlight ? (
                        <h1 className="text-white!">{item.highlightText}</h1>
                      ) : (
                        <h2 className="opacity-0">No Value</h2>
                      )}
                    </div>
                    <Card
                      className="px-4 text-center transition-all duration-500 bg-white border-2 border-white py-7 hover:border-suxnix-primary"
                      key={item.id}
                    >
                      <div className="flex flex-col items-center justify-center gap-8">
                        <div className="space-y-1">
                          <h3 className="text-2xl tracking-wider">
                            {item.title}
                          </h3>
                          <h1 className="text-4xl font-semibold">
                            {item.brand}
                          </h1>
                          <p className="text-lg font-medium text-suxnix-heading">
                            {item.subtitle}
                          </p>
                        </div>
                        <div className="">
                          <div className="w-[80%] lg:max-w-[80%] mx-auto">
                            <img
                              src={item.image}
                              alt={item.id}
                              className="w-full h-full"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-center gap-2 font-medium text-start">
                            <h1 className="text-5xl lg:text-5xl">
                              ${item.pricePerBottle}
                            </h1>
                            <p className="text-base">
                              Per <br /> Bottle
                            </p>
                          </div>
                          <p className="text-lg font-bold text-suxnix-body">
                            (${item.totalPrice} TOTAL)
                          </p>
                          <h1 className="text-3xl font-bold text-suxnix-primary">
                            save {item.savePercent}%
                          </h1> 
                          <p className="text-xl font-semibold tracking-wide text-suxnix-primary">
                            + {item.shipping}
                          </p>
                        </div>
                        <div className="flex w-full">
                          <Link className="transition-all w-full md:w-[85%] mx-auto duration-300 gap-0 p-[8px_10px] md:p-[7px_12px] text-white! border-2 rounded-md bg-suxnix-primary hover:bg-suxnix-white hover:text-suxnix-primary! border-suxnix-primary">
                            <p className="text-2xl font-semibold uppercase lg:text-2xl">
                              Buy Now
                            </p>
                            <p className="text-[12px] lg:text-[12px] uppercase text-medium">
                              365 day full money back guranteed
                            </p>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Packages;
