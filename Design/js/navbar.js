class Navbar {
    constructor() {
        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.mobileNav = document.querySelector('.mobile-nav');
        this.cartCount = document.querySelector('.cart-count');
        this.cartText = document.querySelector('.cart-text');
        this.searchInput = document.querySelector('.search-input');
        this.searchBtn = document.querySelector('.search-btn');
        
        this.init();
    }
    
    init() {
        // Mobile menu toggle
        this.mobileMenuBtn.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // Close mobile menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && this.mobileNav.classList.contains('open')) {
                this.mobileNav.classList.remove('open');
            }
        });
        
        // Search functionality
        this.searchBtn.addEventListener('click', () => {
            this.handleSearch();
        });
        
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });
        
        // Initialize cart count
        this.updateCartCount(0);
        
        // Handle active nav links
        this.handleActiveNavLinks();
    }
    
    toggleMobileMenu() {
        this.mobileNav.classList.toggle('open');
    }
    
    handleSearch() {
        const searchTerm = this.searchInput.value.trim();
        if (searchTerm) {
            // Here you would typically handle the search
            console.log('Searching for:', searchTerm);
            this.searchInput.value = '';
        }
    }
    
    updateCartCount(count) {
        this.cartCount.textContent = count;
        this.cartText.textContent = `Cart (${count})`;
        
        if (count > 0) {
            this.cartCount.style.display = 'flex';
        } else {
            this.cartCount.style.display = 'none';
        }
    }
    
    handleActiveNavLinks() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

// Initialize navbar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const navbar = new Navbar();
    
    // Example: Update cart count after 2 seconds
    setTimeout(() => {
        navbar.updateCartCount(3);
    }, 2000);
}); 