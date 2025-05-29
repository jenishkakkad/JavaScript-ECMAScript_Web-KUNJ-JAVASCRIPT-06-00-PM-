// Toast Notification System
const toastContainer = document.createElement('div');
toastContainer.className = 'toast-container';
document.body.appendChild(toastContainer);

function showToast(title, message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type === 'success' ? 'success' : 'error'}`;
    
    toast.innerHTML = `
        <div class="toast-title">${title}</div>
        <div class="toast-description">${message}</div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
        
        setTimeout(() => {
            toastContainer.removeChild(toast);
        }, 300);
    }, 5000);
}

// Local Storage Utilities
function initializeStorage() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function getCurrentUser() {
    return localStorage.getItem('currentUser');
}

function setCurrentUser(email) {
    localStorage.setItem('currentUser', email);
}

function clearCurrentUser() {
    localStorage.removeItem('currentUser');
}

// Function to handle login button (remember credentials)
function handleLogin() {
    // Get current user email
    const currentUserEmail = getCurrentUser();
    
    // Get the user's password from storage
    const users = getUsers();
    const currentUser = users.find(u => u.email === currentUserEmail);
    
    if (currentUser) {
        // Save the credentials for pre-filling the login form
        localStorage.setItem('lastLoginEmail', currentUserEmail);
        localStorage.setItem('lastLoginPassword', currentUser.password);
    }
    
    // Clear current user
    clearCurrentUser();
    
    // Show toast notification
    showToast(
        "Logged out", 
        "You have been successfully logged out."
    );
    
    // Redirect to login page with remember=true parameter
    window.location.href = 'index.html?remember=true';
}

// Function to handle logout (clear credentials)
function handleLogout() {
    console.log("handleLogout function called");
    
    // Clear current user
    clearCurrentUser();
    console.log("Current user cleared");
    
    // Clear any saved credentials
    localStorage.removeItem('lastLoginEmail');
    localStorage.removeItem('lastLoginPassword');
    console.log("Saved credentials cleared");
    
    // Show toast notification
    showToast(
        "Logged out", 
        "You have been successfully logged out."
    );
    console.log("Toast notification shown");
    
    // Add a small delay before redirecting
    console.log("Redirecting to login page with remember=false parameter");
    setTimeout(function() {
        window.location.href = 'index.html?remember=false';
    }, 500);
}

// Password Strength Meter
function checkPasswordStrength(password) {
    if (!password) return { score: 0, text: '' };
    
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    // Normalize score to 0-4 range
    score = Math.min(4, score);
    
    // Get text representation
    let text = '';
    let color = '';
    
    switch (score) {
        case 0:
            text = 'Very Weak';
            color = '#ef4444';
            break;
        case 1:
            text = 'Weak';
            color = '#f97316';
            break;
        case 2:
            text = 'Fair';
            color = '#eab308';
            break;
        case 3:
            text = 'Good';
            color = '#22c55e';
            break;
        case 4:
            text = 'Strong';
            color = '#10b981';
            break;
    }
    
    return {
        score,
        text,
        color,
        percent: (score / 4) * 100
    };
}

// Modal System
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Initialize storage when the script loads
initializeStorage();

// Check if user is already logged in (for pages that require authentication)
function checkAuth() {
    const currentUser = getCurrentUser();
    const isLoginPage = window.location.pathname.endsWith('index.html') || 
                        window.location.pathname.endsWith('/');
    
    if (currentUser && isLoginPage) {
        window.location.href = 'dashboard.html';
    } else if (!currentUser && !isLoginPage && 
              !window.location.pathname.includes('forgot-password') && 
              !window.location.pathname.includes('otp-verification') && 
              !window.location.pathname.includes('otp') && 
              !window.location.pathname.includes('reset-password')) {
        window.location.href = 'index.html';
    }
}

// Run auth check when DOM is loaded
document.addEventListener('DOMContentLoaded', checkAuth);

// OTP Input Handling
function setupOtpInputs() {
    const otpInputs = document.querySelectorAll('.otp-input');
    
    otpInputs.forEach((input, index) => {
        // Handle input
        input.addEventListener('input', (e) => {
            // Allow only numbers
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
            
            if (e.target.value.length === 1) {
                // Move to next input
                if (index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            }
        });
        
        // Handle paste event
        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pasteData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
            
            if (pasteData) {
                // Distribute pasted data across inputs
                for (let i = 0; i < pasteData.length && i < otpInputs.length; i++) {
                    otpInputs[i].value = pasteData[i];
                    if (i === pasteData.length - 1 && i < otpInputs.length - 1) {
                        otpInputs[i + 1].focus();
                    }
                }
            }
        });
        
        // Handle backspace
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });
}

// Generate OTP
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Page-specific initialization
function initPage() {
    const path = window.location.pathname;
    
    if (path.endsWith('otp-verification.html') || path.endsWith('otp.html')) {
        setupOtpInputs();
        
        // Show demo OTP if available
        const demoOtp = localStorage.getItem('tempOtp');
        const demoOtpElement = document.getElementById('demoOtp');
        
        if (demoOtp && demoOtpElement) {
            demoOtpElement.textContent = demoOtp;
            document.querySelector('.demo-otp').classList.remove('hidden');
        } else {
            // Redirect if no OTP is set
            window.location.href = 'forgot-password.html';
        }
    }
    
    // Setup password strength meter if available
    const passwordInput = document.getElementById('newPassword') || 
                          document.getElementById('regPassword');
    const strengthMeter = document.querySelector('.strength-meter-fill');
    const strengthText = document.querySelector('.strength-text');
    
    if (passwordInput && strengthMeter && strengthText) {
        passwordInput.addEventListener('input', () => {
            const strength = checkPasswordStrength(passwordInput.value);
            strengthMeter.style.width = `${strength.percent}%`;
            strengthMeter.style.backgroundColor = strength.color;
            strengthText.textContent = strength.text;
            strengthText.style.color = strength.color;
        });
    }
}

// Run page initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initPage);