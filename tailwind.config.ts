import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '440px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          DEFAULT: "#1665F4",
          50: "#F0F4FF",
          100: "#E0EAFF",
          200: "#C7D8FF",
          300: "#A3BFFF",
          400: "#7A9BFF",
          500: "#1665F4",
          600: "#0F52D1",
          700: "#0C42A8",
          800: "#0A3580",
          900: "#082B5C",
        },
        // Dark theme colors
        dark: {
          primary: "#0A0F1C",
          secondary: "#0D1426",
          tertiary: "#1A2436",
          quaternary: "#334155",
          accent: "#2B446B",
          muted: "#3E4968",
        },
        // Light colors
        light: {
          primary: "#FFFFFF",
          secondary: "#CFD9E9",
          tertiary: "#B9C5D8",
        },
        // Status colors
        destructive: {
          DEFAULT: "#D53030",
          foreground: "#FFFFFF",
        },
        // Accent colors
        accent: {
          blue: "#11A4C8",
          purple: "#B57CE9",
          green: "#69DC94",
          red: "#DE5757",
          yellow: "#C1912B",
        },
        // Semantic colors
        background: "#0A0F1C",
        foreground: "#DDE1F0",
        card: "#0D1426",
        "card-foreground": "#DDE1F0",
        popover: "#171F34",
        "popover-foreground": "#DDE1F0",
        muted: "#1A2436",
        "muted-foreground": "#A9B2C8",
        border: "#334155",
        input: "#1A2436",
        ring: "#1665F4",
        secondary: "#1A2436",
        "secondary-foreground": "#DDE1F0",
      },
      fontFamily: {
        sans: ["SF Pro", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "21px" }],
        lg: ["18px", { lineHeight: "24px" }],
        xl: ["20px", { lineHeight: "28px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["30px", { lineHeight: "36px" }],
        "4xl": ["36px", { lineHeight: "40px" }],
        "5xl": ["48px", { lineHeight: "1" }],
        "6xl": ["60px", { lineHeight: "1" }],
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "510",
        semibold: "600",
        bold: "700",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "6px",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      boxShadow: {
        "dropdown": "0px 1px 19.9px 0px rgba(0, 0, 0, 0.4)",
        "search": "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease-in-out",
        "fade-out": "fadeOut 0.15s ease-in-out",
        "slide-down": "slideDown 0.2s ease-in-out",
        "slide-up": "slideUp 0.2s ease-in-out",
        "slide-in-from-top": "slideInFromTop 0.2s ease-in-out",
        "slide-in-from-bottom": "slideInFromBottom 0.2s ease-in-out",
        "slide-in-from-left": "slideInFromLeft 0.2s ease-in-out",
        "slide-in-from-right": "slideInFromRight 0.2s ease-in-out",
        "zoom-in": "zoomIn 0.2s ease-in-out",
        "zoom-out": "zoomOut 0.15s ease-in-out",
        "pulse-subtle": "pulseSubtle 2s ease-in-out infinite",
        "bounce-subtle": "bounceSubtle 0.6s ease-in-out",
        "scale-in": "scaleIn 0.2s ease-in-out",
        "scale-out": "scaleOut 0.15s ease-in-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInFromTop: {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInFromBottom: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInFromLeft: {
          "0%": { opacity: "0", transform: "translateX(-8px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInFromRight: {
          "0%": { opacity: "0", transform: "translateX(8px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        zoomIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        zoomOut: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.95)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        scaleOut: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0.95)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
