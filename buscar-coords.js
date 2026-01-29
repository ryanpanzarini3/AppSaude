

const axios = require('axios');
const fs = require('fs');
const path = require('path');


const mapaPath = path.join(__dirname, 'js', 'mapa.js');
const mapaContent = fs.readFileSync(mapaPath, 'utf8');


const ubsMatch = mapaContent.match(/const ubsUnidades = \[([\s\S]*?)\];/);
const upaMatch = mapaContent.match(/const upaUnidades = \[([\s\S]*?)\];/);

let ubsUnidades, upaUnidades;
try {
    ubsUnidades = eval('[' + ubsMatch[1] + ']');
    upaUnidades = eval('[' + upaMatch[1] + ']');
} catch (e) {
    console.error('❌ Erro ao parsear mapa.js:', e.message);
    process.exit(1);
}


async function getCoordinates(address, bairro, nome) {
    try {
        const fullAddress = `${address}, ${bairro}, Ponta Grossa, Paraná, Brasil`;
        
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: fullAddress,
                format: 'json',
                limit: 1
            },
            headers: {
                'User-Agent': 'ProjetoSaudePontaGrossa/1.0'
            }
        });

        if (response.data.length > 0) {
            const result = response.data[0];
            const lat = parseFloat(result.lat);
            const lng = parseFloat(result.lon);
            
            console.log(`✅ ${nome}`);
            console.log(`   📍 ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
            console.log(`   📍 (endereço: ${result.display_name})\n`);
            
            return { lat, lng, sucesso: true };
        } else {
            console.log(`❌ ${nome}: Não encontrado\n`);
            return { sucesso: false };
        }
    } catch (error) {
        console.log(`❌ ${nome}: ${error.message}\n`);
        return { sucesso: false };
    }
}


async function buscarTodos() {
    console.log('🗺️  Buscando coordenadas precisas via OpenStreetMap (Nominatim)\n');
    console.log('=' .repeat(80));
    
    const resultados = {
        ubs: [],
        upa: [],
        resumo: { sucesso: 0, falhas: 0 }
    };

    console.log(`📍 Processando ${ubsUnidades.length} UBS...\n`);
    for (const ubs of ubsUnidades) {
        const resultado = await getCoordinates(ubs.endereco, ubs.bairro, ubs.nome);
        if (resultado.sucesso) {
            resultados.ubs.push({
                nome: ubs.nome,
                lat: resultado.lat,
                lng: resultado.lng
            });
            resultados.resumo.sucesso++;
        } else {
            resultados.resumo.falhas++;
        }

        await new Promise(resolve => setTimeout(resolve, 1100));
    }

    console.log('=' .repeat(80));
    console.log(`📍 Processando ${upaUnidades.length} UPAs...\n`);
    for (const upa of upaUnidades) {
        const resultado = await getCoordinates(upa.endereco, upa.bairro, upa.nome);
        if (resultado.sucesso) {
            resultados.upa.push({
                nome: upa.nome,
                lat: resultado.lat,
                lng: resultado.lng
            });
            resultados.resumo.sucesso++;
        } else {
            resultados.resumo.falhas++;
        }
        
        await new Promise(resolve => setTimeout(resolve, 1100));
    }


    const outputPath = path.join(__dirname, 'coordenadas_encontradas.json');
    fs.writeFileSync(outputPath, JSON.stringify(resultados, null, 2));

    console.log('=' .repeat(80));
    console.log('📊 RESULTADO');
    console.log('=' .repeat(80));
    console.log(`✅ Encontradas: ${resultados.resumo.sucesso}`);
    console.log(`❌ Não encontradas: ${resultados.resumo.falhas}`);
    console.log(`\n📁 Salvo em: ${outputPath}`);
    console.log('\n💡 Próximo passo: node atualizar-coords.js');
    console.log('=' .repeat(80));
}

buscarTodos().catch(error => {
    console.error('❌ Erro:', error);
    process.exit(1);
});

