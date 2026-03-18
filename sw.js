// CPM Scheduler — Service Worker v1
const CACHE = 'cpm-v1';
const ASSETS = [
  '/cpm-scheduler/',
  '/cpm-scheduler/index.html',
  '/cpm-scheduler/CPM_Mobile_v2.html',
  '/cpm-scheduler/manifest.json',
  '/cpm-scheduler/manifest-mobile.json',
  '/cpm-scheduler/icon-192.png',
  '/cpm-scheduler/icon-512.png',
  '/cpm-scheduler/icon-mobile-192.png',
  '/cpm-scheduler/icon-mobile-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(()=>{})
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => cached))
  );
});
