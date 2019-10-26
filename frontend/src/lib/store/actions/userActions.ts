import * as actions from './actionTypes';

export const setRoleAction = role => {
  return {
    type: actions.SET_ROLE,
    role
  };
};

export const setUserDataAction = userData => {
  return {
    type: actions.SET_USER,
    payload: userData
  };
};

export const setOrganizationsAction = organizations => {
  return {
    type: actions.SET_ORGANIZATIONS,
    organizations
  };
};
