const wrapper = document.querySelector('.wrapper');
const loginlink = document.querySelector('.login-link');
const registerlink = document.querySelector('.register-link');
const loginpopup = document.querySelector('.Login_Popup');
const closeicon = document.querySelector('.close_icon');
const passwordInput = document.getElementById('password'); 
const password = passwordInput.value;
const registerForm = document.querySelector('.regbox');


registerlink.addEventListener('click',()=> {
    wrapper.classList.add('active');
});

loginlink.addEventListener('click',()=> {
    wrapper.classList.remove('active');
});

loginpopup.addEventListener('click',()=>{
    wrapper.classList.add('active-popup')
});

closeicon.addEventListener('click',()=>{
    wrapper.classList.remove('active-popup')
});

function validatePassword(password) {
    if (password.length < 8) {
        return 'Password must be at least 8 characters long.';
    }

    if (!/[a-z]/.test(password)) {
        return 'Password must contain at least one lowercase letter.';
    }

    if (!/[A-Z]/.test(password)) {
        return 'Password must contain at least one uppercase letter.';
    }

    if (!/[0-9]/.test(password)) {
        return 'Password must contain at least one number.';
    }

    if (!/[!@#$%^&*]/.test(password)) {
        return 'Password must contain at least one special character (!@#$%^&*).';
    }

    return 'Success!';
}

registerForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get input values
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const agreeCheckbox = document.getElementById('agree');

    // Validation
    if (!validateUsername(usernameInput.value)) {
        alert('Username is not valid. It should be at least 4 characters long.');
        return;
    }

    if (!validateEmail(emailInput.value)) {
        alert('Email is not valid.');
        return;
    }

    const passwordValidationResult = validatePassword(passwordInput.value);
    if (passwordValidationResult !== 'Success!') {
        alert('Password is not valid. ' + passwordValidationResult);
        return;
    }

    if (!agreeCheckbox.checked) {
        alert('Please agree to the terms and conditions.');
        return;
    }

    // If all validations pass, you can proceed with registration here

    // For example, you can send the registration data to a server or display a success message

    alert('Registration successful!');
    registerForm.reset(); // Clear the form

    window.location.replace("/logged.html");
    
    
});

function validateUsername(username) {
    return username.length >= 4;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

let isLoggedIn = false;
let username = ''; // Initialize with the user's name if logged in

function updateUI() {
    if (isLoggedIn) {
      // User is logged in
      loginpopup.style.display = 'none'; // Hide the login button
      login.style.display = 'none'; // Hide the login form
      regForm.style.display = 'none'; // Hide the registration form
      const userButton = document.createElement('button');
      userButton.className = 'Login_Popup';
      userButton.innerText = username;
      userButton.addEventListener('click', () => {
        // Handle the logout logic here
        isLoggedIn = false;
        username = '';
        updateUI(); // Update the UI again to show the login button
        window.location.replace("/logged.html");
      });
      document.querySelector('header .login').appendChild(userButton); // Add the user button
    } else {
      // User is not logged in, show the login button
      loginButton.style.display = 'block'; // Show the login button
      loginForm.style.display = 'block'; // Show the login form
      regForm.style.display = 'none'; // Hide the registration form
    }
  }
  
  // Example usage of updating the UI when the user logs in
  // You can modify this code based on your actual login mechanism
  function loginUser(name) {
    isLoggedIn = true;
    username = name;
    updateUI();
    window.location.replace("/logged.html");
  }
  
  // Call the initial updateUI to set the correct state on page load
  updateUI();