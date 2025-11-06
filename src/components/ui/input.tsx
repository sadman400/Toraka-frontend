import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Search, Eye, EyeOff, CircleQuestionMark } from "lucide-react";
import { QuestionMarkIcon } from "@radix-ui/react-icons";

const inputVariants = cva(
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        destructive: "border-destructive focus-visible:ring-destructive",
        success: "border-green-500 focus-visible:ring-green-500",
        warning: "border-yellow-500 focus-visible:ring-yellow-500",
      },
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

// Textarea component
const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        destructive: "border-destructive focus-visible:ring-destructive",
        success: "border-green-500 focus-visible:ring-green-500",
        warning: "border-yellow-500 focus-visible:ring-yellow-500",
      },
      size: {
        sm: "min-h-[60px] px-2 py-1 text-xs",
        md: "min-h-[80px] px-3 py-2 text-sm",
        lg: "min-h-[100px] px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

// Search Input component
export interface SearchInputProps extends Omit<InputProps, "type"> {
  onSearch?: (value: string) => void;
  searchIconPosition?: "left" | "right";
  showSearchIcon?: boolean;
  showKeyboardShortcut?: boolean;
  keyboardShortcut?: string;
  queryIcon?: boolean;
  queryIconPosition?: "left" | "right";
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({
    className,
    onSearch,
    searchIconPosition = "left",
    showSearchIcon = true,
    showKeyboardShortcut = false,
    keyboardShortcut = "Ctrl+K",
    onKeyDown,
    queryIcon = false,
    queryIconPosition = "left",
    ...props
  }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && onSearch) {
        onSearch(e.currentTarget.value);
      }
      onKeyDown?.(e);
    };

    const inputElement = (
      <Input
        ref={ref}
        type="search"
        className={cn(
          showSearchIcon && searchIconPosition === "left" && "pl-12",
          showSearchIcon && searchIconPosition === "right" && "pr-12",
          showKeyboardShortcut && "pr-24",
          queryIcon && queryIconPosition === "left" && "pl-12",
          queryIcon && queryIconPosition === "right" && "pr-12",
          className
        )}
        onKeyDown={handleKeyDown}
        {...props}
      />
    );

    if (!showSearchIcon && !showKeyboardShortcut) {
      return inputElement;
    }

    return (
      <div className="relative">
        {inputElement}
        {showSearchIcon && (
          <Search
            className={cn(
              "absolute top-1/2 h-5 w-5 -translate-y-1/2 text-[#878F9C]",
              searchIconPosition === "left" ? "left-4" : "right-4"
            )}
          />
        )}
        {queryIcon && (
          <div className={`absolute items-center justify-center flex bg-[#878F9C] rounded-full top-1/2 h-4 w-4 -translate-y-1/2 ${queryIconPosition === "left" ? "left-4" : "right-4"}`}>
            <QuestionMarkIcon className="h-3 w-3 text-[#1a2436]" />
          </div>
        )}
        {showKeyboardShortcut && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="px-1 py-0.5 border-1 border-[#878F9C] rounded-md">
              <p className=" text-sm text-[#878F9C] bg-transparent">
              {keyboardShortcut}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

// Password Input component
export interface PasswordInputProps extends Omit<InputProps, "type"> {
  showToggle?: boolean;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showToggle = true, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const inputElement = (
      <Input
        ref={ref}
        type={showPassword ? "text" : "password"}
        className={cn(showToggle && "pr-9", className)}
        {...props}
      />
    );

    if (!showToggle) {
      return inputElement;
    }

    return (
      <div className="relative">
        {inputElement}
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

// Input with Label component
export interface InputWithLabelProps extends InputProps {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
}

const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ 
    label, 
    description, 
    error, 
    required, 
    className,
    labelClassName,
    descriptionClassName,
    errorClassName,
    id,
    ...props 
  }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              labelClassName
            )}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        {description && (
          <p className={cn("text-sm text-muted-foreground", descriptionClassName)}>
            {description}
          </p>
        )}
        <Input
          ref={ref}
          id={inputId}
          variant={error ? "destructive" : props.variant}
          className={className}
          {...props}
        />
        {error && (
          <p className={cn("text-sm text-destructive", errorClassName)}>
            {error}
          </p>
        )}
      </div>
    );
  }
);
InputWithLabel.displayName = "InputWithLabel";

export { 
  Input, 
  Textarea, 
  SearchInput, 
  PasswordInput, 
  InputWithLabel,
  inputVariants,
  textareaVariants,
};
