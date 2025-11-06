"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Bookmark } from "@/data/mockData";
import ListOption from "../common/ListOption";
import { BulkEditModal, DoubleTapModal } from "../modals";
import { useLongPress } from "@/hooks/useLongPress";

import useScreenSizer from "@/lib/useScreenSizer";
import { Check } from "lucide-react";
import { Button } from "../ui";

interface BookmarkListItemProps {
  bookmark: Bookmark;
  isSelected?: boolean;
  onToggleSelection?: () => void;
  selectedCount?: number;
  onEditSelection?: () => void;
  isSelectionMode?: boolean;
  // Chapter change callback
  onChapterChange?: (bookmarkId: number, newChapter: number) => void;
}

export function BookmarkListItem({
  bookmark,
  isSelected = false,
  onToggleSelection,
  selectedCount = 0,
  onEditSelection,
  isSelectionMode = false,
  onChapterChange,
}: BookmarkListItemProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBulkEditModalOpen, setIsBulkEditModalOpen] = useState(false);
  const [isDoubleTapModalOpen, setIsDoubleTapModalOpen] = useState(false);
  const screenSize = useScreenSizer();
  const [isHovered, setIsHovered] = useState(false);

  // Check if we should show DoubleTapModal (mobile/tablet: 0-1024px)
  const shouldShowDoubleTapModal = screenSize !== "desktop";
  // Status badge colors based on reading status
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "reading":
        return "bg-[#1665F4]"; // Blue
      case "plan-to-read":
        return "bg-[#CD28A9]"; // Pink/Purple
      case "completed":
        return "bg-[#69DC94]"; // Green
      case "on-hold":
        return "bg-[#C1912B]"; // Orange
      case "dropped":
        return "bg-[#DE5757]"; // Red
      default:
        return "bg-[#1665F4]";
    }
  };

  // Format status text
  const getStatusText = (status: string) => {
    switch (status) {
      case "plan-to-read":
        return "Plan to Read";
      case "on-hold":
        return "On-Hold";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const longPressTriggered = useRef(false);

  const canOpenDoubleTapModal =
    shouldShowDoubleTapModal && !(isSelected || isSelectionMode);

  // Determine if up to date
  const isUpToDate = bookmark.currentChapter >= bookmark.latestChapter;

  // Handle chapter change
  const handleChapterChange = (newChapter: number) => {
    onChapterChange?.(bookmark.id, newChapter);
  };

  // Handle modal open
  const handleModalOpen = () => {
    setIsDoubleTapModalOpen(true);
  };

  // Long press handlers - only for opening modal, not for selection
  const longPressEvents = useLongPress({
    onLongPress: () => {
      longPressTriggered.current = true; // mark long press happened

      // Select the item if not already
      if (!isSelected && !isSelectionMode) {
        onToggleSelection?.();
      }

      // Ensure modal does NOT open after long press
      setIsDoubleTapModalOpen(false);
    },
    onClick: () => {
      // This will only trigger if there was no significant movement
      if (longPressTriggered.current) {
        // Ignore click after long press
        longPressTriggered.current = false;
        return;
      }

      // Always toggle selection if in selection mode or already selected
      if (!canOpenDoubleTapModal && isSelectionMode) {
        onToggleSelection?.();
      }

      // Open modal only if allowed (quick tap, not in selection mode, not already selected)
      if (canOpenDoubleTapModal) {
        handleModalOpen();
      }
    },
    threshold: 500,
    shouldPreventDefault: false,
    movementThreshold: 10, // 10px movement cancels long press
  });

  const handlePrevious = () => {
    window.open('/chapter', '_blank');
    setIsDoubleTapModalOpen(false);
  };

  const handleNext = () => {
    window.open('/chapter', '_blank');
    setIsDoubleTapModalOpen(false);
  };

  return (
    <div
      className={`
        bg-[#141B2F] rounded-md p-3 flex items-center gap-2 sm:gap-3 select-none
        hover:bg-[#141B2F]/60
 transition-colors
        ${isSelected ? "ring-2 ring-[#1665F4]" : ""}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Checkbox - Always visible in mobile/tablet range (0-1024px) */}
      {isSelected && (
        <div
          className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelection?.();
          }}
        >
          {isSelected ? (
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-md flex items-center justify-center">
              <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
          ) : (
            <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-gray-400 rounded-md hover:border-blue-400 transition-colors" />
          )}
        </div>
      )}

      {/* Content Container - Apply long press only to this area */}
      <div
        className="flex-1 flex items-center gap-2 sm:gap-3 cursor-pointer min-w-0"
        {...(shouldShowDoubleTapModal ? longPressEvents : {
          onClick: () => {
            if (longPressTriggered.current) {
              // Ignore click after long press
              longPressTriggered.current = false;
              return;
            }

            // Always toggle selection if in selection mode or already selected
            if (!canOpenDoubleTapModal && isSelectionMode) {
              onToggleSelection?.();
            }

            // Open modal only if allowed (quick tap, not in selection mode, not already selected)
            if (canOpenDoubleTapModal) {
              handleModalOpen();
            }
          }
        })}
      >
        {/* Cover Image */}
        <div className="relative w-[69px] h-[99px] sm:w-[69px] sm:h-[99px] rounded-[5px] overflow-hidden flex-shrink-0">
          <Image
            src={bookmark.image}
            alt={""}
            fill
            className="object-cover select-none"
            sizes="(max-width: 640px) 50px, 69px"
          />
        </div>
        {/* Content */}
        <div className="flex-1 min-w-0 gap-2 justify-center items-center lg:mb-auto">
          {/* Title */}
          <h3 className="text-white font-medium text-[16px] leading-tight sm:leading-[18px] mb-1 sm:mb-2 line-clamp-2">
            {bookmark.title}
          </h3>

          {/* Status and Chapters Row */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Status Badge */}
            <div
              className={`${getStatusBadgeColor(
                bookmark.readingStatus
              )} rounded-lg px-1.5 sm:px-2 py-0.5 justify-center items-center flex`}
            >
              <span className="text-white text-xs font-medium">
                {getStatusText(bookmark.readingStatus)}
              </span>
            </div>
          </div>

          {/* Chapter Buttons Row */}
          <div className="flex items-center gap-1 sm:gap-2 mt-2">
            {/* Current Chapter Button */}
            <Button className="bg-[#172131] h-[35px] hover:bg-[#1A2436] border-[0.5px] border-[#2B3C54] rounded-lg px-2 sm:px-[10px] py-1 sm:py-[5px] flex flex-row gap-1 sm:gap-1 items-center justify-center min-w-[103px]"
            onClick={(e) => {
              e.preventDefault()
                handlePrevious();
              }}
            >
              <span className="text-[#CBD5E1] text-[12px] py-[1px] sm:text-xs font-medium">
                Ch. {bookmark.currentChapter}
              </span>
              <span className="text-[#94A3B8] text-[10px] py-[1px] font-normal">
                Current
              </span>
            </Button>

            {/* Latest Chapter Button */}
            <Button className="bg-[#162A4D] h-[35px] hover:bg-[#1A2436] border-[0.5px] border-[rgba(126,171,224,0.2)] rounded-lg px-2 sm:px-[10px] py-1 sm:py-[5px] flex flex-row gap-1 sm:gap-1 items-center justify-center min-w-[103px]"
            onClick={(e) => {
                e.preventDefault()
                handleNext();
              }}
            >
              <span className="text-[#93C5FD] text-[12px] py-[1px] sm:text-xs font-medium">
                Ch. {bookmark.latestChapter}
              </span>
              <span className="text-[#60A5FA] text-[10px] py-[1px] font-normal">
                {isUpToDate ? "Up to Date" : "Latest"}
              </span>
            </Button>
          </div>
        </div>
      </div>
      {/* Action Menu - Show compact ListOption for mobile to laptop, default ListOption for desktop */}
      {screenSize === "desktop" && isHovered && (
        <ListOption
          itemOption={true}
          variant="compact"
          backgroundColor="#1A2436"
          onEdit={() => {
            onEditSelection?.();
          }}
          onBookOpen={() => {
            console.log("Open book for bookmark:", bookmark.id);
            setIsDropdownOpen(false);
          }}
          onExternalLink={() => {
            console.log("Open external link for bookmark:", bookmark.id);
            setIsDropdownOpen(false);
          }}
          onMute={() => {
            console.log("Mute bookmark:", bookmark.id);
            setIsDropdownOpen(false);
          }}
          onShare={() => {
            console.log("Share bookmark:", bookmark.id);
            setIsDropdownOpen(false);
          }}
          onReport={() => {
            console.log("Report bookmark:", bookmark.id);
            setIsDropdownOpen(false);
          }}
          onDelete={() => {
            console.log("Delete bookmark:", bookmark.id);
            setIsDropdownOpen(false);
          }}
          onDropdownStateChange={setIsDropdownOpen}
        />
      )}
      {/* {screenSize !== "desktop" && (
        <div className="relative flex-shrink-0" data-list-option="true">
          <div
            ref={triggerRef}
            className="w-4 h-4 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsDropdownOpen(!isDropdownOpen);
            }}
          >
            <DotsVerticalIcon className="w-4 h-4 text-white" />
          </div>
          <ActionDropdown
            isOpen={isDropdownOpen}
            onClose={() => setIsDropdownOpen(false)}
            triggerRef={triggerRef}
            align="right"
            onEdit={() => {
              onEditSelection?.();
            }}
            onExternalLink={() => {
              console.log("Open external link for bookmark:", bookmark.id);
            }}
            onMute={() => {
              console.log("Mute bookmark:", bookmark.id);
            }}
            onShare={() => {
              console.log("Share bookmark:", bookmark.id);
            }}
            onReport={() => {
              console.log("Report bookmark:", bookmark.id);
            }}
            onDelete={() => {
              console.log("Delete bookmark:", bookmark.id);
            }}
            onBookOpen={() => {
              console.log("Open bookmark for bookmark:", bookmark.id);
            }}
          />
        </div>
      )} */}
      <BulkEditModal
        isOpen={isBulkEditModalOpen}
        onClose={() => {
          setIsBulkEditModalOpen(false);
        }}
        selectedCount={selectedCount}
        onUpdate={(status) => console.log("Update status to:", status)}
      />

      {/* DoubleTapModal for mobile/tablet */}
      {shouldShowDoubleTapModal && (
        <DoubleTapModal
          isOpen={isDoubleTapModalOpen}
          onClose={() => setIsDoubleTapModalOpen(false)}
          bookmark={bookmark}
          onEdit={() => {
            console.log("Edit bookmark:", bookmark.id);
            onEditSelection?.();
          }}
          onSetChapterToLastRead={() => {
            console.log("Set chapter to last read for bookmark:", bookmark.id);
          }}
          onGoToSource={() => {
            console.log("Go to source for bookmark:", bookmark.id);
          }}
          onShare={() => {
            console.log("Share bookmark:", bookmark.id);
          }}
          onDisableNotification={() => {
            console.log("Disable notification for bookmark:", bookmark.id);
          }}
          onReport={() => {
            console.log("Report bookmark:", bookmark.id);
          }}
          onDelete={() => {
            console.log("Delete bookmark:", bookmark.id);
          }}
          // Chapter change callback
          onChapterChange={handleChapterChange}
        />
      )}
      {/* <BookReadModal
        isOpen={isReadModalOpen}
        onClose={() => setIsReadModalOpen(false)}
        bookData={{
          title: bookmark.title,
          image: bookmark.image,
          type: bookmark.contentType,
          currentChapter: bookmark.currentChapter,
          source: bookmark.source,
          sourceChapter: `Ch. ${bookmark.currentChapter}`,
          readingStatus: bookmark.status,
          tags: bookmark.tags || [],
          rating: 10,
        }}
      /> */}
    </div>
  );
}