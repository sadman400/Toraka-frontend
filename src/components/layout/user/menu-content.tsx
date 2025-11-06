"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { transitions, focusStyles } from "@/lib/hover-effects";

interface UserMenuContentProps {
  isMobile: boolean;
}

export function UserMenuContent({ isMobile }: UserMenuContentProps) {
  const handleSignOut = () => {
    // Handle sign out logic here
    console.log("Sign out clicked");
  };
  return (
    <div className="flex flex-col">
      {/* User Info */}
      <div className="flex items-center gap-3 px-6 pb-4 sm:p-4">
        <Avatar className="h-[45px] w-[45px]">
          <AvatarImage src="/assets/user-avatar-3666df.png" alt="User Avatar" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-base font-bold text-[#DDE1F0]">Aisle</span>
          <span className="text-base text-[#DDE1F0]">yphepos@gmail.com</span>
        </div>
      </div>

      {/* Profile */}
      <div className="px-6 sm:px-4">
        <Link
          href="/profile"
          className={cn(
            "flex items-center justify-between w-full py-3 cursor-pointer focus-visible:outline-none",
            transitions.colors
          )}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg  p-1">
              <div className="h-6 w-6 relative">
                <Image
                  src="/assets/profile-icon.svg"
                  alt="Profile"
                  width={20}
                  height={20}
                  className="h-full w-full"
                  style={{ width: '20px', height: '20px' }}
                />
              </div>
            </div>
            <span className="text-base text-[#DDE1F0]">Profile</span>
          </div>
          <ChevronRight className="h-5 w-5 text-[#DDE1F0]" />
        </Link>
      </div>
      {/* Settings */}

      <div className="px-6 sm:px-4">
        <Link
          href="/settings"
          className={cn(
            "flex items-center justify-between w-full py-3 cursor-pointer focus-visible:outline-none",
            transitions.colors
          )}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg  p-1">
              <div className="h-6 w-6 relative">
                <Image
                  src="/assets/settings-icon.svg"
                  alt="Settings"
                  width={24}
                  height={24}
                  className="h-full w-full"
                  style={{ width: '24px', height: '24px' }}
                />
              </div>
            </div>
            <span className="text-base text-[#DDE1F0]">Settings</span>
          </div>
          <ChevronRight className="h-5 w-5 text-[#DDE1F0]" />
        </Link>
      </div>


      {/* Sign Out */}
      <div className="border-[#334155] sm:border-t pb-4 sm:pb-0">
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className={cn(
            "w-full justify-center text-[#FF5F57] hover:text-[#FF5F57] hover:bg-[#FF5F57]/10",
            transitions.colors,
            focusStyles.button
          )}
          aria-label="Sign out"
        >
          <span className="text-base font-medium">Sign Out</span>
        </Button>
      </div>
    </div>
  );
}
