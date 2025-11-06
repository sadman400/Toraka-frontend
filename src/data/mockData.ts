// Centralized mock data for the application

// ===== TYPE DEFINITIONS =====

export interface HeroSlide {
  id: number;
  title: string;
  image: string;
  rating: string;
}

export interface TrendingItem {
  id: number;
  title: string;
  image: string;
}

export interface TopSeriesItem {
  rank: number;
  title: string;
  genres: string[];
  image: string;
  rankColor: string;
}

export interface RatedItem {
  id: number;
  title: string;
  image: string;
  rating: string;
}

export interface RecentUpdateItem {
  id: number;
  title: string;
  chapter: string;
  image: string;
  source: string;
  timeAgo: string;
}

export interface Bookmark {
  id: number;
  title: string;
  image: string;
  currentChapter: number;
  latestChapter: number;
  status: string;
  readingStatus:
    | "all"
    | "reading"
    | "on-hold"
    | "plan-to-read"
    | "completed"
    | "dropped";
  publicationStatus:
    | "releasing"
    | "finished"
    | "on-hiatus"
    | "cancelled"
    | "not-yet-released";
  source: "azuki" | "comikey" | "pocket-comics" | "tapas";
  contentType: "manga" | "manhwa" | "manhua" | "light-novel";
  tags: string[];
  lastRead: Date;
  addedDate: Date;
}

// ===== HERO SECTION DATA =====

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title:
      "Return of the Mount Hua and The Crazy Returning Who Turns Back Time",
    image: "/assets/hero/hero-background.png",
    rating: "9.8",
  },
  {
    id: 2,
    title: "Talent-Swallowing Magician",
    image: "/assets/hero/hero-poster-1.png",
    rating: "9.7",
  },
  {
    id: 3,
    title: "The Great Mage Returns After 4000 Years",
    image: "/assets/hero/hero-poster-2.png",
    rating: "9.6",
  },
  {
    id: 4,
    title: "Return of the Disaster-Class Hero",
    image: "/assets/hero/hero-poster-3.png",
    rating: "9.5",
  },
  {
    id: 5,
    title: "Return of the Mount Hua Sect",
    image: "/assets/hero/hero-poster-4.png",
    rating: "9.4",
  },
  {
    id: 6,
    title: "Murim Login",
    image: "/assets/hero/hero-poster-5.png",
    rating: "9.3",
  },
  {
    id: 7,
    title: "Warrior High School Dungeon Raid Department",
    image: "/assets/hero/hero-poster-6.png",
    rating: "9.2",
  },
  {
    id: 8,
    title: "Life of a Magic Academy Mage",
    image: "/assets/hero/hero-poster-7.png",
    rating: "9.1",
  },
  {
    id: 9,
    title: "Omniscient Reader Viewpoint",
    image: "/assets/hero/hero-poster-8.png",
    rating: "9.0",
  },
];

// ===== FEATURED CONTENT SECTION DATA =====

export const trendingData: TrendingItem[] = [
  {
    id: 1,
    title: "Talent-Swallowing Magician",
    image: "/assets/featured/trending-1.png",
  },
  {
    id: 2,
    title: "The Great Mage Returns After 4000 Years",
    image: "/assets/featured/trending-2.png",
  },
  {
    id: 3,
    title: "Return of the Disaster-Class Hero",
    image: "/assets/featured/trending-3.png",
  },
  {
    id: 4,
    title: "Return of the Mount Hua Sect",
    image: "/assets/featured/trending-4.png",
  },
  {
    id: 5,
    title: "Talent-Swallowing Magician",
    image: "/assets/featured/trending-5.png",
  },
  {
    id: 6,
    title: "The Great Mage Returns After 4000 Years",
    image: "/assets/featured/trending-6.png",
  },
  {
    id: 7,
    title: "Return of the Disaster-Class Hero",
    image: "/assets/featured/trending-7.png",
  },
  {
    id: 8,
    title: "Talent-Swallowing Magician",
    image: "/assets/featured/trending-1.png",
  },
  {
    id: 9,
    title: "The Great Mage Returns After 4000 Years",
    image: "/assets/featured/trending-2.png",
  },
  {
    id: 10,
    title: "Return of the Disaster-Class Hero",
    image: "/assets/featured/trending-3.png",
  },
  {
    id: 11,
    title: "Return of the Mount Hua Sect",
    image: "/assets/featured/trending-4.png",
  },
  {
    id: 12,
    title: "Talent-Swallowing Magician",
    image: "/assets/featured/trending-5.png",
  },
  {
    id: 13,
    title: "The Great Mage Returns After 4000 Years",
    image: "/assets/featured/trending-6.png",
  },
  {
    id: 14,
    title: "Return of the Disaster-Class Hero",
    image: "/assets/featured/trending-7.png",
  },
];

export const topSeriesData: TopSeriesItem[] = [
  {
    rank: 1,
    title: "Talent-Swallowing Magician",
    genres: ["Action", "Adventure", "Fantasy"],
    image: "/assets/featured/top-series-1.png",
    rankColor: "bg-yellow-500/10 text-yellow-500",
  },
  {
    rank: 2,
    title: "The Great Mage Returns After 4000 Years",
    genres: ["Action", "Adventure", "Fantasy"],
    image: "/assets/featured/top-series-2.png",
    rankColor: "bg-white/10 text-white",
  },
  {
    rank: 3,
    title: "Return of the Disaster-Class Hero",
    genres: ["Action", "Adventure", "Fantasy"],
    image: "/assets/featured/top-series-3.png",
    rankColor: "bg-orange-500/10 text-orange-500",
  },
  {
    rank: 4,
    title: "Return of the Mount Hua Sect",
    genres: ["Action", "Adventure", "Fantasy"],
    image: "/assets/featured/top-series-4.png",
    rankColor: "bg-blue-500/10 text-blue-500",
  },
  {
    rank: 5,
    title: "Murim Login",
    genres: ["Action", "Adventure", "Fantasy"],
    image: "/assets/featured/top-series-5.png",
    rankColor: "bg-blue-500/10 text-blue-500",
  },
  {
    rank: 6,
    title: "Warrior High School Dungeon Raid Department",
    genres: ["Action", "Adventure", "Fantasy"],
    image: "/assets/featured/top-series-6.png",
    rankColor: "bg-blue-500/10 text-blue-500",
  },
  {
    rank: 7,
    title: "Life of a Magic Academy Mage",
    genres: ["Action", "Adventure", "Fantasy"],
    image: "/assets/featured/top-series-7.png",
    rankColor: "bg-blue-500/10 text-blue-500",
  },
  {
    rank: 8,
    title: "Omniscient Reader Viewpoint",
    genres: ["Action", "Adventure", "Fantasy"],
    image: "/assets/featured/top-series-8.png",
    rankColor: "bg-blue-500/10 text-blue-500",
  },
  {
    rank: 9,
    title: "Everyone Else is a Returnee",
    genres: ["Action", "Adventure", "Fantasy"],
    image: "/assets/featured/top-series-9.png",
    rankColor: "bg-blue-500/10 text-blue-500",
  },
];

export const highestRatedData: RatedItem[] = [
  {
    id: 1,
    title: "Return of Return of the Mount Hua Sectthe Disaster-Class Hero",
    image: "/assets/featured/trending-1.png",
    rating: "10",
  },
  {
    id: 2,
    title: "The Great Mage Returns After 4000 Years",
    image: "/assets/featured/trending-2.png",
    rating: "10",
  },
  {
    id: 3,
    title: "Return of the Disaster-Class Hero",
    image: "/assets/featured/trending-3.png",
    rating: "9.9",
  },
  {
    id: 4,
    title: "Talent-Swallowing Magician",
    image: "/assets/featured/trending-4.png",
    rating: "9.8",
  },
  {
    id: 5,
    title: "The Great Mage Returns After 4000 Years",
    image: "/assets/featured/trending-5.png",
    rating: "9.5",
  },
  {
    id: 6,
    title: "Talent-Swallowing Magician",
    image: "/assets/featured/trending-6.png",
    rating: "9.4",
  },
  {
    id: 7,
    title: "Return of the Disaster-Class Hero",
    image: "/assets/featured/trending-7.png",
    rating: "9.3",
  },
  {
    id: 8,
    title: "Talent-Swallowing Magician",
    image: "/assets/featured/trending-1.png",
    rating: "9.2",
  },
  {
    id: 9,
    title: "The Great Mage Returns After 4000 Years",
    image: "/assets/featured/trending-2.png",
    rating: "9.1",
  },
  {
    id: 10,
    title: "Return of the Disaster-Class Hero",
    image: "/assets/featured/trending-3.png",
    rating: "9.0",
  },
  {
    id: 11,
    title: "Return of the Mount Hua Sect",
    image: "/assets/featured/trending-4.png",
    rating: "8.9",
  },
  {
    id: 12,
    title: "Talent-Swallowing Magician",
    image: "/assets/featured/trending-5.png",
    rating: "8.8",
  },
  {
    id: 13,
    title: "The Great Mage Returns After 4000 Years",
    image: "/assets/featured/trending-6.png",
    rating: "8.7",
  },
  {
    id: 14,
    title: "Return of the Disaster-Class Hero",
    image: "/assets/featured/trending-7.png",
    rating: "8.6",
  },
];

export const mostPopularData: RatedItem[] = [
  {
    id: 1,
    title: "The Greatest Estate Developer",
    image: "/assets/featured/popular-1.png",
    rating: "9.9",
  },
  {
    id: 2,
    title: "Return of Return of the Mount Hua Sectthe Disaster-Class Hero",
    image: "/assets/featured/trending-1.png",
    rating: "10",
  },
  {
    id: 3,
    title: "Talent-Swallowing Magician",
    image: "/assets/featured/popular-2.png",
    rating: "9.8",
  },
  {
    id: 4,
    title: "Max Level Returner",
    image: "/assets/featured/popular-3.png",
    rating: "9.4",
  },
  {
    id: 5,
    title: "The Great Mage Returns After 4000 Years",
    image: "/assets/featured/trending-2.png",
    rating: "10",
  },
  {
    id: 6,
    title: "The Great Mage Returns After 4000 Years",
    image: "/assets/featured/trending-5.png",
    rating: "9.5",
  },
  {
    id: 7,
    title: "Return of the Disaster-Class Hero",
    image: "/assets/featured/trending-7.png",
    rating: "9.3",
  },
  {
    id: 8,
    title: "Talent-Swallowing Magician",
    image: "/assets/featured/trending-1.png",
    rating: "9.2",
  },
  {
    id: 9,
    title: "The Great Mage Returns After 4000 Years",
    image: "/assets/featured/trending-2.png",
    rating: "9.1",
  },
  {
    id: 10,
    title: "Return of the Disaster-Class Hero",
    image: "/assets/featured/trending-3.png",
    rating: "9.0",
  },
  {
    id: 11,
    title: "Return of the Mount Hua Sect",
    image: "/assets/featured/trending-4.png",
    rating: "8.9",
  },
  {
    id: 12,
    title: "Talent-Swallowing Magician",
    image: "/assets/featured/trending-5.png",
    rating: "8.8",
  },
  {
    id: 13,
    title: "The Great Mage Returns After 4000 Years",
    image: "/assets/featured/trending-6.png",
    rating: "8.7",
  },
  {
    id: 14,
    title: "Return of the Disaster-Class Hero",
    image: "/assets/featured/trending-7.png",
    rating: "8.6",
  },
];

// ===== RECENT UPDATES DATA =====

export const recentUpdatesData: RecentUpdateItem[] = [
  {
    id: 1,
    title: "Return of the Disaster-Class Hero",
    chapter: "Chapter 200",
    image: "/assets/featured/recent-1.png",
    source: "Asura Scans",
    timeAgo: "1 hour ago",
  },
  {
    id: 2,
    title: "Life of a Magic Academy Mage",
    chapter: "Chapter 200",
    image: "/assets/featured/recent-2.png",
    source: "Asura Scans",
    timeAgo: "1 hour ago",
  },
  {
    id: 3,
    title: "Solo Leveling Ragnarok",
    chapter: "Chapter 200",
    image: "/assets/featured/recent-3.png",
    source: "Asura Scans",
    timeAgo: "1 hour ago",
  },
  {
    id: 4,
    title: "Omniscient Readers Viewpoint",
    chapter: "Chapter 200",
    image: "/assets/featured/recent-4.png",
    source: "Asura Scans",
    timeAgo: "1 hour ago",
  },
  {
    id: 5,
    title: "Max Level Returner",
    chapter: "Chapter 200",
    image: "/assets/featured/recent-5.png",
    source: "Asura Scans",
    timeAgo: "1 hour ago",
  },
  {
    id: 6,
    title: "The Great Mage Returns After 4000 Years",
    chapter: "Chapter 200",
    image: "/assets/featured/recent-6.png",
    source: "Asura Scans",
    timeAgo: "1 hour ago",
  },
  {
    id: 7,
    title: "Warrior High School Dungeon Raid Department",
    chapter: "Chapter 200",
    image: "/assets/featured/recent-7.png",
    source: "Asura Scans",
    timeAgo: "1 hour ago",
  },
  {
    id: 8,
    title: "Return of the Mount Hua Sect",
    chapter: "Chapter 200",
    image: "/assets/featured/recent-8.png",
    source: "Asura Scans",
    timeAgo: "1 hour ago",
  },
  {
    id: 9,
    title: "Murim Login",
    chapter: "Chapter 200",
    image: "/assets/featured/recent-9.png",
    source: "Asura Scans",
    timeAgo: "1 hour ago",
  },
  {
    id: 10,
    title: "Standard Reincarnation",
    chapter: "Chapter 200",
    image: "/assets/featured/recent-10.png",
    source: "Asura Scans",
    timeAgo: "1 hour ago",
  },
  {
    id: 11,
    title: "The Beginning After The End",
    chapter: "Chapter 185",
    image: "/assets/featured/recent-1.png",
    source: "Tapas",
    timeAgo: "2 hours ago",
  },
  {
    id: 12,
    title: "Tower of God",
    chapter: "Chapter 590",
    image: "/assets/featured/recent-2.png",
    source: "Webtoon",
    timeAgo: "3 hours ago",
  },
  {
    id: 13,
    title: "Nano Machine",
    chapter: "Chapter 150",
    image: "/assets/featured/recent-3.png",
    source: "Asura Scans",
    timeAgo: "4 hours ago",
  },
  {
    id: 14,
    title: "The Legendary Mechanic",
    chapter: "Chapter 1463",
    image: "/assets/featured/recent-4.png",
    source: "Webnovel",
    timeAgo: "5 hours ago",
  },
  {
    id: 15,
    title: "Second Life Ranker",
    chapter: "Chapter 200",
    image: "/assets/featured/recent-5.png",
    source: "Asura Scans",
    timeAgo: "6 hours ago",
  },
  {
    id: 16,
    title: "The Player That Can't Level Up",
    chapter: "Chapter 120",
    image: "/assets/featured/recent-6.png",
    source: "Asura Scans",
    timeAgo: "7 hours ago",
  },
  {
    id: 17,
    title: "Tomb Raider King",
    chapter: "Chapter 358",
    image: "/assets/featured/recent-7.png",
    source: "Asura Scans",
    timeAgo: "8 hours ago",
  },
  {
    id: 18,
    title: "The Scholar's Reincarnation",
    chapter: "Chapter 200",
    image: "/assets/featured/recent-8.png",
    source: "Asura Scans",
    timeAgo: "9 hours ago",
  },
  {
    id: 19,
    title: "Overgeared",
    chapter: "Chapter 1800",
    image: "/assets/featured/recent-9.png",
    source: "Asura Scans",
    timeAgo: "10 hours ago",
  },
  {
    id: 20,
    title: "The Breaker: Eternal Force",
    chapter: "Chapter 50",
    image: "/assets/featured/recent-10.png",
    source: "Asura Scans",
    timeAgo: "11 hours ago",
  },
  {
    id: 21,
    title: "Mercenary Enrollment",
    chapter: "Chapter 150",
    image: "/assets/featured/recent-1.png",
    source: "Asura Scans",
    timeAgo: "12 hours ago",
  },
  {
    id: 22,
    title: "The God of High School",
    chapter: "Chapter 570",
    image: "/assets/featured/recent-2.png",
    source: "Webtoon",
    timeAgo: "13 hours ago",
  },
  {
    id: 23,
    title: "Hardcore Leveling Warrior",
    chapter: "Chapter 350",
    image: "/assets/featured/recent-3.png",
    source: "Webtoon",
    timeAgo: "14 hours ago",
  },
  {
    id: 24,
    title: "Lookism",
    chapter: "Chapter 480",
    image: "/assets/featured/recent-4.png",
    source: "Webtoon",
    timeAgo: "15 hours ago",
  },
  {
    id: 25,
    title: "Eleceed",
    chapter: "Chapter 280",
    image: "/assets/featured/recent-5.png",
    source: "Webtoon",
    timeAgo: "16 hours ago",
  },
  {
    id: 26,
    title: "UnOrdinary",
    chapter: "Chapter 320",
    image: "/assets/featured/recent-6.png",
    source: "Webtoon",
    timeAgo: "17 hours ago",
  },
  {
    id: 27,
    title: "Solo Leveling",
    chapter: "Chapter 200",
    image: "/assets/featured/recent-7.png",
    source: "Webtoon",
    timeAgo: "18 hours ago",
  },
  {
    id: 28,
    title: "The Gamer",
    chapter: "Chapter 450",
    image: "/assets/featured/recent-8.png",
    source: "Webtoon",
    timeAgo: "19 hours ago",
  },
  {
    id: 29,
    title: "Noblesse",
    chapter: "Chapter 544",
    image: "/assets/featured/recent-9.png",
    source: "Webtoon",
    timeAgo: "20 hours ago",
  },
  {
    id: 30,
    title: "The Breaker: New Waves",
    chapter: "Chapter 201",
    image: "/assets/featured/recent-10.png",
    source: "Asura Scans",
    timeAgo: "21 hours ago",
  },
  {
    id: 31,
    title: "Martial Peak",
    chapter: "Chapter 3000",
    image: "/assets/featured/recent-1.png",
    source: "Asura Scans",
    timeAgo: "22 hours ago",
  },
  {
    id: 32,
    title: "Tales of Demons and Gods",
    chapter: "Chapter 450",
    image: "/assets/featured/recent-2.png",
    source: "Asura Scans",
    timeAgo: "23 hours ago",
  },
  {
    id: 33,
    title: "Against the Gods",
    chapter: "Chapter 1900",
    image: "/assets/featured/recent-3.png",
    source: "Webnovel",
    timeAgo: "1 day ago",
  },
  {
    id: 34,
    title: "I Alone Level Up",
    chapter: "Chapter 270",
    image: "/assets/featured/recent-4.png",
    source: "Asura Scans",
    timeAgo: "1 day ago",
  },
  {
    id: 35,
    title: "Apotheosis",
    chapter: "Chapter 850",
    image: "/assets/featured/recent-5.png",
    source: "Asura Scans",
    timeAgo: "1 day ago",
  },
  {
    id: 36,
    title: "Battle Through the Heavens",
    chapter: "Chapter 1650",
    image: "/assets/featured/recent-6.png",
    source: "Asura Scans",
    timeAgo: "1 day ago",
  },
  {
    id: 37,
    title: "Peerless Dad",
    chapter: "Chapter 250",
    image: "/assets/featured/recent-7.png",
    source: "Asura Scans",
    timeAgo: "1 day ago",
  },
  {
    id: 38,
    title: "The Legendary Moonlight Sculptor",
    chapter: "Chapter 170",
    image: "/assets/featured/recent-8.png",
    source: "Asura Scans",
    timeAgo: "1 day ago",
  },
  {
    id: 39,
    title: "Red Storm",
    chapter: "Chapter 388",
    image: "/assets/featured/recent-9.png",
    source: "Asura Scans",
    timeAgo: "1 day ago",
  },
  {
    id: 40,
    title: "Gosu",
    chapter: "Chapter 180",
    image: "/assets/featured/recent-10.png",
    source: "Asura Scans",
    timeAgo: "1 day ago",
  },
  {
    id: 41,
    title: "The God of High School Reboot",
    chapter: "Chapter 50",
    image: "/assets/featured/recent-1.png",
    source: "Webtoon",
    timeAgo: "1 day ago",
  },
  {
    id: 42,
    title: "Weak Hero",
    chapter: "Chapter 250",
    image: "/assets/featured/recent-2.png",
    source: "Webtoon",
    timeAgo: "1 day ago",
  },
  {
    id: 43,
    title: "Sweet Home",
    chapter: "Chapter 140",
    image: "/assets/featured/recent-3.png",
    source: "Webtoon",
    timeAgo: "2 days ago",
  },
  {
    id: 44,
    title: "Bastard",
    chapter: "Chapter 94",
    image: "/assets/featured/recent-4.png",
    source: "Webtoon",
    timeAgo: "2 days ago",
  },
  {
    id: 45,
    title: "DICE: The Cube that Changes Everything",
    chapter: "Chapter 400",
    image: "/assets/featured/recent-5.png",
    source: "Webtoon",
    timeAgo: "2 days ago",
  },
  {
    id: 46,
    title: "Kubera",
    chapter: "Chapter 550",
    image: "/assets/featured/recent-6.png",
    source: "Webtoon",
    timeAgo: "2 days ago",
  },
  {
    id: 47,
    title: "Girls of the Wild's",
    chapter: "Chapter 260",
    image: "/assets/featured/recent-7.png",
    source: "Webtoon",
    timeAgo: "2 days ago",
  },
  {
    id: 48,
    title: "Magician",
    chapter: "Chapter 380",
    image: "/assets/featured/recent-8.png",
    source: "Asura Scans",
    timeAgo: "2 days ago",
  },
  {
    id: 49,
    title: "The Breaker",
    chapter: "Chapter 72",
    image: "/assets/featured/recent-9.png",
    source: "Asura Scans",
    timeAgo: "2 days ago",
  },
  {
    id: 50,
    title: "Veritas",
    chapter: "Chapter 81",
    image: "/assets/featured/recent-10.png",
    source: "Asura Scans",
    timeAgo: "2 days ago",
  },
  {
    id: 51,
    title: "Feng Shen Ji",
    chapter: "Chapter 200",
    image: "/assets/featured/recent-1.png",
    source: "Asura Scans",
    timeAgo: "2 days ago",
  },
  {
    id: 52,
    title: "The King's Avatar",
    chapter: "Chapter 1700",
    image: "/assets/featured/recent-2.png",
    source: "Webnovel",
    timeAgo: "2 days ago",
  },
  {
    id: 53,
    title: "Douluo Dalu",
    chapter: "Chapter 340",
    image: "/assets/featured/recent-3.png",
    source: "Asura Scans",
    timeAgo: "3 days ago",
  },
  {
    id: 54,
    title: "Spirit Blade Mountain",
    chapter: "Chapter 450",
    image: "/assets/featured/recent-4.png",
    source: "Asura Scans",
    timeAgo: "3 days ago",
  },
  {
    id: 55,
    title: "Stellar Transformations",
    chapter: "Chapter 800",
    image: "/assets/featured/recent-5.png",
    source: "Asura Scans",
    timeAgo: "3 days ago",
  },
  {
    id: 56,
    title: "Coiling Dragon",
    chapter: "Chapter 806",
    image: "/assets/featured/recent-6.png",
    source: "Webnovel",
    timeAgo: "3 days ago",
  },
  {
    id: 57,
    title: "Desolate Era",
    chapter: "Chapter 1450",
    image: "/assets/featured/recent-7.png",
    source: "Webnovel",
    timeAgo: "3 days ago",
  },
  {
    id: 58,
    title: "I Shall Seal the Heavens",
    chapter: "Chapter 1614",
    image: "/assets/featured/recent-8.png",
    source: "Webnovel",
    timeAgo: "3 days ago",
  },
  {
    id: 59,
    title: "A Will Eternal",
    chapter: "Chapter 1314",
    image: "/assets/featured/recent-9.png",
    source: "Webnovel",
    timeAgo: "3 days ago",
  },
  {
    id: 60,
    title: "Renegade Immortal",
    chapter: "Chapter 2000",
    image: "/assets/featured/recent-10.png",
    source: "Webnovel",
    timeAgo: "3 days ago",
  },
  {
    id: 61,
    title: "Pursuit of the Truth",
    chapter: "Chapter 1481",
    image: "/assets/featured/recent-1.png",
    source: "Webnovel",
    timeAgo: "4 days ago",
  },
  {
    id: 62,
    title: "Ancient Godly Monarch",
    chapter: "Chapter 2053",
    image: "/assets/featured/recent-2.png",
    source: "Webnovel",
    timeAgo: "4 days ago",
  },
  {
    id: 63,
    title: "True Martial World",
    chapter: "Chapter 1710",
    image: "/assets/featured/recent-3.png",
    source: "Webnovel",
    timeAgo: "4 days ago",
  },
  {
    id: 64,
    title: "Martial World",
    chapter: "Chapter 2270",
    image: "/assets/featured/recent-4.png",
    source: "Webnovel",
    timeAgo: "4 days ago",
  },
  {
    id: 65,
    title: "Emperor's Domination",
    chapter: "Chapter 4500",
    image: "/assets/featured/recent-5.png",
    source: "Webnovel",
    timeAgo: "4 days ago",
  },
  {
    id: 66,
    title: "Perfect World",
    chapter: "Chapter 1900",
    image: "/assets/featured/recent-6.png",
    source: "Webnovel",
    timeAgo: "4 days ago",
  },
  {
    id: 67,
    title: "Dragon Marked War God",
    chapter: "Chapter 3300",
    image: "/assets/featured/recent-7.png",
    source: "Webnovel",
    timeAgo: "4 days ago",
  },
  {
    id: 68,
    title: "Chaotic Sword God",
    chapter: "Chapter 3000",
    image: "/assets/featured/recent-8.png",
    source: "Webnovel",
    timeAgo: "5 days ago",
  },
  {
    id: 69,
    title: "Sovereign of the Three Realms",
    chapter: "Chapter 2400",
    image: "/assets/featured/recent-9.png",
    source: "Webnovel",
    timeAgo: "5 days ago",
  },
  {
    id: 70,
    title: "Great Demon King",
    chapter: "Chapter 1000",
    image: "/assets/featured/recent-10.png",
    source: "Webnovel",
    timeAgo: "5 days ago",
  },
  {
    id: 71,
    title: "Warlock of the Magus World",
    chapter: "Chapter 1200",
    image: "/assets/featured/recent-1.png",
    source: "Webnovel",
    timeAgo: "5 days ago",
  },
  {
    id: 72,
    title: "Age of Adepts",
    chapter: "Chapter 1500",
    image: "/assets/featured/recent-2.png",
    source: "Webnovel",
    timeAgo: "5 days ago",
  },
  {
    id: 73,
    title: "Library of Heaven's Path",
    chapter: "Chapter 2200",
    image: "/assets/featured/recent-3.png",
    source: "Webnovel",
    timeAgo: "5 days ago",
  },
  {
    id: 74,
    title: "Cultivation Chat Group",
    chapter: "Chapter 3000",
    image: "/assets/featured/recent-4.png",
    source: "Webnovel",
    timeAgo: "6 days ago",
  },
  {
    id: 75,
    title: "My Wife is a Beautiful CEO",
    chapter: "Chapter 1400",
    image: "/assets/featured/recent-5.png",
    source: "Webnovel",
    timeAgo: "6 days ago",
  },
  {
    id: 76,
    title: "Rebirth of the Thief Who Roamed the World",
    chapter: "Chapter 950",
    image: "/assets/featured/recent-6.png",
    source: "Webnovel",
    timeAgo: "6 days ago",
  },
  {
    id: 77,
    title: "Close Combat Mage",
    chapter: "Chapter 800",
    image: "/assets/featured/recent-7.png",
    source: "Webnovel",
    timeAgo: "6 days ago",
  },
  {
    id: 78,
    title: "Zhan Long",
    chapter: "Chapter 1300",
    image: "/assets/featured/recent-8.png",
    source: "Webnovel",
    timeAgo: "6 days ago",
  },
  {
    id: 79,
    title: "Shura's Wrath",
    chapter: "Chapter 900",
    image: "/assets/featured/recent-9.png",
    source: "Webnovel",
    timeAgo: "7 days ago",
  },
  {
    id: 80,
    title: "Conquest",
    chapter: "Chapter 500",
    image: "/assets/featured/recent-10.png",
    source: "Webnovel",
    timeAgo: "7 days ago",
  },
  {
    id: 81,
    title: "Virtual World: Close Combat Mage",
    chapter: "Chapter 970",
    image: "/assets/featured/recent-1.png",
    source: "Webnovel",
    timeAgo: "7 days ago",
  },
  {
    id: 82,
    title: "God and Devil World",
    chapter: "Chapter 1200",
    image: "/assets/featured/recent-2.png",
    source: "Webnovel",
    timeAgo: "7 days ago",
  },
  {
    id: 83,
    title: "Swallowed Star",
    chapter: "Chapter 1400",
    image: "/assets/featured/recent-3.png",
    source: "Webnovel",
    timeAgo: "7 days ago",
  },
  {
    id: 84,
    title: "Lord Xue Ying",
    chapter: "Chapter 1400",
    image: "/assets/featured/recent-4.png",
    source: "Webnovel",
    timeAgo: "1 week ago",
  },
  {
    id: 85,
    title: "World of Cultivation",
    chapter: "Chapter 900",
    image: "/assets/featured/recent-5.png",
    source: "Webnovel",
    timeAgo: "1 week ago",
  },
  {
    id: 86,
    title: "Forty Millenniums of Cultivation",
    chapter: "Chapter 3500",
    image: "/assets/featured/recent-6.png",
    source: "Webnovel",
    timeAgo: "1 week ago",
  },
  {
    id: 87,
    title: "Release that Witch",
    chapter: "Chapter 1500",
    image: "/assets/featured/recent-7.png",
    source: "Webnovel",
    timeAgo: "1 week ago",
  },
  {
    id: 88,
    title: "Reverend Insanity",
    chapter: "Chapter 2334",
    image: "/assets/featured/recent-8.png",
    source: "Webnovel",
    timeAgo: "1 week ago",
  },
  {
    id: 89,
    title: "Way of Choices",
    chapter: "Chapter 1100",
    image: "/assets/featured/recent-9.png",
    source: "Webnovel",
    timeAgo: "1 week ago",
  },
  {
    id: 90,
    title: "Martial God Asura",
    chapter: "Chapter 5000",
    image: "/assets/featured/recent-10.png",
    source: "Webnovel",
    timeAgo: "1 week ago",
  },
  {
    id: 91,
    title: "Against Heaven's Will",
    chapter: "Chapter 800",
    image: "/assets/featured/recent-1.png",
    source: "Asura Scans",
    timeAgo: "1 week ago",
  },
  {
    id: 92,
    title: "Peerless Martial God",
    chapter: "Chapter 2500",
    image: "/assets/featured/recent-2.png",
    source: "Webnovel",
    timeAgo: "1 week ago",
  },
  {
    id: 93,
    title: "Immortal Mortal",
    chapter: "Chapter 1200",
    image: "/assets/featured/recent-3.png",
    source: "Webnovel",
    timeAgo: "2 weeks ago",
  },
  {
    id: 94,
    title: "Upgrade Specialist in Another World",
    chapter: "Chapter 1300",
    image: "/assets/featured/recent-4.png",
    source: "Webnovel",
    timeAgo: "2 weeks ago",
  },
  {
    id: 95,
    title: "History's Strongest Senior Brother",
    chapter: "Chapter 1800",
    image: "/assets/featured/recent-5.png",
    source: "Webnovel",
    timeAgo: "2 weeks ago",
  },
  {
    id: 96,
    title: "Transcending the Nine Heavens",
    chapter: "Chapter 1200",
    image: "/assets/featured/recent-6.png",
    source: "Webnovel",
    timeAgo: "2 weeks ago",
  },
  {
    id: 97,
    title: "Hidden Marriage",
    chapter: "Chapter 2500",
    image: "/assets/featured/recent-7.png",
    source: "Webnovel",
    timeAgo: "2 weeks ago",
  },
  {
    id: 98,
    title: "The Charm of Soul Pets",
    chapter: "Chapter 1700",
    image: "/assets/featured/recent-8.png",
    source: "Webnovel",
    timeAgo: "2 weeks ago",
  },
  {
    id: 99,
    title: "Spirit Realm",
    chapter: "Chapter 1800",
    image: "/assets/featured/recent-9.png",
    source: "Webnovel",
    timeAgo: "2 weeks ago",
  },
  {
    id: 100,
    title: "Ancient Strengthening Technique",
    chapter: "Chapter 2500",
    image: "/assets/featured/recent-10.png",
    source: "Webnovel",
    timeAgo: "3 weeks ago",
  },
];

// ===== BOOKMARKS DATA =====

export const bookmarksData: Bookmark[] = [
  {
    id: 1,
    title: "Heavenly Grand Archives",
    image: "/assets/manga-covers/heavenly-grand-archives.jpg",
    currentChapter: 110,
    latestChapter: 200,
    status: "up-to-date",
    readingStatus: "reading" as const,
    publicationStatus: "releasing" as const,
    source: "azuki" as const,
    contentType: "manga" as const,
    tags: ["favourites"],
    lastRead: new Date("2024-01-15"),
    addedDate: new Date("2023-12-01"),
  },
  {
    id: 2,
    title: "The Great Mage Returns After 4000 Years",
    image: "/assets/manga-covers/great-mage-returns.jpg",
    currentChapter: 110,
    latestChapter: 200,
    status: "behind",
    readingStatus: "reading" as const,
    publicationStatus: "finished" as const,
    source: "comikey" as const,
    contentType: "manhwa" as const,
    tags: ["to-read-later"],
    lastRead: new Date("2024-01-10"),
    addedDate: new Date("2023-11-15"),
  },
  {
    id: 3,
    title: "Return of the Disaster Class Hero",
    image: "/assets/manga-covers/disaster-class-hero.jpg",
    currentChapter: 110,
    latestChapter: 200,
    status: "behind",
    readingStatus: "on-hold" as const,
    publicationStatus: "releasing" as const,
    source: "tapas" as const,
    contentType: "manhwa" as const,
    tags: [],
    lastRead: new Date("2024-01-05"),
    addedDate: new Date("2023-10-20"),
  },
  {
    id: 4,
    title: "Return of the Mount Hua Sect",
    image: "/assets/manga-covers/mount-hua-sect.jpg",
    currentChapter: 110,
    latestChapter: 200,
    status: "behind",
    readingStatus: "completed" as const,
    publicationStatus: "finished" as const,
    source: "pocket-comics" as const,
    contentType: "manhua" as const,
    tags: ["favourites"],
    lastRead: new Date("2024-01-12"),
    addedDate: new Date("2023-09-10"),
  },
  {
    id: 5,
    title: "Warrior High School Dungeon Raid Department",
    image: "/assets/manga-covers/warrior-high-school.jpg",
    currentChapter: 110,
    latestChapter: 200,
    status: "behind",
    readingStatus: "plan-to-read" as const,
    publicationStatus: "on-hiatus" as const,
    source: "azuki" as const,
    contentType: "light-novel" as const,
    tags: ["to-read-later"],
    lastRead: new Date("2024-01-08"),
    addedDate: new Date("2023-12-05"),
  },
  {
    id: 6,
    title: "Max Level Returner",
    image: "/assets/manga-covers/max-level-returner.jpg",
    currentChapter: 110,
    latestChapter: 200,
    status: "behind",
    readingStatus: "dropped" as const,
    publicationStatus: "cancelled" as const,
    source: "comikey" as const,
    contentType: "manga" as const,
    tags: ["dropped"],
    lastRead: new Date("2024-01-03"),
    addedDate: new Date("2023-08-15"),
  },
  {
    id: 7,
    title: "Mutim Login",
    image: "/assets/manga-covers/mutim-login.jpg",
    currentChapter: 110,
    latestChapter: 200,
    status: "behind",
    readingStatus: "reading" as const,
    publicationStatus: "not-yet-released" as const,
    source: "tapas" as const,
    contentType: "manhwa" as const,
    tags: [],
    lastRead: new Date("2024-01-14"),
    addedDate: new Date("2023-11-30"),
  },
];

export interface RecommendedItem {
  id: number;
  title: string;
  image: string;
  rating: string;
}

export const recommendedData: RecommendedItem[] = [
  {
    id: 1,
    title: "Howling",
    rating: "9.4",
    image: "/assets/images/recommended-1.png",
  },
  {
    id: 2,
    title: "Max Level Returner",
    rating: "9.4",
    image: "/assets/images/recommended-2.png",
  },
  {
    id: 3,
    title: "The Great Mage Returns After 4000 Years",
    rating: "10",
    image: "/assets/images/recommended-3.png",
  },
  {
    id: 4,
    title: "The Great Mage Returns After 4000 Years",
    rating: "9.6",
    image: "/assets/images/recommended-4.png",
  },
  {
    id: 5,
    title: "Return of the Disaster-Class Hero",
    rating: "9.3",
    image: "/assets/images/recommended-5.png",
  },
    {
    id: 6,
    title: "Howling",
    rating: "9.4",
    image: "/assets/images/recommended-1.png",
  },
  {
    id: 7,
    title: "Max Level Returner",
    rating: "9.4",
    image: "/assets/images/recommended-2.png",
  },
  {
    id: 8,
    title: "The Great Mage Returns After 4000 Years",
    rating: "10",
    image: "/assets/images/recommended-3.png",
  },
  {
    id: 9,
    title: "The Great Mage Returns After 4000 Years",
    rating: "9.6",
    image: "/assets/images/recommended-4.png",
  },
  {
    id: 10,
    title: "Return of the Disaster-Class Hero",
    rating: "9.3",
    image: "/assets/images/recommended-5.png",
  },
];

export const highlightsData: RecommendedItem[] = [
  {
    id: 1,
    title: "Howling",
    rating: "9.4",
    image: "/assets/images/highlight-1.png",
  },
  {
    id: 2,
    title: "The Great Mage Returns After 4000 Years",
    rating: "10",
    image: "/assets/images/highlight-3.png",
  },
  {
    id: 3,
    title: "The Great Mage Returns After 4000 Years",
    rating: "9.6",
    image: "/assets/images/highlight-4.png",
  },
    {
    id: 4,
    title: "Howling",
    rating: "9.4",
    image: "/assets/images/highlight-1.png",
  },
  {
    id: 5,
    title: "The Great Mage Returns After 4000 Years",
    rating: "10",
    image: "/assets/images/highlight-3.png",
  },
  {
    id: 6,
    title: "The Great Mage Returns After 4000 Years",
    rating: "9.6",
    image: "/assets/images/highlight-4.png",
  },
];
