// Componente para gerenciar prompts de instalação da PWA
class InstallPrompt extends HTMLElement {
    constructor() {
        super();
        this.deferredPrompt = null;
        this.isInstalled = false;
        this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    }

    connectedCallback() {
        this.render();
        this.setupListeners();
    }

    render() {
        
        if (this.isIOS) {
            this.renderIOSPrompt();
        } else {
            this.renderAndroidPrompt();
        }
    }

    renderAndroidPrompt() {
        this.innerHTML = `
            <div id="install-prompt" class="hidden fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-white rounded-lg shadow-2xl p-4 md:p-6 max-w-sm z-50 border-l-4 border-blue-600 animate-slide-up">
                <div class="flex items-start justify-between gap-4">
                    <div class="flex-1">
                        <div class="flex items-center gap-3 mb-2">
                            <svg class="w-6 h-6 md:w-8 md:h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a1 1 0 001 1h12a1 1 0 00.82-.45l2.84-4.27a1 1 0 00-.82-1.55H4zm0 5a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/>
                            </svg>
                            <h3 class="text-lg md:text-xl font-bold text-gray-900">Instale SaúdePG</h3>
                        </div>
                        <p class="text-sm md:text-base text-gray-600 mb-4">Acesse rapidamente como um aplicativo no seu dispositivo</p>
                    </div>
                    <button id="install-close" class="text-gray-400 hover:text-gray-600 flex-shrink-0" aria-label="Fechar">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                        </svg>
                    </button>
                </div>
                <div class="flex gap-2 flex-col sm:flex-row">
                    <button id="install-btn" class="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-2 md:py-3 px-4 rounded-lg hover:shadow-lg transition transform hover:scale-105 active:scale-95">
                        Instalar
                    </button>
                    <button id="install-later" class="flex-1 bg-gray-100 text-gray-700 font-semibold py-2 md:py-3 px-4 rounded-lg hover:bg-gray-200 transition">
                        Depois
                    </button>
                </div>
            </div>

            <style>
                @keyframes slideUp {
                    from {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                .animate-slide-up {
                    animation: slideUp 0.3s ease-out;
                }

                #install-prompt:not(.hidden) {
                    display: block;
                }

                #install-prompt.hidden {
                    display: none;
                }
            </style>
        `;
    }

    renderIOSPrompt() {
        const installarUrl = (window.APP_BASE_PATH || './') + 'instalar.html';
        this.innerHTML = `
            <div id="install-prompt" class="hidden fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-white rounded-lg shadow-2xl p-4 md:p-6 max-w-sm z-50 border-l-4 border-green-600 animate-slide-up">
                <div class="flex items-start justify-between gap-4">
                    <div class="flex-1">
                        <div class="flex items-center gap-3 mb-2">
                            <svg class="w-6 h-6 md:w-8 md:h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a1 1 0 001 1h12a1 1 0 00.82-.45l2.84-4.27a1 1 0 00-.82-1.55H4zm0 5a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/>
                            </svg>
                            <h3 class="text-lg md:text-xl font-bold text-gray-900">Instale SaúdePG</h3>
                        </div>
                        <p class="text-sm md:text-base text-gray-600 mb-4">Salve como Web App para acesso rápido</p>
                    </div>
                    <button id="install-close" class="text-gray-400 hover:text-gray-600 flex-shrink-0" aria-label="Fechar">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                        </svg>
                    </button>
                </div>
                <div class="flex gap-2 flex-col sm:flex-row">
                    <a href="${installarUrl}" class="flex-1 bg-gradient-to-r from-green-600 to-teal-500 text-white font-semibold py-2 md:py-3 px-4 rounded-lg hover:shadow-lg transition transform hover:scale-105 active:scale-95 text-center no-underline">
                        Ver Instruções
                    </a>
                    <button id="install-later" class="flex-1 bg-gray-100 text-gray-700 font-semibold py-2 md:py-3 px-4 rounded-lg hover:bg-gray-200 transition">
                        Depois
                    </button>
                </div>
            </div>

            <style>
                @keyframes slideUp {
                    from {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                .animate-slide-up {
                    animation: slideUp 0.3s ease-out;
                }

                #install-prompt:not(.hidden) {
                    display: block;
                }

                #install-prompt.hidden {
                    display: none;
                }

                a {
                    text-decoration: none;
                }
            </style>
        `;
    }

    setupListeners() {
       
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showPrompt();
        });

       
        window.addEventListener('appinstalled', () => {
            console.log('✓ PWA instalada com sucesso');
            this.isInstalled = true;
            this.hidePrompt();
            this.notifyInstalled();
        });

       
        const installBtn = this.querySelector('#install-btn');
        const closeBtn = this.querySelector('#install-close');
        const laterBtn = this.querySelector('#install-later');

        if (installBtn && !this.isIOS) {
            installBtn.addEventListener('click', () => this.handleInstall());
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hidePrompt());
        }

        if (laterBtn) {
            laterBtn.addEventListener('click', () => {
                this.hidePrompt();
                this.remindLater();
            });
        }

        
        this.checkIfInstalled();
    }

    async handleInstall() {
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            const { outcome } = await this.deferredPrompt.userChoice;
            
            if (outcome === 'accepted') {
                console.log('✓ Usuário aceitou instalar');
                localStorage.setItem('pwa-install-time', new Date().toISOString());
            } else {
                console.log('✗ Usuário recusou instalar');
            }
            
            this.deferredPrompt = null;
            this.hidePrompt();
        }
    }

    hidePrompt() {
        const prompt = this.querySelector('#install-prompt');
        if (prompt) {
            prompt.classList.add('hidden');
        }
    }

    showPrompt() {
       
        if (this.isInstalled) {
            return;
        }

        
        const lastDismissed = localStorage.getItem('pwa-install-dismissed');
        if (lastDismissed) {
            const daysSinceDismissed = (Date.now() - new Date(lastDismissed).getTime()) / (1000 * 60 * 60 * 24);
            if (daysSinceDismissed < 7) {
                return; 
            }
        }

        const prompt = this.querySelector('#install-prompt');
        if (prompt) {
            prompt.classList.remove('hidden');
        }
    }

    hidePromptPermanently() {
        localStorage.setItem('pwa-install-dismissed', new Date().toISOString());
        this.hidePrompt();
    }

    remindLater() {
        localStorage.setItem('pwa-install-dismissed', new Date().toISOString());
    }

    notifyInstalled() {
        
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-up z-50';
        notification.textContent = '✓ SaúdePG instalado com sucesso!';
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    checkIfInstalled() {
        
        const isInStandaloneMode = () =>
            (window.navigator.standalone === true) ||
            (window.matchMedia('(display-mode: standalone)').matches);

        if (isInStandaloneMode()) {
            this.isInstalled = true;
            this.hidePrompt();
        }
    }
}


customElements.define('install-prompt', InstallPrompt);


console.log('✓ InstallPrompt carregado');

