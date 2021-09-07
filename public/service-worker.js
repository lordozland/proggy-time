var CACHE_NAME = 'my-site-cache-v1';
var DATA_CACHE_NAME = 'data-cache-v1';
var urlsToCache = [
  './',
  './gotDB.js',
  './index.html',
  './style.css',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
];




// install event handler
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  console.log('Install');
  self.skipWaiting();
});

// retrieve assets from cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(DATA_CACHE_NAME)
    .then(cache => {
      return fetch(event.request)
    })
  );
  console.log('here')
});

//  https://developers.google.com/web/fundamentals/primers/service-workers
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

