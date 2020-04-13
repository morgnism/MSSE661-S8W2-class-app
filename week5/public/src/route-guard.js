(() => {
  if (storageHasData() && !getStorage('isAuth')) {
    logout();
    window.location.href = '/login.html';
  }
})();
