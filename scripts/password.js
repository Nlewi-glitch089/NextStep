/*
    Authentication functionality for NextStep
*/

// Handle sign up form submission
function handleSignUp(event) {
    event.preventDefault();
    try {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        const errorMessage = document.getElementById('confirm-error');

        // Reset error messages
        errorMessage.textContent = '';

        // Validate password format
        if (!validatePassword(password.value)) {
            errorMessage.textContent = 'Password does not meet requirements';
            return false;
        }

        // Check if passwords match
        if (password.value !== confirmPassword.value) {
            errorMessage.textContent = 'Passwords do not match';
            return false;
        }

        // Change this to your actual home page path
        window.location.href = '../index.html';
        return false;
    } catch (error) {
        console.error('Sign up error:', error);
        return false;
    }
}

// Validate password strength
function validatePassword(password) {
    const hasNumber = /\d/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    return password.length >= 8 && hasNumber && hasLower && hasUpper;
}

// Handle sign in form submission
function handleSignIn(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
        window.location.href = '../index.html';
    }
    return false;
}

// Add Get Started button handler
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('.assessment-button');
    if (startButton) {
        startButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'signup.html';
        });
    }
});