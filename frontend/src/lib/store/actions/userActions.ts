import * as actions from './actionTypes';

export const setRoleAction = role => {
  return {
    type: actions.SET_ROLE,
    role
  };
};
