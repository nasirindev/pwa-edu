const CACHE_NAME = "media-belajar-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/manifest.json",
  "/icon.png",
  // Tambahkan path aset statis lainnya di sini jika sudah ada
];

// 1. Install Event: Menyimpan aset statis ke Cache Storage
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("SW: Mencache aset dasar untuk belajar offline...");
      return cache.addAll(ASSETS_TO_CACHE);
    }),
  );
  self.skipWaiting();
});

// 2. Activate Event: Menghapus cache lama jika ada update versi
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("SW: Menghapus cache lama...");
            return caches.delete(cache);
          }
        }),
      );
    }),
  );
});

// 3. Fetch Event: Strategi "Stale-While-Revalidate"
// Sangat cocok untuk media pembelajaran:
// Munculkan materi dari cache (instan), lalu update di background jika ada internet.
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        // Update cache dengan versi terbaru dari internet
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
        });
        return networkResponse;
      });

      // Kembalikan cache jika ada, atau tunggu hasil network
      return cachedResponse || fetchPromise;
    }),
  );
});

// 4. Push Notification: Sapa siswa saat ada materi baru
self.addEventListener("push", (event) => {
  const data = event.data
    ? event.data.json()
    : {
        title: "Ayo Belajar!",
        body: "Ada petualangan baru menantimu hari ini!",
      };

  const options = {
    body: data.body,
    icon: "/icon.png", // Ikon aplikasi
    badge: "/icon.png", // Ikon kecil di bar notifikasi
    vibrate: [100, 50, 100],
    data: {
      url: "/",
    },
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// 5. Notification Click: Buka aplikasi saat notifikasi diklik
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/"));
});
