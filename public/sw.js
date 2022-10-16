const VERSION = '20220429-005';

const BASE = `${location.protocol}//${location.host}`;
const OFFLINE_PAGE = `${BASE}/html/offline.html`;
const CACHED_FILES = [
  OFFLINE_PAGE,
  `${BASE}/css/offline.css`,
  `${BASE}/assets/icon-vector.svg`,
  `${BASE}/assets/icon-apple-touch.png`,
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap',
];

// TODO add script in cache to reload page when connection comes back

self.addEventListener('install', (event) => {
  console.log(`[sw ${VERSION}] install`);
  // Don't wait for the current sw process to be stopped before activating the new version
  self.skipWaiting();
  // Pause the installation of the sw until the offline page is in cache
  event.waitUntil(
    (async () => {
      // open cache using key
      const cache = await caches.open(VERSION);
      // add a value to the cache
      await cache.addAll(CACHED_FILES);
    })()
  );
});

self.addEventListener('activate', (event) => {
  console.log(`[sw ${VERSION}] activate`);
  // don't wait for the next visit to start controlling the page
  clients.claim();
  // wait until the sw cleans up previous cache entries
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      const promises = [];
      keys.forEach((key) => {
        if (!key.includes(VERSION)) {
          promises.push(caches.delete(key));
        }
      });
      await Promise.all(promises);
    })()
  );
});

// intercept request (like a proxy)
self.addEventListener('fetch', (event) => {
  // console.log(
  //   `[sw ${VERSION}] fetch: ${event.request.url}, mode:${event.request.mode}`
  // );

  // intercept user navigation
  if (event.request.mode === 'navigate') {
    console.log(`[sw ${VERSION}] fetch: ${event.request.url}`);
    // respondWith is expecting a promise (not a function that returns a promise)
    event.respondWith(
      (async () => {
        try {
          // Check for preloaded content
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }
          // return online content
          return await fetch(event.request);
        } catch (e) {
          // Handle offline
          const cache = await caches.open(VERSION);
          return cache.match(OFFLINE_PAGE);
          // return new Response('You seem to be offline :(');
        }
      })()
    );
  } else if (CACHED_FILES.includes(event.request.url)) {
    event.respondWith(caches.match(event.request));
  }
});
