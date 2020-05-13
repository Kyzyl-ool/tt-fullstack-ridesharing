export const validEmail = value => {
  if (!value.match(/\S+@\S+\.\S+/i)) {
    return 'Некорректный адрес почты';
  }
};
