class UnidadesProximas extends HTMLElement {
    connectedCallback() {
        console.log('✓ UnidadesProximas connectedCallback chamado');
        
        // Cria a estrutura HTML sem Shadow DOM (para compatibilidade com Leaflet)
        this.innerHTML = `
            <style>
                .unidades-proximas-section {
                    margin: 4rem 0;
                    position: relative;
                    padding: 3rem 0;
                }
                
                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 2rem;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .header-buttons {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                }
                
                .address-search-container {
                    display: flex;
                    gap: 0.75rem;
                    margin-top: 1.5rem;
                    flex-wrap: wrap;
                }
                
                .address-input {
                    flex: 1;
                    min-width: 250px;
                    padding: 0.75rem 1rem;
                    border: 2px solid #e5e7eb;
                    border-radius: 0.5rem;
                    font-size: 0.95rem;
                    transition: all 0.2s;
                }
                
                .address-input:focus {
                    outline: none;
                    border-color: #0F6BFF;
                    box-shadow: 0 0 0 3px rgba(15, 107, 255, 0.1);
                }
                
                .search-address-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    text-decoration: none;
                    font-weight: 600;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
                    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
                }
                
                .search-address-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
                }
                
                .search-address-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }
                
                .search-address-btn svg {
                    width: 20px;
                    height: 20px;
                }
                
                .section-title {
                    font-size: 2rem;
                    font-weight: 800;
                    color: #1a1f3a;
                    position: relative;
                    display: inline-block;
                }
                
                .section-title::after {
                    content: '';
                    position: absolute;
                    bottom: -10px;
                    left: 0;
                    width: 60px;
                    height: 4px;
                    background: linear-gradient(90deg, #0F6BFF, #00D4FF);
                    border-radius: 2px;
                }
                
                .view-full-btn, .nearest-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    text-decoration: none;
                    font-weight: 600;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .view-full-btn {
                    background: linear-gradient(135deg, #0F6BFF 0%, #3b82f6 100%);
                    box-shadow: 0 4px 15px rgba(15, 107, 255, 0.3);
                }
                
                .view-full-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(15, 107, 255, 0.4);
                }

                .nearest-btn {
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
                }

                .nearest-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
                }

                .nearest-btn.loading {
                    opacity: 0.7;
                    cursor: not-allowed;
                }
                
                .view-full-btn svg, .nearest-btn svg {
                    width: 20px;
                    height: 20px;
                }

                /* Modal Styles */
                .modal {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.6);
                    z-index: 1000;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease;
                }

                .modal.active {
                    display: flex;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                .modal-content {
                    background: white;
                    border-radius: 1rem;
                    padding: 2rem;
                    max-width: 500px;
                    width: 90%;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
                    animation: slideUp 0.3s ease;
                }

                @keyframes slideUp {
                    from {
                        transform: translateY(20px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }

                .modal-header h3 {
                    margin: 0;
                    font-size: 1.5rem;
                    color: #1a1f3a;
                }

                .modal-close {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #64748b;
                    transition: color 0.2s;
                }

                .modal-close:hover {
                    color: #1a1f3a;
                }

                .unit-card {
                    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
                    border-left: 4px solid #0F6BFF;
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    margin-bottom: 1.5rem;
                }

                .unit-card.upa {
                    background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
                    border-left-color: #ef4444;
                }

                .unit-name {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #1a1f3a;
                    margin-bottom: 0.5rem;
                }

                .unit-type {
                    display: inline-block;
                    background: #0F6BFF;
                    color: white;
                    padding: 0.25rem 0.75rem;
                    border-radius: 9999px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                }

                .unit-card.upa .unit-type {
                    background: #ef4444;
                }

                .unit-info {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    font-size: 0.95rem;
                }

                .unit-info-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.75rem;
                    color: #475569;
                }

                .unit-info-item strong {
                    color: #1a1f3a;
                    min-width: 80px;
                }

                .distance-highlight {
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: #10b981;
                    margin: 1rem 0;
                    text-align: center;
                    background: #f0fdf4;
                    padding: 1rem;
                    border-radius: 0.5rem;
                }

                .distance-highlight.upa {
                    color: #ef4444;
                    background: #fef2f2;
                }

                .modal-actions {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1.5rem;
                }

                .modal-actions button {
                    flex: 1;
                    padding: 0.75rem 1rem;
                    border: none;
                    border-radius: 0.5rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .modal-actions .primary {
                    background: linear-gradient(135deg, #0F6BFF 0%, #3b82f6 100%);
                    color: white;
                }

                .modal-actions .primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(15, 107, 255, 0.3);
                }

                .modal-actions .secondary {
                    background: #e2e8f0;
                    color: #1a1f3a;
                }

                .modal-actions .secondary:hover {
                    background: #cbd5e1;
                }

                .error-message {
                    background: #fee2e2;
                    color: #991b1b;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    border-left: 4px solid #ef4444;
                    margin-bottom: 1rem;
                }
                
                .map-container {
                    background: white;
                    border-radius: 1rem;
                    padding: 1.5rem;
                    border: 1px solid #e5e7eb;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
                    overflow: hidden;
                }
                
                #mapa-unidades {
                    width: 100%;
                    height: 400px;
                    border-radius: 0.5rem;
                }
                
                .section-subtitle {
                    color: #64748b;
                    font-size: 1.05rem;
                    margin-top: 1.5rem;
                }
                
                @media (max-width: 768px) {
                    .unidades-proximas-section {
                        padding: 2rem 0;
                        margin: 2rem 0;
                    }
                    
                    .section-title {
                        font-size: 1.5rem;
                    }
                    
                    .section-subtitle {
                        font-size: 0.95rem;
                    }
                    
                    .section-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 1.5rem;
                    }
                    
                    .header-buttons {
                        width: 100%;
                        flex-direction: column;
                    }
                    
                    .view-full-btn, .nearest-btn {
                        width: 100%;
                        justify-content: center;
                        padding: 0.75rem 1rem;
                    }
                    
                    .address-search-container {
                        flex-direction: column;
                        width: 100%;
                        margin-top: 1rem;
                    }
                    
                    .address-input {
                        width: 100%;
                        min-width: unset;
                        padding: 0.75rem 1rem;
                        font-size: 0.95rem;
                    }
                    
                    .search-address-btn {
                        width: 100%;
                        justify-content: center;
                        padding: 0.75rem 1rem;
                    }
                    
                    .map-container {
                        padding: 1.5rem;
                    }
                    
                    #mapa-unidades {
                        height: 300px;
                    }
                    
                    .modal-content {
                        padding: 1.5rem;
                        max-width: 95vw;
                    }
                    
                    .unit-card {
                        padding: 1.25rem;
                        margin-bottom: 1rem;
                    }
                    
                    .unit-name {
                        font-size: 1.1rem;
                    }
                    
                    .distance-highlight {
                        font-size: 1.5rem;
                        padding: 0.75rem;
                    }
                    
                    .modal-actions {
                        flex-direction: column;
                        gap: 0.75rem;
                    }
                }
                
                @media (max-width: 480px) {
                    .unidades-proximas-section {
                        margin: 1rem 0;
                        padding: 1rem 0;
                    }
                    
                    .section-title {
                        font-size: 1.25rem;
                    }
                    
                    .section-subtitle {
                        font-size: 0.85rem;
                    }
                    
                    .section-title::after {
                        bottom: -8px;
                        height: 3px;
                        width: 40px;
                    }
                    
                    .section-header {
                        margin-bottom: 1.5rem;
                    }
                    
                    .header-buttons {
                        width: 100%;
                        gap: 0.75rem;
                    }
                    
                    .view-full-btn, .nearest-btn {
                        width: 100%;
                        padding: 0.65rem 0.75rem;
                        font-size: 0.85rem;
                        justify-content: center;
                    }
                    
                    .view-full-btn svg, .nearest-btn svg {
                        width: 18px;
                        height: 18px;
                    }
                    
                    .address-search-container {
                        flex-direction: column;
                        gap: 0.5rem;
                        margin-top: 1rem;
                        width: 100%;
                    }
                    
                    .address-input {
                        width: 100%;
                        padding: 0.65rem 0.75rem;
                        font-size: 0.85rem;
                    }
                    
                    .search-address-btn {
                        width: 100%;
                        padding: 0.65rem 0.75rem;
                        font-size: 0.85rem;
                        justify-content: center;
                    }
                    
                    .search-address-btn svg {
                        width: 18px;
                        height: 18px;
                    }
                    
                    .map-container {
                        padding: 1rem;
                    }
                    
                    #mapa-unidades {
                        height: 200px;
                    }
                    
                    .modal {
                        align-items: flex-end;
                    }
                    
                    .modal-content {
                        padding: 1.25rem;
                        max-width: 100vw;
                        width: 100%;
                        border-radius: 1rem 1rem 0 0;
                        max-height: 80vh;
                        overflow-y: auto;
                    }
                    
                    .modal-header {
                        margin-bottom: 1.25rem;
                    }
                    
                    .modal-header h3 {
                        font-size: 1.25rem;
                    }
                    
                    .unit-card {
                        padding: 1rem;
                        margin-bottom: 0.75rem;
                        border-left-width: 3px;
                    }
                    
                    .unit-name {
                        font-size: 1rem;
                        margin-bottom: 0.5rem;
                    }
                    
                    .unit-type {
                        font-size: 0.65rem;
                        padding: 0.25rem 0.5rem;
                    }
                    
                    .unit-info {
                        gap: 0.5rem;
                        font-size: 0.85rem;
                    }
                    
                    .distance-highlight {
                        font-size: 1.25rem;
                        padding: 0.65rem;
                        margin: 0.75rem 0;
                    }
                    
                    .modal-actions {
                        flex-direction: column;
                        gap: 0.5rem;
                        margin-top: 1rem;
                    }
                    
                    .modal-actions button {
                        padding: 0.65rem 0.75rem;
                        font-size: 0.85rem;
                    }
                }
                
                @media (max-width: 360px) {
                    .section-title {
                        font-size: 1.1rem;
                    }
                    
                    .view-full-btn, .nearest-btn {
                        padding: 0.55rem 0.5rem;
                        font-size: 0.8rem;
                    }
                    
                    .modal-content {
                        padding: 1rem;
                    }
                    
                    .unit-card {
                        padding: 0.85rem;
                    }
                    
                    #mapa-unidades {
                        height: 150px;
                    }
                }
            </style>
            
            <div class="unidades-proximas-section">
                <div class="section-header">
                    <div>
                        <h2 class="section-title">Unidades Próximas de Você</h2>
                        <p class="section-subtitle">Mapa interativo com localização das unidades de saúde</p>
                    </div>
                    <div class="header-buttons">
                        <button class="nearest-btn" id="nearestUBSBtn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="1"></circle>
                                <path d="M12 8v-6"></path>
                                <path d="M8 10c-1.108-1.108-1.857-2.243-1.857-3.536C6.143 3.642 8.686 2 12 2c3.314 0 5.857 1.642 5.857 4.464 0 1.293-.749 2.428-1.857 3.536"></path>
                                <path d="M12 8v8m0 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"></path>
                            </svg>
                            UBS Próxima
                        </button>
                        <button class="nearest-btn nearest-upa-btn" id="nearestUPABtn" style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="1"></circle>
                                <path d="M12 8v-6"></path>
                                <path d="M8 10c-1.108-1.108-1.857-2.243-1.857-3.536C6.143 3.642 8.686 2 12 2c3.314 0 5.857 1.642 5.857 4.464 0 1.293-.749 2.428-1.857 3.536"></path>
                                <path d="M12 8v8m0 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"></path>
                            </svg>
                            UPA Próxima
                        </button>
                        <a href="mapa.html" class="view-full-btn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            Ver Mapa Completo
                        </a>
                    </div>
                </div>

                <div class="address-search-container">
                    <input type="text" id="addressInput" placeholder="Digite um endereço (ex: Av. Brasil, 100 ou Rua das Flores)" class="address-input">
                    <button id="searchAddressBtn" class="search-address-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                        Buscar Endereço
                    </button>
                </div>
                
                <div class="map-container">
                    <div id="mapa-unidades"></div>
                </div>
            </div>

            <!-- Modal para mostrar unidade mais próxima -->
            <div class="modal" id="nearestModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 id="modalTitle">Unidade Mais Próxima</h3>
                        <button class="modal-close" id="modalClose">&times;</button>
                    </div>
                    <div id="modalBody"></div>
                </div>
            </div>
        `;
        
        // Carrega o mapa após o DOM estar pronto
        this.loadMap();

        // Setup de listeners para geolocalização
        const nearestUBSBtn = this.querySelector('#nearestUBSBtn');
        const nearestUPABtn = this.querySelector('#nearestUPABtn');
        const modalClose = this.querySelector('#modalClose');
        const modal = this.querySelector('#nearestModal');
        const searchAddressBtn = this.querySelector('#searchAddressBtn');
        const addressInput = this.querySelector('#addressInput');

        if (nearestUBSBtn) {
            nearestUBSBtn.addEventListener('click', () => {
                console.log('Botão UBS clicado');
                this.findNearestUBS();
            });
        }

        if (nearestUPABtn) {
            nearestUPABtn.addEventListener('click', () => {
                console.log('Botão UPA clicado');
                this.findNearestUPA();
            });
        }

        if (searchAddressBtn) {
            searchAddressBtn.addEventListener('click', () => {
                console.log('Botão de busca por endereço clicado');
                this.searchByAddress();
            });
        }

        if (addressInput) {
            addressInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    console.log('Enter pressionado no input de endereço');
                    this.searchByAddress();
                }
            });
        }

        if (modalClose) {
            modalClose.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }
        
        console.log('✓ connectedCallback finalizado, listeners configurados');
    }
    
    loadMap() {
        console.log('✓ loadMap chamado - aguardando Leaflet');
        // Aguarda o Leaflet ser carregado
        const checkLeaflet = setInterval(() => {
            if (typeof L !== 'undefined') {
                clearInterval(checkLeaflet);
                console.log('✓ Leaflet encontrado, iniciando mapa');
                this.initMap();
            }
        }, 100);
        
        // Timeout de segurança
        setTimeout(() => {
            clearInterval(checkLeaflet);
            if (typeof L === 'undefined') {
                console.error('✗ Timeout: Leaflet não foi carregado após 5 segundos');
            }
        }, 5000);
    }
    
    initMap() {
        console.log('✓ initMap chamado');
        const mapContainer = document.getElementById('mapa-unidades');
        console.log('Mapa container:', mapContainer);
        if (!mapContainer) {
            console.error('✗ Elemento #mapa-unidades não encontrado!');
            return;
        }
        
        // Centro da cidade de Ponta Grossa
        const center = [-25.138488, -50.242180];
        
        // Cria o mapa
        console.log('Criando mapa com Leaflet...');
        const map = L.map('mapa-unidades').setView(center, 12);
        console.log('✓ Mapa criado com sucesso');
        
        // Adiciona o tile layer do OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);
        
        // Carrega os dados de unidades
        this.addUnitsToMap(map);
    }
    
    addUnitsToMap(map) {
        // Dados das 47 UBS
        const ubsUnidades = [
            { id: 1, nome: "Abrahão Federmann", lat: -25.0883606, lng: -50.1435159, tipo: "UBS" },
            { id: 2, nome: "Adam Polan", lat: -25.068633, lng: -50.1762305, tipo: "UBS" },
            { id: 3, nome: "Adão Ademar Andrade", lat: -25.098774, lng: -50.187086, tipo: "UBS" },
            { id: 4, nome: "Adilson Baggio", lat: -25.0987748, lng: -50.1870865, tipo: "UBS" },
            { id: 5, nome: "Agostinho Brenner", lat: -25.1362692, lng: -50.1596708, tipo: "UBS" },
            { id: 6, nome: "Alfredo Levandovski", lat: -25.1284257, lng: -50.2150305, tipo: "UBS" },
            { id: 7, nome: "Aluízio Grochoski", lat: -25.1144266, lng: -50.1484859, tipo: "UBS" },
            { id: 8, nome: "Ambrosio Bricailo", lat: -25.0695016, lng: -50.2053617, tipo: "UBS" },
            { id: 9, nome: "Antero Machado de Mello", lat: -25.0712259, lng: -50.1237873, tipo: "UBS" },
            { id: 10, nome: "Antônio Horácio Carlos de Miranda", lat: -25.0513209, lng: -50.1453537, tipo: "UBS" },
            { id: 11, nome: "Antônio Russo", lat: -25.0816576, lng: -50.169207, tipo: "UBS" },
            { id: 12, nome: "Antônio Saliba", lat: -25.1165091, lng: -50.1185003, tipo: "UBS" },
            { id: 13, nome: "Antônio Schwanzee", lat: -25.0666729, lng: -50.211814, tipo: "UBS" },
            { id: 14, nome: "Aurélio Grott", lat: -25.0636402, lng: -50.1905085, tipo: "UBS" },
            { id: 15, nome: "Carlos Dezaunet Neto", lat: -25.1060537, lng: -50.2262071, tipo: "UBS" },
            { id: 16, nome: "Carlos Ribeiro de Macedo", lat: -25.0695465, lng: -50.2150324, tipo: "UBS" },
            { id: 17, nome: "Cézar Rocha Milleo", lat: -25.0846674, lng: -50.2003776, tipo: "UBS" },
            { id: 18, nome: "Cleon Francisco Carlos de Macedo", lat: -25.088998, lng: -50.0937606, tipo: "UBS" },
            { id: 19, nome: "Clyceu Carlos de Macedo", lat: -25.1163927, lng: -50.2081645, tipo: "UBS" },
            { id: 20, nome: "Cyro de Lima Garcia", lat: -25.126373, lng: -50.1567813, tipo: "UBS" },
            { id: 21, nome: "Egon Roskamp", lat: -25.0965181, lng: -50.2058872, tipo: "UBS" },
            { id: 22, nome: "Eugênio José Bocchi", lat: -25.0723648, lng: -50.1840693, tipo: "UBS" },
            { id: 23, nome: "Ezebedeu Linhares", lat: -25.137852, lng: -50.1440709, tipo: "UBS" },
            { id: 24, nome: "Félix Vianna", lat: -25.0906296, lng: -50.1870622, tipo: "UBS" },
            { id: 25, nome: "Horácio Droppa", lat: -25.1199569, lng: -50.105237, tipo: "UBS" },
            { id: 26, nome: "Jamil Mussi", lat: -25.0855294, lng: -50.209503, tipo: "UBS" },
            { id: 27, nome: "Javier Cejas Arzabe", lat: -25.0573573, lng: -50.2227946, tipo: "UBS" },
            { id: 28, nome: "Jayme Gusman", lat: -25.110742, lng: -50.1634866, tipo: "UBS" },
            { id: 29, nome: "José Bueno", lat: -25.0635215, lng: -50.2013529, tipo: "UBS" },
            { id: 30, nome: "José Carlos Araújo", lat: -25.1780598, lng: -50.1449475, tipo: "UBS" },
            { id: 31, nome: "Júlio de Azevedo", lat: -25.0750261, lng: -50.1502122, tipo: "UBS" },
            { id: 32, nome: "Lauro Müller", lat: -25.148838, lng: -50.1669779, tipo: "UBS" },
            { id: 33, nome: "Louis Atanásio Charles Büron", lat: -25.0413765, lng: -50.2479864, tipo: "UBS" },
            { id: 34, nome: "Lubomir Antônio Urban", lat: -25.0789518, lng: -50.1334014, tipo: "UBS" },
            { id: 35, nome: "Luiz Conrado Mansani", lat: -25.0916973, lng: -50.1165346, tipo: "UBS" },
            { id: 36, nome: "Luiz Fernando Cajado de Oliveira Braga", lat: -25.0444287, lng: -50.2653642, tipo: "UBS" },
            { id: 37, nome: "Madre Josefa Stenmanns", lat: -25.0987486, lng: -50.1414118, tipo: "UBS" },
            { id: 38, nome: "Nilton Luiz de Castro", lat: -25.1074933, lng: -50.1090829, tipo: "UBS" },
            { id: 39, nome: "Ottoniel Pimentel dos Santos", lat: -25.128586, lng: -50.146403, tipo: "UBS" },
            { id: 40, nome: "Paulo Madureira Novaes", lat: -25.0870618, lng: -50.1985952, tipo: "UBS" },
            { id: 41, nome: "Roberto de Jesus Portela", lat: -25.1030381, lng: -50.1759678, tipo: "UBS" },
            { id: 42, nome: "Romulo Pazzinato", lat: -25.0820992, lng: -50.1890972, tipo: "UBS" },
            { id: 43, nome: "Sady de Macedo Silveira", lat: -25.1053007, lng: -50.1603172, tipo: "UBS" },
            { id: 44, nome: "Santo Domingo Zampier", lat: -25.0572527, lng: -50.1072953, tipo: "UBS" },
            { id: 45, nome: "Sharise Angélica Arruda", lat: -25.1335856, lng: -50.1175446, tipo: "UBS" },
            { id: 46, nome: "Silas Sallen", lat: -25.0862354, lng: -50.1182784, tipo: "UBS" },
            { id: 47, nome: "Zilda Arns", lat: -25.0585141, lng: -50.1633409, tipo: "UBS" }
        ];
        
        // Dados das 3 UPA
        const upaUnidades = [
            { id: 1, nome: "UPA Uvaranas", lat: -25.0910575, lng: -50.1109483, tipo: "UPA" },
            { id: 2, nome: "UPA Santana", lat: -25.102523, lng: -50.1608855, tipo: "UPA" },
            { id: 3, nome: "UPA Santa Paula", lat: -25.102144, lng: -50.201616, tipo: "UPA" }
        ];
        
        // Ícone customizado para UBS
        const ubsIcon = L.divIcon({
            html: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="14" fill="#0F6BFF" stroke="white" stroke-width="2"/><path d="M16 9v14M9 16h14" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16],
            className: 'ubs-marker'
        });
        
        // Ícone customizado para UPA
        const upaIcon = L.divIcon({
            html: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="14" fill="#ef4444" stroke="white" stroke-width="2"/><path d="M16 9l3.5 10h10.5l-8.5 6.5 3.5 10-10-7.5-10 7.5 3.5-10-8.5-6.5h10.5z" fill="white"/></svg>',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16],
            className: 'upa-marker'
        });
        
        // Adiciona marcadores das UBS
        ubsUnidades.forEach(unit => {
            L.marker([unit.lat, unit.lng], { icon: ubsIcon })
                .bindPopup(`<strong>${unit.nome}</strong><br><small>UBS - Unidade Básica de Saúde</small>`)
                .addTo(map);
        });
        
        // Adiciona marcadores das UPA
        upaUnidades.forEach(unit => {
            L.marker([unit.lat, unit.lng], { icon: upaIcon })
                .bindPopup(`<strong>${unit.nome}</strong><br><small>UPA - Unidade de Pronto Atendimento (24h)</small>`)
                .addTo(map);
        });
    }

    findNearestUBS() {
        console.log('findNearestUBS iniciado');
        const nearestBtn = this.querySelector('#nearestUBSBtn');
        const modal = this.querySelector('#nearestModal');
        const modalBody = this.querySelector('#modalBody');
        const modalTitle = this.querySelector('#modalTitle');

        console.log('Elementos encontrados:', {nearestBtn, modal, modalBody, modalTitle});

        if (!nearestBtn || !modal || !modalBody || !modalTitle) {
            console.error('Elementos do DOM não encontrados!');
            return;
        }

        nearestBtn.classList.add('loading');
        nearestBtn.disabled = true;
        nearestBtn.innerHTML = '<i data-feather="loader"></i> Aguarde...';
        feather.replace();

        if (!navigator.geolocation) {
            console.error('Navegador não suporta geolocalização');
            modalBody.innerHTML = `
                <div style="padding: 2rem; background: #fee2e2; border-left: 4px solid #ef4444; border-radius: 0.5rem;">
                    <strong style="color: #dc2626;">Erro:</strong> Seu navegador não suporta geolocalização.
                </div>
            `;
            modalTitle.textContent = 'UBS Mais Próxima';
            modal.classList.add('active');
            nearestBtn.classList.remove('loading');
            nearestBtn.disabled = false;
            nearestBtn.innerHTML = '<i data-feather="navigation"></i> UBS Próxima';
            feather.replace();
            return;
        }

        console.log('Solicitando permissão de geolocalização...');
        // Mostrar feedback imediato
        modalBody.innerHTML = `
            <div style="padding: 2rem; text-align: center;">
                <p style="font-size: 1rem; color: #475569; margin-bottom: 1rem;">Solicitando sua localização...</p>
                <p style="font-size: 0.85rem; color: #64748b;">Você receberá um aviso do navegador para permitir acesso à sua localização.</p>
            </div>
        `;
        modalTitle.textContent = 'Localizando você...';
        modal.classList.add('active');

        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('Localização obtida:', position);
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;

                console.log(`Posição do usuário: ${userLat}, ${userLng}`);

                const nearest = this.calculateNearestUBS(userLat, userLng);
                
                this.showNearestResult(nearest, userLat, userLng, modal, modalBody, 'UBS Mais Próxima', modalTitle);
                
                nearestBtn.classList.remove('loading');
                nearestBtn.disabled = false;
                nearestBtn.innerHTML = '<i data-feather="navigation"></i> UBS Próxima';
                feather.replace();
            },
            (error) => {
                console.error('Erro de geolocalização:', error);
                console.error('Error code:', error.code);
                console.error('Error message:', error.message);
                
                let errorMsg = '';
                let errorTitle = 'UBS Mais Próxima';
                
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                    case 1:
                        errorMsg = '<strong>Localização não permitida</strong><br><br>Você precisa permitir acesso à localização.<br><br><strong>Como fazer:</strong><br>1. Abra as configurações de privacidade do seu navegador<br>2. Procure por "Localização" ou "Location"<br>3. Dê permissão para este site';
                        break;
                    case error.POSITION_UNAVAILABLE:
                    case 2:
                        errorMsg = 'Informações de localização não disponíveis no momento. Verifique se o GPS está ativado em seu dispositivo.';
                        break;
                    case error.TIMEOUT:
                    case 3:
                        errorMsg = 'A localização demorou muito para ser obtida. Tente novamente em um local com melhor recepção de GPS.';
                        break;
                    default:
                        errorMsg = `Erro ao obter localização: ${error.message}`;
                }

                modalBody.innerHTML = `
                    <div style="padding: 2rem; background: #fee2e2; border-left: 4px solid #ef4444; border-radius: 0.5rem;">
                        <p style="color: #dc2626; margin: 0;">${errorMsg}</p>
                    </div>
                `;
                modalTitle.textContent = errorTitle;
                
                nearestBtn.classList.remove('loading');
                nearestBtn.disabled = false;
                nearestBtn.innerHTML = '<i data-feather="navigation"></i> UBS Próxima';
                feather.replace();
            },
            {
                enableHighAccuracy: true,
                timeout: 30000,
                maximumAge: 0
            }
        );
    }

    findNearestUPA() {
        console.log('findNearestUPA iniciado');
        const nearestBtn = this.querySelector('#nearestUPABtn');
        const modal = this.querySelector('#nearestModal');
        const modalBody = this.querySelector('#modalBody');
        const modalTitle = this.querySelector('#modalTitle');

        console.log('Elementos encontrados:', {nearestBtn, modal, modalBody, modalTitle});

        if (!nearestBtn || !modal || !modalBody || !modalTitle) {
            console.error('Elementos do DOM não encontrados!');
            return;
        }

        nearestBtn.classList.add('loading');
        nearestBtn.disabled = true;
        nearestBtn.innerHTML = '<i data-feather="loader"></i> Aguarde...';
        feather.replace();

        if (!navigator.geolocation) {
            console.error('Navegador não suporta geolocalização');
            modalBody.innerHTML = `
                <div style="padding: 2rem; background: #fee2e2; border-left: 4px solid #ef4444; border-radius: 0.5rem;">
                    <strong style="color: #dc2626;">Erro:</strong> Seu navegador não suporta geolocalização.
                </div>
            `;
            modalTitle.textContent = 'UPA Mais Próxima';
            modal.classList.add('active');
            nearestBtn.classList.remove('loading');
            nearestBtn.disabled = false;
            nearestBtn.innerHTML = '<i data-feather="alert-circle"></i> UPA Próxima';
            feather.replace();
            return;
        }

        console.log('Solicitando permissão de geolocalização...');
        // Mostrar feedback imediato
        modalBody.innerHTML = `
            <div style="padding: 2rem; text-align: center;">
                <p style="font-size: 1rem; color: #475569; margin-bottom: 1rem;">Solicitando sua localização...</p>
                <p style="font-size: 0.85rem; color: #64748b;">Você receberá um aviso do navegador para permitir acesso à sua localização.</p>
            </div>
        `;
        modalTitle.textContent = 'Localizando você...';
        modal.classList.add('active');

        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('Localização obtida:', position);
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;

                console.log(`Posição do usuário: ${userLat}, ${userLng}`);

                const nearest = this.calculateNearestUPA(userLat, userLng);
                
                this.showNearestResult(nearest, userLat, userLng, modal, modalBody, 'UPA Mais Próxima', modalTitle);
                
                nearestBtn.classList.remove('loading');
                nearestBtn.disabled = false;
                nearestBtn.innerHTML = '<i data-feather="alert-circle"></i> UPA Próxima';
                feather.replace();
            },
            (error) => {
                console.error('Erro de geolocalização:', error);
                console.error('Error code:', error.code);
                console.error('Error message:', error.message);
                
                let errorMsg = '';
                let errorTitle = 'UPA Mais Próxima';
                
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                    case 1:
                        errorMsg = '<strong>Localização não permitida</strong><br><br>Você precisa permitir acesso à localização.<br><br><strong>Como fazer:</strong><br>1. Abra as configurações de privacidade do seu navegador<br>2. Procure por "Localização" ou "Location"<br>3. Dê permissão para este site';
                        break;
                    case error.POSITION_UNAVAILABLE:
                    case 2:
                        errorMsg = 'Informações de localização não disponíveis no momento. Verifique se o GPS está ativado em seu dispositivo.';
                        break;
                    case error.TIMEOUT:
                    case 3:
                        errorMsg = 'A localização demorou muito para ser obtida. Tente novamente em um local com melhor recepção de GPS.';
                        break;
                    default:
                        errorMsg = `Erro ao obter localização: ${error.message}`;
                }

                modalBody.innerHTML = `
                    <div style="padding: 2rem; background: #fee2e2; border-left: 4px solid #ef4444; border-radius: 0.5rem;">
                        <p style="color: #dc2626; margin: 0;">${errorMsg}</p>
                    </div>
                `;
                modalTitle.textContent = errorTitle;
                
                nearestBtn.classList.remove('loading');
                nearestBtn.disabled = false;
                nearestBtn.innerHTML = '<i data-feather="alert-circle"></i> UPA Próxima';
                feather.replace();
            },
            {
                enableHighAccuracy: true,
                timeout: 30000,
                maximumAge: 0
            }
        );
    }

    calculateNearest(userLat, userLng) {
        // Dados das 47 UBS
        const ubsUnidades = [
            { id: 1, nome: "Abrahão Federmann", bairro: "Centro", endereco: "Rua Quinze De Setembro – em Frente 260", ramal: "3220-1020", lat: -25.0883606, lng: -50.1435159, tipo: "UBS" },
            { id: 2, nome: "Adam Polan", bairro: "Oficinas", endereco: "Rua Alberto De Oliveira", ramal: "3220-1020", lat: -25.068633, lng: -50.1762305, tipo: "UBS" },
            { id: 3, nome: "Adão Ademar Andrade", bairro: "Oficinas", endereco: "Rua Luís Carlos Prestes Esq.C/ Rua Ernesto Che Guevara ", ramal: "3220-1020", lat: -25.098774, lng: -50.187086, tipo: "UBS" },
            { id: 4, nome: "Adilson Baggio", bairro: "Oficinas", endereco: "Rua Pinhalão, 20", ramal: "3220-1020", lat: -25.0987748, lng: -50.1870865, tipo: "UBS" },
            { id: 5, nome: "Agostinho Brenner", bairro: "Centro", endereco: "Rua Freud, S/N° (Frente Ao Corpo De Bombeiros)", ramal: "3901-3104", lat: -25.1362692, lng: -50.1596708, tipo: "UBS" },
            { id: 6, nome: "Alfredo Levandovski", bairro: "São João", endereco: "Avenida General Aldo Bonde Esq. C/ Rua Lagoa Dourada", ramal: "3901-3401", lat: -25.1284257, lng: -50.2150305, tipo: "UBS" },
            { id: 7, nome: "Aluízio Grochoski", bairro: "Orfãs", endereco: "Rua Teodoro Sampaio", ramal: "3901-3402", lat: -25.1144266, lng: -50.1484859, tipo: "UBS" },
            { id: 8, nome: "Ambrosio Bricailo", bairro: "Contorno", endereco: "Rua Ney Luiz Ribeiro S/Nº Frente Cmei Padre Ezequiel Belquio", ramal: "3901-3403", lat: -25.0695016, lng: -50.2053617, tipo: "UBS" },
            { id: 9, nome: "Antero Machado de Mello", bairro: "Olaria", endereco: "Rua Darcy Taques De Araújo Esq. Rua Neusa Rodrigues De Oliveira ", ramal: "3901-3404", lat: -25.0712259, lng: -50.1237873, tipo: "UBS" },
            { id: 10, nome: "Antônio Horácio Carlos de Miranda", bairro: "Piraí", endereco: "Rua Gaza, 610 Esq. C/Rua Seon", ramal: "3901-3501", lat: -25.0513209, lng: -50.1453537, tipo: "UBS" },
            { id: 11, nome: "Antônio Russo", bairro: "Centro", endereco: "Rua Saldanha Da Gama S/N (Quase Esq. C/ Avenida Balduíno Taques)\n", ramal: "3901-3102", lat: -25.0816576, lng: -50.169207, tipo: "UBS" },
            { id: 12, nome: "Antônio Saliba", bairro: "Neves", endereco: "R. Siqueira Campos, 5425", ramal: "3901-3502", lat: -25.1165091, lng: -50.1185003, tipo: "UBS" },
            { id: 13, nome: "Antônio Schwanzee", bairro: "Contorno", endereco: "Rua São Mauro, 229", ramal: "3901-3405", lat: -25.0666729, lng: -50.211814, tipo: "UBS" },
            { id: 14, nome: "Aurélio Grott", bairro: "Vila Paraná", endereco: "Rua Professor Fábio Fanucchi Esq. Rua Prefeito José Hoffmann", ramal: "3901-3406", lat: -25.0636402, lng: -50.1905085, tipo: "UBS" },
            { id: 15, nome: "Carlos Dezaunet Neto", bairro: "Colônia", endereco: "Rua Professor Plácido Cardon, 745 ", ramal: "3901-3601", lat: -25.1060537, lng: -50.2262071, tipo: "UBS" },
            { id: 16, nome: "Carlos Ribeiro de Macedo", bairro: "Contorno", endereco: "Rua Moacir Lazzarotto De Oliveira, Esq. Rua Arnaldo Szesz", ramal: "3901-3407", lat: -25.0695465, lng: -50.2150324, tipo: "UBS" },
            { id: 17, nome: "Cézar Rocha Milleo", bairro: "Oficinas", endereco: "Rua Ribeirão Claro, S/N° (Esq. Rua Santa Amélia)", ramal: "3901-3304", lat: -25.0846674, lng: -50.2003776, tipo: "UBS" },
            { id: 18, nome: "Cleon Francisco Carlos de Macedo", bairro: "Itaiacoca", endereco: "Rua Adre Denis Quilty S/N (Próx. À Escola)", ramal: "3901-3701", lat: -25.088998, lng: -50.0937606, tipo: "UBS" },
            { id: 19, nome: "Clyceu Carlos de Macedo", bairro: "São João", endereco: "Rua Papoula, S/N° (Próx. À Escola)", ramal: "3901-3408", lat: -25.1163927, lng: -50.2081645, tipo: "UBS" },
            { id: 20, nome: "Cyro de Lima Garcia", bairro: "Orfãs", endereco: "Rua Dom Pedro I(Lado Do Terminal – Antigo Cas)", ramal: "3901-3409", lat: -25.126373, lng: -50.1567813, tipo: "UBS" },
            { id: 21, nome: "Egon Roskamp", bairro: "Contorno", endereco: "Rua Castanheira, 216", ramal: "3901-3410", lat: -25.0965181, lng: -50.2058872, tipo: "UBS" },
            { id: 22, nome: "Eugênio José Bocchi", bairro: "Oficinas", endereco: "Rua Paulo Kloth", ramal: "3901-3305", lat: -25.0723648, lng: -50.1840693, tipo: "UBS" },
            { id: 23, nome: "Ezebedeu Linhares", bairro: "Centro", endereco: "Rua Paulina Oliveira Gomes, S/N", ramal: "3901-3105", lat: -25.137852, lng: -50.1440709, tipo: "UBS" },
            { id: 24, nome: "Félix Vianna", bairro: "Oficinas", endereco: "Rua Paes De Andrade Esq. Rua Fernandes Vieira", ramal: "3901-3306", lat: -25.0906296, lng: -50.1870622, tipo: "UBS" },
            { id: 25, nome: "Horácio Droppa", bairro: "Neves", endereco: "Rua Santa Rosa Esq. Rua Santa Mônica", ramal: "3901-3503", lat: -25.1199569, lng: -50.105237, tipo: "UBS" },
            { id: 26, nome: "Jamil Mussi", bairro: "Contorno", endereco: "Rua Paul Harris, S/N° Lado Da Escola", ramal: "3901-3411", lat: -25.0855294, lng: -50.209503, tipo: "UBS" },
            { id: 27, nome: "Javier Cejas Arzabe", bairro: "Piraí", endereco: "Rua João De Barro", ramal: "3901-3504", lat: -25.0573573, lng: -50.2227946, tipo: "UBS" },
            { id: 28, nome: "Jayme Gusman", bairro: "Orfãs", endereco: "Rua Nilo Peçanha(Praça João Montes Filho)", ramal: "3901-3412", lat: -25.110742, lng: -50.1634866, tipo: "UBS" },
            { id: 29, nome: "José Bueno", bairro: "Vila Paraná", endereco: "Rua David Hilgemberg Júnior Esq/ Rua Alcindo Santana Nunes", ramal: "3901-3413", lat: -25.0635215, lng: -50.2013529, tipo: "UBS" },
            { id: 30, nome: "José Carlos Araújo", bairro: "Umbará", endereco: "Rua 14 Bis, S/N° (Ao Lado Da Escola)", ramal: "3901-3605", lat: -25.1780598, lng: -50.1449475, tipo: "UBS" },
            { id: 31, nome: "Júlio de Azevedo", bairro: "Olaria", endereco: "Rua Desembargador Lauro Lopes Esq. Rua Rocha Pombo", ramal: "3901-3414", lat: -25.0750261, lng: -50.1502122, tipo: "UBS" },
            { id: 32, nome: "Lauro Müller", bairro: "Umbará", endereco: "Rua Tucano S/N", ramal: "3901-3606", lat: -25.148838, lng: -50.1669779, tipo: "UBS" },
            { id: 33, nome: "Louis Atanásio Charles Büron", bairro: "Trindade", endereco: "Rua Izabel Ossowski, 1– Jd. Sta. Edwirges", ramal: "3901-3607", lat: -25.0413765, lng: -50.2479864, tipo: "UBS" },
            { id: 34, nome: "Lubomir Antônio Urban", bairro: "Olaria", endereco: "Rua Washington Luiz, 760", ramal: "3901-3415", lat: -25.0789518, lng: -50.1334014, tipo: "UBS" },
            { id: 35, nome: "Luiz Conrado Mansani", bairro: "Olaria", endereco: "Avenida General Carlos Cavalcanti (Lado Do Terminal – Antigo Cas)", ramal: "3901-3416", lat: -25.0916973, lng: -50.1165346, tipo: "UBS" },
            { id: 36, nome: "Luiz Fernando Cajado de Oliveira Braga", bairro: "Trindade", endereco: "Rua Brasílio Itiberê", ramal: "3901-3608", lat: -25.0444287, lng: -50.2653642, tipo: "UBS" },
            { id: 37, nome: "Madre Josefa Stenmanns", bairro: "Centro", endereco: "Rua Bituruna, S/N – Vila Princesa", ramal: "3901-3106", lat: -25.0987486, lng: -50.1414118, tipo: "UBS" },
            { id: 38, nome: "Nilton Luiz de Castro", bairro: "Neves", endereco: "Rua Alfredo Bochnia S/N (Fundos Da Creche)", ramal: "3901-3505", lat: -25.1074933, lng: -50.1090829, tipo: "UBS" },
            { id: 39, nome: "Ottoniel Pimentel dos Santos", bairro: "Orfãs", endereco: "Rua Desembargador Westphalem, S/N ", ramal: "3901-3417", lat: -25.128586, lng: -50.146403, tipo: "UBS" },
            { id: 40, nome: "Paulo Madureira Novaes", bairro: "Oficinas", endereco: "Rua Lizandro Alves De Araújo Esq. Rua João Amaral de Almeida", ramal: "3901-3307", lat: -25.0870618, lng: -50.1985952, tipo: "UBS" },
            { id: 41, nome: "Roberto de Jesus Portela", bairro: "Orfãs", endereco: "Rua Cruzeiro Do Oeste(Junto À Escola)", ramal: "3901-3418", lat: -25.1030381, lng: -50.1759678, tipo: "UBS" },
            { id: 42, nome: "Romulo Pazzinato", bairro: "Oficinas", endereco: "Rua Prefeito Campos Mello – (Lado Do Terminal – Antigo Cas)", ramal: "3901-3308", lat: -25.0820992, lng: -50.1890972, tipo: "UBS" },
            { id: 43, nome: "Sady de Macedo Silveira", bairro: "Orfãs", endereco: "Travessa Edmundo Bittencourt, Em Frente Ao 166 – Fundos Do Supermercado ", ramal: "3901-3419", lat: -25.1053007, lng: -50.1603172, tipo: "UBS" },
            { id: 44, nome: "Santo Domingo Zampier", bairro: "Piraí", endereco: "Rua Ateneu Martins Fontoura", ramal: "3901-3506", lat: -25.0572527, lng: -50.1072953, tipo: "UBS" },
            { id: 45, nome: "Sharise Angélica Arruda", bairro: "Neves", endereco: "Rua Alzimiro Baptista Siqueira, S/N", ramal: "3901-3507", lat: -25.1335856, lng: -50.1175446, tipo: "UBS" },
            { id: 46, nome: "Silas Sallen", bairro: "Olaria", endereco: "Rua Rodrigo Silva 927 (Próx À Escola)", ramal: "3901-3420", lat: -25.0862354, lng: -50.1182784, tipo: "UBS" },
            { id: 47, nome: "Zilda Arns", bairro: "Piraí", endereco: "Rua Aguinaldo Guimarães Da Cunha S/N", ramal: "3901-3508", lat: -25.0585141, lng: -50.1633409, tipo: "UBS" }
        ];

        // Dados das 3 UPA
        const upaUnidades = [
            { id: 1, nome: "UPA Uvaranas", tipo: "UPA", endereco: "R. Cmte Paulo P Schmidt, 15 - Uvaranas, Ponta Grossa - PR, 84031-029", bairro: "Uvaranas", ramal: "3901-2500", lat: -25.0910575, lng: -50.1109483 },
            { id: 2, nome: "UPA Santana", tipo: "UPA", endereco: "R. Dr. Paula Xavier - Centro, Ponta Grossa - PR, 84040-120", bairro: "Santana", ramal: "3901-2600", lat: -25.102523, lng: -50.1608855 },
            { id: 3, nome: "UPA Santa Paula", tipo: "UPA", endereco: "R. Nicolau Kluppel Neto, 1645 - Santa Paula, Ponta Grossa - PR, 84061-000", bairro: "Santa Paula", ramal: "3901-2700", lat: -25.102144, lng: -50.201616 }
        ];

        // Combina todas as unidades
        const allUnits = [...ubsUnidades, ...upaUnidades];

        // Calcula distância para cada unidade e encontra a mais próxima
        let nearest = null;
        let minDistance = Infinity;

        allUnits.forEach(unit => {
            const distance = this.calculateDistance(userLat, userLng, unit.lat, unit.lng);
            if (distance < minDistance) {
                minDistance = distance;
                nearest = { ...unit, distance };
            }
        });

        return nearest;
    }

    searchByAddress() {
        console.log('searchByAddress iniciado');
        const addressInput = this.querySelector('#addressInput');
        const searchBtn = this.querySelector('#searchAddressBtn');
        const modal = this.querySelector('#nearestModal');
        const modalBody = this.querySelector('#modalBody');
        const modalTitle = this.querySelector('#modalTitle');

        if (!addressInput || !addressInput.value.trim()) {
            alert('Por favor, digite um endereço');
            return;
        }

        const address = addressInput.value.trim();
        console.log(`Buscando endereço: ${address}`);

        searchBtn.disabled = true;
        searchBtn.classList.add('loading');

        // Usar API Nominatim do OpenStreetMap para geocodificar o endereço
        const query = encodeURIComponent(`${address}, Ponta Grossa, Paraná, Brasil`);
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`;

        fetch(nominatimUrl)
            .then(response => response.json())
            .then(data => {
                console.log('Resposta da geocodificação:', data);

                if (!data || data.length === 0) {
                    modalBody.innerHTML = `
                        <div class="error-message">
                            <strong>Erro:</strong> Endereço não encontrado. Tente ser mais específico (exemplo: "Av. Brasil, 1500" ou "Centro de Saúde").
                        </div>
                    `;
                    modalTitle.textContent = 'Busca por Endereço';
                    modal.classList.add('active');
                    searchBtn.disabled = false;
                    searchBtn.classList.remove('loading');
                    return;
                }

                const result = data[0];
                const addressLat = parseFloat(result.lat);
                const addressLng = parseFloat(result.lon);

                console.log(`Coordenadas encontradas: ${addressLat}, ${addressLng}`);

                // Encontrar a UBS mais próxima desse endereço
                const nearestUBS = this.calculateNearestUBS(addressLat, addressLng);
                const nearestUPA = this.calculateNearestUPA(addressLat, addressLng);

                // Mostrar a UBS (mais próxima por padrão)
                let html = `
                    <div class="unit-info" style="margin-bottom: 1.5rem; padding: 1rem; background: #f3f4f6; border-radius: 0.5rem;">
                        <div style="color: #6b7280; font-size: 0.9rem; margin-bottom: 0.5rem;">
                            <strong>Endereço buscado:</strong>
                        </div>
                        <div style="color: #1f2937; font-weight: 500;">
                            ${result.display_name}
                        </div>
                    </div>

                    <div style="margin-bottom: 1rem;">
                        <h4 style="color: #1a1f3a; margin: 0 0 1rem 0; font-weight: 600;">
                            Unidades Mais Próximas
                        </h4>
                    </div>
                `;

                // Mostrar UBS mais próxima
                html += `
                    <div class="unit-card" style="margin-bottom: 1rem;">
                        <div class="unit-name">${nearestUBS.nome}</div>
                        <span class="unit-type">UBS</span>
                        <div class="distance-highlight">
                            ${nearestUBS.distance.toFixed(2)} km
                        </div>
                        <div class="unit-info">
                            <div class="unit-info-item">
                                <strong>Bairro:</strong>
                                <span>${nearestUBS.bairro}</span>
                            </div>
                            <div class="unit-info-item">
                                <strong>Endereço:</strong>
                                <span>${nearestUBS.endereco}</span>
                            </div>
                            <div class="unit-info-item">
                                <strong>Ramal:</strong>
                                <span>${nearestUBS.ramal}</span>
                            </div>
                        </div>
                    </div>
                `;

                // Mostrar UPA mais próxima
                html += `
                    <div class="unit-card upa" style="margin-bottom: 1.5rem;">
                        <div class="unit-name">${nearestUPA.nome}</div>
                        <span class="unit-type">UPA</span>
                        <div class="distance-highlight upa">
                            ${nearestUPA.distance.toFixed(2)} km
                        </div>
                        <div class="unit-info">
                            <div class="unit-info-item">
                                <strong>Bairro:</strong>
                                <span>${nearestUPA.bairro}</span>
                            </div>
                            <div class="unit-info-item">
                                <strong>Endereço:</strong>
                                <span>${nearestUPA.endereco}</span>
                            </div>
                            <div class="unit-info-item">
                                <strong>Ramal:</strong>
                                <span>${nearestUPA.ramal}</span>
                            </div>
                            <div class="unit-info-item">
                                <strong>Atendimento:</strong>
                                <span>24 horas</span>
                            </div>
                        </div>
                    </div>
                `;

                html += `
                    <div class="modal-actions" style="flex-direction: column; gap: 0.5rem;">
                        <button class="primary" onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${nearestUBS.lat},${nearestUBS.lng}', '_blank')" style="width: 100%;">
                            Ir para UBS no Maps
                        </button>
                        <button class="primary" onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${nearestUPA.lat},${nearestUPA.lng}', '_blank')" style="width: 100%; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);">
                            Ir para UPA no Maps
                        </button>
                        <button class="secondary" onclick="document.querySelector('#nearestModal').classList.remove('active')" style="width: 100%;">
                            Fechar
                        </button>
                    </div>
                `;

                modalBody.innerHTML = html;
                modalTitle.textContent = 'Resultado da Busca';
                modal.classList.add('active');

                searchBtn.disabled = false;
                searchBtn.classList.remove('loading');
            })
            .catch(error => {
                console.error('Erro na busca de endereço:', error);
                modalBody.innerHTML = `
                    <div class="error-message">
                        <strong>Erro:</strong> Erro ao buscar o endereço. Verifique sua conexão de internet e tente novamente.
                    </div>
                `;
                modalTitle.textContent = 'Busca por Endereço';
                modal.classList.add('active');
                searchBtn.disabled = false;
                searchBtn.classList.remove('loading');
            });
    }

    calculateNearestUBS(userLat, userLng) {
        // Dados das 47 UBS
        const ubsUnidades = [
            { id: 1, nome: "Abrahão Federmann", bairro: "Centro", endereco: "Rua Quinze De Setembro – em Frente 260", ramal: "3220-1020", lat: -25.0883606, lng: -50.1435159, tipo: "UBS" },
            { id: 2, nome: "Adam Polan", bairro: "Oficinas", endereco: "Rua Alberto De Oliveira", ramal: "3220-1020", lat: -25.068633, lng: -50.1762305, tipo: "UBS" },
            { id: 3, nome: "Adão Ademar Andrade", bairro: "Oficinas", endereco: "Rua Luís Carlos Prestes Esq.C/ Rua Ernesto Che Guevara ", ramal: "3220-1020", lat: -25.098774, lng: -50.187086, tipo: "UBS" },
            { id: 4, nome: "Adilson Baggio", bairro: "Oficinas", endereco: "Rua Pinhalão, 20", ramal: "3220-1020", lat: -25.0987748, lng: -50.1870865, tipo: "UBS" },
            { id: 5, nome: "Agostinho Brenner", bairro: "Centro", endereco: "Rua Freud, S/N° (Frente Ao Corpo De Bombeiros)", ramal: "3901-3104", lat: -25.1362692, lng: -50.1596708, tipo: "UBS" },
            { id: 6, nome: "Alfredo Levandovski", bairro: "São João", endereco: "Avenida General Aldo Bonde Esq. C/ Rua Lagoa Dourada", ramal: "3901-3401", lat: -25.1284257, lng: -50.2150305, tipo: "UBS" },
            { id: 7, nome: "Aluízio Grochoski", bairro: "Orfãs", endereco: "Rua Teodoro Sampaio", ramal: "3901-3402", lat: -25.1144266, lng: -50.1484859, tipo: "UBS" },
            { id: 8, nome: "Ambrosio Bricailo", bairro: "Contorno", endereco: "Rua Ney Luiz Ribeiro S/Nº Frente Cmei Padre Ezequiel Belquio", ramal: "3901-3403", lat: -25.0695016, lng: -50.2053617, tipo: "UBS" },
            { id: 9, nome: "Antero Machado de Mello", bairro: "Olaria", endereco: "Rua Darcy Taques De Araújo Esq. Rua Neusa Rodrigues De Oliveira ", ramal: "3901-3404", lat: -25.0712259, lng: -50.1237873, tipo: "UBS" },
            { id: 10, nome: "Antônio Horácio Carlos de Miranda", bairro: "Piraí", endereco: "Rua Gaza, 610 Esq. C/Rua Seon", ramal: "3901-3501", lat: -25.0513209, lng: -50.1453537, tipo: "UBS" },
            { id: 11, nome: "Antônio Russo", bairro: "Centro", endereco: "Rua Saldanha Da Gama S/N (Quase Esq. C/ Avenida Balduíno Taques)\n", ramal: "3901-3102", lat: -25.0816576, lng: -50.169207, tipo: "UBS" },
            { id: 12, nome: "Antônio Saliba", bairro: "Neves", endereco: "R. Siqueira Campos, 5425", ramal: "3901-3502", lat: -25.1165091, lng: -50.1185003, tipo: "UBS" },
            { id: 13, nome: "Antônio Schwanzee", bairro: "Contorno", endereco: "Rua São Mauro, 229", ramal: "3901-3405", lat: -25.0666729, lng: -50.211814, tipo: "UBS" },
            { id: 14, nome: "Aurélio Grott", bairro: "Vila Paraná", endereco: "Rua Professor Fábio Fanucchi Esq. Rua Prefeito José Hoffmann", ramal: "3901-3406", lat: -25.0636402, lng: -50.1905085, tipo: "UBS" },
            { id: 15, nome: "Carlos Dezaunet Neto", bairro: "Colônia", endereco: "Rua Professor Plácido Cardon, 745 ", ramal: "3901-3601", lat: -25.1060537, lng: -50.2262071, tipo: "UBS" },
            { id: 16, nome: "Carlos Ribeiro de Macedo", bairro: "Contorno", endereco: "Rua Moacir Lazzarotto De Oliveira, Esq. Rua Arnaldo Szesz", ramal: "3901-3407", lat: -25.0695465, lng: -50.2150324, tipo: "UBS" },
            { id: 17, nome: "Cézar Rocha Milleo", bairro: "Oficinas", endereco: "Rua Ribeirão Claro, S/N° (Esq. Rua Santa Amélia)", ramal: "3901-3304", lat: -25.0846674, lng: -50.2003776, tipo: "UBS" },
            { id: 18, nome: "Cleon Francisco Carlos de Macedo", bairro: "Itaiacoca", endereco: "Rua Adre Denis Quilty S/N (Próx. À Escola)", ramal: "3901-3701", lat: -25.088998, lng: -50.0937606, tipo: "UBS" },
            { id: 19, nome: "Clyceu Carlos de Macedo", bairro: "São João", endereco: "Rua Papoula, S/N° (Próx. À Escola)", ramal: "3901-3408", lat: -25.1163927, lng: -50.2081645, tipo: "UBS" },
            { id: 20, nome: "Cyro de Lima Garcia", bairro: "Orfãs", endereco: "Rua Dom Pedro I(Lado Do Terminal – Antigo Cas)", ramal: "3901-3409", lat: -25.126373, lng: -50.1567813, tipo: "UBS" },
            { id: 21, nome: "Egon Roskamp", bairro: "Contorno", endereco: "Rua Castanheira, 216", ramal: "3901-3410", lat: -25.0965181, lng: -50.2058872, tipo: "UBS" },
            { id: 22, nome: "Eugênio José Bocchi", bairro: "Oficinas", endereco: "Rua Paulo Kloth", ramal: "3901-3305", lat: -25.0723648, lng: -50.1840693, tipo: "UBS" },
            { id: 23, nome: "Ezebedeu Linhares", bairro: "Centro", endereco: "Rua Paulina Oliveira Gomes, S/N", ramal: "3901-3105", lat: -25.137852, lng: -50.1440709, tipo: "UBS" },
            { id: 24, nome: "Félix Vianna", bairro: "Oficinas", endereco: "Rua Paes De Andrade Esq. Rua Fernandes Vieira", ramal: "3901-3306", lat: -25.0906296, lng: -50.1870622, tipo: "UBS" },
            { id: 25, nome: "Horácio Droppa", bairro: "Neves", endereco: "Rua Santa Rosa Esq. Rua Santa Mônica", ramal: "3901-3503", lat: -25.1199569, lng: -50.105237, tipo: "UBS" },
            { id: 26, nome: "Jamil Mussi", bairro: "Contorno", endereco: "Rua Paul Harris, S/N° Lado Da Escola", ramal: "3901-3411", lat: -25.0855294, lng: -50.209503, tipo: "UBS" },
            { id: 27, nome: "Javier Cejas Arzabe", bairro: "Piraí", endereco: "Rua João De Barro", ramal: "3901-3504", lat: -25.0573573, lng: -50.2227946, tipo: "UBS" },
            { id: 28, nome: "Jayme Gusman", bairro: "Orfãs", endereco: "Rua Nilo Peçanha(Praça João Montes Filho)", ramal: "3901-3412", lat: -25.110742, lng: -50.1634866, tipo: "UBS" },
            { id: 29, nome: "José Bueno", bairro: "Vila Paraná", endereco: "Rua David Hilgemberg Júnior Esq/ Rua Alcindo Santana Nunes", ramal: "3901-3413", lat: -25.0635215, lng: -50.2013529, tipo: "UBS" },
            { id: 30, nome: "José Carlos Araújo", bairro: "Umbará", endereco: "Rua 14 Bis, S/N° (Ao Lado Da Escola)", ramal: "3901-3605", lat: -25.1780598, lng: -50.1449475, tipo: "UBS" },
            { id: 31, nome: "Júlio de Azevedo", bairro: "Olaria", endereco: "Rua Desembargador Lauro Lopes Esq. Rua Rocha Pombo", ramal: "3901-3414", lat: -25.0750261, lng: -50.1502122, tipo: "UBS" },
            { id: 32, nome: "Lauro Müller", bairro: "Umbará", endereco: "Rua Tucano S/N", ramal: "3901-3606", lat: -25.148838, lng: -50.1669779, tipo: "UBS" },
            { id: 33, nome: "Louis Atanásio Charles Büron", bairro: "Trindade", endereco: "Rua Izabel Ossowski, 1– Jd. Sta. Edwirges", ramal: "3901-3607", lat: -25.0413765, lng: -50.2479864, tipo: "UBS" },
            { id: 34, nome: "Lubomir Antônio Urban", bairro: "Olaria", endereco: "Rua Washington Luiz, 760", ramal: "3901-3415", lat: -25.0789518, lng: -50.1334014, tipo: "UBS" },
            { id: 35, nome: "Luiz Conrado Mansani", bairro: "Olaria", endereco: "Avenida General Carlos Cavalcanti (Lado Do Terminal – Antigo Cas)", ramal: "3901-3416", lat: -25.0916973, lng: -50.1165346, tipo: "UBS" },
            { id: 36, nome: "Luiz Fernando Cajado de Oliveira Braga", bairro: "Trindade", endereco: "Rua Brasílio Itiberê", ramal: "3901-3608", lat: -25.0444287, lng: -50.2653642, tipo: "UBS" },
            { id: 37, nome: "Madre Josefa Stenmanns", bairro: "Centro", endereco: "Rua Bituruna, S/N – Vila Princesa", ramal: "3901-3106", lat: -25.0987486, lng: -50.1414118, tipo: "UBS" },
            { id: 38, nome: "Nilton Luiz de Castro", bairro: "Neves", endereco: "Rua Alfredo Bochnia S/N (Fundos Da Creche)", ramal: "3901-3505", lat: -25.1074933, lng: -50.1090829, tipo: "UBS" },
            { id: 39, nome: "Ottoniel Pimentel dos Santos", bairro: "Orfãs", endereco: "Rua Desembargador Westphalem, S/N ", ramal: "3901-3417", lat: -25.128586, lng: -50.146403, tipo: "UBS" },
            { id: 40, nome: "Paulo Madureira Novaes", bairro: "Oficinas", endereco: "Rua Lizandro Alves De Araújo Esq. Rua João Amaral de Almeida", ramal: "3901-3307", lat: -25.0870618, lng: -50.1985952, tipo: "UBS" },
            { id: 41, nome: "Roberto de Jesus Portela", bairro: "Orfãs", endereco: "Rua Cruzeiro Do Oeste(Junto À Escola)", ramal: "3901-3418", lat: -25.1030381, lng: -50.1759678, tipo: "UBS" },
            { id: 42, nome: "Romulo Pazzinato", bairro: "Oficinas", endereco: "Rua Prefeito Campos Mello – (Lado Do Terminal – Antigo Cas)", ramal: "3901-3308", lat: -25.0820992, lng: -50.1890972, tipo: "UBS" },
            { id: 43, nome: "Sady de Macedo Silveira", bairro: "Orfãs", endereco: "Travessa Edmundo Bittencourt, Em Frente Ao 166 – Fundos Do Supermercado ", ramal: "3901-3419", lat: -25.1053007, lng: -50.1603172, tipo: "UBS" },
            { id: 44, nome: "Santo Domingo Zampier", bairro: "Piraí", endereco: "Rua Ateneu Martins Fontoura", ramal: "3901-3506", lat: -25.0572527, lng: -50.1072953, tipo: "UBS" },
            { id: 45, nome: "Sharise Angélica Arruda", bairro: "Neves", endereco: "Rua Alzimiro Baptista Siqueira, S/N", ramal: "3901-3507", lat: -25.1335856, lng: -50.1175446, tipo: "UBS" },
            { id: 46, nome: "Silas Sallen", bairro: "Olaria", endereco: "Rua Rodrigo Silva 927 (Próx À Escola)", ramal: "3901-3420", lat: -25.0862354, lng: -50.1182784, tipo: "UBS" },
            { id: 47, nome: "Zilda Arns", bairro: "Piraí", endereco: "Rua Aguinaldo Guimarães Da Cunha S/N", ramal: "3901-3508", lat: -25.0585141, lng: -50.1633409, tipo: "UBS" }
        ];

        let nearest = null;
        let minDistance = Infinity;

        ubsUnidades.forEach(unit => {
            const distance = this.calculateDistance(userLat, userLng, unit.lat, unit.lng);
            if (distance < minDistance) {
                minDistance = distance;
                nearest = { ...unit, distance };
            }
        });

        return nearest;
    }

    calculateNearestUPA(userLat, userLng) {
        // Dados das 3 UPA
        const upaUnidades = [
            { id: 1, nome: "UPA Uvaranas", tipo: "UPA", endereco: "Rua Uvaranas, 100", bairro: "Uvaranas", ramal: "3901-2500", lat: -25.0910575, lng: -50.1109483 },
            { id: 2, nome: "UPA Santana", tipo: "UPA", endereco: "Rua Santana, 200", bairro: "Santana", ramal: "3901-2600", lat: -25.102523, lng: -50.1608855 },
            { id: 3, nome: "UPA Santa Paula", tipo: "UPA", endereco: "Rua Santa Paula, 300", bairro: "Santa Paula", ramal: "3901-2700", lat: -25.102144, lng: -50.201616 }
        ];

        let nearest = null;
        let minDistance = Infinity;

        upaUnidades.forEach(unit => {
            const distance = this.calculateDistance(userLat, userLng, unit.lat, unit.lng);
            if (distance < minDistance) {
                minDistance = distance;
                nearest = { ...unit, distance };
            }
        });

        return nearest;
    }

    calculateDistance(lat1, lng1, lat2, lng2) {
        // Fórmula de Haversine para calcular distância entre dois pontos no globo
        const R = 6371; // Raio da Terra em km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLng / 2) * Math.sin(dLng / 2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distância em km
    }

    showNearestResult(unit, userLat, userLng, modal, modalBody, title, modalTitle) {
        const distance = unit.distance.toFixed(2);
        const isUPA = unit.tipo === 'UPA';
        
        let html = `
            <div class="unit-card ${isUPA ? 'upa' : ''}">
                <div class="unit-name">${unit.nome}</div>
                <span class="unit-type">${unit.tipo}</span>
                
                <div class="distance-highlight ${isUPA ? 'upa' : ''}">
                    ${distance} km
                </div>
                
                <div class="unit-info">
                    <div class="unit-info-item">
                        <strong>Bairro:</strong>
                        <span>${unit.bairro}</span>
                    </div>
                    <div class="unit-info-item">
                        <strong>Endereço:</strong>
                        <span>${unit.endereco}</span>
                    </div>
                    <div class="unit-info-item">
                        <strong>Ramal:</strong>
                        <span>${unit.ramal}</span>
                    </div>
        `;

        if (isUPA) {
            html += `
                    <div class="unit-info-item">
                        <strong>Atendimento:</strong>
                        <span>24 horas</span>
                    </div>
            `;
        }

        html += `
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="primary" onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${unit.lat},${unit.lng}', '_blank')">
                    Abrir no Maps
                </button>
                <button class="secondary" onclick="document.querySelector('#nearestModal').classList.remove('active')">
                    Fechar
                </button>
            </div>
        `;

        modalBody.innerHTML = html;
        modalTitle.textContent = title;
        modal.classList.add('active');
    }
}

customElements.define('unidades-proximas', UnidadesProximas);
