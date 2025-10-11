// === SEU CÓDIGO ORIGINAL - MANTIDO INTACTO ===
const freelancersData = [
    {
        id: 1,
        name: "Ana Silva",
        title: "Desenvolvedora Full Stack",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        rating: 4.9,
        reviews: 127,
        skills: ["JavaScript", "React", "Node.js", "TypeScript"],
        rate: 85,
        availability: "Disponível",
        contractSize: "medium",
        experience: "Senior",
        // DADOS EXPANDIDOS PARA O PERFIL
        description: "Desenvolvedora full stack com 5 anos de experiência em projetos web escaláveis. Especialista em React, Node.js e arquitetura de microserviços.",
        location: "São Paulo, SP",
        languages: ["JavaScript", "TypeScript", "Python"],
        frameworks: ["React", "Node.js", "Express.js", "Next.js"],
        tools: ["Git", "Docker", "AWS", "Figma"],
        reviewsList: [
            {
                company: "Tech Solutions Ltda",
                rating: 5,
                comment: "Excelente profissional! Entregou o projeto antes do prazo com qualidade excepcional.",
                date: "2024-01-15"
            },
            {
                company: "Inova Tech",
                rating: 4,
                comment: "Muito competente e comunicativa. Recomendo!",
                date: "2024-02-20"
            }
        ]
    },
    {
        id: 2,
        name: "Carlos Santos",
        title: "Mobile Developer",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        rating: 4.7,
        reviews: 89,
        skills: ["React Native", "Flutter", "Firebase", "iOS"],
        rate: 75,
        availability: "Em breve",
        contractSize: "small",
        experience: "Pleno",
        description: "Desenvolvedor mobile especializado em React Native e Flutter. Mais de 3 anos de experiência em aplicações nativas e híbridas.",
        location: "Rio de Janeiro, RJ",
        languages: ["JavaScript", "Dart", "Swift"],
        frameworks: ["React Native", "Flutter", "Firebase"],
        tools: ["Git", "Xcode", "Android Studio", "Figma"],
        reviewsList: [
            {
                company: "Mobile First",
                rating: 5,
                comment: "Ótimo desenvolvedor, muito comprometido com os prazos.",
                date: "2024-03-10"
            }
        ]
    },
    {
        id: 3,
        name: "Marina Oliveira",
        title: "UI/UX Designer",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        rating: 4.8,
        reviews: 156,
        skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
        rate: 65,
        availability: "Disponível",
        contractSize: "large",
        experience: "Senior",
        description: "Designer UX/UI com 6 anos de experiência em design de interfaces e experiência do usuário. Especialista em design system e pesquisa de usuários.",
        location: "Belo Horizonte, MG",
        languages: [],
        frameworks: ["Figma", "Adobe XD", "Sketch"],
        tools: ["Figma", "Adobe Creative Suite", "Miro", "UserTesting"],
        reviewsList: [
            {
                company: "Design Co",
                rating: 5,
                comment: "Designer excepcional! Transformou completamente nossa interface.",
                date: "2024-01-30"
            }
        ]
    },
    {
        id: 4,
        name: "Ricardo Lima",
        title: "DevOps Engineer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 4.9,
        reviews: 94,
        skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
        rate: 95,
        availability: "Disponível",
        contractSize: "large",
        experience: "Senior",
        description: "Engenheiro DevOps com expertise em infraestrutura cloud, containers e automação de pipelines. Certificado AWS Solutions Architect.",
        location: "Porto Alegre, RS",
        languages: ["Python", "Bash", "YAML"],
        frameworks: ["Docker", "Kubernetes", "Terraform"],
        tools: ["AWS", "GitLab CI", "Jenkins", "Prometheus"],
        reviewsList: [
            {
                company: "Cloud Tech",
                rating: 5,
                comment: "Infraestrutura impecável e muito conhecimento em cloud.",
                date: "2024-02-15"
            }
        ]
    },
    {
        id: 5,
        name: "Juliana Costa",
        title: "Data Scientist",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
        rating: 4.6,
        reviews: 67,
        skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
        rate: 80,
        availability: "Limitado",
        contractSize: "medium",
        experience: "Pleno",
        description: "Cientista de dados com especialização em machine learning e análise preditiva. Experiência em projetos de NLP e computer vision.",
        location: "Brasília, DF",
        languages: ["Python", "R", "SQL"],
        frameworks: ["TensorFlow", "PyTorch", "Scikit-learn"],
        tools: ["Jupyter", "Tableau", "Apache Spark", "MLflow"],
        reviewsList: [
            {
                company: "Data Insights",
                rating: 4,
                comment: "Ótima profissional, modelos muito precisos.",
                date: "2024-03-01"
            }
        ]
    },
    {
        id: 6,
        name: "Fernando Alves",
        title: "Backend Developer",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        rating: 4.7,
        reviews: 112,
        skills: ["Java", "Spring Boot", "PostgreSQL", "Microservices"],
        rate: 70,
        availability: "Disponível",
        contractSize: "small",
        experience: "Pleno",
        description: "Desenvolvedor backend especializado em Java e arquitetura de microserviços. Experiência em sistemas de alta disponibilidade.",
        location: "Curitiba, PR",
        languages: ["Java", "Kotlin", "SQL"],
        frameworks: ["Spring Boot", "Micronaut", "Hibernate"],
        tools: ["Git", "Maven", "PostgreSQL", "Redis"],
        reviewsList: [
            {
                company: "Enterprise Solutions",
                rating: 5,
                comment: "Backend sólido e código muito bem estruturado.",
                date: "2024-02-28"
            }
        ]
    }
];

// Filtros ativos
let activeFilters = {
    languages: [],
    contractSize: [],
    availability: [],
    experience: []
};

// Elementos da DOM
const freelancersGrid = document.getElementById('freelancersGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const companyForm = document.getElementById('companyForm');
const logoUpload = document.getElementById('logoUpload');
const companyLogo = document.getElementById('companyLogo');
const themeToggle = document.getElementById('themeToggle');
const contractModal = document.getElementById('contractModal');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    renderFreelancers(freelancersData);
    setupEventListeners();
    loadCompanyProfile();
    initializeTheme();
    initializeChatSystem(); // NOVA FUNÇÃO
}

function setupEventListeners() {
    // Busca
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    // Filtros
    document.querySelectorAll('.filter-checkbox input').forEach(checkbox => {
        checkbox.addEventListener('change', handleFilterChange);
    });

    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', handleContractSizeFilter);
    });

    // Perfil da empresa
    companyForm.addEventListener('submit', handleCompanyProfileSave);
    logoUpload.addEventListener('change', handleLogoUpload);

    // Modal de contrato
    document.querySelector('.close-modal').addEventListener('click', closeContractModal);
}

// Renderização de freelancers
function renderFreelancers(freelancers) {
    freelancersGrid.innerHTML = '';

    if (freelancers.length === 0) {
        freelancersGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <h3>Nenhum freelancer encontrado</h3>
                <p>Tente ajustar seus filtros de busca</p>
            </div>
        `;
        return;
    }

    freelancers.forEach(freelancer => {
        const card = createFreelancerCard(freelancer);
        freelancersGrid.appendChild(card);
    });
}

function createFreelancerCard(freelancer) {
    const card = document.createElement('div');
    card.className = 'freelancer-card fade-in';
    card.innerHTML = `
        <div class="card-header">
            <img src="${freelancer.avatar}" alt="${freelancer.name}" class="freelancer-avatar">
            <div class="freelancer-info">
                <h3>${freelancer.name}</h3>
                <div class="freelancer-title">${freelancer.title}</div>
                <div class="freelancer-rating">
                    <div class="stars">★★★★★</div>
                    <span>${freelancer.rating} (${freelancer.reviews} reviews)</span>
                </div>
            </div>
        </div>
        
        <div class="skills-tags">
            ${freelancer.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
        
        <div class="availability-badge" style="
            background: ${getAvailabilityColor(freelancer.availability)};
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.8rem;
            display: inline-block;
            margin-bottom: 1rem;
        ">${freelancer.availability}</div>
        
        <div class="contract-info">
            <div class="contract-price">$${freelancer.rate}/hora</div>
            <div>
                <button class="view-profile-btn" onclick="openFreelancerProfile(${freelancer.id})">
                    <i class='bx bx-user'></i> Perfil
                </button>
                <button class="contract-btn" onclick="openContractModal(${freelancer.id})">
                    Contratar
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function getAvailabilityColor(availability) {
    const colors = {
        'Disponível': '#10b981',
        'Em breve': '#f59e0b',
        'Limitado': '#ef4444'
    };
    return colors[availability] || '#6b7280';
}

// Filtros e Busca
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = freelancersData.filter(freelancer => 
        freelancer.name.toLowerCase().includes(searchTerm) ||
        freelancer.title.toLowerCase().includes(searchTerm) ||
        freelancer.skills.some(skill => skill.toLowerCase().includes(searchTerm))
    );
    renderFreelancers(applyFilters(filtered));
}

function handleFilterChange(e) {
    const filterType = e.target.name;
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
        if (!activeFilters[filterType].includes(value)) {
            activeFilters[filterType].push(value);
        }
    } else {
        activeFilters[filterType] = activeFilters[filterType].filter(item => item !== value);
    }

    applyActiveFilters();
}

function handleContractSizeFilter(e) {
    const size = e.target.dataset.size;
    const isActive = e.target.classList.contains('active');

    // Remove active class from all buttons
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    if (!isActive) {
        e.target.classList.add('active');
        activeFilters.contractSize = [size];
    } else {
        activeFilters.contractSize = [];
    }

    applyActiveFilters();
}

function applyActiveFilters() {
    const filtered = freelancersData.filter(freelancer => {
        // Filtro de linguagens/skills
        if (activeFilters.languages.length > 0) {
            const hasLanguage = activeFilters.languages.some(lang => 
                freelancer.skills.includes(lang)
            );
            if (!hasLanguage) return false;
        }

        // Filtro de tamanho de contrato
        if (activeFilters.contractSize.length > 0) {
            if (!activeFilters.contractSize.includes(freelancer.contractSize)) {
                return false;
            }
        }

        // Filtro de disponibilidade
        if (activeFilters.availability.length > 0) {
            if (!activeFilters.availability.includes(freelancer.availability)) {
                return false;
            }
        }

        // Filtro de experiência
        if (activeFilters.experience.length > 0) {
            if (!activeFilters.experience.includes(freelancer.experience)) {
                return false;
            }
        }

        return true;
    });

    renderFreelancers(filtered);
}

function applyFilters(freelancers) {
    return freelancers.filter(freelancer => {
        // Aplica todos os filtros ativos
        for (const filterType in activeFilters) {
            if (activeFilters[filterType].length > 0) {
                const shouldInclude = activeFilters[filterType].some(filterValue => {
                    switch (filterType) {
                        case 'languages':
                            return freelancer.skills.includes(filterValue);
                        case 'contractSize':
                            return freelancer.contractSize === filterValue;
                        case 'availability':
                            return freelancer.availability === filterValue;
                        case 'experience':
                            return freelancer.experience === filterValue;
                        default:
                            return true;
                    }
                });
                
                if (!shouldInclude) return false;
            }
        }
        return true;
    });
}

// Perfil da Empresa
function handleCompanyProfileSave(e) {
    e.preventDefault();
    
    const formData = new FormData(companyForm);
    const companyData = {
        name: formData.get('companyName'),
        industry: formData.get('companyIndustry'),
        description: formData.get('companyDescription'),
        website: formData.get('companyWebsite'),
        logo: companyLogo.src
    };

    localStorage.setItem('companyProfile', JSON.stringify(companyData));
    
    showNotification('Perfil salvo com sucesso!', 'success');
}

function handleLogoUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            companyLogo.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function loadCompanyProfile() {
    const savedProfile = localStorage.getItem('companyProfile');
    if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        document.getElementById('companyName').value = profile.name || '';
        document.getElementById('companyIndustry').value = profile.industry || '';
        document.getElementById('companyDescription').value = profile.description || '';
        document.getElementById('companyWebsite').value = profile.website || '';
        if (profile.logo) {
            companyLogo.src = profile.logo;
        }
    }
}

// Modal de Contrato
function openContractModal(freelancerId) {
    const freelancer = freelancersData.find(f => f.id === freelancerId);
    if (freelancer) {
        document.getElementById('modalFreelancerName').textContent = freelancer.name;
        document.getElementById('modalFreelancerRate').textContent = `$${freelancer.rate}/hora`;
        contractModal.style.display = 'flex';
        
        // Configurar o botão de enviar proposta
        const submitBtn = contractModal.querySelector('.save-btn');
        submitBtn.onclick = function() {
            submitProposal(freelancerId);
        };
    }
}

function closeContractModal() {
    contractModal.style.display = 'none';
}

// Tema
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggleIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleIcon(newTheme);
}

function updateThemeToggleIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'bx bx-moon' : 'bx bx-sun';
}

// Utilitários
function showNotification(message, type = 'info') {
    // Implementação básica de notificação
    alert(`${type.toUpperCase()}: ${message}`);
}

// Event Listeners Globais
themeToggle.addEventListener('click', toggleTheme);

// Fechar modal ao clicar fora
window.addEventListener('click', (e) => {
    if (e.target === contractModal) {
        closeContractModal();
    }
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// === NOVAS FUNCIONALIDADES ADICIONADAS ===

// Sistema de Propostas
let proposalsSystem = {
    proposals: JSON.parse(localStorage.getItem('proposals')) || [],
    
    sendProposal: function(freelancerId, companyData, projectData) {
        const proposal = {
            id: Date.now(),
            freelancerId: freelancerId,
            company: companyData,
            project: projectData,
            status: 'pending',
            date: new Date().toISOString(),
            messages: []
        };
        
        this.proposals.push(proposal);
        this.saveProposals();
        return proposal;
    },
    
    saveProposals: function() {
        localStorage.setItem('proposals', JSON.stringify(this.proposals));
    }
};

// Função para enviar proposta
function submitProposal(freelancerId) {
    const companyProfile = JSON.parse(localStorage.getItem('companyProfile')) || {};
    const projectData = {
        type: document.getElementById('contractType').value,
        description: document.getElementById('projectDescription').value,
        budget: document.getElementById('projectBudget').value
    };
    
    if (!projectData.description || !projectData.budget) {
        alert('Por favor, preencha todos os campos da proposta.');
        return;
    }
    
    const proposal = proposalsSystem.sendProposal(freelancerId, companyProfile, projectData);
    
    alert('Proposta enviada com sucesso!');
    closeContractModal();
    
    // Iniciar chat automaticamente
    openChat(freelancerId);
}

// Sistema de Perfil Expandido
function openFreelancerProfile(freelancerId) {
    const freelancer = freelancersData.find(f => f.id === freelancerId);
    if (!freelancer) return;
    
    const modal = document.getElementById('profileModal');
    const content = modal.querySelector('.modal-content');
    
    content.innerHTML = `
        <div class="profile-header-expanded">
            <img src="${freelancer.avatar}" alt="${freelancer.name}" class="profile-avatar-large">
            <h2>${freelancer.name}</h2>
            <p class="freelancer-title">${freelancer.title}</p>
            <div class="freelancer-rating">
                <div class="stars">★★★★★</div>
                <span>${freelancer.rating} (${freelancer.reviews} reviews)</span>
            </div>
        </div>
        
        <div class="profile-tabs">
            <button class="profile-tab active" onclick="switchProfileTab('info')">Informações</button>
            <button class="profile-tab" onclick="switchProfileTab('skills')">Habilidades</button>
            <button class="profile-tab" onclick="switchProfileTab('reviews')">Avaliações</button>
            <button class="profile-tab" onclick="switchProfileTab('chat')">Chat</button>
        </div>
        
        <div class="profile-tab-content">
            <div id="tab-info" class="tab-pane active">
                <h3>Sobre</h3>
                <p>${freelancer.description}</p>
                
                <div class="profile-details">
                    <div><strong>Localização:</strong> ${freelancer.location}</div>
                    <div><strong>Disponibilidade:</strong> ${freelancer.availability}</div>
                    <div><strong>Experiência:</strong> ${freelancer.experience}</div>
                    <div><strong>Taxa Horária:</strong> $${freelancer.rate}/hora</div>
                </div>
                
                <button class="contract-btn" onclick="openContractModal(${freelancer.id})" style="margin-top: 1rem;">
                    Fazer Proposta
                </button>
            </div>
            
            <div id="tab-skills" class="tab-pane">
                <h3>Linguagens</h3>
                <div class="skills-tags">
                    ${freelancer.languages.map(lang => `<span class="skill-tag">${lang}</span>`).join('')}
                </div>
                
                <h3 style="margin-top: 1rem;">Frameworks</h3>
                <div class="skills-tags">
                    ${freelancer.frameworks.map(fw => `<span class="skill-tag">${fw}</span>`).join('')}
                </div>
                
                <h3 style="margin-top: 1rem;">Ferramentas</h3>
                <div class="skills-tags">
                    ${freelancer.tools.map(tool => `<span class="skill-tag">${tool}</span>`).join('')}
                </div>
            </div>
            
            <div id="tab-reviews" class="tab-pane">
                <h3>Avaliações (${freelancer.reviews})</h3>
                ${freelancer.reviewsList.map(review => `
                    <div class="review-item">
                        <div class="review-header">
                            <span class="review-company">${review.company}</span>
                            <span class="review-date">${review.date}</span>
                        </div>
                        <div class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</div>
                        <p>${review.comment}</p>
                    </div>
                `).join('')}
                
                <div class="rating-system">
                    <h4>Deixe sua avaliação</h4>
                    <div class="stars-input">
                        ${[1,2,3,4,5].map(i => `
                            <button class="star-btn" data-rating="${i}">☆</button>
                        `).join('')}
                    </div>
                    <textarea class="rating-comment" placeholder="Compartilhe sua experiência..."></textarea>
                    <button class="submit-rating" onclick="submitRating(${freelancer.id})">
                        Enviar Avaliação
                    </button>
                </div>
            </div>
            
            <div id="tab-chat" class="tab-pane">
                <div class="profile-chat-container">
                    <div class="profile-chat-messages" id="profileChatMessages">
                        <!-- Mensagens serão carregadas aqui -->
                    </div>
                    <div class="profile-chat-input-container">
                        <input type="text" class="chat-input" id="profileChatInput" placeholder="Digite sua mensagem...">
                        <button class="send-message" onclick="sendProfileChatMessage(${freelancer.id})">
                            <i class='bx bx-send'></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    initializeRatingSystem();
    loadChatMessages(freelancerId, 'profileChatMessages');
}

function switchProfileTab(tabName) {
    // Esconder todas as abas
    document.querySelectorAll('.tab-pane').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.profile-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Mostrar aba selecionada
    document.getElementById(`tab-${tabName}`).classList.add('active');
    event.target.classList.add('active');
}

function closeProfileModal() {
    document.getElementById('profileModal').style.display = 'none';
}

// Sistema de Avaliação
function initializeRatingSystem() {
    document.querySelectorAll('.star-btn').forEach((star, index, stars) => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.dataset.rating);
            stars.forEach((s, i) => {
                s.textContent = i < rating ? '★' : '☆';
                s.classList.toggle('active', i < rating);
            });
        });
    });
}

function submitRating(freelancerId) {
    const stars = document.querySelectorAll('.star-btn');
    let rating = 0;
    stars.forEach((star, index) => {
        if (star.textContent === '★') {
            rating = index + 1;
        }
    });
    
    const comment = document.querySelector('.rating-comment').value;
    
    if (!rating) {
        alert('Por favor, selecione uma avaliação com as estrelas.');
        return;
    }

    if (!comment.trim()) {
        alert('Por favor, escreva um comentário sobre sua experiência.');
        return;
    }
    
    console.log(`Avaliação enviada para freelancer ${freelancerId}:`, { rating, comment });
    alert('Avaliação enviada com sucesso! Obrigado pelo feedback.');
    
    // Limpar formulário
    document.querySelectorAll('.star-btn').forEach(star => {
        star.textContent = '☆';
        star.classList.remove('active');
    });
    document.querySelector('.rating-comment').value = '';
}

// Sistema de Chat
let chatSystem = {
    activeChat: null,
    messages: JSON.parse(localStorage.getItem('chatMessages')) || {},
    
    openChat: function(freelancerId) {
        this.activeChat = freelancerId;
        
        if (!this.messages[freelancerId]) {
            this.messages[freelancerId] = [];
        }
        
        document.getElementById('chatContainer').classList.add('active');
        this.renderMessages(freelancerId);
        this.updateChatHeader(freelancerId);
    },
    
    closeChat: function() {
        this.activeChat = null;
        document.getElementById('chatContainer').classList.remove('active');
    },
    
    sendMessage: function(messageText) {
        if (!this.activeChat || !messageText.trim()) return;
        
        const message = {
            id: Date.now(),
            text: messageText,
            sender: 'company',
            timestamp: new Date().toISOString(),
            read: false
        };
        
        this.messages[this.activeChat].push(message);
        this.saveMessages();
        this.renderMessages(this.activeChat);
        
        // Simular resposta do freelancer
        setTimeout(() => {
            this.receiveAutoResponse(messageText);
        }, 2000);
    },
    
    receiveAutoResponse: function(userMessage) {
        const responses = [
            "Obrigado pelo interesse! Vou analisar sua proposta.",
            "Podemos marcar uma reunião para discutir os detalhes?",
            "Recebi sua mensagem. Retorno em breve com mais informações.",
            "Excelente proposta! Vou verificar minha disponibilidade."
        ];
        
        const response = {
            id: Date.now(),
            text: responses[Math.floor(Math.random() * responses.length)],
            sender: 'freelancer',
            timestamp: new Date().toISOString(),
            read: true
        };
        
        this.messages[this.activeChat].push(response);
        this.saveMessages();
        this.renderMessages(this.activeChat);
        this.updateUnreadCount();
    },
    
    renderMessages: function(freelancerId) {
        const container = document.getElementById('chatMessages');
        const messages = this.messages[freelancerId] || [];
        
        container.innerHTML = messages.map(msg => `
            <div class="message ${msg.sender === 'company' ? 'sent' : 'received'}">
                <div class="message-text">${msg.text}</div>
                <div class="message-time">${new Date(msg.timestamp).toLocaleTimeString()}</div>
            </div>
        `).join('');
        
        container.scrollTop = container.scrollHeight;
    },
    
    updateChatHeader: function(freelancerId) {
        const freelancer = freelancersData.find(f => f.id === freelancerId);
        if (freelancer) {
            document.getElementById('chatFreelancerName').textContent = freelancer.name;
            document.getElementById('chatFreelancerAvatar').src = freelancer.avatar;
        }
    },
    
    updateUnreadCount: function() {
        let unreadCount = 0;
        Object.values(this.messages).forEach(chat => {
            unreadCount += chat.filter(msg => msg.sender === 'freelancer' && !msg.read).length;
        });
        
        const badge = document.getElementById('chatBadge');
        if (unreadCount > 0) {
            badge.textContent = unreadCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    },
    
    saveMessages: function() {
        localStorage.setItem('chatMessages', JSON.stringify(this.messages));
    },
    
    markAsRead: function(freelancerId) {
        if (this.messages[freelancerId]) {
            this.messages[freelancerId].forEach(msg => {
                if (msg.sender === 'freelancer') msg.read = true;
            });
            this.saveMessages();
            this.updateUnreadCount();
        }
    }
};

function initializeChatSystem() {
    // Botão toggle do chat
    document.getElementById('chatToggle').addEventListener('click', function() {
        const container = document.getElementById('chatContainer');
        container.classList.toggle('active');
    });
    
    // Fechar chat
    document.getElementById('closeChat').addEventListener('click', function() {
        chatSystem.closeChat();
    });
    
    // Enviar mensagem com Enter
    document.getElementById('chatInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
    
    // Atualizar contador de mensagens não lidas
    chatSystem.updateUnreadCount();
}

function openChat(freelancerId) {
    chatSystem.openChat(freelancerId);
    chatSystem.markAsRead(freelancerId);
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message) {
        chatSystem.sendMessage(message);
        input.value = '';
    }
}

// Função para carregar mensagens no perfil
function loadChatMessages(freelancerId, containerId) {
    const messages = chatSystem.messages[freelancerId] || [];
    const container = document.getElementById(containerId);
    
    container.innerHTML = messages.map(msg => `
        <div class="message ${msg.sender === 'company' ? 'sent' : 'received'}">
            <div class="message-text">${msg.text}</div>
            <div class="message-time">${new Date(msg.timestamp).toLocaleTimeString()}</div>
        </div>
    `).join('');
    
    container.scrollTop = container.scrollHeight;
}

function sendProfileChatMessage(freelancerId) {
    const input = document.getElementById('profileChatInput');
    const message = input.value.trim();
    
    if (message) {
        chatSystem.activeChat = freelancerId;
        chatSystem.sendMessage(message);
        input.value = '';
        loadChatMessages(freelancerId, 'profileChatMessages');
    }
}

console.log('Sistema completo carregado! Todas as funcionalidades disponíveis.');


// Função para abrir modal de perfil expandido
function openFreelancerProfile(freelancerId) {
    const freelancer = freelancersData.find(f => f.id === freelancerId);
    if (freelancer) {
        openProfileModal(freelancer);
    }
}

// Modifique a função renderFreelancerCard para incluir o botão de ver perfil
function renderFreelancerCard(freelancer) {
    return `
        <div class="freelancer-card" data-id="${freelancer.id}">
            <div class="card-header">
                <img src="${freelancer.avatar}" alt="${freelancer.name}" class="freelancer-avatar">
                <div class="freelancer-info">
                    <h3 class="freelancer-name">${freelancer.name}</h3>
                    <p class="freelancer-role">${freelancer.role}</p>
                    <div class="freelancer-rating">
                        <span class="rating-stars">${'★'.repeat(Math.floor(freelancer.rating))}${'☆'.repeat(5 - Math.floor(freelancer.rating))}</span>
                        <span class="rating-value">${freelancer.rating}</span>
                    </div>
                </div>
            </div>
            
            <div class="card-skills">
                ${freelancer.skills.slice(0, 3).map(skill => `
                    <span class="skill-tag">${skill}</span>
                `).join('')}
                ${freelancer.skills.length > 3 ? `<span class="skill-more">+${freelancer.skills.length - 3}</span>` : ''}
            </div>
            
            <div class="card-footer">
                <div class="freelancer-rate">
                    <span class="rate-value">R$ ${freelancer.hourlyRate}/hora</span>
                </div>
                <div class="card-actions">
                    <button class="btn-view-profile" onclick="openFreelancerProfile('${freelancer.id}')">
                        <i class='bx bx-user'></i>
                        Ver Perfil
                    </button>
                    <button class="btn-hire" onclick="openContractModal('${freelancer.id}', '${freelancer.name}', ${freelancer.hourlyRate})">
                        <i class='bx bx-briefcase'></i>
                        Contratar
                    </button>
                </div>
            </div>
        </div>
    `;
}