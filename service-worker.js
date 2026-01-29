
const CACHE_NAME = 'saudepg-v1';
const urlsToCache = [
  './',
  './index.html',
  './mapa.html',
  './atendimento.html',
  './direitos.html',
  './indicadores.html',
  './debug.html',
  './style.css',
  './script.js',
  './components/navbar.js',
  './components/footer.js',
  './components/quick-access.js',
  './components/unidades-proximas.js',
  './components/install-prompt.js',
  './js/animations.js',
  './js/mapa.js',
  './manifest.json'
];


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache.map(url => {

          if (url.startsWith('/')) {
            return url;
          }
          return url;
        })).catch(error => {
          console.warn('Erro ao cachear alguns recursos:', error);

          return Promise.resolve();
        });
      })
      .catch(error => console.error('Erro ao abrir cache:', error))
  );
  self.skipWaiting();
});


self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deletando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});


self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);


  if (url.origin !== location.origin) {
    event.respondWith(
      fetch(request)
        .catch(error => {
          console.warn('Erro ao buscar recurso externo:', error);
          return caches.match(request) || new Response('Offline - recurso não disponível', {
            status: 503,
            statusText: 'Service Unavailable'
          });
        })
    );
    return;
  }


  event.respondWith(
    caches.match(request)
      .then(response => {
        if (response) {
          fetch(request)
            .then(networkResponse => {
              caches.open(CACHE_NAME).then(cache => {
                cache.put(request, networkResponse.clone());
              });
            })
            .catch(error => console.warn('Erro ao atualizar cache:', error));
          return response;
        }

        return fetch(request)
          .then(response => {

            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }


            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(request, responseToCache);
              });

            return response;
          })
          .catch(error => {
            console.warn('Erro na requisição:', error);

            return caches.match(request) || new Response('Offline - recurso não disponível', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});


self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    event.waitUntil(
      fetch('/api/sync')
        .then(response => {
          console.log('Dados sincronizados com sucesso');
          return response;
        })
        .catch(error => {
          console.warn('Erro ao sincronizar dados:', error);
        })
    );
  }
});


self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'Nova atualização do SaúdePG',
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%230F6BFF" width="192" height="192"/><text x="50%" y="50%" font-size="120" fill="white" font-weight="bold" text-anchor="middle" dominant-baseline="central">S</text></svg>',
    badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect fill="%230F6BFF" width="96" height="96"/></svg>',
    tag: data.tag || 'notification',
    requireInteraction: data.requireInteraction || false
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'SaúdePG', options)
  );
});


self.addEventListener('notificationclick', event => {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || '/index.html';

  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    })
      .then(clientList => {
 
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }

        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

console.log('Service Worker carregado');

