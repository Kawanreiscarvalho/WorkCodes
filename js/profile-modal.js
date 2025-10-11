// profile-modal.js
class ProfileModal {
    constructor() {
        this.currentTab = 'info';
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Fechar modal ao clicar no X ou fora
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-modal') || 
                e.target.classList.contains('profile-modal')) {
                this.closeModal();
            }
        });

        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    openModal(freelancerData) {
        this.currentFreelancer = freelancerData;
        const modal = document.getElementById('profileModal');
        modal.style.display = 'flex';
        
        this.loadProfileData(freelancerData);
        this.switchTab('info'); // Aba padrão
    }

    closeModal() {
        const modal = document.getElementById('profileModal');
        modal.style.display = 'none';
    }

    loadProfileData(freelancerData) {
        const modalContent = document.querySelector('#profileModal .modal-content');
        
        modalContent.innerHTML = `
            <div class="modal-header">
                <h3 class="modal-title">Perfil do Freelancer</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="profile-header">
                    <img src="${freelancerData.avatar}" alt="${freelancerData.name}" class="profile-avatar-large">
                    <div class="profile-info">
                        <h3>${freelancerData.name}</h3>
                        <div class="profile-role">${freelancerData.role}</div>
                        <div class="profile-stats-large">
                            <div class="stat-large">
                                <span class="stat-number-large">${freelancerData.completedProjects || 0}</span>
                                <span class="stat-label-large">Projetos</span>
                            </div>
                            <div class="stat-large">
                                <span class="stat-number-large">${freelancerData.rating || '0.0'}</span>
                                <span class="stat-label-large">Avaliação</span>
                            </div>
                            <div class="stat-large">
                                <span class="stat-number-large">${freelancerData.hourlyRate || '0'}</span>
                                <span class="stat-label-large">R$/hora</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="profile-tabs">
                    <button class="tab-btn active" data-tab="info">Informações</button>
                    <button class="tab-btn" data-tab="skills">Habilidades</button>
                    <button class="tab-btn" data-tab="ratings">Avaliações</button>
                    <button class="tab-btn" data-tab="chat">Chat</button>
                </div>

                <div class="tab-content active" id="tab-info">
                    ${this.renderInfoTab(freelancerData)}
                </div>
                
                <div class="tab-content" id="tab-skills">
                    ${this.renderSkillsTab(freelancerData)}
                </div>
                
                <div class="tab-content" id="tab-ratings">
                    ${this.renderRatingsTab(freelancerData)}
                </div>
                
                <div class="tab-content" id="tab-chat">
                    ${this.renderChatTab(freelancerData)}
                </div>

                <div class="profile-actions">
                    <button class="action-btn primary" onclick="openContractModal('${freelancerData.id}', '${freelancerData.name}', ${freelancerData.hourlyRate || 0})">
                        <i class='bx bx-file'></i>
                        Enviar Proposta
                    </button>
                    <button class="action-btn secondary" onclick="openRatingModal('${freelancerData.id}', '${freelancerData.name}')">
                        <i class='bx bx-star'></i>
                        Avaliar
                    </button>
                </div>
            </div>
        `;

        // Adicionar event listeners para as abas
        this.initializeTabListeners();
    }

    initializeTabListeners() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabName = button.getAttribute('data-tab');
                this.switchTab(tabName);
            });
        });
    }

    switchTab(tabName) {
        // Remover classe active de todas as abas e conteúdos
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Adicionar classe active à aba e conteúdo selecionados
        document.querySelector(`.tab-btn[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`tab-${tabName}`).classList.add('active');
        
        this.currentTab = tabName;
    }

    renderInfoTab(freelancerData) {
        return `
            <div class="info-section">
                <h4>Sobre</h4>
                <p style="color: rgba(255, 255, 255, 0.8); line-height: 1.6; margin-bottom: 20px;">
                    ${freelancerData.bio || 'Este freelancer ainda não adicionou uma biografia.'}
                </p>
                
                <div class="info-grid">
                    <div class="info-item">
                        <strong>Localização:</strong>
                        <span>${freelancerData.location || 'Não informada'}</span>
                    </div>
                    <div class="info-item">
                        <strong>Disponibilidade:</strong>
                        <span style="color: ${freelancerData.available ? '#4CAF50' : '#f44336'}">
                            ${freelancerData.available ? 'Disponível' : 'Indisponível'}
                        </span>
                    </div>
                    <div class="info-item">
                        <strong>Experiência:</strong>
                        <span>${freelancerData.experience || 'Não informada'}</span>
                    </div>
                    <div class="info-item">
                        <strong>Idiomas:</strong>
                        <span>${freelancerData.languages || 'Português'}</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderSkillsTab(freelancerData) {
        const skills = freelancerData.skills || ['JavaScript', 'React', 'Node.js'];
        
        return `
            <div class="skills-section">
                <h4>Habilidades Técnicas</h4>
                <div class="skills-grid">
                    ${skills.map(skill => `
                        <div class="skill-tag">${skill}</div>
                    `).join('')}
                </div>
                
                <h4 style="margin-top: 30px;">Ferramentas</h4>
                <div class="skills-grid">
                    ${(freelancerData.tools || ['Git', 'VS Code', 'Figma']).map(tool => `
                        <div class="skill-tag">${tool}</div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderRatingsTab(freelancerData) {
        const ratings = freelancerData.ratings || [
            {
                user: 'Empresa Tech',
                rating: 5,
                comment: 'Excelente trabalho! Entregou antes do prazo com qualidade superior.',
                date: '2024-01-15'
            },
            {
                user: 'Startup Inovação',
                rating: 4,
                comment: 'Muito profissional e comunicativo. Recomendo!',
                date: '2024-01-10'
            }
        ];
        
        return `
            <div class="ratings-section">
                <h4>Avaliações (${ratings.length})</h4>
                <div class="ratings-container">
                    ${ratings.length > 0 ? ratings.map(rating => `
                        <div class="rating-item">
                            <div class="rating-header">
                                <div class="rating-user">
                                    <span class="rating-name">${rating.user}</span>
                                    <div class="rating-stars">
                                        ${'★'.repeat(rating.rating)}${'☆'.repeat(5 - rating.rating)}
                                    </div>
                                </div>
                                <span class="rating-date">${rating.date}</span>
                            </div>
                            <div class="rating-comment">${rating.comment}</div>
                        </div>
                    `).join('') : `
                        <p style="color: rgba(255, 255, 255, 0.6); text-align: center; padding: 40px;">
                            Este freelancer ainda não possui avaliações.
                        </p>
                    `}
                </div>
            </div>
        `;
    }

    renderChatTab(freelancerData) {
        return `
            <div class="chat-container-modal">
                <div class="chat-messages-modal" id="chatMessagesModal">
                    <div class="message received">
                        <div class="message-sender">${freelancerData.name}</div>
                        <div class="message-text">Olá! Como posso ajudar no seu projeto?</div>
                        <div class="message-time">Agora</div>
                    </div>
                </div>
                <div class="chat-input-container-modal">
                    <input type="text" class="chat-input-modal" placeholder="Digite sua mensagem..." id="chatInputModal">
                    <button class="send-message-modal" onclick="sendChatMessageModal()">
                        <i class='bx bx-send'></i>
                    </button>
                </div>
            </div>
        `;
    }
}

// Função global para abrir modal de perfil
function openProfileModal(freelancerData) {
    if (!window.profileModal) {
        window.profileModal = new ProfileModal();
    }
    window.profileModal.openModal(freelancerData);
}

// Função para enviar mensagem no chat do modal
function sendChatMessageModal() {
    const input = document.getElementById('chatInputModal');
    const message = input.value.trim();
    
    if (message) {
        const messagesContainer = document.getElementById('chatMessagesModal');
        
        const messageElement = document.createElement('div');
        messageElement.className = 'message sent';
        messageElement.innerHTML = `
            <div class="message-sender">Você</div>
            <div class="message-text">${message}</div>
            <div class="message-time">Agora</div>
        `;
        
        messagesContainer.appendChild(messageElement);
        input.value = '';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Simular resposta após 1 segundo
        setTimeout(() => {
            const responseElement = document.createElement('div');
            responseElement.className = 'message received';
            responseElement.innerHTML = `
                <div class="message-sender">${window.profileModal.currentFreelancer.name}</div>
                <div class="message-text">Obrigado pela mensagem! Responderei em breve.</div>
                <div class="message-time">Agora</div>
            `;
            
            messagesContainer.appendChild(responseElement);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 1000);
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    window.profileModal = new ProfileModal();
    console.log('Sistema de modal de perfil carregado com sucesso!');
});