import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success:
          "border-transparent bg-green-600 text-white hover:bg-green-600/80",
        warning:
          "border-transparent bg-yellow-600 text-white hover:bg-yellow-600/80",
        info:
          "border-transparent bg-blue-600 text-white hover:bg-blue-600/80",
        purple:
          "border-transparent bg-purple-600 text-white hover:bg-purple-600/80",
        pink:
          "border-transparent bg-pink-600 text-white hover:bg-pink-600/80",
        gray:
          "border-transparent bg-gray-600 text-white hover:bg-gray-600/80",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
      shape: {
        default: "rounded-full",
        rounded: "rounded-md",
        square: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  removable?: boolean;
  onRemove?: () => void;
}

function Badge({ 
  className, 
  variant, 
  size, 
  shape, 
  removable = false, 
  onRemove, 
  children, 
  ...props 
}: BadgeProps) {
  return (
    <div 
      className={cn(badgeVariants({ variant, size, shape }), className)} 
      {...props}
    >
      {children}
      {removable && onRemove && (
        <button
          type="button"
          className="ml-1 rounded-full hover:bg-black/20 p-0.5"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove();
          }}
        >
          <X className="h-3 w-3" strokeWidth={3.5}/>
          <span className="sr-only">Remove</span>
        </button>
      )}
    </div>
  );
}

// Status Badge component for common status indicators
interface StatusBadgeProps extends Omit<BadgeProps, "variant"> {
  status: "active" | "inactive" | "pending" | "completed" | "cancelled" | "draft";
}

const statusVariantMap = {
  active: "success" as const,
  inactive: "gray" as const,
  pending: "warning" as const,
  completed: "success" as const,
  cancelled: "destructive" as const,
  draft: "secondary" as const,
};

const statusLabelMap = {
  active: "Active",
  inactive: "Inactive",
  pending: "Pending",
  completed: "Completed",
  cancelled: "Cancelled",
  draft: "Draft",
};

function StatusBadge({ status, children, ...props }: StatusBadgeProps) {
  return (
    <Badge variant={statusVariantMap[status]} {...props}>
      {children || statusLabelMap[status]}
    </Badge>
  );
}

// Dot Badge component for notification indicators
interface DotBadgeProps extends Omit<BadgeProps, "children"> {
  count?: number;
  showZero?: boolean;
  max?: number;
}

function DotBadge({ 
  count = 0, 
  showZero = false, 
  max = 99, 
  className,
  ...props 
}: DotBadgeProps) {
  if (count === 0 && !showZero) {
    return null;
  }

  const displayCount = count > max ? `${max}+` : count.toString();

  return (
    <Badge 
      className={cn(
        "h-5 w-5 p-0 flex items-center justify-center text-xs",
        count === 0 && "h-2 w-2",
        className
      )}
      {...props}
    >
      {count === 0 ? null : displayCount}
    </Badge>
  );
}

// Tag Badge component for removable tags
interface TagBadgeProps extends Omit<BadgeProps, "removable"> {
  label: string;
  onRemove?: () => void;
}

function TagBadge({ label, onRemove, ...props }: TagBadgeProps) {
  return (
    <Badge 
      removable={!!onRemove} 
      onRemove={onRemove}
      variant="outline"
      {...props}
    >
      {label}
    </Badge>
  );
}

// Priority Badge component
interface PriorityBadgeProps extends Omit<BadgeProps, "variant"> {
  priority: "low" | "medium" | "high" | "urgent";
}

const priorityVariantMap = {
  low: "gray" as const,
  medium: "info" as const,
  high: "warning" as const,
  urgent: "destructive" as const,
};

const priorityLabelMap = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

function PriorityBadge({ priority, children, ...props }: PriorityBadgeProps) {
  return (
    <Badge variant={priorityVariantMap[priority]} {...props}>
      {children || priorityLabelMap[priority]}
    </Badge>
  );
}

// Category Badge component with predefined colors
interface CategoryBadgeProps extends Omit<BadgeProps, "variant"> {
  category: string;
  colorScheme?: "default" | "colorful";
}

function CategoryBadge({ 
  category, 
  colorScheme = "default", 
  ...props 
}: CategoryBadgeProps) {
  // Simple hash function to assign consistent colors
  const getVariantFromString = (str: string) => {
    if (colorScheme === "default") return "secondary";
    
    const variants = ["default", "success", "warning", "info", "purple", "pink"];
    const hash = str.split("").reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return variants[Math.abs(hash) % variants.length] as "default" | "success" | "warning" | "info" | "purple" | "pink";
  };

  return (
    <Badge variant={getVariantFromString(category)} {...props}>
      {category}
    </Badge>
  );
}

export { 
  Badge, 
  StatusBadge, 
  DotBadge, 
  TagBadge, 
  PriorityBadge, 
  CategoryBadge,
  badgeVariants 
};
