const CACHE_NAME = 'nukemap-v2.0.0';
const TILE_CACHE = 'nukemap-tiles-v2';
const PRECACHE = ['./', './index.html'];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(PRECACHE)));
    self.skipWaiting();
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME && k !== TILE_CACHE).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', e => {
    const url = new URL(e.request.url);
    const isTile = url.hostname.includes('basemaps') || url.hostname.includes('tile') || url.hostname.includes('carto');
    if (isTile) {
        e.respondWith(
            caches.open(TILE_CACHE).then(cache =>
                cache.match(e.request).then(r => {
                    if (r) return r;
                    return fetch(e.request).then(resp => {
                        if (resp.ok) cache.put(e.request, resp.clone());
                        return resp;
                    }).catch(() => new Response('', { status: 404 }));
                })
            )
        );
    } else {
        e.respondWith(
            caches.match(e.request).then(r => r || fetch(e.request).catch(() => new Response('Offline', { status: 503 })))
        );
    }
});
