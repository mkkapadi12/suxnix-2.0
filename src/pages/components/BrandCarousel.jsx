import React, { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { brandData } from '@/constants/home';
import Autoplay from 'embla-carousel-autoplay';

const BrandCarousel = () => {
  const plugin = useRef(Autoplay({ delay: 1000, stopOnInteraction: true }));

  return (
    <div>
      <section className="p-[95px_0px_100px] lg:p-[110px_0px_120px]">
        <div className="container mx-auto space-y-10">
          {/* text */}
          <div className="text-center sm:p-0 p-[0px_75px]">
            <p className="text-base sm:text-lg font-medium tracking-[.095em] uppercase text-suxnix-heading">
              Perfect Brand is Featured on
            </p>
          </div>
          {/* company carousel */}
          <Carousel
            plugins={[plugin.current]}
            className="w-full mx-auto max-w-325 xl:px-0 px-3"
            onMouseEnter={plugin.current.stop}
            // onMouseLeave={plugin.current.reset}
            options={{ loop: false }}
          >
            <CarouselContent>
              {brandData.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="basis-[45%] sm:basis-[25%] lg:basis-[20%] pl-4"
                >
                  <div className="p-1">
                    <Card className="transition-all border-none shadow-none cursor-pointer hover:-translate-y-2">
                      <CardContent className="flex items-center justify-center w-full p-3 sm:w-full lg:w-full">
                        <img src={item.img} alt="brand" />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>
    </div>
  );
};

export default BrandCarousel;
