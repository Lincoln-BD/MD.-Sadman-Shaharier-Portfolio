/* =========================================================
   SERVICE WORKER — MD. Sadman Shaharier · Digital Hub
   =========================================================
   Update strategy, by design:
   - HTML pages: NETWORK-FIRST. Visitors almost always get the
     latest page; the cache is only a fallback for offline use.
   - Same-origin static assets (css/js/img/icons): STALE-WHILE-
     REVALIDATE. Instant load from cache, silently refreshed in
     the background for next time.
   - Anything cross-origin (CDNs, Google Fonts, YouTube embeds,
     CoinGecko/exchange-rate APIs, X links) is NEVER touched by
     this service worker — those requests pass straight through
     to the network untouched. Caching live prices or embedded
     video would actively break the site, not help it.

   BUMP CACHE_VERSION ON EVERY DEPLOY THAT CHANGES A CACHED FILE.
   Old caches are deleted automatically on activate — this is
   what prevents visitors getting stuck on a stale version.
   ========================================================= */

const CACHE_VERSION = 'v3';
const STATIC_CACHE = `digital-hub-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `digital-hub-runtime-${CACHE_VERSION}`;

// Only the small set of files needed for the app shell + offline
// fallback. Individual pages are cached opportunistically at
// runtime as visitors actually browse to them (see fetch handler)
// — not precached here, so adding/renaming a page never breaks
// the install step.
const PRECACHE_URLS = [
  './',
  'index.html',
  'offline.html',
  'manifest.json',
  'assets/css/style.css',
  'assets/js/script.js',
  'assets/js/data.js',
  'assets/js/chatbot.js',
  'assets/js/pwa.js',
  'assets/img/profile.jpg',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .catch((err) => console.warn('[SW] Precache skipped an item:', err))
  );
  // Does NOT call skipWaiting() here on purpose — an already-open tab
  // should keep running its current version until the visitor chooses
  // to refresh via the "new version available" banner (see pwa.js).
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name !== STATIC_CACHE && name !== RUNTIME_CACHE)
          .map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

// The update banner's "Refresh" button sends this message to let the
// waiting worker take over immediately, on the visitor's terms.
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

async function networkFirstHTML(request) {
  try {
    const fresh = await fetch(request);
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, fresh.clone());
    return fresh;
  } catch (err) {
    const cached = await caches.match(request);
    if (cached) return cached;
    const offline = await caches.match('offline.html');
    if (offline) return offline;
    throw err;
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);
  const networkPromise = fetch(request)
    .then((fresh) => {
      if (fresh && fresh.status === 200) cache.put(request, fresh.clone());
      return fresh;
    })
    .catch(() => null);
  return cached || (await networkPromise) || Response.error();
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle GET requests, and only ever touch same-origin requests.
  // Everything else (CDNs, YouTube, live price APIs, X, fonts) passes
  // straight through untouched.
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;

  const isHTMLNavigation =
    req.mode === 'navigate' ||
    (req.headers.get('accept') || '').includes('text/html');

  if (isHTMLNavigation) {
    event.respondWith(networkFirstHTML(req));
    return;
  }

  event.respondWith(staleWhileRevalidate(req));
});
