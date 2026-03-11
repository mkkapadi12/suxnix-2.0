import React from 'react';
import { featuresData } from '@/constants/home';
import styled from 'styled-components';

const Features = () => {
  return (
    <Wrapper>
      <section
        className="features-bg relative bg-cover bg-center p-[97px_0px] m-[37px_0px_44px]"
        style={{
          backgroundImage: `url("https://suxnix-dev.myshopify.com/cdn/shop/files/features_bg_8c0db956-8dd7-4361-930d-ee274ba05131.jpg?v=1736613695")`,
        }}
      >
        <div className="container mx-auto lg:max-w-330 lg:px-0 px-6">
          <div className="grid items-center justify-center grid-cols-1 gap-6 lg:gap-4 lg:grid-cols-2">
            <div className="grid order-2 gap-10 sm:grid-cols-2 lg:order-1">
              {featuresData.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="space-y-5 text-center sm:text-start"
                  >
                    <div className="flex items-center justify-center sm:justify-start">
                      <item.icon size={44} className="text-suxnix-primary" />
                    </div>
                    <h1 className="text-xl text-suxnix-white!">{item.title}</h1>
                    <p className="text-base text-suxnix-white">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center order-1 lg:justify-end lg:order-2">
              <img
                src="https://suxnix-dev.myshopify.com/cdn/shop/files/features_img_00ec7c4b-95e1-4661-b180-7c2bd4db7ebb.png?v=1736613975"
                alt="features 1"
              />
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .features-bg:before {
    content: '';
    position: absolute;
    left: 0;
    top: -41px;
    width: 100%;
    height: 41px;
    background-image: url('https://suxnix-dev.myshopify.com/cdn/shop/t/2/assets/features_shape01.png');
    background-repeat: repeat-x;
    background-position: center;
  }

  .features-bg:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -50px;
    width: 100%;
    height: 50px;
    background-image: url('https://suxnix-dev.myshopify.com/cdn/shop/t/2/assets/features_shape02.png');
    background-repeat: repeat-x;
    background-position: center;
  }
`;

export default Features;
