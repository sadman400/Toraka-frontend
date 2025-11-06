"use client";
import useScreenSizer from "@/lib/useScreenSizer";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  explore: [
    { name: "Home", href: "/" },
    { name: "Browse", href: "/browse" },
    { name: "Bookmarks", href: "/bookmarks" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Share Feedback", href: "/feedback" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "GDPR", href: "/gdpr" },
    { name: "DMCA", href: "/dmca" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { name: "Discord", href: "#", icon: "/assets/icons/discord-icon.svg" },
  { name: "LinkedIn", href: "#", icon: "/assets/icons/linkedin-icon.svg" },
  { name: "Instagram", href: "#", icon: "/assets/icons/instagram-icon.svg" },
  { name: "Reddit", href: "#", icon: "/assets/icons/reddit-icon.svg" },
  { name: "Twitter", href: "#", icon: "/assets/icons/twitter-icon.svg" },
];

export function Footer() {
  const screenSize = useScreenSizer();

  // Prevent hydration mismatch by showing nothing until client-side
  if (!screenSize) {
    return null;
  }

  return (
    <footer className="w-ful pb-4 mt:space-y-12 mt:space-y-3 mt:space-y-12 mt-9 bg-gradient-to-b from-background to-[#0D1426] border-[#131C2C] backdrop-blur-sm px-6">
      <div className="max-w-[1240px] mx-auto">
        <div className="space-y-4">
          {/* Main Footer Content */}
          <div className={cn(
            "py-6",
            // Desktop: Row layout with equal gaps between all sections
            screenSize === "desktop" && "flex flex-row items-start gap-16 xl:gap-44",
            // Tablet: Column layout
            (screenSize === "tablet" || screenSize === "laptop") && "flex flex-col gap-8",
            // Mobile: Column layout
            screenSize === "mobile" && "flex flex-col gap-8"
          )}>
            {/* Logo and Description Section */}
            <div className={cn(
              "flex flex-col gap-4",
              screenSize === "desktop" && "flex-1",
              (screenSize === "tablet" || screenSize === "laptop" || screenSize === "mobile") && "w-full"
            )}>
              <div className="flex items-center gap-2">
                <div className="relative w-[30px] h-[30px]">
                  <Image
                    src="/assets/icons/footer-logo.svg"
                    alt="Toraka Logo"
                    width={30}
                    height={30}
                    className="w-full h-full"
                  />
                </div>
                <div className="relative w-[71px] h-[17px]">
                  <Image
                    src="/assets/icons/footer-toraka-text.svg"
                    alt="Toraka"
                    width={71}
                    height={17}
                    className="w-full h-full"
                  />
                </div>
              </div>
              <p className="text-base text-[#B9C5D8] leading-6">
                A comprehensive manwha database built to streamline your reading
                across multiple sources.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-6 h-6 flex items-center justify-center hover:opacity-80 transition-opacity"
                    aria-label={social.name}
                  >
                    <Image
                      src={social.icon}
                      alt={""}
                      width={24}
                      height={24}
                      className="w-6 h-6 text-[#CFD9E9]"
                      style={{ width: '24px', height: '24px' }}
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation Links - Desktop: All sections with equal gaps */}
            {screenSize === "desktop" && (
              <>
                {/* Explore Section */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-medium text-white">Explore</h3>
                  <div className="flex flex-col gap-4 opacity-80">
                    {footerLinks.explore.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="text-base font-medium text-[#CBD5E1] hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Company Section */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-medium text-white">Company</h3>
                  <div className="flex flex-col gap-4 opacity-80">
                    {footerLinks.company.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="text-base font-medium text-[#CBD5E1] hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Legal Section */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-medium text-white">Legal</h3>
                  <div className="flex flex-col gap-4 opacity-80">
                    {footerLinks.legal.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="text-base font-medium text-[#CBD5E1] hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Navigation Links - Tablet: Horizontal row with space-between */}
            {(screenSize === "tablet" || screenSize === "laptop") && (
              <div className="flex flex-row justify-between gap-6">
                {/* Explore Section */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-medium text-white">Explore</h3>
                  <div className="flex flex-col gap-4 opacity-80">
                    {footerLinks.explore.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="text-base font-medium text-[#CBD5E1] hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Company Section */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-medium text-white">Company</h3>
                  <div className="flex flex-col gap-4 opacity-80">
                    {footerLinks.company.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="text-base font-medium text-[#CBD5E1] hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Legal Section */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-medium text-white">Legal</h3>
                  <div className="flex flex-col gap-4 opacity-80">
                    {footerLinks.legal.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="text-base font-medium text-[#CBD5E1] hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Links - Mobile: Special layout */}
            {screenSize === "mobile" && (
              <div className="flex flex-col gap-8">
                {/* First row: Explore and Company */}
                <div className="flex flex-row justify-between gap-6">
                  {/* Explore Section */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-medium text-white">Explore</h3>
                    <div className="flex flex-col gap-4 opacity-80">
                      {footerLinks.explore.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className="text-base font-medium text-[#CBD5E1] hover:text-white transition-colors"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Company Section */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-medium text-white">Company</h3>
                    <div className="flex flex-col gap-4 opacity-80">
                      {footerLinks.company.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className="text-base font-medium text-[#CBD5E1] hover:text-white transition-colors"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Second row: Legal */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-medium text-white">Legal</h3>
                  <div className="flex flex-col gap-4 opacity-80">
                    {footerLinks.legal.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="text-base font-medium text-[#CBD5E1] hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Copyright Section */}
          <div className="bg-[#151F37] rounded-lg p-3 h-[] flex items-center justify-center">
              <p className="text-base font-medium text-[#7A9BFF] tracking-tight">
                © 2025 Toraka. All rights reserved.
              </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
