// Navn på App Shell Cache til assets filer 
const staticCacheName = 'site-static-v3'
// Navn på dynamisk cache
const dynamicCacheName = 'site-dynamic-v1'

// Array med assets filer til statisk cache
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

/**
 * Funktion til at begrænse størrelsen af cache med
 * @param {String} cacheName Navn på cache
 * @param {Number} numAllowedFiles Antal tilladte filer
 */
const limitCacheSize = (cacheName, numAllowedFiles) => {
	// Åbn den angivede cache
	caches.open(cacheName).then(cache => {
		// Hent array af cache keys
		cache.keys().then(keys => {
			// Hvis mængden af filer overstiger det tilladte
			if(keys.length > numAllowedFiles) {
				// Slet første index (ældste fil) og kør funktion igen indtil antal er nået
				cache.delete(keys[0]).then(
					limitCacheSize(cacheName, numAllowedFiles)
				)
			}
		})
	})
}

// Install event
self.addEventListener('install', event => {
	// Vent til alle opgaver er udført
	event.waitUntil(
		
		/* Tilføj assets filer til statisk cache */

		// Åbn statisk cache
		caches.open(staticCacheName).then(cache => {
			// Tilføj array af assets filer til cache
			cache.addAll(assets)
		})	
	)
})

// Activate event
self.addEventListener('activate', event => {
	// Vent til alle opgaver er udført
	event.waitUntil(
		
		/* Slet tidligere cache versioner */
		
		// Kald alle cache nøgler (Navn på cache samlinger)
		caches.keys().then(keys => {
			// Returnerer et array af promises (et promis for hver fil)
			return Promise.all(keys
				// Filtrer alle som ikke er medlem af den nuværende cache version
				.filter(key => key !== staticCacheName)
				// Map filter array og slet filer
				.map(key => caches.delete(key)))
		})
	)
	return;
})

// Fetch event
self.addEventListener('fetch', event => {
	limitCacheSize(dynamicCacheName, 2)

	// Fix af problem med dynamisk cache og chrome-extension bug
	if(!(event.request.url.indexOf('http') === 0)) return;

	// Kontroller svar på request
	event.respondWith(

		/* Håndtering af cache match og dynamisk cache */

		// Kig efter file match i cache
		caches.match(event.request).then(cacheRes => {

			// Returner hvis match fra cache - ellers hent fil på server
			return cacheRes || fetch(event.request).then(fetchRes => {

				// Åbn dynamisk cache
				return caches.open(dynamicCacheName).then(cache => {

					// Tilføj side til dynamisk cache
					cache.put(event.request.url, fetchRes.clone())

					// Kalder limit funktion
					limitCacheSize(dynamicCacheName, 2)

					// Returner request
					return fetchRes
				})
			})


		})
	)
})



