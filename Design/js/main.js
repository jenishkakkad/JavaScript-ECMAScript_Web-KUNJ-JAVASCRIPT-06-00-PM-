// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle responsive behavior
function handleResponsive() {
    const isMobile = window.innerWidth < 768;
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    
    if (!isMobile && sidebar) {
        sidebar.classList.add('open');
        if (sidebarOverlay) {
            sidebarOverlay.classList.remove('visible');
        }
    }
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create sidebar overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    // Handle initial responsive state
    handleResponsive();

    // Handle window resize
    window.addEventListener('resize', debounce(handleResponsive, 250));

    // Create carousel dots
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const items = carousel.querySelectorAll('.carousel-item');
        const dotsContainer = document.querySelector('.carousel-dots');
        
        items.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
            dot.setAttribute('data-index', index);
            dotsContainer.appendChild(dot);
        });
    }
}); 