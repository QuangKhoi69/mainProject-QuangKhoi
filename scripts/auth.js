// Function to check login status and update UI
function updateAuthUI() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const signInBtn = document.querySelector('.btn-signin');
    const signOutBtn = document.querySelector('.btn-signout');
    
    if (currentUser) {
        if (signInBtn) signInBtn.style.display = 'none';
        if (signOutBtn) signOutBtn.style.display = 'block';
    } else {
        if (signInBtn) signInBtn.style.display = 'block';
        if (signOutBtn) signOutBtn.style.display = 'none';
    }
}

// Function to handle sign out
function signOut() {
    localStorage.removeItem('currentUser');
    updateAuthUI();
    window.location.href = "./login.html";
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    
    const signOutBtn = document.querySelector('.btn-signout');
    if (signOutBtn) {
        signOutBtn.addEventListener('click', signOut);
    }
}); 