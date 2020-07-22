const CACHE_NAME = 'firstpwa-v1';
const urlsToCache = [
	'/',
	'/css',
	'/images',
	'/js',
	'/pages',
	'/favicon.ico',
	'/index.html',
	'/manifest.json',
	'/nav.html',
	'/service-worker.js',
	'/css/materialize.min.css',
	'/css/style.css',
	'/images/icon',
	'/images/work',
	'/images/about.jpg',
	'/images/background.jpg',
	'/images/logo.png',
	'/images/icon/apple-touch-icon-180x180.png',
	'/images/icon/favicon-16x16.png',
	'/images/icon/favicon-32x32.png',
	'/images/icon/pwa-192x192.png',
	'/images/icon/pwa-512x512.png',
	'/images/work/bananapirates.jpg',
	'/images/work/barengin.jpg',
	'/images/work/bemkmipb.jpg',
	'/images/work/hienglish.jpg',
	'/images/work/imosy.jpg',
	'/images/work/ittoday.jpg',
	'/js/init.js',
	'/js/materialize.min.js',
	'/js/script.js',
	'/pages/competition.html',
	'/pages/favorite.html',
	'/pages/home.html',
	'/pages/team.html',
	'https://code.jquery.com/jquery-2.1.1.min.js',
	'https://fonts.googleapis.com/icon?family=Material+Icons',
	'https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

// self.addEventListener('install', function (event) {
// 	event.waitUntil(
// 		caches.open(CACHE_NAME)
// 			.then(function (cache) {
// 				return cache.addAll(urlsToCache);
// 			})
// 	);
// })

// self.addEventListener('activate', function (event) {
// 	event.waitUntil(
// 		caches.keys()
// 			.then(function (cacheNames) {
// 				return Promise.all(
// 					cacheNames.map(function (cacheName) {
// 						if (cacheName != CACHE_NAME) {
// 							console.log("ServiceWorker: cache " + cacheName + " dihapus");
// 							return caches.delete(cacheName);
// 						}
// 					})
// 				);
// 			})
// 	);
// })

// self.addEventListener('fetch', function (event) {
// 	event.respondWith(
// 		caches.match(event.request, { cacheName: CACHE_NAME })
// 			.then(function (response) {
// 				if (response) {
// 					console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
// 					return response;
// 				}

// 				console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
// 				return fetch(event.request);
// 			})
// 	);
// });

