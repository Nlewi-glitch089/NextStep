document.getElementById('signup-form').addEventListener('submit', function(event) {
    // This line is crucial! It stops the page from reloading.
    event.preventDefault(); 
    
    // Get the values from the form inputs
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Password validation check
    if (password !== confirmPassword) {
        // Display an error message if the passwords don't match
        alert("Passwords do not match!");
        return; 
    }

    // After validation, you would normally send this data to a server
    // For now, let's just log it and redirect the user
    console.log("Full Name:", fullName);
    console.log("Email:", email);
    console.log("Password:", password);

    // ✅ Redirect new users to the skills survey instead of homepage
    window.location.href = 'skills-survey.html'; 
});