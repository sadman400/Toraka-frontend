import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Toraka - Your Entertainment Hub",
  description: "Discover, bookmark, and browse your favorite series and entertainment content with Toraka.",
  keywords: ["entertainment", "series", "movies", "streaming", "toraka"],
  authors: [{ name: "Toraka Team" }],
  creator: "Toraka",
  publisher: "Toraka",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://toraka.app"),
  openGraph: {
    title: "Toraka - Your Entertainment Hub",
    description: "Discover, bookmark, and browse your favorite series and entertainment content with Toraka.",
    url: "https://toraka.app",
    siteName: "Toraka",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toraka - Your Entertainment Hub",
    description: "Discover, bookmark, and browse your favorite series and entertainment content with Toraka.",
    creator: "@toraka",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
