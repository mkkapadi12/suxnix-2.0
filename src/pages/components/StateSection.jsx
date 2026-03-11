import { statsData } from '@/constants/home';
import React from 'react';

const StateSection = () => {
  return (
    <div>
      <section className="py-[100px] lg:py-[100px]">
        <div className="container max-w-[1320px] mx-auto px-3 sm:px-6 lg:px-0">
          <div className="flex flex-wrap items-center justify-center w-full grid-cols-1 gap-8 px-3 py-4 md:flex-row space-y-7 sm:space-y-0 sm:px-10 lg:justify-between lg:items-start sm:gap-10 lg:gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {statsData.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-center gap-2 sm:gap-6 lg:justify-start"
                >
                  <div className="relative w-[70px] h-[70px]">
                    <span
                      className="absolute top-[50%] right-[50%] font-semibold leading-1 text-suxnix-heading"
                      style={{
                        transform: 'translate(50%, -50%)',
                      }}
                    >
                      {item.percentage}%
                    </span>
                    <canvas className="p-2 w-[70px] h-[70px] flex items-center justify-center bg-suxnix-primary rounded-full"></canvas>
                  </div>
                  <div className="space-y-1 lg:space-y-2">
                    <h1 className="text-xl lg:text-2xl">{item.title}</h1>
                    <p className="text-base">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StateSection;
