# Password Flow UI Kit

A simple, beginner-friendly UI kit for password management flows using only HTML, CSS, and JavaScript. No frameworks or libraries required!

## Features

- User login and registration
- Forgot password flow with OTP verification
- Password reset functionality
- Password strength meter
- Change password functionality
- Toast notifications
- Responsive design
- Local storage for data persistence

## Pages

1. **index.html** - Login and registration page
2. **forgot-password.html** - Request password reset
3. **otp-verification.html** - Verify OTP code
4. **reset-password.html** - Set new password
5. **dashboard.html** - User dashboard after login
6. **change-password.html** - Change password page
7. **success.html** - Success page for various operations

## How to Use

1. Simply open any of the HTML files in a web browser to start using the UI kit.
2. For the complete flow, start with `index.html`.
3. All user data is stored in the browser's localStorage for demonstration purposes.

## Implementation Details

### CSS

The UI kit uses a clean, modern CSS design with:
- CSS variables for easy theming
- Responsive layouts
- Card-based design
- Form styling
- Toast notifications
- Modal dialogs

### JavaScript

The JavaScript functionality includes:
- User authentication
- Form validation
- Password strength checking
- OTP generation and verification
- Toast notification system
- Local storage management

## Demo Flow

1. **Registration**:
   - Click "Register New User" on the login page
   - Fill in your email and password
   - Submit the form

2. **Login**:
   - Enter your registered email and password
   - Click "Sign In"

3. **Forgot Password**:
   - Click "Forgot Password" on the login page
   - Enter your registered email
   - Click "Send OTP"
   - Enter the OTP shown in the demo box
   - Set a new password

4. **Change Password**:
   - After logging in, click "Change Password" on the dashboard
   - Enter your current password and new password
   - Submit the form

## Notes

- This is a frontend-only implementation for demonstration purposes.
- In a real application, you would need to implement proper backend authentication and security measures.
- The OTP is displayed on the screen for demonstration purposes. In a real application, it would be sent via email or SMS.