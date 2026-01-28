class CustomQuickAccess extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin: 4rem 0;
                }
                
                .section-wrapper {
                    position: relative;
                    padding: 3rem 0;
                }
                
                .section-title {
                    font-size: 2rem;
                    font-weight: 800;
                    margin-bottom: 1rem;
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
                
                .section-subtitle {
                    color: #64748b;
                    font-size: 1.05rem;
                    margin-bottom: 2rem;
                }
                
                .quick-access-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                    gap: 2rem;
                    margin-top: 2rem;
                }
                
                .quick-access-card {
                    background: white;
                    border-radius: 1rem;
                    padding: 2rem;
                    text-decoration: none;
                    color: inherit;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 1px solid #e5e7eb;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
                    position: relative;
                    overflow: hidden;
                }
                
                .quick-access-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 4px;
                    background: linear-gradient(90deg, #0F6BFF, #00D4FF);
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.3s ease;
                }
                
                .quick-access-card:hover {
                    transform: translateY(-8px);
                    border-color: #0F6BFF;
                    box-shadow: 0 20px 40px rgba(15, 107, 255, 0.15);
                }
                
                .quick-access-card:hover::before {
                    transform: scaleX(1);
                }
                
                .card-icon-wrapper {
                    width: 60px;
                    height: 60px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1rem;
                    transition: all 0.3s ease;
                }
                
                .quick-access-card:hover .card-icon-wrapper {
                    transform: scale(1.1);
                }
                
                .card-icon-wrapper svg {
                    width: 32px;
                    height: 32px;
                }
                
                .card-title {
                    font-weight: 700;
                    font-size: 1.1rem;
                    margin-bottom: 0.75rem;
                    color: #1a1f3a;
                    transition: color 0.3s ease;
                }
                
                .quick-access-card:hover .card-title {
                    color: #0F6BFF;
                }
                
                .card-desc {
                    font-size: 0.9rem;
                    color: #64748b;
                    line-height: 1.5;
                    transition: color 0.3s ease;
                }
                
                .quick-access-card:hover .card-desc {
                    color: #475569;
                }
                
                .card-arrow {
                    margin-left: auto;
                    margin-top: auto;
                    width: 24px;
                    height: 24px;
                    color: #0F6BFF;
                    opacity: 0;
                    transform: translateX(-10px);
                    transition: all 0.3s ease;
                }
                
                .quick-access-card:hover .card-arrow {
                    opacity: 1;
                    transform: translateX(0);
                }
                
                /* Color variants */
                .card-blue .card-icon-wrapper {
                    background: linear-gradient(135deg, #0F6BFF 0%, #3b82f6 100%);
                    color: white;
                }
                
                .card-teal .card-icon-wrapper {
                    background: linear-gradient(135deg, #00D4FF 0%, #14b8a6 100%);
                    color: white;
                }
                
                .card-green .card-icon-wrapper {
                    background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
                    color: white;
                }
                
                .card-purple .card-icon-wrapper {
                    background: linear-gradient(135deg, #a855f7 0%, #d8b4fe 100%);
                    color: white;
                }
                
                @media (max-width: 768px) {
                    .section-title {
                        font-size: 1.5rem;
                    }
                    
                    .quick-access-grid {
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 1.5rem;
                    }
                }
                
                @media (max-width: 480px) {
                    :host {
                        margin: 2rem 0;
                    }
                    
                    .section-title {
                        font-size: 1.25rem;
                    }
                    
                    .quick-access-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .quick-access-card {
                        padding: 1.5rem;
                    }
                }
            </style>
            
            <div class="section-wrapper">
                <h2 class="section-title">Acesso Rápido</h2>
                <p class="section-subtitle">Encontre rapidamente o que você precisa</p>
                
                <div class="quick-access-grid">
                    <a href="mapa.html" class="quick-access-card card-blue">
                        <div class="card-icon-wrapper">
                            <i data-feather="map"></i>
                        </div>
                        <h3 class="card-title">Mapa de Unidades</h3>
                        <p class="card-desc">Localize as unidades de saúde mais próximas da sua residência</p>
                        <svg class="card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </a>
                    
                    <a href="atendimento.html" class="quick-access-card card-teal">
                        <div class="card-icon-wrapper">
                            <i data-feather="help-circle"></i>
                        </div>
                        <h3 class="card-title">Onde Ser Atendido</h3>
                        <p class="card-desc">Saiba qual unidade procurar para cada tipo de atendimento</p>
                        <svg class="card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </a>
                    
                    <a href="direitos.html" class="quick-access-card card-green">
                        <div class="card-icon-wrapper">
                            <i data-feather="shield"></i>
                        </div>
                        <h3 class="card-title">Seus Direitos</h3>
                        <p class="card-desc">Conheça os direitos garantidos do usuário do SUS</p>
                        <svg class="card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </a>
                    
                    <a href="indicadores.html" class="quick-access-card card-purple">
                        <div class="card-icon-wrapper">
                            <i data-feather="bar-chart-2"></i>
                        </div>
                        <h3 class="card-title">Indicadores de Saúde</h3>
                        <p class="card-desc">Acompanhe dados e estatísticas de saúde municipal</p>
                        <svg class="card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </a>
                </div>
            </div>
        `;
    }
}

customElements.define('custom-quick-access', CustomQuickAccess);
customElements.define('custom-quick-access', CustomQuickAccess);