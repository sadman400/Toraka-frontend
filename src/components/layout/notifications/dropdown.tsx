"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DropdownMenuOverlay from "@/components/common/DropdownMenuOverlay";
import { NotificationMenuContent } from "./menu-content";

interface NotificationDropdownProps {
  children: React.ReactNode;
  onOpen?: () => void;
}
export function NotificationDropdown({ children, onOpen }: NotificationDropdownProps) {
  const [overlayVisible, setOverlayVisible] = React.useState(false);

  const handleOpenChange = (open: boolean) => {
    setOverlayVisible(open);
    if (open && onOpen) {
      onOpen();
    }
  };

  return (
    <DropdownMenu modal={false} open={overlayVisible} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuOverlay isVisible={overlayVisible} />
      <DropdownMenuContent
        className="w-[calc(100dvw)] lg:w-[400px] p-0 bg-[#0F1422] border border-[#212A3B] shadow-lg z-[60]"
        align="end"
        sideOffset={8}
        alignOffset={-57}
      >
        <NotificationMenuContent isMobile={false}/>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
