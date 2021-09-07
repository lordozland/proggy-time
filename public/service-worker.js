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
self.addEventListener("fetch", function(evt) {
  // cache successful requests to the API
  if (evt.request.url.includes("/api/")) {
    evt.respondWith(
      caches.open(DATA_CACHE_NAME)
      .then((cache) => {
        return fetch(evt.request)
          .then(response => {
            // If the response was good, clone it and store it in the cache.
            if (response.status === 200) {
              cache.put(evt.request.url, response.clone());
            }

            return response;
          })
          .catch((err) => {
            // Network request failed, try to get it from the cache.
            return cache.match(evt.request);
          });
      }).catch((err) => console.log(err))
    );

    return;
  }

  // if the request is not for the API, serve static assets using "offline-first" approach.
  // see https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook#cache-falling-back-to-network
  evt.respondWith(
    caches.open(CACHE_NAME).then(function (cache) {
      return caches.match(evt.request).then(function (response) {
        return response || fetch(evt.request);
    })
    })
  );
});

// see https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook#cache-falling-back-to-network
//  ^^^^^
// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     caches.open('mysite-dynamic').then(function (cache) {
//       return fetch(event.request).then(function (response) {
//         cache.put(event.request, response.clone());
//         return response;
//       });
//     }),
//   );
// });

// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.open(DATA_CACHE_NAME)
//     .then(cache => {
//       return fetch(event.request)
//       .then(response => {
//         // If the response was good, clone it and store it in the cache.
//         if (response.status === 200) {
//           cache.put(evt.request.url, response.clone());
//         }

//         return response;
//       })
//       .catch(err => {
//         // Network request failed, try to get it from the cache.
//         return cache.match(evt.request);
//       });
//   }).catch(err => console.log(err))
// );

// return;
// }

// // if the request is not for the API, serve static assets using "offline-first" approach.
// // see https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook#cache-falling-back-to-network
// evt.respondWith(
//   caches.match(evt.request).then(function(response) {
//   return response || fetch(evt.request);
// }));};

//  https://developers.google.com/web/fundamentals/primers/service-workers
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

