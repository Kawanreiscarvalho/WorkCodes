// JavaScript para a página inicial da WorkCodes

document.addEventListener('DOMContentLoaded', function() {
    // Animação suave para os links de navegação
    const navLinks = document.querySelectorAll('nav a, .footer-column a');
    
    navLinks.forEach(link => {
        if(link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
    
    // Efeito de destaque nos cards de modo
    const modeCards = document.querySelectorAll('.mode-card');
    
    modeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Formulário de contato
    const contactForm = document.getElementById('contactForm');
    
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if(name && email && message) {
                // Simulação de envio
                alert('Obrigado pela sua mensagem! Entraremos em contato em breve.');
                contactForm.reset();
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }
    
    // Animação de contador para as estatísticas
    const stats = document.querySelectorAll('.stat-number');
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if(current >= target) {
                clearInterval(timer);
                current = target;
            }
            element.textContent = Math.floor(current) + '+';
        }, 20);
    }
    
    // Observador de interseção para animar estatísticas quando visíveis
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                stats.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    animateCounter(stat, target);
                });
                observer.disconnect();
            }
        });
    }, observerOptions);
    
    const statsSection = document.querySelector('.stats');
    if(statsSection) {
        observer.observe(statsSection);
    }
    
    // Efeito de parallax suave no header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if(window.scrollY > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Verificar parâmetros de URL para redirecionamento automático
    const urlParams = new URLSearchParams(window.location.search);
    const modo = urlParams.get('modo');
    
    if(modo === 'empresa') {
        window.location.href = 'cadastro.html?tipo=empresa';
    } else if(modo === 'freelancer') {
        window.location.href = 'cadastro.html?tipo=freelancer';
    }
});