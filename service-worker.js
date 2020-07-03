const CACHE_NAME = 'firstpwa-v1';
var urlsToCache = [
	'/',
	'/nav.html',
	'/index.html',
	'/pages/about.html',
	'/pages/contact.html',
	'/pages/home.html',
	'/pages/service.html',
	'/pages/work.html',
	'/images/about.jpg',
	'/images/background.jpg',
	'/images/logo.png',
	'/images/icon.png',
	'/images/work/bananapirates.jpg',
	'/images/work/barengin.jpg',
	'/images/work/bemkmipb.jpg',
	'/images/work/hienglish.jpg',
	'/images/work/imosy.jpg',
	'/images/work/ittoday.jpg',
	'/css/materialize.min.css',
	'/css/style.css',
	'/js/init.js',
	'/js/materialize.min.js',
	'/js/script.js'
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
							console.log("ServiceWorker: cache " + cacheName + " dihapus");
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
					console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
					return response;
				}

				console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
				return fetch(event.request);
			})
	);
});

