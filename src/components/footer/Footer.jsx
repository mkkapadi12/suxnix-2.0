import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/logo/white_logo.png';
import { Link } from 'react-router-dom';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import { Card, CardContent } from '../ui/card';
import { PAGE_ICONS } from '@/lib/icons/page.icons';
import {
  aboutUsLinks,
  instagramPosts,
  supportLinks,
} from '@/constants/footerData';

const Footer = () => {
  return (
    <Wrapper className="">
      {/* footer instagram */}
      <div className="relative z-3 m-[0px_0px_-95px] footer-instagram">
        <div className="container px-4 md:max-w-240 lg:max-w-330 mx-auto sm:px-3">
          <Carousel
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
            opts={{
              align: 'start',
            }}
            className="w-full max-w-full"
          >
            <CarouselContent>
              {instagramPosts.map((post) => (
                <CarouselItem
                  key={post.id}
                  className="basis-1/2 sm:basis-1/3 md:basis-[20%] lg:basis-[20%]"
                >
                  <div className="p-0">
                    <Card className="sm:w-52.75 lg:w-65.75 sm:h-52.75 lg:h-62.5 shadow-none rounded-none border-none p-0!">
                      <CardContent
                        className={`p-0 sm:w-52.75 lg:w-65.75 sm:h-52.75 lg:h-62.5 footer-insta-item relative overflow-hidden cursor-pointer`}
                      >
                        <img
                          src={post.image}
                          alt={post.id}
                          className="w-full h-full"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      {/* footer top wrap */}
      <div className="footer-top-wrap p-[195px_0px_30px] relative z-1 bg-[#0a0a0a]">
        <div className="container mx-auto md:max-w-240 lg:max-w-330 px-4">
          <div className="flex flex-wrap justify-between gap-y-8 md:flex-row">
            {/* content */}
            <div className="w-full sm:w-[50%] md:w-[33%] md:px-4 space-y-7">
              {/* logo */}
              <div className="w-[45%]">
                <img src={logo} alt="logo" />
              </div>
              <div className="md:w-[90%] lg:w-[77%]">
                <p className="opacity-[.7] text-white text-base/7">
                  Making beauty especially relating complot especial common
                  questions tend to recur through posts or queries standards
                  vary orem donor command tei.
                </p>
              </div>
              <div className="flex w-full gap-4">
                <div className="p-3 rounded-full bg-[#1b1b1b] text-white cursor-pointer flex items-center justify-center hover:text-suxnix-secondary! transition-all duration-300">
                  <PAGE_ICONS.INSTAGRAM className="w-5 h-5" />
                </div>
                <div className="p-3 rounded-full bg-[#1b1b1b] text-white cursor-pointer flex items-center justify-center hover:text-suxnix-secondary! transition-all duration-300">
                  <PAGE_ICONS.FACEBOOK className="w-5 h-5" />
                </div>
                <div className="p-3 rounded-full bg-[#1b1b1b] text-white cursor-pointer flex items-center justify-center hover:text-suxnix-secondary! transition-all duration-300">
                  <PAGE_ICONS.YOUTUBE className="w-5 h-5" />
                </div>
                <div className="p-3 rounded-full bg-[#1b1b1b] text-white cursor-pointer flex items-center justify-center hover:text-suxnix-secondary! transition-all duration-300">
                  <PAGE_ICONS.LINKEDIN className="w-5 h-5" />
                </div>
              </div>
            </div>
            <div className="w-full sm:w-[41%] md:w-[16%] md:px-4">
              <h3 className="mb-5 font-medium text-white! text-xl/7">
                About us
              </h3>
              <ul className="space-y-4 text-base font-medium text-white opacity-[.7]">
                {aboutUsLinks.map((item, index) => (
                  <li
                    key={index}
                    className="transition-all duration-300 hover:text-suxnix-secondary"
                  >
                    <Link to={item.path}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full sm:w-[41%] md:w-[16%] md:px-4">
              <h3 className="mb-5 font-medium text-white! text-xl/7">
                Support
              </h3>
              <ul className="space-y-4 text-base font-medium text-white opacity-[.7]">
                {supportLinks.map((item, index) => (
                  <li
                    key={index}
                    className="transition-all duration-300 hover:text-suxnix-secondary"
                  >
                    <Link to={item.path}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full sm:w-[41%] md:w-[33%] md:px-4 lg:pl-17.5 space-y-5">
              <h3 className="mb-5 font-medium text-white! text-xl/7">
                Contact us
              </h3>
              <p className="opacity-[.7] text-white text-base/7">
                4140 Parker Rd. Allentown, New Mexico 31134
              </p>
              <div>
                <ul className="space-y-4">
                  <li className="flex gap-2 font-medium text-white">
                    <PAGE_ICONS.PHONE className="w-5 h-5 text-suxnix-secondary" />

                    <span>+1 (555) 000-0000</span>
                  </li>
                  <li className="flex gap-2 font-medium text-white">
                    <PAGE_ICONS.MAIL className="w-5 h-5 text-suxnix-secondary" />
                    <span>Suxnix@example.com </span>
                  </li>
                  <li className="flex gap-2 font-medium text-white">
                    <PAGE_ICONS.BROWSER className="w-5 h-5 text-suxnix-secondary" />
                    <span>www.suxnixdomain.com</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* shapes */}
        <div className="absolute left-0 bottom-25 -z-1">
          <img
            src="https://suxnix-dev.myshopify.com/cdn/shop/files/footer_shape01_37052e5f-b0c1-4b24-a968-ab1bf6162c54.png?v=1737133750"
            alt="shape 1"
          />
        </div>
        <div className="absolute right-0 bottom-43 -z-1]">
          <img
            src="https://suxnix-dev.myshopify.com/cdn/shop/files/footer_shape02_6c27ba26-cc9a-421c-ac37-46af9a3a907a.png?v=1737133750"
            alt="shape 2"
          />
        </div>
      </div>
      {/* copyright */}
      <div className="py-6.25 border-t border-[#262626] bg-[#0a0a0a]">
        <div className="container mx-auto md:max-w-240 lg:max-w-330 px-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-y-4">
            {/* copyright text */}
            <div className="font-normal text-white sm:px-4">
              <p>Copyright © 2025 Suxnix All Rights Reserved.</p>
            </div>
            <div className="sm:px-4">
              <img
                src="https://suxnix-dev.myshopify.com/cdn/shop/files/card_img_7d7d11a3-0daa-4469-956c-846a4c9b8acf.png?v=1737133834"
                alt="payments"
              />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.footer`
  .footer-top-wrap:before {
    content: '';
    position: absolute;
    left: 0;
    top: -22px;
    width: 100%;
    height: 53px;
    background-image: url('https://suxnix-dev.myshopify.com/cdn/shop/t/2/assets/footer_bg_shape.png');
    background-repeat: repeat;
    background-position: center;
    z-index: -1;
  }

  .footer-insta-item:hover:before {
    opacity: 0.8;
  }

  .footer-insta-item:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #0d9b4d;
    opacity: 0;
    transition: all 0.3s ease-out 0s;
  }

  .footer-insta-item:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'><path d='M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7Zm5.25-.75a1 1 0 1 1 0 2a1 1 0 0 1 0-2Z'/></svg>");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    opacity: 0;
    transition: all 0.3s ease-out;
  }

  .footer-insta-item:hover:after {
    opacity: 1;
  }
`;

export default Footer;
