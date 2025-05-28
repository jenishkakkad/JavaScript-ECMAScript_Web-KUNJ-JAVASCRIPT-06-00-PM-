// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Banner Slider
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Initialize first slide
showSlide(0);

// Auto-advance slides every 5 seconds
setInterval(nextSlide, 5000);

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Fade-in Animation on Scroll
const fadeElements = document.querySelectorAll('.about-content, .product-card, .team-member');

function checkFade() {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.8) {
            element.classList.add('fade-in');
        }
    });
}

// Initial check for elements in view
checkFade();

// Check for new elements on scroll
window.addEventListener('scroll', checkFade);

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    // Here you would typically send the form data to a server
    // For now, we'll just show a success message
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Product Data
const products = {
    1: {
        name: 'Fresh Fruits',
        price: 199,
        image: 'images/products/fruits.jpg',
        rating: 4.5,
        description: 'Fresh and juicy fruits sourced directly from local farmers. Perfect for your daily nutritional needs.',
        stock: 50
    },
    2: {
        name: 'Healthy Nuts',
        price: 399,
        image: 'images/products/nuts.jpg',
        rating: 5.0,
        description: 'Premium quality nuts packed with proteins and healthy fats. Great for snacking and cooking.',
        stock: 30
    },
    3: {
        name: 'Exotic Spices',
        price: 299,
        image: 'images/products/spicy.jpg',
        rating: 4.0,
        description: 'Authentic spices that add rich flavors to your dishes. Carefully sourced from the best spice gardens.',
        stock: 40
    },
    4: {
        name: 'Fresh Vegetables',
        price: 99,
        image: 'images/products/vegetable.jpg',
        rating: 4.5,
        description: 'Farm-fresh vegetables delivered straight to your doorstep. Handpicked for the best quality.',
        stock: 60
    }
};

// UI Elements
const cartIcon = document.querySelector('.cart-icon');
const cartOverlay = document.querySelector('.cart-overlay');
const closeCartBtn = document.querySelector('.close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const subtotalAmount = document.querySelector('.subtotal-amount');
const totalAmount = document.querySelector('.total-amount');
const deliveryAmount = document.querySelector('.delivery-amount');
const progressBar = document.querySelector('.progress');
const remainingForFree = document.querySelector('.remaining-for-free');
const checkoutBtn = document.querySelector('.checkout-btn');
const quickViewBtns = document.querySelectorAll('.quick-view');
const quickViewModal = document.getElementById('quickViewModal');
const checkoutModal = document.getElementById('checkoutModal');
const successModal = document.getElementById('successModal');
const toastContainer = document.querySelector('.toast-container');

// Cart State
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const FREE_DELIVERY_THRESHOLD = 500;
const DELIVERY_FEE = 50;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
    setupEventListeners();
    setupCheckoutProcess();
});

function setupEventListeners() {
    // Cart Toggle
    cartIcon.addEventListener('click', () => {
        cartOverlay.classList.add('active');
        updateProgressBar();
    });

    closeCartBtn.addEventListener('click', () => {
        cartOverlay.classList.remove('active');
    });

    // Quick View
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = btn.dataset.id;
            showQuickView(productId);
        });
    });

    // Add to Cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = button.dataset.id;
            addToCart(productId, 1);
            showToast('Product added to cart!', 'success');
        });
    });

    // Checkout Process
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showToast('Your cart is empty!', 'error');
            return;
        }
        cartOverlay.classList.remove('active');
        checkoutModal.style.display = 'flex';
        setTimeout(() => {
            checkoutModal.classList.add('active');
        }, 10);
        showStep(1);
    });
}

function setupCheckoutProcess() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    const checkoutModal = document.getElementById('checkoutModal');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const deliveryForm = document.getElementById('deliveryForm');
    const steps = document.querySelectorAll('.checkout-step');
    const stepIndicators = document.querySelectorAll('.checkout-steps .step');

    // Handle Checkout Button Click
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showToast('Your cart is empty!', 'error');
            return;
        }
        cartOverlay.classList.remove('active');
        checkoutModal.style.display = 'flex';
        setTimeout(() => {
            checkoutModal.classList.add('active');
        }, 10);
        showStep(1);
    });

    // Close Modal Buttons
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        });
    });

    // Handle Delivery Form Submission
    deliveryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showStep(2);
    });

    // Handle Payment Method Selection
    const paymentStep = document.querySelector('[data-step="2"]');
    const paymentNextBtn = paymentStep.querySelector('.next-step');
    paymentNextBtn.addEventListener('click', () => {
        const selectedPayment = document.querySelector('input[name="payment"]:checked');
        if (!selectedPayment) {
            showToast('Please select a payment method', 'error');
            return;
        }
        showStep(3);
        populateOrderSummary();
    });

    // Handle Place Order Button
    const placeOrderBtn = document.querySelector('.place-order');
    placeOrderBtn.addEventListener('click', () => {
        completeOrder();
    });

    function showStep(stepNumber) {
        steps.forEach(step => {
            step.style.display = 'none';
        });
        stepIndicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        const currentStep = document.querySelector(`[data-step="${stepNumber}"]`);
        const currentIndicator = document.querySelector(`.step[data-step="${stepNumber}"]`);
        
        if (currentStep && currentIndicator) {
            currentStep.style.display = 'block';
            currentIndicator.classList.add('active');
        }
    }
}

function populateOrderSummary() {
    const deliveryForm = document.getElementById('deliveryForm');
    const paymentMethod = document.querySelector('input[name="payment"]:checked');
    
    // Populate delivery address
    document.querySelector('.delivery-address').innerHTML = `
        <p>${deliveryForm.querySelector('input[type="text"]').value}</p>
        <p>${deliveryForm.querySelector('textarea').value}</p>
        <p>PIN: ${deliveryForm.querySelector('input[type="text"]:last-child').value}</p>
    `;
    
    // Populate order items
    document.querySelector('.order-items').innerHTML = cart.map(item => `
        <div class="order-item">
            <span>${item.name} (${item.size}kg) × ${item.quantity}</span>
            <span>₹${item.price * item.quantity}</span>
        </div>
    `).join('');
    
    // Populate payment details
    document.querySelector('.payment-details').innerHTML = `
        <p>Payment Method: ${paymentMethod.value.toUpperCase()}</p>
        <p>Subtotal: ₹${subtotalAmount.textContent}</p>
        <p>Delivery: ${deliveryAmount.textContent}</p>
        <p class="total">Total: ${totalAmount.textContent}</p>
    `;
}

function completeOrder() {
    const orderId = generateOrderId();
    const deliveryDate = getEstimatedDeliveryDate();
    
    // Hide checkout modal
    const checkoutModal = document.getElementById('checkoutModal');
    checkoutModal.classList.remove('active');
    setTimeout(() => {
        checkoutModal.style.display = 'none';
    }, 300);
    
    // Show success modal
    const successModal = document.getElementById('successModal');
    successModal.style.display = 'flex';
    setTimeout(() => {
        successModal.classList.add('active');
    }, 10);
    
    // Update success modal content
    successModal.querySelector('.order-id').textContent = orderId;
    successModal.querySelector('.delivery-date').textContent = deliveryDate;
    
    // Clear cart
    cart = [];
    localStorage.removeItem('cart');
    updateCart();
    
    // Handle continue shopping button
    const continueShoppingBtn = successModal.querySelector('.continue-shopping');
    continueShoppingBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
        setTimeout(() => {
            successModal.style.display = 'none';
        }, 300);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Utility Functions
function generateOrderId() {
    return 'ORD' + Date.now().toString().slice(-8);
}

function getEstimatedDeliveryDate() {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString('en-IN', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Quick View Functions
function showQuickView(productId) {
    const product = products[productId];
    const modal = document.getElementById('quickViewModal');
    
    // Update modal content
    modal.querySelector('.product-details-image img').src = product.image;
    modal.querySelector('.product-title').textContent = product.name;
    modal.querySelector('.product-price').textContent = `₹${product.price}`;
    modal.querySelector('.product-description p').textContent = product.description;
    
    // Setup size buttons
    const sizeButtons = modal.querySelectorAll('.size-btn');
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // Setup quantity buttons
    const qtyInput = modal.querySelector('.qty-input');
    modal.querySelector('.qty-btn.minus').addEventListener('click', () => {
        if (qtyInput.value > 1) qtyInput.value--;
    });
    modal.querySelector('.qty-btn.plus').addEventListener('click', () => {
        if (qtyInput.value < 10) qtyInput.value++;
    });
    
    // Add to cart from modal
    modal.querySelector('.add-to-cart-modal').addEventListener('click', () => {
        const size = modal.querySelector('.size-btn.active')?.dataset.size || 1;
        const quantity = parseInt(qtyInput.value);
        addToCart(productId, quantity, size);
        modal.classList.remove('active');
        showToast('Product added to cart!', 'success');
    });
    
    // Show modal
    modal.classList.add('active');
    
    // Close modal
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.classList.remove('active');
    });
}

// Cart Functions
function addToCart(productId, quantity = 1, size = 1) {
    const product = products[productId];
    const existingItem = cart.find(item => item.id === productId && item.size === size);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
            size: size
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    
    // Animate cart icon
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
    }, 200);
}

function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price} × ${item.quantity}</div>
                <div class="cart-item-size">${item.size}kg</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-id="${item.id}" data-size="${item.size}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}" data-size="${item.size}">+</button>
                </div>
            </div>
            <button class="cart-item-remove" data-id="${item.id}" data-size="${item.size}">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    // Update amounts
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    subtotalAmount.textContent = `₹${subtotal}`;
    
    const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
    deliveryAmount.textContent = delivery === 0 ? 'FREE' : `₹${delivery}`;
    
    const total = subtotal + delivery;
    totalAmount.textContent = `₹${total}`;
    
    // Update progress bar
    updateProgressBar(subtotal);
    
    // Add event listeners to cart items
    setupCartItemListeners();
}

function updateProgressBar(subtotal = 0) {
    const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
    const progress = (subtotal / FREE_DELIVERY_THRESHOLD) * 100;
    
    progressBar.style.width = `${Math.min(100, progress)}%`;
    remainingForFree.textContent = remaining;
    
    if (remaining === 0) {
        document.querySelector('.cart-progress p').textContent = 'You have FREE delivery! 🎉';
    }
}

function setupCartItemListeners() {
    // Quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = button.dataset.id;
            const size = parseFloat(button.dataset.size);
            const item = cart.find(item => item.id === id && item.size === size);
            
            if (button.classList.contains('plus')) {
                item.quantity++;
            } else if (button.classList.contains('minus')) {
                if (item.quantity > 1) {
                    item.quantity--;
                }
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        });
    });
    
    // Remove buttons
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.dataset.id;
            const size = parseFloat(button.dataset.size);
            cart = cart.filter(item => !(item.id === id && item.size === size));
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
            showToast('Product removed from cart', 'info');
        });
    });
} 