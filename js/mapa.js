
const ubsUnidades = [
    { id: 1, nome: "Abrahão Federmann", bairro: "Ana Rita", endereco: "R. Quinze de Setembro, 260 - Uvaranas, Ponta Grossa - PR, 84020-050", vacina: false, ecg: false, dentista: false, periodo: "Manhã e Tarde", ramal: "(42)3220-1000", lat: -25.0883606, lng: -50.1435159, color: "#ef4444" },
    { id: 2, nome: "Adam Polan", bairro: "Palmeirinha", endereco: "R. Alberto de Oliveira, 2014 - Nova Rússia, Ponta Grossa - PR, 84071-120", vacina: true, ecg: true, dentista: true, periodo: "Manhã e Tarde", ramal: "(42)3220-1020", lat: -25.068633, lng: -50.1762305, color: "#3b82f6" },
    { id: 3, nome: "Adão Ademar Andrade", bairro: "Jd Cerejeira", endereco: "Colonia Dona Luiza, Ponta Grossa - PR, 84045-650", vacina: false, ecg: false, dentista: false, periodo: "Manhã e Tarde", ramal: "4418", lat: -25.098774, lng: -50.187086, color: "#06b6d4" },
    { id: 4, nome: "Adilson Baggio", bairro: "Santo Antônio", endereco: "Pinhalão, 20 Nova Rússia- Vila - Santo Antônio, Ponta Grossa - PR, 84053-240", vacina: false, ecg: false, dentista: true, periodo: "Manhã e Tarde", ramal: "4421", lat: -25.0987748, lng: -50.1870865, color: "#10b981" },
    { id: 5, nome: "Agostinho Brenner", bairro: "Maria Otília", endereco: "Frente a Guarda Municipal - R. Freud, 129 - Maria Otília, Ponta Grossa - PR, 84045-430", vacina: false, ecg: true, dentista: false, periodo: "Manhã e Tarde", ramal: "4422", lat: -25.1362692, lng: -50.1596708, color: "#f59e0b" },
    { id: 6, nome: "Alfredo Levandovski", bairro: "Gralha Azul", endereco: "Avenida General Aldo Bonde – Esq. com Rua Lagoa Dourada", vacina: true, ecg: true, dentista: false, periodo: "Manhã", ramal: "4424", lat: -25.1284257, lng: -50.2150305, color: "#8b5cf6" },
    { id: 7, nome: "Aluízio Grochoski", bairro: "Vila Guaíra", endereco: "Rua Teodoro Sampaio", vacina: false, ecg: false, dentista: true, periodo: "Manhã e Tarde", ramal: "4426", lat: -25.1144266, lng: -50.1484859, color: "#ec4899" },
    { id: 8, nome: "Ambrosio Bricailo", bairro: "Bonsucesso", endereco: "Rua Ney Luiz Ribeiro, s/n (frente CMEI Padre Ezequiel Belquior)", vacina: false, ecg: true, dentista: true, periodo: "Manhã", ramal: "4525", lat: -25.0695016, lng: -50.2053617, color: "#06f6d4" },
    { id: 9, nome: "Antero Machado de Mello", bairro: "Rio Verde/Pitangui", endereco: "Rua Darcy Taques de Araújo – Esq. Rua Neusa Rodrigues de Oliveira", vacina: true, ecg: false, dentista: true, periodo: "Manhã e Tarde", ramal: "4428/4429", lat: -25.0712259, lng: -50.1237873, color: "#14b8a6" },
    { id: 10, nome: "Antônio Horácio Carlos de Miranda", bairro: "Sta Mônica", endereco: "Rua Gaza, 610 – Esq. com Rua Seon", vacina: false, ecg: true, dentista: true, periodo: "Manhã e Tarde", ramal: "4430", lat: -25.0513209, lng: -50.1453537, color: "#0ea5e9" },
    { id: 11, nome: "Antônio Russo", bairro: "Centro", endereco: "Rua Saldanha da Gama, s/n (quase Esq. com Avenida Balduíno Taques)", vacina: true, ecg: true, dentista: true, periodo: "Tarde", ramal: "4432", lat: -25.0816576, lng: -50.169207, color: "#06b6d4" },
    { id: 12, nome: "Antônio Saliba", bairro: "Pq Sabiá", endereco: "Rua Siqueira Campos", vacina: false, ecg: false, dentista: false, periodo: "FECHADA TEMPORARIAMENTE", ramal: "4434", lat: -25.1165091, lng: -50.1185003, color: "#ef4444" },
    { id: 13, nome: "Antônio Schwanzee", bairro: "Santa Luzia", endereco: "Rua São Mauro, 229", vacina: false, ecg: false, dentista: true, periodo: "Manhã", ramal: "4436", lat: -25.0666729, lng: -50.211814, color: "#10b981" },
    { id: 14, nome: "Aurélio Grott", bairro: "Los Angeles", endereco: "Rua Professor Fábio Fanucchi – Esq. Rua Prefeito José Hoffmann", vacina: false, ecg: false, dentista: true, periodo: "Manhã e Tarde", ramal: "4438", lat: -25.0636402, lng: -50.1905085, color: "#f59e0b" },
    { id: 15, nome: "Carlos Dezaunet Neto", bairro: "Parque Shangrilá", endereco: "Rua Professor Plácido Cardon, 745", vacina: false, ecg: false, dentista: true, periodo: "Manhã", ramal: "4444", lat: -25.1060537, lng: -50.2262071, color: "#8b5cf6" },
    { id: 16, nome: "Carlos Ribeiro de Macedo", bairro: "Pq do Café", endereco: "Rua Moacir Lazzarotto de Oliveira – Esq. Rua Arnaldo Szesz", vacina: true, ecg: false, dentista: true, periodo: "Manhã", ramal: "4446", lat: -25.0695465, lng: -50.2150324, color: "#ec4899" },
    { id: 17, nome: "Cézar Rocha Milleo", bairro: "Vila Santana", endereco: "Rua Ribeirão Claro, s/n (Esq. Rua Santa Amélia)", vacina: false, ecg: true, dentista: true, periodo: "Manhã e Tarde", ramal: "4448", lat: -25.0846674, lng: -50.2003776, color: "#06f6d4" },
    { id: 18, nome: "Cleon Francisco Carlos de Macedo", bairro: "Vila Rubini", endereco: "Rua Adre Denis Quilty, s/n (próximo à escola)", vacina: true, ecg: false, dentista: true, periodo: "Manhã e Tarde", ramal: "4450", lat: -25.088998, lng: -50.0937606, color: "#14b8a6" },
    { id: 19, nome: "Clyceu Carlos de Macedo", bairro: "Santa Terezinha", endereco: "Rua Papoula, s/n (próximo à escola)", vacina: false, ecg: false, dentista: false, periodo: "Tarde", ramal: "4452", lat: -25.1163927, lng: -50.2081645, color: "#0ea5e9" },
    { id: 20, nome: "Cyro de Lima Garcia", bairro: "Oficinas", endereco: "Rua Dom Pedro I (lado do terminal – antigo CAS)", vacina: false, ecg: true, dentista: true, periodo: "Manhã", ramal: "4455", lat: -25.126373, lng: -50.1567813, color: "#06b6d4" },
    { id: 21, nome: "Egon Roskamp", bairro: "Santa Paula", endereco: "Rua Castanheira, 216", vacina: false, ecg: true, dentista: true, periodo: "Manhã e Tarde", ramal: "4458", lat: -25.0965181, lng: -50.2058872, color: "#10b981" },
    { id: 22, nome: "Eugênio José Bocchi", bairro: "Parque Santa Lúcia", endereco: "Rua Paulo Kloth", vacina: false, ecg: false, dentista: true, periodo: "Manhã e Tarde", ramal: "4462", lat: -25.0723648, lng: -50.1840693, color: "#f59e0b" },
    { id: 23, nome: "Ezebedeu Linhares", bairro: "Jd Amália", endereco: "Rua Paulina Oliveira Gomes, s/n", vacina: false, ecg: false, dentista: true, periodo: "Manhã", ramal: "4463", lat: -25.137852, lng: -50.1440709, color: "#8b5cf6" },
    { id: 24, nome: "Félix Vianna", bairro: "Vila Cristina/Hilgemberger", endereco: "Rua Paes de Andrade – Esq. Rua Fernandes Vieira", vacina: false, ecg: false, dentista: true, periodo: "Manhã", ramal: "4465/4466", lat: -25.0906296, lng: -50.1870622, color: "#ec4899" },
    { id: 25, nome: "Horácio Droppa", bairro: "Borsato", endereco: "Rua Santa Rosa – Esq. Rua Santa Mônica", vacina: false, ecg: false, dentista: true, periodo: "Manhã e Tarde", ramal: "4469", lat: -25.1199569, lng: -50.105237, color: "#06f6d4" },
    { id: 26, nome: "Jamil Mussi", bairro: "Sabará", endereco: "Rua Paul Harris, s/n (lado da escola)", vacina: false, ecg: false, dentista: true, periodo: "Manhã", ramal: "4474", lat: -25.0855294, lng: -50.209503, color: "#14b8a6" },
    { id: 27, nome: "Javier Cejas Arzabe", bairro: "Vila Real", endereco: "Rua João de Barro", vacina: false, ecg: true, dentista: true, periodo: "Manhã e Tarde", ramal: "4475", lat: -25.0573573, lng: -50.2227946, color: "#0ea5e9" },
    { id: 28, nome: "Jayme Gusman", bairro: "Vila Estrela", endereco: "Rua Nilo Peçanha (Praça João Montes Filho)", vacina: true, ecg: false, dentista: true, periodo: "Manhã", ramal: "4471", lat: -25.110742, lng: -50.1634866, color: "#06b6d4" },
    { id: 29, nome: "José Bueno", bairro: "Jd Jacarandá", endereco: "Rua David Hilgemberg Júnior – Esq. Rua Alcindo Santana Nunes", vacina: true, ecg: true, dentista: true, periodo: "Manhã e Tarde", ramal: "4482", lat: -25.0635215, lng: -50.2013529, color: "#10b981" },
    { id: 30, nome: "José Carlos Araújo", bairro: "Cará", endereco: "Rua 14 Bis, s/n (ao lado da escola)", vacina: true, ecg: true, dentista: true, periodo: "Manhã", ramal: "4483", lat: -25.1780598, lng: -50.1449475, color: "#f59e0b" },
    { id: 31, nome: "Júlio de Azevedo", bairro: "Vila Vilela", endereco: "Rua Desembargador Lauro Lopes – Esq. Rua Rocha Pombo", vacina: true, ecg: true, dentista: true, periodo: "Manhã e Tarde", ramal: "4485", lat: -25.0750261, lng: -50.1502122, color: "#8b5cf6" },
    { id: 32, nome: "Lauro Müller", bairro: "Santa Maria", endereco: "Rua Tucano, s/n", vacina: true, ecg: true, dentista: true, periodo: "Manhã", ramal: "4487", lat: -25.148838, lng: -50.1669779, color: "#ec4899" },
    { id: 33, nome: "Louis Atanásio Charles Büron", bairro: "Periquitos", endereco: "Rua Izabel Ossowski, 1 – Jd. Sta. Edwirges", vacina: false, ecg: true, dentista: false, periodo: "Limitado", ramal: "4489", lat: -25.0413765, lng: -50.2479864, color: "#06f6d4" },
    { id: 34, nome: "Lubomir Antônio Urban", bairro: "31 de Março", endereco: "Rua Washington Luiz, 760", vacina: true, ecg: false, dentista: true, periodo: "Manhã e Tarde", ramal: "4491", lat: -25.0789518, lng: -50.1334014, color: "#14b8a6" },
    { id: 35, nome: "Luiz Conrado Mansani", bairro: "Uvaranas", endereco: "Avenida General Carlos Cavalcanti (lado do terminal – antigo CAS)", vacina: false, ecg: true, dentista: true, periodo: "Manhã e Tarde", ramal: "4495", lat: -25.0916973, lng: -50.1165346, color: "#0ea5e9" },
    { id: 36, nome: "Luiz Fernando Cajado de Oliveira Braga", bairro: "Cristo Rei", endereco: "Rua Brasílio Itiberê", vacina: false, ecg: false, dentista: false, periodo: "Limitado", ramal: "4493", lat: -25.0444287, lng: -50.2653642, color: "#06b6d4" },
    { id: 37, nome: "Madre Josefa Stenmanns", bairro: "V. Princesa", endereco: "Rua Bituruna, s/n", vacina: false, ecg: false, dentista: false, periodo: "Limitado", ramal: "4499", lat: -25.0987486, lng: -50.1414118, color: "#10b981" },
    { id: 38, nome: "Nilton Luiz de Castro", bairro: "Tarobá", endereco: "Rua Alfredo Bochnia, s/n (fundos da creche)", vacina: true, ecg: true, dentista: true, periodo: "Manhã e Tarde", ramal: "4502", lat: -25.1074933, lng: -50.1090829, color: "#f59e0b" },
    { id: 39, nome: "Ottoniel Pimentel dos Santos", bairro: "Vila Cipa", endereco: "Rua Desembargador Westphalem, s/n", vacina: true, ecg: false, dentista: true, periodo: "Manhã e Tarde", ramal: "4504", lat: -25.128586, lng: -50.146403, color: "#8b5cf6" },
    { id: 40, nome: "Paulo Madureira Novaes", bairro: "Pq D. Pedro II", endereco: "Rua Lizandro Alves de Araújo – Esq. Rua João Amaral de Almeida", vacina: false, ecg: true, dentista: false, periodo: "Limitado", ramal: "4506", lat: -25.0870618, lng: -50.1985952, color: "#ec4899" },
    { id: 41, nome: "Roberto de Jesus Portela", bairro: "Ronda", endereco: "Rua Cruzeiro do Oeste (junto à escola)", vacina: true, ecg: true, dentista: true, periodo: "Manhã e Tarde", ramal: "4507", lat: -25.1030381, lng: -50.1759678, color: "#06f6d4" },
    { id: 42, nome: "Romulo Pazzinato", bairro: "Nova Rússia", endereco: "Rua Prefeito Campos Mello (lado do terminal – antigo CAS)", vacina: false, ecg: true, dentista: false, periodo: "Limitado", ramal: "4509", lat: -25.0820992, lng: -50.1890972, color: "#14b8a6" },
    { id: 43, nome: "Sady de Macedo Silveira", bairro: "Olarias", endereco: "Travessa Edmundo Bittencourt, em frente ao 166 (fundos supermercado)", vacina: false, ecg: false, dentista: true, periodo: "Manhã", ramal: "4513", lat: -25.1053007, lng: -50.1603172, color: "#0ea5e9" },
    { id: 44, nome: "Santo Domingo Zampier", bairro: "Costa Rica", endereco: "Rua Ateneu Martins Fontoura", vacina: false, ecg: true, dentista: true, periodo: "Manhã", ramal: "4516", lat: -25.0572527, lng: -50.1072953, color: "#06b6d4" },
    { id: 45, nome: "Sharise Angélica Arruda", bairro: "Recanto Verde", endereco: "Rua Alzimiro Baptista Siqueira, s/n", vacina: false, ecg: true, dentista: false, periodo: "UEPG", ramal: "4517", lat: -25.1335856, lng: -50.1175446, color: "#10b981" },
    { id: 46, nome: "Silas Sallen", bairro: "Vila Claudionora", endereco: "Rua Rodrigo Silva, 927 (próximo à escola)", vacina: false, ecg: true, dentista: false, periodo: "Limitado", ramal: "4519", lat: -25.0862354, lng: -50.1182784, color: "#f59e0b" },
    { id: 47, nome: "Zilda Arns", bairro: "Pq N. Sra. Das Graças", endereco: "Rua Aguinaldo Guimarães da Cunha, s/n", vacina: true, ecg: false, dentista: true, periodo: "Manhã", ramal: "4521", lat: -25.0585141, lng: -50.1633409, color: "#8b5cf6" }
];


const upaUnidades = [
    { id: 1, nome: "UPA Uvaranas", tipo: "UPA", endereco: "Avenida General Carlos Cavalcanti, 4274 – Uvaranas, Ponta Grossa – PR, 84.030-000", bairro: "Uvaranas", lat: -25.0910575, lng: -50.1109483, periodo: "24h" },
    { id: 2, nome: "UPA Santana", tipo: "UPA", endereco: "Rua Dr. Paula Xavier, s/n – Centro, Ponta Grossa – PR, 84.040-120", bairro: "Centro", lat: -25.102523, lng: -50.1608855, periodo: "24h" },
    { id: 3, nome: "UPA Santa Paula", tipo: "UPA", endereco: "Rua Nicolau Kluppel Neto, 1645 – Santa Paula, Ponta Grossa – PR", bairro: "Santa Paula", lat: -25.102144, lng: -50.201616, periodo: "24h" }
];

const cityBounds = {
    north: -25.0300,
    south: -25.1850,
    east: -50.0700,
    west: -50.2800
};


function generateVoronoiCells() {
    console.log('Gerando áreas de cobertura Voronoi...');
    
    const allUnits = [...ubsUnidades, ...upaUnidades];
    const bbox = [cityBounds.west, cityBounds.south, cityBounds.east, cityBounds.north];
    

    const cellSize = 0.003; 
    const cells = {};
    

    for (let lng = bbox[0]; lng < bbox[2]; lng += cellSize) {
        for (let lat = bbox[1]; lat < bbox[3]; lat += cellSize) {
            const gridPoint = turf.point([lng, lat]);
            

            let nearestUnit = null;
            let minDistance = Infinity;
            
            allUnits.forEach(unit => {
                const unitPoint = turf.point([unit.lng, unit.lat]);
                const distance = turf.distance(gridPoint, unitPoint, { units: 'kilometers' });
                
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestUnit = unit;
                }
            });
            
            if (nearestUnit) {
                const unitId = nearestUnit.id;
                
                if (!cells[unitId]) {
                    cells[unitId] = {
                        id: nearestUnit.id,
                        nome: nearestUnit.nome,
                        color: nearestUnit.color || '#3b82f6',
                        tipo: nearestUnit.tipo || 'UBS',
                        coords: []
                    };
                }
                

                cells[unitId].coords.push([lat, lng]);
                cells[unitId].coords.push([lat + cellSize, lng]);
                cells[unitId].coords.push([lat + cellSize, lng + cellSize]);
                cells[unitId].coords.push([lat, lng + cellSize]);
            }
        }
    }
    
    return cells;
}


function getUnitInfo(unit) {
    let services = [];
    if (unit.vacina) services.push("💉 Vacinação");
    if (unit.ecg) services.push("❤️ ECG");
    if (unit.dentista) services.push("🦷 Dentista");
    if (services.length === 0) services.push("⚠️ Serviços limitados");
    
    return `<div class="unit-popup">
        <h3>${unit.nome}</h3>
        <p><strong>📍 Bairro:</strong> ${unit.bairro}</p>
        <p><strong>🏠 Endereço:</strong> ${unit.endereco}</p>
        <p><strong>⏰ Período:</strong> ${unit.periodo}</p>
        <p><strong>🏥 Serviços:</strong> ${services.join(', ')}</p>
    </div>`;
}


function getUPAInfo(upa) {
    return `<div class="unit-popup">
        <h3 style="color: #dc2626;">🚑 ${upa.nome}</h3>
        <p><strong>📍 Bairro:</strong> ${upa.bairro}</p>
        <p><strong>🏠 Endereço:</strong> ${upa.endereco}</p>
        <p><strong>⏰ Funcionamento:</strong> ${upa.periodo}</p>
        <p style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #e5e7eb; color: #dc2626; font-weight: bold;">
            🏥 Unidade de Pronto Atendimento 24h
        </p>
    </div>`;
}

let map;


function createHospitalIcon() {
    return L.divIcon({
        html: `<div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); border: 3px solid white;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2v20M2 12h20M6 8h12v8H6z M9 12h6M12 9v6"></path>
            </svg>
        </div>`,
        className: 'hospital-icon',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });
}


function initMap() {
    console.log('Iniciando mapa...');
    map = L.map('map').setView([-25.138488, -50.242180], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
        minZoom: 10
    }).addTo(map);


    ubsUnidades.forEach(unidade => {
        const marker = L.circleMarker([unidade.lat, unidade.lng], {
            radius: 10,
            fillColor: unidade.color,
            color: '#fff',
            weight: 3,
            opacity: 1,
            fillOpacity: 0.95,
            zIndex: 1000
        }).addTo(map);

        marker.bindPopup(getUnitInfo(unidade));

        marker.on('mouseover', function() {
            this.setRadius(13);
            this.openPopup();
        });
        marker.on('mouseout', function() {
            this.setRadius(10);
            this.closePopup();
        });
    });


    upaUnidades.forEach(upa => {
        const marker = L.marker([upa.lat, upa.lng], {
            icon: createHospitalIcon(),
            zIndex: 1001
        }).addTo(map);

        marker.bindPopup(getUPAInfo(upa));

        marker.on('mouseover', function() {
            this.openPopup();
        });
        marker.on('mouseout', function() {
            this.closePopup();
        });
    });


    document.getElementById('total-units').textContent = ubsUnidades.length + upaUnidades.length;
    document.getElementById('total-areas').textContent = ubsUnidades.length + upaUnidades.length;
}


document.addEventListener('DOMContentLoaded', function() {
    initMap();
    feather.replace();
});

