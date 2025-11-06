"use client";

import * as React from "react";
import { NavigationHeader } from "./navigation-header";
import { Footer } from "./footer";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationHeader />
      <main
        className={cn(
          "w-full flex-1",
          className
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
