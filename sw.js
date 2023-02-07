/* global caches, fetch, self */

// Fill here with your cache name-version.
const CACHE_NAME = "xtealer-web-v3.0.0";
// This is the list of URLs to be cached by your Progressive Web App.
const CACHED_URLS = [
  "/",
  "/index/html",
  "/manifest.json",
  "/register.js",
  "/assets/android-chrome-512x512.png",
  "/assets/android-chrome-192x192.png",
];

// Open cache on install.
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async function () {
      const cache = await caches.open(CACHE_NAME);

      await cache.addAll(CACHED_URLS);
    })()
  );
});

// Cache and update with stale-while-revalidate policy.
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Prevent Chrome Developer Tools error:
  // Failed to execute 'fetch' on 'ServiceWorkerGlobalScope': 'only-if-cached' can be set only with 'same-origin' mode
  //
  // See also https://stackoverflow.com/a/49719964/1217468
  if (request.cache === "only-if-cached" && request.mode !== "same-origin") {
    return;
  }

  event.respondWith(
    (async function () {
      const cache = await caches.open(CACHE_NAME);

      const cachedResponsePromise = await cache.match(request);
      const networkResponsePromise = fetch(request);

      if (request.url.startsWith(self.location.origin)) {
        event.waitUntil(
          (async function () {
            const networkResponse = await networkResponsePromise;

            await cache.put(request, networkResponse.clone());
          })()
        );
      }

      return cachedResponsePromise || networkResponsePromise;
    })()
  );
});

// Clean up caches other than current.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async function () {
      const cacheNames = await caches.keys();

      await Promise.all(
        cacheNames
          .filter((cacheName) => {
            const deleteThisCache = cacheName !== CACHE_NAME;

            return deleteThisCache;
          })
          .map((cacheName) => caches.delete(cacheName))
      );
    })()
  );
});
