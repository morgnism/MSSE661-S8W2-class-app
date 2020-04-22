const doLogin = async (e) => {
  e.preventDefault();

  const username = document.getElementById('formInputUsername').value;
  const password = document.getElementById('formInputPassword').value;

  try {
    const res = await authService.login({ username, password });
    const { auth, expires_in, access_token, refresh_token } = res;
    const expiryDate = authService.setExpiration(expires_in);

    setStorage('isAuth', auth);
    setStorage('expires_in', expiryDate);
    setStorage('access_token', access_token);
    setStorage('refresh_token', refresh_token);

    if (res) {
      window.location.href = 'todo/todo.html';
    }
  } catch (err) {
    alert('Failed to login. Please try again later.');
  }
};

const doRegister = async (e) => {
  e.preventDefault();

  const username = document.getElementById('formInputUsernameReg').value;
  const email = document.getElementById('formInputEmailReg').value;
  const password = document.getElementById('formInputPasswordReg').value;

  try {
    const res = await authService.register({
      username,
      email,
      password,
    });

    if (res) {
      window.location.href = '/';
    }
  } catch (err) {
    alert('Failed to register. Please try again later.');
  }
};

const doLogout = (e) => {
  e.preventDefault();
  authService.logout();
};

(() => {
  const login = document.getElementById('login');
  const logout = document.getElementById('logout');
  if (!authService.isAuth()) {
    if (login) {
      login.style.display = 'block';
    } else {
      logout.style.display = 'none';
    }
  } else {
    if (login) {
      login.style.display = 'none';
    } else {
      logout.style.display = 'block';
    }
  }
})();
