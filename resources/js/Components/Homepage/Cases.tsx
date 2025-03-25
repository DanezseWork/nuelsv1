"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/Components/ui/Carousel";

export const Case2 = () => {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <div id="clientSection" className="relative w-full py-20 lg:py-40 bg-transparent overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-5 gap-10 items-center">
          <div className="relative w-full col-span-4 z-20">
            <div className="bg-gradient-to-r from-black via-black/5 to-black z-10 absolute left-0 top-0 right-0 bottom-0 w-full h-full"></div>
            <div className="relative w-full overflow-hidden">
              <div className="flex animate-scroll">
                {Array.from({ length: 50 }).map((_, index) => (
                  <div
                    className="basis-1/4 lg:basis-1/6 px-2"
                    key={index}
                  >
                    <div className="flex rounded-md aspect-square bg- items-center justify-center border-primary border-2 my-3">
                      <img
                        src={`/images/clients/${(index % 25) + 1}.jpg`}
                        alt={`client-${(index % 25) + 1}`}
                        className="w-full h-full rounded-md object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <style>{`
              @keyframes scroll {
                from {
                  transform: translateX(0);
                }
                to {
                  transform: translateX(-50%);
                }
              }

              .animate-scroll {
                display: flex;
                width: max-content;
                animation: scroll 40s linear infinite;
              }
            `}</style>
          </div>
          <h3 className="text-[3rem] tracking-tighter lg:max-w-xl font-bold text-right text-[#fbe37b] py-3 [text-shadow:0_0_10px_rgb(250,204,21)]">
            Satisfied Clients
          </h3>
        </div>
      </div>
    </div>
  );
};
