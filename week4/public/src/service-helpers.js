function _get(url) {
  return fetch(url, {
    method: 'GET'
  });
}

function _post(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // '{ "username": "admin", "password": "password"}'
  });
}

function _put(url, data) {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}
