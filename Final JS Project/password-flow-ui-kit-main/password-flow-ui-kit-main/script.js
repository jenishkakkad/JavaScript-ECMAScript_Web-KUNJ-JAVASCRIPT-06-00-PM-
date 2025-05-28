// Initialize empty users array in localStorage if not exists
function initializeUsers() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeUsers();
    
    // Check if user is logged in and redirect appropriately
    const currentUser = localStorage.getItem('currentUser');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentUser && currentPage === 'index.html') {
        window.location.href = 'dashboard.html';
    } else if (!currentUser && currentPage === 'dashboard.html') {
        window.location.href = 'index.html';
    }
    
    // Load appropriate page handler
    loadPageHandler();
});

function loadPageHandler() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
        case '':
            handleLoginPage();
            break;
        case 'forgot-password.html':
            handleForgotPasswordPage();
            break;
        case 'otp.html':
            handleOtpPage();
            break;
        case 'reset-password.html':
            handleResetPasswordPage();
            break;
        case 'update-password.html':
            handleUpdatePasswordPage();
            break;
        case 'dashboard.html':
            handleDashboardPage();
            break;
    }
}

// Register new user function
function registerUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return { success: false, message: 'User already exists with this email' };
    }
    
    // Add new user
    users.push({ email: email, password: password });
    localStorage.setItem('users', JSON.stringify(users));
    
    return { success: true, message: 'User registered successfully' };
}

// Login Page Handler
function handleLoginPage() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;
    
    // Add register functionality
    addRegisterOption();
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('errorMessage');
        
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // If no users exist, show registration option
        if (users.length === 0) {
            showError('No users found. Please register first using the Register button below.', errorDiv);
            return;
        }
        
        // Find user
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Store current user
            localStorage.setItem('currentUser', email);
            
            // Show success and redirect
            showSuccess('Login successful! Redirecting...');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            showError('Invalid email or password', errorDiv);
        }
    });
}

// Add register option to login page
function addRegisterOption() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;
    
    // Check if register button already exists
    if (document.getElementById('registerBtn')) return;
    
    // Create register button
    const registerBtn = document.createElement('button');
    registerBtn.type = 'button';
    registerBtn.id = 'registerBtn';
    registerBtn.className = 'btn-primary';
    registerBtn.style.marginTop = '1rem';
    registerBtn.style.backgroundColor = '#10b981';
    registerBtn.textContent = 'Register New User';
    
    // Add click handler
    registerBtn.addEventListener('click', function() {
        showRegisterModal();
    });
    
    // Insert after login button
    const loginBtn = loginForm.querySelector('button[type="submit"]');
    if (loginBtn) {
        loginBtn.insertAdjacentElement('afterend', registerBtn);
    }
}

// Show register modal
function showRegisterModal() {
    // Create modal HTML
    const modalHTML = `
        <div id="registerModal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        ">
            <div style="
                background: white;
                padding: 2rem;
                border-radius: 12px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                width: 100%;
                max-width: 400px;
                margin: 1rem;
            ">
                <h2 style="margin-bottom: 1rem; color: #1e293b;">Register New User</h2>
                <form id="registerForm">
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #374151;">Email</label>
                        <input type="email" id="regEmail" placeholder="Enter your email" required style="
                            width: 100%;
                            padding: 0.75rem;
                            border: 2px solid #e2e8f0;
                            border-radius: 8px;
                            font-size: 1rem;
                        ">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #374151;">Password</label>
                        <input type="password" id="regPassword" placeholder="Enter your password" required style="
                            width: 100%;
                            padding: 0.75rem;
                            border: 2px solid #e2e8f0;
                            border-radius: 8px;
                            font-size: 1rem;
                        ">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #374151;">Confirm Password</label>
                        <input type="password" id="regConfirmPassword" placeholder="Confirm your password" required style="
                            width: 100%;
                            padding: 0.75rem;
                            border: 2px solid #e2e8f0;
                            border-radius: 8px;
                            font-size: 1rem;
                        ">
                    </div>
                    <div style="display: flex; gap: 1rem;">
                        <button type="submit" style="
                            flex: 1;
                            background-color: #10b981;
                            color: white;
                            padding: 0.875rem;
                            border: none;
                            border-radius: 8px;
                            font-size: 1rem;
                            font-weight: 500;
                            cursor: pointer;
                        ">Register</button>
                        <button type="button" onclick="closeRegisterModal()" style="
                            flex: 1;
                            background-color: #6b7280;
                            color: white;
                            padding: 0.875rem;
                            border: none;
                            border-radius: 8px;
                            font-size: 1rem;
                            font-weight: 500;
                            cursor: pointer;
                        ">Cancel</button>
                    </div>
                    <div id="registerError" style="display: none; margin-top: 1rem; background-color: #fef2f2; color: #dc2626; padding: 0.75rem; border-radius: 6px; border: 1px solid #fecaca;"></div>
                </form>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add form handler
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;
        const errorDiv = document.getElementById('registerError');
        
        // Validate passwords match
        if (password !== confirmPassword) {
            showError('Passwords do not match', errorDiv);
            return;
        }
        
        // Validate password length
        if (password.length < 6) {
            showError('Password must be at least 6 characters long', errorDiv);
            return;
        }
        
        // Register user
        const result = registerUser(email, password);
        
        if (result.success) {
            showSuccess('User registered successfully! You can now login.');
            setTimeout(() => {
                closeRegisterModal();
            }, 1500);
        } else {
            showError(result.message, errorDiv);
        }
    });
}

// Close register modal
function closeRegisterModal() {
    const modal = document.getElementById('registerModal');
    if (modal) {
        modal.remove();
    }
}

// Forgot Password Page Handler
function handleForgotPasswordPage() {
    const forgotForm = document.getElementById('forgotPasswordForm');
    if (!forgotForm) return;
    
    forgotForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const errorDiv = document.getElementById('errorMessage');
        
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if email exists
        const userExists = users.find(u => u.email === email);
        
        if (userExists) {
            // Generate OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            
            // Store OTP and email temporarily
            localStorage.setItem('tempOtp', otp);
            localStorage.setItem('otpEmail', email);
            
            console.log('Generated OTP:', otp); // For demo purposes
            
            showSuccess('OTP sent to your email! Redirecting...');
            setTimeout(() => {
                window.location.href = 'otp.html';
            }, 1500);
        } else {
            showError('Email not found. Please register first.', errorDiv);
        }
    });
}

// OTP Page Handler
function handleOtpPage() {
    const otpForm = document.getElementById('otpForm');
    if (!otpForm) return;
    
    // Show OTP for demo purposes
    const tempOtp = localStorage.getItem('tempOtp');
    if (tempOtp) {
        const otpDisplay = document.getElementById('otpDisplay');
        if (otpDisplay) {
            otpDisplay.innerHTML = `Demo OTP: <strong>${tempOtp}</strong>`;
            otpDisplay.style.display = 'block';
        }
    }
    
    // Handle OTP input navigation
    const otpInputs = document.querySelectorAll('.otp-input');
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', function(e) {
            if (e.target.value.length === 1) {
                if (index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            }
        });
        
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && e.target.value === '') {
                if (index > 0) {
                    otpInputs[index - 1].focus();
                }
            }
        });
    });
    
    otpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get entered OTP
        let enteredOtp = '';
        otpInputs.forEach(input => {
            enteredOtp += input.value;
        });
        
        const storedOtp = localStorage.getItem('tempOtp');
        const errorDiv = document.getElementById('errorMessage');
        
        if (enteredOtp === storedOtp) {
            showSuccess('OTP verified! Redirecting...');
            setTimeout(() => {
                window.location.href = 'reset-password.html';
            }, 1000);
        } else {
            showError('Invalid OTP. Please try again.', errorDiv);
        }
    });
}

// Reset Password Page Handler
function handleResetPasswordPage() {
    const resetForm = document.getElementById('resetPasswordForm');
    if (!resetForm) return;
    
    resetForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const errorDiv = document.getElementById('errorMessage');
        
        if (newPassword !== confirmPassword) {
            showError('Passwords do not match', errorDiv);
            return;
        }
        
        if (newPassword.length < 6) {
            showError('Password must be at least 6 characters long', errorDiv);
            return;
        }
        
        // Get user email and update password
        const email = localStorage.getItem('otpEmail');
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        const userIndex = users.findIndex(u => u.email === email);
        if (userIndex !== -1) {
            users[userIndex].password = newPassword;
            localStorage.setItem('users', JSON.stringify(users));
            
            // Clean up temp data
            localStorage.removeItem('tempOtp');
            localStorage.removeItem('otpEmail');
            
            showSuccess('Password updated successfully! Redirecting to login...');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showError('An error occurred. Please try again.', errorDiv);
        }
    });
}

// Update Password Page Handler
function handleUpdatePasswordPage() {
    const updateForm = document.getElementById('updatePasswordForm');
    if (!updateForm) return;
    
    updateForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const oldPassword = document.getElementById('oldPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const errorDiv = document.getElementById('errorMessage');
        
        if (newPassword !== confirmPassword) {
            showError('New passwords do not match', errorDiv);
            return;
        }
        
        if (newPassword.length < 6) {
            showError('Password must be at least 6 characters long', errorDiv);
            return;
        }
        
        // Get current user and validate old password
        const currentUserEmail = localStorage.getItem('currentUser');
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        const userIndex = users.findIndex(u => u.email === currentUserEmail);
        if (userIndex !== -1) {
            const user = users[userIndex];
            
            if (user.password !== oldPassword) {
                showError('Current password is incorrect', errorDiv);
                return;
            }
            
            // Update password
            users[userIndex].password = newPassword;
            localStorage.setItem('users', JSON.stringify(users));
            
            showSuccess('Password updated successfully! Redirecting to dashboard...');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            showError('User not found. Please login again.', errorDiv);
        }
    });
}

// Dashboard Page Handler
function handleDashboardPage() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const userEmailSpan = document.getElementById('userEmail');
        if (userEmailSpan) {
            userEmailSpan.textContent = currentUser;
        }
    }
}

// Utility Functions
function showError(message, errorDiv) {
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        // Hide error after 5 seconds
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }
}

function showSuccess(message) {
    // Create temporary success message
    const successDiv = document.createElement('div');
    successDiv.className = 'error-message';
    successDiv.style.backgroundColor = '#f0fdf4';
    successDiv.style.color = '#166534';
    successDiv.style.borderColor = '#bbf7d0';
    successDiv.textContent = message;
    
    const form = document.querySelector('form');
    if (form) {
        form.appendChild(successDiv);
        
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 3000);
    }
}

function goBack() {
    window.history.back();
}

function goToDashboard() {
    window.location.href = 'dashboard.html';
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Clear any temp data on page load (except OTP page)
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
if (currentPage !== 'otp.html' && currentPage !== 'reset-password.html') {
    localStorage.removeItem('tempOtp');
    localStorage.removeItem('otpEmail');
}
