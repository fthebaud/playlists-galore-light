import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { TABS } from '@/config';
import MainPage from '@/pages/MainPage';
import NotFoundPage from '@/pages/NotFoundPage';

function Router() {
  const { pathname } = useLocation();
  const { regular, special } = TABS;

  // DEFAULT PAGE
  if (pathname === '/') {
    return <Navigate to={`/${regular}/1`} replace />;
  }

  // HANDLE TAB CHANGE
  if (pathname === `/${regular}`) {
    return <Navigate to={`/${regular}/1`} replace />;
  }
  if (pathname === `/${special}`) {
    return <Navigate to={`/${special}/1`} replace />;
  }

  return (
    <Routes>
      <Route path="/:tab/:page" element={<MainPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;
