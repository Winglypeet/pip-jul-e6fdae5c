// Offline-cache for Pips Julekalender (version mwvwp8gj)
const CACHE = 'pipkal-mwvwp8gj';
const FILES = ["./","index.html","manifest.webmanifest","ikon-192.png","ikon-512.png","ikon-180.png","lyd/liste.json","lyd/d1.by1.mp3","lyd/d1.by2.mp3","lyd/d1.by3.mp3","lyd/d1.lo1.mp3","lyd/d1.lo2.mp3","lyd/d1.hej.mp3","lyd/d1.lo3.mp3","lyd/d1.lo4.mp3","lyd/d1.hi1.mp3","lyd/d1.hi2.mp3","lyd/d1.hi3.mp3","lyd/d1.hi4.mp3","lyd/d1.lo5.mp3","lyd/d1.lo6.mp3","lyd/d1.lo7.mp3","lyd/d1.ta1.mp3","lyd/d1.ta2.mp3","lyd/d1.ta3.mp3","lyd/d1.ta4.mp3","lyd/d1.sk1.mp3","lyd/d1.sk2.mp3","lyd/d1.sk3.mp3","lyd/d1.sk4.mp3","lyd/d1.ug1.mp3","lyd/d1.ug2.mp3","lyd/d1.ug3.mp3","lyd/d1.ug4.mp3","lyd/d1.ug5.mp3","lyd/d1.ug6.mp3","lyd/d1.ja.mp3","lyd/d1.mu0.mp3","lyd/d1.mu1.mp3","lyd/d1.mu2.mp3","lyd/d1.mu3.mp3","lyd/d1.mu4.mp3","lyd/d1.mu5.mp3","lyd/d1.mu6.mp3","lyd/d1.mu7.mp3","lyd/d1.mu8.mp3","lyd/d1.kj_snefnug.mp3","lyd/d1.kj_stjerne.mp3","lyd/d1.kj_rose.mp3","lyd/d1.mu9.mp3","lyd/d1.fo1.mp3","lyd/d1.fo2.mp3","lyd/d1.fo3.mp3","lyd/d1.fo4.mp3"];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return;
  // Siden selv: hent ny version når der er net, ellers brug den gemte
  if (e.request.mode === 'navigate' || u.pathname.endsWith('/index.html') || u.pathname.endsWith('/lyd/liste.json')) {
    e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); return r; }).catch(() => caches.match(e.request).then(r => r || caches.match('index.html'))));
    return;
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); return res; })));
});
