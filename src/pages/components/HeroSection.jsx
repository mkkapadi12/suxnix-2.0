import ShopButton from '@/hooks/button/ShopButton';
import React from 'react';

const HeroSection = () => {
  return (
    <div className="">
      <section className="pt-37.5 lg:pt-42.5 relative">
        <div className="container mx-auto">
          {/* banner title */}
          <div className=" sm:mb-0 mb-13.75 flex flex-col items-center justify-center sm:max-w-xl lg:max-w-217.25 mx-auto text-center space-y-5  lg:space-y-7">
            <p className="font-semibold uppercase text-suxnix-primary">
              .. Increased Energy With SUXNIX ..
            </p>
            <h2 className="leading-tight! text-suxnix-heading text-5xl sm:text-6xl lg:text-7xl">
              Mix Protein Provided Way To Growth
            </h2>
            <div className="relative sm:top-7.5 lg:top-7.5 z-9">
              <ShopButton
                size="md"
                title="Shop Now"
                bgColor="#faa432"
                hoverColor="#16a34a"
              />
            </div>
          </div>
          <div className="flex w-full p-4 py-0 text-center sm:relative sm:block sm:px-0">
            <img
              src={
                'https://suxnix-dev.myshopify.com/cdn/shop/files/banner_img01_4dfc6924-a7d3-4e69-abc4-4e1199127900.png?v=1736613086&width=800'
              }
              alt=""
              className="sm:absolute sm:-bottom-3.75 left-0 sm:max-w-85 lg:max-w-137.5 mx-auto right-0"
            />
            <img
              src={
                'https://suxnix-dev.myshopify.com/cdn/shop/files/banner_round_bg_b113813b-23c3-450b-846b-d4d4d9541856.png?v=1736613043&width=1200'
              }
              alt=""
              className="hidden mx-auto sm:block"
            />
          </div>
        </div>
        <div className="absolute top-[24%] left-0 sm:block hidden">
          <img
            src="https://suxnix-dev.myshopify.com/cdn/shop/files/banner_shape01.png?v=1735621648&width=200"
            alt=""
          />
        </div>
        <div className="absolute top-[18%] right-0 z-[-1]">
          <img
            src="https://suxnix-dev.myshopify.com/cdn/shop/files/banner_shape02.png?v=1736613175&width=200"
            alt=""
          />
        </div>
        <div className="absolute lg:block hidden left-10 -bottom-3.75">
          <img
            src="https://suxnix-dev.myshopify.com/cdn/shop/files/banner_shape03.png?v=1736613185&width=200"
            alt=""
          />
        </div>
        <div className="absolute hidden lg:block right-10 -bottom-3.75">
          <img
            src="https://suxnix-dev.myshopify.com/cdn/shop/files/banner_shape04.png?v=1736613185&width=200"
            alt=""
          />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
