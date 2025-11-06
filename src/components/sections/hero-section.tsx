"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import "@splidejs/splide/css";
import { Star } from "lucide-react";
// Splide is dynamically imported in initSplide to avoid SSR/hydration issues
import { heroSlides } from "@/data/mockData";
import type { Splide as SplideType } from "@splidejs/splide";

// Rating Badge Component matching Figma design
interface RatingBadgeProps {
  rating: string | number;
  className?: string;
}

function RatingBadge({ rating, className = "" }: RatingBadgeProps) {
  return (
    <div
      className={`
        inline-flex items-center justify-center
        px-1.5 py-1
        ${className}
      `}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '24px',
        padding: '0px 6px',
        gap: '4px'
      }}
    >
      <Star
        className="w-4 h-4 fill-[#F4B83C] text-[#F4B83C]"
        style={{ width: '16px', height: '16px' }}
      />
      <span
        className="text-white font-medium leading-none"
        style={{
          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
          fontWeight: 510,
          fontSize: '12px',
          lineHeight: '1.75em',
          letterSpacing: '-2.58%'
        }}
      >
        {rating}
      </span>
    </div>
  );
}

export function HeroSection() {
  const [showCarousel, setShowCarousel] = useState(true);
  const [key, setKey] = useState(Date.now());
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const splideRef = useRef<HTMLDivElement>(null);
  const splideInstance = useRef<SplideType | null>(null);
  type SlideClickPayload = { index: number };
  const slideClickHandlerRef = useRef<
    ((slide: SlideClickPayload) => void) | null
  >(null);
  const visibilityChangeCount = useRef(0);
  // Keep latest active index in a ref so we can reuse it on re-initialization
  const activeIndexRef = useRef<number>(0);
  // Visual flag to toggle alignment class as the slide begins moving
  const [isFirstVisual, setIsFirstVisual] = useState(true);
  // Background crossfade state
  const [bgA, setBgA] = useState<string | null>(null);
  const [bgB, setBgB] = useState<string | null>(null);
  const [showA, setShowA] = useState(true);
  const lastBgRef = useRef<string | null>(null);
  
  // Minimal spam protection - only debounce clicks
  const lastClickTime = useRef<number>(0);

  useEffect(() => {
    if (heroSlides && heroSlides.length > 0) {
      setShowCarousel(true);
      // Preload all background images
      preloadImages(heroSlides);
    } else {
      setShowCarousel(false);
    }
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        visibilityChangeCount.current += 1;
        setKey(Date.now());
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Handle Alt + Tab keyboard navigation to go to first slide
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Alt + Tab combination
      if (e.altKey && e.key === "Tab") {
        e.preventDefault(); // Prevent default tab behavior
        
        // Navigate to first slide (index 0)
        const splide = splideInstance.current;
        if (splide && splide.index !== 0) {
          try {
            splide.go(0);
          } catch (error) {
            console.error("Error navigating to first slide:", error);
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Empty dependency array since we're using refs

  const initSplide = useCallback(async () => {
    if (!splideRef.current || heroSlides.length === 0) {
      return;
    }

    try {
      // Destroy existing instance if it exists
      if (splideInstance.current) {
        splideInstance.current.destroy(true);
        splideInstance.current = null;
      }

      const { default: Splide } = await import("@splidejs/splide");
      const splide = new Splide(splideRef.current, {
        type: "loop",
        focus: "center",
        start: Math.min(
          heroSlides.length - 1,
          Math.max(0, activeIndexRef.current)
        ),
        perPage: 7,
        perMove: 1,
        // gap: "24px",
        pagination: false,
        autoplay: false,
        arrows: false,
        fixedWidth: "202px",
        fixedHeight: "289px",
        speed: 400,
        easing: "cubic-bezier(0.23, 1, 0.32, 1)",
        drag: true,
        snap: true,
        dragMinThreshold: 5,
        waitForTransition: false,
        updateOnMove: true,
        flickPower: 300,
        throttle: 16, // 60fps for smoother performance
        padding: 0,
        breakpoints: {
          767: {
            perPage: 1,
            // gap: "0.7rem",
            // padding: { left: "10%", right: "20%" },
            fixedWidth: "202px",
            fixedHeight: "289px",
            speed: 300,
          },
        },
      });

      splide.mount();
      splideInstance.current = splide;

      // Fix ARIA role compatibility issues - Remove role="group" from li elements
      // Splide automatically adds role="group" to slide elements, but this is not compatible with li elements
      setTimeout(() => {
        const slides = splideRef.current?.querySelectorAll('.splide__slide[role="group"]');
        slides?.forEach(slide => {
          slide.removeAttribute('role');
        });
      }, 100);

      // Pre-activate smoothing: mark the destination slide as 'becoming-active' during motion
      splide.on("move", (newIndex: number) => {
        try {
          type SlideComp = { index: number; slide: HTMLElement };
          const slides =
            splide.Components.Slides.get() as unknown as SlideComp[];
          slides.forEach((s: SlideComp) =>
            s.slide.classList.remove("becoming-active")
          );
          const target = slides.find((s: SlideComp) => s.index === newIndex);
          if (target) target.slide.classList.add("becoming-active");
        } catch {}
        // Pre-toggle alignment when first slide is about to become active for smoother transition
        setIsFirstVisual(newIndex === 0);
      });

      // Track active slide changes - only update on final position, and clear pre-activation state
      splide.on("moved", (newIndex) => {
        setActiveSlideIndex(newIndex);
        activeIndexRef.current = newIndex;
        // Ensure final alignment state matches the new index
        setIsFirstVisual(newIndex === 0);
        try {
          type SlideComp = { index: number; slide: HTMLElement };
          const slides =
            splide.Components.Slides.get() as unknown as SlideComp[];
          slides.forEach((s: SlideComp) =>
            s.slide.classList.remove("becoming-active")
          );
        } catch {}
      });

      // Stable click handler reference for re-binding after refreshes
      slideClickHandlerRef.current = (slide: SlideClickPayload) => {
        const now = Date.now();
        
        // Minimal debouncing: prevent clicks faster than 16ms apart (60fps)
        if (now - lastClickTime.current < 16) {
          return;
        }
        
        const inst = splideInstance.current || splide;
        const dest = slide?.index;
        if (typeof dest === "number" && inst && inst.index !== dest) {
          lastClickTime.current = now;
          try {
            inst.go(dest);
          } catch {}
        }
      };
      if (slideClickHandlerRef.current) {
        splide.on("click", slideClickHandlerRef.current);
      }

      // If Splide rebuilds slides on refresh/resized, re-register the click handler cleanly
      const rebindClick = () => {
        const handler = slideClickHandlerRef.current;
        if (!handler) return;
        try {
          splide.off("click");
        } catch {}
        try {
          splide.on("click", handler);
        } catch {}
      };
      splide.on("refreshed", rebindClick);

      splide.refresh();
    } catch (error) {
      console.error("Error initializing Splide:", error);
    }
  }, []);

  useEffect(() => {
    // Defer init until after two RAFs so layout/refs are fully ready
    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        initSplide();
      });
    });

    const handleResize = () => {
      const el = splideRef.current as HTMLElement | null;
      const inst = splideInstance.current;
      if (!el || !inst) return;
      try {
        // Only refresh once the size is stable across a few frames
        let lastW = 0;
        let lastH = 0;
        let stable = 0;
        const checkStable = () => {
          const rect = el.getBoundingClientRect();
          const w = Math.round(rect.width);
          const h = Math.round(rect.height);
          if (
            w > 100 &&
            h > 50 &&
            Math.abs(w - lastW) < 1 &&
            Math.abs(h - lastH) < 1
          ) {
            stable += 1;
          } else {
            stable = 0;
          }
          lastW = w;
          lastH = h;
          if (stable >= 2) {
            try {
              inst.refresh();
            } catch {}
          } else {
            requestAnimationFrame(checkStable);
          }
        };
        requestAnimationFrame(checkStable);
      } catch (error) {
        console.error("Error refreshing on resize:", error);
      }
    };

    // Debounced window resize handler to keep Splide stable during zoom
    let resizeTimeout: NodeJS.Timeout;
    const debouncedHandleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 200);
    };
    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      if (raf1) cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
      window.removeEventListener("resize", debouncedHandleResize);
      clearTimeout(resizeTimeout);
      if (splideInstance.current) {
        splideInstance.current.destroy(true);
        splideInstance.current = null;
      }
    };
  }, [initSplide, key]);

  // Preload background images
  function preloadImages(images: typeof heroSlides): HTMLImageElement[] {
    return images.map((image) => {
      const img = document.createElement("img") as HTMLImageElement;
      img.src = image.image;
      return img;
    });
  }

  // Removed manual DOM click handler binding; handled via Splide 'click' event

  // Get the active slide's image
  const activeSlide = heroSlides[activeSlideIndex];
  const backgroundImage = activeSlide?.image;

  // Initialize background layers and crossfade on change
  useEffect(() => {
    if (!backgroundImage) return;

    // Seed both layers on first run
    if (!bgA && !bgB) {
      setBgA(backgroundImage);
      setBgB(backgroundImage);
      setShowA(true);
      lastBgRef.current = backgroundImage;
      return;
    }

    // Avoid re-running if the image hasn't changed
    if (lastBgRef.current === backgroundImage) return;
    lastBgRef.current = backgroundImage;

    // Slight delay for rapid changes to prevent background flicker during spam clicking
    const timeSinceLastClick = Date.now() - lastClickTime.current;
    if (timeSinceLastClick < 100) {
      // Use a timeout to batch rapid background changes
      setTimeout(() => {
        if (lastBgRef.current === backgroundImage) {
          // Update the hidden layer first, then flip the visible layer next frame for a smooth fade
          if (showA) {
            setBgB(backgroundImage);
          } else {
            setBgA(backgroundImage);
          }
          requestAnimationFrame(() => setShowA((prev) => !prev));
        }
      }, 50);
      return;
    }

    // Update the hidden layer first, then flip the visible layer next frame for a smooth fade
    if (showA) {
      setBgB(backgroundImage);
    } else {
      setBgA(backgroundImage);
    }
    requestAnimationFrame(() => setShowA((prev) => !prev));
  }, [backgroundImage]);

  return (
    <>
      {showCarousel && heroSlides.length > 0 && (
        <section
          key={key}
          className={`relative w-full flex  min-h-[500px] bg-[#0A0F1C] pt-[80px] pb-2 items-center justify-center overflow-hidden toraka-hero-carousel ${
            isFirstVisual ? "is-first" : ""
          }`}
        >
          {/* Dynamic background with blur effect - crossfade between two layers */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ease-out ${
              showA ? "opacity-40" : "opacity-0"
            }`}
            style={{
              backgroundImage: bgA ? `url(${bgA})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              minHeight: "500px",
              maxHeight: "500px",
            }}
          />
          <div
            className={`absolute inset-0 transition-opacity duration-500 ease-out ${
              showA ? "opacity-0" : "opacity-40"
            }`}
            style={{
              backgroundImage: bgB ? `url(${bgB})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              minHeight: "500px",
              maxHeight: "500px",
            }}
          />

          {/* Blur overlay */}
          <div className="absolute inset-0 backdrop-blur-sm" />
          {/* Bottom fade per Figma: 0% transparent #0A0F1C → 100% solid #0A0F1C */}
          <div className="absolute bottom-0 left-0 right-0 h-[422px] [box-shadow:0px_-4px_10px_0px_rgba(9,_9,_9,_1)_inset] pointer-events-none" />

          <div
            ref={splideRef}
            className="splide relative z-10"
            style={{
              minHeight: "289px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="splide__track">
              <ul className="splide__list">
                {heroSlides.map((item) => (
                  <li key={item.id} className="splide__slide group">
                    <div
                      className={`
                        relative rounded-[8px] overflow-hidden cursor-pointer
                        flex flex-col justify-end items-center
                        transition-all duration-200 ease-out origin-center
                        w-full min-h-[289px] md:min-h-[289px]
                        group-[.is-active]:rounded-[11px]
                        group-[.is-active]:scale-x-[1.30693069]
                        group-[.is-active]:scale-y-[1.307958458]
                        md:group-[.is-active]:opacity-100 md:opacity-[70%]
                        group-[.is-active]:opacity-100 opacity-[70%]
                        
                        group-[.is-active]:z-10 
                        will-change-transform
                      `}
                    >
                      <Image
                        src={item.image}
                        alt={""}
                        fill
                        className={`object-cover group-hover:scale-105 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]`}
                        draggable={false}
                        sizes="(max-width: 767px) 289px, 202px"
                        priority={false}
                        loading="lazy"
                      />
                      <div className="absolute bottom-[-2px] left-0 right-0 h-20 bg-gradient-to-t from-black/95 via-black/90 to-transparent transition-opacity duration-200 ease-out opacity-0 group-[.is-active]:opacity-100" />

                      <div
                        className={`
                          relative z-10 p-3 md:p-4 text-white w-full
                          transition-all duration-100 ease-out delay-50
                          opacity-0 group-[.is-active]:opacity-100
                        `}
                      >
                        <div className="group-[.is-active]:block hidden md:block">
                          <div className="flex items-center space-x-2 text-xs mb-1">
                            <RatingBadge rating={item.rating} />
                          </div>
                          <p className="text-xs font-bold text-white line-clamp-2">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* spacing for active card */}
      <style jsx global>{`
        /* Desktop & default */
        .toraka-hero-carousel {
          overflow-x: hidden !important;
          overflow-y: hidden !important;
          position: relative;
          contain: layout style paint;
          perspective: 1000px;
        }

        .toraka-hero-carousel .splide {
          margin-left: -88.5px;
          overflow: visible !important;
          width: 100%;
          transition: margin-left 400ms cubic-bezier(0.23, 1, 0.32, 1);
          will-change: margin-left;
        }
        /* When first slide is active, align track flush to the left */
        .toraka-hero-carousel.is-first .splide {
          margin-left: -22px !important;
        }

        .toraka-hero-carousel .splide__track {
          overflow: visible !important;
        }

        .toraka-hero-carousel .splide__list {
          overflow: visible !important;
        }

        /* Zoom stability: keep transforms on GPU-backed layer */
        .toraka-hero-carousel .splide__slide {
          transform-origin: center center;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .toraka-hero-carousel .splide__track,
        .toraka-hero-carousel .splide__list {
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          will-change: transform, opacity;
        }

        .toraka-hero-carousel .splide__list .splide__slide.is-active {
          margin-right: 44px !important;
          margin-left: 44px !important;
        }

        .toraka-hero-carousel .splide__list .splide__slide {
          margin-right: 12px !important;
          margin-left: 12px !important;
        }

        /* Clean and simple transitions like reference code */
        .toraka-hero-carousel .splide__slide.becoming-active > div {
          opacity: 0.85;
          transition: all 200ms ease-out;
        }
        
        /* Enhanced performance optimizations */
        .toraka-hero-carousel .splide__slide {
          will-change: transform;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }
        
        .toraka-hero-carousel .splide__slide > div {
          will-change: transform, opacity, border-radius;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }
        
        /* Smooth drag interactions */
        .toraka-hero-carousel .splide__track {
          cursor: grab;
        }
        
        .toraka-hero-carousel .splide__track:active {
          cursor: grabbing;
        }
        
        /* Enhanced GPU acceleration for all interactive elements */
        .toraka-hero-carousel .splide__slide img {
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          will-change: transform;
        }

        /* Bottom gradient with full coverage */
        .bottom-gradient {
          position: absolute;
          bottom: 0;
          left: -200px;
          right: -200px;
          height: 60px;
          background: linear-gradient(
            to bottom,
            rgba(10, 15, 28, 0) 0%,
            rgba(10, 15, 28, 0.8) 50%,
            #0a0f1c 100%
          );
          pointer-events: none;
          z-index: 5;
          transform: scale(1.1);
        }

        /* Mobile breakpoint: Splide gap is 0.7rem, double it for the active slide */
        @media (max-width: 767px) {
          .toraka-hero-carousel .splide {
            margin-left: -87.5px;
            transition: margin-left 300ms cubic-bezier(0.23, 1, 0.32, 1);
            will-change: margin-left;
          }
          /* Override on mobile when first slide is active */
          .toraka-hero-carousel.is-first .splide {
            margin-left: -21px !important;
          }
          .bottom-gradient {
            left: -100px;
            right: -100px;
            height: 50px;
            transform: scale(1.05);
          }
        }
      `}</style>
    </>
  );
}
