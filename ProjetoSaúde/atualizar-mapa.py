import json
import re

# Lê coordenadas extraídas
with open(r'c:\Users\ryanp\ProjetoSaúde\coordenadas-extraidas.json', 'r', encoding='utf-8') as f:
    coordenadas = json.load(f)

# Lê mapa.js original
with open(r'c:\Users\ryanp\ProjetoSaúde\js\mapa.js', 'r', encoding='utf-8') as f:
    mapa_js = f.read()

# Cria mapa nome -> {lat, lng}
coords_map = {item['nome'].strip(): {'lat': item['lat'], 'lng': item['lng']} for item in coordenadas}

# Função para substituir as coordenadas
def substituir_coordenadas(match):
    linha = match.group(0)
    
    # Extrai o nome da unidade
    nome_match = re.search(r'nome: "([^"]+)"', linha)
    if not nome_match:
        return linha
    
    nome = nome_match.group(1)
    
    # Procura as coordenadas no mapa
    if nome in coords_map:
        lat = coords_map[nome]['lat']
        lng = coords_map[nome]['lng']
        
        # Substitui lat e lng na linha
        nova_linha = re.sub(r'lat: -?\d+\.\d+', f'lat: {lat}', linha)
        nova_linha = re.sub(r'lng: -?\d+\.\d+', f'lng: {lng}', nova_linha)
        
        print(f"✓ Atualizado: {nome}")
        return nova_linha
    else:
        print(f"✗ Não encontrado: {nome}")
        return linha

# Encontra e substitui todas as unidades (UBS e UPA)
pattern = r'\{[^}]*nome: "[^"]*"[^}]*lat: -?\d+\.\d+[^}]*lng: -?\d+\.\d+[^}]*\}'
mapa_js_novo = re.sub(pattern, substituir_coordenadas, mapa_js)

# Salva o novo mapa.js
with open(r'c:\Users\ryanp\ProjetoSaúde\js\mapa.js', 'w', encoding='utf-8') as f:
    f.write(mapa_js_novo)

print(f"\n✅ mapa.js atualizado com todas as coordenadas precisas!")
