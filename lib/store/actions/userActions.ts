import { IPassenger } from 'domain/driver';
import { IOrganization } from 'domain/organization';

export const setUserAction = (userInfo: IPassenger) => {
  return {
    type: 'SET_USER',
    userInfo
  };
};

export const resetUserAction = () => {
  return {
    type: 'RESET_USER'
  };
};

export const setOrganizationsAction = (organizations: IOrganization) => {
  return {
    type: 'SET_ORGANIZATIONS',
    organizations
  };
};
