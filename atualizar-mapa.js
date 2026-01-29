
const fs = require('fs');
const path = require('path');

function updateMapWithCoordinates() {
    const coordPath = path.join(__dirname, 'coordenadas_geocodificadas.json');
    const mapaPath = path.join(__dirname, 'js', 'mapa.js');

    if (!fs.existsSync(coordPath)) {
        console.error('❌ Arquivo coordenadas_geocodificadas.json não encontrado!');
        console.error('Execute primeiro: node geocode.js');
        process.exit(1);
    }


    const coordenadas = JSON.parse(fs.readFileSync(coordPath, 'utf8'));
    const mapaContent = fs.readFileSync(mapaPath, 'utf8');


    let updatedMapa = mapaContent;
    let ubsUpdated = 0;
    let upaUpdated = 0;


    for (const ubsResult of coordenadas.ubs) {
        if (ubsResult.sucesso) {

            const regex = new RegExp(
                `nome: "${ubsResult.nome.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}",[^}]*?lat: [^,]+, lng: [^,]+`,
                'g'
            );

            updatedMapa = updatedMapa.replace(regex, (match) => {
                ubsUpdated++;
                return match.replace(/lat: -?\d+\.?\d*/, `lat: ${ubsResult.lat}`)
                            .replace(/lng: -?\d+\.?\d*/, `lng: ${ubsResult.lng}`);
            });
        }
    }


    for (const upaResult of coordenadas.upa) {
        if (upaResult.sucesso) {
            const regex = new RegExp(
                `nome: "${upaResult.nome.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}",[^}]*?lat: [^,]+, lng: [^,]+`,
                'g'
            );

            updatedMapa = updatedMapa.replace(regex, (match) => {
                upaUpdated++;
                return match.replace(/lat: -?\d+\.?\d*/, `lat: ${upaResult.lat}`)
                            .replace(/lng: -?\d+\.?\d*/, `lng: ${upaResult.lng}`);
            });
        }
    }


    fs.writeFileSync(mapaPath, updatedMapa);

    console.log('\n' + '='.repeat(60));
    console.log('✅ MAPA ATUALIZADO COM SUCESSO!');
    console.log('='.repeat(60));
    console.log(`✅ UBS atualizadas: ${ubsUpdated}/47`);
    console.log(`✅ UPAs atualizadas: ${upaUpdated}/3`);
    console.log(`📁 Arquivo atualizado: ${mapaPath}`);
    console.log('='.repeat(60));
}

updateMapWithCoordinates();

