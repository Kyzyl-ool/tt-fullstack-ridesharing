import * as actions from './actionTypes';
import { IOrganization } from '../../domain/organization';
import { snakeObjectToCamel } from '../../helpers/snakeToCamelCase';

type actionFlag = 'create' | 'search';

export const setStartOrganizationAction = (startOrganization: Omit<IOrganization, 'users'>, flag: actionFlag) => {
  return {
    type: actions.SET_START_ORGANIZATION,
    payload: { startOrganization, flag }
  };
};

export const setArrivalPointAction = (
  arrivalPoint: { name: string; latitude: number; longitude: number },
  flag: actionFlag
) => {
  return {
    type: actions.SET_ARRIVAL_POINT,
    payload: { arrivalPoint, flag }
  };
};

export const setRideTimeAction = (rideTime: string, flag: actionFlag) => {
  return {
    type: actions.SET_RIDE_TIME,
    payload: { rideTime, flag }
  };
};

export const setTotalSeatsAction = (totalSeats: number, flag: actionFlag) => {
  return {
    type: actions.SET_TOTAL_SEATS,
    payload: { totalSeats, flag }
  };
};

export const setCostAction = (cost: number, flag: actionFlag) => {
  return {
    type: actions.SET_COST,
    payload: { cost, flag }
  };
};

export const cleanCreateFormAction = () => {
  return {
    type: actions.CLEAN_CREATE_FORM
  };
};

export const setMyTripsAction = trips => {
  return {
    type: actions.SET_ALL_TRIPS,
    payload: {
      trips: trips.map(value => snakeObjectToCamel(value))
    }
  };
};
