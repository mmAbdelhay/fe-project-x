// Declare CACHE_NAME as a global variable
const CACHE_NAME = 'my-cache';

const urlsToCache = [
    '/',
    '/index.html',
    // Add other URLs or assets you want to cache for offline use here
];

// Install event: cache files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event: serve from cache if available, else fetch from network
self.addEventListener('fetch', (event) => {
    // Check if the request is from the same origin
    if (event.request.url.startsWith(self.origin)) {
        event.respondWith(
            caches.match(event.request)
                .then((response) => {
                    // Cache hit - return response from cache
                    if (response) {
                        return response;
                    }

                    // Clone the request because it's a one-time-use object
                    const fetchRequest = event.request.clone();

                    return fetch(fetchRequest)
                        .then((response) => {
                            // Check if we received a valid response
                            if (!response || response.status !== 200 || response.type !== 'basic') {
                                return response;
                            }

                            // Clone the response because it's a one-time-use object
                            const responseToCache = response.clone();

                            // Open the cache with the global CACHE_NAME variable
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, responseToCache);
                                });

                            return response;
                        });
                })
        );
    }
});

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (!cacheWhitelist.includes(cacheName)) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
    );
});
