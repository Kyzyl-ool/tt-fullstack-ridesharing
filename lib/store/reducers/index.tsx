import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { mapReducer } from './mapReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  map: mapReducer
});
