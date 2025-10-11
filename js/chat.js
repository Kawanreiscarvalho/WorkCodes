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