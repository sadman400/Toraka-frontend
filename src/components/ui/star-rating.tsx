import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: string | number;
  className?: string;
  showRating?: boolean;
  size?: "sm" | "md" | "lg";
}

export function StarRating({ rating, className, showRating = true, size = "sm" }: StarRatingProps) {
  const numericRating = typeof rating === "string" ? parseFloat(rating) : rating;
  
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4", 
    lg: "h-5 w-5"
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Star className={cn("fill-yellow-400 text-yellow-400", sizeClasses[size])} />
      {showRating && (
        <span className={cn("font-medium text-white", textSizeClasses[size])}>
          {numericRating}
        </span>
      )}
    </div>
  );
}
