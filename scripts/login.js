// Get form element
const loginForm = document.querySelector('form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Add submit event listener to form
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Basic validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    // Basic email validation
    if (!email.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }

    // Basic password validation
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }

    window.location.href = './index.html';
});
