class CustomNavbar extends HTMLElement {
    connectedCallback() {
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
        }
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    background: linear-gradient(135deg, #0F6BFF 0%, #00D4FF 100%);
                    position: sticky;
                    top: 0;
                    z-index: 50;
                    box-shadow: 0 4px 20px rgba(15, 107, 255, 0.2);
                }
                
                nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 2rem;
                    max-width: 1400px;
                    margin: 0 auto;
                    width: 100%;
                    box-sizing: border-box;
                    position: relative;
                }
                
                .logo-container {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .logo {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-weight: 800;
                    font-size: 1.5rem;
                    color: white;
                    text-decoration: none;
                    transition: transform 0.3s ease;
                }
                
                .logo-icon {
                    width: 32px;
                    height: 32px;
                    stroke: white;
                    fill: none;
                    stroke-width: 2;
                    animation: pulse 2s infinite;
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                
                .nav-center {
                    display: flex;
                    gap: 2rem;
                    align-items: center;
                }
                
                .nav-links {
                    display: flex;
                    gap: 2rem;
                }
                
                .nav-link {
                    color: white;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 0.95rem;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    position: relative;
                    padding: 0.5rem 0;
                }

                .nav-link svg {
                    width: 18px;
                    height: 18px;
                    stroke: currentColor;
                    fill: none;
                    stroke-width: 2;
                }
                
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: -5px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: rgba(255, 255, 255, 0.8);
                    transition: width 0.3s ease;
                }
                
                .nav-link:hover::after {
                    width: 100%;
                }
                
                .mobile-menu-btn {
                    display: none;
                    background: rgba(255, 255, 255, 0.1);
                    border: none;
                    color: white;
                    cursor: pointer;
                    width: 44px;
                    height: 44px;
                    border-radius: 0.5rem;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }

                .mobile-menu-btn svg {
                    width: 24px;
                    height: 24px;
                    stroke: white;
                    fill: none;
                    stroke-width: 2;
                }
                
                .mobile-menu {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: linear-gradient(135deg, #0F6BFF 0%, #00B4FF 100%);
                    flex-direction: column;
                    padding: 1rem 2rem;
                    gap: 0.5rem;
                    box-shadow: 0 8px 32px rgba(15, 107, 255, 0.3);
                }
                
                .mobile-menu.active {
                    display: flex;
                }

                .mobile-menu .nav-link {
                    padding: 1rem 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }

                .install-menu-btn {
                    background: rgba(255, 255, 255, 0.15);
                    border: 1.5px solid rgba(255, 255, 255, 0.3);
                    color: white;
                    padding: 1rem 0;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.95rem;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    width: 100%;
                    justify-content: center;
                    margin-top: 0.5rem;
                }

                .install-menu-btn:hover {
                    background: rgba(255, 255, 255, 0.25);
                    transform: translateY(-2px);
                }

                .install-menu-btn svg {
                    width: 18px;
                    height: 18px;
                    stroke: white;
                    fill: none;
                    stroke-width: 2;
                }

                .install-menu-btn.hidden {
                    display: none !important;
                }

                .install-btn {
                    display: none;
                }
                
                @media (max-width: 960px) {
                    .nav-links { display: none; }
                    .mobile-menu-btn { display: flex; }
                    nav { padding: 1rem; }
                    position: relative;
                }
            </style>
            
            <nav>
                <div class="logo-container">
                    <button class="mobile-menu-btn" id="menuBtn">
                        <svg viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    </button>
                    <a href="index.html" class="logo">
                        <svg class="logo-icon" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        <span>SaúdePG</span>
                    </a>
                </div>
                
                <div class="nav-center">
                    <div class="nav-links">
                        <a href="index.html" class="nav-link">
                            <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                            Início
                        </a>
                        <a href="mapa.html" class="nav-link">
                            <svg viewBox="0 0 24 24"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
                            Mapa
                        </a>
                        <a href="atendimento.html" class="nav-link">
                            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                            Atendimento
                        </a>
                        <a href="direitos.html" class="nav-link">
                            <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                            Direitos
                        </a>
                        <a href="indicadores.html" class="nav-link">
                            <svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                            Indicadores
                        </a>
                    </div>
                </div>

                <button class="install-btn hidden" id="installMobileBtn" title="Instalar aplicativo">
                    <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><line x1="12" y1="7" x2="12" y2="13"></line><line x1="9" y1="10" x2="15" y2="10"></line></svg>
                    Instalar
                </button>
                
                <div class="mobile-menu" id="mobileMenu">
                    <a href="index.html" class="nav-link">Início</a>
                    <a href="mapa.html" class="nav-link">Mapa</a>
                    <a href="atendimento.html" class="nav-link">Atendimento</a>
                    <a href="direitos.html" class="nav-link">Direitos</a>
                    <a href="indicadores.html" class="nav-link">Indicadores</a>
                    <button class="install-menu-btn" id="installMenuBtn">
                        <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><line x1="12" y1="7" x2="12" y2="13"></line><line x1="9" y1="10" x2="15" y2="10"></line></svg>
                        Instalar Aplicativo
                    </button>
                </div>
            </nav>
        `;
        
        const menuBtn = this.shadowRoot.getElementById('menuBtn');
        const mobileMenu = this.shadowRoot.getElementById('mobileMenu');
        const installMenuBtn = this.shadowRoot.getElementById('installMenuBtn');
        
        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileMenu.classList.toggle('active');
            });
            
            // Fecha ao clicar fora
            document.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        }

        // Gerenciar botão de instalação no menu
        if (installMenuBtn) {
            this.setupInstallButton(installMenuBtn);
        }
    }

    setupInstallButton(btn) {
        let deferredPrompt = null;
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

        // Detectar quando a PWA pode ser instalada (Android)
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            btn.classList.remove('hidden');
        });

        // Detectar instalação bem-sucedida
        window.addEventListener('appinstalled', () => {
            btn.classList.add('hidden');
            deferredPrompt = null;
        });

        // Clique no botão
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            if (isIOS) {
                // Para iOS, redirecionar para página de instruções
                window.location.href = './instalar.html';
            } else if (deferredPrompt) {
                // Para Android, mostrar prompt nativo
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                
                if (outcome === 'accepted') {
                    console.log('✓ PWA instalada');
                    btn.classList.add('hidden');
                }
                deferredPrompt = null;
            }
        });

        // Verificar se já está instalado
        const isInStandaloneMode = () =>
            (window.navigator.standalone === true) ||
            (window.matchMedia('(display-mode: standalone)').matches);

        if (isInStandaloneMode()) {
            btn.classList.add('hidden');
        }
    }
}

customElements.define('custom-navbar', CustomNavbar);
