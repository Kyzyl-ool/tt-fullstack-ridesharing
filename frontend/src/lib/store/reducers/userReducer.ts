import * as actions from '../actions/actionTypes';

const initialState = {
  role: '',
  firstname: '',
  lastname: '',
  email: '',
  organizations: []
};

export const userReducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case actions.SET_ROLE:
      return { ...state, role: action.role };
    case actions.SET_USER:
      return state;
    default:
      return state;
  }
};
