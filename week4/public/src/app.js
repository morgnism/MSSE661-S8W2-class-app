const doLogin = function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  login({
    username: username,
    password: password
  }).then(function(res) {
    window.location.href = 'home.html';
  });
};

const doRegister = function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  register({
    username: username,
    email: email,
    password: password
  }).then(function(res) {
    window.location.href = 'home.html';
  });
};

const doLogout = function(e) {
  e.preventDefault();
};
