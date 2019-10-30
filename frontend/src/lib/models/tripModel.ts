/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';
import { ITrip } from '../domain/trip';
import { BACKEND_URL } from '../../config/backend/backend';

export default class TripModel {
  public static createTrip = async ({
    startOrganizationId,
    stopLatitude,
    stopLongitude,
    stopAddress,
    startTime,
    totalSeats,
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
          total_seats: totalSeats,
          stop_address: stopAddress,
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
      return await axios.post(`${BACKEND_URL}/join_ride`, { ride_id: rideId }, { withCredentials: true });
    } catch (e) {
      return null;
    }
  };

  public static getTripInfo = async (rideId: number) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/get_ride_info?ride_id=${rideId}`, { withCredentials: true });
      return res.data;
    } catch (e) {
      return null;
    }
  };
  public static getAllTrips = async () => {
    try {
      const res = await axios.get('http://localhost:5000/get_all_rides', { withCredentials: true });
      return res.data;
    } catch (e) {
      return null;
    }
  };
}
