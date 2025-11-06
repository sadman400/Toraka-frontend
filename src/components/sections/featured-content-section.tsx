"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Pagination, usePagination } from "../ui/pagination";
import useScreenSizer from "@/lib/useScreenSizer";
import {
  trendingData,
  topSeriesData,
  highestRatedData,
  mostPopularData,
  recentUpdatesData,
} from "@/data/mockData";
import SplideWithProgress from "../SplideWithProgress";
import { FeaturedSlider } from "../FeaturedSlider";
import { useRef } from "react";

export function FeaturedContentSection() {
  const screenSize = useScreenSizer();
  // Recently Updated pagination
  const ITEMS_PER_PAGE = 10;
  const recentUpdatesPagination = usePagination(
    recentUpdatesData.length,
    ITEMS_PER_PAGE
  );

  // Ref for Recently Updated section
  const recentlyUpdatedSectionRef = useRef<HTMLElement>(null);

  // Handle page change with scroll to top of Recently Updated section
  const handlePageChange = (page: number) => {
    recentUpdatesPagination.goToPage(page);

    // Scroll to the top of the Recently Updated section
    if (recentlyUpdatedSectionRef.current) {
      const headerHeight = 80; // Account for fixed header
      const sectionTop =
        recentlyUpdatedSectionRef.current.offsetTop - headerHeight;

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className={`space-y-9 max-w-[1240px] flex flex-col w-full px-6 xl:p-0`}
    >
      {/* Trending Now Section */}
      <FeaturedSlider
        title="Trending Now"
        description="Most Popular this week"
        icon="/assets/icons/trending-icon.svg"
        iconBgColor="bg-blue-500/20"
        data={trendingData}
        showRating={false}
        showStarRating={false}
        showTitle={true}
        className="mr-[-24px] xl:mr-0"
      />

      {/* Top Series Section */}
      <section className={`space-y-[14px] mr-[-24px] xl:mr-0`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-yellow-500/20 rounded">
              <Image
                src="/assets/icons/top-series-icon.svg"
                alt="Top Series"
                width={18}
                height={18}
                className="text-yellow-500"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Top Series</h2>
              <p className="text-sm text-muted-foreground">
                Most popular series this month
              </p>
            </div>
          </div>
        </div>

        {/* Top Series Content */}
        <div className="relative overflow-hidden">
          {/* Slider for Mobile → Laptop */}
          {screenSize && (screenSize === "mobile" ||
            screenSize === "tablet" ||
            screenSize === "laptop") && <SplideWithProgress />}

          {/* Static Grid for Desktop only (show only first 9 items) */}
          {screenSize === "desktop" && (
            <div className="grid gap-2 grid-cols-3 grid-rows-3">
              {topSeriesData.slice(0, 9).map((item) => (
                <div
                  key={item.rank}
                  className="flex items-center gap-4 p-1 bg-[#1A2232] rounded-xl hover:bg-[#1A2232]/80 transition-colors cursor-pointer group h-[123px]"
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
                      <Badge
                        variant="outline"
                        size="sm"
                        className={cn(
                          "w-fit border-0 font-bold text-[20px] leading-tight px-2 py-1",
                          item.rank === 1 && "bg-[#F4B83C]/20 text-[#F4B83C]",
                          item.rank === 2 && "bg-gray-700 text-white",
                          item.rank === 3 && "bg-[#FF9114]/20 text-[#FF9114]",
                          item.rank >= 4 && "bg-[#1E3A8A] text-[#93C5FD]"
                        )}
                      >
                        <span>
                        Rank {item.rank}
                        </span>
                      </Badge>
                    </SimpleTooltip>
                    <div className="space-y-1.5">
                      <h3 className="text-base font-medium text-foreground line-clamp-2 leading-tight">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
                        {item.genres.map((genre, genreIndex) => (
                          <span key={genre} className="flex items-center gap-2">
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
          )}
        </div>
      </section>

      {/* Highest Rated Series Section */}
      <FeaturedSlider
        title="Highest Rated Series"
        description="Top Rated Series"
        data={highestRatedData}
        showRating={false}
        showStarRating={true}
        showTitle={true}
        className="mr-[-24px] xl:mr-0"
      />

      {/* Most Popular Series Section */}
      <FeaturedSlider
        title="Most Popular Series"
        description="The series dominating the spotlight"
        data={mostPopularData}
        showRating={false}
        showStarRating={true}
        showTitle={true}
        className="mr-[-24px] xl:mr-0"
      />

      {/* Recently Updated Section */}
      <section ref={recentlyUpdatedSectionRef} className="space-y-[14px]">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Recently Updated
            </h2>
          </div>
        </div>

        {/* Recently Updated List */}
        <div className="rounded-xl overflow-hidden">
          {/* Items */}
          <div className="flex flex-col">
            {recentUpdatesData
              .slice(
                recentUpdatesPagination.startIndex,
                recentUpdatesPagination.endIndex
              )
              .map((item, index) => (
                <div
                  key={item.id}
                  className={`bg-[#1A2232] ${
                    index !== 0
                      ? "mt-[2px] border-t-[2px] border-[#283041] "
                      : ""
                  }`}
                >
                  <div
                    className={`flex items-center gap-3 px-2 py-1 hover:bg-[#1e293b]/80  transition-colors cursor-pointer group h-[98px]`}
                  >
                    <div className="relative max-w-[62px] max-h-[90px] h-[90px] w-[62px] rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={""}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold text-foreground line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {item.chapter}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          size="sm"
                          className="bg-gray-700 border-0 text-white hover:bg-gray-600"
                        >
                          {item.source}
                        </Badge>
                        <Badge
                          variant="outline"
                          size="sm"
                          className="bg-gray-700 border-0 text-white hover:bg-gray-600"
                        >
                          <Image
                            src="/assets/icons/clock-icon.svg"
                            alt="Clock"
                            width={14}
                            height={14}
                            className="opacity-80 mr-1"
                          />
                          {item.timeAgo}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Pagination */}
          <div className="bg-[#1A2232] pb-4 mt-[2px] pt-4 border-t-[2px] border-[#283041]">
            <Pagination
              currentPage={recentUpdatesPagination.currentPage}
              totalPages={recentUpdatesPagination.totalPages}
              onPageChange={handlePageChange}
              size="sm"
              maxVisiblePages={5}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
