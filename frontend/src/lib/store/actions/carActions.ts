import * as actions from './actionTypes';

export const setCarsAction = cars => {
  return {
    type: actions.SET_CARS,
    cars
  };
};
