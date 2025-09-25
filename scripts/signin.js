/*
    SIGN IN FUNCTIONALITY
    Handles user authentication and form validation
    
    FUNCTIONS:
    - handleSignIn: Processes sign-in form submission
    - validateEmail: Checks email format
    - handleErrors: Displays validation errors
*/

// Process sign-in form submission
function handleSignIn(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validate credentials
    if (validateEmail(email) && password.length > 0) {
        window.location.href = '../index.html';
    } else {
        handleErrors();
    }
}

// Validate email format
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Display validation errors
function handleErrors() {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = 'Invalid email or password';
    
    const form = document.getElementById('signin-form');
    form.insertBefore(errorDiv, form.querySelector('button'));
}

document.getElementById('signin-form').addEventListener('submit', handleSignIn);