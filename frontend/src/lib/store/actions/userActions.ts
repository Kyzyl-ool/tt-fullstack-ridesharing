import * as actions from './actionTypes';

export const setRoleAction = role => {
  return {
    type: actions.SET_ROLE,
    role
  };
};

export const updateAvatarAction = avatar => {
  return {
    type: actions.UPDATE_AVATAR,
    avatar
  };
};

export const logoutSessionAction = () => {
  return {
    type: actions.DEAUTHORIZE
  };
};

export const setUserDataAction = userData => {
  return {
    type: actions.SET_USER,
    userData
  };
};

export const setOrganizationsAction = organizations => {
  return {
    type: actions.SET_ORGANIZATIONS,
    organizations
  };
};

export const setMyOrganizationsAction = myOrgs => {
  return {
    type: actions.SET_MY_ORGANIZATIONS,
    payload: {
      myOrgs
    }
  };
};
