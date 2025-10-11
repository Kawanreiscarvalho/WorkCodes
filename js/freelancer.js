// Elementos da página
        const freelancerForm = document.getElementById('freelancerForm');
        const loadingSpinner = document.getElementById('loadingSpinner');
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');
        const availabilityToggle = document.getElementById('availabilityToggle');
        const statusText = document.getElementById('statusText');
        const addMemberBtn = document.getElementById('addMemberBtn');
        const teamMembers = document.getElementById('teamMembers');
        const logoutBtn = document.getElementById('logoutBtn');

        // Elementos de preview
        const previewName = document.getElementById('previewName');
        const previewRole = document.getElementById('previewRole');
        const previewProjects = document.getElementById('previewProjects');
        const previewRating = document.getElementById('previewRating');

        // Contador de membros da equipe
        let teamMemberCount = 0;

        // =============================================
        // FUNÇÕES DE INICIALIZAÇÃO
        // =============================================

        // Carregar dados do freelancer
        function carregarDadosFreelancer() {
            const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));
            const freelancers = JSON.parse(localStorage.getItem('freelancers')) || [];
            
            if (usuarioLogado) {
                // Preencher email automaticamente
                document.getElementById('email').value = usuarioLogado.email;
                
                // Buscar dados completos do freelancer
                const freelancerData = freelancers.find(f => f.email === usuarioLogado.email);
                
                if (freelancerData) {
                    // Preencher formulário com dados existentes
                    document.getElementById('fullName').value = freelancerData.nome || '';
                    document.getElementById('phone').value = freelancerData.telefone || '';
                    document.getElementById('location').value = freelancerData.localizacao || '';
                    document.getElementById('portfolio').value = freelancerData.portfolio || '';
                    document.getElementById('bio').value = freelancerData.bio || '';
                    
                    // Atualizar preview
                    previewName.textContent = freelancerData.nome || 'Seu Nome';
                    previewRole.textContent = determinarCargo(freelancerData.habilidades || []);
                    previewProjects.textContent = freelancerData.projetos || 0;
                    previewRating.textContent = freelancerData.avaliacao || '0.0';
                    
                    // Status de disponibilidade
                    availabilityToggle.checked = freelancerData.disponivel !== false;
                    atualizarStatusTexto();
                    
                    // Marcar habilidades
                    marcarHabilidades(freelancerData.habilidades || []);
                    
                    // Carregar equipe
                    carregarEquipe(freelancerData.equipe || []);
                } else {
                    previewName.textContent = usuarioLogado.nome || 'Seu Nome';
                }
            }
        }

        // Determinar cargo baseado nas habilidades
        function determinarCargo(habilidades) {
            const temFrontend = habilidades.some(h => 
                ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular'].includes(h));
            const temBackend = habilidades.some(h => 
                ['Node.js', 'Python', 'Java', 'PHP', 'Express.js', 'Django'].includes(h));
            
            if (temFrontend && temBackend) return 'Desenvolvedor Full Stack';
            if (temFrontend) return 'Desenvolvedor Front-end';
            if (temBackend) return 'Desenvolvedor Back-end';
            return 'Desenvolvedor';
        }

        // Marcar habilidades no formulário
        function marcarHabilidades(habilidades) {
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = habilidades.includes(checkbox.value);
            });
        }

        // Carregar equipe
        function carregarEquipe(equipe) {
            teamMembers.innerHTML = '';
            teamMemberCount = 0;
            
            equipe.forEach(membro => {
                adicionarMembroEquipe(membro);
            });
        }

        // =============================================
        // FUNÇÕES DE EQUIPE
        // =============================================

        // Adicionar membro da equipe
        function adicionarMembroEquipe(dados = {}) {
            teamMemberCount++;
            const memberId = `teamMember${teamMemberCount}`;
            
            const memberHTML = `
                <div class="team-member" id="${memberId}">
                    <div class="form-group">
                        <label>Nome do Membro</label>
                        <input type="text" class="form-control team-member-name" placeholder="Nome completo" value="${dados.nome || ''}">
                    </div>
                    <div class="form-group">
                        <label>Especialidade</label>
                        <input type="text" class="form-control team-member-specialty" placeholder="Front-end, Back-end, etc." value="${dados.especialidade || ''}">
                    </div>
                    <div class="form-group">
                        <label>Experiência (anos)</label>
                        <input type="number" class="form-control team-member-experience" placeholder="2" min="0" value="${dados.experiencia || ''}">
                    </div>
                    <button type="button" class="btn btn-secondary" onclick="removerMembroEquipe('${memberId}')" style="margin-top: 10px;">
                        Remover
                    </button>
                </div>
            `;
            
            teamMembers.insertAdjacentHTML('beforeend', memberHTML);
        }

        // Remover membro da equipe
        function removerMembroEquipe(memberId) {
            const memberElement = document.getElementById(memberId);
            if (memberElement) {
                memberElement.remove();
            }
        }

        // Obter dados da equipe
        function obterDadosEquipe() {
            const members = [];
            const memberElements = document.querySelectorAll('.team-member');
            
            memberElements.forEach(member => {
                const nome = member.querySelector('.team-member-name').value;
                const especialidade = member.querySelector('.team-member-specialty').value;
                const experiencia = member.querySelector('.team-member-experience').value;
                
                if (nome.trim()) {
                    members.push({
                        nome: nome.trim(),
                        especialidade: especialidade.trim(),
                        experiencia: parseInt(experiencia) || 0
                    });
                }
            });
            
            return members;
        }

        // =============================================
        // FUNÇÕES DE STATUS
        // =============================================

        // Atualizar texto do status
        function atualizarStatusTexto() {
            if (availabilityToggle.checked) {
                statusText.textContent = 'Disponível';
                statusText.className = 'status-text status-available';
            } else {
                statusText.textContent = 'Indisponível';
                statusText.className = 'status-text status-unavailable';
            }
        }

        // =============================================
        // FUNÇÕES DE FORMULÁRIO
        // =============================================

        // Obter habilidades selecionadas
        function obterHabilidadesSelecionadas() {
            const habilidades = [];
            const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
            
            checkboxes.forEach(checkbox => {
                habilidades.push(checkbox.value);
            });
            
            return habilidades;
        }

        // Validar formulário
        function validarFormulario() {
            const nome = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefone = document.getElementById('phone').value.trim();
            
            if (!nome) {
                showError('Por favor, preencha seu nome completo.');
                return false;
            }
            
            if (!email) {
                showError('Por favor, preencha seu e-mail.');
                return false;
            }
            
            if (!telefone) {
                showError('Por favor, preencha seu telefone.');
                return false;
            }
            
            return true;
        }

        // =============================================
        // FUNÇÕES DE INTERFACE
        // =============================================

        // Mostrar mensagem de sucesso
        function showSuccess(message) {
            successMessage.textContent = message;
            successMessage.style.display = 'block';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }

        // Mostrar mensagem de erro
        function showError(message) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        }

        // =============================================
        // EVENT LISTENERS
        // =============================================

        // Alteração do status de disponibilidade
        availabilityToggle.addEventListener('change', atualizarStatusTexto);

        // Adicionar membro da equipe
        addMemberBtn.addEventListener('click', () => {
            adicionarMembroEquipe();
        });

        // Atualizar preview em tempo real
        document.getElementById('fullName').addEventListener('input', function() {
            previewName.textContent = this.value || 'Seu Nome';
        });

        // Envio do formulário
        freelancerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            if (!validarFormulario()) {
                return;
            }

            // Mostrar loading
            loadingSpinner.style.display = 'flex';

            try {
                // Simular salvamento
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Coletar dados
                const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));
                const dadosFreelancer = {
                    id: usuarioLogado.id,
                    nome: document.getElementById('fullName').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    telefone: document.getElementById('phone').value.trim(),
                    localizacao: document.getElementById('location').value.trim(),
                    portfolio: document.getElementById('portfolio').value.trim(),
                    bio: document.getElementById('bio').value.trim(),
                    habilidades: obterHabilidadesSelecionadas(),
                    disponivel: availabilityToggle.checked,
                    equipe: obterDadosEquipe(),
                    projetos: parseInt(previewProjects.textContent) || 0,
                    avaliacao: parseFloat(previewRating.textContent) || 0.0,
                    dataAtualizacao: new Date().toISOString()
                };

                // Atualizar preview
                previewRole.textContent = determinarCargo(dadosFreelancer.habilidades);

                // Salvar no localStorage
                const freelancers = JSON.parse(localStorage.getItem('freelancers')) || [];
                const index = freelancers.findIndex(f => f.email === dadosFreelancer.email);
                
                if (index !== -1) {
                    freelancers[index] = dadosFreelancer;
                } else {
                    freelancers.push(dadosFreelancer);
                }
                
                localStorage.setItem('freelancers', JSON.stringify(freelancers));

                // Sucesso
                showSuccess('Perfil atualizado com sucesso! Suas informações estão visíveis para empresas.');
                
            } catch (error) {
                showError('Erro ao salvar perfil. Tente novamente.');
            } finally {
                loadingSpinner.style.display = 'none';
            }
        });

        // Logout
        logoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('usuarioLogado');
            window.location.href = 'index.html';
        });

        // =============================================
        // INICIALIZAÇÃO
        // =============================================

        document.addEventListener('DOMContentLoaded', function() {
            // Verificar se usuário está logado
            const usuarioLogado = sessionStorage.getItem('usuarioLogado');
            if (!usuarioLogado) {
                window.location.href = 'login.html';
                return;
            }

            // Carregar dados do freelancer
            carregarDadosFreelancer();
            atualizarStatusTexto();
            
            console.log('Página do freelancer carregada com sucesso');
        });