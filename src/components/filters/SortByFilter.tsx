"use client";

import * as React from "react";
import { BaseFilterDropdown, FilterButton } from "./BaseFilterDropdown";
import {
  SortByFilter as SortByFilterType,
  SORT_BY_OPTIONS,
} from "@/types/filters";
import useScreenSizer from "@/lib/useScreenSizer";
import { Check } from "lucide-react";

interface SortByFilterProps {
  value: SortByFilterType["value"] | null;
  onChange: (value: SortByFilterType["value"]) => void;
  className?: string;
}

export function SortByFilter({
  value,
  onChange,
  className,
}: SortByFilterProps) {
  const selectedOption = SORT_BY_OPTIONS.find(
    (option) => option.value === value
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const screenSizer = useScreenSizer();

  const handleChange = (newValue: SortByFilterType["value"]) => {
    onChange(newValue);
    setIsOpen(false); // Close dropdown after selection
  };

  // Show placeholder when value is null, otherwise show selected option
  const displayText =
    value === null ? "Sort by" : selectedOption?.label || "Sort by";
  const isPlaceholder = value === null;

  return (
    <BaseFilterDropdown
      trigger={
        <span className={isPlaceholder ? "text-[#CFD9E9]" : ""}>
          {displayText}
        </span>
      }
      className={className}
      dropdownClassName="max-h-[340px] overflow-y-auto scrollbar-hide"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    >
      <div className="p-1">
        {SORT_BY_OPTIONS.map((option) => (
          <FilterButton
            key={option.value}
            selected={option.value === value}
            onClick={() => handleChange(option.value)}
            className={option.value === value ? "bg-[#121A2D]" : ""}
          >
            <div className="flex justify-between w-full cursor-pointer">
              <span
                className={`text-base ${
                  option.value === value
                    ? "text-[#1665F4] font-medium"
                    : "text-[#CFD9E9]"
                }`}
              >
                {option.label}
              </span>
              {option.value === value && (
                <div className="w-4 h-4 rounded-full bg-[#1665F4]">
                  <Check className="w-4 h-4 text-[#121A2D]" />
                </div>
              )}
            </div>
          </FilterButton>
        ))}
      </div>
    </BaseFilterDropdown>
  );
}
