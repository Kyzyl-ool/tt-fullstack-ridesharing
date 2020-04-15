export const setPhoneNumber = (phoneNumber: string) => {
  return {
    type: 'SET_PHONE_NUMBER',
    payload: {
      phoneNumber
    }
  };
};

export const setAuthorized = () => {
  return {
    type: 'SET_AUTHORIZED'
  };
};

export const setUnauthorized = () => {
  return {
    type: 'SET_UNAUTHORIZED'
  };
};
