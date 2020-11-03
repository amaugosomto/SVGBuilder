const required = (id = '') => {
  if (id === '') return false;

  let element = document.getElementById(id);
  if (element === null) return false;

  let value = element.value;

  if (value === 'select' || value === '' || !value) return false;
  
  return true;
}

export {
  required
}