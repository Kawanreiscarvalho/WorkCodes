const loginForm = document.getElementById('loginForm');
const loadingSpinner = document.getElementById('loadingSpinner');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const modoBtns = document.querySelectorAll('.modo-btn');
let modoSelecionado = 'empresa';

// Seleção de modo
modoBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        modoBtns.forEach(b => b.classList.remove('ativo'));
        this.classList.add('ativo');
        modoSelecionado = this.dataset.modo;
        console.log('Modo de login selecionado:', modoSelecionado);
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

// Carregar credenciais salvas
window.addEventListener('DOMContentLoaded', () => {
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    
    if (rememberMe && savedEmail && savedPassword) {
        document.getElementById('email').value = savedEmail;
        document.getElementById('password').value = savedPassword;
        document.getElementById('remember').checked = true;
    }
    
    // Debug: Verificar usuários no localStorage
    console.log('Usuários cadastrados para login:', JSON.parse(localStorage.getItem('usuarios')) || []);
});

// Validação de email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Função para buscar usuário no localStorage
function buscarUsuario(email, modo) {
    try {
        const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];
        console.log('Buscando usuário:', email, 'modo:', modo);
        console.log('Usuários disponíveis:', usuariosCadastrados);
        
        // Primeiro, buscar por email e modo específico
        let usuario = usuariosCadastrados.find(u => 
            u.email === email && u.tipo === modo
        );
        
        // Se não encontrou com modo específico, buscar apenas por email
        if (!usuario) {
            usuario = usuariosCadastrados.find(u => u.email === email);
            if (usuario) {
                console.log('Usuário encontrado sem verificação de modo:', usuario);
            }
        }
        
        return usuario;
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return null;
    }
}

// Função para redirecionar após login
function redirecionarAposLogin(tipo) {
    console.log('Redirecionando para tipo:', tipo);
    
    if (tipo === 'empresa') {
        window.location.href = "empresa.html";
    } else if (tipo === 'freelancer') {
        window.location.href = "freelancer.html";
    } else {
        // Fallback - redirecionar para página genérica
        window.location.href = "admin.html";
    }
}

// Simular login API
function simularLoginAPI(email, senha, modo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const usuario = buscarUsuario(email, modo);
            
            if (!usuario) {
                reject({
                    status: 404,
                    message: 'Usuário não encontrado. Verifique o e-mail e o tipo selecionado.'
                });
            } else if (usuario.senha !== senha) {
                reject({
                    status: 401,
                    message: 'Senha incorreta.'
                });
            } else {
                // Salvar usuário logado na sessionStorage
                const usuarioLogado = {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    tipo: usuario.tipo,
                    dataCadastro: usuario.dataCadastro
                };
                
                sessionStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
                console.log('Usuário logado salvo:', usuarioLogado);
                
                resolve({
                    status: 200,
                    message: 'Login realizado com sucesso!',
                    usuario: usuarioLogado,
                    tipo: usuario.tipo
                });
            }
        }, 1500);
    });
}

// Processar formulário
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';

    const email = loginForm.email.value.trim();
    const senha = loginForm.password.value.trim();

    console.log('Tentando login:', { email, modo: modoSelecionado });

    // Validações básicas
    if (!email || !senha) {
        showError('Por favor, preencha todos os campos.');
        return;
    }

    if (!validateEmail(email)) {
        showError('Por favor, insira um e-mail válido.');
        return;
    }

    // Mostrar loading
    loadingSpinner.style.display = 'flex';

    try {
        const resultado = await simularLoginAPI(email, senha, modoSelecionado);

        if (resultado.status === 200) {
            // Salvar credenciais se "Lembrar senha" estiver marcado
            if (document.getElementById('remember').checked) {
                localStorage.setItem('savedEmail', email);
                localStorage.setItem('savedPassword', senha);
                localStorage.setItem('rememberMe', 'true');
            } else {
                localStorage.removeItem('savedEmail');
                localStorage.removeItem('savedPassword');
                localStorage.removeItem('rememberMe');
            }

            // Mensagem de sucesso
            successMessage.textContent = `${resultado.message} Redirecionando para área ${modoSelecionado}...`;
            successMessage.style.display = 'block';
            
            // Limpar formulário
            loginForm.reset();
            
            // Redirecionar após 2 segundos
            setTimeout(() => {
                redirecionarAposLogin(resultado.tipo);
            }, 2000);
        }
    } catch (error) {
        console.error('Erro no login:', error);
        showError(error.message || 'Erro ao realizar login. Tente novamente.');
    } finally {
        // Esconder loading
        loadingSpinner.style.display = 'none';
    }
});

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Debug adicional
console.log('Sistema de login WorkCodes carregado - VERSÃO CORRIGIDA');