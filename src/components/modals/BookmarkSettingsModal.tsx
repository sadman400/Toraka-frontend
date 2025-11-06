"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, ChevronDown, Check, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import useScreenSizer from "@/lib/useScreenSizer";
import { cn } from "@/lib/utils";
import { CUSTOM_TAG_OPTIONS, CustomTagFilter } from "@/types/filters";
import { FilterCheckbox } from "../filters/BaseFilterDropdown";
import { SearchInput } from "../ui";
import { useDragScroll } from "@/hooks/useDragScroll";

interface BookmarkSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Modal-specific Custom Tags Filter that uses relative positioning
interface ModalCustomTagsFilterProps {
  value: CustomTagFilter[];
  onChange: (value: CustomTagFilter[]) => void;
}

function ModalCustomTagsFilter({
  value,
  onChange,
}: ModalCustomTagsFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newTagName, setNewTagName] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dragScroll = useDragScroll();

  const selectedItems = value.filter((item) => item.selected);
  const selectedCount = selectedItems.length;

  const filteredOptions = value.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggle = (optionValue: string) => {
    const newValue = value.map((item) =>
      item.value === optionValue ? { ...item, selected: !item.selected } : item
    );
    onChange(newValue);
  };

  const handleRemoveItem = (optionValue: string) => {
    // Remove the item completely from the list
    const newValue = value.filter((item) => item.value !== optionValue);
    onChange(newValue);
  };

  const handleClear = () => {
    const newValue = value.map((item) => ({ ...item, selected: false }));
    onChange(newValue);
    setSearchQuery("");
  };

  const handleAddTag = () => {
    if (newTagName.trim()) {
      // Create new tag and add it to the list
      const newTag: CustomTagFilter = {
        value: newTagName.toLowerCase().replace(/\s+/g, '-'),
        label: newTagName.trim(),
        selected: true
      };

      // Add the new tag to the existing list
      const updatedValue = [...value, newTag];
      onChange(updatedValue);

      // Reset states
      setNewTagName("");
    }
  };

  const handleCancelAddTag = () => {
    setNewTagName("");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const triggerContent =
    selectedCount > 0 ? (
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <div className="w-4 h-4 rounded-full bg-[#CFD9E9] flex items-center justify-center flex-shrink-0">
         <Plus className="w-3 h-3 text-black" strokeWidth={2.5}/>
        </div>
        <span className="flex-shrink-0">Custom Tags :</span>
        <div className="flex items-center gap-2 min-w-0 max-w-[250px] flex-1 overflow-x-auto scrollbar-hide cursor-grab"
        ref={dragScroll.ref}
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
        <span className="text-[#CFD9E9]">Custom Tags</span>
      </div>
    );

  return (
    <div className="w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#141b2f] border border-[#334155] rounded-md px-3 py-2 flex items-center justify-between hover:bg-[#1F2C41] transition-colors h-[45px]"
      >
        {triggerContent}
        <ChevronDown
          className={`w-5 h-5 text-[#8091AC] transition-transform flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="mt-2 bg-[#171F34] border border-[#334155] rounded-md shadow-lg overflow-hidden">
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
              <div className="flex items-center">
                <span className="text-[#878F9C] text-sm">
                  {filteredOptions.length} tags
                </span>
              </div>
            </div>

            {/* Options */}
            <div className="max-h-32 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <FilterCheckbox
                    key={option.value}
                    checked={option.selected}
                    onChange={() => handleToggle(option.value)}
                    showRemoveIcon
                    onRemove={() => handleRemoveItem(option.value)}
                  >
                    <span className="text-base text-[#CFD9E9]">
                      {option.label}
                    </span>
                  </FilterCheckbox>
                ))
              ) : (
                <div className="px-3 py-4 text-center text-[#878F9C] text-sm">
                  No tags found
                </div>
              )}
            </div>
          </div>

          {/* Add Tag Section */}
          {/* {showAddTag ? ( */}
            <div className="p-2 border-t border-[#334155]">
              {/* Custom Tag Input */}
              <div className="flex items-center gap-2 mb-3 p-3 bg-[#1A2436] border border-[#334155] rounded-md">
                <div className="w-4 h-4 text-[#878F9C]">
                  <svg viewBox="0 0 16 16" fill="currentColor">
                    <path d="M2 4a2 2 0 0 1 2-2h4.586A2 2 0 0 1 10 2.586L13.414 6A2 2 0 0 1 14 7.414V12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4z"/>
                  </svg>
                </div>
                <input
                  type="text"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  placeholder="Enter tag name"
                  className="flex-1 bg-transparent text-[#CFD9E9] placeholder-[#878F9C] text-sm focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddTag();
                    } else if (e.key === 'Escape') {
                      handleCancelAddTag();
                    }
                  }}
                  autoFocus
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleAddTag}
                  disabled={!newTagName.trim()}
                  className="flex-1 bg-[#1665F4] text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-[#0052CC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#1665F4]" />
                  </div>
                  Add Tag
                </button>
                <button
                  onClick={handleCancelAddTag}
                  className="px-4 py-2 bg-[#0F1729] border border-[#26303E] text-white rounded-md text-sm font-medium hover:bg-[#1A2436] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          {/* ) : ( */}
            <div className="border-t border-[#334155]">
              <div
                onClick={handleClear}
                className="cursor-pointer text-white py-3 px-6 bg-[#0D1426] text-sm hover:text-[#0052CC] transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <p>Clear</p>
              </div>
            </div>
          {/* )} */}
        </div>
      )}
    </div>
  );
}

// Dropdown component for settings
interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

function SettingsDropdown({
  label,
  value,
  options,
  onChange,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#141b2f] border border-[#334155] rounded-md px-2 py-2 flex items-center justify-between hover:bg-[#1F2C41] transition-colors h-[45px]"
      >
        <span className="text-[#DDE1F0] text-base font-medium">
          {label} : {value}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[#8091AC] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="mt-2 p-1 bg-[#181f34] border border-[#334155] rounded-md shadow-lg max-h-48 overflow-y-auto">
          {options.map((option) => (
            <div
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              key={option}
              className={cn(
                "w-full px-2 py-2 text-left text-[#DDE1F0] hover:bg-[#131a2d] transition-colors cursor-pointer flex justify-between items-center rounded-md",
                value === option && "bg-[#131a2d] text-[#0064FF]"
              )}
            >
              <span>{option}</span>
              {value === option && (
                <div className="w-4 h-4 rounded-full bg-[#0064FF] flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" strokeWidth={1.5} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function BookmarkSettingsModal({
  isOpen,
  onClose,
}: BookmarkSettingsModalProps) {
  const screenSize = useScreenSizer();
  const isMobile = screenSize === "mobile";

  // Settings state
  const [bookmarkBehavior, setBookmarkBehavior] = useState("Manual Update");
  const [listMode, setListMode] = useState("With Covers");
  const [customTags, setCustomTags] = useState(CUSTOM_TAG_OPTIONS);

  // Dropdown options
  const bookmarkBehaviorOptions = [
    "Manual Update",
    "Auto Update",
    "Smart Update",
    "Notification Only",
  ];

  const listModeOptions = [
    "With Covers",
    "Compact List",
    "Detailed View",
    "Grid View",
  ];

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent
        position={"center"}
        className={cn(
          "bg-[#0A0F1C] p-3 border-[#334155] p-5 gap-4 mx-auto rounded-2xl max-h-[80vh] xl:w-[540px] w-[394px] rounded-b-none overflow-y-auto"
        )}
        showCloseButton={false}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <DialogTitle className="text-white text-md font-semibold tracking-[-0.31px]">
            Bookmark Settings
          </DialogTitle>
          <button
            onClick={onClose}
            className="w-5 h-5 bg-[#6B7280] rounded-full flex items-center justify-center hover:bg-[#6B7280]/80 transition-colors"
          >
            <X className="w-4 h-4 text-[#0F1729]" />
          </button>
        </div>

        {/* Content */}
        <div className={cn("space-y-2 flex-1 w-full")}>
          {/* Bookmark Behavior Dropdown */}
          <SettingsDropdown
            label="Bookmark Behavior"
            value={bookmarkBehavior}
            options={bookmarkBehaviorOptions}
            onChange={setBookmarkBehavior}
          />

          {/* List Mode Dropdown */}
          <SettingsDropdown
            label="List Mode"
            value={listMode}
            options={listModeOptions}
            onChange={setListMode}
          />

          {/* Custom Tags Filter */}
          <ModalCustomTagsFilter value={customTags} onChange={setCustomTags} />
          <div className={cn("flex gap-3", isMobile ? "pt-2" : "pt-2")}>
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-transparent border border-[#334155] text-white rounded-xl hover:bg-[#1A2436] transition-colors font-medium"
            >
              Close
            </button>
            <button
              onClick={() => {
                // Handle save logic here
                const selectedCustomTags = customTags.filter(
                  (tag) => tag.selected
                );
                console.log("Saving bookmark settings:", {
                  bookmarkBehavior,
                  listMode,
                  customTags: selectedCustomTags,
                });
                onClose();
              }}
              className="flex-1 px-6 py-3 bg-[#0064FF] text-white rounded-xl hover:bg-[#0064FF]/90 transition-colors font-medium"
            >
              Update
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
