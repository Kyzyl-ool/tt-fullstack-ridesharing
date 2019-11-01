import * as actions from './actionTypes';

export const setAllTrips = trips => {
  return {
    type: actions.SET_ALL_TRIPS,
    payload: {
      trips
    }
  };
};
