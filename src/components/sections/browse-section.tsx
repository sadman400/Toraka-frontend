"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FeaturedSlider } from "../FeaturedSlider";
import { highlightsData, recommendedData } from "@/data/mockData";
import { Ban, Flag } from "lucide-react";

const BrowseSection = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="w-full min-h-screen bg-[#0A0F1C]">
      {/* Mobile Layout (0-767px) */}
      <div className="md:hidden relative">
        {/* Background Image with Blur */}
        <div className="absolute w-full h-[552px] overflow-hidden">
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/assets/images/manga-cover.png')`,
              filter: "blur(35.3px)",
            }}
          />
          {/* Bottom gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0A0F1C] to-transparent" />
        </div>

        {/* Mobile Content */}
        <div className="relative z-10 px-6 pt-26">
          {/* Cover Image and Title Section */}
          <div className="flex flex-col items-center gap-3 mb-6">
            {/* Cover Image */}
            <div className="relative w-[210px] h-[333px] rounded-[13px] overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-transparent" />
              <Image
                src="/assets/images/manga-cover.png"
                alt="Return of the Mount Hua Sect"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Title */}
            <h1 className="text-[24px] font-semibold text-[#F5F5F5] leading-[1.19] text-center">
              Return of the Mount Hua Sect
            </h1>

            {/* Badges */}
            <div className="flex items-center gap-2">
              <div className="bg-[#FF8140] text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium">
                <Image
                  src="/assets/icons/fire-icon.svg"
                  alt="Fire"
                  width={12}
                  height={14}
                  className="w-3 h-[14px]"
                />
                Popularity #3
              </div>
              <div className="bg-[#FFBF36] text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium">
                <Image
                  src="/assets/icons/star-icon.svg"
                  alt="Star"
                  width={12}
                  height={12}
                  className="w-3 h-3"
                />
                Rating #7
              </div>
            </div>
          </div>

          {/* Mobile Tabs */}
          <div className="pt-6 mb-4">
            <div className="bg-[rgba(168,202,255,0.1)] rounded-md flex">
              <button
                className={`flex-1 px-4 py-3 text-base font-normal transition-colors ${
                  activeTab === "overview"
                    ? "text-[#0064FF] border-b-2 border-[#0064FF] rounded-md"
                    : "text-[#CFD9E9]"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`flex-1 px-4 py-3 text-base font-normal transition-colors ${
                  activeTab === "chapters"
                    ? "text-[#0064FF] border-b-2 border-[#0064FF] rounded-md"
                    : "text-[#CFD9E9]"
                }`}
                onClick={() => setActiveTab("chapters")}
              >
                Chapters
              </button>
              <button
                className={`flex-1 px-4 py-3 text-base font-normal transition-colors relative ${
                  activeTab === "reviews"
                    ? "text-[#0064FF] border-b-2 border-[#0064FF] rounded-md"
                    : "text-[#CFD9E9]"
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
                <span className="ml-2 bg-white/10 text-[#CFD9E9] text-sm px-2 py-0.5 rounded-full">
                  20
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Content Sections */}
          <div className="space-y-6 pb-8">
            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-2">
              {/* Row 1 */}
              <div className="flex items-center gap-2 p-2 rounded-lg">
                <div className="w-[39px] h-[39px] bg-[rgba(37,99,235,0.1)] rounded flex items-center justify-center">
                  <Image
                    src="/assets/icons/type-icon.svg"
                    alt="Type"
                    width={18}
                    height={17}
                    className="w-[18px] h-[17px]"
                  />
                </div>
                <div>
                  <div className="text-xs text-[#B9C5D8]">Type</div>
                  <div className="text-sm font-semibold text-[#458EFF]">
                    Manwha
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg">
                <div className="w-[39px] h-[39px] bg-[rgba(244,184,60,0.1)] rounded flex items-center justify-center">
                  <Image
                    src="/assets/icons/score-icon.svg"
                    alt="Score"
                    width={18}
                    height={17}
                    className="w-[18px] h-[17px]"
                  />
                </div>
                <div>
                  <div className="text-xs text-[#B9C5D8]">Score</div>
                  <div className="text-sm font-semibold text-[#F4B83C]">
                    9.8
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex items-center gap-2 p-2 rounded-lg">
                <div className="w-[39px] h-[39px] bg-[rgba(87,222,137,0.1)] rounded flex items-center justify-center">
                  <Image
                    src="/assets/icons/status-icon.svg"
                    alt="Status"
                    width={18}
                    height={16}
                    className="w-[18px] h-[16px]"
                  />
                </div>
                <div>
                  <div className="text-xs text-[#B9C5D8]">Status</div>
                  <div className="text-sm font-semibold text-[#57DE89]">
                    Ongoing
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg">
                <div className="w-[39px] h-[39px] bg-[rgba(140,255,249,0.1)] rounded flex items-center justify-center">
                  <Image
                    src="/assets/icons/bookmarks-icon.svg"
                    alt="Bookmarks"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                </div>
                <div>
                  <div className="text-xs text-[#B9C5D8]">Bookmarks</div>
                  <div className="text-sm font-semibold text-[#8CFFF9]">24</div>
                </div>
              </div>

              {/* Row 3 */}
              <div className="flex items-center gap-2 p-2 rounded-lg">
                <div className="w-[39px] h-[39px] bg-[rgba(189,115,255,0.1)] rounded flex items-center justify-center">
                  <Image
                    src="/assets/icons/author-icon.svg"
                    alt="Author"
                    width={19}
                    height={17}
                    className="w-[19px] h-[17px]"
                  />
                </div>
                <div>
                  <div className="text-xs text-[#B9C5D8]">Author</div>
                  <div className="text-sm font-semibold text-[#BD73FF]">
                    Syaiatan/Seonwoon
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg">
                <div className="w-[39px] h-[39px] bg-[rgba(255,129,64,0.1)] rounded flex items-center justify-center">
                  <Image
                    src="/assets/icons/artist-icon.svg"
                    alt="Artist"
                    width={20}
                    height={19}
                    className="w-5 h-[19px]"
                  />
                </div>
                <div>
                  <div className="text-xs text-[#B9C5D8]">Artist</div>
                  <div className="text-sm font-semibold text-[#FF8140]">
                    2love/Redice Studio
                  </div>
                </div>
              </div>

              {/* Row 4 - Single item spanning full width */}
              <div className="col-span-2 flex items-center gap-2 p-2 rounded-lg">
                <div className="w-[39px] h-[39px] bg-[rgba(240,240,240,0.1)] rounded flex items-center justify-center">
                  <Image
                    src="/assets/icons/chapters-icon.svg"
                    alt="Chapters"
                    width={20}
                    height={19}
                    className="w-[20px] h-[19px]"
                  />
                </div>
                <div>
                  <div className="text-xs text-[#B9C5D8]">
                    Chapters Available
                  </div>
                  <div className="text-sm font-semibold text-[#F0F0F0]">
                    149
                  </div>
                </div>
              </div>
            </div>

            {/* Genres */}
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#1665F4] text-white px-2 py-1 rounded-full text-xs font-medium">
                  Action
                </span>
                <span className="bg-[#1665F4] text-white px-2 py-1 rounded-full text-xs font-medium">
                  Adventure
                </span>
                <span className="bg-[#1665F4] text-white px-2 py-1 rounded-full text-xs font-medium">
                  Regression
                </span>
                <span className="bg-[#1665F4] text-white px-2 py-1 rounded-full text-xs font-medium">
                  Fantasy
                </span>
              </div>
            </div>

            {/* Synopsis */}
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-[#F5F5F5]">
                Synopsis
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-[#B9C5D8] leading-[1.5] h-[125px] overflow-hidden">
                  Chung Myung, The 13th Disciple of the Mount Hua Sect, One of
                  the 3 Great Swordsmen, Plum Blossom Sword Saint, defeated Chun
                  Ma, who brought destruction and disarray onto the world. After
                  the battle, he breathes his last breath on top of the
                  headquarter mountain of the Heavenly Demon Sect. He is reborn
                  after 100 years in the body of a child. ......What? The Mount
                  Hua Sect has fallen? What kind of nonsense is that!?
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-[#3E4968] hover:bg-[#3E4968]/80 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 transition-colors"
                  aria-label="View more description"
                >
                  View More
                  <Image
                    src="/assets/icons/chevron-down.svg"
                    alt="Expand"
                    width={8}
                    height={4}
                    className="w-2 h-1"
                  />
                </button>
              </div>
            </div>

            {/* Official Sources */}
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-[#F5F5F5]">
                Official Sources
              </h3>
              <p className="text-sm text-[#B9C5D8]">
                No official sources available.
              </p>
            </div>

            {/* Alternative Titles */}
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-[#F5F5F5]">
                Alternative Titles
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-[#B9C5D8] leading-[1.5] h-[106px] overflow-hidden">
                  鐵血劍家獵犬的回歸 • Cheolhyeolgeomga Sanyanggaeui Hoegwi •
                  Demir kanlı kılıç tazısının i̇ntikamı • 回帰した鉄血の猟犬 •
                  铁血剑家猎犬的回归 • عودة الكلب ذي الدم الحديدي • Revenge of
                  the Sword Clan&apos;s Hound • Ang Paghihiganti ni VikVik • Ang
                  pagpanimalos sa Irong-buang • Cheolhyeol Geomga Sanyanggaeui
                  Hoegwi • Demir Kanlı Kılıç Tazısının İntikamı • Die Rückkehr
                  des Jagdhundes aus Eisen und Blut • Kuduz Hançerin İntikamı •
                  鐵血家族獵犬的重生 • A vingança do cão de caça de sangue de
                  ferro Baskerville
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-[#3E4968] hover:bg-[#3E4968]/80 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 transition-colors"
                  aria-label="View more titles"
                >
                  View More
                  <Image
                    src="/assets/icons/chevron-down.svg"
                    alt="Expand"
                    width={8}
                    height={4}
                    className="w-2 h-1"
                  />
                </button>
              </div>
            </div>

            {/* Report and Block Actions */}
            <div className="flex gap-3">
              <div className="flex items-center gap-1">
                <Flag className="w-4 h-4 text-[#F87166]" strokeWidth={2.5} />
                <span className="text-sm font-semibold text-[#F87166]">
                  Report
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Ban className="w-4 h-4 text-[#F89E66]" strokeWidth={2.5} />
                <span className="text-sm font-semibold text-[#F89E66]">
                  Block
                </span>
              </div>
            </div>

            {/* Pictures Section */}
            <div className="space-y-4">
              <FeaturedSlider
                title="Pictures"
                description="Art images"
                data={highlightsData}
                showRating={false}
                showStarRating={false}
                showTitle={false}
              />
            </div>

            {/* Recommended Titles Section */}
            <div className="space-y-4">
              <FeaturedSlider
                title="Recommended Titles"
                description="The Title that will get your heart pumped!"
                data={recommendedData}
                showRating={true}
                showStarRating={true}
                showTitle={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout (768px+) */}
      <div className="hidden md:flex justify-center min-h-screen pt-26">
         <div
            className={`absolute inset-0 transition-opacity duration-500 ease-out opacity-40`}
            style={{
              backgroundImage: `url('/assets/images/manga-cover.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              minHeight: "337px",
              maxHeight: "337px",
            }}
          />

          {/* Blur overlay */}
          <div className="absolute inset-0 backdrop-blur-sm" />
          {/* Bottom fade per Figma: 0% transparent #0A0F1C → 100% solid #0A0F1C */}
          <div className="absolute bottom-0 left-0 right-0 h-[422px] [box-shadow:0px_-4px_10px_0px_rgba(9,_9,_9,_1)_inset] pointer-events-none" />

        <div className="max-w-[1240px] w-full">
          {/* Main Container */}
          <div className="relative z-10 flex flex-col md:flex-row">
            {/* Left Side - Cover Image */}
            <div className="w-[256px] pb-6 ml-6 xl:ml-0">
              <div className="relative space-y-4">
                {/* Cover Image with Play Button */}
                <div className="relative w-[256px] h-[367px] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/assets/images/manga-cover.png"
                    alt="Return of the Mount Hua Sect"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-black/50" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      className="w-[60px] h-[60px] rounded-full flex items-center justify-center transition-colors"
                      aria-label="Play video"
                    >
                      <Image
                        src="/assets/icons/play-icon.svg"
                        alt="Play"
                        width={41}
                        height={41}
                        className="w-[41px] h-[41px] text-white"
                      />
                    </button>
                  </div>
                </div>

                {/* Add to Bookmarks Button */}
                <button
                  className="w-full mt-4 bg-[#1665F4] hover:bg-[#1665F4]/90 text-white font-semibold py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-colors shadow-lg"
                  aria-label="Add to bookmarks"
                >
                  <Image
                    src="/assets/icons/bookmark-icon.svg"
                    alt="Bookmark"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  Add to Bookmarks
                </button>

                {/* Metadata */}
                <div className="mt-4 space-y-4">
                  {/* Type */}
                  <div className="flex items-center gap-2">
                    <div className="w-[39px] h-[39px] bg-blue-500/10 rounded flex items-center justify-center">
                      <Image
                        src="/assets/icons/type-icon.svg"
                        alt="Type"
                        width={20}
                        height={19}
                        className="w-[20px] h-[19px]"
                        style={{ width: "20px", height: "19px" }}
                      />
                    </div>
                    <div>
                      <div className="text-xs text-[#B9C5D8]">Type</div>
                      <div className="text-sm font-semibold text-[#458EFF]">
                        Manwha
                      </div>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="flex items-center gap-2">
                    <div className="w-[39px] h-[39px] bg-yellow-500/10 rounded flex items-center justify-center">
                      <Image
                        src="/assets/icons/score-icon.svg"
                        alt="Score"
                        width={18}
                        height={17}
                        className="w-[18px] h-[17px]"
                      />
                    </div>
                    <div>
                      <div className="text-xs text-[#B9C5D8]">Score</div>
                      <div className="text-sm font-semibold text-[#F4B83C]">
                        9.8
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <div className="w-[39px] h-[39px] bg-green-500/10 rounded flex items-center justify-center">
                      <Image
                        src="/assets/icons/status-icon.svg"
                        alt="Status"
                        width={18}
                        height={16}
                        className="w-[18px] h-[16px]"
                      />
                    </div>
                    <div>
                      <div className="text-xs text-[#B9C5D8]">Status</div>
                      <div className="text-sm font-semibold text-[#57DE89]">
                        Ongoing
                      </div>
                    </div>
                  </div>

                  {/* Bookmarks */}
                  <div className="flex items-center gap-2">
                    <div className="w-[39px] h-[39px] bg-cyan-500/10 rounded flex items-center justify-center">
                      <Image
                        src="/assets/icons/bookmarks-icon.svg"
                        alt="Bookmarks"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    </div>
                    <div>
                      <div className="text-xs text-[#B9C5D8]">Bookmarks</div>
                      <div className="text-sm font-semibold text-[#8CFFF9]">
                        24
                      </div>
                    </div>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-2">
                    <div className="w-[39px] h-[39px] bg-purple-500/10 rounded flex items-center justify-center">
                      <Image
                        src="/assets/icons/author-icon.svg"
                        alt="Author"
                        width={19}
                        height={17}
                        className="w-[19px] h-[17px]"
                      />
                    </div>
                    <div>
                      <div className="text-xs text-[#B9C5D8]">Author</div>
                      <div className="text-sm font-semibold text-[#BD73FF]">
                        Syaiatan/Seonwoon
                      </div>
                    </div>
                  </div>

                  {/* Artist */}
                  <div className="flex items-center gap-2">
                    <div className="w-[39px] h-[39px] bg-orange-500/10 rounded flex items-center justify-center">
                      <Image
                        src="/assets/icons/artist-icon.svg"
                        alt="Artist"
                        width={20}
                        height={19}
                        className="w-5 h-[19px]"
                      />
                    </div>
                    <div>
                      <div className="text-xs text-[#B9C5D8]">Artist</div>
                      <div className="text-sm font-semibold text-[#FF8140]">
                        2love/Redice Studio
                      </div>
                    </div>
                  </div>

                  {/* Chapters Available */}
                  <div className="flex items-center gap-2">
                    <div className="w-[39px] h-[39px] bg-gray-500/10 rounded flex items-center justify-center">
                      <Image
                        src="/assets/icons/chapters-icon.svg"
                        alt="Chapters"
                        width={20}
                        height={19}
                        className="w-[20px] h-[19px]"
                        style={{ width: "20px", height: "19px" }}
                      />
                    </div>
                    <div>
                      <div className="text-xs text-[#B9C5D8]">
                        Chapters Available
                      </div>
                      <div className="text-sm font-semibold text-[#F0F0F0]">
                        149
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="pb-6 xl:pl-6 xl:pr-0 px-6 flex-1 min-w-0">
              {/* Header Section */}
              <div className="flex flex-col gap-4 justify-between">
                <div className="flex flex-col">
                  <h1 className="text-[32px] font-semibold text-[#F5F5F5] leading-[1.19] mb-4">
                    Return of the Mount Hua Sect
                  </h1>

                  {/* Alternative Titles */}
                  <div className="mb-4">
                    <h3 className="text-base font-semibold text-[#F5F5F5] mb-2">
                      Alternative Titles
                    </h3>
                    <div className="flex items-end gap-1">
                      <p className="text-sm text-[#B9C5D8] leading-[1.5] flex-1">
                        I am a • Cheolhyeolgeomga Sanyanggaeui Hoegwi • Demir
                        kanlı kılıç tazısının i̇ntikamı • 回帰した鉄血の猟犬 •
                        铁血剑家猎犬的回归 • عودة الكلب ذي الدم الحديدي •
                        Revenge of the Sword Clan&apos;s Hound
                      </p>
                      <button
                        className="bg-[#3E4968] hover:bg-[#3E4968]/80 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 transition-colors"
                        aria-label="View more titles"
                      >
                        + 7 titles
                        <Image
                          src="/assets/icons/chevron-down.svg"
                          alt="Expand"
                          width={8}
                          height={4}
                          className="w-2 h-1"
                        />
                      </button>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-2 h-[25px]">
                    <div className="bg-[#FF8140] text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium">
                      <Image
                        src="/assets/icons/fire-icon.svg"
                        alt="Fire"
                        width={12}
                        height={14}
                        className="w-3 h-[14px]"
                      />
                      Popularity #3
                    </div>
                    <div className="bg-[#FFBF36] text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium">
                      <Image
                        src="/assets/icons/star-icon.svg"
                        alt="Star"
                        width={12}
                        height={12}
                        className="w-3 h-3"
                      />
                      Rating #7
                    </div>
                  </div>
                </div>
                {/* Tabs */}
                <div className="">
                  <div className="bg-transparent border-b border-[#334155] flex">
                    <button
                      className={`px-6 py-3 text-base font-semibold transition-colors border-b-2 ${
                        activeTab === "overview"
                          ? "text-[#0064FF] border-[#0064FF]"
                          : "text-[#CFD9E9] border-transparent hover:text-white"
                      }`}
                      onClick={() => setActiveTab("overview")}
                    >
                      Overview
                    </button>
                    <button
                      className={`px-6 py-3 text-base font-semibold transition-colors ${
                        activeTab === "chapters"
                          ? "text-[#0064FF] border-b-2 border-[#0064FF]"
                          : "text-[#CFD9E9] hover:text-white"
                      }`}
                      onClick={() => setActiveTab("chapters")}
                    >
                      Chapters
                    </button>
                    <button
                      className={`px-6 py-3 text-base font-semibold transition-colors relative ${
                        activeTab === "reviews"
                          ? "text-[#0064FF] border-b-2 border-[#0064FF]"
                          : "text-[#CFD9E9] hover:text-white"
                      }`}
                      onClick={() => setActiveTab("reviews")}
                    >
                      Reviews
                      <span className="ml-2 bg-white/10 text-[#CFD9E9] text-sm px-2 py-0.5 rounded-full">
                        20
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="space-y-6 py-6 w-full">
                {/* Synopsis */}
                <div className="space-y-4">
                  <h3 className="text-base font-semibold text-[#F5F5F5] mb-2">
                    Synopsis
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm text-[#B9C5D8] leading-[1.5]">
                      Chung Myung, The 13th Disciple of the Mount Hua Sect, One
                      of the 3 Great Swordsmen, Plum Blossom Sword Saint,
                      defeated Chun Ma, who brought destruction and disarray
                      onto the world. After the battle, he breathes his last
                      breath on top of the headquarter mountain of the Heavenly
                      Demon Sect.
                    </p>
                    <p className="text-sm text-[#B9C5D8] leading-[1.5]">
                      He is reborn after 100 years in the body of a child.
                      ......What? The Mount Hua Sect has fallen? What kind of
                      nonsense is that!? Chung Myung, The 13th Disciple of the
                      Mount Hua Sect, One of the 3 Great Swordsmen, Plum Blossom
                      Sword Saint, defeated Chun Ma, who brought destruction and
                      disarray onto the world. After the battle, he breathes his
                      last breath on top of the headquarter mountain of the
                      Heavenly Demon Sect.
                    </p>
                    <p className="text-sm text-[#B9C5D8] leading-[1.5]">
                      He is reborn after 100 years in the body of a child.
                      ......What? The Mount Hua Sect has fallen? What kind of
                      nonsense is that!?
                    </p>
                  </div>
                  <button
                    className="justify-self-end bg-[#3E4968] w-[91px] h-[21px] hover:bg-[#3E4968]/80 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 transition-colors"
                    aria-label="View more description"
                  >
                    View More
                    <Image
                      src="/assets/icons/chevron-down.svg"
                      alt="Expand"
                      width={8}
                      height={4}
                      className="w-2 h-1"
                    />
                  </button>
                </div>

                {/* Genres */}
                <div>
                  <h3 className="text-base font-semibold text-[#F5F5F5] mb-2">
                    Genres
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#1665F4] text-white px-3 py-1 rounded-full text-sm font-medium">
                      Action
                    </span>
                    <span className="bg-[#1665F4] text-white px-3 py-1 rounded-full text-sm font-medium">
                      Adventure
                    </span>
                    <span className="bg-[#1665F4] text-white px-3 py-1 rounded-full text-sm font-medium">
                      Regression
                    </span>
                    <span className="bg-[#1665F4] text-white px-3 py-1 rounded-full text-sm font-medium">
                      Fantasy
                    </span>
                  </div>
                </div>

                {/* Official Sources */}
                <div>
                  <h3 className="text-base font-semibold text-[#F5F5F5] mb-2">
                    Official Sources
                  </h3>
                  <p className="text-sm text-[#B9C5D8]">
                    No official sources available.
                  </p>
                </div>

                {/* Highlights Section */}

                <FeaturedSlider
                  title="Highlights"
                  description="Art images"
                  data={highlightsData}
                  showRating={false}
                  showStarRating={false}
                  showTitle={false}
                />

                {/* Recommended Titles Section */}
                <FeaturedSlider
                  title="Recommended Titles"
                  description="The Title that will get your heart pumped!"
                  data={recommendedData}
                  showRating={true}
                  showStarRating={true}
                  showTitle={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseSection;
