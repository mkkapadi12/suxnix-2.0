import { benefitsData } from '@/constants/home';
import React from 'react';

const Ingredients = () => {
  return (
    <div>
      <section className="relative p-[97px_0px] m-[37px_0px_44px]">
        <div className="container mx-auto lg:max-w-[1320px] lg:px-4 px-4">
          <div className="flex flex-col items-center justify-center gap-10 lg:gap-4 lg:flex-row">
            {/* image */}
            <div className="ingredients-img flex items-center justify-center lg:justify-start w-[75%] sm:w-[50%] sm:mx-[60px] lg:mr-[60px] lg:ml-0 lg:w-[41%] relative">
              <img
                src="https://suxnix-dev.myshopify.com/cdn/shop/files/ingredients_img_935aff4a-681c-4796-b32f-2c04b1334309.png?v=1737135850"
                alt="Ingredients"
                className="lg:mr-[80px]"
              />
              <img
                src="https://suxnix-dev.myshopify.com/cdn/shop/files/ingredients_shape_3fd21533-6d88-4ac8-af2f-415082b53a2c.png?v=1737135925"
                alt=""
                className="absolute max-w-[180px] sm:max-w-full bottom-[20px] left-[-55px] sm:left-[-125px] z-[-9]"
              />
            </div>
            {/* Content */}
            <div className="lg:w-[58%] space-y-10 lg:space-y-8">
              <div className="space-y-3 text-center lg:text-start">
                <p className="font-semibold uppercase text-suxnix-primary">
                  .. Increased Energy With SUXNIX ..
                </p>
                <h2
                  className={`leading-tight! text-suxnix-heading text-4xl sm:text-5xl`}
                >
                  Suxnix Ingredients
                </h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {benefitsData.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="space-y-5 text-center lg:text-start"
                    >
                      <div className="flex items-center justify-center lg:justify-start">
                        <img src={item.image} alt={item.id} />
                      </div>
                      <h1
                        className={`text-xl relative inline-block pl-[11px] before:left-0 before:content-[""] before:w-[3px] before:h-[18px] before:bg-suxnix-primary before:absolute before:top-[6px]`}
                      >
                        {item.title}
                      </h1>
                      <p className="text-base">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ingredients;
