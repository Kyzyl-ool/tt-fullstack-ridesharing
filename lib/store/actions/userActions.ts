import { IPassenger } from 'domain/driver';

export const setUserAction = (userInfo: IPassenger) => {
  return {
    type: 'SET_USER',
    userInfo
  };
};
