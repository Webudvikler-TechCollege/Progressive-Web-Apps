self.addEventListener('install', event => {
	console.log('serviceworker has been installed...');
})

self.addEventListener('activate', event => {
	console.log('serviceworker has been activated...');
})

self.addEventListener('fetch', event => {
	
})



