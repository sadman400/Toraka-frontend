import Image from "next/image";
import ListOption from "../common/ListOption";
import { useState } from "react";
import { type Bookmark } from "@/data/mockData";
import { BulkEditModal, DoubleTapModal } from "../modals";
import { useLongPress } from "@/hooks/useLongPress";
import { Check } from "lucide-react";

import { useRef } from "react";

interface BookmarkCardProps {
  bookmark: Bookmark;
  isSelected?: boolean;
  onToggleSelection?: () => void;
  onEditSelection?: () => void;
  screenSize: "mobile" | "tablet" | "laptop" | "desktop" | undefined;
  hoverListOptionHidden?: boolean;
  isSelectionMode?: boolean;
  // Chapter change callback
  onChapterChange?: (bookmarkId: number, newChapter: number) => void;
}

export function BookmarkGridItem({
  bookmark,
  isSelected = false,
  onToggleSelection,
  screenSize,
  onEditSelection,
  hoverListOptionHidden = false,
  isSelectionMode = false,
  onChapterChange,
}: BookmarkCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isBulkEditModalOpen, setIsBulkEditModalOpen] = useState(false);
  const [isDoubleTapModalOpen, setIsDoubleTapModalOpen] = useState(false);

  // Fixed widths for different breakpoints - no dynamic calculation needed

  // Check if we should show DoubleTapModal (mobile/tablet: 0-1024px)
  const shouldShowDoubleTapModal = screenSize !== "desktop";

  // Long press handlers for opening DoubleTapModal

  const longPressTriggered = useRef(false);

  const canOpenDoubleTapModal = shouldShowDoubleTapModal && !(isSelected || isSelectionMode);

  // Handle chapter change
  const handleChapterChange = (newChapter: number) => {
    onChapterChange?.(bookmark.id, newChapter);
  };

  // Handle modal open
  const handleModalOpen = () => {
    setIsDoubleTapModalOpen(true);
  };

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

  return (
    <div
      className={`bg-[#141B2F] rounded-[8px] group transition-all duration-200 select-none relative flex flex-col 
        w-full h-full ${isSelected
          ? "ring-2 ring-blue-500 shadow-lg shadow-blue-500/30"
          : ""
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div
        className={`relative overflow-hidden rounded-t-[8px] w-full aspect-[232/333] select-none
    ${(isSelectionMode || shouldShowDoubleTapModal) ? "cursor-pointer" : ""}`}
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

        <Image
          src={bookmark.image}
          alt={""}
          fill
          className="object-cover select-none"
        />
        {isSelected && (
          <div className="absolute inset-0 bg-black/50" />
        )}

        {/* Clickable Checkbox Area - Always handles selection */}
        {(!shouldShowDoubleTapModal || isSelected) && (
          <div
            className="absolute top-2 left-2 w-8 h-8 cursor-pointer z-20 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSelection?.();
            }}
          >
            {/* Selection Indicator */}
            {(isSelected) ? (
              <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center">
                {/* Checkmark Icon */}
                <Check className="w-4 h-4 text-white" />
              </div>
            ) : (
              <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors duration-200 ${isHovered ? "bg-[#262F45] border border-gray-500" : "bg-black/0"
                }`}></div>
            )}
          </div>
        )}

        {/* ListOption Overlay - Shows on hover or when dropdown is open, but not on mobile/tablet */}
        {!hoverListOptionHidden && !shouldShowDoubleTapModal && (
          <div
            data-skin-checked="1"
            className={`absolute inset-0 ${isSelected ? "bg-transparent" : "bg-black/50"
              } ${isHovered || isDropdownOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
              } transition-opacity duration-200 z-[10]`}
          >
            {/* Set to latest chapter tooltip */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[11]">
              {/* ListOption Component */}
              <div
                className="flex justify-center mt-2 relative z-[12]"
                onClick={(e) => e.stopPropagation()}
              >
                <ListOption
                  itemOption={true}
                  variant="compact"
                  backgroundColor="#1b2537"
                  onBookOpen={() => {
                    setIsDropdownOpen(false);
                  }}
                  onEdit={() => {
                    onEditSelection?.();
                    // setIsBulkEditModalOpen(true);
                    setIsDropdownOpen(false);
                  }}
                  onExternalLink={() =>
                    console.log("Open external link for bookmark:", bookmark.id)
                  }
                  onMute={() => console.log("Mute bookmark:", bookmark.id)}
                  onShare={() => console.log("Share bookmark:", bookmark.id)}
                  onReport={() => console.log("Report bookmark:", bookmark.id)}
                  onDelete={() => console.log("Delete bookmark:", bookmark.id)}
                  onDropdownStateChange={setIsDropdownOpen}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content Section - Fixed at bottom */}
      <div className="flex flex-col justify-between px-1 py-3 sm:px-3 gap-3"> 
        {/* Title */}
        <div className="px-1 flex-1 flex items-start min-h-[20px] max-h-[20px]">
          <h2 className="w-full text-white text-sm font-semibold leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
            {bookmark.title}
          </h2>
        </div>

        {/* Chapter Status - Always at bottom */}
        {screenSize !== "mobile" && (
          <div className="flex gap-[6.03px] mt-auto">
            {bookmark.status === "up-to-date" ? (
              <a className="flex-1 bg-[#162A4D] hover:bg-[#1A2436] border border-[rgba(126,171,224,0.2)] rounded-lg p-1 text-center cursor-pointer" href="/chapter" target="_blank">
                <div className="text-[#93C5FD] text-sm font-medium">
                  Chapter {bookmark.currentChapter}
                </div>
                <div className="text-[#60A5FA] text-xs">Up to Date</div>
              </a>
            ) : (
              <>
                <a className="flex-1 bg-[#172131] hover:bg-[#1A2436] border border-[rgba(126,171,224,0.2)] rounded-lg p-1 text-center cursor-pointer" href="/chapter" target="_blank">
                  <div className="text-[#CBD5E1] text-sm font-medium">
                    Ch. {bookmark.currentChapter}
                  </div>
                  <div className="text-[#94A3B8] text-xs">Current</div>
                </a>
                <a className="flex-1 bg-[#162A4D] hover:bg-[#1A2436] border border-[rgba(126,171,224,0.2)] rounded-lg p-1 text-center cursor-pointer" href="/chapter" target="_blank">
                  <div className="text-[#93C5FD] text-sm font-medium">
                    Ch. {bookmark.latestChapter}
                  </div>
                  <div className="text-[#60A5FA] text-xs">Latest</div>
                </a>
              </>
            )}
          </div>
        )}
      </div>
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
      <BulkEditModal
        isOpen={isBulkEditModalOpen}
        onClose={() => setIsBulkEditModalOpen(false)}
        selectedCount={1}
        onUpdate={(status) => console.log("Update status to:", status)}
      />

      {/* DoubleTapModal - Only available on mobile/tablet (0-1024px) */}
      {
        (shouldShowDoubleTapModal) && (
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
        )
      }
    </div >
  );
}