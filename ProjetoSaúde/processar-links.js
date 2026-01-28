/**
 * Script para extrair coordenadas dos links do Google Maps
 * e atualizar automaticamente o mapa.js
 * 
 * Execução: node processar-links.js
 */

const fs = require('fs');
const path = require('path');

function procesarLinks() {
    const linksPath = path.join(__dirname, 'links-maps', 'links.txt');
    const mapaPath = path.join(__dirname, 'js', 'mapa.js');

    if (!fs.existsSync(linksPath)) {
        console.error('❌ Arquivo links-maps/links.txt não encontrado!');
        process.exit(1);
    }

    const linksContent = fs.readFileSync(linksPath, 'utf8');
    let mapaContent = fs.readFileSync(mapaPath, 'utf8');

    const linhas = linksContent.trim().split('\n');
    const coordenadas = [];
    let updated = 0;

    console.log('🗺️  Extraindo coordenadas dos links...\n');
    console.log('=' .repeat(80));

    // Processar cada linha
    for (const linha of linhas) {
        if (!linha.trim()) continue;

        const [nome, url] = linha.split('|');
        if (!nome || !url) {
            console.log(`⚠️  Linha inválida (falta | entre nome e URL): ${linha}`);
            continue;
        }

        // Regex para extrair coordenadas da URL do Google Maps
        // Formato: /@LAT,LNG, ou @LAT,LNG,
        const coordRegex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
        const match = url.match(coordRegex);

        if (match) {
            const lat = parseFloat(match[1]);
            const lng = parseFloat(match[2]);

            console.log(`✅ ${nome.trim()}`);
            console.log(`   📍 ${lat}, ${lng}\n`);

            coordenadas.push({
                nome: nome.trim(),
                lat: lat,
                lng: lng
            });
        } else {
            console.log(`❌ ${nome.trim()}: Coordenadas não encontradas na URL\n`);
        }
    }

    console.log('=' .repeat(80));
    console.log('\n🔄 Atualizando mapa.js...\n');

    // Atualizar o mapa.js
    for (const coord of coordenadas) {
        const escapedNome = coord.nome.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        // Padrão para encontrar e atualizar lat
        const latPattern = new RegExp(
            `(nome: "${escapedNome}"[^}]*?lat: )-?\\d+\\.?\\d*,`,
            'g'
        );
        const latReplacement = `$1${coord.lat},`;
        const beforeLat = mapaContent;
        mapaContent = mapaContent.replace(latPattern, latReplacement);

        // Padrão para encontrar e atualizar lng
        const lngPattern = new RegExp(
            `(nome: "${escapedNome}"[^}]*?lng: )-?\\d+\\.?\\d*,`,
            'g'
        );
        const lngReplacement = `$1${coord.lng},`;
        mapaContent = mapaContent.replace(lngPattern, lngReplacement);

        if (mapaContent !== beforeLat) {
            console.log(`✅ ${coord.nome}: ${coord.lat}, ${coord.lng}`);
            updated++;
        }
    }

    // Salvar arquivo atualizado
    fs.writeFileSync(mapaPath, mapaContent);

    console.log('\n' + '=' .repeat(80));
    console.log('✅ SUCESSO!');
    console.log('=' .repeat(80));
    console.log(`📍 ${updated} unidades atualizadas`);
    console.log(`📁 Arquivo atualizado: js/mapa.js`);
    console.log('\n🚀 Seu mapa está pronto com coordenadas precisas!');
    console.log('=' .repeat(80));
}

procesarLinks();
