import React from 'react';
import { createRoot } from 'react-dom/client';
import './theme/base.css';
import './theme/scroll-bar.css';
import './theme/pagination.css';
import App from './App';

const root = document.getElementById('root');
const reactRoot = createRoot(root!);
reactRoot.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
