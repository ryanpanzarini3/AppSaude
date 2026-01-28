#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para extrair coordenadas dos links do Google Maps
e atualizar mapa.js automaticamente
"""

import re
import os
from pathlib import Path

def processar_links():
    # Caminhos
    projeto_dir = Path(__file__).parent
    links_file = projeto_dir / "links-maps" / "links.txt"
    mapa_file = projeto_dir / "js" / "mapa.js"

    if not links_file.exists():
        print(f"❌ Arquivo não encontrado: {links_file}")
        return

    if not mapa_file.exists():
        print(f"❌ Arquivo não encontrado: {mapa_file}")
        return

    # Ler links
    with open(links_file, "r", encoding="utf-8") as f:
        linhas = f.readlines()

    # Ler mapa.js
    with open(mapa_file, "r", encoding="utf-8") as f:
        mapa_content = f.read()

    print("🗺️  Extraindo coordenadas dos links do Google Maps...\n")
    print("=" * 80)

    updated = 0
    coordenadas = []

    # Processar cada linha
    for linha in linhas:
        linha = linha.strip()
        if not linha or "|" not in linha:
            continue

        partes = linha.split("|", 1)
        nome = partes[0].strip()
        url = partes[1].strip() if len(partes) > 1 else ""

        if not url or not url.startswith("http"):
            continue

        # Extrair coordenadas da URL usando regex
        # Formato: /@LAT,LNG,
        match = re.search(r"/@(-?\d+\.\d+),(-?\d+\.\d+)", url)

        if match:
            lat = float(match.group(1))
            lng = float(match.group(2))

            print(f"✅ {nome}")
            print(f"   📍 {lat}, {lng}\n")

            coordenadas.append({
                "nome": nome,
                "lat": lat,
                "lng": lng
            })
        else:
            print(f"❌ {nome}: Coordenadas não encontradas\n")

    print("=" * 80)
    print("\n🔄 Atualizando mapa.js...\n")

    # Atualizar mapa.js para cada unidade
    for coord in coordenadas:
        nome_escaped = re.escape(coord["nome"])

        # Padrão para atualizar lat
        lat_pattern = rf'(nome: "{nome_escaped}"[^}}]*?lat: )-?\d+\.?\d*,'
        lat_replacement = rf'$1{coord["lat"]},'
        before = mapa_content
        mapa_content = re.sub(lat_pattern, lat_replacement, mapa_content)

        # Padrão para atualizar lng
        lng_pattern = rf'(nome: "{nome_escaped}"[^}}]*?lng: )-?\d+\.?\d*,'
        lng_replacement = rf'$1{coord["lng"]},'
        mapa_content = re.sub(lng_pattern, lng_replacement, mapa_content)

        if mapa_content != before:
            print(f"✅ {coord['nome']}: {coord['lat']}, {coord['lng']}")
            updated += 1

    # Salvar arquivo atualizado
    with open(mapa_file, "w", encoding="utf-8") as f:
        f.write(mapa_content)

    print("\n" + "=" * 80)
    print("✅ SUCESSO!")
    print("=" * 80)
    print(f"📍 {updated} unidades atualizadas")
    print(f"📁 Arquivo atualizado: js/mapa.js")
    print("\n🚀 Seu mapa está pronto com coordenadas precisas!")
    print("=" * 80)

if __name__ == "__main__":
    processar_links()
