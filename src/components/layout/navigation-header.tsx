"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { SearchInput } from "@/components/ui/input";
import { UserDropdown } from "./user/dropdown";
import { SearchModal } from "./search-modal";
import { NotificationDropdown } from "./notifications/dropdown";
import { cn } from "@/lib/utils";
import { hoverEffects, transitions, focusStyles } from "@/lib/hover-effects";
import DropdownMenuOverlay from "../common/DropdownMenuOverlay";
import { MenuPanel } from "./menu-panel";
import { UserMenuContent } from "./user/menu-content";
import { NotificationMenuContent } from "./notifications/menu-content";

interface NavigationHeaderProps {
  className?: string;
}

type MenuType = "user" | "nav" | "notification" | null;

export function NavigationHeader({ className }: NavigationHeaderProps) {
  const [isSearchModalOpen, setIsSearchModalOpen] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState<MenuType>(null);
  const [overlayVisible, setOverlayVisible] = React.useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  const pathname = usePathname();

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle scroll behavior for header visibility on all devices
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 100; // Minimum scroll distance before hiding
      const scrollUpThreshold = 10; // Minimum scroll up distance to show

      // Show header at top of page
      if (currentScrollY < scrollThreshold) {
        setIsHeaderVisible(true);
      }
      // Hide header when scrolling down significantly
      else if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
        setIsHeaderVisible(false);
      }
      // Show header when scrolling up
      else if (lastScrollY - currentScrollY > scrollUpThreshold) {
        setIsHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [lastScrollY]);

  const toggleMenu = (menu: MenuType) => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  React.useEffect(() => {
    setOverlayVisible(Boolean(activeMenu));
  }, [activeMenu]);

  React.useEffect(() => {
    if (!activeMenu || typeof document === "undefined") {
      return undefined;
    }

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPosition = body.style.position;
    const previousTop = body.style.top;
    const previousWidth = body.style.width;
    const scrollY = window.scrollY;

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    return () => {
      body.style.overflow = previousOverflow;
      body.style.position = previousPosition;
      body.style.top = previousTop;
      body.style.width = previousWidth;

      window.scrollTo(0, scrollY);
    };
  }, [activeMenu]);

  return (
    <>
      <DropdownMenuOverlay isVisible={overlayVisible} />
      <header
        className={cn(
          "fixed top-0 w-full bg-[#0D1426] transition-transform duration-300 ease-in-out will-change-transform",
          isHeaderVisible ? "translate-y-0" : "-translate-y-full",
          overlayVisible ? "z-[100]" : "z-[15]",
          className
        )}
      >
        <div className="flex h-[78px] w-full max-w-[1240px] mx-auto items-center justify-between px-6 xl:px-0">
          {/* Left section - Logo and Navigation */}
          <div className="flex items-center gap-4 sm:gap-8">
            {/* Logo */}
            <Link
              href="/"
              className={cn(
                "flex items-center gap-2",
                hoverEffects.nav.logo,
                transitions.normal,
                focusStyles.default
              )}
            >
              <div className="relative h-[30px] w-[30px]">
                <Image
                  src="/assets/logo.svg"
                  alt="Toraka Logo"
                  width={30}
                  height={30}
                  className="h-full w-full"
                />
              </div>
              <div className="relative h-[17px] w-[71px]">
                <Image
                  src="/assets/toraka-text.svg"
                  alt="Toraka"
                  width={71}
                  height={17}
                  className="h-full w-full"
                />
              </div>
            </Link>

            {/* Navigation Links - Desktop */}
            <nav className="hidden lg:flex items-center gap-6 relative">
              <Link
                href="/"
                className={cn(
                  "text-base font-semibold px-3 py-2 relative",
                  pathname === "/" ? "text-white" : "text-[#A9B2C8]",
                  hoverEffects.nav.item,
                  transitions.colors,
                  focusStyles.default,
                  // Add bottom border for active state - positioned at bottom of nav
                  pathname === "/" &&
                    "after:absolute after:bottom-[-18px] after:left-0 after:right-0 after:h-[2px] after:bg-[#0064FF]"
                )}
              >
                Home
              </Link>
              <Link
                href="/bookmarks"
                className={cn(
                  "text-base font-semibold px-3 py-2 relative",
                  pathname === "/bookmarks" ? "text-white" : "text-[#A9B2C8]",
                  hoverEffects.nav.item,
                  transitions.colors,
                  focusStyles.default,
                  // Add bottom border for active state - positioned at bottom of nav
                  pathname === "/bookmarks" &&
                    "after:absolute after:bottom-[-18px] after:left-0 after:right-0 after:h-[2px] after:bg-[#0064FF]"
                )}
              >
                Bookmarks
              </Link>
              <Link
                href="/browse"
                className={cn(
                  "text-base font-semibold px-3 py-2 relative",
                  pathname === "/browse" ? "text-white" : "text-[#A9B2C8]",
                  hoverEffects.nav.item,
                  transitions.colors,
                  focusStyles.default,
                  // Add bottom border for active state - positioned at bottom of nav
                  pathname === "/browse" &&
                    "after:absolute after:bottom-[-18px] after:left-0 after:right-0 after:h-[2px] after:bg-[#0064FF]"
                )}
              >
                Browse
              </Link>
            </nav>
          </div>

          {/* Right section - Search, Notifications, User */}
          <div className="flex items-center gap-3 sm:gap-3">
            {/* Search Bar - Hidden on mobile */}
            <div className="relative hidden lg:block w-[240px] lg:w-[340px]">
              <SearchInput
                placeholder="Search series by title"
                showKeyboardShortcut={true}
                className={cn(
                  "h-[49px] bg-[#1A2436] border-1 border-[#334155] text-base text-[#878F9C] placeholder:text-[#878F9C] rounded-lg focus:outline-none"
                )}
                onFocus={() => setIsSearchModalOpen(true)}
                // onSearch={() => {
                //   setIsSearchModalOpen(true);
                // }}
              />
            </div>
            {/* Mobile Icons Container - Specific spacing for mobile */}
            <div className="flex items-center gap-4 sm:hidden">
              {!activeMenu && (
                <>
                  {/* Notifications */}
                   <Button
                   onClick={() => toggleMenu("notification")}
                    className="flex items-center gap-2 p-0 transition-colors cursor-pointer"
                    aria-label="Open notifications">
                      <div className="w-6 h-6 rounded flex items-center justify-center">
                        <Bell
                          className="h-6 w-6 text-[#DDE1F0]"
                          strokeWidth={1.5}
                        />
                      </div>
                    </Button>
                  {/* User Avatar with Dropdown */}
                  <Button
                    variant="ghost"
                    className={cn(
                      "relative h-7 w-7 rounded-full px-3 py-3 group",
                      transitions.normal,
                      focusStyles.button
                    )}
                    onClick={() => toggleMenu("user")}
                    aria-label="Open user menu"
                  >
                    <Avatar className="h-7 w-7 transition-transform duration-200 will-change-transform">
                      <AvatarImage
                        src="/assets/user-avatar-3666df.png"
                        alt="User Avatar"
                      />
                      {/* <UserRound
                        className="h-6 w-6 text-[#DDE1F0]"
                        strokeWidth={1.5}
                      /> */}
                    </Avatar>
                  </Button>
                </>
              )}
              {/* Mobile Menu Button - Show at lg (1024px) and below */}
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "relative h-6 w-6 p-0",
                  hoverEffects.icon.button,
                  transitions.normal,
                  focusStyles.button
                )}
                onClick={() =>
                  toggleMenu(!activeMenu ? 'nav' : null)
                }
                aria-label={activeMenu ? "Close menu" : "Open menu"}
              >
                {activeMenu ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>

            {/* Desktop Icons - Hidden on mobile */}
            <div className="hidden sm:flex items-center gap-1">
              {/* Notifications */}
              <NotificationDropdown onOpen={() => setActiveMenu(null)}>
                <Button
                  className="flex hover:bg-[#1e293b]/50 items-center gap-2 px-3 py-2 transition-all duration-200 cursor-pointer outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-transparent focus:ring-offset-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent focus-visible:ring-offset-transparent active:outline-none active:ring-0 active:ring-offset-0 active:ring-transparent active:ring-offset-transparent rounded-md"
                  onMouseDown={(e) => e.preventDefault()}
                  onFocus={(e) => e.target.blur()}
                  aria-label="Open notifications"
                >
                  <Bell
                    className="h-5 w-5 text-[#DDE1F0]"
                    strokeWidth={1.5}
                  />
                </Button>
              </NotificationDropdown>

              {/* User Avatar with Dropdown */}
              <UserDropdown onOpen={() => setActiveMenu(null)}>
                <Button
                  className="flex hover:bg-[#1e293b]/50 items-center gap-2 px-2 py-2 transition-all duration-200 cursor-pointer outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-transparent focus:ring-offset-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent focus-visible:ring-offset-transparent active:outline-none active:ring-0 active:ring-offset-0 active:ring-transparent active:ring-offset-transparent rounded-md"
                  onMouseDown={(e) => e.preventDefault()}
                  onFocus={(e) => e.target.blur()}
                >
                  <Avatar className="h-7 w-7 transition-transform duration-200 will-change-transform">
                    <AvatarImage
                      src="/assets/user-avatar-3666df.png"
                      alt="User Avatar"
                    />
                    {/* <AvatarFallback>UA</AvatarFallback> */}
                  </Avatar>
                </Button>
              </UserDropdown>

              {/* Mobile Menu Button - Show at lg (1024px) and below */}
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "lg:hidden h-10 w-11 p-0",
                  hoverEffects.icon.button,
                  transitions.normal,
                  focusStyles.button
                )}
                onClick={() => toggleMenu("nav")}
                aria-label={activeMenu === 'nav' ? "Close navigation menu" : "Open navigation menu"}
              >
                {activeMenu === 'nav' ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {activeMenu === "nav" && (
          <MenuPanel>
            <Link
              href="/"
              className={cn(
                "text-base font-semibold px-6 py-2 rounded-md",
                pathname === "/" ? "text-white" : "text-muted-foreground",
                hoverEffects.nav.item,
                transitions.colors,
                focusStyles.default
              )}
              onClick={() => toggleMenu(null)}
            >
              Home
            </Link>
            <Link
              href="/bookmarks"
              className={cn(
                "text-base font-semibold px-6 py-2 rounded-md",
                pathname === "/bookmarks"
                  ? "text-white"
                  : "text-muted-foreground",
                hoverEffects.nav.item,
                transitions.colors,
                focusStyles.default
              )}
              onClick={() => toggleMenu(null)}
            >
              Bookmarks
            </Link>
            <Link
              href="/browse"
              className={cn(
                "text-base font-semibold px-6 py-2 rounded-md",
                pathname === "/browse" ? "text-white" : "text-muted-foreground",
                hoverEffects.nav.item,
                transitions.colors,
                focusStyles.default
              )}
              onClick={() => toggleMenu(null)}
            >
              Browse
            </Link>

            {/* Mobile Search */}
            <div className="pt-3 pb-6 px-6">
              <SearchInput
                placeholder="Search series by title"
                showKeyboardShortcut={false}
                className={cn(
                  "h-[49px] bg-[#1A2436] border-2 border-[#334155] text-base text-[#878F9C] placeholder:text-[#878F9C] rounded-lg focus:outline-none"
                )}
                onFocus={() => setIsSearchModalOpen(true)}
                onSearch={() => {
                  setIsSearchModalOpen(true);
                }}
              />
            </div>
          </MenuPanel>
        )}

        {activeMenu === "user" && (
          <MenuPanel>
            <UserMenuContent isMobile={true} />
          </MenuPanel>
        )}


        {activeMenu === "notification" && (
          <MenuPanel>
            <NotificationMenuContent isMobile={true} />
          </MenuPanel>
        )}

        {/* Search Modal */}
        <SearchModal
          isOpen={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
        />
      </header>
    </>
  );
}
