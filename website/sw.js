importScripts('./workbox/workbox-sw.js');

function cacheFiles() {
  const cacheName = "kotlin-everywhere";
  const cacheNameOption = {cacheName: cacheName};

  // index.html
  workbox.routing.registerRoute(
    new RegExp('/$'),
    new workbox.strategies.NetworkFirst(cacheNameOption)
  );

  const strategy = new workbox.strategies.StaleWhileRevalidate(cacheNameOption);

  // css
  workbox.routing.registerRoute(
    new RegExp('/css/'),
    strategy
  );

  // js
  workbox.routing.registerRoute(
    new RegExp('/js/'),
    strategy
  );

  // images
  workbox.routing.registerRoute(
    new RegExp('/img/'),
    strategy
  );

  // warm basic cache
  self.addEventListener('install', (event) => {
    const urls = [
      './',
      './css/bootstrap.min.css',
      './css/main.css',
      './js/jquery-3.3.1.slim.min.js',
      './js/bootstrap.bundle.min.js',
      './img/headerbg.png',
      './img/favicon.png',
      './img/icon.png'
    ];
    event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(urls)));
  });
}

if(workbox) {
  // use local version of workbox
  workbox.setConfig({
    modulePathPrefix: './workbox/'
  });

  cacheFiles();
}
