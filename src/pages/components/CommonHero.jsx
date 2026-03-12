import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CommonHero = ({ title }) => {
  return (
    <Wrapper className="pt-23 md:pt-23 lg:pt-28 relative">
      <div
        className="p-[150px_0px_120px] lg:p-[150px_0px_150px] breadcrumb-bg relative bg-position-[center_center] bg-cover bg-no-repeat z-1"
        style={{
          backgroundImage: `url("https://suxnix-dev.myshopify.com/cdn/shop/files/video_bg_fc243aec-f2b9-451a-87dd-84dc29514d83.jpg?v=1736693977")`,
        }}
      >
        <div className="container max-w-330 px-3 mx-auto">
          <div className="flex items-center justify-center w-full">
            <div className="space-y-6 text-center">
              <h1 className="text-5xl text-white! sm:text-6xl">{title}</h1>
              <div className="flex items-start justify-center gap-4 text-xl text-white sm:gap-3">
                <Link to="/">Home</Link>
                {'|'}
                <Link to="#">{title}</Link>
              </div>
            </div>
          </div>
        </div>
        {/* shapes */}
        <div className="absolute left-0 bottom-[-12%] z-3">
          <img
            src="https://suxnix-dev.myshopify.com/cdn/shop/files/video_shape01.png?v=1736696105"
            alt="shape 1"
          />
        </div>
        <div className="absolute right-0 bottom-[-7%] z-3">
          <img
            src="https://suxnix-dev.myshopify.com/cdn/shop/files/video_shape02.png?v=1736696110"
            alt="shape 2"
          />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .breadcrumb-bg:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: #090909;
    opacity: 0.85;
    z-index: -1;
  }

  .breadcrumb-bg:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    background-image: url('https://suxnix-dev.myshopify.com/cdn/shop/t/2/assets/testimonial_bottom_shape.png');
    width: 100%;
    height: 36px;
    background-repeat: repeat;
    background-position: center;
    z-index: 1;
  }
`;

export default CommonHero;
