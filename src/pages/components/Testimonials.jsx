import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { testimonials } from '@/constants/home';
import { PAGE_ICONS } from '@/lib/icons/page.icons';
import React from 'react';
import styled from 'styled-components';

const Testimonials = () => {
  return (
    <Wrapper>
      <section
        className="testimonial-bg relative z-1 bg-cover bg-center p-25 sm:m-[37px_0px_44px] flex items-center justify-center"
        style={{
          backgroundImage: `url("https://suxnix-dev.myshopify.com/cdn/shop/files/testimonial_bg.jpg?v=1739554820")`,
        }}
      >
        <div className="absolute bg-[#090909] opacity-[0.8] z-[-1] top-0 left-0 w-full h-full"></div>
        <div className="container mx-auto lg:max-w-[1320px] lg:px-4 sm:px-6 px-3">
          <div className="flex">
            <Carousel className="w-full sm:max-w-[66%] mx-auto">
              <CarouselContent>
                {testimonials.map((item) => (
                  <CarouselItem key={item.id} className="">
                    <div className="p-1">
                      <Card className="border-none bg-transparent">
                        <CardContent className="flex flex-col items-center justify-center p-3 space-y-8 md:p-6">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: item.rating }).map(
                              (_, index) => (
                                <PAGE_ICONS.STAR
                                  key={index}
                                  className="text-suxnix-primary"
                                />
                              ),
                            )}
                          </div>
                          <div>
                            <p className="italic font-medium text-center text-white text-xl/8">
                              {item.description}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-center">
                              <img
                                src={item.avatar}
                                alt={item.name}
                                className="w-[80px] h-[80px] rounded-full"
                              />
                            </div>
                            <h3 className="text-lg font-semibold text-white">
                              {item.name}
                            </h3>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="sm:block bg-transparent! hidden absolute w-12 h-12 border-none rounded-none slick-arrow z-2 before:bg-suxnix-secondary! before:left-[-15px] text-white!" />
              <CarouselNext className="sm:block bg-transparent! hidden absolute w-12 h-12 border-none rounded-none before:bg-suxnix-secondary! slick-arrow before:right-0 text-white!" />
            </Carousel>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .testimonial-bg:before {
    content: '';
    position: absolute;
    left: 0;
    top: -10px;
    background-image: url('https://suxnix-dev.myshopify.com/cdn/shop/t/2/assets/testimonial_top_shape.png');
    width: 100%;
    height: 33px;
    background-repeat: repeat;
    background-position: center;
  }

  .testimonial-bg:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -9px;
    background-image: url('https://suxnix-dev.myshopify.com/cdn/shop/t/2/assets/testimonial_bottom_shape.png');
    width: 100%;
    height: 37px;
    background-repeat: repeat;
    background-position: center;
  }

  .slick-arrow:before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 55px;
    height: 55px;
    opacity: 0.3;
    border-radius: 50%;
    transition: all 0.3s ease-out 0s;
    z-index: -1;
  }
`;
export default Testimonials;
