import React, { useState, useEffect, createContext, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import Router from '@/components/Router';
import ErrorPage from '@/pages/ErrorPage';
import { openIndexDB, populateDB } from '@/modules/indexDB';
import { fetchAllPlaylists } from '@/modules/client';
import { getPageCount } from '@/utils/pages.utils';
import { TAB_CONFIG } from './config';
import { Tab } from './types';

type TabsInfo = {
  [key in Tab]: {
    pageCount: number;
    total: number;
  };
};

type AppState = {
  isDBReady: boolean;
  tabsInfo: TabsInfo;
};

export const AppContext = createContext<AppState | null>(null);

// TODO app + context = doublon ?
// TODO lighthouse, CLS, etc.
// TODO page share playlist
function App() {
  const [isDBReady, setIsDBReady] = useState(false);
  const [tabsInfo, setTabsInfo] = useState<TabsInfo>({
    regular: { pageCount: 0, total: 0 },
    special: { pageCount: 0, total: 0 },
  });

  const contextValue = useMemo(
    () => ({
      isDBReady,
      tabsInfo,
    }),
    [isDBReady, tabsInfo]
  );

  useEffect(() => {
    async function initDB() {
      // fetch playlists data
      const { timestamp, playlists } = await fetchAllPlaylists();
      const regularPlaylists = playlists.filter((p) =>
        TAB_CONFIG.regular.includes(p.category)
      );
      const specialEditions = playlists.filter((p) =>
        TAB_CONFIG.special.includes(p.category)
      );
      // setup DB
      await openIndexDB();
      // add data to DB
      await populateDB(timestamp, regularPlaylists, specialEditions);
      // update App state (and context)
      setTabsInfo({
        regular: {
          total: regularPlaylists.length,
          pageCount: getPageCount(regularPlaylists),
        },
        special: {
          total: specialEditions.length,
          pageCount: getPageCount(specialEditions),
        },
      });
      setIsDBReady(true);
    }
    initDB();
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <AppContext.Provider value={contextValue}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AppContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
