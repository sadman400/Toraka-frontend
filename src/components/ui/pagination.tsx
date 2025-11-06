"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showEllipsis?: boolean;
  maxVisiblePages?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "compact";
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showEllipsis = true,
  maxVisiblePages = 5,
  className,
  size = "sm",
  variant = "default",
}: PaginationProps) {
  // Smart pagination logic based on your examples
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];

    if (currentPage === 1) {
      // Page 1: [1, 2, ..., last]
      pages.push(1, 2, '...', totalPages);
    } else if (currentPage === 2) {
      // Page 2: [1, 2, 3, ..., last]
      pages.push(1, 2, 3, '...', totalPages);
    } else if (currentPage === 3) {
      // Page 3: [1, 2, 3, 4, ..., last]
      pages.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage === totalPages) {
      // Last page: [1, ..., last-1, last]
      pages.push(1, '...', totalPages - 1, totalPages);
    } else if (currentPage === totalPages - 1) {
      // Second to last: [1, ..., last-2, last-1, last]
      pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else if (currentPage === totalPages - 2) {
      // Third to last: [1, ..., last-3, last-2, last-1, last]
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      // Middle pages: [1, ..., current-1, current, current+1, ..., last]
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  const buttonSizes = {
    sm: "w-[30px] h-[30px]",
    md: "w-[36px] h-[36px]",
    lg: "w-[42px] h-[42px]",
  };

  const iconSizes = {
    sm: { width: 9, height: 17 },
    md: { width: 9, height: 17 },
    lg: { width: 9, height: 17 },
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {/* Previous Button */}
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          buttonSizes[size],
          "bg-gray-700/50 hover:bg-gray-600/70 disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        <Image
          src="/assets/icons/arrow-left.svg"
          alt="Previous"
          width={iconSizes[size].width}
          height={iconSizes[size].height}
          className={currentPage === 1 ? "opacity-50" : ""}
          style={{ width: `${iconSizes[size].width}px`, height: `${iconSizes[size].height}px` }}
        />
      </Button>

      {/* Render pages with smart ellipsis */}
      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <Button
              key={`ellipsis-${index}`}
              variant="ghost"
              size="sm"
              className={cn(buttonSizes[size], "bg-gray-700/50 cursor-default")}
              disabled
              aria-label="More pages"
            >
              ...
            </Button>
          );
        }

        const pageNum = page as number;
        return (
          <Button
            key={pageNum}
            variant="ghost"
            size="sm"
            className={cn(
              buttonSizes[size],
              pageNum === currentPage
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-700/50 hover:bg-gray-600/70 text-white"
            )}
            aria-label={`Go to page ${pageNum}`}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </Button>
        );
      })}

      {/* Next Button */}
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          buttonSizes[size],
          "bg-gray-700/50 hover:bg-gray-600/70 disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        <Image
          src="/assets/icons/arrow-right.svg"
          alt="Next"
          width={iconSizes[size].width}
          height={iconSizes[size].height}
          className={currentPage === totalPages ? "opacity-50" : ""}
          style={{ width: `${iconSizes[size].width}px`, height: `${iconSizes[size].height}px` }}
        />
      </Button>
    </div>
  );
}

// Hook for pagination logic
export function usePagination(totalItems: number, itemsPerPage: number = 10) {
  const [currentPage, setCurrentPage] = React.useState(1);
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const reset = () => {
    setCurrentPage(1);
  };
  
  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    reset,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}
