import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Consistent class ordering utility
export const classOrder = {
  // Layout
  layout: ["flex", "grid", "block", "inline", "hidden"],
  // Positioning
  position: ["relative", "absolute", "fixed", "sticky"],
  // Display
  display: ["flex", "grid", "block", "inline-block", "inline", "hidden"],
  // Flexbox/Grid
  flexGrid: ["flex-col", "flex-row", "items-center", "justify-center", "gap-"],
  // Sizing
  sizing: ["w-", "h-", "min-w-", "min-h-", "max-w-", "max-h-"],
  // Spacing
  spacing: ["m-", "mt-", "mr-", "mb-", "ml-", "mx-", "my-", "p-", "pt-", "pr-", "pb-", "pl-", "px-", "py-"],
  // Typography
  typography: ["text-", "font-", "leading-", "tracking-", "text-left", "text-center", "text-right"],
  // Background
  background: ["bg-"],
  // Border
  border: ["border", "border-t", "border-r", "border-b", "border-l", "rounded"],
  // Effects
  effects: ["shadow", "opacity-", "backdrop-"],
  // Transitions
  transitions: ["transition", "duration-", "ease-"],
  // Transforms
  transforms: ["transform", "scale-", "rotate-", "translate-"],
  // Interactivity
  interactivity: ["cursor-", "select-", "pointer-events-"],
  // States
  states: ["hover:", "focus:", "active:", "disabled:"],
};

// Animation variants
export const animations = {
  fadeIn: "animate-in fade-in-0 duration-200",
  fadeOut: "animate-out fade-out-0 duration-150",
  slideDown: "animate-in slide-in-from-top-2 duration-200",
  slideUp: "animate-in slide-in-from-bottom-2 duration-200",
  slideLeft: "animate-in slide-in-from-right-2 duration-200",
  slideRight: "animate-in slide-in-from-left-2 duration-200",
  scaleIn: "animate-in zoom-in-95 duration-200",
  scaleOut: "animate-out zoom-out-95 duration-150",
};

// Common component variants
export const variants = {
  button: {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  },
  input: {
    default: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  },
  card: {
    default: "rounded-lg border bg-card text-card-foreground shadow-sm",
  },
};

// Responsive breakpoints helper
export const responsive = {
  mobile: "sm:",
  tablet: "md:",
  desktop: "lg:",
  wide: "xl:",
  ultrawide: "2xl:",
};

// Color palette helper
export const colors = {
  primary: "#1665F4",
  dark: {
    primary: "#0A0F1C",
    secondary: "#0D1426",
    tertiary: "#1A2436",
    quaternary: "#334155",
    accent: "#2B446B",
    muted: "#3E4968",
  },
  light: {
    primary: "#FFFFFF",
    secondary: "#CFD9E9",
    tertiary: "#B9C5D8",
  },
  destructive: "#D53030",
  accent: {
    blue: "#11A4C8",
    purple: "#B57CE9",
    green: "#69DC94",
    red: "#DE5757",
    yellow: "#C1912B",
  },
};
