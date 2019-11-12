import * as actions from '../actions/actionTypes';
import { IUser } from '../../domain/user';
import { snakeObjectToCamel } from '../../helpers/snakeToCamelCase';

type State = IUser & { role: string };

const initialState = {
  role: '',
  firstName: '',
  lastName: '',
  email: '',
  userId: 0,
  isDriver: false
};

export const userReducer = (state: State = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case actions.SET_ROLE:
      return { ...state, role: action.role };
    case actions.SET_USER:
      return { ...state, ...snakeObjectToCamel(action.userData) };
    case actions.CAN_BE_DRIVER:
      return { ...state, isDriver: action.canBe };
    default:
      return state;
  }
};
