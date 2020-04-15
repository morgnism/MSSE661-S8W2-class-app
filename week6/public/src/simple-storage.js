const setStorage = (key, data) => {
  const dataAsString = JSON.stringify(data);
  const encodedData = btoa(dataAsString);
  localStorage.setItem(key, encodedData);
};

const getStorage = (key) => {
  const encodedData = localStorage.getItem(key);
  if (!encodedData) {
    return null;
  }
  const decodedData = atob(encodedData);
  return JSON.parse(decodedData);
};

const clearStorage = (key) => {
  localStorage.removeItem(key);
};

const storageHasData = () => localStorage.length > 0;
