import { cn } from "./utils";

// Consistent hover effect classes for different component types
export const hoverEffects = {
  // Button hover effects
  button: {
    primary: "hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
    secondary: "hover:bg-secondary/80 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
    ghost: "hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
    destructive: "hover:bg-destructive/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
    outline: "hover:bg-accent hover:text-accent-foreground hover:border-accent-foreground/20 transition-all duration-200",
  },

  // Card hover effects
  card: {
    default: "hover:shadow-lg hover:shadow-black/10 hover:-translate-y-1 transition-all duration-300 ease-out",
    interactive: "hover:shadow-lg hover:shadow-black/10 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer transition-all duration-300 ease-out",
    subtle: "hover:bg-accent/50 transition-colors duration-200",
  },

  // Link hover effects
  link: {
    default: "hover:text-primary transition-colors duration-200",
    underline: "hover:text-primary hover:underline underline-offset-4 transition-all duration-200",
    scale: "hover:scale-105 transition-transform duration-200",
  },

  // Navigation hover effects
  nav: {
    item: "hover:text-white rounded-md transition-all duration-200",
    logo: "hover:scale-105 transition-transform duration-200",
  },

  // Input hover effects
  input: {
    default: "hover:border-ring/50 focus:border-ring transition-colors duration-200",
    search: "hover:shadow-md hover:shadow-black/5 transition-all duration-200",
  },

  // Avatar hover effects
  avatar: {
    default: "hover:scale-110 hover:shadow-lg hover:shadow-primary/20 transition-all duration-200",
    interactive: "hover:scale-110 hover:shadow-lg hover:shadow-primary/20 hover:ring-2 hover:ring-primary/20 transition-all duration-200",
  },

  // Icon hover effects
  icon: {
    default: "hover:text-primary hover:scale-110 transition-all duration-200",
    button: "hover:text-primary hover:scale-110 hover:bg-accent/50 rounded-md transition-all duration-200",
    notification: "hover:text-primary hover:scale-110 hover:animate-bounce-subtle transition-all duration-200",
  },

  // Dropdown hover effects
  dropdown: {
    item: "hover:bg-accent hover:text-accent-foreground transition-colors duration-150",
    trigger: "hover:bg-accent hover:text-accent-foreground transition-colors duration-200",
  },

  // Image hover effects
  image: {
    zoom: "hover:scale-105 transition-transform duration-300 ease-out",
    overlay: "hover:brightness-110 transition-all duration-300",
    lift: "hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out",
  },

  // List item hover effects
  listItem: {
    default: "hover:bg-accent/50 transition-colors duration-200",
    interactive: "hover:bg-accent hover:text-accent-foreground hover:scale-[1.01] transition-all duration-200",
  },

  // Badge hover effects
  badge: {
    default: "hover:bg-primary/90 hover:scale-105 transition-all duration-200",
    outline: "hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200",
  },

  // Slider/Carousel hover effects
  slider: {
    item: "hover:scale-105 hover:shadow-lg hover:shadow-black/10 transition-all duration-300 ease-out",
    control: "hover:bg-accent hover:text-accent-foreground hover:scale-110 transition-all duration-200",
  },
};

// Animation classes for different states
export const animations = {
  // Entry animations
  enter: {
    fadeIn: "animate-fade-in",
    slideDown: "animate-slide-in-from-top",
    slideUp: "animate-slide-in-from-bottom",
    slideLeft: "animate-slide-in-from-right",
    slideRight: "animate-slide-in-from-left",
    zoomIn: "animate-zoom-in",
    scaleIn: "animate-scale-in",
  },

  // Exit animations
  exit: {
    fadeOut: "animate-fade-out",
    zoomOut: "animate-zoom-out",
    scaleOut: "animate-scale-out",
  },

  // Loading animations
  loading: {
    pulse: "animate-pulse",
    pulseSubtle: "animate-pulse-subtle",
    spin: "animate-spin",
  },

  // Interaction animations
  interaction: {
    bounce: "animate-bounce-subtle",
    scale: "hover:animate-scale-in",
  },
};

// Utility function to combine hover effects with custom classes
export function withHoverEffect(
  baseClasses: string,
  hoverType: keyof typeof hoverEffects,
  hoverVariant: string,
  customClasses?: string
) {
  const hoverEffect = hoverEffects[hoverType]?.[hoverVariant as keyof typeof hoverEffects[typeof hoverType]];
  return cn(baseClasses, hoverEffect, customClasses);
}

// Utility function to add animation classes
export function withAnimation(
  baseClasses: string,
  animationType: keyof typeof animations,
  animationVariant: string,
  customClasses?: string
) {
  const animation = animations[animationType]?.[animationVariant as keyof typeof animations[typeof animationType]];
  return cn(baseClasses, animation, customClasses);
}

// Common transition classes
export const transitions = {
  fast: "transition-all duration-150 ease-in-out",
  normal: "transition-all duration-200 ease-in-out",
  slow: "transition-all duration-300 ease-in-out",
  colors: "transition-colors duration-200",
  transform: "transition-transform duration-200",
  shadow: "transition-shadow duration-200",
  opacity: "transition-opacity duration-200",
};

// Focus styles
export const focusStyles = {
  default: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  button: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  input: "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  card: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
};
