"use client";

import * as React from "react";
import { ArrowUpRight, CircleAlert, Clock, Trash2, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SearchInput } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import ListOption from "../common/ListOption";
import { ActionDropdown } from "../ui/action-dropdown";
import { cn } from "@/lib/utils";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import useScreenSizer from "@/lib/useScreenSizer";

interface SearchResult {
  id: string;
  title: string;
  genres: string[];
  chapters: number;
  description: string;
  image: string;
  status: "ongoing" | "completed" | "hiatus";
}

interface SearchHistory {
  id: string;
  title: string;
  genres: string[];
  chapters: number;
  image: string;
  searchedAt: Date;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock search history data
const mockSearchHistory: SearchHistory[] = [
  {
    id: "1",
    title: "Return of the Mount Hua Sect",
    genres: ["Action", "Adventure", "Fantasy"],
    chapters: 275,
    image: "/assets/featured/trending-6.png",
    searchedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: "2",
    title: "Return From the World of Immortals",
    genres: ["Action", "Adventure", "Fantasy"],
    chapters: 278,
    image: "/assets/featured/trending-7.png",
    searchedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: "3",
    title: "Solo Leveling",
    genres: ["Action", "Fantasy", "Supernatural"],
    chapters: 200,
    image: "/assets/featured/trending-1.png",
    searchedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
  },
];

// Mock data for demonstration
const mockSearchResults: SearchResult[] = [
  {
    id: "1",
    title: "Return of the Mount Hua Sect",
    genres: ["Action", "Adventure", "Fantasy"],
    chapters: 275,
    description:
      "Chung Myung, The 13th Disciple of the Mount Hua Sect, One of the 3 Great Swordsmen, Plum Blossom Sword Saint, defeated Chun Ma, who brought destruction and disarray onto the world. After the battle, he breathes his last breath on top of the headquarter mountain of the Heavenly Demon Sect. \nHe is reborn after 100 years in the body of a child. ......What? The Mount Hua Sect has fallen? What kind of nonsense is that!? Chung Myung, The 13th Disciple of the Mount Hua Sect, One of the 3 Great Swordsmen, Plum Blossom Sword Saint, defeated Chun Ma, who brought destruction and disarray onto the world. After the battle, he breathes his last breath on top of the headquarter mountain of the Heavenly Demon Sect. ",
    image: "/assets/featured/trending-6.png",
    status: "ongoing",
  },
  {
    id: "2",
    title: "Return From the World of Immortals",
    genres: ["Action", "Adventure", "Fantasy"],
    chapters: 278,
    description:
      "Chung Myung, The 13th Disciple of the Mount Hua Sect, One of the 3 Great Swordsmen, Plum Blossom Sword Saint, defeated Chun Ma, who brought destruction and disarray onto the world. After the battle, he breathes his last breath on top of the headquarter mountain of the Heavenly Demon Sect. \nHe is reborn after 100 years in the body of a child. ......What? The Mount Hua Sect has fallen? What kind of nonsense is that!? Chung Myung, The 13th Disciple of the Mount Hua Sect, One of the 3 Great Swordsmen, Plum Blossom Sword Saint, defeated Chun Ma, who brought destruction and disarray onto the world. After the battle, he breathes his last breath on top of the headquarter mountain of the Heavenly Demon Sect. ",
    image: "/assets/featured/trending-7.png",
    status: "ongoing",
  },
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const screenSize = useScreenSizer();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredResults, setFilteredResults] = React.useState<SearchResult[]>(
    []
  );
  const [searchHistory, setSearchHistory] = React.useState<SearchHistory[]>(mockSearchHistory);
  const [hasSearched, setHasSearched] = React.useState(false); // Track if user has ever searched
  const [openDropdownId, setOpenDropdownId] = React.useState<string | null>(null);
  const triggerRefs = React.useRef<{ [key: string]: React.RefObject<HTMLDivElement | null> }>({});
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const onEditSelection = () => {
    console.log("Edit selection");
  };

  // Handle clicking on a search result
  const handleResultClick = (result: SearchResult) => {
    // Add to search history if not already there
    const existingIndex = searchHistory.findIndex(item => item.id === result.id);
    if (existingIndex === -1) {
      const newHistoryItem: SearchHistory = {
        id: result.id,
        title: result.title,
        genres: result.genres,
        chapters: result.chapters,
        image: result.image,
        searchedAt: new Date(),
      };
      setSearchHistory(prev => [newHistoryItem, ...prev.slice(0, 9)]); // Keep only 10 items
    } else {
      // Move to top and update timestamp
      const updatedHistory = [...searchHistory];
      const item = updatedHistory.splice(existingIndex, 1)[0];
      item.searchedAt = new Date();
      setSearchHistory([item, ...updatedHistory]);
    }

    setHasSearched(true);
    console.log("Clicked on result:", result.title);
  };

  // Handle clicking on a search history item
  const handleHistoryClick = (historyItem: SearchHistory) => {
    // Move to top and update timestamp
    const existingIndex = searchHistory.findIndex(item => item.id === historyItem.id);
    if (existingIndex !== -1) {
      const updatedHistory = [...searchHistory];
      const item = updatedHistory.splice(existingIndex, 1)[0];
      item.searchedAt = new Date();
      setSearchHistory([item, ...updatedHistory]);
    }

    console.log("Clicked on history item:", historyItem.title);
  };

  // Helper function to get or create a ref for each result item
  const getTriggerRef = (resultId: string) => {
    if (!triggerRefs.current[resultId]) {
      triggerRefs.current[resultId] = React.createRef<HTMLDivElement>();
    }
    return triggerRefs.current[resultId];
  };

  React.useEffect(() => {
    if (searchQuery.trim()) {
      // Filter results based on search query
      const filtered = mockSearchResults.filter(
        (result) =>
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.genres.some((genre) =>
            genre.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
      setFilteredResults(filtered);
      setHasSearched(true); // Mark that user has searched
    } else {
      setFilteredResults([]);
    }
  }, [searchQuery]);

  // Auto-focus search input on mobile devices when modal opens
  React.useEffect(() => {
    if (isOpen && (screenSize === "mobile" || screenSize === "tablet")) {
      // Small delay to ensure modal is fully rendered
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isOpen, screenSize]);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      // Check if the click is outside any dropdown
      if (!target.closest('[data-list-option="true"]')) {
        setOpenDropdownId(null);
      }
    };

    if (openDropdownId) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownId]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  // Helper function to highlight search term in text
  const highlightSearchTerm = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text;

    const regex = new RegExp(
      `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (regex.test(part)) {
        return (
          <span key={index} className="text-[#1765f3] rounded">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        size="4xl"
        position="top"
        className="bg-[#0A0F1C] gap-4 border-[#1f2c41] max-h-[80vh] overflow-hidden p-5"
        showCloseButton={false}
        onKeyDown={handleKeyDown}
        style={{
          animation: isOpen
            ? "searchModalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            : "searchModalOut 0.2s ease-in-out",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Search Series</h2>
          <button
            className="w-5 h-5 bg-[#5a606e] rounded-full flex items-center justify-center hover:bg-[#4A5568] transition-colors cursor-pointer"
            onClick={onClose}
            aria-label="Close search modal"
          >
            <X className="h-3 w-3 text-[#0a0f1c] strokeWidth={3.5}" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <SearchInput
            ref={searchInputRef}
            placeholder="Search series by title, genre..."
            showKeyboardShortcut={true}
            keyboardShortcut="Ctrl+K"
            autoFocus={true}
            className={cn(
              "h-[49px] bg-[#1A2436] border-1 border-[#334155] text-base text-[#878F9C] placeholder:text-[#878F9C] rounded-lg focus:outline-none"
            )}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto space-y-4 max-h-[50vh]">
          {searchQuery.trim() ? (
            // Show search results when user is typing
            filteredResults.length > 0 ? (
              filteredResults.map((result) => (
                <div
                  key={result.id}
                  className={`flex gap-4 items-stretch rounded-lg hover:bg-[#141b2f] transition-colors cursor-pointer group py-2 px-3`}
                  onClick={() => handleResultClick(result)}
                >
                {/* Series Image */}
                <div className="flex-shrink-0 ">
                  <div className="w-full sm:h-[172px] h-[99px] bg-[#374151] rounded-md overflow-hidden">
                    <Image
                      src={result.image}
                      alt={""}
                      width={170}
                      height={270}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Series Info */}
                <div className="flex-1 min-w-0 bg space-y-1">
                  <div className="flex items-start justify-between">
                    <span className="text-base leading-[21px] font-semibold text-white transition-colors line-clamp-1">
                      {highlightSearchTerm(result.title, searchQuery)}
                    </span>

                    {screenSize !== "mobile" && (
                      <div className="absolute right-6">
                        <ListOption
                          variant="compact"
                          backgroundColor="#1A2436"
                        />
                      </div>
                    )}
                  </div>

                  {/* Genres and Chapter Count */}
                  {screenSize !== "mobile" && (
                    <div className="flex items-center mb-2 gap-2 text-xs text-muted-foreground/60">
                      {result.genres.map((genre, genreIndex) => (
                        <span key={genre} className="flex items-center gap-2">
                          {genre}
                          {genreIndex < result.genres.length - 1 && (
                            <span>•</span>
                          )}
                        </span>
                      ))}
                      <span>+1</span>
                    </div>
                  )}

                  {/* Chapter Count */}
                  <div className="mb-3">
                    <Badge
                      variant="secondary"
                      className="bg-[#374151] hover:bg-[#4A5568] text-xs"
                    >
                      {result.chapters} Chapters
                    </Badge>
                  </div>

                  {/* Description */}
                  {screenSize !== "mobile" && (
                    <p className="text-sm text-[#9CA3AF] line-clamp-3 leading-relaxed">
                      {result.description}
                    </p>
                  )}
                </div>

                {screenSize === "mobile" && (
                  <div
                    className="relative flex-shrink-0"
                    data-list-option="true"
                  >
                    <div
                      ref={getTriggerRef(result.id)}
                      className="w-4 h-4 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdownId(
                          openDropdownId === result.id ? null : result.id
                        );
                      }}
                    >
                      <DotsVerticalIcon className="w-4 h-4 text-white" />
                    </div>

                    {/* Action Dropdown */}
                    <ActionDropdown
                      isOpen={openDropdownId === result.id}
                      onClose={() => setOpenDropdownId(null)}
                      triggerRef={getTriggerRef(result.id)}
                      align="right"
                      onEdit={() => {
                        onEditSelection?.();
                      }}
                      onExternalLink={() => {
                        console.log("Open external link for result:", result.id);
                      }}
                      onMute={() => {
                        console.log("Mute result:", result.id);
                      }}
                      onShare={() => {
                        console.log("Share result:", result.id);
                      }}
                      onReport={() => {
                        console.log("Report result:", result.id);
                      }}
                      onDelete={() => {
                        console.log("Delete result:", result.id);
                      }}
                      onBookOpen={() => {
                        console.log("Open bookmark for result:", result.id);
                      }}
                    />
                  </div>
                )}
              </div>
            ))
            ) : (
              // No Results Found UI (matches Figma design)
              <div className="flex flex-col items-center justify-center py-10 px-6">
                <div className="flex flex-col items-center gap-6">
                  {/* Search Icon with Background Circle */}
                  <div className="w-[50px] h-[50px] bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <CircleAlert className="w-[18px] h-[18px] text-white stroke-[1.5]" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-base font-bold">
                    No Results Found
                  </h3>

                  {/* Description */}
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-[#B9C5D8] text-base text-center">
                      No series found for this search term.
                    </p>
                    <p className="text-[#B9C5D8] text-base text-center">
                      Try an alternative title or paste a URL to suggest a new
                      series
                    </p>
                  </div>
                </div>
              </div>
            )
          ) : hasSearched && searchHistory.length > 0 ? (
            // Show search history when no search query but user has searched before - matches Figma design
            <div className="space-y-2">
              {searchHistory.map((historyItem) => (
                <div
                  key={historyItem.id}
                  className={`flex items-center justify-between rounded-lg transition-colors cursor-pointer py-2 px-3 hover:bg-[#141B2F]`}
                  onClick={() => handleHistoryClick(historyItem)}
                >
                  {/* Left side: Series info */}
                  <div className="flex items-center gap-4">
                    {/* Bookmark Icon */}
                    <div className="w-6 h-6 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-[#1665F4] stroke-[1.5]" />
                    </div>

                    {/* Series Image */}
                    <div className="flex-shrink-0">
                      <div className="w-[60px] h-[86px] bg-[#374151] rounded-md overflow-hidden relative">
                        <Image
                          src={historyItem.image}
                          alt={""}
                          width={60}
                          height={86}
                          className="w-full h-full object-cover"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-transparent opacity-60" />
                      </div>
                    </div>

                    {/* Series Info */}
                    <div className="flex flex-col justify-center gap-1">
                      <h3 className="text-base font-semibold text-white line-clamp-1">
                        {historyItem.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-white/60">
                        {historyItem.genres.slice(0, 2).map((genre, genreIndex) => (
                          <span key={genre} className="flex items-center gap-2">
                            {genre}
                            {genreIndex < Math.min(historyItem.genres.length, 2) - 1 && <span>•</span>}
                          </span>
                        ))}
                        {historyItem.genres.length > 2 && <span>+{historyItem.genres.length - 2}</span>}
                      </div>
                      <div className="bg-white/10 rounded-full px-2 py-1 text-xs text-white w-fit">
                        {historyItem.chapters} Chapters
                      </div>
                    </div>
                  </div>

                  {/* Right side: Action Buttons */}
                  {screenSize === "mobile" ? (
                    <DotsVerticalIcon
                      className="w-4 h-4 text-white"
                    />
                  ) : (
                  <div className="flex items-center gap-3">
                    {/* Remove Button */}
                    <button
                      className="w-11 h-11 bg-[#212A41] rounded-xl flex items-center justify-center hover:bg-[#2A3441] transition-colors"
                      aria-label="Remove from bookmarks"
                    >
                      <Trash2 className="w-6 h-6 text-white stroke-[1.5]" />
                    </button>

                    {/* External Link Button */}
                    <button
                      className="w-11 h-11 bg-[#212A41] rounded-xl flex items-center justify-center hover:bg-[#2A3441] transition-colors"
                      aria-label="Open external link"
                    >
                      <ArrowUpRight className="w-6 h-6 text-white stroke-[1.5]" />
                    </button>
                  </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            // Empty search state (default before any searches) - matches Figma design
            <div className="flex flex-col items-center justify-center py-10 px-6">
              <div className="text-center">
                <p className="text-[#878F9C] text-base">
                  Search series by title
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
