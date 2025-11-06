"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Bookmark } from "@/data/mockData";
import {
  Edit,
  BookOpen,
  ExternalLink,
  Share,
  BellOff,
  Flag,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
} from "lucide-react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Image from "next/image";

interface DoubleTapModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmark: Bookmark;
  onEdit?: () => void;
  onSetChapterToLastRead?: () => void;
  onGoToSource?: () => void;
  onShare?: () => void;
  onDisableNotification?: () => void;
  onReport?: () => void;
  onDelete?: () => void;
  // Chapter navigation callback
  onChapterChange?: (newChapter: number) => void;
}

export function DoubleTapModal({
  isOpen,
  onClose,
  bookmark,
  onEdit,
  onSetChapterToLastRead,
  onGoToSource,
  onShare,
  onDisableNotification,
  onReport,
  onDelete,
  onChapterChange,
}: DoubleTapModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [startY, setStartY] = useState(0);

  // Local state for current chapter to allow immediate UI updates
  const [currentChapter, setCurrentChapter] = useState(bookmark.currentChapter);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dotsButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Sync local state with bookmark prop when it changes
  useEffect(() => {
    setCurrentChapter(bookmark.currentChapter);
  }, [bookmark.currentChapter]);

  // Chapter navigation functions
  const handlePreviousChapter = () => {
    if (currentChapter > 1) {
      const newChapter = currentChapter - 1;
      setCurrentChapter(newChapter);
      onChapterChange?.(newChapter);
    }
  };

  const handleNextChapter = () => {
    if (currentChapter < bookmark.latestChapter) {
      const newChapter = currentChapter + 1;
      setCurrentChapter(newChapter);
      onChapterChange?.(newChapter);
    }
  };

  // Calculate button states
  const canGoPrevious = currentChapter > 1;
  const canGoNext = currentChapter < bookmark.latestChapter;
  const isUpToDate = currentChapter >= bookmark.latestChapter;

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle dropdown positioning and click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        dotsButtonRef.current &&
        !dotsButtonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    const handleResize = () => {
      if (isDropdownOpen) {
        // Use requestAnimationFrame for smooth repositioning
        requestAnimationFrame(() => {
          updateDropdownPosition();
        });
      }
    };

    const handleScroll = () => {
      if (isDropdownOpen) {
        updateDropdownPosition();
      }
    };

    const handleOrientationChange = () => {
      if (isDropdownOpen) {
        // Delay to allow for orientation change to complete
        setTimeout(() => {
          updateDropdownPosition();
        }, 100);
      }
    };

    // ResizeObserver to watch for modal container size changes
    let resizeObserver: ResizeObserver | null = null;
    let mutationObserver: MutationObserver | null = null;

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("orientationchange", handleOrientationChange);

      // Set up ResizeObserver for the modal container
      if (modalRef.current && window.ResizeObserver) {
        resizeObserver = new ResizeObserver(() => {
          if (isDropdownOpen) {
            requestAnimationFrame(() => {
              updateDropdownPosition();
            });
          }
        });
        resizeObserver.observe(modalRef.current);
      }

      // Set up MutationObserver to watch for DOM changes that might affect layout
      if (modalRef.current && window.MutationObserver) {
        mutationObserver = new MutationObserver(() => {
          if (isDropdownOpen) {
            requestAnimationFrame(() => {
              updateDropdownPosition();
            });
          }
        });
        mutationObserver.observe(modalRef.current, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['class', 'style']
        });
      }

      // Initial positioning
      updateDropdownPosition();

      // Also reposition after a short delay to handle any layout shifts
      setTimeout(() => {
        updateDropdownPosition();
      }, 50);

      // Additional positioning after longer delay for complex layout changes
      setTimeout(() => {
        updateDropdownPosition();
      }, 200);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("orientationchange", handleOrientationChange);

      if (resizeObserver) {
        resizeObserver.disconnect();
      }

      if (mutationObserver) {
        mutationObserver.disconnect();
      }
    };
  }, [isDropdownOpen]);

  const updateDropdownPosition = () => {
    if (dotsButtonRef.current) {
      const rect = dotsButtonRef.current.getBoundingClientRect();
      const dropdownWidth = 254; // Estimated dropdown width

      setDropdownPosition({
        top: rect.top - 8 - 278, // Position above the button
        left: Math.max(16, rect.right - dropdownWidth), // Align to right edge with padding
      });
    }
  };

  const handleDotsClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAction = (action?: () => void) => {
    if (action) {
      action();
    }
  };

  // Touch and mouse event handlers for swipe-to-close
  const handleStart = (clientY: number) => {
    setIsDragging(true);
    setStartY(clientY);
    setDragOffset(0);
  };

  const handleMove = useCallback((clientY: number) => {
    if (!isDragging) return;

    const deltaY = clientY - startY;
    if (deltaY > 0) { // Only allow downward dragging
      setDragOffset(deltaY);
    }
  }, [isDragging, startY]);

  const handleEnd = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);

    // Close modal if dragged down more than 100px
    if (dragOffset > 100) {
      onClose();
    }

    setDragOffset(0);
  }, [isDragging, dragOffset, onClose]);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    // Don't start drag if clicking on interactive elements
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('[role="button"]')) {
      return;
    }
    handleStart(e.clientY);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    // Don't start drag if touching interactive elements
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('[role="button"]')) {
      return;
    }
    handleStart(e.touches[0].clientY);
  };



  // Add global mouse move and up listeners when dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      handleMove(e.clientY);
    };

    const handleGlobalMouseUp = () => {
      handleEnd();
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDragging && e.cancelable) {
        // Only prevent default if the event is cancelable
        e.preventDefault();
        handleMove(e.touches[0].clientY);
      } else if (isDragging) {
        // Still handle the move even if we can't prevent default
        handleMove(e.touches[0].clientY);
      }
    };

    const handleGlobalTouchEnd = () => {
      handleEnd();
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
    document.addEventListener('touchend', handleGlobalTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging, handleMove, handleEnd]);

  if (!isVisible || typeof window === "undefined") {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-end px-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? "opacity-50" : "opacity-0"
        }`}
        style={{
          opacity: isDragging ? Math.max(0.5 - (dragOffset / 500), 0.1) : undefined
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={`relative w-full bg-[#1A2436] border-t border-[#1F2C41] rounded-t-lg transition-transform duration-300 select-none ${
          isOpen && !isDragging ? "translate-y-0" : isDragging ? "" : "translate-y-full"
        }`}
        style={{
          transform: isDragging ? `translateY(${dragOffset}px)` : undefined,
          transition: isDragging ? 'none' : undefined
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Handle - Primary drag area */}
        <div 
          className="flex justify-center pt-[14px] pb-6 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="w-[120px] h-[6px] bg-[#334155] rounded-full" />
        </div>

        {/* Content */}
        <div className="px-5 pb-5 space-y-6">
          {/* Title */}
          <div className="flex items-center gap-4">
            <h2 className="text-white text-xl font-semibold leading-6">
              {bookmark.title}
            </h2>
          </div>

          {/* Chapter Status */}
          <div className="space-y-4">
            {/* Current Chapter Info */}
            <div className="flex items-center gap-1">
              <div className="bg-[#3E4968] rounded-3xl px-3 py-0.5 flex items-center gap-1">
                <div className="w-4 h-4 flex items-center justify-center">
                  <Image
                    src="/assets/icons/white-bookmark.png"
                    alt="Book Open"
                    width={10}
                    height={10}
                  />
                </div>
                <span className="text-white sm:text-sm text-xs font-medium">No chapters read
                </span>
              </div>
              <span className="text-white sm:text-base text-sm font-medium">
                Haven&apos;t read yet
              </span>
            </div>

            {/* Latest Chapter Info */}
            <div className="flex items-center gap-1">
              <div className="bg-[#1665F4] rounded-3xl px-3 py-0.5 flex items-center gap-1">
                <div className="w-4 h-4 flex items-center justify-center">
                  <Image
                    src="/assets/icons/book.png"
                    alt="Book Open"
                    width={12}
                    height={12}
                  />
                </div>
                <span className="text-white sm:text-sm text-xs font-medium">
                  Ch. {bookmark.latestChapter}
                </span>
              </div>
              <span className="text-white sm:text-base text-sm font-medium">
                Released 4 days ago
              </span>
            </div>
          </div>

          {/* Chapter Navigation */}
          <div className="flex items-center gap-6 justify-center">
            {/* Minus Button */}
            <button
              onClick={handlePreviousChapter}
              disabled={!canGoPrevious}
              className={`rounded-3xl p-2 flex items-center justify-center transition-colors ${
                canGoPrevious
                  ? "bg-[#3E4968] hover:bg-[#4A5578] cursor-pointer"
                  : "bg-[#2A3142] cursor-not-allowed opacity-50"
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <Minus className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
            </button>

            {/* Chapter Display */}
            <span className="text-white sm:text-2xl text-sm font-medium leading-5">
              Ch. {currentChapter} / Ch. {bookmark.latestChapter}
            </span>

            {/* Plus Button */}
            <button
              onClick={handleNextChapter}
              disabled={!canGoNext}
              className={`rounded-3xl p-2 flex items-center justify-center transition-colors ${
                canGoNext
                  ? "bg-[#3E4968] hover:bg-[#4A5578] cursor-pointer"
                  : "bg-[#2A3142] cursor-not-allowed opacity-50"
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="bg-[#2D374B] rounded-full h-[5px] w-full relative overflow-hidden">
              <div
                className={`absolute left-0 top-0 h-full rounded-full transition-all duration-300 ${
                  isUpToDate ? "bg-[#69DC94]" : "bg-[#0064FF]"
                }`}
                style={{
                  width: `${Math.max(
                    0,
                    (currentChapter / bookmark.latestChapter) * 100
                  )}%`,
                }}
              />
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/80">Last read is unknown</span>
              <span className={`${isUpToDate ? "text-[#69DC94]" : "text-white/80"}`}>
                {isUpToDate ? "✓ Up to date" : `${bookmark.latestChapter - currentChapter} chapter${bookmark.latestChapter - currentChapter > 1 ? "s" : ""} behind`}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <div className="flex-1">
              {isUpToDate ? (
                <button
                  disabled
                  className="w-full bg-[#3E4968] rounded-md px-4 py-2.5 flex items-center justify-center gap-2 cursor-not-allowed opacity-60"
                >
                  <span className="text-white text-base font-semibold">
                    No new chapters available
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleAction(onSetChapterToLastRead);
                    handleNextChapter();
                  }}
                  className="w-full bg-[#0064FF] rounded-md px-4 py-2.5 flex items-center justify-center gap-2"
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <ArrowRight
                      className="w-3.5 h-3 text-white"
                      strokeWidth={2.5}
                    />
                  </div>
                  <span className="text-white text-base font-semibold">
                    Continue to Ch. {currentChapter + 1}
                  </span>
                </button>
              )}
            </div>
            <button
              ref={dotsButtonRef}
              onClick={handleDotsClick}
              className="bg-[#1A2436] border border-[#334155] rounded-md p-2.5 flex items-center justify-center"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <DotsHorizontalIcon
                  className="w-4 h-4 text-white"
                  strokeWidth={2.5}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="fixed bg-[#171F34] border border-[#334155] rounded-xl shadow-lg w-[254px] p-[6px] z-[10000]"
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left,
          }}
        >
          <div className="p-1.5 space-y-0">
            {/* Edit */}
            <button
              onClick={() => {
                handleAction(onEdit);
                setIsDropdownOpen(false);
                onClose();
              }}
              className="w-full flex items-center gap-2.5 p-2 text-[#DDE1F0] hover:bg-[#262F45] rounded-lg transition-colors"
            >
              <Edit className="w-4.5 h-4.5 text-white" strokeWidth={1.5} />
              <span className="sm:text-md text-sm font-normal letting-[-0.31px]">
                Edit
              </span>
            </button>

            {/* Set Chapter to Last Read */}
            <button
              onClick={() => {
                handleAction(onSetChapterToLastRead);
                setIsDropdownOpen(false);
              }}
              className="w-full flex items-center gap-2.5 p-2 text-[#DDE1F0] hover:bg-[#262F45] rounded-lg transition-colors"
            >
              <BookOpen className="w-4.5 h-4.5 text-white" strokeWidth={1.5} />
              <span className="sm:text-md text-sm font-normal letting-[-0.31px]">
                Set Chapter to Last Read
              </span>
            </button>

            {/* Go to Source */}
            <button
              onClick={() => {
                handleAction(onGoToSource);
                setIsDropdownOpen(false);
              }}
              className="w-full flex items-center gap-2.5 p-2 text-[#DDE1F0] hover:bg-[#262F45] rounded-lg transition-colors"
            >
              <ExternalLink
                className="w-4.5 h-4.5 text-white"
                strokeWidth={1.5}
              />
              <span className="sm:text-md text-sm font-normal letting-[-0.31px]">
                Go to Source
              </span>
            </button>

            {/* Share */}
            <button
              onClick={() => {
                handleAction(onShare);
                setIsDropdownOpen(false);
              }}
              className="w-full flex items-center gap-2.5 p-2 text-[#DDE1F0] hover:bg-[#262F45] rounded-lg transition-colors"
            >
              <Share className="w-4.5 h-4.5 text-white" strokeWidth={1.5} />
              <span className="sm:text-md text-sm font-normal letting-[-0.31px]">
                Share
              </span>
            </button>

            {/* Disable Notification */}
            <button
              onClick={() => {
                handleAction(onDisableNotification);
                setIsDropdownOpen(false);
              }}
              className="w-full flex items-center gap-2.5 p-2 text-[#DDE1F0] hover:bg-[#262F45] rounded-lg transition-colors"
            >
              <BellOff className="w-4.5 h-4.5 text-white" strokeWidth={1.5} />
              <span className="sm:text-md text-sm font-normal letting-[-0.31px]">
                Disable Notification
              </span>
            </button>

            {/* Report */}
            <button
              onClick={() => {
                handleAction(onReport);
                setIsDropdownOpen(false);
              }}
              className="w-full flex items-center gap-2.5 p-2 text-[#DDE1F0] hover:bg-[#262F45] rounded-lg transition-colors"
            >
              <Flag className="w-4.5 h-4.5 text-white" strokeWidth={1.5} />
              <span className="sm:text-md text-sm font-normal letting-[-0.31px]">
                Report
              </span>
            </button>

            {/* Delete */}
            <button
              onClick={() => {
                handleAction(onDelete);
                setIsDropdownOpen(false);
              }}
              className="w-full flex items-center gap-2.5 p-2 text-[#DDE1F0] hover:bg-[#262F45] rounded-lg transition-colors"
            >
              <Trash2 className="w-4.5 h-4.5 text-white" strokeWidth={1.5} />
              <span className="sm:text-md text-sm font-normal letting-[-0.31px]">
                Delete
              </span>
            </button>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}