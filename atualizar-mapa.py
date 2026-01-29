import json
import re


with open(r'c:\Users\ryanp\ProjetoSaúde\coordenadas-extraidas.json', 'r', encoding='utf-8') as f:
    coordenadas = json.load(f)


with open(r'c:\Users\ryanp\ProjetoSaúde\js\mapa.js', 'r', encoding='utf-8') as f:
    mapa_js = f.read()


coords_map = {item['nome'].strip(): {'lat': item['lat'], 'lng': item['lng']} for item in coordenadas}


def substituir_coordenadas(match):
    linha = match.group(0)
    

    nome_match = re.search(r'nome: "([^"]+)"', linha)
    if not nome_match:
        return linha
    
    nome = nome_match.group(1)
    

    if nome in coords_map:
        lat = coords_map[nome]['lat']
        lng = coords_map[nome]['lng']
        

        nova_linha = re.sub(r'lat: -?\d+\.\d+', f'lat: {lat}', linha)
        nova_linha = re.sub(r'lng: -?\d+\.\d+', f'lng: {lng}', nova_linha)
        
        print(f"✓ Atualizado: {nome}")
        return nova_linha
    else:
        print(f"✗ Não encontrado: {nome}")
        return linha


pattern = r'\{[^}]*nome: "[^"]*"[^}]*lat: -?\d+\.\d+[^}]*lng: -?\d+\.\d+[^}]*\}'
mapa_js_novo = re.sub(pattern, substituir_coordenadas, mapa_js)


with open(r'c:\Users\ryanp\ProjetoSaúde\js\mapa.js', 'w', encoding='utf-8') as f:
    f.write(mapa_js_novo)

print(f"\n✅ mapa.js atualizado com todas as coordenadas precisas!")

