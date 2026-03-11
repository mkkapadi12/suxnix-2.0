import { PAGE_ICONS } from '@/lib/icons/page.icons';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Video = () => {
  return (
    <Wrapper>
      <section
        className="video-bg relative z-1 bg-cover bg-center p-[100px_0px] sm:m-[37px_0px_44px] min-h-150 lg:min-h-175 flex items-center justify-center"
        style={{
          backgroundImage: `url("https://suxnix-dev.myshopify.com/cdn/shop/files/video_bg_8112a5ce-2dd0-45f9-ac62-fd4d1b132944.jpg?v=1737135174")`,
        }}
      >
        <div className="absolute bg-[#090909] opacity-[0.8] z-[-1] top-0 left-0 w-full h-full"></div>
        <div className="container mx-auto lg:max-w-330 lg:px-4 sm:px-6 px-3">
          <div className="flex items-center justify-center">
            <Link
              to="https://www.youtube.com/watch?v=HQfF5XRVXjU"
              target="_blank"
              className="w-33 h-33 flex items-center justify-center ripple-white rounded-full bg-suxnix-secondary"
            >
              <PAGE_ICONS.PLAY className="text-suxnix-white z-999 w-8 h-8 fill-suxnix-white" />
            </Link>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .video-bg:before {
    content: '';
    position: absolute;
    left: 0;
    top: -6px;
    background-image: url('https://suxnix-dev.myshopify.com/cdn/shop/t/2/assets/video_top_mask.png');
    width: 100%;
    height: 46px;
    background-repeat: repeat;
    background-position: center;
    z-index: 1;
  }

  .video-bg:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    background-image: url('https://suxnix-dev.myshopify.com/cdn/shop/t/2/assets/video_bottom_mask.png');
    width: 100%;
    height: 36px;
    background-repeat: repeat;
    background-position: center;
    z-index: 1;
  }

  @keyframes ripple-white {
    0% {
      -webkit-box-shadow:
        0 0 0 0 rgba(13, 155, 77, 0.3),
        0 0 0 10px rgba(13, 155, 77, 0.3),
        0 0 0 20px rgba(13, 155, 77, 0.3);
      box-shadow:
        0 0 0 0 rgba(13, 155, 77, 0.3),
        0 0 0 10px rgba(13, 155, 77, 0.3),
        0 0 0 20px rgba(13, 155, 77, 0.3);
    }
    100% {
      -webkit-box-shadow:
        0 0 0 10px rgba(13, 155, 77, 0.3),
        0 0 0 20px rgba(13, 155, 77, 0.3),
        0 0 0 30px rgba(255, 255, 255, 0);
      box-shadow:
        0 0 0 10px rgba(13, 155, 77, 0.3),
        0 0 0 20px rgba(13, 155, 77, 0.3),
        0 0 0 30px rgba(255, 255, 255, 0);
    }
  }

  .ripple-white {
    animation: ripple-white 1s linear infinite;
  }
`;

export default Video;
