importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([
	{ url: '/css', revision: '1' },
	{ url: '/images', revision: '1' },
	{ url: '/js', revision: '1' },
	{ url: '/pages', revision: '1' },
	{ url: '/favicon.ico', revision: '1' },
	{ url: '/index.html', revision: '1' },
	{ url: '/manifest.json', revision: '1' },
	{ url: '/nav.html', revision: '1' },
	{ url: '/service-worker.js', revision: '1' },
	{ url: '/css/materialize.min.css', revision: '1' },
	{ url: '/css/style.css', revision: '1' },
	{ url: '/images/icon', revision: '1' },
	{ url: '/images/background.jpg', revision: '1' },
	{ url: '/images/logo.png', revision: '1' },
	{ url: '/images/no-image.png', revision: '1' },
	{ url: '/images/icon/apple-touch-icon-180x180.png', revision: '1' },
	{ url: '/images/icon/favicon-16x16.png', revision: '1' },
	{ url: '/images/icon/favicon-32x32.png', revision: '1' },
	{ url: '/images/icon/pwa-192x192.png', revision: '1' },
	{ url: '/images/icon/pwa-512x512.png', revision: '1' },
	{ url: '/js/api.js', revision: '1' },
	{ url: '/js/db.js', revision: '1' },
	{ url: '/js/idb.js', revision: '1' },
	{ url: '/js/init.js', revision: '1' },
	{ url: '/js/installSW.js', revision: '1' },
	{ url: '/js/materialize.min.js', revision: '1' },
	{ url: '/js/nav.js', revision: '1' },
	{ url: '/pages/competition.html', revision: '1' },
	{ url: '/pages/developer.html', revision: '1' },
	{ url: '/pages/favorite.html', revision: '1' },
	{ url: '/pages/home.html', revision: '1' },
	{ url: '/pages/team.html', revision: '1' },
	{ url: 'https://code.jquery.com/jquery-2.1.1.min.js', revision: '1' },
	{ url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
	{ url: 'https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: '1' },
]);

workbox.routing.registerRoute(
	new RegExp('.*'),
	workbox.strategies.staleWhileRevalidate()
);

self.addEventListener('push', function (event) {
	let body;
	const title = 'Vanir Notification';
	if (event.data) {
		body = event.data.text();
	} else {
		body = 'Push message no payload';
	}
	const options = {
		body: body,
		icon: 'images/logo.png',
		badge: 'images/logo.png',
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1
		}
	};
	event.waitUntil(
		self.registration.showNotification(title, options)
	);
});