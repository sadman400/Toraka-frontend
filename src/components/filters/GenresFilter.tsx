"use client";

import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { BaseFilterDropdown } from './BaseFilterDropdown';
import { GenreFilter as GenreFilterType, GENRE_OPTIONS } from '@/types/filters';
import { useDragScroll } from '@/hooks/useDragScroll';

interface GenresFilterProps {
  value: GenreFilterType[];
  onChange: (value: GenreFilterType[]) => void;
  className?: string;
  position?: "bottom" | "top";
}

export function GenresFilter({ value, onChange, className, position = "bottom" }: GenresFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const activeItems = value.filter(item => item.selected || item.excluded);
  const selectedCount = activeItems.length;
  const dragScroll = useDragScroll();

  // Filter options based on search query
  const filteredOptions = GENRE_OPTIONS.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle 3-state toggle: none -> include (blue) -> exclude (red) -> none
  const handleStatusToggle = (genreValue: string) => {
    const currentItem = value.find((item) => item.value === genreValue);
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
      item.value === genreValue ? { ...item, ...newState } : item
    );
    onChange(newValue);
  };

  // Clear all selections
  const handleClear = () => {
    const newValue = value.map(item => ({ ...item, selected: false, excluded: false }));
    onChange(newValue);
  };

  const triggerContent = selectedCount > 0 ? (
    <div className="flex items-center gap-2 min-w-0 flex-1">
      <div className="w-4 h-4 rounded-full bg-[#CFD9E9] flex items-center justify-center flex-shrink-0">
        <Plus className="w-3 h-3 text-black" strokeWidth={2.5}/>
      </div>
      <span className="flex-shrink-0">Genres :</span>
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
          const backgroundColor = item.excluded ? "#DE5757" : "#1665F4";
          return (
            <div
              key={item.value}
              className="text-white px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0"
              style={{ backgroundColor }}
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
      <span className="text-[#CFD9E9]">Genres</span>
    </div>
  );

  return (
    <BaseFilterDropdown
      trigger={triggerContent}
      className={`${className}`}
      dropdownClassName=""
      hideChevron={true}
      position={position}
      desktopWidth={240}
    >
      <div className="">
        {/* Search Input */}
        <div className="px-1 py-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Genres"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#141B2F] border border-[#334155] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>



        {/* Genre Items */}
        <>
          <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: #374151;
              border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #0064FF;
              border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #0052CC;
            }
          `}</style>
          <div
            className="h-[340px] overflow-y-auto space-y-1 px-1 pr-2 custom-scrollbar"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#0064FF #374151'
            }}
          >
          {filteredOptions.map((genre) => {
            const selectedItem = value.find(item => item.value === genre.value);
            const isSelected = selectedItem?.selected || false;
            const isExcluded = selectedItem?.excluded || false;
            const isActive = isSelected || isExcluded;

            // Determine colors based on state
            let textColor = "#CFD9E9"; // Default gray
            let borderColor = "#334155"; // Default border
            const backgroundColor = "#141B2F"; // Default background
            let checkboxColor = "#1665F4"; // Default blue
            let checkboxBorderColor = "#334155";

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
              <div key={genre.value}>
                {/* Main Genre Item */}
                <div
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-md border transition-colors cursor-pointer hover:bg-[#1A2436]`}
                  style={{
                    borderColor,
                    backgroundColor
                  }}
                  onClick={() => handleStatusToggle(genre.value)}
                >
                  {/* Genre Indicator */}
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
                      className="text-sm font-medium select-none"
                      style={{ color: textColor }}
                    >
                      {genre.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </>

        {/* Clear Button */}
         {activeItems.length > 0 && (
        <div className="mt-1 -px-1">
          <button
            onClick={handleClear}
            className="cursor-pointer w-full py-4 bg-[#0D1426] border border-[#1E2A3F] rounded-md text-white text-base font-semibold hover:bg-[#141B2F] transition-colors"
          >
            Clear
          </button>
        </div>)}
      </div>
    </BaseFilterDropdown>
  );
}
