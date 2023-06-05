/* global caches, fetch, self */

const CACHE_NAME = "xtealer-web-v3.0.7";
const CACHED_URLS = [
  "/",
  // "/index.html",
  "/manifest.json",
  "/register.js",
  "/firebase.js",
  "/assets/android-chrome-512x512.png",
  "/assets/android-chrome-192x192.png",
  "/assets/favicons/xtealer-round.png",
  "/assets/favicon.ico",
  "/assets/images/xtealer-og.jpeg",
  "/assets/css/styles.css",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async function () {
      const cache = await caches.open(CACHE_NAME);

      try {
        await cache.addAll(CACHED_URLS);
        console.log("Cached URLs successfully.");
      } catch (error) {
        console.error("Caching failed for one or more URLs:", error);
      }
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

      const cachedResponse = await cache.match(request);

      // Serve the cached response immediately and fetch a fresh response in the background
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (request.url.startsWith(self.location.origin)) {
            cache.put(request, networkResponse.clone()); // Cache the fetched response
          }
          return networkResponse;
        })
        .catch(() => cachedResponse); // If the network request fails, fallback to the cached response

      return cachedResponse || fetchPromise;
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
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })()
  );
});
