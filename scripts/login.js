// Check if user is already logged in
function checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        window.location.href = './index.html';
    }
}

// Handle login form submission
const login = (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validate input
    if (!email || !password) {
        alert("Please fill in all fields");
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
    }

    // Get users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Find user by email
    const user = users.find(u => u.email === email);

    if (user && user.password === password) {
        // Store current user info
        localStorage.setItem('currentUser', JSON.stringify({
            email: user.email,
            name: user.name || user.email.split('@')[0] // Use part before @ as name if no name provided
        }));

        // Update UI elements
        const signInBtn = document.querySelector('.btn-signin');
        const signOutBtn = document.querySelector('.btn-signout');
        if (signInBtn) signInBtn.style.display = 'none';
        if (signOutBtn) signOutBtn.style.display = 'block';

        alert("Login successful");
        window.location.href = "./index.html";
    } else {
        alert("Invalid email or password");
    }
};

// Handle sign out
const signOut = () => {
    localStorage.removeItem('currentUser');
    const signInBtn = document.querySelector('.btn-signin');
    const signOutBtn = document.querySelector('.btn-signout');
    if (signInBtn) signInBtn.style.display = 'block';
    if (signOutBtn) signOutBtn.style.display = 'none';
    window.location.href = "./login.html";
};

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
    
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', login);
    }

    const signOutBtn = document.querySelector('.btn-signout');
    if (signOutBtn) {
        signOutBtn.addEventListener('click', signOut);
    }
});