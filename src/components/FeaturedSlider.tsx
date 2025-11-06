"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  Splide,
  SplideSlide,
  type SplideInstance,
} from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@/styles/content-splide.css";
import { useRef, useState, useEffect } from "react";
import { StarRating } from "./ui/star-rating";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

// Types for different slider data
interface TrendingItem {
  id: number;
  title: string;
  image: string;
}

interface RatedItem {
  id: number;
  title: string;
  image: string;
  rating: string;
}

type SliderData = TrendingItem | RatedItem;

interface FeaturedSliderProps {
  title: string;
  description: string;
  icon?: string;
  iconBgColor?: string;
  iconBorder?: string;
  data: SliderData[];
  showRating?: boolean;
  showStarRating?: boolean;
  showTitle?: boolean;
  className?: string;
  blurPosition?: "left" | "right";
}

export function FeaturedSlider({
  title,
  description,
  icon,
  iconBgColor = "bg-blue-500/10",
  iconBorder,
  data,
  showRating = false,
  showStarRating = false,
  showTitle = true,
  className,
  blurPosition = "left",
}: FeaturedSliderProps) {
  const splideRef = useRef<SplideInstance | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [slidesPerPage, setSlidesPerPage] = useState(6);
  const [isClient, setIsClient] = useState(false);
  const observerRef = useRef<MutationObserver | null>(null);

  const hasRating = (item: SliderData): item is RatedItem => {
    return 'rating' in item;
  };

  // Calculate button states based on slider position
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= totalSlides - slidesPerPage;

  // Handle Splide mount and move events
  const handleSplideMount = (splide: SplideInstance) => {
    setCurrentIndex(splide.index);
    setTotalSlides(data.length);
    // Get current slides per page from breakpoints
    updateSlidesPerPage();

    // Fix ARIA role compatibility issues - Remove role="group" from li elements
    // Splide automatically adds role="group" to slide elements, but this is not compatible with li elements
    const fixAriaRoles = () => {
      if (typeof document === 'undefined') return;

      // Use multiple selectors to catch all possible slide elements with incompatible roles
      const selectors = [
        '.featured-splide .splide__slide[role="group"]',
        '.splide__slide[role="group"]',
        '.splide__list .splide__slide[role="group"]'
      ];

      selectors.forEach(selector => {
        const slides = document.querySelectorAll(selector);
        slides.forEach((slide: Element) => {
          slide.removeAttribute('role');
        });
      });
    };

    // Run multiple times to catch any delayed role additions by Splide
    fixAriaRoles();
    setTimeout(fixAriaRoles, 50);
    setTimeout(fixAriaRoles, 150);
    setTimeout(fixAriaRoles, 300);

    // Set up MutationObserver to watch for dynamically added ARIA roles
    if (typeof window !== 'undefined' && window.MutationObserver) {
      // Clean up any existing observer
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'role') {
            const target = mutation.target as Element;
            if (target.classList.contains('splide__slide') && target.getAttribute('role') === 'group') {
              target.removeAttribute('role');
            }
          }
        });
      });

      // Start observing the splide container
      const splideContainer = document.querySelector('.featured-splide');
      if (splideContainer) {
        observerRef.current.observe(splideContainer, {
          attributes: true,
          attributeFilter: ['role'],
          subtree: true
        });
      }
    }
  };

  const handleSlideMove = (splide: SplideInstance) => {
    setCurrentIndex(splide.index);
  };

  // Update slides per page based on window width
  const updateSlidesPerPage = () => {
    if (typeof window === 'undefined') return;
    const width = window.innerWidth;
    if (width <= 440) setSlidesPerPage(1);
    else if (width <= 640) setSlidesPerPage(2);
    else if (width <= 768) setSlidesPerPage(3);
    else if (width <= 1024) setSlidesPerPage(4);
    else if (width <= 1280) setSlidesPerPage(4);
    else if (width <= 1580) setSlidesPerPage(4);
    else setSlidesPerPage(6);
  };

  // Update slides per page on window resize
  useEffect(() => {
    // Set client-side flag
    setIsClient(true);

    // Only run on client side
    if (typeof window !== 'undefined') {
      updateSlidesPerPage();
      const handleResize = () => updateSlidesPerPage();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Cleanup MutationObserver on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  return (
    <section className={cn("space-y-[14px] pr-2 lg:pr-0", className, )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon && (
            <div className={cn(
              "flex items-center justify-center w-10 h-10 rounded",
              iconBgColor,
              iconBorder
            )}>
              <Image
                src={icon}
                alt=""
                width={19}
                height={11}
                className="text-blue-500"
                style={{ width: '19px', height: '11px' }}
                role="presentation"
              />
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 xl:flex hidden">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "w-11 h-11 transition-all duration-150",
              !isAtStart
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-700/50 hover:bg-gray-600/70"
            )}
            onClick={() => {
              if (!isAtStart) {
                splideRef.current?.go("<");
              }
            }}
            disabled={isAtStart}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-white" strokeWidth={2.5} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "w-11 h-11 transition-all duration-150",
              !isAtEnd
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-700/50 hover:bg-gray-600/70"
            )}
            aria-label="Next slide"
            onClick={() => {
              if (!isAtEnd) {
                splideRef.current?.go(">");
              }
            }}
            disabled={isAtEnd}
          >
            <ChevronRight className="w-5 h-5 text-white" strokeWidth={2.5} />
          </Button>
        </div>
      </div>

      {/* Slider */}
      <div className="relative overflow-hidden w-full">
        <div className="absolute inset-0 w-8 h-full left-auto bg-gradient-to-r from-[#0A0F1C00] from-40% to-[#0A0F1C] to-100% z-[10]" />
        <Splide
          ref={splideRef}
          options={{
            type: "slide",
            perPage: 6,
            perMove: 1,
            gap: "14px",
            pagination: false,
            arrows: false,
            autoplay: false,
            drag: true,
            wheel: false,
            rewind: false,
            speed: 700,
            easing: "ease-in-out",
            breakpoints: {
              1580: {
                perPage: 4,
              },
              1280: {
                perPage: 4,
                speed: 400,
                easing: "cubic-bezier(0.25, 1, 0.5, 1)",
              },
              1024: {
                perPage: 4,
              },
              768: {
                perPage: 3,
              },
              640: {
                perPage: 2,
              },
              440: {
                perPage: 1,
              },
            },
          }}
          onMounted={handleSplideMount}
          onMoved={handleSlideMove}
          className="featured-splide !overflow-visible"
        >
          {data.map((item) => (
            <SplideSlide key={item.id}>
              <div className="space-y-2 group cursor-pointer">
                <div className="relative h-[272px] w-[190px] rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={""}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Rating Badge - only show if showRating is true and item has rating */}
                  {showRating && hasRating(item) && (
                    <div className="absolute bottom-2 right-2">
                      <SimpleTooltip content={`Rating: ${item.rating}/10`}>
                        <Badge
                          variant="warning"
                          className="bg-black/60 backdrop-blur-sm border-0 text-white hover:bg-black/70"
                        >
                          <Image
                            src="/assets/icons/trending-icon.svg"
                            alt=""
                            width={21}
                            height={13}
                            className="text-yellow-500 mr-1"
                            style={{ width: '21px', height: '13px' }}
                            role="presentation"
                          />
                          {item.rating}
                        </Badge>
                      </SimpleTooltip>
                    </div>
                  )}
                </div>
                {/* Title - only show if showTitle is true */}
                {showTitle && (
                  <h3 className="text-sm font-medium text-muted-foreground w-full line-clamp-2">
                    {item.title}
                  </h3>
                )}
                {/* Star Rating - only show if showStarRating is true and item has rating */}
                {showStarRating && hasRating(item) && (
                  <Badge
                    variant="secondary"
                    size="sm"
                    className="bg-black/40 border-0 text-white hover:bg-black/50"
                  >
                    <StarRating rating={item.rating} />
                  </Badge>
                )}
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
}
