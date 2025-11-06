"use client";

import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { BaseFilterDropdown, FilterCheckbox } from './BaseFilterDropdown';
import { SourceFilter as SourceFilterType } from '@/types/filters';
import { useDragScroll } from '@/hooks/useDragScroll';

interface SourcesFilterProps {
  value: SourceFilterType[];
  onChange: (value: SourceFilterType[]) => void;
  className?: string;
  position?: "bottom" | "top";
}

export function SourcesFilter({ value, onChange, className, position = "bottom" }: SourcesFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const selectedItems = value.filter(item => item.selected);
  const selectedCount = selectedItems.length;
  const dragScroll = useDragScroll();
  const filteredOptions = value.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggle = (optionValue: string) => {
    const newValue = value.map(item =>
      item.value === optionValue
        ? { ...item, selected: !item.selected }
        : item
    );
    onChange(newValue);
  };

  const handleClear = () => {
    const newValue = value.map(item => ({ ...item, selected: false }));
    onChange(newValue);
    setSearchQuery('');
  };

  const triggerContent = selectedCount > 0 ? (
    <div className="flex items-center gap-2 min-w-0 flex-1">
      <div className="w-4 h-4 rounded-full bg-[#CFD9E9] flex items-center justify-center flex-shrink-0">
       <Plus className="w-3 h-3 text-black" strokeWidth={2.5}/>
      </div>
      <span className="flex-shrink-0">Sources :</span>
      <div
        ref={dragScroll.ref}
        className="flex items-center gap-2 min-w-0 flex-1 max-w-[210px] overflow-x-auto scrollbar-hide cursor-grab"
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
      <span className="text-[#CFD9E9] cursor-pointer">Sources</span>
    </div>
  );

  return (
    <BaseFilterDropdown
      trigger={triggerContent}
      className={className}
      dropdownClassName="max-h-[340px] overflow-y-auto scrollbar-hide"
      hideChevron={true}
      position={position}
      desktopWidth={340}
    >
      <div className="p-1">
        {/* Search Input */}
        <div className="border-b border-[#334155]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#878F9C]" />
            <input
              type="text"
              placeholder="Readable On"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-[#1A2436] border border-[#334155] rounded-md text-[#CFD9E9] placeholder-[#878F9C] text-sm focus:outline-none focus:border-[#1665F4]"
            />
          </div>
        </div>
        {/* Options */}
        <div className={`${selectedCount > 2 ? 'max-h-48' : 'max-h-64'} overflow-y-auto`}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <FilterCheckbox
                key={option.value}
                checked={option.selected}
                onChange={() => handleToggle(option.value)}
              >
                <span className="text-base text-[#CFD9E9]">
                  {option.label}
                </span>
              </FilterCheckbox>
            ))
          ) : (
            <div className="px-3 py-4 text-center text-[#878F9C] text-sm">
              No sources found
            </div>
          )}
        </div>
         {selectedCount > 0 && (
        <div
          onClick={handleClear}
          className="cursor-pointer text-white py-4 px-6 bg-[#0D1426] text-sm hover:text-[#0052CC] transition-colors flex items-center justify-center gap-1"
        >
          <p>Clear</p>
        </div>)}
      </div>
    </BaseFilterDropdown>
  );
}
