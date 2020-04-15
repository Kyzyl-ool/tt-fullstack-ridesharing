const defaultState = {
  phoneNumber: null,
  authorized: false
};

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_PHONE_NUMBER': {
      return { ...state, phoneNumber: action.payload.phoneNumber };
    }
    case 'SET_AUTHORIZED': {
      return { ...state, authorized: true };
    }
    case 'SET_UNAUTHORIZED': {
      return { ...state, authorized: false };
    }
    default:
      return state;
  }
};
