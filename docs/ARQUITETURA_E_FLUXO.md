# SaúdePG - Arquitetura Visual e Fluxo de Dados

## 📊 Diagrama da Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                         NAVEGADOR DO USUÁRIO                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    index.html (HOME)                      │   │
│  │  ┌─────────────────────────────────────────────────────┐ │   │
│  │  │ <custom-navbar>       [Barra de Navegação]         │ │   │
│  │  ├─────────────────────────────────────────────────────┤ │   │
│  │  │ MAIN CONTENT:                                       │ │   │
│  │  │ • Hero Section (CTA)                                │ │   │
│  │  │ • <quick-access> [Cards de Acesso Rápido]         │ │   │
│  │  │ • <unidades-proximas> [Lista de Unidades]         │ │   │
│  │  │ • <install-prompt> [PWA Install Button]           │ │   │
│  │  ├─────────────────────────────────────────────────────┤ │   │
│  │  │ <custom-footer>       [Rodapé]                     │ │   │
│  │  └─────────────────────────────────────────────────────┘ │   │
│  │                                                            │   │
│  │  SCRIPTS CARREGADOS:                                      │   │
│  │  • base-config.js        (Configurações globais)         │   │
│  │  • script.js             (Inicialização e SW)            │   │
│  │  • components/*.js       (Web Components)                │   │
│  │  • https://cdn.tailwindcss.com  (Estilos)              │   │
│  │  • https://cdn.jsdelivr.net/feather-icons             │   │
│  │                                                            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              ↓                                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              mapa.html (PÁGINA DE MAPA)                  │   │
│  │  ┌─────────────────────────────────────────────────────┐ │   │
│  │  │ <custom-navbar>                                     │ │   │
│  │  ├─────────────────────────────────────────────────────┤ │   │
│  │  │ MAPAS LEAFLET:                                      │ │   │
│  │  │ ┌─────────────────────────────────────────────────┐ │   │
│  │  │ │ MAP DIV (#map)                                  │ │   │
│  │  │ │ • Tile Layer (OpenStreetMap)                   │ │   │
│  │  │ │ • Marcadores UBS (47 unidades)                │ │   │
│  │  │ │ • Marcadores UPA (3 unidades)                 │ │   │
│  │  │ │ • Diagrama Voronoi (áreas cobertura)         │ │   │
│  │  │ │ • Geolocation User (se permitido)            │ │   │
│  │  │ │ • Popups e Infowindows                        │ │   │
│  │  │ └─────────────────────────────────────────────────┘ │   │
│  │  │                                                       │   │
│  │  │ FILTROS LATERAIS:                                    │   │
│  │  │ □ Vacina    □ ECG    □ Dentista                   │   │
│  │  │                                                       │   │
│  │  ├─────────────────────────────────────────────────────┤ │   │
│  │  │ <custom-footer>                                     │ │   │
│  │  └─────────────────────────────────────────────────────┘ │   │
│  │                                                            │   │
│  │  SCRIPTS:                                                 │   │
│  │  • js/mapa.js       (Lógica do mapa, dados UBS/UPA)    │   │
│  │  • @turf/turf       (Análise geoespacial)              │   │
│  │  • leaflet.js       (Mapas)                             │   │
│  │                                                            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              ↓                                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │         atendimento.html (COMO FUNCIONA)                │   │
│  │  ┌─────────────────────────────────────────────────────┐ │   │
│  │  │ <custom-navbar>                                     │ │   │
│  │  ├─────────────────────────────────────────────────────┤ │   │
│  │  │ CONTEÚDO:                                           │ │   │
│  │  │ • Passo a Passo (4 etapas com números)            │ │   │
│  │  │ • Tipos de Atendimento (UBS, UPA, etc)            │ │   │
│  │  │ • Informações Necessárias                          │ │   │
│  │  │ • FAQ - Perguntas Frequentes                       │ │   │
│  │  │ • Documentação Necessária                          │ │   │
│  │  ├─────────────────────────────────────────────────────┤ │   │
│  │  │ <custom-footer>                                     │ │   │
│  │  └─────────────────────────────────────────────────────┘ │   │
│  │                                                            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              ↓                                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │         direitos.html (DIREITOS DO CIDADÃO)            │   │
│  │  ┌─────────────────────────────────────────────────────┐ │   │
│  │  │ <custom-navbar>                                     │ │   │
│  │  ├─────────────────────────────────────────────────────┤ │   │
│  │  │ CONTEÚDO:                                           │ │   │
│  │  │ • Direitos Fundamentais SUS                         │ │   │
│  │  │ • Deveres do Cidadão                               │ │   │
│  │  │ • Canais de Atendimento                            │ │   │
│  │  │ • Como Denunciar                                   │ │   │
│  │  │ • Medicamentos Gratuitos                           │ │   │
│  │  ├─────────────────────────────────────────────────────┤ │   │
│  │  │ <custom-footer>                                     │ │   │
│  │  └─────────────────────────────────────────────────────┘ │   │
│  │                                                            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              ↓                                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │         indicadores.html (DADOS DE SAÚDE)              │   │
│  │  ┌─────────────────────────────────────────────────────┐ │   │
│  │  │ <custom-navbar>                                     │ │   │
│  │  ├─────────────────────────────────────────────────────┤ │   │
│  │  │ CONTEÚDO:                                           │ │   │
│  │  │ • Estatísticas de Cobertura                         │ │   │
│  │  │ • Gráficos Interativos                              │ │   │
│  │  │ • Indicadores de Satisfação                         │ │   │
│  │  │ • Dados por Bairro                                  │ │   │
│  │  ├─────────────────────────────────────────────────────┤ │   │
│  │  │ <custom-footer>                                     │ │   │
│  │  └─────────────────────────────────────────────────────┘ │   │
│  │                                                            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              ↓                                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │           chat.html (CHATBOT DE TRIAGEM)               │   │
│  │  ┌─────────────────────────────────────────────────────┐ │   │
│  │  │ <custom-navbar>                                     │ │   │
│  │  ├─────────────────────────────────────────────────────┤ │   │
│  │  │ <chatbot-triagem>                                   │ │   │
│  │  │ • Interface Conversacional                          │ │   │
│  │  │ • Triagem de Sintomas                               │ │   │
│  │  │ • Recomendação de Unidades                          │ │   │
│  │  │ • Histórico de Conversa                             │ │   │
│  │  ├─────────────────────────────────────────────────────┤ │   │
│  │  │ <custom-footer>                                     │ │   │
│  │  └─────────────────────────────────────────────────────┘ │   │
│  │                                                            │   │
│  │  SCRIPTS:                                                 │   │
│  │  • components/chatbot-triagem.js (Lógica do chat)      │   │
│  │                                                            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      SERVICE WORKER                              │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ service-worker.js                                           ││
│  │                                                             ││
│  │ CACHE STRATEGY: Stale-While-Revalidate                     ││
│  │                                                             ││
│  │ ┌─────────────────────────────────────────────────────┐   ││
│  │ │ Cache 'saudepg-v1'                                  │   ││
│  │ │ • index.html, mapa.html, atendimento.html, etc    │   ││
│  │ │ • style.css                                         │   ││
│  │ │ • components/*.js                                   │   ││
│  │ │ • js/*.js                                           │   ││
│  │ │ • manifest.json                                     │   ││
│  │ │ • CDN resources (fallback)                          │   ││
│  │ └─────────────────────────────────────────────────────┘   ││
│  │                                                             ││
│  │ EVENTOS:                                                    ││
│  │ • install    → cachear recursos essenciais               ││
│  │ • activate   → deletar caches antigos                    ││
│  │ • fetch      → servir do cache + atualizar background   ││
│  │                                                             ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    ARMAZENAMENTO NO NAVEGADOR                    │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ localStorage                                                ││
│  │ • userPreferences (filtros salvos)                         ││
│  │ • recentSearches (últimas buscas)                          ││
│  │ • mapSettings (configurações do mapa)                      ││
│  │                                                             ││
│  │ sessionStorage                                              ││
│  │ • currentLocation (localização atual)                      ││
│  │ • activeFilters (filtros ativos)                           ││
│  │ • chatHistory (histórico do chat)                          ││
│  │                                                             ││
│  │ Cookies                                                     ││
│  │ • sessionId (se houver backend)                            ││
│  │ • analyticsId (rastreamento)                               ││
│  │                                                             ││
│  │ IndexedDB (futuro)                                          ││
│  │ • offlineData (dados para uso offline)                     ││
│  │ • userProfile (perfil do usuário)                          ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Fluxo de Dados - Página de Mapa

```
USER ABRE mapa.html
        ↓
HTML carrega <custom-navbar>, <custom-footer>, <install-prompt>
        ↓
JAVASCRIPT inicia:
  • mapa.html carrega js/mapa.js
  • Instancia map = L.map('map')
        ↓
DADOS GLOBAIS:
  ubsUnidades = [ {47 unidades com lat/lng/serviços} ]
  upaUnidades = [ {3 unidades 24h} ]
  cityBounds = { north, south, east, west }
        ↓
EXECUTA generateVoronoiCells():
  • Para cada ponto de grid
  • Encontra unidade mais próxima
  • Cria célula Voronoi
  • Adiciona ao mapa com cor
        ↓
EXECUTA addMarkers():
  • Para cada ubsUnidade → L.marker()
  • Para cada upaUnidade → L.marker()
  • Cada marcador tem popup customizado
  • Eventos: click, hover
        ↓
USUÁRIO INTERAGE:
  • Clica em checkbox "Vacina"
        ↓
JAVASCRIPT EXECUTA filterByService('vacina'):
  • Filtra ubsUnidades.filter(u => u.vacina === true)
  • Oculta/mostra marcadores
  • Atualiza UI
        ↓
USUÁRIO PERMITE GEOLOCALIZAÇÃO:
        ↓
JAVASCRIPT EXECUTA setupGeolocation():
  • navigator.geolocation.getCurrentPosition()
  • Plota usuário com círculo azul
  • Para cada unidade calcula distância
  • Ordena por proximidade
        ↓
USUÁRIO CLICA EM MARCADOR:
        ↓
POPUP ABRE com:
  • Nome da unidade
  • Endereço
  • Telefone
  • Serviços
  • Botão: "Ver no Google Maps"
        ↓
USUÁRIO CLICA "Ver no Google Maps":
        ↓
ABRE URL:
https://maps.google.com/maps?q=endereco+completo
        ↓
FIM
```

---

## 🔄 Fluxo de Dados - PWA Installation

```
USER VISITA APP
        ↓
service-worker.js REGISTRA:
  navigator.serviceWorker.register('service-worker.js')
        ↓
SW INSTALA (install event):
  • caches.open('saudepg-v1')
  • cache.addAll([recursos...])
  • self.skipWaiting()
        ↓
SW ATIVA (activate event):
  • caches.keys() → deleta caches antigos
  • self.clients.claim()
        ↓
MANIFEST.JSON DISPONÍVEL:
  • name: "SaúdePG - Portal de Saúde Municipal"
  • theme_color: "#0F6BFF"
  • icons: [192x192, 512x512, maskable]
        ↓
USUÁRIO VÊ PROMPT DE INSTALAÇÃO:
  (Chrome/Edge: botão no header)
  (Android: menu → "Instalar app")
  (iOS: Share → "Add to Home Screen")
        ↓
USUÁRIO CLICA INSTALAR:
        ↓
beforeinstallprompt EVENT DISPARA:
  • install-prompt.js CAPTURA
  • deferredPrompt.prompt()
        ↓
APP INSTALADO:
  • Ícone na home/tela inicial
  • Funciona offline
  • Sem barra de endereço
  • Display: standalone
        ↓
USUÁRIO ABRE APP:
        ↓
SERVICE WORKER SERVE DO CACHE:
  • Carregamento instantâneo
  • Funciona sem internet
  • Atualiza em background
        ↓
APP DETECTA MUDANÇA:
        ↓
SW BACKGROUND UPDATE:
  • fetch() nova versão
  • Se mudou → cache.put()
  • Próxima abertura usa nova versão
        ↓
FIM
```

---

## 🔄 Fluxo de Dados - Busca de Unidades Próximas

```
COMPONENT: <unidades-proximas>
        ↓
connectedCallback():
  • setAttribute('data-max-items', '5')
  • requestGeolocation()
        ↓
requestGeolocation():
  • navigator.geolocation.getCurrentPosition()
        ↓
SE PERMITIU:
  • lat/lng do usuário
        ↓
PARA CADA UNIDADE:
  • calculateDistance(userLat, userLng, unitLat, unitLng)
  • Haversine formula
  • Salva distance property
        ↓
ORDENA POR DISTÂNCIA:
  unidades.sort((a, b) => a.distance - b.distance)
        ↓
PEGA PRIMEIRAS 5:
  unidades.slice(0, 5)
        ↓
RENDERIZA:
  <div class="unit-item">
    <h3>Nome Unidade</h3>
    <p>Distância: 2.3 km</p>
    <p>Endereço: ...</p>
    <button>Ver no Mapa</button>
  </div>
        ↓
USUÁRIO CLICA "Ver no Mapa":
        ↓
DISPARA EVENTO:
  this.dispatchEvent(new CustomEvent('unit-selected', {
    detail: { unit: {...} },
    bubbles: true
  }))
        ↓
HTML LISTENER:
  unidades.addEventListener('unit-selected', (e) => {
    window.location.href = 'mapa.html'
    // Salva unidade selecionada em sessionStorage
  })
        ↓
REDIRECIONA PARA MAPA:
        ↓
mapa.html CARREGA:
  • Lê sessionStorage
  • Centraliza no mapa na unidade selecionada
  • Abre popup
        ↓
FIM
```

---

## 🧩 Fluxo de Componentes

```
COMPONENTE: CustomNavbar
├─ connectedCallback()
│  ├─ attachShadow({ mode: 'open' })
│  └─ render()
│
├─ render()
│  ├─ shadowRoot.innerHTML = `<nav>...</nav>`
│  ├─ setupEventListeners()
│  └─ feather.replace() → transforma <i data-feather>
│
└─ Elementos:
   ├─ Logo com link home
   ├─ Nav Links (Mapa, Atendimento, Direitos, etc)
   ├─ Menu Mobile (hamburger)
   └─ Tema escuro/claro (futuro)

        ↓

COMPONENTE: CustomFooter
├─ connectedCallback()
│  ├─ attachShadow()
│  └─ render()
│
├─ render()
│  ├─ Seção 1: Serviços de Saúde
│  ├─ Seção 2: Informações (Links)
│  ├─ Seção 3: Contato (Email, Tel)
│  ├─ Seção 4: Redes Sociais
│  └─ Copyright automático
│
└─ Estilos em Shadow DOM (encapsulado)

        ↓

COMPONENTE: InstallPrompt
├─ connectedCallback()
│  └─ window.addEventListener('beforeinstallprompt')
│
├─ showPrompt()
│  ├─ Exibe modal customizado
│  └─ Botão "Instalar"
│
└─ install()
   └─ deferredPrompt.prompt()

        ↓

COMPONENTE: QuickAccess
├─ Cards pré-configurados:
│  ├─ Card 1: Mapa (ícone: map-pin)
│  ├─ Card 2: Atendimento (ícone: info)
│  ├─ Card 3: Direitos (ícone: shield)
│  └─ Card 4: Indicadores (ícone: trending-up)
│
└─ Eventos:
   ├─ hover → transform scale
   └─ click → navigate

        ↓

COMPONENTE: UnidadesProximas
├─ Geolocation
│  ├─ getCurrentPosition()
│  └─ calculateDistance() para cada unidade
│
├─ Ordenação
│  ├─ sort by distance
│  └─ slice(0, maxItems)
│
├─ Renderização
│  ├─ Lista ordenada
│  └─ Cards com info unidade
│
└─ Eventos:
   ├─ 'unit-selected'
   └─ 'show-on-map'

        ↓

COMPONENTE: ChatbotTriagem
├─ Estado
│  ├─ messages: []
│  ├─ currentStep: 0
│  └─ symptoms: []
│
├─ Métodos
│  ├─ sendMessage(text)
│  ├─ getResponse(message)
│  └─ recommendUnit(symptoms)
│
└─ Integração
   ├─ Knowledge base de sintomas
   └─ Mapeia para unidades apropriadas
```

---

## 📊 Estrutura de Dados Global

```javascript
// WINDOW GLOBALS (definidas em base-config.js)
window.APP_BASE_PATH = './'  // ou '/AppSaude/' em GitHub Pages
window.APP_NAME = 'SaúdePG'
window.APP_VERSION = '1.0.0'

// DADOS EM js/mapa.js
window.ubsUnidades = [
    { id, nome, bairro, endereco, vacina, ecg, dentista, periodo, ramal, lat, lng, color },
    ...
]  // 47 unidades

window.upaUnidades = [
    { id, nome, tipo, endereco, bairro, lat, lng, periodo },
    ...
]  // 3 unidades

window.cityBounds = {
    north: -25.0300,
    south: -25.1850,
    east: -50.0700,
    west: -50.2800
}

// CACHE LOCAL
localStorage = {
    userPreferences: JSON.stringify({
        filterServices: ['vacina', 'ecg'],
        mapZoom: 13,
        theme: 'light'
    }),
    recentSearches: JSON.stringify([
        'UBS mais próxima',
        'Dentista'
    ])
}

sessionStorage = {
    currentLocation: JSON.stringify({
        lat: -25.0909,
        lng: -50.1617,
        accuracy: 50
    }),
    selectedUnit: JSON.stringify({
        id: 1,
        nome: 'Unidade X'
    }),
    mapSettings: JSON.stringify({
        activeFilters: ['vacina'],
        zoom: 15
    })
}
```

---

## 🔐 Fluxo de Segurança e Validação

```
USER INPUT
    ↓
HTML5 VALIDATION:
    • type="email" → valida email
    • type="tel" → valida telefone
    • type="number" → valida número
    • required attribute → obrigatório
    ↓
JAVASCRIPT VALIDATION:
    • trim() strings
    • null/undefined checks
    • Array bounds checking
    • Type validation
    ↓
SANITIZAÇÃO:
    • Não há innerHTML perigoso
    • Usar textContent para dados
    • HTML escapado em componentes
    ↓
GEOLOCATION:
    • Requer permissão do usuário
    • Usa HTTPS em produção
    • Timeout de 5 segundos
    ↓
STORAGE:
    • localStorage não sensível
    • Sem dados de usuário real
    • SessionStorage temporário
    ↓
CACHE:
    • Apenas recursos públicos
    • Sem dados de APIs privadas
    ↓
URLS:
    • Links relativos (./mapa.html)
    • Previne path traversal
    • Validação de href
    ↓
FIM - SAFE
```

---

## 📈 Métricas e Performance

```
INICIAL LOAD:
├─ HTML: ~15 KB
├─ CSS: ~20 KB (inlined + Tailwind CDN)
├─ JS: ~50 KB (components + mapa.js)
├─ Total: ~85 KB
└─ Tempo: ~2-3s (4G)

CACHE STORE:
├─ Service Worker: ~100 KB
├─ Assets: ~200 KB
├─ localStorage: ~5 KB
└─ Total: ~305 KB

MEMÓRIA:
├─ ubsUnidades array: ~15 KB
├─ Map instance: ~50 KB
├─ Leaflet layers: ~100 KB
└─ Total: ~165 KB

LIGHTHOUSE TARGETS:
├─ Performance: 90+
├─ Accessibility: 95+
├─ Best Practices: 90+
├─ SEO: 100
└─ PWA: 100

MOBILE METRICS:
├─ First Contentful Paint (FCP): < 2s
├─ Largest Contentful Paint (LCP): < 2.5s
├─ Cumulative Layout Shift (CLS): < 0.1
├─ First Input Delay (FID): < 100ms
└─ Time to Interactive (TTI): < 3.5s
```

---

**Última atualização**: Janeiro 2026
**Versão**: 1.0.0
