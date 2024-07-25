// src/service-worker.js
self.addEventListener('install', event => {
    console.log('Service worker installing...');
    event.waitUntil(
      caches.open('my-cache').then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/main.js',
          'https://static.vecteezy.com/system/resources/previews/008/687/818/non_2x/food-delivery-logo-free-vector.jpg',
          'https://static.vecteezy.com/system/resources/previews/008/687/818/non_2x/food-delivery-logo-free-vector.jpg',
          // add more assets to cache as needed
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });
  