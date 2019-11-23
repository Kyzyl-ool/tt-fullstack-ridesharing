import * as actions from '../actions/actionTypes';
import { IUser } from '../../domain/user';

/*
 "cost": null,
    "description": "",
    "estimated_time": null,
    "host_driver_id": 1,
    "id": 10,
    "is_available": true,
    "is_finished": false,
    "passengers": [
      1
    ],
    "start_organization": 1,
    "start_organization_id": 1,
    "start_time": "2019-10-31T16:56:00.001000",
    "stop_address": "\u0443\u043b\u0438\u0446\u0430 \u041a\u043e\u0440\u043e\u0432\u0438\u0439 \u0412\u0430\u043b, 9\u04412",
    "stop_latitude": 55.72893,
    "stop_longitude": 37.618255,
    "total_seats": 3
 */
export interface IResponseTrip {
  cost: number;
  description: string;
  hostDriverId: number;
  hostDriverInfo: IUser;
  id: number;
  isAvalivable: boolean;
  isFinished: boolean;
  passengers: IUser[];
  startOrganization: number;
  startOrganizationId: number;
  startTime: string;
  stopAddress: string;
  stopLatitude: number;
  stopLongitude: number;
  totalSeats: number;
}

const initialState: {
  trips: IResponseTrip[];
} = {
  trips: []
};

export const allTripsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_ALL_TRIPS: {
      return {
        ...state,
        trips: {
          ...action.payload.trips
        }
      };
    }
    default:
      return state;
  }
};
