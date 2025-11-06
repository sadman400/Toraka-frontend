"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { BaseFilterDropdown, FilterCheckbox } from "./BaseFilterDropdown";
import { CustomTagFilter as CustomTagFilterType } from "@/types/filters";
import { SearchInput } from "../ui";
import { useDragScroll } from "@/hooks/useDragScroll";

interface CustomTagsFilterProps {
  value: CustomTagFilterType[];
  onChange: (value: CustomTagFilterType[]) => void;
  className?: string;
  position?: "bottom" | "top";
}

export function CustomTagsFilter({
  value,
  onChange,
  className,
  position = "bottom",
}: CustomTagsFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const selectedItems = value.filter((item) => item.selected);
  const selectedCount = selectedItems.length;
  const dragScroll = useDragScroll();

  const filteredOptions = value.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggle = (optionValue: string) => {
    const newValue = value.map((item) =>
      item.value === optionValue ? { ...item, selected: !item.selected } : item
    );
    onChange(newValue);
  };

  const handleClear = () => {
    const newValue = value.map((item) => ({ ...item, selected: false }));
    onChange(newValue);
    setSearchQuery("");
  };

  const triggerContent =
    selectedCount > 0 ? (
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <div className="w-4 h-4 rounded-full bg-[#CFD9E9] flex items-center justify-center flex-shrink-0">
         <Plus className="w-3 h-3 text-black" strokeWidth={2.5}/>
        </div>
        <span className="flex-shrink-0">Tags :</span>
        <div
          ref={dragScroll.ref}
          className="flex items-center gap-2 min-w-0 lg:max-w-[150px] flex-1 overflow-x-auto scrollbar-hide cursor-grab"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => {
            e.stopPropagation();
            dragScroll.onMouseDown(e);
          }}
          onMouseMove={dragScroll.onMouseMove}
          onMouseUp={dragScroll.onMouseUp}
          onMouseLeave={dragScroll.onMouseLeave}
        >
          {selectedItems.map((item) => (
            <div
              key={item.value}
              className="bg-[#1665F4] text-white px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0"
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-[#CFD9E9] flex items-center justify-center">
         <Plus className="w-3 h-3 text-black" strokeWidth={2.5}/>
        </div>
        <span className="text-[#CFD9E9]">Tags</span>
      </div>
    );

  return (
    <BaseFilterDropdown
      trigger={triggerContent}
      className={className}
      dropdownClassName="max-h-[340px] overflow-y-auto scrollbar-hide"
      hideChevron={true}
      position={position}
      desktopWidth={240}
    >
      <div className="p-1">
        {/* Search Input */}
        <div className="border-b border-[#334155]">
          <div className="relative">
            <SearchInput
              placeholder="Search Tags"
              showKeyboardShortcut={false}
              queryIcon={true}
              queryIconPosition="right"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-[#1A2436] border border-[#334155] rounded-md text-[#CFD9E9] placeholder-[#878F9C] text-sm focus:outline-none focus:border-[#1665F4]"
            />
          </div>
        </div>

        <div className="flex items-center justify-between py-2 px-1">
          <span className="text-[#CFD9E9] text-sm font-medium">
            Available Tags
          </span>
          <span className="text-[#878F9C] text-sm hover:text-[#0052CC] transition-colors flex items-center gap-1">
            {filteredOptions.length} tags
          </span>
        </div>
        {/* Options */}
        <div
          className={`${
            selectedCount > 2 ? "max-h-48" : "max-h-64"
          } overflow-y-auto`}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <FilterCheckbox
                key={option.value}
                checked={option.selected}
                onChange={() => handleToggle(option.value)}
              >
                <span className="text-base text-[#CFD9E9]">{option.label}</span>
              </FilterCheckbox>
            ))
          ) : (
            <div className="px-3 py-4 text-center text-[#878F9C] text-sm">
              No tags found
            </div>
          )}
        </div>
      </div>
      {selectedCount > 0 && (
      <div
        onClick={handleClear}
        className="cursor-pointer text-white py-4 px-6 bg-[#0D1426] text-sm hover:text-[#0052CC] transition-colors flex items-center justify-center gap-1"
      >
        <p>Clear</p>
      </div>)}
    </BaseFilterDropdown>
  );
}
