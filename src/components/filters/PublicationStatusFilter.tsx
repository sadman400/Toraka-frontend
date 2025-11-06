"use client";

import React, { useState } from "react";
import { Search, Plus } from "lucide-react";
import { BaseFilterDropdown } from "./BaseFilterDropdown";
import { PublicationStatusFilter as PublicationStatusFilterType } from "@/types/filters";
import { useDragScroll } from "@/hooks/useDragScroll";

interface PublicationStatusFilterProps {
  value: PublicationStatusFilterType[];
  onChange: (value: PublicationStatusFilterType[]) => void;
  className?: string;
  position?: "bottom" | "top";
}

// Publication status options with colors based on Figma design
const PUBLICATION_STATUS_OPTIONS = [
  {
    value: "releasing",
    label: "Releasing",
    color: "#CFD9E9", // Blue
    borderColor: "#334155",
  },
  {
    value: "finished",
    label: "Finished",
    color: "#CFD9E9", // Red
    borderColor: "#334155",
  },
  {
    value: "on-hiatus",
    label: "On Hiatus",
    color: "#CFD9E9", // Gray
    borderColor: "#334155",
  },
  {
    value: "cancelled",
    label: "Cancelled",
    color: "#CFD9E9", // Gray
    borderColor: "#334155",
  },
  {
    value: "not-yet-released",
    label: "Not Yet Released",
    color: "#CFD9E9", // Gray
    borderColor: "#334155",
  },
];

export function PublicationStatusFilter({
  value,
  onChange,
  className,
  position = "bottom",
}: PublicationStatusFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const activeItems = value.filter((item) => item.selected || item.excluded);
  const selectedCount = activeItems.length;
  const dragScroll = useDragScroll();

  // Filter options based on search query
  const filteredOptions = PUBLICATION_STATUS_OPTIONS.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle 3-state toggle: none -> include (blue) -> exclude (red) -> none
  const handleStatusToggle = (statusValue: string) => {
    const currentItem = value.find((item) => item.value === statusValue);
    const isSelected = currentItem?.selected || false;
    const isExcluded = currentItem?.excluded || false;

    let newState;
    if (!isSelected && !isExcluded) {
      // State 1: Default -> Include (blue)
      newState = { selected: true, excluded: false };
    } else if (isSelected && !isExcluded) {
      // State 2: Include -> Exclude (red)
      newState = { selected: false, excluded: true };
    } else {
      // State 3: Exclude -> Default (none)
      newState = { selected: false, excluded: false };
    }

    const newValue = value.map((item) =>
      item.value === statusValue ? { ...item, ...newState } : item
    );
    onChange(newValue);
  };

  // Clear all selections
  const handleClear = () => {
    const newValue = value.map((item) => ({
      ...item,
      selected: false,
      excluded: false,
    }));
    onChange(newValue);
  };

  const triggerContent =
    selectedCount > 0 ? (
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <div className="w-4 h-4 rounded-full bg-[#CFD9E9] flex items-center justify-center flex-shrink-0">
         <Plus className="w-3 h-3 text-black" strokeWidth={2.5}/>
        </div>
        <span className="flex-shrink-0">Status :</span>
        <div
          ref={dragScroll.ref}
          className="flex items-center gap-2 min-w-0 lg:max-w-[135px] flex-1 overflow-x-auto scrollbar-hide cursor-grab"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => {
            e.stopPropagation();
            dragScroll.onMouseDown(e);
          }}
          onMouseMove={dragScroll.onMouseMove}
          onMouseUp={dragScroll.onMouseUp}
          onMouseLeave={dragScroll.onMouseLeave}
        >
          {activeItems.map((item) => {
            // Determine colors based on include/exclude state
            const backgroundColor = item.selected ? "#1665F4" : "#DE5757"; // Blue for include, Red for exclude
            const textColor = "white";
            
            return (
              <div
                key={item.value}
                className="px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0"
                style={{
                  backgroundColor,
                  color: textColor
                }}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-[#CFD9E9] flex items-center justify-center">
          <Plus className="w-3 h-3 text-black" strokeWidth={2.5}/>
        </div>
        <span className="text-[#CFD9E9]">Status</span>
      </div>
    );

  return (
    <BaseFilterDropdown
      trigger={triggerContent}
      className={`${className}`}
      dropdownClassName=""
      hideChevron={true}
      position={position}
      desktopWidth={340}
    >
      <div className="">
        {/* Search Input */}
        <div className="px-1 py-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Publication Status"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#141B2F] border border-[#334155] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>



        {/* Publication Status Items */}
        <div className="overflow-y-auto space-y-1 px-1 pr-2">
          {filteredOptions.map((status) => {
            const selectedItem = value.find(
              (item) => item.value === status.value
            );
            const isSelected = selectedItem?.selected || false;
            const isExcluded = selectedItem?.excluded || false;
            const isActive = isSelected || isExcluded;

            // Determine colors based on state
            let textColor = "#CFD9E9"; // Default gray
            let borderColor = "#334155"; // Default border
            const backgroundColor = "#141B2F"; // Default background
            let checkboxColor = status.color;
            let checkboxBorderColor = status.borderColor;

            if (isSelected) {
              // Include state (blue)
              textColor = "#1665F4";
              borderColor = "#1665F4";
              checkboxColor = "#1665F4";
              checkboxBorderColor = "#1665F4";
            } else if (isExcluded) {
              // Exclude state (red)
              textColor = "#DE5757";
              borderColor = "#DE5757";
              checkboxColor = "#DE5757";
              checkboxBorderColor = "#DE5757";
            }

            return (
              <div key={status.value}>
                {/* Main Status Item */}
                <div
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-md border transition-colors cursor-pointer hover:bg-[#1A2436]`}
                  style={{
                    borderColor,
                    backgroundColor
                  }}
                  onClick={() => handleStatusToggle(status.value)}
                >
                  {/* Status Indicator */}
                  <div className="flex items-center gap-2">
                    <div
                      className="w-[18px] h-[18px] rounded border flex items-center justify-center"
                      style={{ borderColor: checkboxBorderColor }}
                    >
                      {isActive && (
                        <div
                          className="w-[11px] h-[11px] rounded"
                          style={{ backgroundColor: checkboxColor }}
                        />
                      )}
                    </div>
                    <span
                      className="text-sm font-medium"
                      style={{ color: textColor }}
                    >
                      {status.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear Button */}
        {activeItems.length > 0 && (
          <div className="mt-1 -px-1">
            <button
              onClick={handleClear}
              className="cursor-pointer w-full py-4 bg-[#0D1426] border border-[#1E2A3F] rounded-md text-white text-base font-semibold hover:bg-[#141B2F] transition-colors"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </BaseFilterDropdown>
  );
}