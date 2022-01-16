let CACHE_NAME = 'ccidenticon-docs-cache-v1';

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) return response;
      
      return fetch(event.request).then(function(response) {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        let responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function(cache) {
          if (!event.request.url.startsWith('http')) return;
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});