"use client";

import React, { useEffect, useState } from "react";
import { X, Settings } from "lucide-react";
import { FilterState } from "@/types/filters";
import {
  StatusFilter,
  SortByFilter,
  HideSeriesFilter,
  ContentTypeFilter,
  PublicationStatusFilter,
  GenresFilter,
  SourcesFilter,
  CustomTagsFilter,
} from "@/components/filters";
import useScreenSizer from "@/lib/useScreenSizer";
import { SeriesStatusFilter } from "./SeriesStatusFilter";

interface MobileFilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  onBookmarkSettings?: () => void;
}

export function MobileFilterSidebar({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onClearFilters,
  hasActiveFilters,
  onBookmarkSettings,
}: MobileFilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );

  const screenSize = useScreenSizer();

  useEffect(() => {
    if(screenSize && (screenSize === "desktop") && isOpen && onClose) {
      onClose();
    }
  }, [screenSize, isOpen, onClose]);

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const updateFilters = (
    key: keyof FilterState,
    value: FilterState[keyof FilterState]
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full max-w-[330px] w-full bg-[#0a0f1c] border-l border-[#334155] z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold text-white">Filters</h2>
          <button
            onClick={onClose}
            className="w-6 h-6 bg-[#A8B1C080] rounded-full flex items-center justify-center hover:bg-[#4A5568] transition-colors"
          >
            <X className="w-4 h-4 text-[#0a0f1c]" strokeWidth={2.5} />
          </button>
        </div>

        {/* Filter Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {/* Status: Reading */}

          <div className="px-5 pb-4">
            <StatusFilter
              value={filters.status}
              onChange={(value) => updateFilters("status", value)}
              className="w-full"
            />
          </div>

          <div className="px-5 pb-4">
            <SortByFilter
              value={filters.sortBy}
              onChange={(value) => updateFilters("sortBy", value)}
              className="w-full"
            />
          </div>

          <div className="px-5 pb-4">
            <SeriesStatusFilter
              value={filters.sortBy}
              onChange={(value) => updateFilters("sortBy", value)}
              className="w-full"
            />
          </div>

          <div className="px-5 pb-4">
            <HideSeriesFilter
              value={filters.hideSeries}
              onChange={(value) => updateFilters("hideSeries", value)}
              className="w-full"
            />
          </div>
          <div className="px-5 pb-4">
            <ContentTypeFilter
              value={filters.contentType}
              onChange={(value) => updateFilters("contentType", value)}
              className="w-full"
            />
          </div>
          <div className="px-5 pb-4">
            <PublicationStatusFilter
              value={filters.publicationStatus}
              onChange={(value) => updateFilters("publicationStatus", value)}
              className="w-full"
              position="top"
            />
          </div>
          <div className="px-5 pb-4">
            <GenresFilter
              value={filters.genres}
              onChange={(value) => updateFilters("genres", value)}
              className="w-full"
              position="top"
            />
          </div>
          <div className="px-5 pb-4">
            <SourcesFilter
              value={filters.sources}
              onChange={(value) => updateFilters("sources", value)}
              className="w-full"
              position="top"
            />
          </div>

          <div className="px-5 pb-4">
            <CustomTagsFilter
              value={filters.customTags}
              onChange={(value) => updateFilters("customTags", value)}
              className="w-full"
              position="top"
            />
          </div>
          {screenSize === "mobile" ? (
            <div className="px-5 pb-4">
              <button
                onClick={onBookmarkSettings}
                className="w-full bg-[#0064FF] hover:bg-[#0052CC] text-white py-3 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
              >
                <span>Bookmark Settings</span>
                <Settings className="w-4 h-4 text-white" />
              </button>
            </div>
          ) : (
            <div className="flex justify-end pr-5">
              <button
                onClick={onBookmarkSettings}
                className="w-11 h-11 bg-[#1A2436] rounded-md border border-[#334155] flex items-center justify-center hover:bg-[#1A2436]/90 transition-colors"
                aria-label="Bookmark settings"
              >
                <Settings className="w-4 h-4 text-white" strokeWidth={2.5}/>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 space-y-3">
          {/* Remove Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white py-3 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
            >
              <span>Remove Filters</span>
              <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center hover:bg-[#4A5568] transition-colors">
                <X className="w-3 h-3 text-[#DC2626]" strokeWidth={2.5}/>
              </div>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
