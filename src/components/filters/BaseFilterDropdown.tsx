"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface BaseFilterDropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  dropdownClassName?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideChevron?: boolean;
  position?: "bottom" | "top";
  desktopWidth?: number;
}

export function BaseFilterDropdown({
  trigger,
  children,
  className,
  dropdownClassName,
  isOpen: controlledIsOpen,
  onOpenChange,
  hideChevron = false,
  position = "bottom",
  desktopWidth = 240,
}: BaseFilterDropdownProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  const updateDropdownPosition = useCallback(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const minTop = 8; // 8px padding from top edge
      const minLeft = 8; // 8px padding from left edge

      // Responsive width: custom desktop width, button width on mobile/tablet
      const isDesktop = viewportWidth >= 1024; // lg breakpoint
      const dropdownWidth = isDesktop ? desktopWidth : rect.width;
      let dropdownHeight = 300; // Default estimate for filter dropdowns

      if (dropdownRef.current) {
        const dropdownRect = dropdownRef.current.getBoundingClientRect();
        if (dropdownRect.height > 0) dropdownHeight = dropdownRect.height;
      }

      const maxTop = viewportHeight - dropdownHeight - 8; // 8px padding from bottom edge
      const maxLeft = viewportWidth - dropdownWidth - 8; // 8px padding from right edge

      let top = rect.bottom + 8; // Default bottom position
      let left = rect.left;

      if (position === "top") {
        top = rect.top - dropdownHeight - 8; // Position above with 8px gap
      }

      // Ensure dropdown doesn't go off-screen
      if (top < minTop) {
        top = minTop;
      } else if (top > maxTop) {
        top = maxTop;
      }

      if (left < minLeft) {
        left = minLeft;
      } else if (left > maxLeft) {
        left = maxLeft;
      }

      setDropdownPosition({
        top: top,
        left: left,
        width: dropdownWidth, // 340px on desktop, button width on mobile
      });
    }
  }, [position, desktopWidth]);

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(newIsOpen);
    }
    onOpenChange?.(newIsOpen);

    if (newIsOpen) {
      updateDropdownPosition();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        if (controlledIsOpen === undefined) {
          setInternalIsOpen(false);
        }
        onOpenChange?.(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        updateDropdownPosition();
      }
    };

    const handleResize = () => {
      if (isOpen) {
        updateDropdownPosition();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, controlledIsOpen, onOpenChange, updateDropdownPosition]);

  // Reposition dropdown after it's rendered to get accurate dimensions
  useEffect(() => {
    if (isOpen) {
      // Use setTimeout to ensure dropdown is fully rendered
      const timeoutId = setTimeout(() => {
        updateDropdownPosition();
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, updateDropdownPosition]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className={cn(
          "h-[45px] justify-between px-3 bg-[#141B2F] border border-[#334155] text-[#CFD9E9] hover:bg-[#1A2436] flex items-center gap-2 rounded-md transition-colors",
          className
        )}
      >
        {trigger}
        {!hideChevron && (
          <ChevronDownIcon
            className={cn(
              "w-5 h-5 transition-transform text-white",
              isOpen && "rotate-180"
            )}
          />
        )}
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={cn(
            "fixed z-50 bg-[#171F34] border border-[#334155] rounded-md shadow-lg",
            dropdownClassName
          )}
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            width: dropdownPosition.width > 0 ? dropdownPosition.width : undefined,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

interface FilterButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}

export function FilterButton({
  children,
  className,
  onClick,
  selected,
}: FilterButtonProps) {
  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      onTouchEnd={handleClick}
      className={cn(
        "w-full text-left px-3 py-3 hover:bg-[#1A2436] transition-colors flex items-center gap-2",
        selected && "bg-[#121A2D] text-[#1665F4]",
        className
      )}
    >
      {children}
    </button>
  );
}

interface FilterCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
  className?: string;
  showRemoveIcon?: boolean;
  onRemove?: () => void;
}

export function FilterCheckbox({
  checked,
  onChange,
  children,
  className,
  showRemoveIcon = false,
  onRemove,
}: FilterCheckboxProps) {
  const handleChange = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(!checked);
  };

  const handleRemove = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove?.();
  };

  return (
    <button
      onClick={handleChange}
      onTouchEnd={handleChange}
      className={cn(
        "w-full text-left px-1 py-2 mb-0.5 hover:bg-[#1A2436] transition-colors flex items-center justify-between gap-2",
        checked && "bg-[#121A2D] text-[#1665F4]",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "w-5 h-5 border-2 rounded-md flex items-center justify-center",
            checked ? "border-[#1665F4]" : "border-[#1665F4]"
          )}
        >
          {checked && <div className="w-3 h-3 bg-[#1665F4] rounded-sm" />}
        </div>
        {children}
      </div>

      {showRemoveIcon && onRemove && (
        <button
          onClick={handleRemove}
          onTouchEnd={handleRemove}
          className="w-4 h-4 rounded-full bg-[#1665F4] flex items-center justify-center hover:bg-red-500 transition-colors"
          aria-label="Remove filter"
        >
          <X className="w-3 h-3 text-white" strokeWidth={1.5}/>
        </button>
      )}
    </button>
  );
}

interface FilterRadioProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export function FilterRadio({
  checked,
  onChange,
  children,
  className,
}: FilterRadioProps) {
  const handleChange = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(!checked);
  };

  return (
    <button
      onClick={handleChange}
      onTouchEnd={handleChange}
      className={cn(
        "w-full text-left px-1 py-1 hover:bg-[#1A2436] transition-colors flex items-center gap-2",
        className
      )}
    >
      <div
        className={cn(
          "w-5 h-5 border-2 rounded-full flex items-center justify-center",
          checked ? "border-[#1665F4]" : "border-[#1665F4]"
        )}
      >
        {checked && <div className="w-3 h-3 bg-[#1665F4] rounded-full" />}
      </div>
      {children}
    </button>
  );
}
