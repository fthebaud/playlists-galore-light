import { Tab, Category } from '@/types';

export const PAGE_SIZE = 24; // Ideally it should be a multiple of 2 and 3 and 4 since layout can be between 1 and 4 columns (page will look 'full', not matter the number of colums)

type Tabs = {
  [key in Tab]: Tab;
};

export const TABS: Tabs = {
  regular: 'regular',
  special: 'special',
};

type TabConfig = {
  [key in Tab]: Category[];
};

export const TAB_CONFIG: TabConfig = {
  regular: ['weekly', 'monthly'],
  special: ['artist', 'ongoing', 'toutetnimp', 'yearly', 'misc.'],
};
