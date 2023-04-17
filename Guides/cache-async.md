# Cache og asynkrone handlinger

Det er typsik at vi tilføjer filer til vores cache i vores service workers *install* event. Men da disse handlinger kører asynkront kan det give problemer, når vi vil tilføje mange filer til cachen. 

Når en Service Worker aktiveres, kan den udføre en række opgaver, såsom at åbne en cache, hente og lagre filer, opdatere cachen osv. Hvis en Service Worker er færdig med at udføre disse opgaver, kan den blive deaktiveret af browseren for at spare på ressourcerne.

Hvis der er behov for at udføre yderligere opgaver, efter at Service Worker er blevet aktiveret, kan `waitUntil` metoden bruges til at vente på, at disse opgaver er færdige, før Service Worker kan deaktiveres.

Et eksempel på brugen af waitUntil kan være at vente på, at en cache er åbnet og alle relevante filer er lagret i cachen, før Service Worker kan deaktiveres. Dette kan sikre, at alle filer er tilgængelige i cachen, og at brugerne ikke vil opleve nogen fejl, når de forsøger at få adgang til applikationen offline.

En typisk implementering af `waitUntil` kan se sådan ud:
```js
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.open('my-cache').then(function(cache) {
      return cache.addAll([
        '/index.html',
        '/styles.css',
        '/app.js'
      ]);
    })
  );
});
```
I ovenstående eksempel venter Service Worker, indtil alle angivne filer er tilføjet til my-cache, før den kan deaktiveres.
