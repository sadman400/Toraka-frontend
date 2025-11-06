import { Bookmark } from "@/data/mockData";
import { BookmarkGridItem } from "./BookmarkGridItem";

interface BookmarkListViewProps {
  screenSize: "mobile" | "tablet" | "laptop" | "desktop" | undefined;
  bookmarks: Bookmark[];
  selectedItems?: number[];
  onSelect?: (id: number) => void;
  onToggleSelection?: ((id: number) => void) | undefined;
  onEditSelection?: (id: number) => void | undefined;
  onChapterChange?: (bookmarkId: number, newChapter: number) => void;
}

export function BookmarkGridView({
  screenSize,
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
    <div
      // className={`w-full grid ${gap}`}
      // style={{
      //   gridTemplateColumns: `repeat(auto-fit, minmax(${itemWidth}px, 1fr))`,
      // }}
      className='w-full grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-5'
    >
      {bookmarks.map((bookmark, index) => (
        <BookmarkGridItem
          key={bookmark.id}
          bookmark={bookmark}
          isSelected={isSelected(bookmark.id)}
          onToggleSelection={() => onToggleSelection?.(bookmark.id || 0)}
          screenSize={screenSize}
          onEditSelection={() => onEditSelection?.(bookmark.id || 0)}
          hoverListOptionHidden={selectedItems.length > 0}
          isSelectionMode={isSelectionMode}
          // Chapter change callback
          onChapterChange={onChapterChange}
        />
      ))}
    </div>
  );
}
