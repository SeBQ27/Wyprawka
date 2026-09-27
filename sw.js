// Prosty service worker: offline dla powłoki aplikacji i list. Pogoda zawsze z sieci.
const CACHE = "wyprawka-v1";
const SHELL = ["./", "index.html", "lista.html", "pogoda/", "assets/style.css", "assets/store.js", "assets/icon.svg",
  "data/wyprawka.json", "data/sen.json", "data/zabawki.json", "manifest.webmanifest"];
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return; // API pogody i fonty: bez cache SW
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); return r; })
    .catch(() => caches.match(e.request)));
});
