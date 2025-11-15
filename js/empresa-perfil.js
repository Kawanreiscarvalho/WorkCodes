// empresa-perfil.js - VERSÃO COM INDEXEDDB (CONFIAVEL)
class CompanyProfile {
    constructor() {
        this.dbName = 'WorkCodesCompanyDB';
        this.storeName = 'companyProfile';
        this.db = null;
        this.companyData = null;
        
        this.init().then(() => {
            this.initializeEventListeners();
            this.loadProfileData();
        });
    }

    async init() {
        await this.initDatabase();
        await this.loadCompanyData();
    }

    // 🗄️ INICIALIZAR BANCO DE DADOS INDEXEDDB
    initDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);

            request.onerror = () => {
                console.error('❌ Erro ao abrir database:', request.error);
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                console.log('✅ Database IndexedDB aberto com sucesso');
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: 'id' });
                    console.log('🆕 ObjectStore criado');
                }
            };
        });
    }

    // 📥 CARREGAR DADOS DO BANCO
    async loadCompanyData() {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                this.companyData = this.getDefaultData();
                resolve();
                return;
            }

            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get('companyData');

            request.onsuccess = () => {
                if (request.result) {
                    this.companyData = request.result.data;
                    console.log('📂 Dados carregados do IndexedDB:', this.companyData);
                } else {
                    this.companyData = this.getDefaultData();
                    console.log('🆕 Dados padrão carregados');
                }
                resolve();
            };

            request.onerror = () => {
                console.error('❌ Erro ao carregar do IndexedDB');
                this.companyData = this.getDefaultData();
                resolve();
            };
        });
    }

    // 💾 SALVAR DADOS NO BANCO
    async saveCompanyData() {
        // Coletar dados do formulário
        this.collectFormData();

        return new Promise((resolve, reject) => {
            if (!this.db) {
                console.log('❌ Database não disponível, salvando no localStorage');
                this.saveToLocalStorage();
                resolve();
                return;
            }

            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.put({
                id: 'companyData',
                data: this.companyData,
                lastUpdated: new Date().toISOString()
            });

            request.onsuccess = () => {
                console.log('💾 Dados salvos no IndexedDB');
                // Backup no localStorage também
                this.saveToLocalStorage();
                this.showSaveFeedback();
                resolve();
            };

            request.onerror = () => {
                console.error('❌ Erro ao salvar no IndexedDB');
                this.saveToLocalStorage();
                this.showSaveFeedback();
                resolve();
            };
        });
    }

    // 📋 COLETAR DADOS DO FORMULÁRIO
    collectFormData() {
        this.companyData.name = document.getElementById('companyName').value;
        this.companyData.industry = document.getElementById('companyIndustry').value;
        this.companyData.description = document.getElementById('companyDescription').value;
        this.companyData.email = document.getElementById('companyEmail').value;
        this.companyData.phone = document.getElementById('companyPhone').value;
        this.companyData.website = document.getElementById('companyWebsite').value;
        this.companyData.address = document.getElementById('companyAddress').value;
        this.companyData.city = document.getElementById('companyCity').value;
        this.companyData.state = document.getElementById('companyState').value;
        this.companyData.cnpj = document.getElementById('companyCNPJ').value;
        
        // Redes sociais
        this.companyData.social.linkedin = document.getElementById('linkedinUrl').value;
        this.companyData.social.instagram = document.getElementById('instagramUrl').value;
        this.companyData.social.facebook = document.getElementById('facebookUrl').value;

        // Configurações
        this.companyData.settings.profilePublic = document.getElementById('profilePublic').checked;
        this.companyData.settings.receiveProposals = document.getElementById('receiveProposals').checked;

        // Timestamp
        this.companyData.lastUpdated = new Date().toISOString();
    }

    // 🏗️ DADOS PADRÃO
    getDefaultData() {
        return {
            name: '',
            industry: '',
            description: '',
            email: '',
            phone: '',
            website: '',
            address: '',
            city: '',
            state: '',
            cnpj: '',
            logo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop&crop=face',
            banner: '',
            social: {
                linkedin: '',
                instagram: '',
                facebook: ''
            },
            settings: {
                profilePublic: true,
                receiveProposals: true
            },
            stats: {
                projects: 0,
                hired: 0,
                rating: 0.0
            },
            lastUpdated: new Date().toISOString()
        };
    }

    // 💾 BACKUP NO LOCALSTORAGE
    saveToLocalStorage() {
        try {
            localStorage.setItem('companyProfile', JSON.stringify(this.companyData));
            localStorage.setItem('companyProfile_backup', JSON.stringify(this.companyData));
            console.log('💾 Backup salvo no localStorage');
        } catch (error) {
            console.error('❌ Erro ao salvar no localStorage:', error);
        }
    }

    // 🎯 MÉTODOS ORIGINAIS (MANTIDOS)
    initializeEventListeners() {
        // Upload de logo
        document.getElementById('logoUpload').addEventListener('change', (e) => {
            this.handleImageUpload(e, 'logoPreview', 'companyLogoLarge');
        });

        // Upload de banner
        document.getElementById('bannerUpload').addEventListener('change', (e) => {
            this.handleImageUpload(e, 'bannerPreview');
        });

        // Atualizar preview em tempo real
        document.getElementById('companyName').addEventListener('input', (e) => {
            this.updatePreview('companyNameLarge', e.target.value);
        });

        document.getElementById('companyIndustry').addEventListener('change', (e) => {
            this.updatePreview('companyIndustryLarge', e.target.value);
        });

        document.getElementById('companyEmail').addEventListener('input', (e) => {
            this.updatePreview('previewEmail', e.target.value || 'Não informado');
        });

        document.getElementById('companyPhone').addEventListener('input', (e) => {
            this.updatePreview('previewPhone', e.target.value || 'Não informado');
        });

        document.getElementById('companyWebsite').addEventListener('input', (e) => {
            this.updatePreview('previewWebsite', e.target.value || 'Não informado');
        });

        // Salvar automaticamente
        const autoSaveFields = ['companyName', 'companyIndustry', 'companyDescription', 
                               'companyEmail', 'companyPhone', 'companyWebsite',
                               'companyAddress', 'companyCity', 'companyState', 'companyCNPJ',
                               'linkedinUrl', 'instagramUrl', 'facebookUrl'];
        
        autoSaveFields.forEach(field => {
            const element = document.getElementById(field);
            if (element) {
                element.addEventListener('blur', () => {
                    this.saveCompanyData();
                });
            }
        });

        // Auto-save para configurações
        document.getElementById('profilePublic').addEventListener('change', () => {
            this.saveCompanyData();
        });
        document.getElementById('receiveProposals').addEventListener('change', () => {
            this.saveCompanyData();
        });

        // Salvar também no botão principal
        document.querySelector('.action-btn.primary').addEventListener('click', (e) => {
            e.preventDefault();
            this.saveCompanyData();
        });
    }

    loadProfileData() {
        if (!this.companyData) return;

        console.log('📤 Carregando dados no formulário...', this.companyData);

        // Preencher formulário com dados salvos
        document.getElementById('companyName').value = this.companyData.name || '';
        document.getElementById('companyIndustry').value = this.companyData.industry || '';
        document.getElementById('companyDescription').value = this.companyData.description || '';
        document.getElementById('companyEmail').value = this.companyData.email || '';
        document.getElementById('companyPhone').value = this.companyData.phone || '';
        document.getElementById('companyWebsite').value = this.companyData.website || '';
        document.getElementById('companyAddress').value = this.companyData.address || '';
        document.getElementById('companyCity').value = this.companyData.city || '';
        document.getElementById('companyState').value = this.companyData.state || '';
        document.getElementById('companyCNPJ').value = this.companyData.cnpj || '';
        document.getElementById('linkedinUrl').value = this.companyData.social.linkedin || '';
        document.getElementById('instagramUrl').value = this.companyData.social.instagram || '';
        document.getElementById('facebookUrl').value = this.companyData.social.facebook || '';
        
        // Configurações
        document.getElementById('profilePublic').checked = this.companyData.settings.profilePublic !== false;
        document.getElementById('receiveProposals').checked = this.companyData.settings.receiveProposals !== false;

        // Atualizar preview
        this.updatePreview('companyNameLarge', this.companyData.name || 'Sua Empresa');
        this.updatePreview('companyIndustryLarge', this.companyData.industry || 'Indústria');
        this.updatePreview('previewEmail', this.companyData.email || 'Não informado');
        this.updatePreview('previewPhone', this.companyData.phone || 'Não informado');
        this.updatePreview('previewWebsite', this.companyData.website || 'Não informado');

        // Stats
        document.getElementById('projectsCount').textContent = this.companyData.stats.projects || 0;
        document.getElementById('hiredCount').textContent = this.companyData.stats.hired || 0;
        document.getElementById('ratingCount').textContent = this.companyData.stats.rating || '0.0';

        // Logo
        if (this.companyData.logo) {
            document.getElementById('logoPreview').src = this.companyData.logo;
            document.getElementById('companyLogoLarge').src = this.companyData.logo;
        }

        console.log('✅ Formulário carregado com sucesso!');
    }

    handleImageUpload(event, previewId, largePreviewId = null) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                
                // Atualizar preview
                document.getElementById(previewId).src = imageUrl;
                if (largePreviewId) {
                    document.getElementById(largePreviewId).src = imageUrl;
                }

                // Salvar nos dados da empresa
                if (previewId === 'logoPreview') {
                    this.companyData.logo = imageUrl;
                } else if (previewId === 'bannerPreview') {
                    this.companyData.banner = imageUrl;
                }

                this.saveCompanyData();
            };
            reader.readAsDataURL(file);
        }
    }

    updatePreview(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = value;
        }
    }

    showSaveFeedback() {
        const saveBtn = document.querySelector('.action-btn.primary');
        const originalText = saveBtn.innerHTML;
        const originalBg = saveBtn.style.background;
        
        saveBtn.innerHTML = '<i class="bx bx-check"></i> Salvo!';
        saveBtn.style.background = 'var(--success)';
        saveBtn.disabled = true;
        
        setTimeout(() => {
            saveBtn.innerHTML = originalText;
            saveBtn.style.background = originalBg;
            saveBtn.disabled = false;
        }, 2000);

        console.log('✅ Dados salvos com sucesso!', this.companyData);
    }
}

// Função global para salvar
function saveCompanyProfile() {
    if (window.companyProfile) {
        window.companyProfile.saveCompanyData();
    }
}

// Debug helper
function debugStorage() {
    if (window.companyProfile) {
        console.log('🐛 DEBUG STORAGE:');
        console.log('Dados atuais:', window.companyProfile.companyData);
        
        // Verificar IndexedDB
        const request = indexedDB.open('WorkCodesCompanyDB');
        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction(['companyProfile'], 'readonly');
            const store = transaction.objectStore('companyProfile');
            const getRequest = store.get('companyData');
            
            getRequest.onsuccess = () => {
                console.log('📂 IndexedDB:', getRequest.result);
                alert('Verifique o console! Dados no IndexedDB: ' + (getRequest.result ? 'SIM' : 'NÃO'));
            };
        };
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando sistema de perfil da empresa...');
    window.companyProfile = new CompanyProfile();
    
    // Adicionar botão de debug
    const debugBtn = document.createElement('button');
    debugBtn.innerHTML = '🐛';
    debugBtn.style.position = 'fixed';
    debugBtn.style.bottom = '20px';
    debugBtn.style.right = '20px';
    debugBtn.style.zIndex = '10000';
    debugBtn.style.width = '40px';
    debugBtn.style.height = '40px';
    debugBtn.style.background = '#ff4444';
    debugBtn.style.color = 'white';
    debugBtn.style.border = 'none';
    debugBtn.style.borderRadius = '50%';
    debugBtn.style.cursor = 'pointer';
    debugBtn.style.fontSize = '18px';
    debugBtn.onclick = debugStorage;
    document.body.appendChild(debugBtn);
});