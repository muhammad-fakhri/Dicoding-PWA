const CACHE_NAME = 'vanir-v2';
const urlsToCache = [
	'/css',
	'/images',
	'/js',
	'/pages',
	'/debug.log',
	'/favicon.ico',
	'/files.txt',
	'/index.html',
	'/manifest.json',
	'/nav.html',
	'/service-worker.js',
	'/css/materialize.min.css',
	'/css/style.css',
	'/images/icon',
	'/images/background.jpg',
	'/images/logo.png',
	'/images/no-image.png',
	'/images/icon/apple-touch-icon-180x180.png',
	'/images/icon/favicon-16x16.png',
	'/images/icon/favicon-32x32.png',
	'/images/icon/pwa-192x192.png',
	'/images/icon/pwa-512x512.png',
	'/js/api.js',
	'/js/db.js',
	'/js/idb.js',
	'/js/init.js',
	'/js/installSW.js',
	'/js/materialize.min.js',
	'/js/nav.js',
	'/pages/competition.html',
	'/pages/developer.html',
	'/pages/favorite.html',
	'/pages/home.html',
	'/pages/team.html',
	'https://code.jquery.com/jquery-2.1.1.min.js',
	'https://fonts.googleapis.com/icon?family=Material+Icons',
	'https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(function (cache) {
				return cache.addAll(urlsToCache);
			})
	);
})

self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys()
			.then(function (cacheNames) {
				return Promise.all(
					cacheNames.map(function (cacheName) {
						if (cacheName != CACHE_NAME) {
							console.log("ServiceWorker: cache " + cacheName + " deleted");
							return caches.delete(cacheName);
						}
					})
				);
			})
	);
})

self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request, { cacheName: CACHE_NAME })
			.then(function (response) {
				if (response) {
					console.log("ServiceWorker: Use cached asset: ", response.url);
					return response;
				}

				console.log("ServiceWorker: Loading asset from the server: ", event.request.url);
				let fetchRequest = event.request.clone();
				return fetch(fetchRequest).then(
					function (response) {
						if (!response || response.status !== 200) {
							return response;
						}
						let responseToCache = response.clone();
						caches.open(CACHE_NAME)
							.then(function (cache) {
								cache.put(event.request, responseToCache);
							});
						return response;
					}
				);
			})
	);
});