/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';
import { ITrip } from '../domain/trip';
import { BACKEND_URL } from '../../config/backend/backend';

export default class TripModel {
  public static createTrip = async ({
    startOrganizationId,
    stopLatitude,
    stopLongitude,
    startTime,
    description
  }: ITrip) => {
    try {
      return await axios.post(
        `${BACKEND_URL}/create_ride`,
        {
          start_organization_id: startOrganizationId,
          stop_latitude: stopLatitude,
          stop_longitude: stopLongitude,
          start_time: startTime,
          description
        },
        { withCredentials: true }
      );
    } catch (e) {
      return null;
    }
  };
  public static joinTrip = async (rideId: number) => {
    try {
      return await axios.post(`${BACKEND_URL}/create_ride`, { ride_id: rideId }, { withCredentials: true });
    } catch (e) {
      return null;
    }
  };
}
