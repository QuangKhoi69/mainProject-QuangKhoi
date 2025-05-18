document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = './login.html';
        return;
    }

    // Initialize user information
    initializeUserInfo();
    
    // Setup navigation
    setupNavigation();
    
    // Setup form handlers
    setupFormHandlers();
    
    // Setup theme switcher
    setupThemeSwitcher();
});

function initializeUserInfo() {
    const userName = document.getElementById('user-name');
    const userEmail = document.getElementById('user-email');
    const displayName = document.getElementById('display-name');
    const email = document.getElementById('email');
    const bio = document.getElementById('bio');
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
        userName.textContent = currentUser.name || 'User';
        userEmail.textContent = currentUser.email;
        displayName.value = currentUser.name || '';
        email.value = currentUser.email;
        bio.value = currentUser.bio || '';
    }
}

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.settings-section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));

            // Add active class to clicked item
            item.classList.add('active');
            
            // Show corresponding section
            const sectionId = item.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });
}

function setupFormHandlers() {
    // Profile form handler
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            // Update user information
            currentUser.name = document.getElementById('display-name').value;
            currentUser.bio = document.getElementById('bio').value;
            
            // Save updated user information
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Update displayed information
            document.getElementById('user-name').textContent = currentUser.name;
            
            alert('Profile updated successfully!');
        });
    }

    // Password form handler
    const passwordForm = document.getElementById('password-form');
    if (passwordForm) {
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Validate passwords
            if (newPassword !== confirmPassword) {
                alert('New passwords do not match!');
                return;
            }

            // Here you would typically make an API call to update the password
            // For now, we'll just show a success message
            alert('Password updated successfully!');
            passwordForm.reset();
        });
    }

    // Profile picture upload handler
    const profilePictureUpload = document.getElementById('profile-picture-upload');
    if (profilePictureUpload) {
        profilePictureUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    document.getElementById('profile-picture').src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

function setupThemeSwitcher() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.getAttribute('data-theme');
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            
            // Update active state of theme buttons
            themeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.querySelector(`[data-theme="${savedTheme}"]`)?.classList.add('active');
}

// Handle 2FA setup
document.getElementById('enable-2fa')?.addEventListener('click', () => {
    // Here you would typically show a modal or redirect to 2FA setup
    alert('2FA setup functionality would be implemented here');
});

// Handle privacy settings
document.getElementById('profile-visibility')?.addEventListener('change', (e) => {
    const visibility = e.target.value;
    localStorage.setItem('profileVisibility', visibility);
});

document.getElementById('activity-status')?.addEventListener('change', (e) => {
    const status = e.target.checked;
    localStorage.setItem('activityStatus', status);
});

document.getElementById('data-collection')?.addEventListener('change', (e) => {
    const collection = e.target.checked;
    localStorage.setItem('dataCollection', collection);
});

// Handle language selection
document.getElementById('language-select')?.addEventListener('change', (e) => {
    const language = e.target.value;
    localStorage.setItem('language', language);
    // Here you would typically reload the page with the new language
    alert('Language changed to ' + language);
});

// Handle notification settings
document.getElementById('email-notifications')?.addEventListener('change', (e) => {
    const enabled = e.target.checked;
    localStorage.setItem('emailNotifications', enabled);
});

document.getElementById('push-notifications')?.addEventListener('change', (e) => {
    const enabled = e.target.checked;
    localStorage.setItem('pushNotifications', enabled);
}); 