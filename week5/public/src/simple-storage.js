const setStorage = (key, data) => {
  const dataAsString = JSON.stringify(data); // data = new Object()
  const encodedData = btoa(dataAsString); // {}
  localStorage.setItem(key, encodedData);
};

const getStorage = (key) => {
  const encodedData = localStorage.getItem(key);
  const decodedData = atob(encodedData);
  return JSON.parse(decodedData); // {}
};

const clearStorage = (key) => {
  localStorage.removeItem(key);
};

const storageHasData = () => localStorage.length > 0;
