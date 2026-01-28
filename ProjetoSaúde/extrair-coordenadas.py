import re
import json

# Lê o arquivo de links
with open(r'c:\Users\ryanp\ProjetoSaúde\links-maps\links.txt', 'r', encoding='utf-8') as f:
    linhas = f.readlines()

unidades = []
# Procura em dois padrões: /@LAT,LNG e !3d LAT!4d LNG
pattern1 = r'/@(-?\d+\.\d+),(-?\d+\.\d+)'
pattern2 = r'!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)'

for linha in linhas:
    linha = linha.strip()
    if not linha:
        continue
    
    # Separa nome e URL
    parts = linha.split('|')
    if len(parts) < 2:
        continue
    
    nome = parts[0].strip()
    url = parts[1].strip()
    
    # Extrai coordenadas
    match = re.search(pattern1, url)
    if not match:
        match = re.search(pattern2, url)
    
    if match:
        lat = float(match.group(1))
        lng = float(match.group(2))
        
        unidades.append({
            'nome': nome,
            'lat': lat,
            'lng': lng
        })
        
        print(f"✓ {nome}: {lat}, {lng}")
    else:
        print(f"✗ Erro ao processar: {nome}")

# Salva JSON
output = r'c:\Users\ryanp\ProjetoSaúde\coordenadas-extraidas.json'
with open(output, 'w', encoding='utf-8') as f:
    json.dump(unidades, f, ensure_ascii=False, indent=2)

print(f"\n✅ {len(unidades)} coordenadas extraídas para: {output}")
