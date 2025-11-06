"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const tooltipContentVariants = cva(
  "z-50 overflow-hidden rounded-md border px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default: "bg-popover text-popover-foreground",
        dark: "bg-[#1A2436] text-white border-[#334155]",
        light: "bg-white text-gray-900 border-gray-200",
        primary: "bg-primary text-primary-foreground border-primary",
        destructive: "bg-destructive text-destructive-foreground border-destructive",
        success: "bg-green-600 text-white border-green-600",
        warning: "bg-yellow-600 text-white border-yellow-600",
        info: "bg-blue-600 text-white border-blue-600",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipContentVariants> {}

const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, variant = "default", size, sideOffset = 4, ...props }, ref) => {
  // Get arrow color based on variant
  const getArrowColor = () => {
    switch (variant) {
      case "dark": return "fill-[#1A2436]";
      case "light": return "fill-white";
      case "primary": return "fill-primary";
      case "destructive": return "fill-destructive";
      case "success": return "fill-green-600";
      case "warning": return "fill-yellow-600";
      case "info": return "fill-blue-600";
      default: return "fill-popover";
    }
  };

  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(tooltipContentVariants({ variant, size }), className)}
      {...props}
    >
      {props.children}
      <TooltipPrimitive.Arrow className={cn("w-2 h-2", getArrowColor())} />
    </TooltipPrimitive.Content>
  );
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// Convenience wrapper component for simple tooltips
interface SimpleTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  variant?: VariantProps<typeof tooltipContentVariants>["variant"];
  size?: VariantProps<typeof tooltipContentVariants>["size"];
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delayDuration?: number;
  skipDelayDuration?: number;
  className?: string;
  contentClassName?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const SimpleTooltip = ({
  content,
  children,
  variant = "default",
  size = "md",
  side = "top",
  align = "center",
  delayDuration = 700,
  skipDelayDuration = 300,
  className,
  contentClassName,
  disabled = false,
  icon,
}: SimpleTooltipProps) => {
  if (disabled || !content) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider delayDuration={delayDuration} skipDelayDuration={skipDelayDuration}>
      <Tooltip>
        <TooltipTrigger asChild className={className}>
          {children}
        </TooltipTrigger>
        <TooltipContent
          variant={variant}
          size={size}
          side={side}
          align={align}
          className={contentClassName}
        >
          {icon}
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  SimpleTooltip,
};
