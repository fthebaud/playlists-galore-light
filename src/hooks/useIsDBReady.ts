import { useContext } from 'react';
import { AppContext } from '@/App';

export function useIsDBReady() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState should be used within <AppContext.Provider>');
  }
  return context.isDBReady;
}
