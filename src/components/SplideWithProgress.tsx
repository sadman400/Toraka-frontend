"use client";

// Simulating the @splidejs/react-splide imports
// In your actual project, you would import these:
import { useRef } from "react";
import {
  Splide,
  SplideSlide,
  type SplideInstance,
} from "@splidejs/react-splide";
import type { Options } from "@splidejs/splide";
import "@splidejs/react-splide/css";
import "@/styles/content-splide.css";
import { topSeriesData } from "@/data/mockData";
import Image from "next/image";
import { Badge, SimpleTooltip } from "./ui";
import { cn } from "@/lib/utils";

export default function SplideWithProgress() {
  const splideRef = useRef<SplideInstance | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  // Group items into chunks of 3 for vertical stacking
  const chunkArray = <T,>(arr: T[], size: number): T[][] => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const chunkedData = chunkArray(topSeriesData, 3);

  const handleSplideMount = (splide: SplideInstance): void => {
    updateProgress(splide);

    // Fix ARIA role compatibility issues - Remove role="group" from li elements
    // Splide automatically adds role="group" to slide elements, but this is not compatible with li elements
    setTimeout(() => {
      const splideElement = document.querySelector('.top-series-splide');
      const slides = splideElement?.querySelectorAll('.splide__slide[role="group"]');
      slides?.forEach(slide => {
        slide.removeAttribute('role');
      });
    }, 100);
  };

  const handleSlideMove = (splide: SplideInstance): void => {
    updateProgress(splide);
  };

  const updateProgress = (splide: SplideInstance): void => {
    if (progressBarRef.current && splide && typeof window !== 'undefined') {
      const count: number =
        window.innerWidth > 1280 ? 3 : window.innerWidth > 767 ? 2 : 1;
      const end: number = splide.Components.Controller.getEnd() + count;
      const rate: number = Math.min((splide.index + 1) / end, 1);
      progressBarRef.current.style.width = `${100 * rate}%`;
    }
  };

  const splideOptions: Options = {
    type: "slide",
    rewind: true,
    pagination: false,
    perPage: 2, // ← Each slide is one full grid
    arrows: false,
    gap: "18px",
    breakpoints: {
      1024: {
        perPage: 2,
      },
      767: {
        perPage: 1,
      },
      440: {
        perPage: 1,
      },
    },
  };

  return (
    <div className="w-full flex items-center justify-center pr-2 lg:pr-0">
      <div className="w-full">
        <Splide
          ref={splideRef}
          options={splideOptions}
          onMounted={handleSplideMount}
          onMoved={handleSlideMove}
          className="top-series-splide !overflow-visible"
        >
          {chunkedData.map((chunk, chunkIndex) => (
            <SplideSlide key={chunkIndex}>
              <div className="space-y-2">
                {chunk.map((item) => (
                  <div
                    key={item.rank}
                    className="flex items-center gap-4 p-1 bg-[#1A2232] rounded-xl hover:bg-[#1A2232]/80 transition-colors cursor-pointer group h-[123px] w-[348px] lg:w-[408px]"
                  >
                    <div className="relative h-[115px] w-[80px] rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={""}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 space-y-2 py-2">
                      <SimpleTooltip content={`Rank #${item.rank} in trending`}>
                        <span
                          className={cn(
                            "w-fit border-0 font-bold text-[20px] leading-tight px-2 py-1 rounded",
                            item.rank === 1 && "bg-[#F4B83C]/10 text-[#F4B83C]",
                            item.rank === 2 && "bg-white/10 text-white",
                            item.rank === 3 && "bg-[#FF9114]/10 text-[#FF9114]",
                            item.rank >= 4 && "bg-[#0064FF]/10 text-[#0064FF]"
                          )}
                        >
                          Rank {item.rank}
                        </span>
                      </SimpleTooltip>
                      <div className="space-y-1.5">
                        <h3 className="text-base font-medium text-foreground line-clamp-2 leading-tight">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {item.genres.map((genre, genreIndex) => (
                            <span
                              key={genre}
                              className="flex items-center gap-2"
                            >
                              {genre}
                              {genreIndex < item.genres.length - 1 && (
                                <span>•</span>
                              )}
                            </span>
                          ))}
                          <span>+1</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
}
