import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface NavigationArrowsProps {
  className?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  canGoPrevious?: boolean;
  canGoNext?: boolean;
}

const NavigationArrows: React.FC<NavigationArrowsProps> = ({ 
  className,
  onPrevious,
  onNext,
  canGoPrevious = true,
  canGoNext = true
}) => {
  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      {/* Previous Arrow */}
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={cn(
          "w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200",
          canGoPrevious
            ? "border-white/20 hover:border-white/40 text-white hover:bg-white/10"
            : "border-gray-600 text-gray-600 cursor-not-allowed"
        )}
        aria-label="Previous"
      >
        <Image
          src="/assets/icons/prev-arrow.svg"
          alt="Previous"
          width={9}
          height={17}
          className="w-[9px] h-[17px]"
        />
      </button>

      {/* Next Arrow */}
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={cn(
          "w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200",
          canGoNext
            ? "border-white/20 hover:border-white/40 text-white hover:bg-white/10"
            : "border-gray-600 text-gray-600 cursor-not-allowed"
        )}
        aria-label="Next"
      >
        <Image
          src="/assets/icons/next-arrow.svg"
          alt="Next"
          width={9}
          height={17}
          className="w-[9px] h-[17px]"
        />
      </button>
    </div>
  );
};

export default NavigationArrows;
