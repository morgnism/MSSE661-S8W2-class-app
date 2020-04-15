const doLogin = async (e) => {
  e.preventDefault();
  const username = document.getElementById('formInputUsername').value;
  const password = document.getElementById('formInputPassword').value;

  const res = await login({ username, password }).catch((err) => {
    alert('Failed to login. Please try again later.');
  });

  const { auth, access_token, refresh_token } = res;

  setStorage('isAuth', auth);
  setStorage('access_token', access_token);
  setStorage('refresh_token', refresh_token);

  window.location.href = 'home.html';
};

const doRegister = async (e) => {
  e.preventDefault();
  const username = document.getElementById('formInputUsernameReg').value;
  const email = document.getElementById('formInputEmailReg').value;
  const password = document.getElementById('formInputPasswordReg').value;

  const res = await register({
    username,
    email,
    password,
  });

  if (res) {
    window.location.href = '/';
  }
};

const doLogout = (e) => {
  e.preventDefault();
  logout();
  window.location.href = '/';
};

(() => {
  if (storageHasData()) {
    const isAuth = getStorage('isAuth');
    if (!isAuth) {
      document.getElementById('logout').style.display = 'none';
    } else {
      document.getElementById('logout').style.display = 'block';
    }
  }
})();
