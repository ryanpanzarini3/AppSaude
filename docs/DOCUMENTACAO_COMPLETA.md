# SaúdePG - Documentação Completa

## 📋 Índice
1. [Visão Geral](#visão-geral)
2. [Arquitetura do Projeto](#arquitetura-do-projeto)
3. [Estrutura de Diretórios](#estrutura-de-diretórios)
4. [Páginas da Aplicação](#páginas-da-aplicação)
5. [Componentes](#componentes)
6. [Scripts e Funcionalidades](#scripts-e-funcionalidades)
7. [Estilos e Design](#estilos-e-design)
8. [PWA - Progressive Web App](#pwa---progressive-web-app)
9. [Integração com Mapas](#integração-com-mapas)
10. [Configurações](#configurações)
11. [Melhorias e Otimizações](#melhorias-e-otimizações)
12. [Como Usar](#como-usar)

---

## 🎯 Visão Geral

**SaúdePG** é uma Progressive Web Application (PWA) desenvolvida para facilitar o acesso dos cidadãos de Ponta Grossa aos serviços de saúde municipal. A aplicação fornece informações sobre unidades de saúde, horários de atendimento, indicadores de saúde e direitos dos cidadãos.

### Características Principais:
- 📍 **Mapa Interativo**: Localizar unidades de saúde (UBS e UPA) mais próximas
- 📱 **Responsive Design**: Otimizado para desktop, tablet e mobile
- 🔄 **Offline First**: Funciona sem conexão com cache inteligente
- ⚡ **Performance**: PWA com Service Worker para carregamento rápido
- 🎨 **Design Moderno**: Interface com Tailwind CSS e animações suaves
- 💬 **Triagem Online**: Chatbot para orientações de saúde
- 📊 **Indicadores de Saúde**: Dados sobre serviços disponíveis

---

## 🏗️ Arquitetura do Projeto

### Stack Tecnológico:

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| **HTML5** | - | Estrutura semântica |
| **CSS3** | - | Estilos base e custom |
| **JavaScript (Vanilla)** | ES6+ | Lógica da aplicação |
| **Tailwind CSS** | 3.x | Utilitários de estilo |
| **Leaflet.js** | 1.9.4 | Mapas interativos |
| **Turf.js** | 6.x | Análise geoespacial |
| **Feather Icons** | - | Ícones SVG |
| **Web Components** | - | Componentes reutilizáveis |

### Padrões Utilizados:
- **Web Components**: CustomElements para navbar, footer, componentes reutilizáveis
- **Shadow DOM**: Encapsulamento de estilos
- **Service Worker**: Cache e offline-first
- **Responsive Design**: Mobile-first approach
- **Lazy Loading**: Carregamento progressivo de recursos

---

## 📁 Estrutura de Diretórios

```
AppSaude-main/
├── index.html                    # Página inicial (Home)
├── mapa.html                     # Página de mapa com unidades
├── atendimento.html              # Informações de atendimento
├── direitos.html                 # Página de direitos dos cidadãos
├── indicadores.html              # Indicadores de saúde
├── chat.html                     # Interface do chatbot
├── debug.html                    # Página de debug/testes
├── processar-links.html          # Processamento de links
├── manifest.json                 # Configuração PWA
├── service-worker.js             # Service Worker para cache/offline
├── style.css                     # Estilos globais
├── script.js                     # Script principal da aplicação
├── base-config.js                # Configurações base
├── 
├── components/                   # Web Components
│   ├── navbar.js                 # Barra de navegação customizada
│   ├── footer.js                 # Rodapé customizado
│   ├── chatbot-triagem.js        # Componente de chatbot
│   ├── install-prompt.js         # Prompt de instalação PWA
│   ├── quick-access.js           # Acesso rápido
│   └── unidades-proximas.js      # Componente de unidades próximas
│
├── js/                           # Scripts principais
│   ├── animations.js             # Animações da página
│   ├── mapa.js                   # Lógica do mapa e unidades
│   └── geocode.js                # Geocodificação
│
├── links-maps/                   # Dados de links para mapas
│   └── links.txt                 # URLs dos mapas
│
├── coordenadas-extraidas.json    # Dados das coordenadas
│
├── Arquivos de Documentação:
│   ├── README.md                 # Documentação básica
│   ├── GEOCODIFICACAO.md         # Guia de geocodificação
│   ├── GEOLOCATION_FIX.md        # Correção de geolocalização
│   ├── GEOLOCATION_GUIDE.md      # Guia de geolocalização
│   ├── GITHUB_PAGES_FIX.md       # Correção para GitHub Pages
│   ├── MOBILE_OPTIMIZATION.md    # Otimização mobile
│   ├── PWA_SETUP.md              # Setup de PWA
│   └── DOCUMENTACAO_COMPLETA.md  # Este arquivo
│
├── Arquivos de Processamento (Python/PowerShell):
│   ├── atualizar-mapa.py         # Atualiza dados do mapa
│   ├── atualizar-coords.js       # Atualiza coordenadas
│   ├── buscar-coords.js          # Busca coordenadas
│   ├── extrair-coordenadas.py    # Extrai coordenadas
│   ├── extrair-coordenadas.ps1   # Script PowerShell
│   └── processar-links.js        # Processa links
│
└── ProjetoSaúde/                 # Diretório de backup/mirror

```

---

## 📄 Páginas da Aplicação

### 1. **index.html** - Página Inicial
**Propósito**: Landing page com apresentação geral da aplicação

**Conteúdo**:
- Hero section com chamada para ação
- Busca de unidades próximas
- Quick access cards (Mapa, Atendimento, Direitos)
- Seção de informações destacadas
- Institucional

**Componentes Utilizados**:
- `<custom-navbar>` - Navegação
- `<custom-footer>` - Rodapé
- `<install-prompt>` - Prompt de instalação PWA
- `<quick-access>` - Links rápidos
- `<unidades-proximas>` - Unidades próximas

**Scripts**:
- `script.js` - Inicialização e Service Worker registration

---

### 2. **mapa.html** - Mapa Interativo de Unidades
**Propósito**: Visualizar unidades de saúde em mapa interativo

**Características**:
- Mapa Leaflet com múltiplas camadas
- Marcadores para UBS (Unidades Básicas de Saúde)
- Marcadores para UPA (Unidades de Pronto Atendimento)
- Filtro por serviços (Vacina, ECG, Dentista)
- Busca por localização/endereço
- Geolocalização do usuário
- Cálculo de rotas

**Dados Inclusos**:
- 47 UBS diferentes
- 3 UPA
- Coordenadas latitude/longitude
- Serviços oferecidos
- Horários de funcionamento
- Telefones de contato

**Scripts Utilizados**:
- `js/mapa.js` - Lógica principal do mapa
- `@turf/turf` - Análise geoespacial (Voronoi)
- `leaflet.js` - Biblioteca de mapas

---

### 3. **atendimento.html** - Informações de Atendimento
**Propósito**: Informar como funciona o atendimento nas UBS

**Conteúdo**:
- Passo a passo do atendimento (4 etapas)
- Tipos de atendimento disponíveis
- Documentação necessária
- Informações sobre horários
- FAQ (Perguntas Frequentes)

**Seções**:
1. UBS - Unidades Básicas de Saúde
2. UPA - Unidades de Pronto Atendimento
3. Agendamento Online
4. Serviços Especializados

---

### 4. **direitos.html** - Direitos do Cidadão
**Propósito**: Informar sobre direitos na saúde

**Conteúdo**:
- Direitos fundamentais do SUS
- Deveres do cidadão
- Como denunciar
- Canais de atendimento
- Informações sobre medicamentos gratuitos

---

### 5. **indicadores.html** - Indicadores de Saúde
**Propósito**: Apresentar estatísticas de saúde

**Conteúdo**:
- Dados sobre serviços disponíveis
- Estatísticas de cobertura
- Indicadores de satisfação
- Gráficos e visualizações

---

### 6. **chat.html** - Chatbot de Triagem
**Propósito**: Atendimento inteligente via chatbot

**Funcionalidades**:
- Triagem de sintomas
- Orientações de saúde
- Direcionamento para unidades apropriadas
- Interface conversacional

**Componente**:
- `<chatbot-triagem>` - Web Component do chatbot

---

### 7. **debug.html** - Página de Debug
**Propósito**: Testes e debugging da aplicação

**Funcionalidades**:
- Testes de Service Worker
- Simulação de geolocalização
- Teste de performance
- Console debug

---

## 🧩 Componentes

### 1. **navbar.js** - Barra de Navegação
```javascript
class CustomNavbar extends HTMLElement
```

**Características**:
- Sticky header com gradient
- Logo com animação pulse
- Menu responsivo com hamburger
- Links para todas as páginas
- Icons do Feather

**Propriedades CSS Customizadas**:
- Gradiente azul-ciano: `#0F6BFF` → `#00D4FF`
- Shadow drop
- Animações suaves

**Métodos**:
- `render()` - Renderiza o HTML do shadow DOM
- `handleMenuToggle()` - Abre/fecha menu mobile

---

### 2. **footer.js** - Rodapé
```javascript
class CustomFooter extends HTMLElement
```

**Estrutura**:
- 4 seções de links
- Informações de contato
- Links sociais
- Copyright

**Seções**:
1. Serviços de Saúde
2. Informações
3. Contato
4. Redes Sociais

---

### 3. **install-prompt.js** - Prompt de Instalação PWA
```javascript
class InstallPrompt extends HTMLElement
```

**Funcionalidades**:
- Detecta quando app pode ser instalado
- Exibe prompt customizado
- Gerencia instalação

---

### 4. **chatbot-triagem.js** - Chatbot de Triagem
```javascript
class ChatbotTriagem extends HTMLElement
```

**Funcionalidades**:
- Diálogo conversacional
- Triagem de sintomas
- Base de conhecimento de saúde
- Orientações de atendimento

---

### 5. **quick-access.js** - Acesso Rápido
```javascript
class QuickAccess extends HTMLElement
```

**Conteúdo**:
- Cards com links principais
- Ícones destacados
- Animações ao hover

---

### 6. **unidades-proximas.js** - Unidades Próximas
```javascript
class UnidadesProximas extends HTMLElement
```

**Funcionalidades**:
- Detecta localização do usuário
- Calcula distância para unidades
- Ordena por proximidade
- Exibe lista ordenada

---

## 🔧 Scripts e Funcionalidades

### **script.js** - Script Principal
```javascript
// Inicialização geral da aplicação
```

**Responsabilidades**:
- Registra Service Worker
- Inicializa Feather Icons
- Configuração de listeners globais
- Verificação de compatibilidade

**Service Worker Registration**:
```javascript
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
}
```

---

### **js/mapa.js** - Lógica do Mapa

**Dados Globais**:
```javascript
// Array de 47 UBS com: id, nome, bairro, endereço, 
// serviços (vacina, ecg, dentista), lat/lng, cor

const ubsUnidades = [...]
const upaUnidades = [...]
const cityBounds = {...}
```

**Funções Principais**:

1. **`generateVoronoiCells()`**
   - Gera diagrama de Voronoi
   - Calcula áreas de cobertura
   - Usa Turf.js para análise geoespacial

2. **`initMap()`**
   - Inicializa mapa Leaflet
   - Configura zoom e centro
   - Adiciona camadas

3. **`addMarkers()`**
   - Adiciona marcadores das unidades
   - Agrupa por tipo
   - Cria popups informativos

4. **`filterByService(service)`**
   - Filtra unidades por serviço
   - Atualiza visualização do mapa
   - Mostra/oculta marcadores

5. **`calculateDistance(lat1, lng1, lat2, lng2)`**
   - Calcula distância usando Haversine
   - Retorna distância em km

6. **`setupGeolocation()`**
   - Solicita permissão de localização
   - Plota usuário no mapa
   - Calcula proximidade

---

### **js/animations.js** - Animações

**Efeitos Inclusos**:
- Fade in ao scroll
- Slide animations
- Hover effects
- Pulse animations
- Bounce effects

---

### **base-config.js** - Configurações Base

**Propósito**: Configurar paths e variáveis globais

```javascript
window.APP_BASE_PATH = './'
window.APP_NAME = 'SaúdePG'
```

---

### **geocode.js** - Geocodificação

**Funcionalidades**:
- Converte endereço em coordenadas
- Integração com API de geocoding
- Cache de resultados

---

## 🎨 Estilos e Design

### **style.css** - Estilos Globais

**Variáveis CSS**:
```css
:root {
    --primary-blue: #0F6BFF;
    --primary-cyan: #00D4FF;
    --primary-dark: #1a1f3a;
    --success: #10b981;
    --warning: #f59e0b;
    --danger: #ef4444;
    --text-primary: #1f2937;
    --text-secondary: #64748b;
    --bg-light: #f8fafc;
    --border-light: #e5e7eb;
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

**Tipografia**:
- Fonte corpo: Inter (300-800)
- Fonte títulos: Poppins (600-800)
- Importadas do Google Fonts

**Classes Principais**:
- `.btn-primary` - Botão primário com gradient
- `.btn-secondary` - Botão secundário
- `.card` - Card com shadow e hover
- `.container` - Container responsivo (max 1400px)
- `.hero-section` - Section hero
- `.gradient-text` - Texto com gradient

**Breakpoints (Tailwind)**:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

---

## 🚀 PWA - Progressive Web App

### **manifest.json** - Configuração PWA

```json
{
  "name": "SaúdePG - Portal de Saúde Municipal",
  "short_name": "SaúdePG",
  "description": "Acesso completo aos serviços de saúde...",
  "start_url": "./index.html",
  "scope": "./",
  "display": "standalone",
  "theme_color": "#0F6BFF",
  "background_color": "#ffffff"
}
```

**Características PWA**:
- ✅ Display standalone (sem chrome do navegador)
- ✅ Theme color customizado
- ✅ Icons em múltiplos tamanhos (192x192, 512x512)
- ✅ Icons maskable para notches
- ✅ Screenshots para app store
- ✅ Shortcuts para ações rápidas
- ✅ Categorias: health, medical

**Icons Inclusos**:
- Ícone padrão (192x192)
- Ícone grande (512x512)
- Ícone maskable para notches

**Shortcuts PWA**:
```json
"shortcuts": [
  {
    "name": "Encontrar Unidades",
    "short_name": "Unidades",
    "url": "/mapa.html"
  }
]
```

---

### **service-worker.js** - Service Worker

**Estratégia Cache**: Stale-While-Revalidate

```javascript
const CACHE_NAME = 'saudepg-v1'
```

**Ciclo de Vida**:

1. **Install Event**
   - Abre cache 'saudepg-v1'
   - Cachea todos os recursos essenciais
   - Skip waiting para ativar imediato

2. **Activate Event**
   - Deleta caches antigos
   - Limpa versões antigas
   - Claims clients

3. **Fetch Event**
   - Recursos locais: serve cache, atualiza em background
   - Recursos externos: tenta fetch, fallback para cache
   - Offline: retorna resposta customizada

**Recursos em Cache**:
- HTML pages (index, mapa, atendimento, etc.)
- CSS (style.css)
- JavaScript (components, scripts)
- Manifest.json
- Assets

---

## 🗺️ Integração com Mapas

### **Leaflet.js v1.9.4**

**Implementação**:
```javascript
// Inicialização
const map = L.map('map').setView([-25.09, -50.16], 13)

// Base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

// Marcadores
L.marker([lat, lng], {icon: customIcon})
    .addTo(map)
    .bindPopup(content)
```

**Camadas Disponíveis**:
- OpenStreetMap (base)
- UBS (marcadores com cores específicas)
- UPA (marcadores especiais)
- Voronoi cells (áreas de cobertura)
- Geolocalização do usuário

**Popups Customizados**:
- Estilo personalizado com gradient
- Informações: nome, endereço, serviços
- Links para Google Maps
- Botão de chamar

---

### **Turf.js v6**

**Análise Geoespacial**:
- Cálculo de distância (Haversine)
- Diagrama de Voronoi
- Análise de proximidade
- Interpolação de dados

---

## ⚙️ Configurações

### **base-config.js**

```javascript
window.APP_BASE_PATH = (function() {
    // Detecta se está em GitHub Pages ou local
    const pathname = window.location.pathname
    if (pathname.includes('/AppSaude')) {
        return '/AppSaude/'
    }
    return './'
})()

window.APP_NAME = 'SaúdePG'
window.APP_VERSION = '1.0.0'
```

**Propósito**:
- Configurar caminho base dinamicamente
- Suportar GitHub Pages e local
- Variáveis globais compartilhadas

---

### **Variáveis de Ambiente**:

Nenhuma variável de ambiente é necessária no momento. A app é totalmente client-side.

---

## 🎯 Melhorias e Otimizações

### **Implementadas**:

1. ✅ **Offline First**
   - Service Worker com cache estratégico
   - Stale-while-revalidate
   - Funciona sem internet

2. ✅ **Mobile Optimization**
   - Responsive design 100%
   - Touch-friendly interfaces
   - Viewport meta tags
   - Otimizado para 4G/5G

3. ✅ **Performance**
   - Lazy loading de mapas
   - Minificação de assets
   - CDN para bibliotecas (Leaflet, Tailwind)
   - Cache de Service Worker

4. ✅ **Accessibility**
   - Semântica HTML5
   - ARIA labels
   - Contraste adequado
   - Navegação por teclado

5. ✅ **SEO**
   - Meta tags descritivas
   - Titles únicos
   - Structured data
   - Open Graph tags

### **Sugestões Futuras**:

1. 📌 Backend API para dados dinâmicos
2. 📌 Sistema de agendamento integrado
3. 📌 Notificações push
4. 📌 Autenticação de usuários
5. 📌 Histórico de consultas
6. 📌 Integração com WhatsApp
7. 📌 Testes A/B
8. 📌 Analytics avançado

---

## 📖 Como Usar

### **Instalação Local**

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/AppSaude-main.git
cd AppSaude-main
```

2. Abra em um servidor local (importante para Service Worker):
```bash
# Python 3
python -m http.server 8000

# Ou Node.js
npx http-server
```

3. Acesse em `http://localhost:8000`

### **Instalação como PWA**

**Desktop (Chrome/Edge)**:
1. Abra a aplicação no navegador
2. Clique no ícone de instalação (canto superior direito)
3. Clique "Instalar"

**Mobile (Android)**:
1. Abra no Chrome
2. Menu → "Instalar app"
3. Confirme a instalação

**iOS**:
1. Safari → Compartilhar
2. "Adicionar à Tela de Início"

### **Deploy no GitHub Pages**

1. Faça push para branch `gh-pages`:
```bash
git checkout -b gh-pages
git push origin gh-pages
```

2. Configure nas configurações do repositório
3. Acesse `https://usuario.github.io/AppSaude-main`

### **Funcionalidades Principais**

#### Encontrar Unidades
1. Clique em "Mapa"
2. Permita acesso à localização
3. Veja unidades próximas no mapa

#### Filtrar por Serviços
1. Use os filtros no mapa:
   - Vacina
   - ECG
   - Dentista

#### Obter Informações de Atendimento
1. Clique em "Atendimento"
2. Leia passo a passo
3. Conheça documentação necessária

#### Acessar Direitos
1. Clique em "Direitos"
2. Conheça seus direitos no SUS
3. Canais de denúncia

---

## 🐛 Troubleshooting

### **Mapa não carrega**
- Verifique conexão com internet
- Limpe cache do navegador
- Tente incognito

### **Geolocalização não funciona**
- Permita acesso à localização
- Use HTTPS (requisito)
- Verifique GPS do device

### **Service Worker não registra**
- Abra em HTTPS ou localhost
- Verifique console para erros
- Desabilite extensões

### **PWA não instala**
- Use Chrome, Edge ou Firefox
- Tenha pelo menos 2 visitas
- HTTPS é requisito (em produção)

---

## 📞 Contato e Suporte

**Email de Contato**: (adicionar quando disponível)
**GitHub Issues**: (adicionar quando disponível)
**WhatsApp**: (adicionar quando disponível)

---

## 📄 Licença

Este projeto é desenvolvido para a Prefeitura de Ponta Grossa.

---

## 👥 Contribuidores

- Frontend Developer: [Seu Nome]
- Designs: [Designer]
- Product: [Product Manager]

---

## 🔄 Histórico de Versões

### v1.0.0 (Atual)
- ✅ Implementação inicial
- ✅ PWA completo
- ✅ Mapa funcional
- ✅ 47 UBS + 3 UPA

---

**Última atualização**: Janeiro 2026
**Versão**: 1.0.0
**Status**: Ativo e em desenvolvimento
