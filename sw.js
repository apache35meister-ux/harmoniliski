// Service Worker - Always Fresh Network First
const CACHE_NAME = 'zenspa-live-v5';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Sadece GET isteklerini ve harici API olmayan istekleri onbellege al
  if (event.request.method !== 'GET' || event.request.url.includes('api.github.com') || event.request.url.includes('ipwho') || event.request.url.includes('ipapi')) {
    return;
  }

  event.respondWith(
    fetch(event.request).then(response => {
      if (response && response.status === 200 && event.request.method === 'GET') {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          try { cache.put(event.request, responseClone); } catch(e) {}
        });
      }
      return response;
    }).catch(() => {
      return caches.match(event.request);
    })
  );
});
