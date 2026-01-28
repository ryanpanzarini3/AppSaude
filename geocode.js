/**
 * Script de Geocodificação para Unidades de Saúde de Ponta Grossa
 * Usa Google Maps Geocoding API para obter coordenadas precisas
 * 
 * INSTALAÇÃO:
 * 1. npm install axios dotenv
 * 2. Criar arquivo .env com: GOOGLE_MAPS_API_KEY=sua_chave_aqui
 * 3. Executar: node geocode.js
 */

require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

if (!API_KEY) {
    console.error('❌ ERRO: Google Maps API key não encontrada!');
    console.error('Crie um arquivo .env com: GOOGLE_MAPS_API_KEY=sua_chave');
    process.exit(1);
}

// Ler dados do mapa.js
const mapaPath = path.join(__dirname, 'js', 'mapa.js');
const mapaContent = fs.readFileSync(mapaPath, 'utf8');

// Extrair arrays de dados usando regex
const ubsMatch = mapaContent.match(/const ubsUnidades = \[([\s\S]*?)\];/);
const upaMatch = mapaContent.match(/const upaUnidades = \[([\s\S]*?)\];/);

if (!ubsMatch || !upaMatch) {
    console.error('❌ Erro ao extrair dados de mapa.js');
    process.exit(1);
}

// Converter strings JSON em objetos
const ubsJSON = '[' + ubsMatch[1] + ']';
const upaJSON = '[' + upaMatch[1] + ']';

let ubsUnidades, upaUnidades;

try {
    // Parse com tratamento para vírgulas finais
    ubsUnidades = eval(ubsJSON);
    upaUnidades = eval(upaJSON);
} catch (e) {
    console.error('❌ Erro ao parsear dados:', e.message);
    process.exit(1);
}

// Função para geocodificar um endereço
async function geocodeAddress(address, nome, bairro) {
    try {
        // Adicionar bairro e Ponta Grossa para melhor precisão
        const fullAddress = `${address}, ${bairro}, Ponta Grossa, Paraná, Brasil`;
        
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: fullAddress,
                key: API_KEY
            }
        });

        if (response.data.results.length > 0) {
            const location = response.data.results[0].geometry.location;
            const formattedAddress = response.data.results[0].formatted_address;
            console.log(`✅ ${nome}`);
            console.log(`   Endereço completo: ${formattedAddress}`);
            console.log(`   Coordenadas: ${location.lat}, ${location.lng}\n`);
            
            return {
                nome: nome,
                endereco: address,
                bairro: bairro,
                lat: location.lat,
                lng: location.lng,
                formattedAddress: formattedAddress,
                sucesso: true
            };
        } else {
            console.log(`❌ ${nome}: Endereço não encontrado`);
            console.log(`   Tentativa: ${fullAddress}\n`);
            return {
                nome: nome,
                endereco: address,
                bairro: bairro,
                sucesso: false,
                erro: 'Endereço não encontrado'
            };
        }
    } catch (error) {
        console.log(`❌ ${nome}: Erro na API - ${error.message}\n`);
        return {
            nome: nome,
            endereco: address,
            bairro: bairro,
            sucesso: false,
            erro: error.message
        };
    }
}

// Função principal
async function geocodeAll() {
    console.log('🗺️  Iniciando geocodificação de unidades de saúde de Ponta Grossa...\n');
    console.log('=' .repeat(80));
    
    const resultados = {
        ubs: [],
        upa: [],
        resumo: {
            totalUBS: ubsUnidades.length,
            totalUPA: upaUnidades.length,
            ubsGeocoded: 0,
            upaGeocoded: 0,
            erros: 0
        }
    };

    // Geocodificar UBS
    console.log(`📍 Geocodificando ${ubsUnidades.length} UBS...\n`);
    for (const ubs of ubsUnidades) {
        const resultado = await geocodeAddress(ubs.endereco, ubs.nome, ubs.bairro);
        resultados.ubs.push(resultado);
        if (resultado.sucesso) resultados.resumo.ubsGeocoded++;
        else resultados.resumo.erros++;
        
        // Aguardar para não sobrecarregar a API
        await new Promise(resolve => setTimeout(resolve, 150));
    }

    console.log('=' .repeat(80));
    console.log(`📍 Geocodificando ${upaUnidades.length} UPAs...\n`);
    for (const upa of upaUnidades) {
        const resultado = await geocodeAddress(upa.endereco, upa.nome, upa.bairro);
        resultados.upa.push(resultado);
        if (resultado.sucesso) resultados.resumo.upaGeocoded++;
        else resultados.resumo.erros++;
        
        await new Promise(resolve => setTimeout(resolve, 150));
    }

    // Salvar resultados em JSON
    const outputPath = path.join(__dirname, 'coordenadas_geocodificadas.json');
    fs.writeFileSync(outputPath, JSON.stringify(resultados, null, 2));

    console.log('=' .repeat(80));
    console.log('📊 RESUMO DA GEOCODIFICAÇÃO');
    console.log('=' .repeat(80));
    console.log(`✅ UBS geocodificadas: ${resultados.resumo.ubsGeocoded}/${resultados.resumo.totalUBS}`);
    console.log(`✅ UPAs geocodificadas: ${resultados.resumo.upaGeocoded}/${resultados.resumo.totalUPA}`);
    console.log(`❌ Erros: ${resultados.resumo.erros}`);
    console.log(`\n📁 Resultados salvos em: ${outputPath}`);
    console.log('\n📌 Próximo passo: node atualizar-mapa.js');
    console.log('=' .repeat(80));
}

// Executar
geocodeAll().catch(error => {
    console.error('Erro fatal:', error);
    process.exit(1);
});
