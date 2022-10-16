export type Image = {
  width: number;
  height: number;
  url: string;
};

export type Category =
  | 'monthly'
  | 'weekly'
  | 'yearly'
  | 'artist'
  | 'ongoing'
  | 'misc.'
  | 'toutetnimp';

// User Defined type guard for Category
// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
export function isCategory(str: string): str is Category {
  return (
    str === 'monthly' ||
    str === 'weekly' ||
    str === 'yearly' ||
    str === 'artist' ||
    str === 'ongoing' ||
    str === 'misc.' ||
    str === 'toutetnimp'
  );
}

export type Tag = 'rock' | 'jazz' | 'acoustic' | 'chill' | 'melancholy';

// User Defined type guard for Tag
export function isTag(str: string): str is Tag {
  return (
    str === 'rock' ||
    str === 'jazz' ||
    str === 'acoustic' ||
    str === 'chill' ||
    str === 'melancholy'
  );
}

export type Playlist = {
  name: string;
  totalTracks: number;
  category: Category;
  tags: Tag[];
  images: Image[];
  url: {
    spotify: string;
    youtube: string;
    deezer: string;
    tidal: string;
    apple?: string;
  };
};

export type PlaylistsResponse = {
  playlists: Playlist[];
  timestamp: number;
};

export type Platform = 'spotify' | 'youtube' | 'deezer' | 'tidal' | 'apple';

export type Tab = 'regular' | 'special';

export function isTab(str: string): str is Tab {
  return str === 'regular' || str === 'special';
}
