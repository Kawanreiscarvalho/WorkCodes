const form = document.getElementById('cadastroForm');
const loadingSpinner = document.getElementById('loadingSpinner');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const passwordInput = document.getElementById('senha');
const strengthFill = document.getElementById('strength-fill');
const strengthText = document.getElementById('strength-text');
const backLink = document.getElementById('backLink');
const modoBtns = document.querySelectorAll('.modo-btn');
let modoSelecionado = 'empresa';

// Seleção de modo
modoBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        modoBtns.forEach(b => b.classList.remove('ativo'));
        this.classList.add('ativo');
        modoSelecionado = this.dataset.modo;
        console.log('Modo selecionado:', modoSelecionado);
    });
});

// Carregar modo da URL
const urlParams = new URLSearchParams(window.location.search);
const tipoURL = urlParams.get('tipo');
if (tipoURL && (tipoURL === 'empresa' || tipoURL === 'freelancer')) {
    modoSelecionado = tipoURL;
    modoBtns.forEach(btn => {
        btn.classList.remove('ativo');
        if (btn.dataset.modo === modoSelecionado) {
            btn.classList.add('ativo');
        }
    });
    console.log('Modo carregado da URL:', modoSelecionado);
}

// Validação de força da senha
passwordInput.addEventListener('input', function() {
    const password = this.value;
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/\d/.test(password)) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    strengthFill.className = 'strength-fill';
    
    if (password.length === 0) {
        strengthText.textContent = 'Força da senha:';
        strengthFill.style.width = '0%';
    } else if (strength <= 1) {
        strengthText.textContent = 'Fraca';
        strengthFill.classList.add('strength-weak');
    } else if (strength <= 2) {
        strengthText.textContent = 'Média';
        strengthFill.classList.add('strength-medium');
    } else {
        strengthText.textContent = 'Forte';
        strengthFill.classList.add('strength-strong');
    }
});

// Validação de email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validação de nome
function validateName(name) {
    return name.length >= 2 && /^[a-zA-ZÀ-ÿ\s]+$/.test(name);
}

// Verificar se email já existe
function emailExists(email) {
    const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuariosCadastrados.some(usuario => usuario.email === email);
}

// Limpar estados de erro
function clearErrors() {
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.classList.remove('input-error', 'input-success');
    });
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
}

// Mostrar erro
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Função para salvar usuário corretamente
function salvarUsuario(usuario) {
    try {
        // Obter usuários existentes
        const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        // Verificar se usuário já existe
        const usuarioExistenteIndex = usuariosCadastrados.findIndex(u => u.email === usuario.email);
        
        if (usuarioExistenteIndex !== -1) {
            // Atualizar usuário existente
            usuariosCadastrados[usuarioExistenteIndex] = usuario;
        } else {
            // Adicionar novo usuário
            usuariosCadastrados.push(usuario);
        }
        
        // Salvar no localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuariosCadastrados));
        
        // Verificar se salvou corretamente
        const usuariosVerificados = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioSalvo = usuariosVerificados.find(u => u.email === usuario.email);
        
        if (usuarioSalvo) {
            console.log('✅ Usuário salvo com sucesso:', usuarioSalvo);
            return true;
        } else {
            console.error('❌ Erro: Usuário não foi salvo corretamente');
            return false;
        }
    } catch (error) {
        console.error('❌ Erro ao salvar usuário:', error);
        return false;
    }
}

// Simular API de cadastro
function simularCadastroAPI(usuario) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (emailExists(usuario.email)) {
                reject({
                    status: 400,
                    message: 'Este e-mail já está cadastrado.'
                });
            } else {
                // Salvar usuário
                const salvou = salvarUsuario(usuario);
                
                if (salvou) {
                    resolve({
                        status: 200,
                        message: 'Cadastro realizado com sucesso!',
                        tipo: usuario.tipo
                    });
                } else {
                    reject({
                        status: 500,
                        message: 'Erro ao salvar cadastro. Tente novamente.'
                    });
                }
            }
        }, 1500);
    });
}

// Função para redirecionar baseado no tipo de usuário
function redirecionarUsuario(tipo) {
    console.log('Redirecionando usuário tipo:', tipo);
    
    // Salvar informação do tipo na sessionStorage para uso posterior
    sessionStorage.setItem('ultimoTipoCadastro', tipo);
    
    // Redirecionar baseado no tipo
    if (tipo === 'empresa') {
        window.location.href = "empresa.html";
    } else if (tipo === 'freelancer') {
        window.location.href = "freelancer.html";
    } else {
        // Fallback para login
        window.location.href = "login.html";
    }
}

// Processar formulário
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearErrors();

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const senha = form.senha.value.trim();

    console.log('Tentando cadastrar:', { nome, email, tipo: modoSelecionado });

    // Validações
    let isValid = true;

    if (!nome) {
        form.nome.classList.add('input-error');
        isValid = false;
    } else if (!validateName(nome)) {
        form.nome.classList.add('input-error');
        showError('Por favor, insira um nome válido (apenas letras e espaços).');
        isValid = false;
    } else {
        form.nome.classList.add('input-success');
    }

    if (!email) {
        form.email.classList.add('input-error');
        isValid = false;
    } else if (!validateEmail(email)) {
        form.email.classList.add('input-error');
        showError('Por favor, insira um e-mail válido.');
        isValid = false;
    } else {
        form.email.classList.add('input-success');
    }

    if (!senha) {
        form.senha.classList.add('input-error');
        isValid = false;
    } else if (senha.length < 6) {
        form.senha.classList.add('input-error');
        showError('A senha deve ter pelo menos 6 caracteres.');
        isValid = false;
    } else {
        form.senha.classList.add('input-success');
    }

    if (!isValid) {
        return;
    }

    // Mostrar loading
    loadingSpinner.style.display = 'flex';

    try {
        // Simular chamada à API
        const resultado = await simularCadastroAPI({
            nome,
            email,
            senha,
            tipo: modoSelecionado,
            id: Date.now().toString(),
            dataCadastro: new Date().toISOString()
        });

        if (resultado.status === 200) {
            // Sucesso
            successMessage.textContent = `Cadastro realizado com sucesso! Redirecionando para página de ${modoSelecionado}...`;
            successMessage.style.display = 'block';
            
            // Limpar formulário
            form.reset();
            strengthText.textContent = 'Força da senha:';
            strengthFill.style.width = '0%';
            
            // Redirecionar após 2 segundos para a página correta
            setTimeout(() => {
                redirecionarUsuario(modoSelecionado);
            }, 2000);
        }
    } catch (error) {
        // Erro da API simulada
        console.error('Erro no cadastro:', error);
        showError(error.message || 'Erro ao realizar cadastro. Tente novamente.');
    } finally {
        // Esconder loading
        loadingSpinner.style.display = 'none';
    }
});

// Limpar erros ao digitar
const inputs = form.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('input', function() {
        this.classList.remove('input-error');
        errorMessage.style.display = 'none';
    });
});

// Link de voltar
backLink.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = "index.html";
});

// Debug: Verificar usuários no localStorage
console.log('Usuários cadastrados:', JSON.parse(localStorage.getItem('usuarios')) || []);
console.log('Sistema de cadastro WorkCodes carregado - VERSÃO CORRIGIDA');