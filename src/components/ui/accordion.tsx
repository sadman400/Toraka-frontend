"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const Accordion = AccordionPrimitive.Root;

const accordionItemVariants = cva(
  "border-b",
  {
    variants: {
      variant: {
        default: "border-border",
        card: "border border-border rounded-lg mb-2 last:mb-0",
        ghost: "border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>,
    VariantProps<typeof accordionItemVariants> {}

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, variant, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(accordionItemVariants({ variant }), className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const accordionTriggerVariants = cva(
  "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
  {
    variants: {
      variant: {
        default: "text-sm",
        large: "text-base py-6",
        compact: "text-sm py-2",
      },
      padding: {
        none: "px-0",
        sm: "px-2",
        md: "px-4",
        lg: "px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "none",
    },
  }
);

export interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>,
    VariantProps<typeof accordionTriggerVariants> {
  hideIcon?: boolean;
}

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, variant, padding, hideIcon = false, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(accordionTriggerVariants({ variant, padding }), className)}
      {...props}
    >
      {children}
      {!hideIcon && (
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const accordionContentVariants = cva(
  "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
  {
    variants: {
      padding: {
        none: "pb-4 pt-0",
        sm: "pb-4 pt-0 px-2",
        md: "pb-4 pt-0 px-4",
        lg: "pb-6 pt-0 px-6",
      },
    },
    defaultVariants: {
      padding: "none",
    },
  }
);

export interface AccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>,
    VariantProps<typeof accordionContentVariants> {}

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, padding, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(accordionContentVariants({ padding }), className)}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

// Convenience component for simple accordion creation
interface SimpleAccordionProps {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  items: Array<{
    value: string;
    trigger: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
  }>;
  variant?: VariantProps<typeof accordionItemVariants>["variant"];
  triggerVariant?: VariantProps<typeof accordionTriggerVariants>["variant"];
  padding?: VariantProps<typeof accordionTriggerVariants>["padding"];
  className?: string;
  itemClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

const SimpleAccordion = ({
  type = "single",
  collapsible = true,
  defaultValue,
  value,
  onValueChange,
  items,
  variant = "default",
  triggerVariant = "default",
  padding = "none",
  className,
  itemClassName,
  triggerClassName,
  contentClassName,
}: SimpleAccordionProps) => {
  const accordionProps = type === "single"
    ? {
        type: "single" as const,
        collapsible,
        ...(defaultValue !== undefined ? { defaultValue: defaultValue as string } : {}),
        ...(value !== undefined ? { value: value as string } : {}),
        ...(onValueChange ? { onValueChange: onValueChange as (value: string) => void } : {}),
        className,
      }
    : {
        type: "multiple" as const,
        ...(defaultValue !== undefined ? { defaultValue: defaultValue as string[] } : {}),
        ...(value !== undefined ? { value: value as string[] } : {}),
        ...(onValueChange ? { onValueChange: onValueChange as (value: string[]) => void } : {}),
        className,
      };

  return (
    <Accordion {...accordionProps}>
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          variant={variant}
          className={itemClassName}
        >
          <AccordionTrigger
            variant={triggerVariant}
            padding={padding}
            className={triggerClassName}
            disabled={item.disabled}
          >
            {item.trigger}
          </AccordionTrigger>
          <AccordionContent padding={padding} className={contentClassName}>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  SimpleAccordion,
};
