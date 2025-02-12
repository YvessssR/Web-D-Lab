function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    field.type = field.type === 'password' ? 'text' : 'password';
}

function registerUser() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const contactNo = document.getElementById('contactNo').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const birthday = document.getElementById('birthday').value;
    
    if (!firstName || !lastName || !email || !contactNo || !username || !password || !birthday) {
        alert('Please fill in all fields.');
        return;
    }
    alert('Registration successful! Redirecting to login page...');
    window.location.href = "login.html"; // Redirect to login page
}

function loginUser() {
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;
    
    if (!loginUsername || !loginPassword) {
        alert('Please enter username/email and password.');
        return;
    }
    alert('Login successful! Redirecting...');
    window.location.href = "index.html"; // palitan mo nalang name ng html into the name ng main page mwehehe - yves
}