import { useContext } from 'react';
import { AppContext } from '@/App';

export function useTabsInfo() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useTabsTotal should be used within <AppContext.Provider>');
  }
  return context.tabsInfo;
}
