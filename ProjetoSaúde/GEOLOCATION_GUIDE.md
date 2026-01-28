# 📍 Guia de Permissão de Geolocalização

## O que foi melhorado?

✅ **Feedback imediato**: Modal agora mostra "Solicitando sua localização..." quando o botão é clicado  
✅ **Timeout aumentado**: De 10s para 30s para melhor captação de sinal  
✅ **Mensagens de erro descritivas**: Instruções claras sobre como ativar a geolocalização  
✅ **Melhor logging**: Console agora mostra error code e message para debug  
✅ **Visual feedback**: Botão muda para estado "Aguarde..." durante a localização  

---

## Como Ativar Geolocalização no Mobile

### 📱 Android Chrome

1. Abra o site no Chrome
2. Clique em **⋮ (Menu)** → **Configurações**
3. Vá para **Privacidade** → **Configurações de sites** → **Localização**
4. Encontre o site **pontagrossa.com** ou similar
5. Defina como **Permitido**
6. Volte ao site e clique novamente em "UBS Próxima" ou "UPA Próxima"

### 📱 Android Firefox

1. Abra o site no Firefox
2. Clique em **☰ (Menu)** → **Configurações**
3. Vá para **Privacidade** → **Permissões**
4. Encontre **Localização** e marque como **Permitido**
5. Volte ao site e tente novamente

### 📱 iPhone Safari

1. Abra o site no Safari
2. Clique em **Configurações** do iPhone
3. Role até **Safari**
4. Toque em **Localização**
5. Encontre o site e selecione **Permitir**
6. Volte ao Safari e tente novamente

### 📱 iPhone Chrome

1. Abra o site no Chrome
2. Clique em **⋮ (Menu)** → **Configurações**
3. Vá para **Privacidade** → **Localização**
4. Encontre o site e defina como **Permitido**
5. Volte ao site e tente novamente

---

## ⚠️ Pré-requisitos

Para que a geolocalização funcione, você precisa:

1. **GPS ativado** no dispositivo
2. **Localização ativada** no navegador
3. **Permissão dada** ao site (será solicitada na primeira vez)
4. **Boa recepção de sinal** (GPS precisa de visibilidade do céu)
5. **Estar em um local com cobertura de rede** (para triangulação)

---

## 🔍 Como o Sistema Funciona

### Fluxo da Geolocalização:

```
Clique no botão
    ↓
Modal mostra "Solicitando sua localização..."
    ↓
Navegador solicita permissão ao usuário (alerta no topo da tela)
    ↓
Se PERMITIDO:
    ├─ GPS tenta calcular sua posição
    ├─ Procura as UBS/UPA mais próximas
    └─ Mostra resultado com distância e botão "Abrir no Maps"
    
Se NEGADO ou TIMEOUT:
    ├─ Modal mostra erro descritivo
    ├─ Inclui instruções para ativar
    └─ Você pode tentar novamente
```

---

## 🆘 Resolvendo Problemas

### ❌ "Sua navegador não suporta geolocalização"
**Solução**: Use um navegador moderno (Chrome, Firefox, Safari, Edge)

### ❌ "Localização não permitida"
**Solução**: 
- Verifique as permissões do site nas configurações do navegador
- Limpe dados de site e tente novamente
- Use navegador em modo incógnito para resetar permissões

### ❌ "Informações de localização não disponíveis"
**Solução**:
- Ative o GPS no seu dispositivo
- Acesse um local ao ar livre (GPS funciona melhor sem obstáculos)
- Verifique se o navegador tem permissão de acesso ao GPS

### ❌ "A localização demorou muito para ser obtida"
**Solução**:
- Aguarde alguns segundos (GPS precisa de tempo para triangular)
- Mude para um local com melhor recepção
- Verifique a força do sinal da rede
- Tente novamente

### ❌ Nenhum alerta aparece ao clicar
**Solução**:
- O navegador pode estar bloqueando notificações
- Verifique as configurações de permissões do telefone
- Tente em modo incógnito/privado
- Verifique o console do navegador (F12) para erros

---

## 💡 Dicas Práticas

✅ **Para melhor resultado**:
- Use ao ar livre ou perto de uma janela
- Aguarde 3-5 segundos após clicar (GPS precisa triangular)
- Verifique se o GPS está realmente ativado no dispositivo
- Use o site em uma rede estável (WiFi ou 4G/5G)

✅ **Se a localização estiver imprecisa**:
- O GPS pode estar com 50-100 metros de erro é normal
- Tente novamente em outro local
- A precisão melhora com o tempo (mais de 30s pode ser necessário)

---

## 📊 Informações Técnicas

**Configuração atual do Sistema**:

```javascript
{
  enableHighAccuracy: true,    // Tenta usar GPS em vez de WiFi
  timeout: 30000,               // Aguarda até 30 segundos
  maximumAge: 0                 // Sempre obtém nova posição
}
```

**O que o sistema faz**:
1. Solicita localização com alta precisão
2. Aguarda até 30 segundos pela resposta
3. Calcula a distância até todas as UBS/UPA
4. Encontra a mais próxima e exibe com distância e telefone
5. Oferece botão para abrir no Google Maps

---

## 🎯 Proximos Passos

Após ver a UBS/UPA mais próxima:

1. **"Abrir no Maps"** - Abre o Google Maps com rota
2. **"Fechar"** - Fecha o modal
3. **"Ver Mapa Completo"** - Vai para página do mapa interativo

---

## 📞 Suporte

Se ainda tiver problemas:

1. Abra o Console (F12 → Console)
2. Clique no botão de localização novamente
3. Procure por mensagens de erro
4. Compartilhe o erro com suporte técnico

---

**✨ A geolocalização agora está muito mais confiável e user-friendly! 📍**
