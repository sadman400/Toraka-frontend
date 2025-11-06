"use client";

import * as React from "react";
import { Plus, Check } from "lucide-react";
import { BaseFilterDropdown, FilterButton } from "./BaseFilterDropdown";
import {
  ContentTypeFilter as ContentTypeFilterType,
  CONTENT_TYPE_OPTIONS,
} from "@/types/filters";
import useScreenSizer from "@/lib/useScreenSizer";

interface ContentTypeFilterProps {
  value: ContentTypeFilterType["value"] | null;
  onChange: (value: ContentTypeFilterType["value"] | null) => void;
  className?: string;
}

export function ContentTypeFilter({
  value,
  onChange,
  className,
}: ContentTypeFilterProps) {
  const selectedOption = CONTENT_TYPE_OPTIONS.find(
    (option) => option.value === value
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const screenSizer = useScreenSizer();

  const handleChange = (newValue: ContentTypeFilterType["value"] | null) => {
    onChange(newValue);
    setIsOpen(false); // Close dropdown after selection
  };

  const triggerContent = selectedOption ? (
    <div className="flex items-center gap-2 min-w-0 flex-1">
      <div className="w-4 h-4 rounded-full bg-[#CFD9E9] flex items-center justify-center flex-shrink-0">
       <Plus className="w-3 h-3 text-black" strokeWidth={2.5}/>
      </div>
      <span className="flex-shrink-0">Type :</span>
      <span className="text-white py-1 text-sm font-medium whitespace-nowrap flex-shrink-0">
        {selectedOption.label}
      </span>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded-full bg-[#CFD9E9] flex items-center justify-center">
       <Plus className="w-3 h-3 text-black" strokeWidth={2.5}/>
      </div>
      <span className="text-[#CFD9E9]">Type</span>
    </div>
  );

  return (
    <BaseFilterDropdown
      trigger={triggerContent}
      className={className}
      dropdownClassName=""
      hideChevron={true}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      desktopWidth={240}
    >
      <div className="p-1">
        {CONTENT_TYPE_OPTIONS.map((option) => (
          <FilterButton
            key={option.value}
            selected={option.value === value}
            onClick={() =>
              handleChange(option.value === value ? null : option.value)
            }
            className={option.value === value ? "bg-[#121A2D]" : ""}
          >
            <div className="flex items-center justify-between w-full cursor-pointer">
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
