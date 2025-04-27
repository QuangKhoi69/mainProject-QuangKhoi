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

    let users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : {};

    if (users[username] ) {
        alert("Username already exists");
        return;
    } else {
        users[username] = user;
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration successful");
        window.location.href = "./index.html";
    }
    }

document.querySelector(".btn-signup").addEventListener('click', event => {
    register(event);
});
