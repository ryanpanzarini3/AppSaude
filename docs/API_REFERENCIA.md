# SaúdePG - Referência de APIs e Componentes

## 📚 Índice
1. [Web Components API](#web-components-api)
2. [Leaflet.js API](#leafletjs-api)
3. [Turf.js API](#turfjs-api)
4. [Service Worker API](#service-worker-api)
5. [Geolocation API](#geolocation-api)
6. [Dados das Unidades](#dados-das-unidades)

---

## 🧩 Web Components API

### CustomNavbar

**Uso**:
```html
<custom-navbar></custom-navbar>
```

**Propriedades**:
- Nenhuma propriedade exposta

**Eventos**:
- Nenhum evento customizado

**Métodos**:
```javascript
// Não há métodos públicos
// Renderização automática ao conectar
```

**CSS Customizável**:
```css
custom-navbar {
    --navbar-bg-from: #0F6BFF;
    --navbar-bg-to: #00D4FF;
}
```

---

### CustomFooter

**Uso**:
```html
<custom-footer></custom-footer>
```

**Conteúdo**:
- 4 seções de links
- Informações de contato
- Copyright automático

**Dados Inclusos**:
```javascript
footerData = {
    sections: [
        { title: "Serviços", links: [...] },
        { title: "Informações", links: [...] },
        { title: "Contato", links: [...] },
        { title: "Social", links: [...] }
    ]
}
```

---

### InstallPrompt

**Uso**:
```html
<install-prompt></install-prompt>
```

**Funcionalidades**:
- Detecta `beforeinstallprompt` event
- Exibe prompt customizado
- Trata instalação automática

**JavaScript**:
```javascript
class InstallPrompt extends HTMLElement {
    connectedCallback() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault()
            this.deferredPrompt = e
            this.showPrompt()
        })
    }

    install() {
        this.deferredPrompt.prompt()
    }
}
```

---

### ChatbotTriagem

**Uso**:
```html
<chatbot-triagem></chatbot-triagem>
```

**Propriedades**:
```javascript
// Configurável
chatbot.setAttribute('data-language', 'pt-BR')
chatbot.setAttribute('data-theme', 'dark')
```

**Métodos**:
```javascript
// Abrir/fechar
chatbot.open()
chatbot.close()

// Enviar mensagem
chatbot.sendMessage('Estou com dor de cabeça')

// Limpar histórico
chatbot.clearHistory()
```

**Eventos**:
```javascript
chatbot.addEventListener('message-sent', (e) => {
    console.log('Mensagem:', e.detail.text)
})

chatbot.addEventListener('recommendation', (e) => {
    console.log('Recomendação:', e.detail.unit)
})
```

---

### QuickAccess

**Uso**:
```html
<quick-access></quick-access>
```

**Conteúdo Padrão**:
- 4 Cards: Mapa, Atendimento, Direitos, Indicadores
- Ícones Feather
- Links para páginas

**Customização**:
```javascript
const qa = document.querySelector('quick-access')
qa.setAttribute('data-cards', JSON.stringify([
    { title: 'Mapa', icon: 'map', url: '/mapa.html' },
    // ...
]))
```

---

### UnidadesProximas

**Uso**:
```html
<unidades-proximas max-items="5"></unidades-proximas>
```

**Propriedades**:
```javascript
// Atributos
data-max-items = "10"          // Máximo de unidades
data-sort-by = "distance"      // Ordenar por: distance, name
data-show-map = "true"         // Mostrar botão de mapa
```

**Métodos**:
```javascript
// Atualizar lista
unidades.updateList()

// Obter proximidade
const nearby = unidades.getNearby()

// Definir filtro
unidades.setFilter({
    services: ['vacina', 'ecg'],
    distance: 5 // km
})
```

**Eventos**:
```javascript
unidades.addEventListener('unit-selected', (e) => {
    console.log('Unidade selecionada:', e.detail.unit)
    // Redirecionar para mapa
})
```

---

## 🗺️ Leaflet.js API

### Inicialização

```javascript
// Criar mapa
const map = L.map('map-container').setView([
    -25.0909,  // latitude (Ponta Grossa)
    -50.1617   // longitude
], 13)         // zoom

// Adicionar tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
    maxZoom: 19
}).addTo(map)
```

### Marcadores

```javascript
// Criar marcador simples
const marker = L.marker([-25.09, -50.16]).addTo(map)

// Marcador customizado
const customIcon = L.icon({
    iconUrl: 'icon.png',
    iconSize: [32, 32],
    popupAnchor: [0, -16]
})

const markerCustom = L.marker(
    [-25.09, -50.16],
    { icon: customIcon }
).addTo(map)

// Popup
marker.bindPopup('Nome da Unidade')
       .openPopup()

// Evento
marker.on('click', () => {
    console.log('Clicado no marcador')
})
```

### Círculos e Polígonos

```javascript
// Círculo
L.circle([-25.09, -50.16], {
    color: '#0F6BFF',
    fillColor: '#0F6BFF',
    fillOpacity: 0.2,
    radius: 500 // metros
}).addTo(map)

// Polígono (Voronoi)
L.polygon([
    [-25.08, -50.15],
    [-25.09, -50.17],
    [-25.10, -50.16]
], {
    color: '#00D4FF',
    fillOpacity: 0.1
}).addTo(map)
```

### Eventos de Mapa

```javascript
// Click
map.on('click', (e) => {
    console.log('Lat:', e.latlng.lat)
    console.log('Lng:', e.latlng.lng)
})

// Zoom mudou
map.on('zoomend', () => {
    console.log('Novo zoom:', map.getZoom())
})

// Arrasto
map.on('drag', () => {
    console.log('Posição:', map.getCenter())
})
```

### Bounds e Viewport

```javascript
// Obter limites atuais
const bounds = map.getBounds()
const north = bounds.getNorth()
const south = bounds.getSouth()
const east = bounds.getEast()
const west = bounds.getWest()

// Definir bounds
const maxBounds = L.latLngBounds(
    L.latLng(-25.18, -50.28),  // sudoeste
    L.latLng(-25.03, -50.07)   // nordeste
)
map.setMaxBounds(maxBounds)

// Fit to bounds
map.fitBounds(maxBounds)
```

### Clusters (Agrupar Marcadores)

```javascript
// Nota: Não implementado, mas exemplo:
const group = L.featureGroup()

ubsUnidades.forEach(unidade => {
    const marker = L.marker([unidade.lat, unidade.lng])
    group.addLayer(marker)
})

map.addLayer(group)
```

---

## 🗺️ Turf.js API

### Distância

```javascript
// Entre dois pontos
const from = turf.point([-50.16, -25.09])
const to = turf.point([-50.17, -25.10])
const distance = turf.distance(from, to) // km

// Variações
turf.distance(from, to, { units: 'miles' })
turf.distance(from, to, { units: 'meters' })
```

### Voronoi Diagram

```javascript
// Criar diagrama de Voronoi
const points = ubsUnidades.map(u => 
    turf.point([u.lng, u.lat])
)

const voronoi = turf.voronoi(
    turf.featureCollection(points),
    { bbox: [west, south, east, north] }
)

// cells = voronoi.features
// Cada feature é uma área de cobertura
```

### Buffer

```javascript
// Área ao redor de ponto
const point = turf.point([-50.16, -25.09])
const buffered = turf.buffer(point, 1) // 1 km

// Adicionar ao mapa
L.geoJSON(buffered, { color: '#0F6BFF' }).addTo(map)
```

### Nearest Point

```javascript
// Ponto mais próximo
const targetPoint = turf.point([-50.16, -25.09])
const points = turf.featureCollection([...])

const nearest = turf.nearestPoint(targetPoint, points)
console.log(nearest.properties.index) // índice do ponto
```

### Bbox (Bounding Box)

```javascript
// Obter bbox de feature
const feature = turf.point([-50.16, -25.09])
const bbox = turf.bbox(feature)
// [minX, minY, maxX, maxY]
// [-50.16, -25.09, -50.16, -25.09]

// Criar bbox feature
const bboxFeature = turf.bboxPolygon(bbox)
```

---

## ⚙️ Service Worker API

### Ciclos de Vida

```javascript
// Install
self.addEventListener('install', (event) => {
    // Cachear recursos
    event.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/style.css'
            ])
        })
    )
    // Pular espera
    self.skipWaiting()
})

// Activate
self.addEventListener('activate', (event) => {
    // Limpar caches antigos
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== 'current-v1')
                    .map(name => caches.delete(name))
            )
        })
    )
    // Reivindicar clientes
    self.clients.claim()
})

// Fetch
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request)
        })
    )
})
```

### Estratégias de Cache

```javascript
// 1. Cache First, Fallback to Network
const cacheFirst = (req) => {
    return caches.match(req).then(res => 
        res || fetch(req)
    )
}

// 2. Network First, Fallback to Cache
const networkFirst = (req) => {
    return fetch(req)
        .catch(() => caches.match(req))
}

// 3. Stale While Revalidate (Implementado)
const staleWhileRevalidate = (req) => {
    return caches.match(req).then(cached => {
        const fetched = fetch(req)
            .then(response => {
                caches.open('v1')
                    .then(cache => cache.put(req, response.clone()))
                return response
            })
        return cached || fetched
    })
}
```

### Registrar Service Worker

```javascript
// index.html
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(reg => console.log('SW registrado'))
        .catch(err => console.error('Erro SW:', err))
}

// Atualizar
navigator.serviceWorker.getRegistration()
    .then(reg => reg.update())

// Desregistrar
navigator.serviceWorker.getRegistration()
    .then(reg => reg.unregister())
```

---

## 📍 Geolocation API

### Obter Localização

```javascript
// Verificar suporte
if ('geolocation' in navigator) {
    // Obter localização atual
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude
            const lng = position.coords.longitude
            const accuracy = position.coords.accuracy // metros
            
            console.log(`Você está em: ${lat}, ${lng}`)
        },
        (error) => {
            console.error('Erro:', error.message)
            // PERMISSION_DENIED
            // POSITION_UNAVAILABLE
            // TIMEOUT
        },
        {
            enableHighAccuracy: true,  // GPS preciso
            timeout: 5000,             // 5 segundos
            maximumAge: 0              // Sempre novo
        }
    )
}
```

### Monitorar Localização

```javascript
// Rastrear movimento
let watchId = navigator.geolocation.watchPosition(
    (position) => {
        console.log('Nova posição:', position.coords)
    },
    (error) => {
        console.error('Erro:', error)
    }
)

// Parar rastreamento
navigator.geolocation.clearWatch(watchId)
```

### Erros

```javascript
const handleError = (error) => {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log('Usuário negou permissão')
            break
        case error.POSITION_UNAVAILABLE:
            console.log('Localização indisponível')
            break
        case error.TIMEOUT:
            console.log('Tempo de espera esgotado')
            break
    }
}
```

---

## 📊 Dados das Unidades

### Estrutura UBS

```javascript
{
    id: 1,
    nome: "Abrahão Federmann",
    bairro: "Ana Rita",
    endereco: "R. Quinze de Setembro, 260 - Uvaranas, ...",
    
    // Serviços
    vacina: false,      // boolean
    ecg: false,         // boolean
    dentista: false,    // boolean
    
    // Operacional
    periodo: "Manhã e Tarde",  // string
    ramal: "(42)3220-1000",    // string
    
    // Geolocalização
    lat: -25.0883606,   // number
    lng: -50.1435159,   // number
    
    // Visual
    color: "#ef4444"    // string (hex)
}
```

### Estrutura UPA

```javascript
{
    id: 1,
    nome: "UPA Uvaranas",
    tipo: "UPA",
    endereco: "Avenida General Carlos Cavalcanti, 4274 - Uvaranas, ...",
    bairro: "Uvaranas",
    
    // Geolocalização
    lat: -25.0910575,   // number
    lng: -50.1109483,   // number
    
    // Operacional
    periodo: "24h"      // string
}
```

### Exemplo de Uso

```javascript
// Importar dados
import { ubsUnidades, upaUnidades } from './js/mapa.js'

// Filtrar por serviço
const comVacina = ubsUnidades.filter(u => u.vacina === true)

// Filtrar por período
const aberta24h = upaUnidades.filter(u => u.periodo === '24h')

// Encontrar por ID
const unidade = ubsUnidades.find(u => u.id === 5)

// Agrupar por bairro
const porBairro = {}
ubsUnidades.forEach(u => {
    if (!porBairro[u.bairro]) porBairro[u.bairro] = []
    porBairro[u.bairro].push(u)
})

// Ordenar por nome
const ordenado = [...ubsUnidades].sort((a, b) => 
    a.nome.localeCompare(b.nome)
)
```

---

## 🎨 Cores Padrão

### Paleta Principal

```css
--primary-blue: #0F6BFF;      /* Azul principal */
--primary-cyan: #00D4FF;      /* Ciano */
--primary-dark: #1a1f3a;      /* Azul escuro */

--success: #10b981;           /* Verde */
--warning: #f59e0b;           /* Laranja */
--danger: #ef4444;            /* Vermelho */

--text-primary: #1f2937;      /* Texto escuro */
--text-secondary: #64748b;    /* Texto claro */

--bg-light: #f8fafc;          /* Fundo claro */
--border-light: #e5e7eb;      /* Border claro */
```

### Cores das Unidades (Mapa)

```javascript
// Cores por ID/tipo
{
    1: "#ef4444",   // Vermelho
    2: "#3b82f6",   // Azul
    3: "#06b6d4",   // Ciano
    4: "#10b981",   // Verde
    5: "#f59e0b",   // Laranja
    // ...
}

// Ou por serviço
const colorBySevico = {
    comTodos: "#10b981",        // Verde
    comAlguns: "#f59e0b",       // Laranja
    nenhum: "#ef4444"           // Vermelho
}
```

---

## 📱 Viewports e Breakpoints

```css
/* Tailwind Breakpoints */
sm: 640px     /* small - celular */
md: 768px     /* medium - tablet */
lg: 1024px    /* large - desktop */
xl: 1280px    /* extra large */
2xl: 1536px   /* 2x large */

/* Uso */
.card {
    padding: 1rem;       /* mobile */
}

@media (md) {
    .card {
        padding: 1.5rem; /* tablet */
    }
}

@media (lg) {
    .card {
        padding: 2rem;   /* desktop */
    }
}

/* Ou com Tailwind */
class="p-4 md:p-6 lg:p-8"
```

---

**Última atualização**: Janeiro 2026
**Versão**: 1.0.0
