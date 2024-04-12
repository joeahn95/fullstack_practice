document.addEventListener('DOMContentLoaded', () => {

    // HELPER FUNCTIONS
    const login = () => {
       if (username.value === 'codesmith' && password.value === 'ilovetesting') {
         document.cookie = 'token = admin';
         window.location.href = '/secret';
       } else alert('incorrect login!');
    }

    // grab body element for appending
    const body = document.querySelector('body');

    // create login elements
    const username = document.createElement('input');
    username.setAttribute('type', 'text');
    const password = document.createElement('input');
    password.setAttribute('type', 'text');
    const loginBtn = document.createElement('button');
    loginBtn.innerText = 'login';
    loginBtn.addEventListener('click', login);

    // append login elements
    body.appendChild(username);
    body.appendChild(password);
    body.appendChild(loginBtn);

})