import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  Share,
  Flag,
  Trash2,
  BellOff,
  BookOpen,
  Bookmark,
  ExternalLink,
} from "lucide-react";

interface ActionDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  align?: "left" | "center" | "right"; // left: aligns to left edge, center: centers dropdown, right: aligns to right edge
  onMute?: () => void;
  onShare?: () => void;
  onReport?: () => void;
  onDelete?: () => void;
  onBookOpen?: () => void;
  onEdit?: () => void;
  onExternalLink?: () => void;
}

export function ActionDropdown({
  isOpen,
  onClose,
  triggerRef,
  align = "center",
  onBookOpen,
  onExternalLink,
  onMute,
  onShare,
  onReport,
  onDelete,
}: ActionDropdownProps) {
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
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
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleResize);
      // Use setTimeout to ensure dropdown is rendered before calculating position
      setTimeout(() => {
        updateDropdownPosition();
      }, 0);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, onClose, triggerRef, align]);

  const updateDropdownPosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();

      // Use actual dropdown width if available, otherwise fallback to estimated width
      let dropdownWidth = 160; // Increased default width to account for text content
      if (dropdownRef.current) {
        dropdownWidth = dropdownRef.current.offsetWidth;
      }

      let left = rect.left;

      // Calculate dropdown position based on alignment
      switch (align) {
        case "left":
          left = rect.left;
          break;
        case "center":
          left = rect.left + rect.width / 2 - dropdownWidth / 2;
          break;
        case "right":
          left = rect.right - dropdownWidth;
          break;
        default:
          left = rect.left + rect.width / 2 - dropdownWidth / 2;
      }

      // Ensure dropdown doesn't go off-screen
      const viewportWidth = window.innerWidth;
      const minLeft = 8; // 8px padding from left edge
      const maxLeft = viewportWidth - dropdownWidth - 8; // 8px padding from right edge

      // Only apply viewport constraints if dropdown would go off-screen
      if (left < minLeft) {
        left = minLeft;
      } else if (left > maxLeft) {
        left = maxLeft;
      }

      setDropdownPosition({
        top: rect.bottom + 8,
        left: left,
      });
    }
  }, [align]);

  const handleDropdownAction = (action?: () => void) => {
    if (action) {
      action();
    }
    onClose();
  };

  if (!isOpen || typeof window === "undefined") {
    return null;
  }

  return createPortal(
    <div
      ref={dropdownRef}
      className="fixed bg-[#171F34] border border-[#334155] rounded-xl shadow-lg min-w-[96px]"
      style={{
        top: dropdownPosition.top,
        left: dropdownPosition.left,
        zIndex: 99999,
      }}
    >
      <div className="p-1.5">
        {onBookOpen && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDropdownAction(onBookOpen);
            }}
            className="w-full flex items-center gap-2.5 px-2 py-1 text-[#DDE1F0] hover:bg-[#262F45] rounded-lg text-sm"
          >
            <Bookmark className="w-3.5 h-3.5" strokeWidth={1.5} />
            Bookmark
          </button>
        )}
        {onExternalLink && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDropdownAction(onExternalLink);
            }}
            className="w-full flex items-center gap-2.5 px-2 py-1 text-[#DDE1F0] hover:bg-[#262F45] rounded-lg text-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
            Visit Source
          </button>
        )}

        {/* {onMute && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDropdownAction(onMute);
            }}
            className="w-full flex items-center gap-2.5 px-2 py-1 text-[#DDE1F0] hover:bg-[#262F45] rounded-lg text-sm"
          >
            <BellOff className="w-3.5 h-3.5" strokeWidth={1.5} />
            Mute
          </button>
        )}
        {onShare && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDropdownAction(onShare);
            }}
            className="w-full flex items-center gap-2.5 px-2 py-1 text-[#DDE1F0] hover:bg-[#262F45] rounded-lg text-sm"
          >
            <Share className="w-3.5 h-3.5" strokeWidth={1.5} />
            Share
          </button>
        )}
        {onReport && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDropdownAction(onReport);
            }}
            className="w-full flex items-center gap-2.5 px-2 py-1 text-[#DDE1F0] hover:bg-[#262F45] rounded-lg text-sm"
          >
            <Flag className="w-3.5 h-3.5" strokeWidth={1.5} />
            Report
          </button>
        )}
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDropdownAction(onDelete);
            }}
            className="w-full flex items-center gap-2.5 px-2 py-1 text-[#DDE1F0] hover:bg-[#262F45] rounded-lg text-sm"
          >
            <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
            Delete
          </button>
        )} */}
      </div>
    </div>,
    document.body
  );
}
