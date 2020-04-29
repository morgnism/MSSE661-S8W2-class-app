const getFormValues = () => {
  const username = document.getElementById('formInputUsernameReg').value;
  const oldPassword = document.getElementById('formInputCurrentPasswordReg')
    .value;
  const newPassword = document.getElementById('formInputNewPasswordReg').value;
  const email = document.getElementById('formInputEmailReg').value;
  return { username, oldPassword, newPassword, email };
};

const validate = () => {
  const { username, oldPassword, newPassword, email } = getFormValues();

  if (username && !oldPassword) {
    alert('A password required to update username.');
    return;
  } else if (email && !oldPassword) {
    alert('A password required to update email.');
    return;
  } else if (!oldPassword && newPassword) {
    alert('A current password is required.');
    return;
  } else if (!newPassword && oldPassword) {
    alert('A new password is required.');
    return;
  }

  return { username, newPassword, email };
};

const resetFields = () => {
  document.getElementById('formInputUsernameReg').value = '';
  document.getElementById('formInputCurrentPasswordReg').value = '';
  document.getElementById('formInputNewPasswordReg').value = '';
  document.getElementById('formInputEmailReg').value = '';
};

const saveChanges = async (e) => {
  e.preventDefault();

  const { username, email, newPassword: password } = validate();

  try {
    if ((username && password) || (email && password)) {
      const response = await userService.updateMe({
        username,
        email,
        password,
      });
      if (response.msg) {
        alert(response.msg);
        resetFields();
      }
    }
  } catch (err) {
    console.log(err);
    alert('Cannot process your request at this time.');
  }
};
