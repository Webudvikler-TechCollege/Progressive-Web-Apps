const staticCacheName = 'site-static-v3'

const assets = [
	'/',
	'./index.html',
	'./js/app.js',
	'./js/ui.js',
	'./js/materialize.min.js',
	'./css/styles.css',
	'./css/materialize.min.css',
	'./img/dish.png',
	'https://fonts.googleapis.com/icon?family=Material+Icons',
	'https://fonts.gstatic.com/s/materialicons/v140/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
]

self.addEventListener('install', event => {
	//console.log('serviceworker has been installed...');
	event.waitUntil(
		caches.open(staticCacheName).then(cache => {
			//console.log('Caching all assets')
			cache.addAll(assets)
		})	
	)
})

self.addEventListener('activate', event => {
	console.log('serviceworker has been activated...')
	event.waitUntil(
		caches.keys().then(keys => {
			return Promise.all(keys
				.filter(key => key !== staticCacheName)
				.map(key => caches.delete(key)))
		})
	)
	return;
})

self.addEventListener('fetch', event => {
	//console.log(event.request);
	event.respondWith(
		caches.match(event.request).then(cacheRes => {
			return cacheRes || fetch(event.request)
		})
	)
})



