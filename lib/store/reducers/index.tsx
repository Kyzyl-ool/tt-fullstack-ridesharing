import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { mapReducer } from './mapReducer';
import { authReducer } from 'store/reducers/authReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  map: mapReducer,
  auth: authReducer
});
