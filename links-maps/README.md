# 🗺️ Como adicionar coordenadas precisas

## ✅ Passo 1: Adicione os links

Abra o arquivo: `links-maps/links.txt`

**Formato:**
```
Nome da Unidade|URL do Google Maps
```

**Exemplo:**
```
Abrahão Federmann|https://www.google.com/maps/place/Unidade+de+Saúde+Abrahão+Federmann/@-25.0883606,-50.1435159,592m/data=!3m1!1e3!4m6!3m5!1s0x94e81a4ab7cf02ef:0x33748c9f240a8995!8m2!3d-25.0880841!4d-50.1423342!16s%2Fg%2F11g6rnsb6m?entry=ttu
Adam Polan|https://www.google.com/maps/place/...
Adão Ademar Andrade|https://www.google.com/maps/place/...
```

## 📍 Como pegar o link do Google Maps

1. Abra Google Maps
2. Busque o endereço da unidade
3. Copie a URL completa (CTRL+C na barra de endereços)
4. Cole no arquivo `links-maps/links.txt`

**Importante:** O script extrai as coordenadas automaticamente da URL!

## 🚀 Passo 2: Processar os links

No PowerShell, execute:

```powershell
node processar-links.js
```

O script vai:
- ✅ Ler todos os links
- ✅ Extrair as coordenadas precisas
- ✅ Atualizar `js/mapa.js` automaticamente

## ✨ Pronto!

Seu mapa agora terá coordenadas 100% precisas! 📍

---

**Dúvidas:**
- Links devem estar no formato completo (do Google Maps compartilhado)
- Cada linha: Nome | URL
- Sem linhas em branco (ou ignore-as)
