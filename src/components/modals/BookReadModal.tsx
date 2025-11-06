"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, Star, Plus, ArrowLeft } from "lucide-react";
import useScreenSizer from "@/lib/useScreenSizer";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FilterCheckbox } from "@/components/filters/BaseFilterDropdown";
import { BingeModeModal } from "./BingeModeModal";
import { NotesModal } from "./NotesModal";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { useDragScroll } from "@/hooks/useDragScroll";

// Simple Modal Dropdown Component
interface ModalDropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  dropdownClassName?: string;
  position?: "top" | "bottom";
}

export function ModalDropdown({
  trigger,
  children,
  isOpen,
  onOpenChange,
  className = "",
  dropdownClassName = "",
  position = "bottom",
}: ModalDropdownProps) {
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onOpenChange(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onOpenChange]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="w-full h-[45px] px-3 bg-[#141B2F] border border-[#334155] text-[#CFD9E9] hover:bg-[#1A2436] flex items-center gap-2 rounded-md transition-colors">
        <div
          className="flex-1 min-w-0 cursor-pointer py-2"
          onClick={(e) => {
            // Check if the click originated from a badge remove button
            const target = e.target as HTMLElement;
            const buttonElement = target.closest('button[type="button"]');
            const isRemoveButton =
              buttonElement &&
              target.closest(".ml-1") &&
              buttonElement.classList.contains("ml-1");

            // Only open dropdown if not clicking on a badge remove button
            if (!isRemoveButton) {
              onOpenChange(!isOpen);
            }
          }}
        >
          {trigger}
        </div>
        <button
          onClick={() => onOpenChange(!isOpen)}
          className="flex-shrink-0 p-1 hover:bg-[#334155] rounded transition-colors"
          type="button"
        >
          <svg
            className={`w-5 h-5 text-white transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className={`absolute left-0 right-0 z-50 bg-[#171F34] border border-[#334155] rounded-md shadow-lg ${
            position === "top" ? "bottom-full mb-1" : "top-full mt-1"
          } ${dropdownClassName}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

interface BookReadModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookData?: {
    title: string;
    image: string;
    type: string;
    currentChapter: number;
    source: string;
    sourceChapter: string;
    readingStatus: string;
    tags: string[];
    rating: number;
    isHidden?: boolean;
    isFavourite?: boolean;
    notes?: string;
  };
}

// Data options
const SOURCES_OPTIONS = [
  { value: "comick", label: "Comick", chapter: "Ch. 110" },
  { value: "mangadex", label: "MangaDex", chapter: "Ch. 108" },
  { value: "webtoon", label: "Webtoon", chapter: "Ch. 112" },
];

const READING_STATUS_OPTIONS = [
  { value: "reading", label: "Reading", color: "#408BFE" },
  { value: "completed", label: "Completed", color: "#10B981" },
  { value: "on-hold", label: "On Hold", color: "#F59E0B" },
  { value: "dropped", label: "Dropped", color: "#EF4444" },
  { value: "plan-to-read", label: "Plan to Read", color: "#8B5CF6" },
  { value: "behind", label: "Behind", color: "#6B7280" },
];

const AVAILABLE_TAGS = [
  "Isekai",
  "Reincarnation",
  "Magic",
  "Adventure",
  "Romance",
  "Comedy",
  "Action",
  "Fantasy",
  "Slice of Life",
  "Drama",
  "School Life",
  "Supernatural",
];

const RATING_OPTIONS = Array.from({ length: 10 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1}`,
}));

export function BookReadModal({
  isOpen,
  onClose,
  bookData,
}: BookReadModalProps) {
  const screenSize = useScreenSizer();
  const isDesktop = screenSize === "desktop";
  const inputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [currentChapter, setCurrentChapter] = useState(
    bookData?.currentChapter?.toString() || "3"
  );
  const [selectedSource, setSelectedSource] = useState(
    bookData?.source || "comick"
  );
  const [readingStatus, setReadingStatus] = useState(
    bookData?.readingStatus || "reading"
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    bookData?.tags || ["Isekai", "Reincarnation"]
  );
  const [rating, setRating] = useState(bookData?.rating || 10);
  const [isHidden, setIsHidden] = useState(bookData?.isHidden || false);
  const [isFavourite, setIsFavourite] = useState(
    bookData?.isFavourite || false
  );
  const [notes, setNotes] = useState(bookData?.notes || "");
  const [setChapterEnabled, setSetChapterEnabled] = useState(false);
  const [bingeChapterNumber, setBingeChapterNumber] = useState<number | null>(null);

  // Modal states
  const [isBingeModeModalOpen, setIsBingeModeModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);

  // Dropdown states
  const [isSourcesOpen, setIsSourcesOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);

  const truncateText = (text: string, maxLines = 2) => {
    if (!text) return "Edit Note";
    const words = text.split(" ");
    const wordsPerLine = 8; // Approximate words per line
    const maxWords = maxLines * wordsPerLine;

    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  const dragScroll = useDragScroll();

  // Prevent auto-focus on modal open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Remove focus from the input when modal opens
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.blur();
        }
        // Focus on a non-input element instead (like the modal container)
        const modalContent = document.querySelector('[role="dialog"]');
        if (modalContent) {
          (modalContent as HTMLElement).focus();
        }
      }, 100);
    }
  }, [isOpen]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          position={"center"}
          className="bg-[#0A0F1C] border-[#1F2C41]
          xl:min-w-[720px] xl:min-h-[799px]
          lg:min-w-[95dvw] lg:min-h-[95dvh]
          min-w-[100dvw] min-h-[calc(100dvh)]
          max-h-[calc(100dvh-40px)]
          overflow-y-auto
          overflow-x-hidden
          p-5 rounded-md"
          showCloseButton={false}
          onOpenAutoFocus={(e) => {
            // Prevent auto-focus on dialog open
            e.preventDefault();
          }}
        >
          <div className="gap-4 flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-3 max-h-[24px]">
              <div className="w-6 h-6 rounded-full bg-[#5a606e] hover:bg-[#4A5568] opacity-50 flex items-center justify-center cursor-pointer">
                <ArrowLeft
                  onClick={onClose}
                  className="w-4 h-4 text-[#0A0F1C]"
                  strokeWidth={2.5}
                />
              </div>
              <DialogTitle className="text-white sm:text-[24px] text-[18px] font-semibold tracking-[-0.31px]">
                Update Reading Progress
              </DialogTitle>
            </div>

            {/* Book Info */}
            <div className="rounded-lg max-h-[108px]">
              <div className="flex gap-4">
                <div className="w-[70px] h-[100px] bg-gray-600 rounded-md overflow-hidden relative">
                  <Image
                    src={bookData?.image || "/placeholder-book.jpg"}
                    alt={""}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-[#CFD9E9] text-[16px] w-[230px] font-medium">
                    {truncateText(
                      bookData?.title || "Heavenly Grand Archives Young Master",
                      2
                    )}
                  </p>
                  <div className="inline-block bg-[#1665F4] text-white text-xs px-2 py-1 rounded-full">
                    {bookData?.type || "Manhwa"}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-2.5 gap-[10px] w-[calc(100dvw-40px)] lg:w-full">
              {/* Current Chapter & Sources Row */}
              <div className="flex flex-row items-start sm:grid sm:grid-cols-2 gap-4">
                {/* Current Chapter */}
                <div className="">
                  <label className="block sm:w-full w-max text-[#CFD9E9] text-[14px] font-medium mb-1">
                    Current Chapter
                  </label>
                  <Input
                    ref={inputRef}
                    type="number"
                    value={currentChapter}
                    onChange={(e) => setCurrentChapter(e.target.value)}
                    className="bg-[#141B2F] border-[#334155] text-[#CFD9E9] text-[16px] h-[45px] focus:border-[#0064FF] focus:ring-0 w-[106px] sm:w-full"
                    placeholder="Enter chapter number"
                    autoFocus={false}
                    style={{
                      fontSize: "16px", // Prevents zoom on iOS
                    }}
                  />
                </div>

                {/* Sources */}
                <div className="w-full">
                  <label className="block text-[#CFD9E9] text-[14px] font-medium mb-1">
                    Sources
                  </label>
                  <ModalDropdown
                    trigger={
                      <div className="flex items-center gap-2 w-full">
                        <div className="w-2 h-2 bg-[#60FE40] rounded-full blur-[1px]"></div>
                        <span className="text-[#CFD9E9] text-[16px] font-medium">
                          {SOURCES_OPTIONS.find(
                            (s) => s.value === selectedSource
                          )?.label || "Select Source"}
                        </span>
                        <span className="text-[#8390A5] text-xs">
                          {SOURCES_OPTIONS.find(
                            (s) => s.value === selectedSource
                          )?.chapter || ""}
                        </span>
                      </div>
                    }
                    isOpen={isSourcesOpen}
                    onOpenChange={setIsSourcesOpen}
                    className="h-[45px]"
                    dropdownClassName="max-h-[200px] overflow-y-auto"
                  >
                    <div className="p-1">
                      {SOURCES_OPTIONS.map((source) => (
                        <button
                          key={source.value}
                          onClick={() => {
                            setSelectedSource(source.value);
                            setIsSourcesOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 hover:bg-[#1A2436] transition-colors flex items-center gap-2 ${
                            selectedSource === source.value
                              ? "bg-[#121A2D] text-[#1665F4]"
                              : "text-[#CFD9E9]"
                          }`}
                        >
                          <div className="w-2 h-2 bg-[#60FE40] rounded-full blur-[1px]"></div>
                          <span className="font-medium">{source.label}</span>
                          <span className="text-[#8390A5]">
                            {source.chapter}
                          </span>
                        </button>
                      ))}
                    </div>
                  </ModalDropdown>
                </div>
              </div>

              {/* Reading Status */}
              <div>
                <label className="block text-[#CFD9E9] text-[14px] font-medium mb-1">
                  Reading Status
                </label>
                <ModalDropdown
                  trigger={
                    <div className="flex items-center gap-2 w-full">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor:
                            READING_STATUS_OPTIONS.find(
                              (s) => s.value === readingStatus
                            )?.color || "#408BFE",
                        }}
                      ></div>
                      <span className="text-white text-[16px] font-medium">
                        {READING_STATUS_OPTIONS.find(
                          (s) => s.value === readingStatus
                        )?.label || "Select Status"}
                      </span>
                    </div>
                  }
                  isOpen={isStatusOpen}
                  onOpenChange={setIsStatusOpen}
                  dropdownClassName="max-h-[200px] overflow-y-auto"
                >
                  <div className="p-1">
                    {READING_STATUS_OPTIONS.map((status) => (
                      <button
                        key={status.value}
                        onClick={() => {
                          setReadingStatus(status.value);
                          setIsStatusOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 hover:bg-[#1A2436] transition-colors flex items-center gap-2 ${
                          readingStatus === status.value
                            ? "bg-[#121A2D] text-[#1665F4]"
                            : "text-[#CFD9E9]"
                        }`}
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: status.color }}
                        ></div>
                        <span className="font-medium">{status.label}</span>
                      </button>
                    ))}
                  </div>
                </ModalDropdown>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-[#CFD9E9] text-[14px] font-medium mb-1">
                  Tags
                </label>
                <ModalDropdown
                  trigger={
                    <div
                      ref={dragScroll.ref}
                      className="flex gap-2 items-center max-h-[45px] overflow-x-auto scrollbar-hide flex-nowrap cursor-grab"
                      onMouseDown={dragScroll.onMouseDown}
                      onMouseMove={dragScroll.onMouseMove}
                      onMouseUp={dragScroll.onMouseUp}
                      onMouseLeave={dragScroll.onMouseLeave}
                      onClick={(e) => {
                        if (selectedTags.length > 0) {
                          e.stopPropagation();
                        }
                      }}
                    >
                      {selectedTags.length > 0 ? (
                        selectedTags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-[#0064FF] text-white text-[16px] px-2 py-1 rounded-full flex-shrink-0"
                            removable
                            onRemove={() => {
                              setSelectedTags(
                                selectedTags.filter((_, i) => i !== index)
                              );
                            }}
                          >
                            {tag}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-[#8091AC] text-[16px] whitespace-nowrap">
                          Select tags...
                        </span>
                      )}
                    </div>
                  }
                  isOpen={isTagsOpen}
                  onOpenChange={setIsTagsOpen}
                  dropdownClassName="max-h-[200px] overflow-y-auto"
                >
                  <div className="p-1">
                    {AVAILABLE_TAGS.map((tag) => (
                      <FilterCheckbox
                        key={tag}
                        checked={selectedTags.includes(tag)}
                        onChange={(checked) => {
                          if (checked) {
                            setSelectedTags([...selectedTags, tag]);
                          } else {
                            setSelectedTags(
                              selectedTags.filter((t) => t !== tag)
                            );
                          }
                        }}
                      >
                        <span className="text-[16px]">{tag}</span>
                      </FilterCheckbox>
                    ))}
                  </div>
                </ModalDropdown>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[#CFD9E9] text-[14px] font-medium mb-1">
                  Notes
                </label>
                <button
                  onClick={() => setIsNotesModalOpen(true)}
                  className="w-full bg-[#141B2F] border border-[#334155] rounded-md px-3 py-3 max-h-[66px] min-h-[45px] flex items-center gap-2 hover:bg-[#1A2436] transition-colors cursor-pointer"
                >
                  <div
                    className={`max-w-4 max-h-4 rounded-full bg-[#CFD9E9] flex ${
                      notes ? "mb-auto mt-1" : ""
                    }`}
                  >
                    <Plus
                      className="w-4 h-4 text-[#141b2f]"
                      strokeWidth={3.5}
                    />
                  </div>
                  <span className="text-[#CFD9E9] text-[16px] font-medium text-left">
                    {truncateText(notes, 2)}
                  </span>
                </button>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-[#CFD9E9] text-[14px] font-medium mb-1">
                  Your Rating (1-10)
                </label>
                <ModalDropdown
                  trigger={
                    <div className="flex items-center gap-2 w-full">
                      <Star className="w-5 h-5 text-[#D9D643] fill-current" />
                      <span className="text-[#CFD9E9] text-base font-medium">
                        {rating}
                      </span>
                    </div>
                  }
                  className="h-[45px]"
                  isOpen={isRatingOpen}
                  onOpenChange={setIsRatingOpen}
                  dropdownClassName="max-h-[200px] overflow-y-auto"
                  position={isDesktop ? "bottom" : "top"}
                >
                  <div className="p-1">
                    {RATING_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setRating(option.value);
                          setIsRatingOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 hover:bg-[#1A2436] transition-colors flex items-center gap-2 ${
                          rating === option.value
                            ? "bg-[#121A2D] text-[#1665F4]"
                            : "text-[#CFD9E9]"
                        }`}
                      >
                        <Star className="w-4 h-4 text-[#D9D643] fill-current" />
                        <span className="font-medium">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </ModalDropdown>
              </div>

              {/* Checkboxes */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsHidden(!isHidden)}
                  className="bg-[#141B2F] border border-[#334155] h-[58px] rounded-md py-2.5 px-3 flex items-center gap-2 hover:bg-[#1A2436] transition-colors"
                >
                  <div
                    className={`w-[18px] h-[18px] border rounded-[5px] flex items-center justify-center ${
                      isHidden ? "border-[#0064FF]" : "border-[#3E4968]"
                    }`}
                  >
                    {isHidden && (
                      <div className="w-[11.5px] h-[11.5px] bg-[#0064FF] rounded-[2px]"></div>
                    )}
                  </div>
                  <div className="text-left">
                    <div className="text-[#CBD5E1] text-[16px] font-medium">
                      Hidden
                    </div>
                    <div className="text-[#8091AC] text-[12px]">
                      Reading Status
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setIsFavourite(!isFavourite)}
                  className="bg-[#141B2F] border border-[#334155] h-[58px] rounded-md py-2.5 px-3 flex items-center gap-2 hover:bg-[#1A2436] transition-colors"
                >
                  <div
                    className={`w-[18px] h-[18px] border rounded-[5px] flex items-center justify-center ${
                      isFavourite ? "border-[#0064FF]" : "border-[#3E4968]"
                    }`}
                  >
                    {isFavourite && (
                      <div className="w-[11.5px] h-[11.5px] bg-[#0064FF] rounded-[2px]"></div>
                    )}
                  </div>
                  <div className="text-left">
                    <div className="text-[#CBD5E1] text-[16px] font-medium">
                      Favourite
                    </div>
                    <div className="text-[#8091AC] text-[12px]">
                      Show on profile
                    </div>
                  </div>
                </button>
              </div>

              {/* Binge Mode */}

              <div className="flex items-center justify-between mb-1">
                <label className="text-[#CFD9E9] text-[14px] font-medium flex items-center gap-2">
                  Binge Mode
                  <SimpleTooltip
                    content="Binge Mode is a way to pause a series until it reaches the number of chapters you choose. It hides the series from your bookmarks and mutes notifications, so you won’t see updates until it’s ready for your binge session."
                    variant="info"
                    size={"sm"}
                    side="bottom"
                    align="start"
                    delayDuration={300}
                    contentClassName="w-[300px]"
                  >
                    <div className="w-4 h-4 bg-[#CFD9E9] rounded-full flex items-center justify-center cursor-help">
                      <span className="text-[#0A0F1C] text-xs">?</span>
                    </div>
                  </SimpleTooltip>
                </label>
              </div>
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <button
                    type="button"
                    onClick={() => {
                      console.log(
                        "Main button clicked, enabled:",
                        setChapterEnabled
                      );
                      if (setChapterEnabled) {
                        setIsBingeModeModalOpen(true);
                      }
                    }}
                    disabled={!setChapterEnabled}
                    className={`cursor-pointer w-full bg-[#141B2F] border border-[#334155] rounded-md px-3 py-3 h-[45px] flex items-center gap-2 transition-colors ${
                      setChapterEnabled
                        ? "hover:bg-[#1A2436] opacity-100"
                        : "opacity-30 cursor-not-allowed"
                    }`}
                  >
                    <div className="w-4 h-4 bg-[#CFD9E9] rounded-full flex items-center justify-center">
                      <Plus
                        className="w-3 h-3 text-[#141B2F]"
                        strokeWidth={3.5}
                      />
                    </div>
                    {setChapterEnabled && (
                      <span className="text-[#CFD9E9] text-[16px] font-medium">
                        {bingeChapterNumber ? `Chapter ${bingeChapterNumber}` : "Set Chapter Number"}
                      </span>
                    )}
                  </button>
                  {/* Toggle for Set Chapter Number - moved outside button */}
                  <button
                    type="button"
                    onClick={() => {
                      console.log(
                        "Toggle clicked, current state:",
                        setChapterEnabled,
                        "new state:",
                        !setChapterEnabled
                      );
                      const newState = !setChapterEnabled;
                      setSetChapterEnabled(newState);
                      // Reset chapter number when disabling binge mode
                      if (!newState) {
                        setBingeChapterNumber(null);
                      }
                    }}
                    className={`cursor-pointer relative w-[52px] h-[26px] rounded-full p-1 transition-colors ${
                      setChapterEnabled ? "bg-[#0064FF]" : "bg-[#334155]"
                    }`}
                  >
                    <div
                      className={`w-[18px] h-[18px] rounded-full transition-transform border-2 ${
                        setChapterEnabled
                          ? "translate-x-[26px] bg-[#0A0F1C] border-[#0064FF]"
                          : "translate-x-0 bg-[#64748B] border-[#64748B]"
                      }`}
                    ></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-2 pb-5 mt-auto xl:mt-0">
              <button
                onClick={onClose}
                className="cursor-pointer px-4 py-1.5 bg-[#0F1729] border h-[41px] border-[#26303E] text-white text-[16px] rounded-md lg:block hidden hover:bg-[#0F1729]/90 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onClose();
                }}
                className="cursor-pointer px-4 py-1.5 bg-[#0064FF] text-white rounded-md  h-[41px]  hover:bg-[#0064FF]/90 text-[16px] transition-colors lg:w-[141px] w-full"
              >
                Save Progress
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Binge Mode Modal - Outside main dialog */}
      <BingeModeModal
        isOpen={isBingeModeModalOpen}
        onClose={() => {
          setIsBingeModeModalOpen(false);
        }}
        onUpdate={(chapters) => {
          console.log("Binge mode chapters:", chapters);
          setBingeChapterNumber(chapters);
          setIsBingeModeModalOpen(false);
        }}
      />

      {/* Notes Modal - Outside main dialog */}
      <NotesModal
        isOpen={isNotesModalOpen}
        onClose={() => setIsNotesModalOpen(false)}
        initialNote={notes}
        onSave={(note) => {
          setNotes(note);
          setIsNotesModalOpen(false);
        }}
      />
    </>
  );
}
