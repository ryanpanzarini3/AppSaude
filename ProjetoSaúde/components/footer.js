class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background: linear-gradient(135deg, #1a1f3a 0%, #2d1b69 100%);
                    color: white;
                    padding: 3rem 1rem 1rem;
                    margin-top: 4rem;
                }
                
                .footer-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 3rem;
                    margin-bottom: 2rem;
                }
                
                .footer-section {
                    display: flex;
                    flex-direction: column;
                }
                
                .footer-section h3 {
                    font-size: 1.125rem;
                    font-weight: 700;
                    margin-bottom: 1.5rem;
                    background: linear-gradient(135deg, #00D4FF, #0F6BFF);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                .footer-icon {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }
                
                .footer-icon svg {
                    width: 24px;
                    height: 24px;
                    color: #00D4FF;
                }
                
                .footer-links {
                    display: flex;
                    flex-direction: column;
                    gap: 0.8rem;
                }
                
                .footer-link {
                    color: rgba(255, 255, 255, 0.8);
                    text-decoration: none;
                    transition: all 0.3s ease;
                    font-size: 0.95rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .footer-link:hover {
                    color: #00D4FF;
                    transform: translateX(5px);
                }
                
                .footer-link svg {
                    width: 16px;
                    height: 16px;
                }
                
                .footer-desc {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.9rem;
                    line-height: 1.6;
                }
                
                .footer-bottom {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding-top: 2rem;
                    border-top: 1px solid rgba(0, 212, 255, 0.2);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 1rem;
                }
                
                .footer-bottom p {
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 0.85rem;
                }
                
                .social-links {
                    display: flex;
                    gap: 1rem;
                }
                
                .social-link {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: rgba(0, 212, 255, 0.1);
                    border: 1px solid rgba(0, 212, 255, 0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #00D4FF;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }
                
                .social-link:hover {
                    background: rgba(0, 212, 255, 0.2);
                    border-color: #00D4FF;
                    transform: translateY(-3px);
                }
                
                @media (max-width: 768px) {
                    :host {
                        padding: 2rem 1rem;
                    }
                    
                    .footer-container {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 2rem;
                    }
                    
                    .footer-bottom {
                        flex-direction: column;
                        text-align: center;
                    }
                }
                
                @media (max-width: 480px) {
                    .footer-container {
                        grid-template-columns: 1fr;
                        gap: 1.5rem;
                    }
                }
            </style>
            
            <div class="footer-container">
                <!-- Portal Links -->
                <div class="footer-section">
                    <h3>🏥 Portal de Saúde</h3>
                    <div class="footer-links">
                        <a href="index.html" class="footer-link">
                            <i data-feather="home"></i>
                            Página Inicial
                        </a>
                        <a href="mapa.html" class="footer-link">
                            <i data-feather="map"></i>
                            Mapa de Unidades
                        </a>
                        <a href="atendimento.html" class="footer-link">
                            <i data-feather="help-circle"></i>
                            Onde ser atendido
                        </a>
                    </div>
                </div>
                
                <!-- Information -->
                <div class="footer-section">
                    <h3>📚 Informações</h3>
                    <div class="footer-links">
                        <a href="direitos.html" class="footer-link">
                            <i data-feather="shield"></i>
                            Direitos do Paciente
                        </a>
                        <a href="indicadores.html" class="footer-link">
                            <i data-feather="bar-chart-2"></i>
                            Indicadores de Saúde
                        </a>
                        <a href="#" class="footer-link">
                            <i data-feather="eye"></i>
                            Transparência
                        </a>
                    </div>
                </div>
                
                <!-- Support -->
                <div class="footer-section">
                    <h3>📞 Suporte</h3>
                    <div class="footer-links">
                        <a href="tel:+554231234567" class="footer-link">
                            <i data-feather="phone"></i>
                            (42) 3123-4567
                        </a>
                        <a href="mailto:saude@pontagrossa.pr.gov.br" class="footer-link">
                            <i data-feather="mail"></i>
                            saude@pontagrossa.pr.gov.br
                        </a>
                        <a href="#" class="footer-link">
                            <i data-feather="message-square"></i>
                            Chat Online
                        </a>
                    </div>
                </div>
                
                <!-- City Info -->
                <div class="footer-section">
                    <h3>🏛️ Secretaria Municipal</h3>
                    <div class="footer-icon">
                        <i data-feather="map-pin"></i>
                    </div>
                    <p class="footer-desc">
                        Av. Getúlio Vargas, 123<br>
                        Centro - Ponta Grossa/PR<br>
                        CEP: 84010-130<br>
                        <strong>Seg-Sex: 7h às 17h</strong>
                    </p>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>© ${new Date().getFullYear()} Prefeitura Municipal de Ponta Grossa. Todos os direitos reservados.</p>
                <div class="social-links">
                    <a href="#" class="social-link" title="Facebook">
                        <i data-feather="facebook"></i>
                    </a>
                    <a href="#" class="social-link" title="Instagram">
                        <i data-feather="instagram"></i>
                    </a>
                    <a href="#" class="social-link" title="Twitter">
                        <i data-feather="twitter"></i>
                    </a>
                    <a href="#" class="social-link" title="WhatsApp">
                        <i data-feather="phone"></i>
                    </a>
                </div>
            </div>
        `;
    }
}

customElements.define('custom-footer', CustomFooter);