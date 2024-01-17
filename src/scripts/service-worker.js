self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('linkemeup').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                /* Add other URLs of assets to cache */
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});