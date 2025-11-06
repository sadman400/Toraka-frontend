"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Bell, Clock, Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  chapter: string;
  timestamp: string;
  image: string;
  isRead: boolean;
}

// Mock notification data
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Heavenly Grand Archives Young Master",
    chapter: "Chapter 208",
    timestamp: "July 24, 2025 - 5:00 PM",
    image: "/assets/featured/trending-1.png",
    isRead: false,
  },
  {
    id: "2",
    title: "The Great Mage Returns After 4000 Years",
    chapter: "Chapter 208",
    timestamp: "July 24, 2025 - 5:00 PM",
    image: "/assets/featured/trending-2.png",
    isRead: true,
  },
  {
    id: "3",
    title:
      "Heavenly Grand Warrior High School Dungeon Raid Department Archives Young Master",
    chapter: "Chapter 208",
    timestamp: "July 24, 2025 - 5:00 PM",
    image: "/assets/featured/trending-3.png",
    isRead: false,
  },
];

interface NotificationMenuContentProps {
  isMobile: boolean;
}

export function NotificationMenuContent({
  isMobile,
}: NotificationMenuContentProps) {
  const [activeTab, setActiveTab] = React.useState<"all" | "unread">("all");
  const [notifications, setNotifications] = React.useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : notifications.filter((n) => !n.isRead);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const deleteAll = () => {
    setNotifications([]);
  };

  const hasNotifications = notifications.length > 0;
  return (
    <>
      {/* Header */}
      {!isMobile && (
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-[10px]">
            <div className="w-6 h-6 flex items-center justify-center">
              <Bell className="w-6 h-6 text-white stroke-2" />
            </div>
            <h2 className="text-white text-base font-semibold leading-[21px] tracking-[-0.31px]">
              Notifications
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <div className="bg-white/10 rounded-lg px-3 py-1">
                <span className="text-[#CFD9E9] text-sm font-medium leading-[21px] tracking-[-0.31px]">
                  {unreadCount}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {hasNotifications ? (
        <div>
          {/* Tabs */}
          <div className="flex items-center justify-between pl-6 pr-4 sm:px-4 py-3 border-t border-b border-[#212A3B]">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className={`px-4 py-2 rounded-md text-base font-medium leading-[21px] tracking-[-0.31px] ${
                  activeTab === "all" ? "bg-white/10 text-white" : ""
                }`}
                onClick={() => setActiveTab("all")}
                aria-label="All notifications"
              >
                All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`px-4 py-2 rounded-md text-base font-medium leading-[21px] tracking-[-0.31px] flex items-center gap-2 ${
                  activeTab === "unread" ? "bg-white/10 text-white" : ""
                }`}
                onClick={() => setActiveTab("unread")}
                aria-label="Unread notifications"
              >
                Unread
                <span>({unreadCount})</span>
              </Button>
            </div>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-[#0064FF] text-sm font-semibold leading-[21px] tracking-[-0.31px] hover:text-[#0064FF]/80"
                onClick={markAllAsRead}
                aria-label="Mark all as read"
              >
                Mark all as read
              </Button>
            )}
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto pl-6 pr-4 sm:px-4 py-3 space-y-2 max-h-[300px]"
          >
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-[#141B2F]/80 transition-colors cursor-pointer"
              >
                {/* Series Image */}
                <div className="w-[60px] h-[86px] rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={notification.image}
                    alt={""}
                    width={60}
                    height={86}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <div className="space-y-1">
                    <h3 className="text-white text-base font-medium leading-[21px] tracking-[-0.31px] line-clamp-1">
                      {notification.title}
                    </h3>
                    <div className="bg-white/10 rounded-full px-2 py-0.5 w-fit">
                      <span className="text-white text-sm font-medium leading-[17px]">
                        {notification.chapter}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#727682] stroke-[1.3]" />
                    <span className="text-white/40 text-sm leading-[21px] tracking-[-0.31px]">
                      {notification.timestamp}
                    </span>
                  </div>
                </div>

                {/* Read indicator */}
                {!notification.isRead && (
                  <div className="w-11 h-11 bg-[#186AE6] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Bell className="w-6 h-6 text-white stroke-[1.5]" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Delete All Button */}
          <div className="border-t border-[#212A3B] p-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-[#FF5640] text-base font-medium leading-[21px] tracking-[-0.31px] hover:text-[#FF5640]/80 w-full"
              onClick={deleteAll}
              aria-label="Delete all notifications"
            >
              Delete All
            </Button>
          </div>
        </div>
      ) : (
        /* No Notifications State */
        <div className="flex flex-col items-center justify-center py-10 px-10 space-y-6">
          <div className="flex flex-col items-center gap-2">
            <Search className="w-11 text-white h-11 stroke-[1.5]" />
            <h3 className="text-white text-base font-semibold leading-[21px] tracking-[-0.31px]">
              No notifications found.
            </h3>
          </div>
          <p className="text-[#A9B2C8] text-sm font-semibold leading-[17px] text-center max-w-[280px]">
            We could not find any notifications.{"\n"}
            You can add the series to your bookmarks to be notified of updates
          </p>
          <Button className="bg-[#1665F4] hover:bg-[#1665F4]/90 text-white px-4 py-3 h-[45px] rounded-md flex items-center gap-2" aria-label="Add manga">
            <div className="w-4 h-4 rounded-full bg-white">
              <Plus className="w-4 h-4 text-[#1665F4]" />
            </div>
            <span className="text-base font-semibold leading-[21px] tracking-[-0.31px]">
              Add Manga
            </span>
          </Button>
        </div>
      )}
    </>
  );
}
