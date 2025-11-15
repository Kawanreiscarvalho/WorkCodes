// Sample data - In a real application, this would come from a backend
let proposalsData = [
    {
        id: 1,
        title: "Desenvolvimento de Site Institucional",
        description: "Precisamos de um site institucional responsivo para nossa empresa. O site deve conter página inicial, sobre nós, serviços, portfólio e contato.",
        budget: "R$ 5.000,00",
        deadline: "30 dias",
        contractType: "Projeto Fixo",
        status: "accepted",
        clientName: "Tech Solutions Ltda",
        clientType: "Empresa",
        clientId: "empresa_1",
        freelancerId: "freelancer_1",
        messages: [
            {
                id: 1,
                sender: "client",
                text: "Olá, gostei do seu perfil! Tem disponibilidade para este projeto?",
                time: "2023-10-15T10:30:00"
            },
            {
                id: 2,
                sender: "user",
                text: "Olá! Sim, tenho disponibilidade. Podemos conversar mais sobre os detalhes?",
                time: "2023-10-15T11:15:00"
            },
            {
                id: 3,
                sender: "client",
                text: "Perfeito! Vamos marcar uma reunião para alinharmos os detalhes.",
                time: "2023-10-15T14:20:00"
            }
        ]
    },
    {
        id: 2,
        title: "Aplicativo Mobile para Restaurante",
        description: "Desenvolvimento de aplicativo mobile para pedidos online de restaurante. Deve conter catálogo de produtos, carrinho de compras e integração com pagamento.",
        budget: "R$ 12.000,00",
        deadline: "60 dias",
        contractType: "Projeto Fixo",
        status: "in-progress",
        clientName: "Restaurante Sabor & Arte",
        clientType: "Empresa",
        clientId: "empresa_2",
        freelancerId: "freelancer_1",
        messages: [
            {
                id: 1,
                sender: "client",
                text: "Parabéns! Sua proposta foi aceita. Vamos combinar os próximos passos?",
                time: "2023-10-10T14:20:00"
            },
            {
                id: 2,
                sender: "user",
                text: "Ótimo! Fico feliz com a oportunidade. Podemos marcar uma reunião para alinharmos os detalhes?",
                time: "2023-10-10T15:05:00"
            },
            {
                id: 3,
                sender: "client",
                text: "Claro! Amanhã às 10h funciona para você?",
                time: "2023-10-10T16:30:00"
            }
        ]
    },
    {
        id: 3,
        title: "Sistema de Gestão de Estoque",
        description: "Desenvolvimento de sistema web para controle de estoque com relatórios, alertas de reposição e integração com sistema de vendas.",
        budget: "R$ 8.500,00",
        deadline: "45 dias",
        contractType: "Projeto Fixo",
        status: "rejected",
        clientName: "Comércio Varejista Ltda",
        clientType: "Empresa",
        clientId: "empresa_3",
        freelancerId: "freelancer_1",
        messages: [
            {
                id: 1,
                sender: "client",
                text: "Obrigado pelo seu interesse, mas optamos por seguir com outro profissional.",
                time: "2023-10-05T09:45:00"
            }
        ]
    }
];

// DOM Elements
const proposalsList = document.getElementById('proposalsList');
const detailTitle = document.getElementById('detailTitle');
const detailActions = document.getElementById('detailActions');
const detailContent = document.getElementById('detailContent');
const emptyState = document.getElementById('emptyState');
const proposalDetails = document.getElementById('proposalDetails');
const projectDescription = document.getElementById('projectDescription');
const contractType = document.getElementById('contractType');
const projectBudget = document.getElementById('projectBudget');
const projectDeadline = document.getElementById('projectDeadline');
const proposalStatus = document.getElementById('proposalStatus');
const clientName = document.getElementById('clientName');
const clientType = document.getElementById('clientType');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendMessage = document.getElementById('sendMessage');
const themeToggle = document.getElementById('themeToggle');
const userMenu = document.getElementById('userMenu');
const userName = document.getElementById('userName');

// Modal Elements
const quitModal = document.getElementById('quitModal');
const quitReason = document.getElementById('quitReason');
const cancelQuit = document.getElementById('cancelQuit');
const confirmQuit = document.getElementById('confirmQuit');

// Current user data - In a real app, this would come from authentication
const currentUser = {
    id: "freelancer_1",
    name: "João Silva",
    type: "freelancer" // or "empresa"
};

// Current selected proposal
let currentProposalId = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set user name
    userName.textContent = currentUser.name;
    
    // Load proposals
    loadProposals();
    
    // Set up event listeners
    themeToggle.addEventListener('click', toggleTheme);
    sendMessage.addEventListener('click', sendNewMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendNewMessage();
        }
    });
    
    // Modal event listeners
    cancelQuit.addEventListener('click', closeQuitModal);
    confirmQuit.addEventListener('click', confirmQuitProject);
    
    // Close modal when clicking outside
    quitModal.addEventListener('click', function(e) {
        if (e.target === quitModal) {
            closeQuitModal();
        }
    });
    
    // Check for saved theme
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="bx bx-sun"></i>';
    }
});

// Load proposals into the list
function loadProposals() {
    proposalsList.innerHTML = '';
    
    if (proposalsData.length === 0) {
        proposalsList.innerHTML = '<div class="empty-state"><p>Nenhuma proposta encontrada</p></div>';
        return;
    }
    
    // Filter proposals based on user type
    const userProposals = proposalsData.filter(proposal => {
        if (currentUser.type === 'freelancer') {
            return proposal.freelancerId === currentUser.id;
        } else {
            return proposal.clientId === currentUser.id;
        }
    });
    
    if (userProposals.length === 0) {
        proposalsList.innerHTML = '<div class="empty-state"><p>Nenhuma proposta encontrada</p></div>';
        return;
    }
    
    userProposals.forEach(proposal => {
        const proposalItem = document.createElement('div');
        proposalItem.className = 'proposal-item';
        proposalItem.dataset.id = proposal.id;
        
        let statusClass = '';
        let statusText = '';
        
        switch(proposal.status) {
            case 'pending':
                statusClass = 'status-pending';
                statusText = 'Pendente';
                break;
            case 'accepted':
                statusClass = 'status-accepted';
                statusText = 'Aceita';
                break;
            case 'rejected':
                statusClass = 'status-rejected';
                statusText = 'Recusada';
                break;
            case 'quit':
                statusClass = 'status-quit';
                statusText = 'Desistiu';
                break;
            case 'in-progress':
                statusClass = 'status-in-progress';
                statusText = 'Em Andamento';
                break;
        }
        
        proposalItem.innerHTML = `
            <div class="proposal-header">
                <div>
                    <div class="proposal-title">${proposal.title}</div>
                    <div class="proposal-info">
                        <span>${currentUser.type === 'freelancer' ? proposal.clientName : 'Freelancer'}</span>
                        <span class="proposal-budget">${proposal.budget}</span>
                    </div>
                </div>
                <div class="proposal-status ${statusClass}">${statusText}</div>
            </div>
        `;
        
        proposalItem.addEventListener('click', function() {
            selectProposal(proposal.id);
        });
        
        proposalsList.appendChild(proposalItem);
    });
}

// Select a proposal to view details
function selectProposal(proposalId) {
    currentProposalId = proposalId;
    
    // Remove active class from all proposals
    document.querySelectorAll('.proposal-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to selected proposal
    document.querySelector(`.proposal-item[data-id="${proposalId}"]`).classList.add('active');
    
    // Find the proposal data
    const proposal = proposalsData.find(p => p.id === proposalId);
    
    if (!proposal) return;
    
    // Hide empty state and show proposal details
    emptyState.style.display = 'none';
    proposalDetails.style.display = 'block';
    
    // Update proposal details
    detailTitle.textContent = proposal.title;
    projectDescription.textContent = proposal.description;
    contractType.textContent = proposal.contractType;
    projectBudget.textContent = proposal.budget;
    projectDeadline.textContent = proposal.deadline;
    clientName.textContent = currentUser.type === 'freelancer' ? proposal.clientName : 'Você (Empresa)';
    clientType.textContent = currentUser.type === 'freelancer' ? proposal.clientType : 'Empresa';
    
    // Update status
    let statusText = '';
    switch(proposal.status) {
        case 'pending':
            statusText = 'Pendente';
            break;
        case 'accepted':
            statusText = 'Aceita';
            break;
        case 'rejected':
            statusText = 'Recusada';
            break;
        case 'quit':
            statusText = 'Desistiu do Projeto';
            break;
        case 'in-progress':
            statusText = 'Em Andamento';
            break;
    }
    proposalStatus.textContent = statusText;
    
    // Load messages
    loadMessages(proposal.messages);
    
    // Update actions based on user role and proposal status
    updateActions(proposal);
}

// Load messages into the chat
function loadMessages(messages) {
    chatMessages.innerHTML = '';
    
    if (messages.length === 0) {
        chatMessages.innerHTML = '<div class="empty-state"><p>Nenhuma mensagem ainda</p></div>';
        return;
    }
    
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        const isSent = message.sender === 'user' || (currentUser.type === 'empresa' && message.sender === 'client');
        messageElement.className = `message ${isSent ? 'sent' : 'received'}`;
        
        const time = new Date(message.time).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        messageElement.innerHTML = `
            <div>${message.text}</div>
            <div class="message-time">${time}</div>
        `;
        
        chatMessages.appendChild(messageElement);
    });
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Update actions based on proposal status and user role
function updateActions(proposal) {
    detailActions.innerHTML = '';
    detailActions.style.display = 'flex';
    
    if (currentUser.type === 'freelancer') {
        if (proposal.status === 'pending') {
            detailActions.innerHTML = `
                <button class="btn btn-success" onclick="respondToProposal(${proposal.id}, 'accept')">
                    <i class='bx bx-check'></i> Aceitar
                </button>
                <button class="btn btn-danger" onclick="respondToProposal(${proposal.id}, 'reject')">
                    <i class='bx bx-x'></i> Recusar
                </button>
            `;
        } else if (proposal.status === 'accepted' || proposal.status === 'in-progress') {
            detailActions.innerHTML = `
                <button class="btn btn-primary" onclick="startProject(${proposal.id})">
                    <i class='bx bx-play'></i> Iniciar Projeto
                </button>
                <button class="btn btn-warning" onclick="openQuitModal(${proposal.id})">
                    <i class='bx bx-exit'></i> Desistir
                </button>
            `;
        }
    } else { // empresa
        if (proposal.status === 'pending') {
            detailActions.innerHTML = `
                <button class="btn btn-secondary" onclick="editProposal(${proposal.id})">
                    <i class='bx bx-edit'></i> Editar
                </button>
                <button class="btn btn-danger" onclick="cancelProposal(${proposal.id})">
                    <i class='bx bx-trash'></i> Cancelar
                </button>
            `;
        } else if (proposal.status === 'accepted' || proposal.status === 'in-progress') {
            detailActions.innerHTML = `
                <button class="btn btn-primary" onclick="manageProject(${proposal.id})">
                    <i class='bx bx-cog'></i> Gerenciar
                </button>
            `;
        }
    }
    
    // Show quit status if project was quit
    if (proposal.status === 'quit') {
        detailActions.innerHTML = `
            <button class="btn btn-secondary" disabled>
                <i class='bx bx-info-circle'></i> Projeto Desistido
            </button>
        `;
    }
}

// Send a new message
function sendNewMessage() {
    const messageText = chatInput.value.trim();
    if (!messageText) return;
    
    if (!currentProposalId) return;
    
    const proposal = proposalsData.find(p => p.id === currentProposalId);
    if (!proposal) return;
    
    const newMessage = {
        id: proposal.messages.length + 1,
        sender: currentUser.type === 'freelancer' ? 'user' : 'client',
        text: messageText,
        time: new Date().toISOString()
    };
    
    proposal.messages.push(newMessage);
    loadMessages(proposal.messages);
    
    // Clear input
    chatInput.value = '';
    
    // In a real app, you would also send this message to the backend
    // and notify the other user
    console.log('Mensagem enviada:', newMessage);
    
    // Update localStorage to simulate backend sync
    updateLocalStorage();
}

// Open quit modal
function openQuitModal(proposalId) {
    currentProposalId = proposalId;
    quitReason.value = '';
    quitModal.style.display = 'flex';
}

// Close quit modal
function closeQuitModal() {
    quitModal.style.display = 'none';
    currentProposalId = null;
}

// Confirm quit project
function confirmQuitProject() {
    const reason = quitReason.value.trim();
    
    if (!currentProposalId) {
        closeQuitModal();
        return;
    }
    
    const proposal = proposalsData.find(p => p.id === currentProposalId);
    if (!proposal) {
        closeQuitModal();
        return;
    }
    
    // Update proposal status
    proposal.status = 'quit';
    
    // Add system message about quitting
    const quitMessage = {
        id: proposal.messages.length + 1,
        sender: 'system',
        text: reason ? 
            `Freelancer desistiu do projeto. Motivo: ${reason}` : 
            'Freelancer desistiu do projeto.',
        time: new Date().toISOString()
    };
    
    proposal.messages.push(quitMessage);
    
    // Reload UI
    loadProposals();
    selectProposal(currentProposalId);
    
    // Close modal
    closeQuitModal();
    
    // Show success message
    alert('Você desistiu do projeto. A empresa foi notificada.');
    
    // Update localStorage to simulate backend sync
    updateLocalStorage();
    
    console.log(`Projeto ${currentProposalId} desistido pelo freelancer`);
}

// Update localStorage to simulate backend sync
function updateLocalStorage() {
    localStorage.setItem('workcodes_proposals', JSON.stringify(proposalsData));
    console.log('Dados atualizados no localStorage');
}

// Load data from localStorage on init
function loadFromLocalStorage() {
    const savedData = localStorage.getItem('workcodes_proposals');
    if (savedData) {
        proposalsData = JSON.parse(savedData);
        console.log('Dados carregados do localStorage');
    }
}

// Toggle dark/light theme
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        themeToggle.innerHTML = '<i class="bx bx-sun"></i>';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        themeToggle.innerHTML = '<i class="bx bx-moon"></i>';
    }
}

// Proposal response functions
function respondToProposal(proposalId, response) {
    const proposal = proposalsData.find(p => p.id === proposalId);
    if (!proposal) return;
    
    if (response === 'accept') {
        proposal.status = 'accepted';
        alert('Proposta aceita com sucesso!');
    } else if (response === 'reject') {
        proposal.status = 'rejected';
        alert('Proposta recusada.');
    }
    
    // Reload the UI
    loadProposals();
    selectProposal(proposalId);
    
    // Update localStorage
    updateLocalStorage();
    
    console.log(`Proposta ${proposalId} ${response === 'accept' ? 'aceita' : 'recusada'}`);
}

function startProject(proposalId) {
    const proposal = proposalsData.find(p => p.id === proposalId);
    if (!proposal) return;
    
    proposal.status = 'in-progress';
    
    // Reload the UI
    loadProposals();
    selectProposal(proposalId);
    
    // Update localStorage
    updateLocalStorage();
    
    alert(`Projeto ${proposalId} iniciado!`);
}

function editProposal(proposalId) {
    alert(`Editando proposta ${proposalId}`);
    // In a real app, this would open an edit form
}

function cancelProposal(proposalId) {
    if (confirm('Tem certeza que deseja cancelar esta proposta?')) {
        const proposal = proposalsData.find(p => p.id === proposalId);
        if (!proposal) return;
        
        proposal.status = 'rejected';
        
        // Reload the UI
        loadProposals();
        selectProposal(proposalId);
        
        // Update localStorage
        updateLocalStorage();
        
        console.log(`Proposta ${proposalId} cancelada`);
    }
}

function manageProject(proposalId) {
    alert(`Gerenciando projeto ${proposalId}`);
    // In a real app, this would navigate to a project management page
}

// Load data from localStorage when page loads
loadFromLocalStorage();

