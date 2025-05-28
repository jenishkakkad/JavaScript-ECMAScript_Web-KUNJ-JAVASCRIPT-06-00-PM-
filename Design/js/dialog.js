class Dialog {
    constructor(element) {
        this.dialog = element;
        this.content = this.dialog.querySelector('.dialog-content');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        // Close on overlay click
        this.dialog.addEventListener('click', (e) => {
            if (e.target === this.dialog) {
                this.close();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
        
        // Prevent content click from closing
        this.content.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Handle focus trap
        this.content.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.handleFocusTrap(e);
            }
        });
    }
    
    handleFocusTrap(e) {
        const focusableElements = this.content.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    }
    
    open() {
        if (this.isOpen) return;
        
        // Store the element that had focus before opening
        this.previousActiveElement = document.activeElement;
        
        // Show dialog
        this.dialog.classList.add('open', 'animate-in');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus first focusable element
        setTimeout(() => {
            const focusable = this.content.querySelector(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusable) {
                focusable.focus();
            }
        }, 100);
        
        this.isOpen = true;
    }
    
    close() {
        if (!this.isOpen) return;
        
        // Remove classes
        this.dialog.classList.remove('open', 'animate-in');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Restore focus
        if (this.previousActiveElement) {
            this.previousActiveElement.focus();
        }
        
        this.isOpen = false;
    }
}

// Global functions for opening/closing dialogs
window.openDialog = function(dialogId) {
    const dialogElement = document.getElementById(dialogId);
    if (dialogElement) {
        const dialog = new Dialog(dialogElement);
        dialog.open();
    }
};

window.closeDialog = function(dialogId) {
    const dialogElement = document.getElementById(dialogId);
    if (dialogElement) {
        const dialog = new Dialog(dialogElement);
        dialog.close();
    }
}; 