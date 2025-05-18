const register = (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();

    // Regular Expression 
    lowerCase = /[a-z]/g;
    upperCase = /[A-Z]/g;
    number = /[0-9]/g;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!username || !email || !password || !confirmPassword) {
        alert("Please fill in all fields");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long");
        return;
    }

    if (!lowerCase.test(password) || !upperCase.test(password) || !number.test(password)) {
        alert("Password must contain at least one lowercase letter, one uppercase letter, and one number");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("Invalid email format");
        return;
    }

    let user = {
        username: username,
        email: email,
        password: password,
    };

    try {
        // Get existing users array or create new one
        const usersData = localStorage.getItem("users");
        let users = [];
        
        if (usersData) {
            try {
                users = JSON.parse(usersData);
                if (!Array.isArray(users)) {
                    console.error("Users data is not in the expected format");
                    users = [];
                }
            } catch (error) {
                console.error("Error parsing users data:", error);
                users = [];
            }
        }
        
        // Check if email already exists
        if (users.some(u => u.email === email)) {
            alert("Email already registered");
            return;
        }

        // Add new user to array
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        
        alert("Registration successful");
        window.location.href = "./index.html";
    } catch (error) {
        console.error("Error during registration:", error);
        alert("An error occurred during registration. Please try again.");
    }
};

// Add event listener to form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', register);
    }
});
