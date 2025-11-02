document.addEventListener('DOMContentLoaded', function() {

    const validUser1 = 'admin@gmail.com';
    const validUser2 = 'admin1';
    const validPass = 'admin123';
    const loginView = document.getElementById('login-view');
    const dashboardView = document.getElementById('dashboard-view');
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    const logoutButton = document.getElementById('logout-link');
    const navLinks = document.querySelectorAll('.main-nav a');

    function checkLoginState() {
        if (sessionStorage.getItem('isAdminLoggedIn') === 'true') {
            loginView.classList.add('hidden');
            dashboardView.classList.remove('hidden');
        } else {
            loginView.classList.remove('hidden');
            dashboardView.classList.add('hidden');
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = usernameInput.value;
            const password = passwordInput.value;

            if ((username === validUser1 || username === validUser2) && password === validPass) {
                errorMessage.textContent = '';
                sessionStorage.setItem('isAdminLoggedIn', 'true');
                loginForm.reset(); 
                checkLoginState();
            } else {
                errorMessage.textContent = 'Username atau password salah.';
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            sessionStorage.removeItem('isAdminLoggedIn');
            checkLoginState();
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    checkLoginState();

});