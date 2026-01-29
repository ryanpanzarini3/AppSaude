// Componente de Chatbot de Triagem para SaúdePG
class ChatbotTriagem extends HTMLElement {
    constructor() {
        super();
        this.currentStep = 'welcome';
        this.userAnswers = {};
        this.conversationHistory = [];
        this.unidades = []; 
        this.userLocation = null; 
        
    
        this.chatFlow = {
            selecionarUnidade: {
                message: 'Olá! Bem-vindo ao atendimento SaúdePG 👋\n\nPrimeiro, preciso saber em qual unidade você se atende. Qual é a sua unidade?',
                options: [] 
            },
            
            buscarUnidade: {
                message: 'Localizando a unidade mais próxima...',
                options: [] 
            },
            
            welcome: {
                message: 'Ótimo! Você se atende na unidade {unidade}.\n\nAgora vou ajudar você a encontrar o departamento certo. Por favor, selecione qual tipo de atendimento você procura:',
                options: [
                    { text: 'Consulta Clínica', next: 'consulta_clinica' },
                    { text: 'Odontologia', next: 'odontologia' },
                    { text: 'Urgência/Emergência', next: 'urgencia' },
                    { text: 'Vacinação', next: 'vacinacao' },
                    { text: 'Pré-natal', next: 'prenatal' },
                    { text: 'Pediatria', next: 'pediatria' }
                ]
            },
            
            consulta_clinica: {
                message: 'Ótimo! Você precisa de uma consulta clínica.\n\nQual especialidade você procura?',
                options: [
                    { text: 'Clínica Geral', next: 'resultado', dept: 'Clínica Geral' },
                    { text: 'Cardiologia', next: 'resultado', dept: 'Cardiologia' },
                    { text: 'Pneumologia', next: 'resultado', dept: 'Pneumologia' },
                    { text: 'Dermatologia', next: 'resultado', dept: 'Dermatologia' },
                    { text: 'Reumatologia', next: 'resultado', dept: 'Reumatologia' }
                ]
            },
            
            odontologia: {
                message: 'Você selecionou Odontologia! 🦷\n\nQual tipo de atendimento odontológico você precisa?',
                options: [
                    { text: 'Limpeza e Prevenção', next: 'resultado', dept: 'Odontologia - Preventiva' },
                    { text: 'Tratamento de Cárie', next: 'resultado', dept: 'Odontologia - Restauradora' },
                    { text: 'Endodontia (Canal)', next: 'resultado', dept: 'Odontologia - Endodontia' },
                    { text: 'Periodontia (Gengiva)', next: 'resultado', dept: 'Odontologia - Periodontia' },
                    { text: 'Extração Dentária', next: 'resultado', dept: 'Odontologia - Cirurgia' }
                ]
            },
            
            urgencia: {
                message: 'Você precisa de atendimento de urgência! 🚨\n\nQual é seu sintoma?',
                options: [
                    { text: 'Dor intensa', next: 'resultado', dept: 'Urgência/Emergência' },
                    { text: 'Febre alta', next: 'resultado', dept: 'Urgência/Emergência' },
                    { text: 'Dificuldade para respirar', next: 'resultado', dept: 'Urgência/Emergência' },
                    { text: 'Trauma/Acidente', next: 'resultado', dept: 'Urgência/Emergência' },
                    { text: 'Outro', next: 'resultado', dept: 'Urgência/Emergência' }
                ]
            },
            
            vacinacao: {
                message: 'Você procura por vacinação! 💉\n\nQual vacina você precisa?',
                options: [
                    { text: 'Rotina de crianças', next: 'resultado', dept: 'Vacinação Infantil' },
                    { text: 'Adultos', next: 'resultado', dept: 'Vacinação Adulta' },
                    { text: 'Idosos', next: 'resultado', dept: 'Vacinação Idosos' },
                    { text: 'Reforço COVID', next: 'resultado', dept: 'Vacinação COVID' },
                    { text: 'Influenza', next: 'resultado', dept: 'Vacinação Influenza' }
                ]
            },
            
            prenatal: {
                message: 'Você procura acompanhamento pré-natal! 🤰\n\nQual é a semana de gestação?',
                options: [
                    { text: '1º Trimestre', next: 'resultado', dept: 'Pré-natal - 1º Trimestre' },
                    { text: '2º Trimestre', next: 'resultado', dept: 'Pré-natal - 2º Trimestre' },
                    { text: '3º Trimestre', next: 'resultado', dept: 'Pré-natal - 3º Trimestre' },
                    { text: 'Não sei', next: 'resultado', dept: 'Pré-natal - Geral' }
                ]
            },
            
            pediatria: {
                message: 'Você procura atendimento pediátrico! 👶\n\nQual é o tipo de atendimento?',
                options: [
                    { text: 'Consulta de Rotina', next: 'resultado', dept: 'Pediatria - Geral' },
                    { text: 'Puericultura', next: 'resultado', dept: 'Pediatria - Puericultura' },
                    { text: 'Vacinação', next: 'resultado', dept: 'Vacinação Infantil' },
                    { text: 'Doença Aguda', next: 'resultado', dept: 'Pediatria - Urgência' }
                ]
            },
            
            resultado: {
                message: 'Perfeito! Encontrei o departamento para você!',
                options: []
            }
        };
    }

    connectedCallback() {
        this.render();
        this.setupListeners();
        this.carregarUnidades().then(() => {
            this.startChat();
        });
    }

    carregarUnidades() {
        
        return fetch('./coordenadas-extraidas.json')
            .then(response => response.json())
            .then(data => {
                this.unidades = data;
    
                this.preencherOpcoesUnidades();
            })
            .catch(err => {
                console.error('Erro ao carregar unidades:', err);
            
                this.unidades = [];
            });
    }

    preencherOpcoesUnidades() {
        
        const opcoes = this.unidades.map(unidade => ({
            text: unidade.nome,
            next: 'welcome',
            selectedUnit: unidade.nome,
            unidadeData: unidade
        }));

        
        opcoes.push({
            text: '� Não sei - Localizar unidade mais próxima',
            next: 'buscarUnidade',
            selectedUnit: 'buscar',
            isBuscar: true
        });

        this.chatFlow.selecionarUnidade.options = opcoes;
    }

    render() {
        this.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                }

                .chatbot-container {
                    background: white;
                    border-radius: 1.5rem;
                    box-shadow: 0 20px 60px rgba(15, 107, 255, 0.15);
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    height: 600px;
                    max-height: 90vh;
                }

                .chat-header {
                    background: linear-gradient(135deg, #0F6BFF 0%, #00D4FF 100%);
                    color: white;
                    padding: 1.5rem;
                    text-align: center;
                    font-weight: 700;
                    font-size: 1.25rem;
                }

                .chat-messages {
                    flex: 1;
                    overflow-y: auto;
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    background: #f9fafb;
                }

                .message {
                    display: flex;
                    gap: 0.75rem;
                    animation: slideIn 0.3s ease-out;
                }

                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .message.user {
                    justify-content: flex-end;
                }

                .message-content {
                    max-width: 75%;
                    padding: 0.75rem 1rem;
                    border-radius: 1rem;
                    line-height: 1.5;
                    font-size: 0.95rem;
                }

                .message.bot .message-content {
                    background: white;
                    border: 1px solid #e5e7eb;
                    color: #1f2937;
                    border-bottom-left-radius: 0.25rem;
                }

                .message.user .message-content {
                    background: linear-gradient(135deg, #0F6BFF 0%, #00D4FF 100%);
                    color: white;
                    border-bottom-right-radius: 0.25rem;
                }

                .chat-options {
                    padding: 1.5rem;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    background: #f9fafb;
                    border-top: 1px solid #e5e7eb;
                    max-height: 400px;
                    overflow-y: auto;
                }

                .option-card {
                    padding: 1.5rem;
                    border: 2px solid #e5e7eb;
                    background: white;
                    border-radius: 1rem;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                    color: #1f2937;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 80px;
                    word-wrap: break-word;
                }

                .option-card:hover {
                    border-color: #0F6BFF;
                    background: #f0f9ff;
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(15, 107, 255, 0.1);
                }

                .option-card:active {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 10px rgba(15, 107, 255, 0.15);
                }

                .option-btn {
                    padding: 0.75rem 1rem;
                    border: 2px solid #e5e7eb;
                    background: white;
                    border-radius: 0.75rem;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.95rem;
                    transition: all 0.3s ease;
                    color: #1f2937;
                    text-align: left;
                }

                .option-btn:hover {
                    border-color: #0F6BFF;
                    background: #f0f9ff;
                    transform: translateX(5px);
                }

                .option-btn:active {
                    transform: scale(0.98);
                }

                .search-container {
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    background: white;
                    border-top: 1px solid #e5e7eb;
                }

                .search-input {
                    padding: 0.75rem 1rem;
                    border: 2px solid #e5e7eb;
                    border-radius: 0.75rem;
                    font-size: 1rem;
                    width: 100%;
                    transition: all 0.3s ease;
                }

                .search-input:focus {
                    outline: none;
                    border-color: #0F6BFF;
                    box-shadow: 0 0 0 3px rgba(15, 107, 255, 0.1);
                }

                .search-results {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    max-height: 300px;
                    overflow-y: auto;
                }

                .search-result-item {
                    padding: 0.75rem 1rem;
                    border: 1px solid #e5e7eb;
                    border-radius: 0.5rem;
                    background: white;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .search-result-item:hover {
                    border-color: #0F6BFF;
                    background: #f0f9ff;
                }

                .no-results {
                    padding: 1rem;
                    text-align: center;
                    color: #9ca3af;
                    font-size: 0.9rem;
                }

                .loading-spinner {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    border: 3px solid rgba(15, 107, 255, 0.3);
                    border-radius: 50%;
                    border-top-color: #0F6BFF;
                    animation: spin 0.6s linear infinite;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                .location-message {
                    padding: 1.5rem;
                    text-align: center;
                    color: #6b7280;
                    font-size: 0.95rem;
                    line-height: 1.6;
                }

                .location-error {
                    padding: 1.5rem;
                    background: #fee2e2;
                    border: 1px solid #fca5a5;
                    border-radius: 0.75rem;
                    color: #991b1b;
                    text-align: center;
                    margin: 1rem 0;
                }

                .resultado-box {
                    background: linear-gradient(135deg, rgba(15, 107, 255, 0.1) 0%, rgba(0, 212, 255, 0.1) 100%);
                    border: 2px solid #0F6BFF;
                    border-radius: 1rem;
                    padding: 1.5rem;
                    text-align: center;
                    margin: 1rem 0;
                }

                .resultado-label {
                    font-size: 0.85rem;
                    color: #6b7280;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 0.5rem;
                }

                .resultado-dept {
                    font-size: 1.5rem;
                    font-weight: 700;
                    background: linear-gradient(135deg, #0F6BFF 0%, #00D4FF 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 0.5rem;
                }

                .resultado-ramal {
                    font-size: 2.5rem;
                    font-weight: 800;
                    color: #0F6BFF;
                    margin: 1rem 0;
                }

                .resultado-instrucoes {
                    font-size: 0.9rem;
                    color: #6b7280;
                    margin-top: 1rem;
                    line-height: 1.6;
                }

                .reset-btn {
                    background: linear-gradient(135deg, #0F6BFF 0%, #00D4FF 100%);
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.75rem;
                    cursor: pointer;
                    font-weight: 600;
                    margin-top: 1rem;
                    width: 100%;
                    transition: all 0.3s ease;
                }

                .reset-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(15, 107, 255, 0.3);
                }

                /* Scrollbar customizado */
                .chat-messages::-webkit-scrollbar {
                    width: 8px;
                }

                .chat-messages::-webkit-scrollbar-track {
                    background: #f3f4f6;
                }

                .chat-messages::-webkit-scrollbar-thumb {
                    background: linear-gradient(135deg, #0F6BFF 0%, #00D4FF 100%);
                    border-radius: 4px;
                }

                .chat-messages::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(135deg, #0d5ed9 0%, #00bfff 100%);
                }

                @media (max-width: 640px) {
                    .chatbot-container {
                        height: 90vh;
                        border-radius: 1rem;
                    }

                    .chat-header {
                        padding: 1rem;
                        font-size: 1.1rem;
                    }

                    .chat-messages {
                        padding: 1rem;
                        gap: 0.75rem;
                    }

                    .message-content {
                        max-width: 85%;
                        font-size: 0.9rem;
                    }

                    .chat-options {
                        padding: 1rem;
                        gap: 0.75rem;
                        grid-template-columns: 1fr;
                    }

                    .option-card {
                        padding: 1rem;
                        font-size: 0.85rem;
                        min-height: 70px;
                    }

                    .option-btn {
                        padding: 0.65rem 0.85rem;
                        font-size: 0.9rem;
                    }

                    .resultado-ramal {
                        font-size: 2rem;
                    }
                }
            </style>

            <div class="chatbot-container">
                <div class="chat-header">
                    💬 Triagem de Atendimento
                </div>
                
                <div class="chat-messages" id="chatMessages"></div>
                
                <div class="chat-options" id="chatOptions"></div>
            </div>
        `;
    }

    setupListeners() {
        this.startChat();
    }

    startChat() {
        this.currentStep = 'selecionarUnidade';
        this.userAnswers = {};
        this.conversationHistory = [];
        this.showMessage('bot', this.chatFlow.selecionarUnidade.message);
        this.renderOptions(this.chatFlow.selecionarUnidade.options);
    }

    showMessage(sender, text) {
        const messagesContainer = this.querySelector('#chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.textContent = text;
        
        messageDiv.appendChild(content);
        messagesContainer.appendChild(messageDiv);
        
        
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 100);
    }

    renderOptions(options) {
        const optionsContainer = this.querySelector('#chatOptions');
        optionsContainer.innerHTML = '';

        if (this.currentStep === 'resultado') {
            
            const { dept, unidade, ramal } = this.userAnswers.result;
            
            const resultBox = document.createElement('div');
            resultBox.innerHTML = `
                <div class="resultado-box">
                    <div class="resultado-label">Departamento:</div>
                    <div class="resultado-dept">${dept}</div>
                    
                    <div class="resultado-label" style="margin-top: 1.5rem;">Unidade:</div>
                    <div class="resultado-dept" style="font-size: 1.1rem; color: #0F6BFF;">${unidade}</div>
                    
                    <div class="resultado-label" style="margin-top: 1.5rem;">Ramal para contato:</div>
                    <div class="resultado-ramal">${ramal}</div>
                    
                    <div class="resultado-instrucoes">
                        📞 Disque ${ramal} no telefone da unidade<br>
                        📍 ${unidade}<br>
                        ⏰ Horário de atendimento: 7h às 17h<br>
                        📱 Você também pode agendar online
                    </div>
                </div>
            `;
            optionsContainer.appendChild(resultBox);

            const resetBtn = document.createElement('button');
            resetBtn.className = 'reset-btn';
            resetBtn.textContent = '🔄 Fazer Nova Triagem';
            resetBtn.addEventListener('click', () => this.startChat());
            optionsContainer.appendChild(resetBtn);
        } else if (this.currentStep === 'buscarUnidade') {
            
            const messageDiv = document.createElement('div');
            messageDiv.className = 'location-message';
            messageDiv.innerHTML = `
                <div class="loading-spinner"></div>
                <p style="margin-top: 1rem;">Localizando sua posição...</p>
                <p style="font-size: 0.85rem; color: #9ca3af; margin-top: 0.5rem;">
                    Certifique-se de permitir acesso à localização
                </p>
            `;
            optionsContainer.appendChild(messageDiv);
            
            
            this.buscarUnidadeProxima();
        } else {
            
            options.forEach(option => {
                const card = document.createElement('button');
                card.className = 'option-card';
                card.textContent = option.text;
                card.addEventListener('click', () => this.handleOption(option));
                optionsContainer.appendChild(card);
            });
        }
    }

    handleOption(option) {
        
        this.showMessage('user', option.text);

        
        if (this.currentStep === 'selecionarUnidade') {
            if (option.isBuscar) {
                
                this.currentStep = option.next;
                const nextStep = this.chatFlow[this.currentStep];
                setTimeout(() => {
                    this.showMessage('bot', nextStep.message);
                    this.renderOptions(nextStep.options);
                }, 500);
                return;
            } else {
                
                this.userAnswers.unidade = option.selectedUnit;
                this.userAnswers.ramalUnidade = option.unidadeData?.ramal;
            }
        }

        
        if (option.dept) {
            this.userAnswers.result = { 
                dept: option.dept, 
                unidade: this.userAnswers.unidade,
                ramal: this.userAnswers.ramalUnidade 
            };
        }

        
        this.prosseguirParaProximoPasso(option);
    }

    prosseguirParaProximoPasso(option) {
        
        this.currentStep = option.next;
        const nextStep = this.chatFlow[this.currentStep];

        if (nextStep) {
            
            let message = nextStep.message;
            if (this.userAnswers.unidade && message.includes('{unidade}')) {
                message = message.replace('{unidade}', this.userAnswers.unidade);
            }

            
            setTimeout(() => {
                this.showMessage('bot', message);
                this.renderOptions(nextStep.options);
            }, 500);
        }
    }

    buscarUnidadeProxima() {
        
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    
                    
                    let unidadeProxima = this.unidades[0];
                    let menorDistancia = this.calcularDistancia(
                        userLat, 
                        userLng, 
                        unidadeProxima.lat, 
                        unidadeProxima.lng
                    );

                    for (let unidade of this.unidades) {
                        const distancia = this.calcularDistancia(
                            userLat, 
                            userLng, 
                            unidade.lat, 
                            unidade.lng
                        );
                        if (distancia < menorDistancia) {
                            menorDistancia = distancia;
                            unidadeProxima = unidade;
                        }
                    }

                    this.userAnswers.unidade = unidadeProxima.nome;
                    this.showMessage('user', '📍 Não sei - Localizar unidade mais próxima');
                    this.showMessage('bot', `✅ Encontrei a unidade mais próxima: ${unidadeProxima.nome}`);
                    
                    
                    this.userAnswers.ramalUnidade = unidadeProxima.ramal;
                    
                    
                    setTimeout(() => {
                        this.currentStep = 'welcome';
                        const nextStep = this.chatFlow['welcome'];
                        let message = nextStep.message.replace('{unidade}', unidadeProxima.nome);
                        this.showMessage('bot', message);
                        this.renderOptions(nextStep.options);
                    }, 1500);
                },
                (error) => {
                    
                    console.error('Erro de geolocalização:', error);
                    
                    let errorMessage = '❌ Não conseguimos localizar sua posição.';
                    let errorDetails = '';
                    
                    if (error.code === error.PERMISSION_DENIED) {
                        errorMessage = '❌ Acesso à localização negado.';
                        errorDetails = 'Por favor, permita acesso à sua localização nas configurações do navegador.';
                    } else if (error.code === error.POSITION_UNAVAILABLE) {
                        errorMessage = '❌ Informação de localização indisponível.';
                        errorDetails = 'Tente novamente ou selecione sua unidade manualmente.';
                    } else if (error.code === error.TIMEOUT) {
                        errorMessage = '❌ Tempo de localização expirado.';
                        errorDetails = 'A localização demorou muito. Tente novamente ou selecione manualmente.';
                    }
                    
                    this.showMessage('bot', errorMessage);
                    
                    const optionsContainer = this.querySelector('#chatOptions');
                    optionsContainer.innerHTML = '';
                    
                    const errorBox = document.createElement('div');
                    errorBox.className = 'location-error';
                    errorBox.innerHTML = `<strong>${errorMessage}</strong><p>${errorDetails}</p>`;
                    optionsContainer.appendChild(errorBox);
                    
                   
                    const backBtn = document.createElement('button');
                    backBtn.className = 'reset-btn';
                    backBtn.textContent = '⬅️ Voltar para Seleção de Unidade';
                    backBtn.style.marginTop = '1rem';
                    backBtn.addEventListener('click', () => this.startChat());
                    optionsContainer.appendChild(backBtn);
                }
            );
        } else {
            
            this.showMessage('bot', '❌ Geolocalização não disponível neste navegador.');
            
            const optionsContainer = this.querySelector('#chatOptions');
            optionsContainer.innerHTML = '';
            
            const errorBox = document.createElement('div');
            errorBox.className = 'location-error';
            errorBox.innerHTML = '<strong>Seu navegador não suporta geolocalização.</strong><p>Por favor, selecione sua unidade manualmente ou use outro navegador.</p>';
            optionsContainer.appendChild(errorBox);
            
           
            const backBtn = document.createElement('button');
            backBtn.className = 'reset-btn';
            backBtn.textContent = '⬅️ Voltar para Seleção de Unidade';
            backBtn.style.marginTop = '1rem';
            backBtn.addEventListener('click', () => this.startChat());
            optionsContainer.appendChild(backBtn);
        }
    }



    calcularDistancia(lat1, lng1, lat2, lng2) {
      
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
}


customElements.define('chatbot-triagem', ChatbotTriagem);


