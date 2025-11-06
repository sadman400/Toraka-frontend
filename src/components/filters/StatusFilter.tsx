"use client";

import * as React from 'react';
import { BaseFilterDropdown, FilterButton } from './BaseFilterDropdown';
import { StatusFilter as StatusFilterType, STATUS_OPTIONS } from '@/types/filters';
import useScreenSizer from '@/lib/useScreenSizer';

interface StatusFilterProps {
  value: StatusFilterType['value'] | null;
  onChange: (value: StatusFilterType['value']) => void;
  className?: string;
}

export function StatusFilter({ value, onChange, className }: StatusFilterProps) {
  const screenSizer = useScreenSizer()
  const selectedOption = STATUS_OPTIONS.find(option => option.value === value);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleChange = (newValue: StatusFilterType['value']) => {
    onChange(newValue);
    setIsOpen(false); // Close dropdown after selection
  };

  // Show placeholder when value is null, otherwise show selected option
  const displayText = value === null ? 'Status' : selectedOption?.label;
  const isPlaceholder = value === null;

  return (
    <BaseFilterDropdown
      trigger={<span className={isPlaceholder ? 'text-[#CFD9E9]' : ''}>{displayText}</span>}
      className={className}
      dropdownClassName="max-h-[340px] overflow-y-auto scrollbar-hide"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    >
      <div className="p-1">
        {STATUS_OPTIONS.map((option) => (
          <FilterButton
            key={option.value}
            selected={option.value === value}
            onClick={() => handleChange(option.value)}
            className={option.value === value ? "bg-[#121A2D]" : ""}
          >
            <div className="flex items-center justify-between w-full cursor-pointer">
                <span className={`text-base ${
                  option.value === value
                    ? "text-[#1665F4] font-medium"
                    : "text-[#CFD9E9]"
                }`}>
                  {option.label}
                </span>
                <div
                  className="w-[8.75px] h-[8.75px] rounded-full"
                  style={{ backgroundColor: option.color }}
                />
            </div>
          </FilterButton>
        ))}
      </div>
    </BaseFilterDropdown>
  );
}
