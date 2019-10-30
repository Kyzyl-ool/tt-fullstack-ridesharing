import * as actions from './actionTypes';
import { IOrganization } from '../../domain/organization';

export const setStartOrganizationAction = (startOrganization: Omit<IOrganization, 'users'>) => {
  return {
    type: actions.SET_START_ORGANIZATION,
    startOrganization
  };
};

export const setArrivalPointAction = (arrivalPoint: { latitude: number; longitude: number }) => {
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
