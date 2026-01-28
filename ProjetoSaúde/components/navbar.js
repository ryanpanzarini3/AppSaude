class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
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
                
                .logo:hover {
                    transform: scale(1.05);
                }
                
                .logo-icon {
                    width: 32px;
                    height: 32px;
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
                    color: rgba(255, 255, 255, 0.95);
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
                
                .nav-link:hover {
                    transform: translateY(-2px);
                    color: white;
                }
                
                .nav-link:hover::after {
                    width: 100%;
                }
                
                .nav-link svg {
                    width: 18px;
                    height: 18px;
                }
                
                .mobile-menu-btn {
                    display: none;
                    background: rgba(255, 255, 255, 0.2);
                    border: 2px solid rgba(255, 255, 255, 0.5);
                    color: white;
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                    transition: all 0.3s ease;
                }
                
                .mobile-menu-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                    border-color: white;
                }
                
                .mobile-menu {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: linear-gradient(135deg, #0F6BFF 0%, #00D4FF 100%);
                    flex-direction: column;
                    padding: 1rem 2rem;
                    gap: 1rem;
                    box-shadow: 0 8px 32px rgba(15, 107, 255, 0.3);
                }
                
                .mobile-menu.active {
                    display: flex;
                }
                
                .mobile-menu .nav-link {
                    width: 100%;
                    padding: 0.75rem 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                }
                
                @media (max-width: 768px) {
                    nav {
                        padding: 1rem;
                    }
                    
                    .nav-center {
                        gap: 1rem;
                    }
                    
                    .nav-links {
                        display: none;
                    }
                    
                    .mobile-menu-btn {
                        display: block;
                    }
                    
                    .logo {
                        font-size: 1.25rem;
                    }
                }
                
                @media (max-width: 480px) {
                    nav {
                        padding: 0.75rem;
                    }
                    
                    .logo {
                        font-size: 1rem;
                        gap: 0.4rem;
                    }
                    
                    .logo-icon {
                        width: 24px;
                        height: 24px;
                    }
                }
            </style>
            
            <nav>
                <a href="index.html" class="logo">
                    <i data-feather="heart" class="logo-icon"></i>
                    <span>SaúdePG</span>
                </a>
                
                <div class="nav-center">
                    <div class="nav-links">
                        <a href="index.html" class="nav-link">
                            <i data-feather="home"></i>
                            Início
                        </a>
                        <a href="mapa.html" class="nav-link">
                            <i data-feather="map"></i>
                            Mapa
                        </a>
                        <a href="atendimento.html" class="nav-link">
                            <i data-feather="help-circle"></i>
                            Atendimento
                        </a>
                        <a href="direitos.html" class="nav-link">
                            <i data-feather="shield"></i>
                            Direitos
                        </a>
                        <a href="indicadores.html" class="nav-link">
                            <i data-feather="bar-chart-2"></i>
                            Indicadores
                        </a>
                    </div>
                </div>
                
                <button class="mobile-menu-btn" id="menuBtn">
                    <i data-feather="menu"></i>
                </button>
                
                <div class="mobile-menu" id="mobileMenu">
                    <a href="index.html" class="nav-link">
                        <i data-feather="home"></i>
                        Início
                    </a>
                    <a href="mapa.html" class="nav-link">
                        <i data-feather="map"></i>
                        Mapa
                    </a>
                    <a href="atendimento.html" class="nav-link">
                        <i data-feather="help-circle"></i>
                        Atendimento
                    </a>
                    <a href="direitos.html" class="nav-link">
                        <i data-feather="shield"></i>
                        Direitos
                    </a>
                    <a href="indicadores.html" class="nav-link">
                        <i data-feather="bar-chart-2"></i>
                        Indicadores
                    </a>
                </div>
            </nav>
        `;
        
        // Mobile menu toggle
        const menuBtn = this.shadowRoot.getElementById('menuBtn');
        const mobileMenu = this.shadowRoot.getElementById('mobileMenu');
        
        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
            });
            
            // Close menu when link is clicked
            const links = mobileMenu.querySelectorAll('.nav-link');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                });
            });
        }
    }
}

customElements.define('custom-navbar', CustomNavbar);