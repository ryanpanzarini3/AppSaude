# SaúdePG - Guia de Desenvolvimento

## 📚 Índice
1. [Setup de Desenvolvimento](#setup-de-desenvolvimento)
2. [Estrutura de Commits](#estrutura-de-commits)
3. [Padrões de Código](#padrões-de-código)
4. [Fluxo de Trabalho](#fluxo-de-trabalho)
5. [Testes](#testes)
6. [Deploy](#deploy)
7. [Troubleshooting](#troubleshooting)

---

## 🛠️ Setup de Desenvolvimento

### Pré-requisitos
- Node.js 14+ (opcional, para ferramentas)
- Git
- Navegador moderno (Chrome 90+, Firefox 88+, Safari 14+)
- Editor: VS Code (recomendado)

### Instalação Inicial

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/AppSaude-main.git
cd AppSaude-main

# (Opcional) Instale dependências de desenvolvimento
npm init -y
npm install --save-dev tailwindcss postcss autoprefixer

# Inicie servidor local
python -m http.server 8000
# ou
npx http-server
```

### Estrutura de Pastas Recomendada

```
AppSaude-main/
├── dev/                    # (novo) Arquivos de desenvolvimento
│   ├── .env.local         # Variáveis locais
│   └── notes.md           # Notas de desenvolvimento
├── src/                    # (futuro refactoring)
│   ├── pages/
│   ├── components/
│   ├── styles/
│   └── js/
└── ...
```

---

## 📝 Estrutura de Commits

### Formato Conventional Commits

```
<tipo>(<escopo>): <descrição breve>

<descrição detalhada opcional>

<footer opcional>
```

### Tipos de Commit

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| `feat` | Nova funcionalidade | `feat(mapa): adicionar filtro por serviço` |
| `fix` | Correção de bug | `fix(navbar): corrigir menu mobile` |
| `docs` | Documentação | `docs(readme): atualizar instruções` |
| `style` | Formatação, sem lógica | `style(css): ajustar espaçamento` |
| `refactor` | Refatoração de código | `refactor(mapa): simplificar inicialização` |
| `perf` | Otimização de performance | `perf(cache): melhorar SW` |
| `test` | Testes | `test(mapa): adicionar testes geoloc` |
| `chore` | Manutenção | `chore: atualizar dependências` |

### Exemplos de Commits

```bash
# Feature
git commit -m "feat(components): criar componente de filtro

- Adicionar filtro por serviço
- Atualizar visualização do mapa
- Salvar preferência do usuário"

# Fix
git commit -m "fix(mapa): corrigir zoom ao clicar em marker"

# Docs
git commit -m "docs(api): adicionar guia de geocodificação"
```

---

## 💻 Padrões de Código

### JavaScript

#### Nomenclatura
```javascript
// ✅ Bom
const getUserLocation = () => { }
const MAX_UNITS = 50
const unit = new Unit()

// ❌ Evitar
const getuserlocation = () => { }
const max_units = 50
const Unit = new Unit()
```

#### Estrutura de Classes
```javascript
class Unit {
    constructor(id, name, location) {
        this.id = id
        this.name = name
        this.location = location
    }

    // Getters
    get distance() {
        return this._distance
    }

    // Métodos privados (convenção)
    _calculateDistance() {
        // implementação
    }

    // Métodos públicos
    showOnMap() {
        // implementação
    }
}
```

#### Funções Assíncronas
```javascript
// ✅ Bom
async function fetchUnits() {
    try {
        const response = await fetch('/api/units')
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Erro ao buscar unidades:', error)
        throw error
    }
}

// ❌ Evitar
function fetchUnits() {
    return fetch('/api/units').then(r => r.json())
}
```

#### Comentários
```javascript
// ✅ Bom - Explica POR QUÊ
// Multiplicamos por 1.609 pois Google Maps usa milhas
const distanceInKm = distanceInMiles * 1.609

// ❌ Ruim - Óbvio
// Multiplica distância
const d = dm * 1.609

// ✅ Bom - JSDoc
/**
 * Calcula a distância entre dois pontos
 * @param {number} lat1 - Latitude do ponto 1
 * @param {number} lng1 - Longitude do ponto 1
 * @param {number} lat2 - Latitude do ponto 2
 * @param {number} lng2 - Longitude do ponto 2
 * @returns {number} Distância em quilômetros
 */
function calculateDistance(lat1, lng1, lat2, lng2) {
    // implementação
}
```

### HTML

```html
<!-- ✅ Bom - Semântico e acessível -->
<section class="units-map">
    <header>
        <h1>Mapa de Unidades</h1>
    </header>
    <main id="map" role="application" aria-label="Mapa interativo">
    </main>
</section>

<!-- ❌ Evitar - Não semântico -->
<div class="units-map">
    <div class="header">
        <div class="h1">Mapa de Unidades</div>
    </div>
    <div class="content" id="map"></div>
</div>
```

### CSS

```css
/* ✅ Bom - Organizado e reutilizável */
:root {
    --color-primary: #0F6BFF;
    --color-secondary: #00D4FF;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
}

.card {
    padding: var(--spacing-md);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card--primary {
    background-color: var(--color-primary);
    color: white;
}

/* ❌ Evitar */
.card {
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0 0 0 / 0.1);
}

.card_primary {
    background-color: #0F6BFF;
}
```

### Web Components

```javascript
// ✅ Bom
class CustomCard extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.render()
        this.setupEventListeners()
    }

    setupEventListeners() {
        this.shadowRoot
            .querySelector('button')
            ?.addEventListener('click', () => this.handleClick())
    }

    handleClick() {
        this.dispatchEvent(new CustomEvent('card-clicked', {
            detail: { id: this.id },
            bubbles: true,
            composed: true
        }))
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; }
            </style>
            <div class="card">
                <slot></slot>
            </div>
        `
    }
}

customElements.define('custom-card', CustomCard)
```

---

## 🔄 Fluxo de Trabalho

### Branch Strategy: Git Flow

```
main (produção)
  ↑
release/v1.0.0
  ↑
develop (staging)
  ↑
feature/novo-componente
feature/corrigir-bug
```

### Passos para Adicionar Feature

1. **Crie uma branch**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/descricao-curta
```

2. **Faça as alterações**
```bash
# Edite arquivos
# Teste localmente
```

3. **Commit com padrão**
```bash
git add .
git commit -m "feat(escopo): descrição"
git push origin feature/descricao-curta
```

4. **Abra Pull Request**
- Descreva as mudanças
- Reference issues relacionadas (#123)
- Solicite reviewers

5. **Merge**
```bash
# Após aprovação
git checkout develop
git pull origin develop
git merge feature/descricao-curta
git push origin develop
```

### Exemplo Completo

```bash
# Nova feature de filtro
git checkout -b feature/add-service-filter

# Edita arquivos...

git add src/js/filter.js src/css/filter.css
git commit -m "feat(mapa): implementar filtro por serviço

- Adiciona botões de filtro (Vacina, ECG, Dentista)
- Atualiza marcadores ao selecionar
- Mantém estado do filtro em sessionStorage
- Testa em múltiplos tamanhos de tela"

git push origin feature/add-service-filter

# Depois que aprovado:
git checkout develop && git pull
git merge feature/add-service-filter
git push origin develop
```

---

## 🧪 Testes

### Testes Manual (Checklist)

**Antes de fazer commit:**

```
Página inicial:
☐ Carrega sem erros no console
☐ Responsivo (mobile, tablet, desktop)
☐ Links funcionam
☐ Imagens carregam
☐ Performance aceitável

Mapa:
☐ Mapa carrega
☐ Marcadores aparecem
☐ Filtros funcionam
☐ Popup abre/fecha
☐ Geolocalização funciona
☐ Zoom/pan funciona

Componentes:
☐ Navbar responsiva
☐ Footer visível
☐ Menu mobile funciona
☐ Icons carregam

PWA:
☐ Service Worker registra
☐ Funciona offline
☐ Cache atualiza
☐ Instalável

Acessibilidade:
☐ Navegável por teclado
☐ Screen reader funciona
☐ Contraste adequado
```

### Teste de Performance

```bash
# Chrome DevTools
1. F12 → Lighthouse
2. Run audit
3. Verificar score

# Alvo mínimo: 90+
```

### Teste de Compatibilidade

| Navegador | Versão | Status |
|-----------|--------|--------|
| Chrome | 90+ | ✅ |
| Firefox | 88+ | ✅ |
| Safari | 14+ | ✅ |
| Edge | 90+ | ✅ |
| Chrome Mobile | 90+ | ✅ |
| Safari iOS | 14+ | ✅ |

---

## 🚀 Deploy

### Deploy Local para Testes

```bash
# Inicie servidor
python -m http.server 8000

# Abra em http://localhost:8000

# Teste em mobile (mesmo wi-fi):
# http://<seu-ip>:8000
```

### Deploy em GitHub Pages

```bash
# 1. Configure repositório
# Settings → Pages → Source: gh-pages branch

# 2. Prepare branch gh-pages
git checkout --orphan gh-pages
git rm -rf .
git commit --allow-empty -m "Initial commit"
git push origin gh-pages

# 3. Volte para main e use script:
git checkout main

# 4. Crie script deploy.sh:
#!/bin/bash
git checkout gh-pages
git rebase main
git push origin gh-pages
git checkout main

# 5. Execute
bash deploy.sh

# 6. Acesse
# https://seu-usuario.github.io/AppSaude-main
```

### Deploy em Produção (Servidor)

```bash
# Via SSH
scp -r . usuario@servidor:/var/www/saudepg

# Ou via Git
git clone https://github.com/seu-usuario/AppSaude-main.git /var/www/saudepg
cd /var/www/saudepg
git pull origin main
```

### Checklist de Deploy

```
Antes de publicar:
☐ Todos os testes passam
☐ Build sem warnings
☐ Lighthouse 90+
☐ Sem console errors
☐ Service Worker funciona
☐ Links internos funcionam
☐ Imagens otimizadas
☐ Performance aceitável
☐ Acessibilidade OK
☐ Mobile responsivo
```

---

## 🐛 Troubleshooting

### Service Worker não atualiza

```javascript
// Limpar cache manual
self.addEventListener('install', event => {
    caches.keys().then(names => {
        names.forEach(name => caches.delete(name))
    })
})

// Ou no console
caches.keys().then(names => {
    names.forEach(name => caches.delete(name))
})
```

### Mapa não carrega no Safari

```javascript
// iOS Safari requer HTTPS
if (!location.protocol.includes('https')) {
    console.warn('HTTPS requerido para geolocation')
}
```

### Build fica grande

```bash
# Identifique arquivos grandes
du -sh src/*

# Comprima imagens
# Use tree-shaking no JS
# Minimize CSS
```

### Perda de dados offline

```javascript
// Implementar IndexedDB
const db = new Dexie('SaudePG')
db.version(1).stores({
    units: '++id, name',
    cache: '++id'
})
```

---

## 📋 Checklist de Qualidade

Antes de fazer merge na `develop`:

- [ ] Código segue padrões
- [ ] Sem console.log de debug
- [ ] Comentários necessários
- [ ] Testes passam
- [ ] Performance OK
- [ ] Acessibilidade OK
- [ ] Mobile responsivo
- [ ] Sem erros no console
- [ ] Build sem warnings
- [ ] Documentação atualizada

---

## 🤝 Contribuindo

1. Faça fork
2. Crie feature branch
3. Commit suas mudanças
4. Push para branch
5. Abra Pull Request

---

**Última atualização**: Janeiro 2026
**Versão**: 1.0.0
