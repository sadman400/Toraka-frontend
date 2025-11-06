"use client";

import React from "react";
import { EyeOffIcon, Plus } from "lucide-react";
import { BaseFilterDropdown, FilterRadio } from "./BaseFilterDropdown";
import { HideSeriesFilter as HideSeriesFilterType } from "@/types/filters";
import { useDragScroll } from "@/hooks/useDragScroll";

interface HideSeriesFilterProps {
  value: HideSeriesFilterType[];
  onChange: (value: HideSeriesFilterType[]) => void;
  className?: string;
}

export function HideSeriesFilter({
  value,
  onChange,
  className,
}: HideSeriesFilterProps) {
  const selectedCount = value.filter((item) => item.selected).length;
  const dragScroll = useDragScroll();

  const handleToggle = (optionValue: string) => {
    const newValue = value.map((item) =>
      item.value === optionValue ? { ...item, selected: !item.selected } : item
    );
    onChange(newValue);
  };

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}k`;
    }
    return count.toString();
  };

  const selectedItems = value.filter((item) => item.selected);

  // Function to get display label for trigger
  const getDisplayLabel = (item: HideSeriesFilterType) => {
    switch (item.value) {
      case 'hide-locked':
        return 'Locked';
      case 'hide-caught-up':
        return 'Caught up';
      case 'show-archived':
        return 'Archived';
      default:
        return item.label;
    }
  };

  const triggerContent =
    selectedCount > 0 ? (
      <div className="flex items-center gap-2 min-w-0 flex-1 max-w-[320px]">
        <div className="w-4 h-4 rounded-full bg-[#CFD9E9] flex items-center justify-center flex-shrink-0">
         <Plus className="w-3 h-3 text-black" strokeWidth={2.5}/>
        </div>
        <span className="flex-shrink-0">Hide:</span>
        <div
          ref={dragScroll.ref}
          className="flex items-center gap-1 min-w-0 flex-1 overflow-x-auto scrollbar-hide cursor-grab"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => {
            e.stopPropagation();
            dragScroll.onMouseDown(e);
          }}
          onMouseMove={dragScroll.onMouseMove}
          onMouseUp={dragScroll.onMouseUp}
          onMouseLeave={dragScroll.onMouseLeave}
        >
          {selectedItems.map((item, index) => (
            <span
              key={item.value}
              className="text-white py-1 text-sm font-medium whitespace-nowrap flex-shrink-0"
            >
              {getDisplayLabel(item)}{index < selectedItems.length - 1 ? ',' : ''}
            </span>
          ))}
        </div>
      </div>
    ) : (
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-[#CFD9E9] flex items-center justify-center">
         <Plus className="w-3 h-3 text-black" strokeWidth={2.5}/>
        </div>
        <span className="text-[#CFD9E9]">Hide</span>
      </div>
    );

  return (
    <BaseFilterDropdown
      trigger={triggerContent}
      className={className}
      dropdownClassName="max-h-[340px] overflow-y-auto scrollbar-hide"
      desktopWidth={340}
    >
      <div className="p-1">
        {value.map((option, index) => (
          <div
            key={option.value}
            className={`flex items-center justify-between px-3 py-3 hover:bg-[#1A2436] transition-colors cursor-pointer`}
            onClick={() => handleToggle(option.value)}
          >
            <div className="flex items-center gap-3 flex-1">
              <FilterRadio
                checked={option.selected}
                onChange={() => handleToggle(option.value)}
              >
                <EyeOffIcon className={`w-4 h-4 ${
                    option.selected ? "text-[#1665F4]" : "text-[#CFD9E9]"
                  }`} />
                {/* Label */}
                <span
                  className={`xs:text-base text-sm ${
                    option.selected ? "text-[#1665F4]" : "text-[#CFD9E9]"
                  }`}
                >
                  {index !== 2 ? "Hide " : ""} {option.label}
                </span>
              </FilterRadio>
              {/* Count Badge */}
              <div className="bg-[#3E4968] rounded-lg min-w-[22px] h-[22px] flex items-center justify-center ml-2">
                <span className="text-white xs:text-base text-sm font-normal px-1">
                  {formatCount(option.count)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </BaseFilterDropdown>
  );
}
