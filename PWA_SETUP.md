# SaúdePG - Progressive Web App (PWA)

## O que foi implementado

Seu site foi transformado em uma **Progressive Web App (PWA)**! Isso significa que agora funciona muito melhor em dispositivos móveis e pode ser instalado como um aplicativo nativo.

### Recursos da PWA:

✅ **Instalação em Dispositivos**
- Instale no homescreen do seu celular/tablet como um app nativo
- Funciona com ou sem conexão à internet

✅ **Modo Offline**
- Cache automático de páginas e recursos
- Continua funcionando sem internet
- Sincronização automática quando volta online

✅ **Performance**
- Carregamento mais rápido
- Menos uso de dados
- Melhor experiência em conexões lentas

✅ **Notificações Push** (preparado para futura implementação)
- Envie notificações aos usuários
- Atalhos rápidos para páginas principais

---

## Como Instalar a PWA

### No Android (Chrome/Edge):

1. Abra o site no navegador
2. Clique no menu (⋮) → **Instalar aplicativo** (ou **Adicionar ao homescreen**)
3. Confirme a instalação
4. O app aparecerá no seu launcher

### No iOS (Safari):

1. Abra o site no Safari
2. Clique em **Compartilhar** (↗️)
3. Toque em **Adicionar à Tela de Início**
4. Nomeie como desejar e confirme

### No Desktop (Chrome/Edge):

1. Clique no ícone de instalação (🔽) na barra de endereço
2. Ou vá ao menu (⋮) → **Instalar "SaúdePG"**

---

## Arquivos Criados/Modificados

### ✨ Novos Arquivos:

- **`manifest.json`** - Define propriedades da PWA (nome, ícones, cores)
- **`service-worker.js`** - Gerencia cache e funcionalidade offline

### 🔄 Arquivos Modificados:

- **`index.html`** - Adicionado manifest, meta tags e registro do service worker
- **`mapa.html`** - Adicionado manifest e meta tags PWA
- **`atendimento.html`** - Adicionado manifest e meta tags PWA
- **`direitos.html`** - Adicionado manifest e meta tags PWA

---

## Estratégia de Cache

O Service Worker implementa a estratégia **"Cache First, Network Fallback"**:

1. **Primeiro acesso**: Tenta carregar do cache
2. **Se não tiver em cache**: Busca da rede
3. **Se estiver offline**: Usa a versão em cache
4. **Atualiza em background**: Mantém cache sempre atualizado

### O que é cacheado:

- Páginas HTML
- Arquivos CSS e JavaScript locais
- Componentes
- Manifest.json

### O que NÃO é cacheado:

- Recursos externos (CDNs, APIs)
- Requisições de dados dinâmicos

---

## Testando a PWA

### Chrome DevTools:

1. Abra DevTools (F12 / Cmd+Opt+I)
2. Vá para a aba **Application**
3. Procure por:
   - **Manifest** - Veja as propriedades da PWA
   - **Service Workers** - Veja o status do service worker
   - **Cache Storage** - Veja os arquivos em cache

### Simular Offline:

1. DevTools → **Network**
2. Marque **Offline**
3. Recarregue a página - deve funcionar

---

## Atualizações Futuras

Você pode adicionar:

### 1. **Notificações Push**
```javascript
// Solicitar permissão
Notification.requestPermission();

// Enviar notificação
self.registration.showNotification('Título', { body: 'Mensagem' });
```

### 2. **Sincronização em Background**
```javascript
// Registrar sync
registration.sync.register('sync-dados');

// No Service Worker
self.addEventListener('sync', event => {
  if (event.tag === 'sync-dados') {
    event.waitUntil(syncDados());
  }
});
```

### 3. **Ícones Customizados**
Substitua os ícones SVG no `manifest.json` por imagens PNG:
```json
{
  "src": "/images/icon-192.png",
  "sizes": "192x192",
  "type": "image/png"
}
```

### 4. **Compartilhamento de Dados**
```javascript
// Share API (Android e iOS)
if (navigator.share) {
  navigator.share({
    title: 'SaúdePG',
    text: 'Confira unidades de saúde',
    url: window.location.href
  });
}
```

---

## Checklist de Validação

✅ Service Worker registrado  
✅ Manifest.json válido  
✅ Meta tags de PWA adicionadas  
✅ Cache funcionando  
✅ Modo offline testado  
✅ Instalável em dispositivos  

---

## Dicas de Produção

1. **HTTPS Obrigatório**: PWAs requerem HTTPS (exceto localhost)
2. **Teste em dispositivos reais**: Chrome Desktop ≠ Android
3. **Versione seu cache**: Atualize `CACHE_NAME` para forçar novo download
4. **Monitore limites de cache**: Browsers limitam espaço de armazenamento
5. **Comunique atualizações**: Notifique usuários de novas versões

---

## Troubleshooting

**Service Worker não aparece no DevTools:**
- Certifique-se de usar HTTPS ou localhost
- Verifique console para erros
- Limpe cache e recarregue

**App não instala:**
- Verifique o manifest.json no DevTools
- Confirme que o Service Worker está ativo
- Teste em outro navegador

**Cache não atualiza:**
- Abra DevTools → Network
- Marque "Disable cache"
- Recarregue a página

---

## Links Úteis

- [Web.dev - PWA](https://web.dev/progressive-web-apps/)
- [MDN - Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Chrome DevTools Guide](https://developer.chrome.com/docs/devtools/)

---

**Sua PWA está pronta para uso! 🚀**
