# 🗺️ Guia de Geocodificação - Google Maps API

## 📋 O que foi criado

- `geocode.js` - Script principal que geocodifica todos os 50 endereços
- `atualizar-mapa.js` - Script que atualiza automaticamente o mapa.js
- `.env` - Arquivo de configuração com sua chave de API
- `coordenadas_geocodificadas.json` - Arquivo de resultado (será criado)

---

## ✅ Passo a Passo

### 1️⃣ Obter Google Maps API Key (GRATUITO)

1. Acesse: https://console.cloud.google.com
2. Crie um novo projeto (ou use um existente)
3. Ative as APIs:
   - "Maps JavaScript API"
   - "Geocoding API"
4. Vá em "Credenciais" → "Criar credencial" → "API Key"
5. Copie sua chave de API

### 2️⃣ Configurar .env

Abra o arquivo `.env` nesta pasta e substitua:

```
GOOGLE_MAPS_API_KEY=sua_chave_api_aqui
```

Por exemplo:
```
GOOGLE_MAPS_API_KEY=AIzaSyDAbCdEfGhIjKlMnOpQrStUvWxYz1234567
```

### 3️⃣ Instalar dependências

Abra o PowerShell nesta pasta e execute:

```powershell
npm install axios dotenv
```

### 4️⃣ Executar geocodificação

```powershell
node geocode.js
```

⏳ Isso vai:
- Geocodificar cada um dos 50 endereços
- Retornar as coordenadas precisas
- Salvar em `coordenadas_geocodificadas.json`
- Mostrar um resumo com sucessos/erros

### 5️⃣ Atualizar o mapa

```powershell
node atualizar-mapa.js
```

✅ Isso vai:
- Ler as coordenadas geocodificadas
- Atualizar automaticamente `js/mapa.js`
- Substituir lat/lng de cada unidade
- Manter todos os outros dados intactos

---

## 📊 Resultado esperado

Após executar ambos os scripts:
- ✅ Todos os 50 marcadores estarão em locais **100% precisos**
- ✅ O mapa vai renderizar as unidades corretamente
- ✅ Usuários conseguem encontrar as UBS/UPA pelo endereço exato

---

## 💰 Custos

- **Gratuito** até 25.000 geocodificações/mês (com billing ativo)
- Nossa solução usa apenas 50 geocodificações (uma vez)
- Não há custo para visualizar o mapa

---

## ⚠️ Troubleshooting

**Erro: "API key not found"**
- Verifique se o arquivo `.env` está na raiz do projeto
- Confirme que copiou a chave corretamente

**Erro: "REQUEST_DENIED"**
- Verifique se ativou as APIs no Google Cloud Console
- Aguarde alguns minutos após ativar as APIs

**Alguns endereços não encontrados**
- Normal! Alguns endereços incompletos podem não ser geocodificados
- O script vai mostrar quais falharam
- Você pode corrigir manualmente esses lat/lng depois

---

## 🚀 Próximos passos

Depois que tudo estiver atualizado:
1. Abra `mapa.html` no navegador
2. Verifique se todos os marcadores estão nos lugares certos
3. Teste os popups e interações
4. Seu mapa está pronto! ✅

---

## 📞 Dúvidas?

Se tiver problemas:
1. Verifique se Node.js está instalado: `node --version`
2. Verifique se npm está instalado: `npm --version`
3. Garanta que a chave de API é válida e tem as APIs ativadas
