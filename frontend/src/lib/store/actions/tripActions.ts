import * as actions from './actionTypes';
import { IOrganization } from '../../domain/organization';
import { snakeObjectToCamel } from '../../helpers/snakeToCamelCase';

export const setStartOrganizationAction = (startOrganization: Omit<IOrganization, 'users'>) => {
  return {
    type: actions.SET_START_ORGANIZATION,
    startOrganization
  };
};

export const setArrivalPointAction = (arrivalPoint: { name: string; latitude: number; longitude: number }) => {
  return {
    type: actions.SET_ARRIVAL_POINT,
    arrivalPoint
  };
};

export const setRideTimeAction = (rideTime: string) => {
  return {
    type: actions.SET_RIDE_TIME,
    rideTime
  };
};

export const setTotalSeatsAction = (totalSeats: number) => {
  return {
    type: actions.SET_TOTAL_SEATS,
    totalSeats
  };
};

export const setCostAction = (cost: number) => {
  return {
    type: actions.SET_COST,
    cost
  };
};

export const cleanCreateFormAction = () => {
  return {
    type: actions.CLEAN_CREATE_FORM,
    payload: {}
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
