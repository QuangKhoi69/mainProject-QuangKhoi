const login = (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    if (!username || !email || !password) {
        alert("Please fill in all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};
    let storedUser = users[username];

    if (storedUser && storedUser.password === password) {
        alert("Login successful");
        window.location.href = "./index.html";
    } else {
        alert("Invalid username or password");
    }
};

document.querySelector(".btn-signin").addEventListener('click', event => {
    login(event);
});