import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// Navigation Header Skeleton
export function NavigationHeaderSkeleton() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur">
      <div className="flex h-[78px] w-full items-center justify-between px-6">
        {/* Left section - Logo and Navigation */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-[30px] w-[30px] rounded-full" />
            <Skeleton className="h-[17px] w-[71px]" />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-14" />
          </div>
        </div>

        {/* Right section - Search, Notifications, User */}
        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <Skeleton className="h-10 w-[340px] rounded-md" />

          {/* Notifications */}
          <Skeleton className="h-6 w-6 rounded" />

          {/* User Avatar */}
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </header>
  );
}

// Card Skeleton
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <Skeleton className="h-[200px] w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

// Grid of Cards Skeleton
export function CardsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

// List Item Skeleton
export function ListItemSkeleton() {
  return (
    <div className="flex items-center space-x-4 p-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="h-8 w-8" />
    </div>
  );
}

// List Skeleton
export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-1">
      {Array.from({ length: count }).map((_, i) => (
        <ListItemSkeleton key={i} />
      ))}
    </div>
  );
}

// Profile Skeleton
export function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

// Search Results Skeleton
export function SearchResultsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-3 p-3 rounded-lg border">
            <Skeleton className="h-16 w-16 rounded" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Slider/Carousel Skeleton
export function SliderSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="flex space-x-4 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex-shrink-0 w-64 space-y-3">
            <Skeleton className="h-36 w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Page Loading Skeleton
export function PageLoadingSkeleton() {
  return (
    <div className="space-y-8 p-6">
      <NavigationHeaderSkeleton />
      <div className="space-y-6">
        <SliderSkeleton />
        <SliderSkeleton />
        <CardsGridSkeleton />
      </div>
    </div>
  );
}

// Dropdown Menu Skeleton
export function DropdownMenuSkeleton() {
  return (
    <div className="w-[310px] p-6 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-[45px] w-[45px] rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-5 w-5" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-5 w-5" />
        </div>
      </div>
      <Skeleton className="h-px w-full" />
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}
