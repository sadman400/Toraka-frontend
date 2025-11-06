"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, UpdateIcon } from "@radix-ui/react-icons";
import { SearchInput } from "../ui";
import {
  LayoutGrid,
  LayoutList,
  Minus,
  Plus,
  RefreshCw,
  Settings,
  SlidersHorizontal,
  SquarePenIcon,
  X,
} from "lucide-react";
import useScreenSizer from "@/lib/useScreenSizer";
import {
  StatusFilter,
  SortByFilter,
  PublicationStatusFilter,
  GenresFilter,
  SourcesFilter,
  CustomTagsFilter,
  HideSeriesFilter,
  ContentTypeFilter,
  MobileFilterSidebar,
} from "@/components/filters";
import {
  FilterState,
  PUBLICATION_STATUS_OPTIONS,
  SOURCE_OPTIONS,
  CUSTOM_TAG_OPTIONS,
  HIDE_SERIES_OPTIONS,
  GENRE_OPTIONS,
} from "@/types/filters";
import { Bookmark, bookmarksData } from "@/data/mockData";
import { BookmarkGridView, BookmarkListView } from "../bookmarks";
import {
  BookmarkActionsModal,
  BookReadModal,
  BulkEditModal,
  BookmarkSettingsModal,
  DeleteConfirmationModal,
} from "../modals";
import ListOption from "../common/ListOption";
import { SeriesStatusFilter } from "../filters/SeriesStatusFilter";
import { SearchModal } from "../layout/search-modal";
import Image from "next/image";

export function BookmarksSection() {
  const [selectedItems, setSelectedItems] = React.useState<number[]>([]);
  const screenSize = useScreenSizer();

  const [layout, setLayout] = React.useState("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isActionsModalOpen, setIsActionsModalOpen] = React.useState(false);
  const [isBulkEditModalOpen, setIsBulkEditModalOpen] = React.useState(false);
  const [isReadModalOpen, setIsReadModalOpen] = React.useState(false);
  const [isBookmarkSettingsModalOpen, setIsBookmarkSettingsModalOpen] =
    React.useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = React.useState(false);

  // Local state for bookmarks to allow updates
  const [bookmarks, setBookmarks] = React.useState<Bookmark[]>(bookmarksData);

  const [selectedItem, setSelectedItem] = React.useState<Bookmark | null>(null);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  // Filter state
  const [filters, setFilters] = React.useState<FilterState>({
    status: null, // Start with placeholder
    sortBy: null, // Start with placeholder
    publicationStatus: PUBLICATION_STATUS_OPTIONS,
    sources: SOURCE_OPTIONS,
    customTags: CUSTOM_TAG_OPTIONS,
    hideSeries: HIDE_SERIES_OPTIONS,
    contentType: null,
    genres: GENRE_OPTIONS,
  });

  const handleLayoutChange = (newLayout: string) => {
    setLayout(newLayout);
  };

  // Handle refresh button click
  const handleRefresh = async () => {
    setIsRefreshing(true);

    // Simulate refresh action (you can replace this with actual refresh logic)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsRefreshing(false);
  };

  const toggleSelection = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Handle chapter change
  const handleChapterChange = (bookmarkId: number, newChapter: number) => {
    setBookmarks((prev) =>
      prev.map((bookmark) =>
        bookmark.id === bookmarkId
          ? { ...bookmark, currentChapter: newChapter }
          : bookmark
      )
    );
  };

  // Modal action handlers
  const handleSetToLastRead = () => {
    console.log("Set to last read for selected items:", selectedItems);
    // Add your logic here
  };

  const handleEdit = () => {
    setIsBulkEditModalOpen(true);
  };

  const handleEditSelection = (id: number) => {
    setSelectedItem(
      filteredBookmarks.find((bookmark) => bookmark.id === id) || null
    );
    setIsReadModalOpen(true);
  };

  const handleBulkUpdate = (status: string) => {
    console.log(
      "Bulk update selected items:",
      selectedItems,
      "to status:",
      status
    );
    // Add your bulk update logic here
    setSelectedItems([]);
  };

  const handleDelete = () => {
    if (showDeleteModal) setShowDeleteModal(false);
    setShowDeleteModal(true);
  };

  // Filter logic
  const filteredBookmarks = React.useMemo(() => {
    let filtered = [...bookmarks];

    // Status filter
    if (filters.status !== null && filters.status !== "all") {
      filtered = filtered.filter(
        (bookmark) => bookmark.readingStatus === filters.status
      );
    }

    // Publication status filter
    const selectedPublicationStatuses = filters.publicationStatus
      .filter((item) => item.selected)
      .map((item) => item.value);
    if (selectedPublicationStatuses.length > 0) {
      filtered = filtered.filter((bookmark) =>
        selectedPublicationStatuses.includes(bookmark.publicationStatus)
      );
    }

    // Sources filter
    const selectedSources = filters.sources
      .filter((item) => item.selected)
      .map((item) => item.value);
    if (selectedSources.length > 0) {
      filtered = filtered.filter((bookmark) =>
        selectedSources.includes(bookmark.source)
      );
    }

    // Custom tags filter
    const selectedTags = filters.customTags
      .filter((item) => item.selected)
      .map((item) => item.value);
    if (selectedTags.length > 0) {
      filtered = filtered.filter((bookmark) =>
        selectedTags.some((tag) => bookmark.tags.includes(tag))
      );
    }

    // Content type filter
    if (filters.contentType) {
      filtered = filtered.filter(
        (bookmark) => bookmark.contentType === filters.contentType
      );
    }

    // Sort by filter - default to last-read if null
    const sortBy = filters.sortBy || "last-read";
    switch (sortBy) {
      case "last-read":
        filtered.sort((a, b) => b.lastRead.getTime() - a.lastRead.getTime());
        break;
      case "title-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "recently-added":
        filtered.sort((a, b) => b.addedDate.getTime() - a.addedDate.getTime());
        break;
      default:
        break;
    }

    return filtered;
  }, [filters, bookmarks]);

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      status: null, // Reset to placeholder
      sortBy: null, // Reset to placeholder
      publicationStatus: PUBLICATION_STATUS_OPTIONS,
      sources: SOURCE_OPTIONS,
      customTags: CUSTOM_TAG_OPTIONS,
      hideSeries: HIDE_SERIES_OPTIONS,
      contentType: null,
      genres: GENRE_OPTIONS,
    });
  };

  // Check if any filters are active
  const hasActiveFilters = React.useMemo(() => {
    return (
      filters.status !== null ||
      filters.sortBy !== null ||
      filters.publicationStatus.some((item) => item.selected) ||
      filters.sources.some((item) => item.selected) ||
      filters.customTags.some((item) => item.selected) ||
      filters.hideSeries.some((item) => item.selected) ||
      filters.contentType !== null
    );
  }, [filters]);

  return (
    <div className="max-w-[1240px] space-y-4 py-6 xl:px-0 px-5 w-full pt-26">
      {/* Header Section */}
      <div className="rounded-xl p-6 gap-4 bg-gradient-to-r from-[#0E1628] to-[#122046]">
        <div className="flex flex-col gap-4">
          {/* Title and Count */}
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-medium text-white tracking-tight">
              Bookmarks
            </h1>
            <div className="bg-[#3E4968] rounded-lg min-w-[22px] h-[22px] flex items-center justify-center">
              <span className="text-white text-base font-normal px-1 py-1">
                {filteredBookmarks.length}
              </span>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col gap-3">
            {/* Desktop Layout */}
            {screenSize === "desktop" && (
              <>
                {/* First Row - Main Filters + View Toggle + Search */}
                <div className="flex items-center justify-between">
                  {/* Left Side - Main Filters */}
                  <div className="flex items-center gap-2">
                    {/* Status Filter */}
                    <StatusFilter
                      value={filters.status}
                      onChange={(value) =>
                        setFilters((prev) => ({ ...prev, status: value }))
                      }
                      className="w-[166px] cursor-pointer"
                    />

                    {/* Sort By Filter */}
                    <SortByFilter
                      value={filters.sortBy}
                      onChange={(value) =>
                        setFilters((prev) => ({ ...prev, sortBy: value }))
                      }
                      className="w-[166px] cursor-pointer"
                    />

                    <SeriesStatusFilter
                      value={filters.sortBy}
                      onChange={(value) =>
                        setFilters((prev) => ({ ...prev, sortBy: value }))
                      }
                      className="w-[166px] cursor-pointer"
                    />
                  </div>

                  {/* Right Side - View Toggle + Search */}
                  <div className="flex items-center gap-3">
                    {/* Settings Icon */}
                    <div className="flex justify-end">
                      <button
                        onClick={() => setIsBookmarkSettingsModalOpen(true)}
                        className="w-11 h-11 bg-[#141B2F] rounded-md border border-[#334155] flex items-center justify-center hover:bg-[#1A2436]/90 transition-colors"
                      >
                        <Image
                          src="/assets/icons/settings.png"
                          alt="Settings"
                          width={16}
                          height={16}
                        />
                      </button>
                    </div>
                    {/* View Toggle */}
                    <div className="flex items-center bg-[#141B2F] border border-[#334155] rounded-md p-1 h-[45px]">
                      <Button
                        aria-label="Grid view"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLayoutChange("grid")}
                        className={`${
                          layout === "grid"
                            ? "bg-[#1665F4] text-white rounded-sm"
                            : "bg-[#141B2F] text-[#CFD9E9]"
                        } h-8 px-3`}
                      >
                        <svg
                          width="16"
                          height="17"
                          viewBox="0 0 16 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2.25 0.5C1.65326 0.5 1.08097 0.737053 0.65901 1.15901C0.237053 1.58097 0 2.15326 0 2.75V5.25C0 5.84674 0.237053 6.41903 0.65901 6.84099C1.08097 7.26295 1.65326 7.5 2.25 7.5H4.75C5.34674 7.5 5.91903 7.26295 6.34099 6.84099C6.76295 6.41903 7 5.84674 7 5.25V2.75C7 2.15326 6.76295 1.58097 6.34099 1.15901C5.91903 0.737053 5.34674 0.5 4.75 0.5H2.25ZM2.25 9.5C1.65326 9.5 1.08097 9.73705 0.65901 10.159C0.237053 10.581 0 11.1533 0 11.75V14.25C0 14.8467 0.237053 15.419 0.65901 15.841C1.08097 16.2629 1.65326 16.5 2.25 16.5H4.75C5.34674 16.5 5.91903 16.2629 6.34099 15.841C6.76295 15.419 7 14.8467 7 14.25V11.75C7 11.1533 6.76295 10.581 6.34099 10.159C5.91903 9.73705 5.34674 9.5 4.75 9.5H2.25ZM11.25 0.5C10.6533 0.5 10.081 0.737053 9.65901 1.15901C9.23705 1.58097 9 2.15326 9 2.75V5.25C9 5.84674 9.23705 6.41903 9.65901 6.84099C10.081 7.26295 10.6533 7.5 11.25 7.5H13.75C14.3467 7.5 14.919 7.26295 15.341 6.84099C15.7629 6.41903 16 5.84674 16 5.25V2.75C16 2.15326 15.7629 1.58097 15.341 1.15901C14.919 0.737053 14.3467 0.5 13.75 0.5H11.25ZM11.25 9.5C10.6533 9.5 10.081 9.73705 9.65901 10.159C9.23705 10.581 9 11.1533 9 11.75V14.25C9 14.8467 9.23705 15.419 9.65901 15.841C10.081 16.2629 10.6533 16.5 11.25 16.5H13.75C14.3467 16.5 14.919 16.2629 15.341 15.841C15.7629 15.419 16 14.8467 16 14.25V11.75C16 11.1533 15.7629 10.581 15.341 10.159C14.919 9.73705 14.3467 9.5 13.75 9.5H11.25Z"
                            fill={layout === "grid" ? "#fff" : "#CFD9E9"}
                          />
                        </svg>
                      </Button>
                      <Button
                        aria-label="List view"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLayoutChange("list")}
                        className={` ${
                          layout === "list"
                            ? "bg-[#1665F4] text-white rounded-sm"
                            : "bg-[#141B2F] text-[#CFD9E9]"
                        }`}
                      >
                        <svg
                          width="16"
                          height="17"
                          viewBox="0 0 16 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 3C0 2.33696 0.263392 1.70107 0.732233 1.23223C1.20107 0.763392 1.83696 0.5 2.5 0.5H13.5C14.163 0.5 14.7989 0.763392 15.2678 1.23223C15.7366 1.70107 16 2.33696 16 3C16 3.66304 15.7366 4.29893 15.2678 4.76777C14.7989 5.23661 14.163 5.5 13.5 5.5H2.5C1.83696 5.5 1.20107 5.23661 0.732233 4.76777C0.263392 4.29893 0 3.66304 0 3ZM0.75 7.583C0.551088 7.583 0.360322 7.66202 0.21967 7.80267C0.0790175 7.94332 0 8.13409 0 8.333C0 8.53191 0.0790175 8.72268 0.21967 8.86333C0.360322 9.00398 0.551088 9.083 0.75 9.083H15.25C15.4489 9.083 15.6397 9.00398 15.7803 8.86333C15.921 8.72268 16 8.53191 16 8.333C16 8.13409 15.921 7.94332 15.7803 7.80267C15.6397 7.66202 15.4489 7.583 15.25 7.583H0.75ZM0.75 11.163C0.551088 11.163 0.360322 11.242 0.21967 11.3827C0.0790175 11.5233 0 11.7141 0 11.913C0 12.1119 0.0790175 12.3027 0.21967 12.4433C0.360322 12.584 0.551088 12.663 0.75 12.663H15.25C15.4489 12.663 15.6397 12.584 15.7803 12.4433C15.921 12.3027 16 12.1119 16 11.913C16 11.7141 15.921 11.5233 15.7803 11.3827C15.6397 11.242 15.4489 11.163 15.25 11.163H0.75ZM0.75 14.75C0.551088 14.75 0.360322 14.829 0.21967 14.9697C0.0790175 15.1103 0 15.3011 0 15.5C0 15.6989 0.0790175 15.8897 0.21967 16.0303C0.360322 16.171 0.551088 16.25 0.75 16.25H15.25C15.4489 16.25 15.6397 16.171 15.7803 16.0303C15.921 15.8897 16 15.6989 16 15.5C16 15.3011 15.921 15.1103 15.7803 14.9697C15.6397 14.829 15.4489 14.75 15.25 14.75H0.75Z"
                            fill={layout !== "grid" ? "#fff" : "#CFD9E9"}
                          />
                        </svg>
                      </Button>
                    </div>

                    {/* Search */}
                    <SearchInput
                      placeholder="Search series"
                      showKeyboardShortcut={false}
                      // onFocus={() => setIsSearchModalOpen(true)}
                      className={cn(
                        "h-[45px] bg-[#141b2f] w-[270px] border-1 border-[#334155] text-base text-[#878F9C] placeholder:text-[#878F9C] rounded-lg focus:outline-none"
                      )}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Mobile & Tablet Layout - Based on Figma Design */}
            {(screenSize === "mobile" ||
              screenSize === "tablet" ||
              screenSize === "laptop") && (
              <div className="flex flex-col gap-3">
                {/* First Row - Search Button */}

                {/* Second Row - View Toggle and Apply Filters */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 w-full">
                    <SearchInput
                      placeholder="Search series"
                      showKeyboardShortcut={false}
                      // onFocus={() => setIsSearchModalOpen(true)}
                      className={cn(
                        "h-[45px] bg-[#141b2f] border-1 border-[#334155] text-base placeholder:text-[#878F9C] rounded-lg focus:outline-none w-full"
                      )}
                    />
                  </div>
                  {/* View Toggle */}
                  <div className="flex items-center bg-[#1A2436] border border-[#334155] rounded-md p-1 h-[45px]">
                    <Button
                      aria-label="Grid view"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLayoutChange("grid")}
                      className={`${
                        layout === "grid"
                          ? "bg-[#1665F4] text-white rounded-sm"
                          : "bg-[#1A2436] text-[#CFD9E9]"
                      } h-8 px-3`}
                    >
                      <svg
                          width="16"
                          height="17"
                          viewBox="0 0 16 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2.25 0.5C1.65326 0.5 1.08097 0.737053 0.65901 1.15901C0.237053 1.58097 0 2.15326 0 2.75V5.25C0 5.84674 0.237053 6.41903 0.65901 6.84099C1.08097 7.26295 1.65326 7.5 2.25 7.5H4.75C5.34674 7.5 5.91903 7.26295 6.34099 6.84099C6.76295 6.41903 7 5.84674 7 5.25V2.75C7 2.15326 6.76295 1.58097 6.34099 1.15901C5.91903 0.737053 5.34674 0.5 4.75 0.5H2.25ZM2.25 9.5C1.65326 9.5 1.08097 9.73705 0.65901 10.159C0.237053 10.581 0 11.1533 0 11.75V14.25C0 14.8467 0.237053 15.419 0.65901 15.841C1.08097 16.2629 1.65326 16.5 2.25 16.5H4.75C5.34674 16.5 5.91903 16.2629 6.34099 15.841C6.76295 15.419 7 14.8467 7 14.25V11.75C7 11.1533 6.76295 10.581 6.34099 10.159C5.91903 9.73705 5.34674 9.5 4.75 9.5H2.25ZM11.25 0.5C10.6533 0.5 10.081 0.737053 9.65901 1.15901C9.23705 1.58097 9 2.15326 9 2.75V5.25C9 5.84674 9.23705 6.41903 9.65901 6.84099C10.081 7.26295 10.6533 7.5 11.25 7.5H13.75C14.3467 7.5 14.919 7.26295 15.341 6.84099C15.7629 6.41903 16 5.84674 16 5.25V2.75C16 2.15326 15.7629 1.58097 15.341 1.15901C14.919 0.737053 14.3467 0.5 13.75 0.5H11.25ZM11.25 9.5C10.6533 9.5 10.081 9.73705 9.65901 10.159C9.23705 10.581 9 11.1533 9 11.75V14.25C9 14.8467 9.23705 15.419 9.65901 15.841C10.081 16.2629 10.6533 16.5 11.25 16.5H13.75C14.3467 16.5 14.919 16.2629 15.341 15.841C15.7629 15.419 16 14.8467 16 14.25V11.75C16 11.1533 15.7629 10.581 15.341 10.159C14.919 9.73705 14.3467 9.5 13.75 9.5H11.25Z"
                            fill={layout === "grid" ? "#fff" : "#CFD9E9"}
                          />
                        </svg>
                    </Button>
                    <Button
                      aria-label="List view"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLayoutChange("list")}
                      className={` ${
                        layout === "list"
                          ? "bg-[#1665F4] text-white rounded-sm"
                          : "bg-[#1A2436] text-[#CFD9E9]"
                      }`}
                    >
                                              <svg
                          width="16"
                          height="17"
                          viewBox="0 0 16 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 3C0 2.33696 0.263392 1.70107 0.732233 1.23223C1.20107 0.763392 1.83696 0.5 2.5 0.5H13.5C14.163 0.5 14.7989 0.763392 15.2678 1.23223C15.7366 1.70107 16 2.33696 16 3C16 3.66304 15.7366 4.29893 15.2678 4.76777C14.7989 5.23661 14.163 5.5 13.5 5.5H2.5C1.83696 5.5 1.20107 5.23661 0.732233 4.76777C0.263392 4.29893 0 3.66304 0 3ZM0.75 7.583C0.551088 7.583 0.360322 7.66202 0.21967 7.80267C0.0790175 7.94332 0 8.13409 0 8.333C0 8.53191 0.0790175 8.72268 0.21967 8.86333C0.360322 9.00398 0.551088 9.083 0.75 9.083H15.25C15.4489 9.083 15.6397 9.00398 15.7803 8.86333C15.921 8.72268 16 8.53191 16 8.333C16 8.13409 15.921 7.94332 15.7803 7.80267C15.6397 7.66202 15.4489 7.583 15.25 7.583H0.75ZM0.75 11.163C0.551088 11.163 0.360322 11.242 0.21967 11.3827C0.0790175 11.5233 0 11.7141 0 11.913C0 12.1119 0.0790175 12.3027 0.21967 12.4433C0.360322 12.584 0.551088 12.663 0.75 12.663H15.25C15.4489 12.663 15.6397 12.584 15.7803 12.4433C15.921 12.3027 16 12.1119 16 11.913C16 11.7141 15.921 11.5233 15.7803 11.3827C15.6397 11.242 15.4489 11.163 15.25 11.163H0.75ZM0.75 14.75C0.551088 14.75 0.360322 14.829 0.21967 14.9697C0.0790175 15.1103 0 15.3011 0 15.5C0 15.6989 0.0790175 15.8897 0.21967 16.0303C0.360322 16.171 0.551088 16.25 0.75 16.25H15.25C15.4489 16.25 15.6397 16.171 15.7803 16.0303C15.921 15.8897 16 15.6989 16 15.5C16 15.3011 15.921 15.1103 15.7803 14.9697C15.6397 14.829 15.4489 14.75 15.25 14.75H0.75Z"
                            fill={layout !== "grid" ? "#fff" : "#CFD9E9"}
                          />
                        </svg>
                    </Button>
                  </div>
                </div>
                {/* Apply Filters Button */}
                <Button
                  aria-label="Apply filters"
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="flex-1 h-[41px] px-3 bg-[#1A2436] border border-[#334155] text-white hover:bg-[#1A2436]/90 flex items-center justify-center gap-2 font-medium"
                >
                  <span>Apply Filters</span>
                  <Image
                    src="/assets/icons/filter.png"
                    alt="Filter"
                    width={12}
                    height={12}
                  />
                </Button>
              </div>
            )}

            {/* Second Row - Additional Filters + Action Buttons (Desktop Only) */}
            {screenSize === "desktop" && (
              <div className="flex justify-between">
                {/* Left Side - Additional Filters */}
                <div className="flex  gap-2 flex-wrap">
                  {/* Publication Status Filter */}
                  <PublicationStatusFilter
                    className="cursor-pointer"
                    value={filters.publicationStatus}
                    onChange={(value) =>
                      setFilters((prev) => ({
                        ...prev,
                        publicationStatus: value,
                      }))
                    }
                  />

                  {/* Genres Filter */}
                  {/* <GenresFilter
                    className="cursor-pointer"
                    value={filters.genres}
                    onChange={(value) =>
                      setFilters((prev) => ({
                        ...prev,
                        genres: value,
                      }))
                    }
                  /> */}

                  <SourcesFilter
                    value={filters.sources}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, sources: value }))
                    }
                  />

                  <CustomTagsFilter
                    className="cursor-pointer"
                    value={filters.customTags}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, customTags: value }))
                    }
                  />

                  <HideSeriesFilter
                    className="cursor-pointer"
                    value={filters.hideSeries}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, hideSeries: value }))
                    }
                  />

                  <ContentTypeFilter
                    className="cursor-pointer"
                    value={filters.contentType}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, contentType: value }))
                    }
                  />
                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      onClick={clearAllFilters}
                      className="h-[45px] px-4 bg-[#D53030] border-[#334155] text-white flex items-center gap-2"
                      aria-label="Remove filters"
                    >
                      <span className="font-medium">Remove Filters</span>
                      <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                        <X className="w-3 h-3 text-[#D53030]" />
                      </div>
                    </Button>
                  )}
                </div>

                {/* Right Side - Action Buttons */}
                <div className="relative">
                  {/* Selected Items Actions (ListOption) */}
                  <div
                    className={`transform transition-all duration-500 ease-out ${
                      selectedItems.length > 0
                        ? "opacity-100 scale-100 translate-x-0 blur-0 pointer-events-auto"
                        : "opacity-0 scale-90 translate-x-8 blur-sm pointer-events-none absolute inset-0"
                    }`}
                    style={{
                      transitionDelay:
                        selectedItems.length > 0 ? "100ms" : "0ms",
                    }}
                  >
                    <ListOption
                      variant="default"
                      backgroundColor="#1A2436"
                      onBookOpen={handleSetToLastRead}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      itemOption={true}
                    />
                  </div>

                  {/* Default Actions */}
                  <div
                    className={`transform transition-all duration-500 ease-out ${
                      selectedItems.length === 0
                        ? "opacity-100 scale-100 translate-x-0 blur-0 pointer-events-auto"
                        : "opacity-0 scale-90 translate-x-8 blur-sm pointer-events-none absolute inset-0"
                    }`}
                    style={{
                      transitionDelay:
                        selectedItems.length === 0 ? "100ms" : "0ms",
                    }}
                  >
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="h-[45px] px-4 bg-[#141b2f] border-[#334155] text-white hover:bg-[#1A2436]/90 flex items-center gap-2 transform transition-all duration-200 hover:scale-105"
                        onClick={handleRefresh}
                        aria-label="Refresh"
                      >
                        <RefreshCw
                          className={`w-5 h-5 transition-transform duration-300 ${
                            isRefreshing ? "animate-spin" : ""
                          }`}
                        />
                        <span className="font-medium">Refresh</span>
                      </Button>

                      <Button className="h-[45px] px-4 bg-[#1665F4] text-white hover:bg-[#1665F4]/90 flex items-center gap-2 font-semibold transform transition-all duration-200 hover:scale-105" aria-label="Add manga">
                        <div className="w-4 h-4 rounded-full bg-white">
                          <Plus className="w-4 h-4 text-[#1665F4]" />
                        </div>
                        <span>Add Manga</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bookmarks List */}
      {layout === "list" && (
        <div className="flex flex-col space-y-4">
          {selectedItems.length > 0 ? (
            <div className="flex flex-row gap-3">
              <div className="w-6 h-6 rounded-sm bg-[#1665F4] flex items-center justify-center cursor-pointer hover:bg-[#1665F4]/90">
                <Minus
                  className="w-4 h-4 text-white cursor-pointer"
                  onClick={() => setSelectedItems([])}
                />
              </div>
              <p>{selectedItems.length} Selected Entries</p>
            </div>
          ) : (
            <div className="flex flex-row gap-3">
              <div
                className="w-6 h-6 cursor-pointer rounded-sm border border-[#334155] hover:bg-[#1A2436] flex items-center justify-center"
                onClick={() =>
                  setSelectedItems(
                    filteredBookmarks.map((bookmark) => bookmark.id)
                  )
                }
              ></div>
              <p>{filteredBookmarks.length} Bookmarks Showing</p>
            </div>
          )}
          <BookmarkListView
            bookmarks={filteredBookmarks}
            selectedItems={selectedItems}
            onToggleSelection={toggleSelection}
            onEditSelection={handleEditSelection}
            onChapterChange={handleChapterChange}
          />
        </div>
      )}
      {/* Bookmarks Grid */}
      {layout === "grid" && (
        <BookmarkGridView
          screenSize={screenSize}
          bookmarks={filteredBookmarks}
          selectedItems={selectedItems}
          onToggleSelection={toggleSelection}
          onEditSelection={handleEditSelection}
          onChapterChange={handleChapterChange}
        />
      )}

      {/* Mobile Filter Sidebar */}
      <MobileFilterSidebar
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={clearAllFilters}
        hasActiveFilters={hasActiveFilters}
        onBookmarkSettings={() => setIsBookmarkSettingsModalOpen(true)}
      />
      {selectedItems.length > 0 &&
        !isMobileFilterOpen &&
        (layout === "grid" || layout === "list") &&
        (screenSize === "mobile" ||
          screenSize === "tablet" ||
          screenSize === "laptop") && (
          <button
            onClick={() => setIsActionsModalOpen(true)}
            className="h-11 w-11 bg-[#1665F4] rounded-lg flex items-center justify-center cursor-pointer fixed bottom-[24px] right-[20px] z-50 hover:bg-[#1665F4]/90 transition-colors"
          >
            <Image
              src="/assets/icons/IconEditSmall1.png"
              alt="Settings"
              width={18}
              height={18}
            />
          </button>
        )}
      {selectedItems.length === 0 &&
        !isMobileFilterOpen &&
        (screenSize === "mobile" ||
          screenSize === "tablet" ||
          screenSize === "laptop") && (
          <div className="fixed bottom-[24px] right-[20px] z-50 flex-col space-y-3 flex items-end z-[20]">
            <Button
              variant="outline"
              className="h-[45px] bg-white border border-none flex items-center gap-2"
              onClick={handleRefresh}
              aria-label="Refresh"
            >
              <UpdateIcon
                className={`w-5 h-5 text-black transition-transform duration-300 ${
                  isRefreshing ? "animate-spin" : ""
                }`}
              />
            </Button>
            <Button className="h-[45px] px-4 bg-[#1665F4] text-white hover:bg-[#1665F4]/90 flex items-center gap-[10px] font-semibold" aria-label="Add manga">
              {/* <div className="w-4 h-4 rounded-full bg-white"> */}
              <Plus className="w-6 h-6 text-white" />
              {/* </div> */}
              <span>Add Manga</span>
            </Button>
          </div>
        )}

      {/* Bookmark Actions Modal */}
      <BookReadModal
        isOpen={isReadModalOpen}
        onClose={() => {
          setIsReadModalOpen(false);
          // setIsActionsModalOpen(true);
        }}
        bookData={{
          title: selectedItem?.title || "",
          image: selectedItem?.image || "",
          type: selectedItem?.contentType || "manga",
          currentChapter: selectedItem?.currentChapter || 1,
          source: selectedItem?.source || "Unknown",
          sourceChapter: `Ch. ${selectedItem?.currentChapter || 1}`,
          readingStatus: selectedItem?.readingStatus || "reading",
          tags: selectedItem?.tags || [],
          rating: 10,
        }}
      />
      <BookmarkActionsModal
        isOpen={isActionsModalOpen}
        onClose={() => setIsActionsModalOpen(false)}
        selectedCount={selectedItems.length}
        onSetToLastRead={handleSetToLastRead}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
        }}
        onConfirm={handleDelete}
      />

      {/* Bulk Edit Modal */}
      <BulkEditModal
        isOpen={isBulkEditModalOpen}
        onClose={() => setIsBulkEditModalOpen(false)}
        selectedCount={selectedItems.length}
        onUpdate={handleBulkUpdate}
      />

      {/* Bookmark Settings Modal */}
      <BookmarkSettingsModal
        isOpen={isBookmarkSettingsModalOpen}
        onClose={() => setIsBookmarkSettingsModalOpen(false)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </div>
  );
}
