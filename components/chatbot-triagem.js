// Componente de Triagem de Atendimento - SaúdePG
// Experiência moderna, inteligente e humana

class TriagemAtendimento extends HTMLElement {
    constructor() {
        super();
        this.unidades = [];
        this.selectedUnit = null;
        this.currentStep = 'unidade';
        this.userAnswers = {};
        this.unidadesRecentes = [];
        this.unidadesFavoritas = new Set();
        this.unidadeFrequente = null;
        this.isLoadingGeoLocation = false;
        
        // Carregar dados do localStorage
        this.loadLocalStorage();
    }

    connectedCallback() {
        this.render();
        this.setupListeners();
        this.loadUnidades();
    }

    // ===== PERSISTÊNCIA =====
    loadLocalStorage() {
        try {
            const saved = localStorage.getItem('triagem_saudepg');
            if (saved) {
                const data = JSON.parse(saved);
                this.selectedUnit = data.selectedUnit;
                this.currentStep = data.currentStep || 'unidade';
                this.userAnswers = data.userAnswers || {};
                this.unidadesRecentes = data.unidadesRecentes || [];
                this.unidadesFavoritas = new Set(data.unidadesFavoritas || []);
                this.unidadeFrequente = data.unidadeFrequente;
            }
        } catch (e) {
            console.warn('Erro ao carregar localStorage:', e);
        }
    }

    saveLocalStorage() {
        try {
            const data = {
                selectedUnit: this.selectedUnit,
                currentStep: this.currentStep,
                userAnswers: this.userAnswers,
                unidadesRecentes: this.unidadesRecentes,
                unidadesFavoritas: Array.from(this.unidadesFavoritas),
                unidadeFrequente: this.unidadeFrequente,
                timestamp: Date.now()
            };
            localStorage.setItem('triagem_saudepg', JSON.stringify(data));
        } catch (e) {
            console.warn('Erro ao salvar localStorage:', e);
        }
    }

    // ===== CARREGAMENTO DE DADOS =====
    loadUnidades() {
        const container = this.querySelector('#loadingState');
        if (container) {
            container.innerHTML = this.renderSkeleton();
        }

        return fetch('./coordenadas-extraidas.json')
            .then(response => response.json())
            .then(data => {
                this.unidades = data || [];
                
                // Encontrar unidade frequente (mais recente)
                if (this.unidadesRecentes.length > 0) {
                    this.unidadeFrequente = this.unidades.find(u => u.nome === this.unidadesRecentes[0]);
                }

                this.initializeUI();
            })
            .catch(err => {
                console.error('Erro ao carregar unidades:', err);
                this.unidades = [];
                this.initializeUI();
            });
    }

    initializeUI() {
        // Renderizar a interface completa
        this.renderContent();
        this.attachEventListeners();
        this.displayInitialSuggestions();
    }

    // ===== ESTRUTURA PRINCIPAL =====
    render() {
        this.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                }

                * {
                    box-sizing: border-box;
                }

                .triagem-container {
                    background: white;
                    border-radius: 1.5rem;
                    box-shadow: 0 20px 60px rgba(15, 107, 255, 0.12);
                    overflow: hidden;
                    max-width: 1000px;
                    margin: 0 auto;
                }

                /* ===== CABEÇALHO ===== */
                .triagem-header {
                    background: linear-gradient(135deg, #0F6BFF 0%, #00D4FF 100%);
                    color: white;
                    padding: 2rem 2rem 1.5rem;
                }

                .header-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin: 0 0 1.5rem 0;
                    letter-spacing: -0.5px;
                }

                .progress-steps {
                    display: flex;
                    gap: 1rem;
                    justify-content: space-between;
                }

                .progress-step {
                    flex: 1;
                    text-align: center;
                    position: relative;
                    padding: 0.75rem;
                    border-radius: 0.75rem;
                    font-size: 0.85rem;
                    font-weight: 600;
                    background: rgba(255, 255, 255, 0.15);
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .progress-step.active {
                    background: rgba(255, 255, 255, 0.3);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }

                .progress-step.completed {
                    background: rgba(76, 175, 80, 0.3);
                }

                .step-icon {
                    font-size: 1.2rem;
                    display: block;
                    margin-bottom: 0.25rem;
                }

                .step-label {
                    display: none;
                }

                @media (min-width: 640px) {
                    .step-label {
                        display: inline;
                    }
                }

                /* ===== CONTEÚDO ===== */
                .triagem-content {
                    padding: 2rem;
                    min-height: 400px;
                }

                .welcome-message {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #1f2937;
                    margin-bottom: 2rem;
                    text-align: center;
                }

                /* ===== SUGESTÃO DESTACADA ===== */
                .suggestion-section {
                    margin-bottom: 2rem;
                }

                .suggestion-title {
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: #6b7280;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 1rem;
                }

                .suggestion-card {
                    padding: 1.5rem;
                    background: linear-gradient(135deg, rgba(15, 107, 255, 0.05) 0%, rgba(0, 212, 255, 0.05) 100%);
                    border: 2px solid #e5e7eb;
                    border-radius: 1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .suggestion-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                    transition: left 0.5s ease;
                }

                .suggestion-card:hover::before {
                    left: 100%;
                }

                .suggestion-card:hover {
                    border-color: #0F6BFF;
                    background: linear-gradient(135deg, rgba(15, 107, 255, 0.1) 0%, rgba(0, 212, 255, 0.1) 100%);
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px rgba(15, 107, 255, 0.15);
                }

                .suggestion-card.selected {
                    border-color: #0F6BFF;
                    background: linear-gradient(135deg, rgba(15, 107, 255, 0.15) 0%, rgba(0, 212, 255, 0.15) 100%);
                }

                .suggestion-label {
                    font-size: 0.8rem;
                    color: #6b7280;
                    margin-bottom: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .suggestion-unit-name {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: #0F6BFF;
                    margin-bottom: 0.5rem;
                }

                .suggestion-unit-info {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1rem;
                    flex-wrap: wrap;
                }

                .suggestion-unit-info-item {
                    font-size: 0.9rem;
                    color: #6b7280;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .suggestion-buttons {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .btn-confirm {
                    flex: 1;
                    padding: 0.75rem 1rem;
                    background: linear-gradient(135deg, #0F6BFF 0%, #00D4FF 100%);
                    color: white;
                    border: none;
                    border-radius: 0.75rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 0.95rem;
                }

                .btn-confirm:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 16px rgba(15, 107, 255, 0.3);
                }

                .btn-alternative {
                    flex: 1;
                    padding: 0.75rem 1rem;
                    background: white;
                    color: #0F6BFF;
                    border: 2px solid #0F6BFF;
                    border-radius: 0.75rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 0.95rem;
                }

                .btn-alternative:hover {
                    background: #f0f9ff;
                    transform: translateY(-2px);
                }

                .check-icon {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    background: linear-gradient(135deg, #0F6BFF 0%, #00D4FF 100%);
                    border-radius: 50%;
                    color: white;
                    text-align: center;
                    line-height: 20px;
                    font-size: 0.85rem;
                    margin-left: 0.5rem;
                    animation: popIn 0.4s ease-out;
                }

                @keyframes popIn {
                    0% {
                        transform: scale(0);
                    }
                    50% {
                        transform: scale(1.1);
                    }
                    100% {
                        transform: scale(1);
                    }
                }

                /* ===== BUSCA ===== */
                .search-section {
                    margin-bottom: 2rem;
                }

                .search-container {
                    position: relative;
                    margin-bottom: 1rem;
                }

                .search-input {
                    width: 100%;
                    padding: 1rem;
                    padding-left: 2.5rem;
                    border: 2px solid #e5e7eb;
                    border-radius: 0.75rem;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    background: white;
                }

                .search-input:focus {
                    outline: none;
                    border-color: #0F6BFF;
                    box-shadow: 0 0 0 3px rgba(15, 107, 255, 0.1);
                }

                .search-icon {
                    position: absolute;
                    left: 0.75rem;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 1.2rem;
                    color: #6b7280;
                    pointer-events: none;
                }

                /* ===== LISTA DE UNIDADES ===== */
                .units-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 1.25rem;
                }

                .unit-card {
                    padding: 1.25rem;
                    border: 2px solid #e5e7eb;
                    border-radius: 1rem;
                    background: white;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }

                .unit-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 3px;
                    background: linear-gradient(90deg, #0F6BFF, #00D4FF);
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.3s ease;
                }

                .unit-card:hover {
                    border-color: #0F6BFF;
                    background: #f9fafb;
                    transform: translateY(-6px);
                    box-shadow: 0 12px 24px rgba(15, 107, 255, 0.1);
                }

                .unit-card:hover::before {
                    transform: scaleX(1);
                }

                .unit-card.selected {
                    border-color: #0F6BFF;
                    background: linear-gradient(135deg, rgba(15, 107, 255, 0.05) 0%, rgba(0, 212, 255, 0.05) 100%);
                }

                .unit-card.selected::after {
                    content: '✓';
                    position: absolute;
                    top: 0.75rem;
                    right: 0.75rem;
                    width: 28px;
                    height: 28px;
                    background: linear-gradient(135deg, #0F6BFF 0%, #00D4FF 100%);
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    font-size: 1rem;
                    animation: popIn 0.4s ease-out;
                }

                .unit-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 0.75rem;
                }

                .unit-name {
                    font-weight: 700;
                    color: #1f2937;
                    font-size: 0.95rem;
                    line-height: 1.3;
                    flex: 1;
                }

                .favorite-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-size: 1.2rem;
                    transition: all 0.2s ease;
                    padding: 0.25rem;
                    margin-left: 0.5rem;
                }

                .favorite-btn:hover {
                    transform: scale(1.2);
                }

                .favorite-btn.active {
                    color: #fbbf24;
                }

                .unit-info {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                    font-size: 0.85rem;
                    color: #6b7280;
                }

                .unit-info-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .unit-neighborhood {
                    color: #6b7280;
                    font-size: 0.85rem;
                }

                .unit-time {
                    font-size: 0.85rem;
                    color: #6b7280;
                }

                /* ===== SEÇÃO RECENTES ===== */
                .recents-section {
                    margin-bottom: 2rem;
                }

                .recents-scroll {
                    display: flex;
                    gap: 1rem;
                    overflow-x: auto;
                    padding-bottom: 1rem;
                    scroll-behavior: smooth;
                }

                .recents-scroll::-webkit-scrollbar {
                    height: 4px;
                }

                .recents-scroll::-webkit-scrollbar-track {
                    background: #f3f4f6;
                    border-radius: 2px;
                }

                .recents-scroll::-webkit-scrollbar-thumb {
                    background: linear-gradient(90deg, #0F6BFF, #00D4FF);
                    border-radius: 2px;
                }

                .recent-card {
                    flex-shrink: 0;
                    width: 160px;
                    padding: 1rem;
                    border: 2px solid #e5e7eb;
                    border-radius: 0.75rem;
                    background: white;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-align: center;
                }

                .recent-card:hover {
                    border-color: #0F6BFF;
                    background: #f0f9ff;
                    transform: translateY(-3px);
                }

                .recent-card-name {
                    font-weight: 600;
                    color: #1f2937;
                    font-size: 0.85rem;
                    margin-bottom: 0.5rem;
                    line-height: 1.2;
                }

                .recent-card-label {
                    font-size: 0.7rem;
                    color: #9ca3af;
                    text-transform: uppercase;
                    letter-spacing: 0.03em;
                }

                /* ===== CARREGAMENTO ===== */
                .skeleton {
                    animation: skeleton-loading 1s linear infinite alternate;
                }

                @keyframes skeleton-loading {
                    0% {
                        background-color: #e5e7eb;
                    }
                    100% {
                        background-color: #f3f4f6;
                    }
                }

                .skeleton-card {
                    height: 160px;
                    border-radius: 1rem;
                    margin-bottom: 1rem;
                }

                .skeleton-title {
                    height: 24px;
                    width: 40%;
                    border-radius: 0.5rem;
                    margin-bottom: 1.5rem;
                }

                /* ===== MENSAGENS ===== */
                .empty-state {
                    text-align: center;
                    padding: 3rem 1rem;
                }

                .empty-icon {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                }

                .empty-title {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #1f2937;
                    margin-bottom: 0.5rem;
                }

                .empty-text {
                    color: #6b7280;
                    font-size: 0.95rem;
                }

                /* ===== RESPONSIVIDADE ===== */
                @media (max-width: 768px) {
                    .triagem-header {
                        padding: 1.5rem 1rem 1rem;
                    }

                    .header-title {
                        font-size: 1.25rem;
                        margin-bottom: 1rem;
                    }

                    .progress-steps {
                        gap: 0.5rem;
                    }

                    .progress-step {
                        padding: 0.5rem;
                        font-size: 0.75rem;
                    }

                    .step-icon {
                        font-size: 1rem;
                        margin-bottom: 0.15rem;
                    }

                    .triagem-content {
                        padding: 1.5rem;
                    }

                    .units-grid {
                        grid-template-columns: 1fr;
                    }

                    .suggestion-buttons {
                        flex-direction: column;
                    }

                    .welcome-message {
                        font-size: 1.1rem;
                    }
                }

                /* ===== ANIMAÇÕES ===== */
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .fade-in {
                    animation: fadeIn 0.4s ease-out;
                }

                /* Loading spinner */
                .spinner {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    border: 2px solid rgba(15, 107, 255, 0.3);
                    border-top-color: #0F6BFF;
                    border-radius: 50%;
                    animation: spin 0.6s linear infinite;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            </style>

            <div class="triagem-container">
                <!-- CABEÇALHO -->
                <div class="triagem-header">
                    <h1 class="header-title">💬 Triagem de Atendimento</h1>
                    <div class="progress-steps" id="progressSteps"></div>
                </div>

                <!-- CONTEÚDO -->
                <div class="triagem-content" id="triageContent">
                    <div id="loadingState"></div>
                </div>
            </div>
        `;
    }

    // ===== INICIALIZAR LISTENERS =====
    attachEventListeners() {
        const searchInput = this.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }

        this.querySelectorAll('.unit-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const unitName = card.dataset.unitName;
                this.selectUnit(unitName);
            });
        });

        this.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const unitName = btn.closest('.unit-card').dataset.unitName;
                this.toggleFavorite(unitName);
            });
        });

        this.querySelectorAll('.recent-card').forEach(card => {
            card.addEventListener('click', () => {
                const unitName = card.dataset.unitName;
                this.selectUnit(unitName);
            });
        });

        this.querySelectorAll('[data-action]').forEach(btn => {
            const action = btn.dataset.action;
            if (action === 'geolocation') {
                btn.addEventListener('click', () => this.handleGeolocation());
            }
        });

        this.querySelectorAll('.btn-confirm').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = btn.dataset.action;
                if (action === 'confirm-suggestion') {
                    const unitName = btn.dataset.unitName;
                    this.selectUnit(unitName);
                }
            });
        });

        this.querySelectorAll('.btn-alternative').forEach(btn => {
            const action = btn.dataset.action;
            if (action === 'search-alternative') {
                btn.addEventListener('click', () => {
                    this.querySelector('.search-input')?.focus();
                });
            }
        });
    }

    setupListeners() {
        // Método genérico - será chamado após render
    }

    // ===== RENDERIZAÇÃO DO CONTEÚDO =====
    renderContent() {
        const content = this.querySelector('#triageContent');
        const progressContainer = this.querySelector('#progressSteps');

        // Renderizar barra de progresso
        progressContainer.innerHTML = `
            <div class="progress-step active" data-step="unidade">
                <span class="step-icon">📍</span>
                <span class="step-label">Unidade</span>
            </div>
            <div class="progress-step" data-step="motivo">
                <span class="step-icon">🏥</span>
                <span class="step-label">Motivo</span>
            </div>
            <div class="progress-step" data-step="prioridade">
                <span class="step-icon">⚡</span>
                <span class="step-label">Prioridade</span>
            </div>
            <div class="progress-step" data-step="encaminhamento">
                <span class="step-icon">✅</span>
                <span class="step-label">Encaminhamento</span>
            </div>
        `;

        // Renderizar conteúdo da etapa de unidade
        content.innerHTML = `
            <div class="fade-in">
                <div class="welcome-message">Olá! Onde você costuma se atender? 😊</div>
                
                <div id="suggestionsContainer"></div>
                
                <div class="search-section">
                    <div class="suggestion-title">Buscar unidade</div>
                    <div class="search-container">
                        <span class="search-icon">🔍</span>
                        <input 
                            type="text" 
                            class="search-input" 
                            placeholder="Digite o nome da unidade ou bairro"
                            autocomplete="off"
                        >
                    </div>
                </div>

                <div id="unitsContainer" class="fade-in"></div>
                <div id="recentsContainer"></div>
            </div>
        `;

        this.renderSuggestions();
        this.renderUnits('');
        this.renderRecents();
    }

    // ===== SUGESTÕES INICIAIS =====
    displayInitialSuggestions() {
        const container = this.querySelector('#suggestionsContainer');
        
        // Verificar se há unidade frequente
        if (this.unidadeFrequente) {
            this.renderFrequentSuggestion(container);
        } else if (!this.isLoadingGeoLocation) {
            this.renderGeoLocationSuggestion(container);
        }
    }

    renderSuggestions() {
        // Renderizado em displayInitialSuggestions
    }

    renderFrequentSuggestion(container) {
        const unit = this.unidadeFrequente;
        container.innerHTML = `
            <div class="suggestion-section fade-in">
                <div class="suggestion-title">Sua unidade frequente</div>
                <div class="suggestion-card ${this.selectedUnit?.nome === unit.nome ? 'selected' : ''}">
                    <div class="suggestion-label">Detectamos que você costuma se atender em:</div>
                    <div class="suggestion-unit-name">${unit.nome}</div>
                    <div class="suggestion-unit-info">
                        <div class="suggestion-unit-info-item">📍 ${unit.bairro || 'Ponta Grossa'}</div>
                        <div class="suggestion-unit-info-item">⏱️ Est. ${Math.floor(Math.random() * 15 + 10)}-${Math.floor(Math.random() * 10 + 20)} min</div>
                    </div>
                    <div class="suggestion-buttons">
                        <button class="btn-confirm" data-action="confirm-suggestion" data-unit-name="${unit.nome}">
                            ✓ Continuar com essa
                        </button>
                        <button class="btn-alternative" data-action="search-alternative">
                            Escolher outra
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderGeoLocationSuggestion(container) {
        container.innerHTML = `
            <div class="suggestion-section fade-in">
                <div class="suggestion-title">Sugestão inteligente</div>
                <div class="suggestion-card">
                    <div style="text-align: center; padding: 1rem;">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">📍</div>
                        <p style="color: #6b7280; margin: 0;">Não sabe qual unidade escolher?</p>
                        <button 
                            class="btn-confirm" 
                            style="width: 100%; margin-top: 1rem;" 
                            data-action="geolocation"
                        >
                            Encontrar a mais próxima
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.attachEventListeners();
    }

    // ===== GEOLOCALIZAÇÃO =====
    handleGeolocation() {
        const container = this.querySelector('#suggestionsContainer');
        container.innerHTML = `
            <div class="suggestion-section fade-in">
                <div class="suggestion-card">
                    <div style="text-align: center; padding: 1.5rem;">
                        <div class="spinner" style="margin: 0 auto 1rem;"></div>
                        <p style="color: #6b7280;">Localizando sua posição...</p>
                        <p style="font-size: 0.8rem; color: #9ca3af; margin: 0.5rem 0 0;">Certifique-se de permitir acesso à localização</p>
                    </div>
                </div>
            </div>
        `;

        this.isLoadingGeoLocation = true;

        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    
                    const closestUnit = this.findClosestUnit(userLat, userLng);
                    this.renderGeoLocationResult(container, closestUnit);
                    this.isLoadingGeoLocation = false;
                },
                (error) => {
                    this.renderGeoLocationError(container, error);
                    this.isLoadingGeoLocation = false;
                }
            );
        } else {
            this.renderGeoLocationUnsupported(container);
            this.isLoadingGeoLocation = false;
        }
    }

    findClosestUnit(userLat, userLng) {
        if (this.unidades.length === 0) return null;

        let closest = this.unidades[0];
        let minDistance = this.calculateDistance(userLat, userLng, closest.lat, closest.lng);

        for (let unit of this.unidades) {
            const distance = this.calculateDistance(userLat, userLng, unit.lat, unit.lng);
            if (distance < minDistance) {
                minDistance = distance;
                closest = unit;
            }
        }

        return { unit: closest, distance: minDistance };
    }

    calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    renderGeoLocationResult(container, result) {
        if (!result) {
            container.innerHTML = `
                <div class="suggestion-section fade-in">
                    <div class="suggestion-card" style="background: #fee2e2; border-color: #fca5a5;">
                        <div style="color: #991b1b;">Desculpe, não conseguimos localizar unidades.</div>
                    </div>
                </div>
            `;
            return;
        }

        const { unit, distance } = result;
        const distanceKm = distance.toFixed(1);
        const displayDistance = distanceKm < 1 ? `${(distance * 1000).toFixed(0)}m` : `${distanceKm}km`;

        container.innerHTML = `
            <div class="suggestion-section fade-in">
                <div class="suggestion-title">Unidade mais próxima</div>
                <div class="suggestion-card selected">
                    <div class="suggestion-label">Encontramos a unidade mais próxima de você</div>
                    <div class="suggestion-unit-name">${unit.nome}</div>
                    <div class="suggestion-unit-info">
                        <div class="suggestion-unit-info-item">📍 A ${displayDistance}</div>
                        <div class="suggestion-unit-info-item">⏱️ Est. ${Math.floor(Math.random() * 15 + 10)}-${Math.floor(Math.random() * 10 + 20)} min</div>
                    </div>
                    <div class="suggestion-buttons">
                        <button class="btn-confirm" data-action="confirm-suggestion" data-unit-name="${unit.nome}">
                            ✓ Usar essa unidade
                        </button>
                        <button class="btn-alternative" data-action="search-alternative">
                            Ver outras
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.attachEventListeners();
    }

    renderGeoLocationError(container, error) {
        let message = 'Não conseguimos localizar sua posição.';
        if (error.code === error.PERMISSION_DENIED) {
            message = 'Acesso à localização foi negado. Por favor, ative nas configurações do seu navegador.';
        }

        container.innerHTML = `
            <div class="suggestion-section fade-in">
                <div class="suggestion-card" style="background: #fee2e2; border-color: #fca5a5;">
                    <div style="color: #991b1b; font-weight: 600; margin-bottom: 0.5rem;">❌ ${message}</div>
                    <button class="btn-alternative" data-action="search-alternative" style="width: 100%;">
                        Selecionar manualmente
                    </button>
                </div>
            </div>
        `;

        this.attachEventListeners();
    }

    renderGeoLocationUnsupported(container) {
        container.innerHTML = `
            <div class="suggestion-section fade-in">
                <div class="suggestion-card" style="background: #fee2e2; border-color: #fca5a5;">
                    <div style="color: #991b1b;">❌ Seu navegador não suporta geolocalização. Por favor, selecione manualmente.</div>
                </div>
            </div>
        `;
    }

    // ===== BUSCA E FILTRO =====
    handleSearch(query) {
        this.renderUnits(query);
    }

    renderUnits(query = '') {
        const container = this.querySelector('#unitsContainer');
        
        let filtered = this.unidades;
        if (query.trim()) {
            const q = query.toLowerCase();
            filtered = this.unidades.filter(u => 
                u.nome.toLowerCase().includes(q) ||
                (u.bairro && u.bairro.toLowerCase().includes(q))
            );
        }

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🏥</div>
                    <div class="empty-title">Nenhuma unidade encontrada</div>
                    <div class="empty-text">Tente buscar por nome ou bairro</div>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="suggestion-title">Todas as unidades</div>
            <div class="units-grid">
                ${filtered.map(unit => `
                    <div class="unit-card fade-in ${this.selectedUnit?.nome === unit.nome ? 'selected' : ''}" data-unit-name="${unit.nome}">
                        <div class="unit-header">
                            <div class="unit-name">${unit.nome}</div>
                            <button class="favorite-btn ${this.unidadesFavoritas.has(unit.nome) ? 'active' : ''}">
                                ${this.unidadesFavoritas.has(unit.nome) ? '⭐' : '☆'}
                            </button>
                        </div>
                        <div class="unit-info">
                            <div class="unit-info-item">📍 ${unit.bairro || 'Ponta Grossa'}</div>
                            <div class="unit-info-item">⏱️ Est. ${Math.floor(Math.random() * 15 + 10)}-${Math.floor(Math.random() * 10 + 20)} min</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        this.attachEventListeners();
    }

    renderRecents() {
        const container = this.querySelector('#recentsContainer');
        
        if (this.unidadesRecentes.length === 0) {
            return;
        }

        const recents = this.unidadesRecentes
            .slice(0, 5)
            .map(name => this.unidades.find(u => u.nome === name))
            .filter(u => u);

        if (recents.length === 0) {
            return;
        }

        container.innerHTML = `
            <div class="recents-section fade-in">
                <div class="suggestion-title">Unidades recentes</div>
                <div class="recents-scroll">
                    ${recents.map(unit => `
                        <div class="recent-card" data-unit-name="${unit.nome}">
                            <div class="recent-card-name">${unit.nome}</div>
                            <div class="recent-card-label">Recentemente usada</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.attachEventListeners();
    }

    // ===== SELEÇÃO DE UNIDADE =====
    selectUnit(unitName) {
        const unit = this.unidades.find(u => u.nome === unitName);
        if (!unit) return;

        this.selectedUnit = unit;
        this.userAnswers.unidade = unitName;

        // Atualizar unidades recentes
        this.unidadesRecentes = [unitName, ...this.unidadesRecentes.filter(n => n !== unitName)].slice(0, 10);

        this.saveLocalStorage();
        this.renderUnits(this.querySelector('.search-input')?.value || '');

        // Animação de confirmação
        const selectedCard = this.querySelector(`[data-unit-name="${unitName}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }

        // Avançar para próxima etapa
        setTimeout(() => {
            this.currentStep = 'motivo';
            this.proceedToNextStep();
        }, 800);
    }

    toggleFavorite(unitName) {
        if (this.unidadesFavoritas.has(unitName)) {
            this.unidadesFavoritas.delete(unitName);
        } else {
            this.unidadesFavoritas.add(unitName);
        }

        this.saveLocalStorage();
        this.renderUnits(this.querySelector('.search-input')?.value || '');
    }

    // ===== PRÓXIMAS ETAPAS =====
    proceedToNextStep() {
        const content = this.querySelector('#triageContent');
        const step = this.currentStep;

        if (step === 'motivo') {
            content.innerHTML = `
                <div class="fade-in">
                    <div class="welcome-message">Qual é o motivo da consulta?</div>
                    
                    <div class="units-grid">
                        <div class="unit-card fade-in" data-action="motivo" data-value="consulta">
                            <div class="unit-name">🏥 Consulta Clínica</div>
                        </div>
                        <div class="unit-card fade-in" data-action="motivo" data-value="odonto">
                            <div class="unit-name">🦷 Odontologia</div>
                        </div>
                        <div class="unit-card fade-in" data-action="motivo" data-value="urgencia">
                            <div class="unit-name">🚨 Urgência/Emergência</div>
                        </div>
                        <div class="unit-card fade-in" data-action="motivo" data-value="vacina">
                            <div class="unit-name">💉 Vacinação</div>
                        </div>
                    </div>
                </div>
            `;

            this.querySelector('#triageContent').querySelectorAll('[data-action="motivo"]').forEach(card => {
                card.addEventListener('click', () => {
                    this.userAnswers.motivo = card.dataset.value;
                    this.currentStep = 'prioridade';
                    this.proceedToNextStep();
                });
            });
        } else if (step === 'prioridade') {
            content.innerHTML = `
                <div class="fade-in">
                    <div class="welcome-message">Qual é sua prioridade?</div>
                    
                    <div class="units-grid">
                        <div class="unit-card fade-in" data-action="priority" data-value="urgente">
                            <div class="unit-name">⚡ Urgente</div>
                            <div class="unit-neighborhood" style="margin-top: 0.5rem;">Atendimento imediato</div>
                        </div>
                        <div class="unit-card fade-in" data-action="priority" data-value="normal">
                            <div class="unit-name">📌 Normal</div>
                            <div class="unit-neighborhood" style="margin-top: 0.5rem;">Em breve</div>
                        </div>
                        <div class="unit-card fade-in" data-action="priority" data-value="rotina">
                            <div class="unit-name">📅 Rotina</div>
                            <div class="unit-neighborhood" style="margin-top: 0.5rem;">Sem urgência</div>
                        </div>
                    </div>
                </div>
            `;

            this.querySelector('#triageContent').querySelectorAll('[data-action="priority"]').forEach(card => {
                card.addEventListener('click', () => {
                    this.userAnswers.prioridade = card.dataset.value;
                    this.currentStep = 'encaminhamento';
                    this.proceedToNextStep();
                });
            });
        } else if (step === 'encaminhamento') {
            this.renderFinalStep();
        }

        this.updateProgressBar();
    }

    renderFinalStep() {
        const content = this.querySelector('#triageContent');
        const { unidade, motivo, prioridade } = this.userAnswers;

        content.innerHTML = `
            <div class="fade-in">
                <div class="welcome-message">✅ Triagem Concluída!</div>
                
                <div style="padding: 2rem; background: linear-gradient(135deg, rgba(15, 107, 255, 0.1) 0%, rgba(0, 212, 255, 0.1) 100%); border: 2px solid #0F6BFF; border-radius: 1rem; text-align: center;">
                    <div style="font-size: 0.85rem; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem;">Seu Encaminhamento</div>
                    
                    <div style="margin: 1.5rem 0;">
                        <div style="font-size: 0.85rem; color: #6b7280; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">Unidade</div>
                        <div style="font-size: 1.1rem; font-weight: 700; color: #0F6BFF;">${unidade}</div>
                    </div>

                    <div style="margin: 1.5rem 0;">
                        <div style="font-size: 0.85rem; color: #6b7280; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">Motivo</div>
                        <div style="font-size: 1rem; font-weight: 600; color: #1f2937;">${this.getMotivoLabel(motivo)}</div>
                    </div>

                    <div style="margin: 1.5rem 0;">
                        <div style="font-size: 0.85rem; color: #6b7280; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">Prioridade</div>
                        <div style="font-size: 1rem; font-weight: 600; color: #0F6BFF;">${this.getPrioridadeLabel(prioridade)}</div>
                    </div>

                    <div style="margin: 1.5rem 0; padding: 1rem; background: white; border-radius: 0.75rem;">
                        <div style="font-size: 0.85rem; color: #6b7280;">🗓️ Você será atendido em breve</div>
                        <div style="font-size: 0.8rem; color: #9ca3af; margin-top: 0.5rem;">Acompanhe sua fila em Meu Atendimento</div>
                    </div>
                </div>

                <div style="margin-top: 2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <button class="btn-alternative" onclick="this.closest('chatbot-triagem').resetTriagem()" style="width: 100%;">
                        🔄 Nova Triagem
                    </button>
                    <button class="btn-confirm" style="width: 100%;">
                        → Ir para Atendimento
                    </button>
                </div>
            </div>
        `;

        this.updateProgressBar();
    }

    getMotivoLabel(value) {
        const labels = {
            'consulta': '🏥 Consulta Clínica',
            'odonto': '🦷 Odontologia',
            'urgencia': '🚨 Urgência/Emergência',
            'vacina': '💉 Vacinação'
        };
        return labels[value] || value;
    }

    getPrioridadeLabel(value) {
        const labels = {
            'urgente': '⚡ Urgente',
            'normal': '📌 Normal',
            'rotina': '📅 Rotina'
        };
        return labels[value] || value;
    }

    updateProgressBar() {
        const steps = {
            'unidade': 0,
            'motivo': 1,
            'prioridade': 2,
            'encaminhamento': 3
        };

        const stepIndex = steps[this.currentStep] || 0;

        this.querySelectorAll('.progress-step').forEach((step, idx) => {
            step.classList.remove('active', 'completed');
            if (idx < stepIndex) {
                step.classList.add('completed');
            } else if (idx === stepIndex) {
                step.classList.add('active');
            }
        });
    }

    resetTriagem() {
        this.currentStep = 'unidade';
        this.userAnswers = {};
        this.selectedUnit = null;
        this.saveLocalStorage();
        this.render();
        this.setupListeners();
        this.loadUnidades();
    }

    // ===== SKELETON LOADING =====
    renderSkeleton() {
        return `
            <div class="skeleton-title skeleton"></div>
            <div class="skeleton-card skeleton"></div>
            <div class="skeleton-card skeleton"></div>
            <div class="skeleton-card skeleton"></div>
        `;
    }
}

customElements.define('chatbot-triagem', TriagemAtendimento);


