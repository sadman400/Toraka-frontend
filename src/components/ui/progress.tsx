"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const progressVariants = cva(
  "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      size: {
        sm: "h-2",
        md: "h-4",
        lg: "h-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const progressIndicatorVariants = cva(
  "h-full w-full flex-1 bg-primary transition-all",
  {
    variants: {
      variant: {
        default: "bg-primary",
        success: "bg-green-600",
        warning: "bg-yellow-600",
        destructive: "bg-destructive",
        info: "bg-blue-600",
        purple: "bg-purple-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof progressIndicatorVariants> {
  showValue?: boolean;
  valuePosition?: "inside" | "outside" | "none";
  formatValue?: (value: number) => string;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ 
  className, 
  value = 0, 
  size, 
  variant, 
  showValue = false,
  valuePosition = "outside",
  formatValue = (val) => `${val}%`,
  ...props 
}, ref) => {
  const displayValue = formatValue(value || 0);

  return (
    <div className="w-full">
      {showValue && valuePosition === "outside" && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">Progress</span>
          <span className="text-sm text-muted-foreground">{displayValue}</span>
        </div>
      )}
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(progressVariants({ size }), className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(progressIndicatorVariants({ variant }))}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
        {showValue && valuePosition === "inside" && size !== "sm" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-white mix-blend-difference">
              {displayValue}
            </span>
          </div>
        )}
      </ProgressPrimitive.Root>
    </div>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

// Circular Progress component
interface CircularProgressProps {
  value?: number;
  size?: number;
  strokeWidth?: number;
  variant?: VariantProps<typeof progressIndicatorVariants>["variant"];
  showValue?: boolean;
  formatValue?: (value: number) => string;
  className?: string;
}

const CircularProgress = ({
  value = 0,
  size = 120,
  strokeWidth = 8,
  variant = "default",
  showValue = true,
  formatValue = (val) => `${val}%`,
  className,
}: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  const variantColors = {
    default: "#1665F4",
    success: "#16a34a",
    warning: "#ca8a04",
    destructive: "#dc2626",
    info: "#2563eb",
    purple: "#9333ea",
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-muted"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={variantColors[variant || "default"]}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-medium text-foreground">
            {formatValue(value)}
          </span>
        </div>
      )}
    </div>
  );
};

// Multi-step Progress component
interface MultiStepProgressProps {
  steps: Array<{
    label: string;
    completed: boolean;
    current?: boolean;
  }>;
  variant?: VariantProps<typeof progressIndicatorVariants>["variant"];
  orientation?: "horizontal" | "vertical";
  showLabels?: boolean;
  className?: string;
}

const MultiStepProgress = ({
  steps,
  variant = "default",
  orientation = "horizontal",
  showLabels = true,
  className,
}: MultiStepProgressProps) => {
  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  if (orientation === "vertical") {
    return (
      <div className={cn("flex flex-col space-y-4", className)}>
        {steps.map((step, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium",
                step.completed
                  ? "border-primary bg-primary text-primary-foreground"
                  : step.current
                  ? "border-primary bg-background text-primary"
                  : "border-muted-foreground bg-background text-muted-foreground"
              )}
            >
              {step.completed ? "✓" : index + 1}
            </div>
            {showLabels && (
              <span
                className={cn(
                  "text-sm font-medium",
                  step.completed || step.current
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-2">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium",
                step.completed
                  ? "border-primary bg-primary text-primary-foreground"
                  : step.current
                  ? "border-primary bg-background text-primary"
                  : "border-muted-foreground bg-background text-muted-foreground"
              )}
            >
              {step.completed ? "✓" : index + 1}
            </div>
            {showLabels && (
              <span
                className={cn(
                  "mt-2 text-xs font-medium text-center max-w-20",
                  step.completed || step.current
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            )}
          </div>
        ))}
      </div>
      <Progress value={progressPercentage} variant={variant} />
    </div>
  );
};

export { 
  Progress, 
  CircularProgress, 
  MultiStepProgress,
  progressVariants,
  progressIndicatorVariants,
};
