import ShopButton from '@/hooks/button/ShopButton';
import React from 'react';
import styled from 'styled-components';

const ProductHightlight = () => {
  return (
    <Wrapper>
      <section className="py-14 lg:py-16">
        <div className="container mx-auto md:max-w-300 lg:px-0 px-4 space-y-10 sm:space-y-6">
          {/* 1 highlight */}
          <div>
            <div className="grid items-center justify-between grid-cols-1 gap-5 md:grid-cols-2">
              {/* Image */}
              <div className="relative flex items-center justify-center w-full mb-8 features-products before:left-0 sm:before:left-[38%] p-4">
                <div>
                  <img
                    src="https://suxnix-dev.myshopify.com/cdn/shop/files/features_product01.png?v=1736660782"
                    alt="hightlight 1"
                    className="h-87.5 lg:h-86.25 mb-10"
                  />
                </div>
              </div>
              {/* Content */}
              <div>
                <div className="md:w-[80%] md:text-start text-center mx-auto md:mx-0">
                  <div className="mb-16">
                    <h1 className="text-5xl transition-all duration-500 cursor-pointer hover:text-suxnix-primary!">
                      Seriour Mass
                    </h1>
                  </div>
                  <div className="space-y-6 md:space-y-4">
                    <p className="font-medium text-suxnix-heading">
                      High-strength, 5000IU
                    </p>
                    <p>
                      Vitamin D3 supplements are commonly recommended for people
                      at risk for vitamin D deficiency. Low vitamin D levels
                      cause depression, fatigue, and muscle weakness.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-10 md:justify-start">
                      <div>
                        <ShopButton size={'md'} path={''} title={'Shop Now'} />
                      </div>
                      <div className="flex items-end gap-4">
                        <h1 className="text-3xl font-bold">$89.99</h1>
                        <h2 className="text-xl font-semibold text-suxnix-primary!">
                          $117.99
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 2 highlight */}
          <div className="">
            <div className="grid items-center justify-between grid-cols-1 gap-5 md:grid-cols-2">
              {/* Image */}
              <div className="oreder-1 sm:order-2 relative flex items-center justify-center w-full mb-8 features-products before:left-0 lg:before:left-[38%] p-4">
                <div>
                  <img
                    src="https://suxnix-dev.myshopify.com/cdn/shop/files/features_product02.png?v=1736661941"
                    alt="hightlight 1"
                    className="h-87.5 86.25 mb-10"
                  />
                </div>
              </div>
              {/* Content */}
              <div className="flex justify-end oreder-2 sm:order-1">
                <div className="md:w-[80%] md:text-start text-center mx-auto md:mx-0">
                  <div className="mb-16">
                    <h1 className="text-5xl transition-all duration-500 cursor-pointer hover:text-suxnix-primary!">
                      Protein Whey
                    </h1>
                  </div>
                  <div className="space-y-6 md:space-y-4">
                    <p className="font-medium text-suxnix-heading">
                      High-strength, 4000IU
                    </p>
                    <p>
                      Vitamin D3 supplements are commonly recommended for people
                      at risk for vitamin D deficiency. Low vitamin D levels
                      cause depression, fatigue, and muscle weakness.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-10 md:justify-start">
                      <div>
                        <ShopButton size={'md'} title={'Shop Now'} path={''} />
                      </div>
                      <div className="flex items-end gap-4">
                        <h1 className="text-3xl font-bold">$59.99</h1>
                        <h2 className="text-xl font-semibold text-suxnix-primary!">
                          $79.99
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 3 highlight */}
          <div className="">
            <div className="grid items-center justify-between grid-cols-1 gap-5 md:grid-cols-2">
              {/* Image */}
              <div className="relative flex items-center justify-center w-full mb-8 features-products before:left-0 sm:before:left-[38%] p-4">
                <div>
                  <img
                    src="https://suxnix-dev.myshopify.com/cdn/shop/files/features_product03.png?v=1736661972"
                    alt="hightlight 1"
                    className="h-87.5 86.25 mb-10"
                  />
                </div>
              </div>
              {/* Content */}
              <div>
                <div className="md:w-[80%] md:text-start text-center mx-auto md:mx-0">
                  <div className="mb-16">
                    <h1 className="text-5xl transition-all duration-500 cursor-pointer hover:text-suxnix-primary!">
                      Max Mass 3xl
                    </h1>
                  </div>
                  <div className="space-y-6 md:space-y-4">
                    <p className="font-medium text-suxnix-heading">
                      High-strength, 4000IU
                    </p>
                    <p>
                      Vitamin D3 supplements are commonly recommended for people
                      at risk for vitamin D deficiency. Low vitamin D levels
                      cause depression, fatigue, and muscle weakness.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-10 md:justify-start">
                      <div>
                        <ShopButton size={'md'} path={''} title={'Shop Now'} />
                      </div>
                      <div className="flex items-end gap-4">
                        <h1 className="text-3xl font-bold">$69.99</h1>
                        <h2 className="text-xl font-semibold text-suxnix-primary!">
                          $89.99
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .features-products:before {
    content: '';
    position: absolute;
    /* left: 38%; */
    top: 50%;
    background-image: url('https://suxnix-dev.myshopify.com/cdn/shop/t/2/assets/features_product_dots.png');
    width: 706px;
    height: 706px;
    z-index: -1;
    background-repeat: no-repeat;
    background-size: contain;
    transform: translate(-50%, -50%);
  }
`;

export default ProductHightlight;
