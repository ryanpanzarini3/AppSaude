

const fs = require('fs');
const path = require('path');

function updateMap() {
    const coordPath = path.join(__dirname, 'coordenadas_encontradas.json');
    const mapaPath = path.join(__dirname, 'js', 'mapa.js');

    if (!fs.existsSync(coordPath)) {
        console.error('❌ Arquivo coordenadas_encontradas.json não encontrado!');
        console.error('Execute primeiro: node buscar-coords.js');
        process.exit(1);
    }

    const coordenadas = JSON.parse(fs.readFileSync(coordPath, 'utf8'));
    let mapaContent = fs.readFileSync(mapaPath, 'utf8');

    let updated = 0;

    console.log('🔄 Atualizando mapa.js...\n');


    const coordMap = {};
    for (const item of [...coordenadas.ubs, ...coordenadas.upa]) {
        coordMap[item.nome] = { lat: item.lat, lng: item.lng };
    }


    for (const [nome, coords] of Object.entries(coordMap)) {
        // Escape especial para regex
        const escapedNome = nome.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        

        const pattern = new RegExp(
            `(\\{ id: \\d+, nome: "${escapedNome}"[^}]*?lat: )-?\\d+\\.?\\d*,`,
            'g'
        );
        
        const replacement = `$1${coords.lat},`;
        
        const before = mapaContent;
        mapaContent = mapaContent.replace(pattern, replacement);
        
        if (mapaContent !== before) {

            const lngPattern = new RegExp(
                `(nome: "${escapedNome}"[^}]*?lng: )-?\\d+\\.?\\d*,`,
                'g'
            );
            
            const lngReplacement = `$1${coords.lng},`;
            mapaContent = mapaContent.replace(lngPattern, lngReplacement);
            
            console.log(`✅ ${nome}: ${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`);
            updated++;
        }
    }

    fs.writeFileSync(mapaPath, mapaContent);

    console.log('\n' + '='.repeat(80));
    console.log('✅ MAPA ATUALIZADO!');
    console.log('='.repeat(80));
    console.log(`📍 ${updated} unidades atualizadas com coordenadas precisas`);
    console.log(`📁 Arquivo: js/mapa.js`);
    console.log('\n🚀 Seu mapa está pronto para usar!');
    console.log('='.repeat(80));
}

updateMap();

