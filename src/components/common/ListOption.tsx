import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import {
  Edit,
  MoreHorizontal,
  ExternalLink,
  Share,
  Flag,
  Trash2,
  BellOff,
  BookOpen,
  Bookmark,
} from "lucide-react";
import { SimpleTooltip } from "../ui";
import { DeleteConfirmationModal } from "../modals/DeleteConfirmationModal";

interface ListOptionProps {
  backgroundColor?: string;
  variant?: "default" | "compact"; // default shows text labels, compact shows only icons
  onMute?: () => void;
  onShare?: () => void;
  onReport?: () => void;
  onDelete?: () => void;
  onBookOpen?: () => void;
  onEdit?: () => void;
  onExternalLink?: () => void;
  onDropdownStateChange?: (isOpen: boolean) => void;
  itemOption?: boolean;
}

const ListOption = ({
  backgroundColor = "#374151",
  variant = "default",
  onMute,
  onShare,
  onReport,
  onDelete,
  onBookOpen,
  onEdit,
  onExternalLink,
  onDropdownStateChange,
  itemOption = false,
}: ListOptionProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Notify parent when dropdown state changes
  useEffect(() => {
    if (onDropdownStateChange) {
      onDropdownStateChange(showDropdown);
    }
  }, [showDropdown, onDropdownStateChange]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    };

    const handleScroll = () => {
      if (showTooltip) {
        updateTooltipPosition();
      }
    };

    const handleResize = () => {
      if (showTooltip) {
        updateTooltipPosition();
      }
    };

    if (showTooltip) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [showTooltip]);

  // Handle click outside for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    const handleScroll = () => {
      if (showDropdown) {
        updateDropdownPosition();
      }
    };

    const handleResize = () => {
      if (showDropdown) {
        updateDropdownPosition();
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [showDropdown]);

  const updateTooltipPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const tooltipWidth = 150; // Tooltip width
      setTooltipPosition({
        top: rect.bottom + 8,
        left: rect.left + rect.width / 2 - tooltipWidth - 8,
      });
    }
  };

  const updateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = 120; // Dropdown width
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.left + rect.width / 2 - dropdownWidth / 2, // Center dropdown relative to button
      });
    }
  };

  const handleMoreClick = () => {
    if (variant === "compact") {
      // For compact variant, show dropdown menu
      if (!showDropdown) {
        updateDropdownPosition();
      }
      setShowDropdown(!showDropdown);
    } else {
      // For default variant, show tooltip
      if (!showTooltip) {
        updateTooltipPosition();
      }
      setShowTooltip(!showTooltip);
    }
  };

  const handleDropdownAction = (action?: () => void) => {
    if (action) {
      action();
    }
    setShowDropdown(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (onDelete) {
      onDelete();
    }
    setShowDeleteModal(false);
  };

  // Render compact variant (icons only)
  if (variant === "compact") {
    return (
      <div
        className="relative"
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        data-list-option="true"
      >
        <div
          className="flex items-center gap-2 rounded-md px-3 py-2 bg-[#1A2436]"
          style={{ backgroundColor }}
        >
          {itemOption && (
            <SimpleTooltip
              content="Set to latest chapter"
              variant="info"
              size="sm"
              side="top"
              align="center"
              delayDuration={300}
              contentClassName="w-[140px]"
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 p-0 group"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onBookOpen) onBookOpen();
                }}
                aria-label="Read"
              >
                <div className="w-7 h-7 rounded flex items-center justify-center hover:bg-[#262F45] p-1">
                  <BookOpen
                    className="h-5 w-5 text-[#DDE1F0] transition-colors"
                    strokeWidth={1.5}
                  />
                </div>
              </Button>
            </SimpleTooltip>
          )}
          <SimpleTooltip
            content="Edit"
            variant="info"
            size="sm"
            side="top"
            align="center"
            delayDuration={300}
            contentClassName="w-[40px]"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 p-0 group"
              onClick={(e) => {
                e.stopPropagation();
                if (onEdit) onEdit();
              }}
              aria-label={itemOption ? "Edit bookmark" : "Add bookmark"}
            >
              <div className="w-7 h-7 rounded flex items-center justify-center hover:bg-[#262F45] p-1">
                {itemOption ? (
                  <Edit
                    className="h-5 w-5 text-[#DDE1F0] transition-colors"
                    strokeWidth={1.5}
                  />
                ) : (
                  <Bookmark
                    className="h-5 w-5 text-white group-hover:text-[#60A5FA] transition-colors"
                    strokeWidth={1.5}
                  />
                )}
              </div>
            </Button>
          </SimpleTooltip>
          <SimpleTooltip
            content="Visit Source"
            variant="info"
            size="sm"
            side="top"
            align="center"
            delayDuration={300}
            contentClassName="w-[87px]"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 p-0 group"
              onClick={(e) => {
                e.stopPropagation();
                if (onExternalLink) onExternalLink();
              }}
              aria-label="Visit source"
            >
              <div className="w-7 h-7 rounded flex items-center justify-center hover:bg-[#262F45] p-1">
                <ExternalLink
                  className="h-5 w-5 text-[#DDE1F0] transition-colors"
                  strokeWidth={1.5}
                />
              </div>
            </Button>
          </SimpleTooltip>
          {itemOption && (
            <Button
              ref={buttonRef}
              variant="ghost"
              size="icon"
              className="h-5 w-5 p-0 group"
              onClick={(e) => {
                e.stopPropagation();
                handleMoreClick();
              }}
              aria-label="More options"
            >
              <div className="w-7 h-7 rounded flex items-center justify-center hover:bg-[#262F45] p-1">
                <MoreHorizontal
                  className="h-5 w-5 text-[#DDE1F0] transition-colors"
                  strokeWidth={1.5}
                />
              </div>
            </Button>
          )}
        </div>
        {/* Dropdown Menu - Same as default variant */}
        {showDropdown &&
          typeof window !== "undefined" &&
          createPortal(
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
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDropdownAction(onMute);
                  }}
                  className="w-full flex items-center gap-2.5 cursor-pointer px-2 py-1 text-[#DDE1F0] hover:bg-[#262F45] rounded-lg text-sm group"
                >
                  <BellOff
                    className="w-3.5 h-3.5 group-hover:text-white transition-colors"
                    strokeWidth={1.5}
                  />
                  Mute
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDropdownAction(onShare);
                  }}
                  className="w-full flex items-center gap-2.5 cursor-pointer px-2 py-1 text-[#DDE1F0] hover:bg-[#262F45] rounded-lg text-sm group"
                >
                  <Share
                    className="w-3.5 h-3.5 group-hover:text-white transition-colors"
                    strokeWidth={1.5}
                  />
                  Share
                </button>
                <button
                  aria-label="Report"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDropdownAction(onReport);
                  }}
                  className="w-full flex items-center gap-2.5 cursor-pointer px-2 py-1 text-[#DDE1F0] hover:bg-[#262F45] rounded-lg text-sm group"
                >
                  <Flag
                    className="w-3.5 h-3.5 group-hover:text-white transition-colors"
                    strokeWidth={1.5}
                  />
                  Report
                </button>
                <button
                  aria-label="Delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setShowDropdown(false);
                    handleDeleteClick();
                  }}
                  className="w-full flex items-center gap-2.5 cursor-pointer px-2 py-1 text-[#DDE1F0] hover:bg-[#262F45] rounded-lg text-sm group"
                >
                  <Trash2
                    className="w-3.5 h-3.5 group-hover:text-red-400 transition-colors"
                    strokeWidth={1.5}
                  />
                  Delete
                </button>
              </div>
            </div>,
            document.body
          )}

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
          }}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    );
  }

  // Default variant (with text labels)
  return (
    <div
      className="relative"
      ref={containerRef}
      onClick={(e) => e.stopPropagation()}
      data-list-option="true"
    >
      <div className="flex rounded-md bg-[#141B2F] border border-[#334155] h-[44px]">
        {/* Read Button */}

        {itemOption && (
          <SimpleTooltip
            content="Set to latest chapter"
            variant="info"
            size="sm"
            side="bottom"
            align="start"
            delayDuration={300}
            contentClassName="w-[140px]"
          >
            <button
              className="flex items-center gap-2 px-2 py-2 rounded-tl-md rounded-bl-md transition-colors cursor-pointer hover:bg-[#1A2436] group"
              onClick={(e) => {
                e.stopPropagation();
                if (onBookOpen) onBookOpen();
              }}
              aria-label="Read"
            >
              <div className="w-4 h-4 rounded flex items-center justify-center">
                <BookOpen
                  className="h-4 w-4 text-[#DDE1F0] group-hover:text-white transition-colors"
                  strokeWidth={1.5}
                />
              </div>

              <span className="text-[#CFD9E9] text-base font-normal tracking-[-0.31px] group-hover:text-white transition-colors">
                Read
              </span>
            </button>
          </SimpleTooltip>
        )}
        {/* Separator */}
        <div className="w-px h-[44px] bg-[#334155]" />

        {/* Edit Button */}
        {itemOption && (
          // <SimpleTooltip
          //   content="Edit"
          //   variant="info"
          //   size="sm"
          //   side="bottom"
          //   align="center"
          //   delayDuration={300}
          //   contentClassName="w-[40px]"
          // >
            <button
              className="flex items-center gap-2 px-2 py-2 transition-colors cursor-pointer hover:bg-[#1A2436] group"
              onClick={(e) => {
                e.stopPropagation();
                if (onEdit) onEdit();
              }}
              aria-label="Edit"
            >
              <div className="w-4 h-4 rounded flex items-center justify-center">
                <Edit
                  className="h-4 w-4 text-white group-hover:text-[#60A5FA] transition-colors"
                  strokeWidth={1.5}
                />
              </div>
              <span className="text-[#CFD9E9] text-base font-normal tracking-[-0.31px] group-hover:text-white transition-colors">
                Edit
              </span>
            </button>
          // </SimpleTooltip>
        )}

        {/* Separator */}
        <div className="w-px h-[44px] bg-[#334155]" />

        {/* Delete Button */}
        {itemOption && (
          // <SimpleTooltip
          //   content="Delete"
          //   variant="info"
          //   size="sm"
          //   side="bottom"
          //   align="center"
          //   delayDuration={300}
          //   contentClassName="w-[50px]"
          // >
            <button
              className="flex items-center gap-2 px-2 py-2 transition-colors cursor-pointer hover:bg-[#1A2436] group"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleDeleteClick();
              }}
              aria-label="Delete"
            >
              <div className="w-4 h-4 rounded flex items-center justify-center">
                <Trash2
                  className="h-4 w-4 text-[#DDE1F0] group-hover:text-red-400 transition-colors"
                  strokeWidth={1.5}
                />
              </div>
              <span className="text-[#CFD9E9] text-base font-normal tracking-[-0.31px] group-hover:text-white transition-colors">
                Delete
              </span>
            </button>
          // </SimpleTooltip>
        )}

        <div className="w-px h-[44px] bg-[#334155]" />

        {itemOption && (
          <Button
            ref={buttonRef}
            variant="ghost"
            size="icon"
            className="flex items-center gap-2 px-2 py-2 transition-colors cursor-pointer hover:bg-[#1A2436] group"
            onClick={(e) => {
              e.stopPropagation();
              handleMoreClick();
            }}
            aria-label="More options"
          >
            <div className="w-5 h-5 rounded flex items-center justify-center">
              <MoreHorizontal
                className="h-5 w-5 text-[#DDE1F0] group-hover:text-white transition-colors"
                strokeWidth={1.5}
              />
            </div>
          </Button>
        )}
        {/* Tooltip for MoreHorizontal button */}
        {showTooltip &&
          typeof window !== "undefined" &&
          createPortal(
            <div
              ref={tooltipRef}
              className="fixed bg-[#171F34] border border-[#334155] rounded-lg shadow-lg px-3 cursor-pointer py-2 flex items-center gap-2 group"
              style={{
                top: tooltipPosition.top,
                left: tooltipPosition.left,
                zIndex: 99999,
              }}
            >
              <BellOff
                className="w-4 h-4 text-[#DDE1F0] group-hover:text-white transition-colors"
                strokeWidth={1.5}
              />
              <span className="text-sm text-[#DDE1F0] group-hover:text-white transition-colors">
                Disable Notification
              </span>
            </div>,
            document.body
          )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ListOption;
