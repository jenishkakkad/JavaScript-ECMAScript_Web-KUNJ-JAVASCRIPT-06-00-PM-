class Carousel {
    constructor(element) {
        this.carousel = element;
        this.items = Array.from(this.carousel.querySelectorAll('.carousel-item'));
        this.dotsContainer = this.carousel.parentElement.querySelector('.carousel-dots');
        this.dots = Array.from(this.dotsContainer.querySelectorAll('.carousel-dot'));
        this.prevBtn = this.carousel.parentElement.querySelector('.prev-btn');
        this.nextBtn = this.carousel.parentElement.querySelector('.next-btn');
        
        this.currentIndex = 0;
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goTo(index));
        });
        
        // Add touch support
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    }
    
    handleSwipe(startX, endX) {
        const diff = startX - endX;
        const threshold = 50; // minimum distance for swipe
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
        }
    }
    
    prev() {
        if (this.isAnimating) return;
        const nextIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.goTo(nextIndex);
    }
    
    next() {
        if (this.isAnimating) return;
        const nextIndex = (this.currentIndex + 1) % this.items.length;
        this.goTo(nextIndex);
    }
    
    goTo(index) {
        if (this.isAnimating || index === this.currentIndex) return;
        
        this.isAnimating = true;
        
        // Remove active classes
        this.items[this.currentIndex].classList.remove('active');
        this.dots[this.currentIndex].classList.remove('active');
        
        // Add fade-out animation to current item
        this.items[this.currentIndex].classList.add('fade-out');
        
        // After fade out, switch items and fade in new item
        setTimeout(() => {
            this.items[this.currentIndex].classList.remove('fade-out');
            this.currentIndex = index;
            
            // Add active classes and fade-in animation
            this.items[this.currentIndex].classList.add('active', 'fade-in');
            this.dots[this.currentIndex].classList.add('active');
            
            // Remove fade-in class after animation
            setTimeout(() => {
                this.items[this.currentIndex].classList.remove('fade-in');
                this.isAnimating = false;
            }, 500);
        }, 500);
    }
    
    // Auto-advance slides
    startAutoPlay(interval = 5000) {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => this.next(), interval);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

// Initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carouselElement => {
        const carousel = new Carousel(carouselElement);
        carousel.startAutoPlay(); // Start auto-play
        
        // Pause auto-play on hover
        carouselElement.parentElement.addEventListener('mouseenter', () => carousel.stopAutoPlay());
        carouselElement.parentElement.addEventListener('mouseleave', () => carousel.startAutoPlay());
    });
}); 