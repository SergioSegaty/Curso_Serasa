//'use strict'

const FILES_TO_CACHE = [
    'index.html',
    './src/styles/style.css',
]
const CACHE_NAME = 'NewsCache';


self.addEventListener('install', (evt) => {
    // Adds the data to the Cache
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-Caching offline page');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
})

// Remove previous cached data from disk
self.addEventListener('activate', (evt) => {
    evt.waitUntil(
        caches.keys().then((keylist) => {
            return Promise.all(keylist.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
})

self.addEventListener('fetch', (evt) => {
    evt.respondWith(
        fetch(evt.request)
        .catch(() => {
            return caches.open(CACHE_NAME)
                .then((cache) => {
                    return cache.match('index.html');
                })
        })
    )
})