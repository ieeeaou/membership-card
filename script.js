document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
  
    const validUsername = 'ieeeaou';
    const validPassword = 'ieeeaou';
  
    if (username === validUsername && password === validPassword) {
        // Set session flag to indicate successful login
        sessionStorage.setItem('loggedIn', 'true');
        window.location.href = 'system.html';
    } else {
        document.getElementById('error-message').textContent = 'Invalid username or password.';
    }
});
