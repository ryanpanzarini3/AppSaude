// Componente de Chatbot de Triagem para SaúdePG
class ChatbotTriagem extends HTMLElement {
    constructor() {
        super();
        this.currentStep = 'welcome';
        this.userAnswers = {};
        this.conversationHistory = [];
        
        // Estrutura de perguntas e respostas
        this.chatFlow = {
            welcome: {
                message: 'Olá! Bem-vindo ao atendimento SaúdePG 👋\n\nEu vou ajudar você a encontrar o departamento certo. Por favor, selecione qual tipo de atendimento você procura:',
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
                    { text: 'Clínica Geral', next: 'resultado', dept: 'Clínica Geral', ramal: 101 },
                    { text: 'Cardiologia', next: 'resultado', dept: 'Cardiologia', ramal: 102 },
                    { text: 'Pneumologia', next: 'resultado', dept: 'Pneumologia', ramal: 103 },
                    { text: 'Dermatologia', next: 'resultado', dept: 'Dermatologia', ramal: 104 },
                    { text: 'Reumatologia', next: 'resultado', dept: 'Reumatologia', ramal: 105 }
                ]
            },
            
            odontologia: {
                message: 'Você selecionou Odontologia! 🦷\n\nQual tipo de atendimento odontológico você precisa?',
                options: [
                    { text: 'Limpeza e Prevenção', next: 'resultado', dept: 'Odontologia - Preventiva', ramal: 201 },
                    { text: 'Tratamento de Cárie', next: 'resultado', dept: 'Odontologia - Restauradora', ramal: 202 },
                    { text: 'Endodontia (Canal)', next: 'resultado', dept: 'Odontologia - Endodontia', ramal: 203 },
                    { text: 'Periodontia (Gengiva)', next: 'resultado', dept: 'Odontologia - Periodontia', ramal: 204 },
                    { text: 'Extração Dentária', next: 'resultado', dept: 'Odontologia - Cirurgia', ramal: 205 }
                ]
            },
            
            urgencia: {
                message: 'Você precisa de atendimento de urgência! 🚨\n\nQual é seu sintoma?',
                options: [
                    { text: 'Dor intensa', next: 'resultado', dept: 'Urgência/Emergência', ramal: 301 },
                    { text: 'Febre alta', next: 'resultado', dept: 'Urgência/Emergência', ramal: 301 },
                    { text: 'Dificuldade para respirar', next: 'resultado', dept: 'Urgência/Emergência', ramal: 301 },
                    { text: 'Trauma/Acidente', next: 'resultado', dept: 'Urgência/Emergência', ramal: 301 },
                    { text: 'Outro', next: 'resultado', dept: 'Urgência/Emergência', ramal: 301 }
                ]
            },
            
            vacinacao: {
                message: 'Você procura por vacinação! 💉\n\nQual vacina você precisa?',
                options: [
                    { text: 'Rotina de crianças', next: 'resultado', dept: 'Vacinação Infantil', ramal: 401 },
                    { text: 'Adultos', next: 'resultado', dept: 'Vacinação Adulta', ramal: 402 },
                    { text: 'Idosos', next: 'resultado', dept: 'Vacinação Idosos', ramal: 402 },
                    { text: 'Reforço COVID', next: 'resultado', dept: 'Vacinação COVID', ramal: 403 },
                    { text: 'Influenza', next: 'resultado', dept: 'Vacinação Influenza', ramal: 403 }
                ]
            },
            
            prenatal: {
                message: 'Você procura acompanhamento pré-natal! 🤰\n\nQual é a semana de gestação?',
                options: [
                    { text: '1º Trimestre', next: 'resultado', dept: 'Pré-natal - 1º Trimestre', ramal: 501 },
                    { text: '2º Trimestre', next: 'resultado', dept: 'Pré-natal - 2º Trimestre', ramal: 502 },
                    { text: '3º Trimestre', next: 'resultado', dept: 'Pré-natal - 3º Trimestre', ramal: 503 },
                    { text: 'Não sei', next: 'resultado', dept: 'Pré-natal - Geral', ramal: 501 }
                ]
            },
            
            pediatria: {
                message: 'Você procura atendimento pediátrico! 👶\n\nQual é o tipo de atendimento?',
                options: [
                    { text: 'Consulta de Rotina', next: 'resultado', dept: 'Pediatria - Geral', ramal: 601 },
                    { text: 'Puericultura', next: 'resultado', dept: 'Pediatria - Puericultura', ramal: 602 },
                    { text: 'Vacinação', next: 'resultado', dept: 'Vacinação Infantil', ramal: 401 },
                    { text: 'Doença Aguda', next: 'resultado', dept: 'Pediatria - Urgência', ramal: 603 }
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
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    background: white;
                    border-top: 1px solid #e5e7eb;
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
                        gap: 0.5rem;
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
        this.currentStep = 'welcome';
        this.userAnswers = {};
        this.conversationHistory = [];
        this.showMessage('bot', this.chatFlow.welcome.message);
        this.renderOptions(this.chatFlow.welcome.options);
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
        
        // Auto scroll para o final
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 100);
    }

    renderOptions(options) {
        const optionsContainer = this.querySelector('#chatOptions');
        optionsContainer.innerHTML = '';

        if (this.currentStep === 'resultado') {
            // Mostrar resultado
            const { dept, ramal } = this.userAnswers.result;
            
            const resultBox = document.createElement('div');
            resultBox.innerHTML = `
                <div class="resultado-box">
                    <div class="resultado-label">Seu departamento é:</div>
                    <div class="resultado-dept">${dept}</div>
                    
                    <div class="resultado-label" style="margin-top: 1.5rem;">Ramal para contato:</div>
                    <div class="resultado-ramal">${ramal}</div>
                    
                    <div class="resultado-instrucoes">
                        📞 Disque ${ramal} no telefone da unidade<br>
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
        } else {
            // Mostrar opções normais
            options.forEach(option => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.textContent = option.text;
                btn.addEventListener('click', () => this.handleOption(option));
                optionsContainer.appendChild(btn);
            });
        }
    }

    handleOption(option) {
        // Mostrar resposta do usuário
        this.showMessage('user', option.text);

        // Atualizar estado
        if (option.dept) {
            this.userAnswers.result = { dept: option.dept, ramal: option.ramal };
        }

        // Ir para próximo passo
        this.currentStep = option.next;
        const nextStep = this.chatFlow[this.currentStep];

        if (nextStep) {
            // Mostrar mensagem do próximo passo
            setTimeout(() => {
                this.showMessage('bot', nextStep.message);
                this.renderOptions(nextStep.options);
            }, 500);
        }
    }
}

// Registrar o componente
customElements.define('chatbot-triagem', ChatbotTriagem);
