import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "",
        outline: "border-2",
        ghost: "border-transparent shadow-none",
        elevated: "shadow-lg",
        interactive: "cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]",
      },
      size: {
        sm: "p-3",
        md: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    noPadding?: boolean;
  }
>(({ className, noPadding = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5",
      !noPadding && "p-6",
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const cardTitleVariants = cva(
  "font-semibold leading-none tracking-tight",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-lg",
        lg: "text-xl",
        xl: "text-2xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof cardTitleVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, size, as: Component = "h3", ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(cardTitleVariants({ size }), className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    noPadding?: boolean;
  }
>(({ className, noPadding = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(!noPadding && "p-6 pt-0", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    noPadding?: boolean;
  }
>(({ className, noPadding = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center",
      !noPadding && "p-6 pt-0",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// Convenience component for simple card creation
interface SimpleCardProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: VariantProps<typeof cardVariants>["variant"];
  size?: VariantProps<typeof cardVariants>["size"];
  titleSize?: VariantProps<typeof cardTitleVariants>["size"];
  className?: string;
  headerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  onClick?: () => void;
}

const SimpleCard = ({
  title,
  description,
  content,
  footer,
  variant = "default",
  size = "md",
  titleSize = "md",
  className,
  headerClassName,
  titleClassName,
  descriptionClassName,
  contentClassName,
  footerClassName,
  onClick,
}: SimpleCardProps) => {
  return (
    <Card
      variant={onClick ? "interactive" : variant}
      size={size}
      className={className}
      onClick={onClick}
    >
      {(title || description) && (
        <CardHeader className={headerClassName}>
          {title && (
            <CardTitle size={titleSize} className={titleClassName}>
              {title}
            </CardTitle>
          )}
          {description && (
            <CardDescription className={descriptionClassName}>
              {description}
            </CardDescription>
          )}
        </CardHeader>
      )}
      {content && (
        <CardContent className={contentClassName}>
          {content}
        </CardContent>
      )}
      {footer && (
        <CardFooter className={footerClassName}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

// Specialized card components
const StatsCard = React.forwardRef<
  HTMLDivElement,
  {
    title: string;
    value: string | number;
    description?: string;
    icon?: React.ReactNode;
    trend?: {
      value: number;
      isPositive: boolean;
    };
    className?: string;
  }
>(({ title, value, description, icon, trend, className, ...props }, ref) => (
  <Card ref={ref} className={cn("p-6", className)} {...props}>
    <div className="flex items-center justify-between space-y-0 pb-2">
      <CardTitle size="sm" className="text-sm font-medium">
        {title}
      </CardTitle>
      {icon && <div className="h-4 w-4 text-muted-foreground">{icon}</div>}
    </div>
    <div>
      <div className="text-2xl font-bold">{value}</div>
      {(description || trend) && (
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          {trend && (
            <span className={cn(
              "font-medium",
              trend.isPositive ? "text-green-600" : "text-red-600"
            )}>
              {trend.isPositive ? "+" : ""}{trend.value}%
            </span>
          )}
          {description && <span>{description}</span>}
        </div>
      )}
    </div>
  </Card>
));
StatsCard.displayName = "StatsCard";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  SimpleCard,
  StatsCard,
  cardVariants,
  cardTitleVariants,
};
