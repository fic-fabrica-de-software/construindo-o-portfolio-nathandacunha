function openMenu() {
    const overlay = document.getElementById('menuOverlay');
    overlay.style.display = 'block';
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);
    
    // Bloqueia scroll do body quando menu está aberto
    document.body.style.overflow = 'hidden';
}

// Função para fechar o menu
function closeMenu() {
    const overlay = document.getElementById('menuOverlay');
    overlay.classList.remove('active');
    
    // Espera a animação terminar antes de esconder
    setTimeout(() => {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

// Função para navegar entre as páginas
function navigateTo(page) {
    closeMenu();
    
    // Adiciona feedback tátil para mobile
    const item = event.currentTarget;
    item.classList.add('bg-opacity-50');
    setTimeout(() => {
        item.classList.remove('bg-opacity-50');
    }, 200);
    
    // Simula navegação (substitua por redirecionamento real)
    const pages = {
        'home': 'Página Inicial',
        'sobre': 'Sobre Nós',
        'servicos': 'Serviços',
        'contato': 'Contato',
        'blog': 'Blog',
        'portfolio': 'Portfólio'
    };
    
    // Cria um toast notification para mobile
    showToast(`Indo para: ${pages[page]}`);
}

// Mostra um toast notification (feedback visual para ações)
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm animate-fadeInOut z-50';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('animate-fadeOut');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 2000);
}

// Adiciona o evento de clique ao botão de menu
document.getElementById('menuButton').addEventListener('click', openMenu);

// Fecha o menu ao clicar fora do conteúdo
document.getElementById('menuOverlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closeMenu();
    }
});

// Detecta swipe para fechar o menu
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('menuOverlay').addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.getElementById('menuOverlay').addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) { // Swipe para a esquerda
        closeMenu();
    }
}, false);

// Adiciona animações CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(20px) translateX(-50%); }
        10% { opacity: 1; transform: translateY(0) translateX(-50%); }
        90% { opacity: 1; transform: translateY(0) translateX(-50%); }
        100% { opacity: 0; transform: translateY(-20px) translateX(-50%); }
    }
    
    @keyframes fadeOut {
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);