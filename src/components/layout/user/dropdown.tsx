"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserMenuContent } from "./menu-content";

interface UserDropdownProps {
  children: React.ReactNode;
  onOpen?: () => void;
}

export function UserDropdown({ children, onOpen }: UserDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && onOpen) {
      onOpen();
    }
  };

  return (
    // Use non-modal dropdown to avoid body scroll locking (body[data-scroll-locked])
    <DropdownMenu modal={false} open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[270px] p-0 bg-[#171F34] border-[#334155] shadow-[0px_1px_19.9px_0px_rgba(0,0,0,0.4)] sm:w-[270px] w-[calc(100dvw-48px)] max-w-[270px]"
        align="end"
        sideOffset={8}
        alignOffset={-12}
      >
        <UserMenuContent isMobile={false} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
