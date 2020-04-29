(() => {
  if (
    window.location.pathname !== '/login.html' &&
    (!authService.isAuth() || authService.isTokenExpired())
  ) {
    alert('Sign into the app to proceed.');
    authService.logout('login.html');
  } else if (
    window.location.pathname === '/login.html' &&
    authService.isAuth()
  ) {
    window.location.href = 'todo/todo.html';
  }
})();
