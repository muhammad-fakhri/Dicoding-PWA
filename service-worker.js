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
	{ url: 'https://code.jquery.com/jquery-2.1.1.min.js', revision: '1' }
]);

workbox.routing.registerRoute(
	new RegExp('https://api.football-data.org/v2/'),
	workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
	/^https:\/\/fonts\.googleapis\.com/,
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'google-fonts-stylesheets',
	})
);

workbox.routing.registerRoute(
	/^https:\/\/fonts\.gstatic\.com/,
	workbox.strategies.cacheFirst({
		cacheName: 'google-fonts-webfonts',
		plugins: [
			new workbox.cacheableResponse.Plugin({
				statuses: [0, 200],
			}),
			new workbox.expiration.Plugin({
				maxAgeSeconds: 60 * 60 * 24 * 365,
				maxEntries: 30,
			}),
		],
	})
);

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