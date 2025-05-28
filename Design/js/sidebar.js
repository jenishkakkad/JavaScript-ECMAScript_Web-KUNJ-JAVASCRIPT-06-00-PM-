class Sidebar {
    constructor() {
        this.sidebar = document.querySelector('.sidebar');
        this.overlay = document.querySelector('.sidebar-overlay');
        this.toggleBtn = document.querySelector('.toggle-sidebar-btn');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        // Toggle button click
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggle());
        }
        
        // Close on overlay click
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.close());
        }
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
        
        // Handle nested items
        const nestedItems = this.sidebar.querySelectorAll('.sidebar-item[data-has-children]');
        nestedItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleNestedItem(item);
            });
        });
        
        // Handle active state
        const items = this.sidebar.querySelectorAll('.sidebar-item');
        items.forEach(item => {
            if (!item.hasAttribute('data-has-children')) {
                item.addEventListener('click', () => {
                    this.setActiveItem(item);
                });
            }
        });
    }
    
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    
    open() {
        if (this.isOpen) return;
        
        this.sidebar.classList.add('open');
        if (this.overlay) {
            this.overlay.classList.add('visible');
        }
        
        // Prevent body scroll on mobile
        if (window.innerWidth < 768) {
            document.body.style.overflow = 'hidden';
        }
        
        this.isOpen = true;
    }
    
    close() {
        if (!this.isOpen) return;
        
        this.sidebar.classList.remove('open');
        if (this.overlay) {
            this.overlay.classList.remove('visible');
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        this.isOpen = false;
    }
    
    toggleNestedItem(item) {
        const isExpanded = item.hasAttribute('data-expanded');
        const nestedContent = item.nextElementSibling;
        
        if (isExpanded) {
            item.removeAttribute('data-expanded');
            if (nestedContent) {
                nestedContent.style.height = '0';
                setTimeout(() => {
                    nestedContent.style.display = 'none';
                }, 300);
            }
        } else {
            item.setAttribute('data-expanded', '');
            if (nestedContent) {
                nestedContent.style.display = 'block';
                const height = nestedContent.scrollHeight;
                nestedContent.style.height = height + 'px';
            }
        }
    }
    
    setActiveItem(item) {
        // Remove active class from all items
        const items = this.sidebar.querySelectorAll('.sidebar-item');
        items.forEach(i => i.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Close sidebar on mobile after item selection
        if (window.innerWidth < 768) {
            this.close();
        }
    }
}

// Initialize sidebar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = new Sidebar();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            sidebar.open();
        } else {
            sidebar.close();
        }
    });
});

// Global function for toggling sidebar
window.toggleSidebar = function() {
    const sidebar = new Sidebar();
    sidebar.toggle();
}; 