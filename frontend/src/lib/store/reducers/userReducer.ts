import * as actions from '../actions/actionTypes';
import { IUser } from '../../domain/user';
import { snakeObjectToCamel } from '../../helpers/snakeToCamelCase';

type State = IUser & { role: string; isSessionAuthorized: boolean };

const initialState = {
  isSessionAuthorized: false,
  id: -1,
  organizations: [],
  role: '',
  firstName: '',
  lastName: '',
  email: '',
  userId: 0,
  photo: '',
  phoneNumber: '',
  photoUrl: '',
  isDriver: false
};

export const userReducer = (state: State = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case actions.SET_ROLE:
      return { ...state, role: action.role };
    case actions.SET_USER:
      return { ...state, ...snakeObjectToCamel(action.userData), isSessionAuthorized: true };
    case actions.UPDATE_AVATAR:
      return { ...state, photoUrl: action.avatar };
    case actions.UPDATE_PHONE_NUMBER:
      return { ...state, phoneNumber: action.phoneNumber };
    case actions.UPDATE_EMAIL:
      return { ...state, email: action.email };
    case actions.DEAUTHORIZE:
      return initialState;
    default:
      return state;
  }
};
