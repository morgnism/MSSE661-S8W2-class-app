(() => {
  if (!authService.isAuth() || authService.isTokenExpired()) {
    alert('Log in to view your tasks.');
    authService.logout();
  }
})();
