/*
    AUTHENTICATION FUNCTIONALITY
    Handles user sign-in and sign-up validation
*/

// Redirects to the home page on successful sign-in
function handleSignIn(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
        // Update path to ensure proper navigation
        window.location.href = '../../index.html';
    }
    return false;
}

// Redirects to the home page on successful sign-up
function handleSignUp(event) {
    event.preventDefault();
    try {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        const errorMessage = document.getElementById('confirm-error');

        errorMessage.textContent = '';

        if (!validatePassword(password.value)) {
            errorMessage.textContent = 'Password does not meet requirements';
            return false;
        }

        if (password.value !== confirmPassword.value) {
            errorMessage.textContent = 'Passwords do not match';
            return false;
        }

        // Update path to ensure proper navigation
        window.location.href = '../../index.html';
        return false;
    } catch (error) {
        console.error('Sign up error:', error);
        return false;
    }
}

/*
    AUTHENTICATION SCRIPTS
    Handles all form validation and user authentication
    
    FUNCTIONS:
    - validateForm: Handles sign-in validation
    - validateSignUpForm: Handles sign-up validation
    - handlePasswordRequirements: Checks password criteria
*/

// Validate sign-in form submission
function validateForm(event) {
    event.preventDefault();
    const password = document.querySelector('input[type="password"]');
    const errorMessage = document.querySelector('.error-message');
    
    // Check password requirements
    if (!password.value.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Password does not meet requirements';
        return false;
    }
    
    // Redirect to home page on success
    window.location.href = '../index.html';
    return false;
}

// Validate sign-up form submission
function validateSignUpForm(event) {
    event.preventDefault();
    const password = document.getElementById('signup-password');
    const confirmPassword = document.getElementById('confirm-password');
    const errorMessages = document.querySelectorAll('.error-message');
    
    // Clear previous error messages
    errorMessages.forEach(msg => msg.textContent = '');
    
    // Validate password format
    if (!password.value.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
        password.nextElementSibling.textContent = 'Password does not meet requirements';
        return false;
    }
    
    // Validate password match
    if (password.value !== confirmPassword.value) {
        confirmPassword.nextElementSibling.textContent = 'Passwords do not match';
        return false;
    }
    
    // Redirect on successful validation
    window.location.href = '../index.html';
    return false;
}

// Check password requirements
function handlePasswordRequirements(password) {
    return password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/);
}