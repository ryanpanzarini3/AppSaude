// Service Worker para SaúdePG
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

// Instalação do Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache.map(url => {
          // Trata URLs relativas
          if (url.startsWith('/')) {
            return url;
          }
          return url;
        })).catch(error => {
          console.warn('Erro ao cachear alguns recursos:', error);
          // Continua mesmo se alguns recursos não puderem ser cacheados
          return Promise.resolve();
        });
      })
      .catch(error => console.error('Erro ao abrir cache:', error))
  );
  self.skipWaiting();
});

// Ativação do Service Worker
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

// Estratégia de fetch: Cache First, fallback para Network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Não cachear requisições externas de APIs
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

  // Para requisições internas: Cache First strategy
  event.respondWith(
    caches.match(request)
      .then(response => {
        if (response) {
          // Atualizar cache em background
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
            // Não cachear se não for uma resposta válida
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }

            // Clonar a resposta
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(request, responseToCache);
              });

            return response;
          })
          .catch(error => {
            console.warn('Erro na requisição:', error);
            // Tentar retornar do cache se estiver offline
            return caches.match(request) || new Response('Offline - recurso não disponível', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// Sincronização em background (quando volta online)
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

// Notificações push
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

// Clique nas notificações
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || '/index.html';

  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    })
      .then(clientList => {
        // Verificar se já existe uma janela aberta
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        // Se não existir, abrir uma nova
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

console.log('Service Worker carregado');
