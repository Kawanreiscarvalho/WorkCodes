// propostasEmpresas.js - Página de Propostas da Empresa
class PropostasEmpresas {
    constructor() {
        this.proposals = [];
        this.filteredProposals = [];
        this.currentFilter = 'all';
        this.initialize();
    }

    initialize() {
        this.loadProposals();
        this.setupEventListeners();
        this.renderProposals();
        this.updateStats();
        this.initializeTheme();
    }

    loadProposals() {
        // Carregar do sistema integrado
        const workcodesProposals = JSON.parse(localStorage.getItem('workcodes_proposals')) || [];
        // Carregar do sistema existente (backward compatibility)
        const existingProposals = JSON.parse(localStorage.getItem('proposals')) || [];
        
        this.proposals = [...workcodesProposals, ...existingProposals];
        
        // Remover duplicatas
        this.proposals = this.proposals.filter((proposal, index, self) =>
            index === self.findIndex(p => p.id === proposal.id)
        );

        console.log('📋 Propostas carregadas:', this.proposals.length);
    }

    setupEventListeners() {
        // Filtro de status
        document.getElementById('statusFilter').addEventListener('change', (e) => {
            this.currentFilter = e.target.value;
            this.filterProposals();
            this.renderProposals();
            this.updateStats();
        });

        // Fechar modal
        document.querySelector('.close-modal').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('proposalModal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.closeModal();
            }
        });

        // Tecla ESC para fechar modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', this.toggleTheme);
    }

    filterProposals() {
        if (this.currentFilter === 'all') {
            this.filteredProposals = this.proposals;
        } else {
            this.filteredProposals = this.proposals.filter(proposal => 
                proposal.status === this.currentFilter
            );
        }
    }

    renderProposals() {
        const container = document.getElementById('proposalsContainer');
        const emptyState = document.getElementById('emptyState');

        if (this.filteredProposals.length === 0) {
            container.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';
        
        container.innerHTML = this.filteredProposals.map(proposal => `
            <div class="proposal-card" onclick="propostasEmpresas.openProposalDetails('${proposal.id}')">
                <div class="proposal-header">
                    <div>
                        <div class="proposal-title">${proposal.project?.title || 'Proposta sem título'}</div>
                        <div class="proposal-freelancer">
                            <i class='bx bx-user'></i>
                            Freelancer: ${this.getFreelancerName(proposal.freelancerId)}
                        </div>
                    </div>
                    <div class="proposal-status status-${proposal.status}">
                        ${this.getStatusText(proposal.status)}
                    </div>
                </div>
                
                <div class="proposal-details">
                    <div class="proposal-detail">
                        <span class="detail-label">Orçamento</span>
                        <span class="detail-value">R$ ${proposal.project?.budget || 'Não informado'}</span>
                    </div>
                    <div class="proposal-detail">
                        <span class="detail-label">Data</span>
                        <span class="detail-value">${this.formatDate(proposal.date)}</span>
                    </div>
                    <div class="proposal-detail">
                        <span class="detail-label">Mensagens</span>
                        <span class="detail-value">${proposal.messages?.length || 0}</span>
                    </div>
                </div>

                <div class="proposal-actions">
                    <button class="action-btn primary" onclick="event.stopPropagation(); propostasEmpresas.openChat('${proposal.freelancerId}')">
                        <i class='bx bx-message'></i>
                        Chat
                    </button>
                    <button class="action-btn" onclick="event.stopPropagation(); propostasEmpresas.viewFreelancerProfile('${proposal.freelancerId}')">
                        <i class='bx bx-user'></i>
                        Ver Perfil
                    </button>
                </div>
            </div>
        `).join('');
    }

    getFreelancerName(freelancerId) {
        // Buscar nos freelancers existentes
        const freelancers = window.freelancersData || [];
        const freelancer = freelancers.find(f => f.id == freelancerId);
        return freelancer ? freelancer.name : 'Freelancer não encontrado';
    }

    getStatusText(status) {
        const statusMap = {
            'pending': 'Pendente',
            'accepted': 'Aceita',
            'rejected': 'Recusada',
            'quit': 'Desistência'
        };
        return statusMap[status] || status;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }

    updateStats() {
        const total = this.proposals.length;
        const pending = this.proposals.filter(p => p.status === 'pending').length;
        const accepted = this.proposals.filter(p => p.status === 'accepted').length;

        document.getElementById('totalProposals').textContent = total;
        document.getElementById('pendingProposals').textContent = pending;
        document.getElementById('acceptedProposals').textContent = accepted;
    }

    openProposalDetails(proposalId) {
        const proposal = this.proposals.find(p => p.id === proposalId);
        if (!proposal) return;

        const modalBody = document.getElementById('proposalModalBody');
        modalBody.innerHTML = `
            <div class="proposal-detail-modal">
                <div class="detail-section">
                    <h4>Informações do Projeto</h4>
                    <p><strong>Título:</strong> ${proposal.project?.title || 'Não informado'}</p>
                    <p><strong>Descrição:</strong> ${proposal.project?.description || 'Não informada'}</p>
                    <p><strong>Orçamento:</strong> R$ ${proposal.project?.budget || 'Não informado'}</p>
                    <p><strong>Tipo:</strong> ${proposal.project?.type || 'Não informado'}</p>
                </div>

                <div class="detail-section">
                    <h4>Informações do Freelancer</h4>
                    <p><strong>Nome:</strong> ${this.getFreelancerName(proposal.freelancerId)}</p>
                    <p><strong>Status:</strong> <span class="proposal-status status-${proposal.status}">${this.getStatusText(proposal.status)}</span></p>
                </div>

                <div class="detail-section">
                    <h4>Histórico de Mensagens</h4>
                    <div class="messages-container">
                        ${proposal.messages?.map(message => `
                            <div class="message ${message.sender === 'company' ? 'sent' : 'received'}">
                                <div class="message-sender">${message.sender === 'company' ? 'Você' : 'Freelancer'}</div>
                                <div class="message-text">${message.text}</div>
                                <div class="message-time">${this.formatDateTime(message.timestamp)}</div>
                            </div>
                        `).join('') || '<p>Nenhuma mensagem ainda.</p>'}
                    </div>
                </div>

                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="propostasEmpresas.openChat('${proposal.freelancerId}')">
                        <i class='bx bx-message'></i>
                        Abrir Chat
                    </button>
                    <button class="btn btn-secondary" onclick="propostasEmpresas.closeModal()">
                        Fechar
                    </button>
                </div>
            </div>
        `;

        document.getElementById('proposalModal').style.display = 'flex';
    }

    formatDateTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('pt-BR');
    }

    openChat(freelancerId) {
        // Redirecionar para a página da empresa com chat aberto
        window.location.href = `empresa.html?openChat=true&freelancerId=${freelancerId}`;
    }

    viewFreelancerProfile(freelancerId) {
        // Redirecionar para a página da empresa com perfil aberto
        window.location.href = `empresa.html?viewProfile=${freelancerId}`;
    }

    closeModal() {
        document.getElementById('proposalModal').style.display = 'none';
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeToggleIcon(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeToggleIcon(newTheme);
    }

    updateThemeToggleIcon(theme) {
        const icon = document.querySelector('#themeToggle i');
        icon.className = theme === 'light' ? 'bx bx-moon' : 'bx bx-sun';
    }
}

// Inicializar a página
let propostasEmpresas;

document.addEventListener('DOMContentLoaded', function() {
    propostasEmpresas = new PropostasEmpresas();
    console.log('✅ Página de propostas da empresa carregada!');
});