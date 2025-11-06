"use client";

import React from "react";
import { BookmarkListItem } from "./BookmarkListItem";
import { Bookmark } from "@/data/mockData";

interface BookmarkListViewProps {
  bookmarks: Bookmark[];
  selectedItems?: number[];
  onToggleSelection?: (id: number) => void;
  onEditSelection?: (id: number) => void;
  onChapterChange?: (bookmarkId: number, newChapter: number) => void;
}

export function BookmarkListView({
  bookmarks,
  selectedItems = [],
  onToggleSelection,
  onEditSelection,
  onChapterChange,
}: BookmarkListViewProps) {
  
  const isSelected = (id: number) => selectedItems.includes(id);
  
  // Selection mode is active when any items are selected
  const isSelectionMode = selectedItems.length > 0;
  return (
    <div className="space-y-3">
      {bookmarks.map((bookmark, index) => (
        <BookmarkListItem
          key={bookmark.id}
          bookmark={bookmark}
          isSelected={isSelected(bookmark.id)}
          onToggleSelection={() => onToggleSelection?.(bookmark.id || 0)}
          selectedCount={selectedItems.length}
          onEditSelection={() => onEditSelection?.(bookmark.id || 0)}
          isSelectionMode={isSelectionMode}
          // Chapter change callback
          onChapterChange={onChapterChange}
        />
      ))}
    </div>
  );
}
