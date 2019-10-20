import * as actions from '../actions/actionTypes';

const initialState = {
  role: ''
};

export const userReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actions.SET_ROLE:
      return { ...state, role: action.role };
    default:
      return state;
  }
};
