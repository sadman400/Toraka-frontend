"use client";
import * as React from "react";

interface MenuPanelProps {
  children: React.ReactNode;
}

export function MenuPanel({ children }: MenuPanelProps) {
  return (
    <div className="absolute w-full xl:hidden bg-[#0D1426] backdrop-blur">
      <nav>
        <div className="flex flex-col space-y-3">{children}</div>
      </nav>
    </div>
  );
}
