// Filter types for bookmarks section

export interface StatusFilter {
  value: 'all' | 'reading' | 'on-hold' | 'plan-to-read' | 'completed' | 'dropped';
  label: string;
  color?: string;
}

export interface SortByFilter {
  value: 'last-read' | 'title-asc' | 'title-desc' | 'completed' | 'release-date' | 'popularity' | 'recently-added';
  label: string;
}

export interface PublicationStatusFilter {
  value: 'releasing' | 'finished' | 'on-hiatus' | 'cancelled' | 'not-yet-released';
  label: string;
  selected: boolean;
  excluded?: boolean;
}

export interface SourceFilter {
  value: 'azuki' | 'comikey' | 'pocket-comics' | 'tapas';
  label: string;
  selected: boolean;
}

export interface CustomTagFilter {
  value: string;
  label: string;
  selected: boolean;
}

export interface HideSeriesFilter {
  value: 'hide-locked' | 'hide-caught-up' | 'show-archived';
  label: string;
  count: number;
  selected: boolean;
}

export interface ContentTypeFilter {
  value: 'manga' | 'manhwa' | 'manhua' | 'light-novel';
  label: string;
}

export interface GenreFilter {
  value: string;
  label: string;
  selected: boolean;
  excluded?: boolean;
  color?: string;
  borderColor?: string;
}

export interface FilterState {
  status: StatusFilter['value'] | null;
  sortBy: SortByFilter['value'] | null;
  publicationStatus: PublicationStatusFilter[];
  sources: SourceFilter[];
  customTags: CustomTagFilter[];
  hideSeries: HideSeriesFilter[];
  contentType: ContentTypeFilter['value'] | null;
  genres: GenreFilter[];
}

// Default filter options
export const STATUS_OPTIONS: StatusFilter[] = [
  { value: 'all', label: 'All', color: '#FFFFFF' },
  { value: 'reading', label: 'Reading', color: '#408BFE' },
  { value: 'on-hold', label: 'On-Hold', color: '#C1912B' },
  { value: 'plan-to-read', label: 'Plan to Read', color: '#C12BB7' },
  { value: 'completed', label: 'Completed', color: '#69DC94' },
  { value: 'dropped', label: 'Dropped', color: '#DE5757' },
];

export const SORT_BY_OPTIONS: SortByFilter[] = [
  { value: 'last-read', label: 'Last Read' },
  { value: 'title-asc', label: 'Title (A–Z)' },
  { value: 'title-desc', label: 'Title (Z–A)' },
  { value: 'completed', label: 'Completed' },
  { value: 'release-date', label: 'Release Date' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'recently-added', label: 'Recently Added' },
];

export const PUBLICATION_STATUS_OPTIONS: PublicationStatusFilter[] = [
  { value: 'releasing', label: 'Releasing', selected: false },
  { value: 'finished', label: 'Finished', selected: false },
  { value: 'on-hiatus', label: 'On Hiatus', selected: false },
  { value: 'cancelled', label: 'Cancelled', selected: false },
  { value: 'not-yet-released', label: 'Not Yet Released', selected: false },
];

export const SOURCE_OPTIONS: SourceFilter[] = [
  { value: 'azuki', label: 'Azuki', selected: false },
  { value: 'comikey', label: 'Comikey', selected: false },
  { value: 'pocket-comics', label: 'Pocket Comics', selected: false },
  { value: 'tapas', label: 'Tapas', selected: false },
];

export const CUSTOM_TAG_OPTIONS: CustomTagFilter[] = [
  { value: 'favourites', label: 'Favourites', selected: false },
  { value: 'to-read-later', label: 'To Read Later', selected: false },
  { value: 'dropped', label: 'Dropped', selected: false },
];

export const HIDE_SERIES_OPTIONS: HideSeriesFilter[] = [
  { value: 'hide-locked', label: 'Locked chapters', count: 5, selected: false },
  { value: 'hide-caught-up', label: 'Caught up', count: 15, selected: false },
  { value: 'show-archived', label: 'Show only archived', count: 40000, selected: false },
];

export const CONTENT_TYPE_OPTIONS: ContentTypeFilter[] = [
  { value: 'manga', label: 'Manga' },
  { value: 'manhwa', label: 'Manhwa' },
  { value: 'manhua', label: 'Manhua' },
  { value: 'light-novel', label: 'Light Novel' },
];

export const GENRE_OPTIONS: GenreFilter[] = [
  { value: 'action', label: 'Action', selected: false},
  { value: 'adventure', label: 'Adventure', selected: false},
  { value: 'comedy', label: 'Comedy', selected: false},
  { value: 'drama', label: 'Drama', selected: false},
  { value: 'fantasy', label: 'Fantasy', selected: false},
  { value: 'horror', label: 'Horror', selected: false},
  { value: 'mystery', label: 'Mystery', selected: false},
  { value: 'romance', label: 'Romance', selected: false},
  { value: 'sci-fi', label: 'Sci-Fi', selected: false},
  { value: 'slice-of-life', label: 'Slice of Life', selected: false},
  { value: 'sports', label: 'Sports', selected: false},
  { value: 'supernatural', label: 'Supernatural', selected: false},
  { value: 'thriller', label: 'Thriller', selected: false},
  { value: 'historical', label: 'Historical', selected: false},
  { value: 'psychological', label: 'Psychological', selected: false},
  { value: 'school', label: 'School', selected: false},
  { value: 'martial-arts', label: 'Martial Arts', selected: false},
  { value: 'isekai', label: 'Isekai', selected: false},
];
