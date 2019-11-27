/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';
import { ITrip, IFindRidesRequest } from '../domain/trip';
import { BACKEND_URL } from '../../config/backend/backend';

export default class TripModel {
  public static createTrip = async ({
    startOrganizationId,
    stopLatitude,
    stopLongitude,
    stopAddress,
    startTime,
    cost,
    carId,
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
          car_id: carId,
          cost,
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

  public static leaveTrip = async (rideId: number) => {
    try {
      return await axios.post(`${BACKEND_URL}/leave_ride`, { ride_id: rideId }, { withCredentials: true });
    } catch (e) {
      return null;
    }
  };

  public static finishTrip = async (rideId: number) => {
    try {
      return await axios.post(`${BACKEND_URL}/finish_ride`, { ride_id: rideId }, { withCredentials: true });
    } catch (e) {
      return null;
    }
  };

  public static getPassengersInfo = async (passengerIds: number[]) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/get_multiple_users_info`,
        { ids: passengerIds },
        { withCredentials: true }
      );
      return res.data;
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
      const res = await axios.get(`${BACKEND_URL}/get_all_rides`, { withCredentials: true });
      return res.data;
    } catch (e) {
      return null;
    }
  };

  public static findBestTrips = async (data: IFindRidesRequest) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/find_best_rides`,
        {
          start_date: data.startTime,
          start_organization_id: data.startOrganizationId,
          destination_latitude: data.destinationLatitude,
          destination_longitude: data.destinationLongitude
        },
        { withCredentials: true }
      );
      return res.data;
    } catch (e) {
      return null;
    }
  };

  public static getMyTrips = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/get_my_rides`, { withCredentials: true });
      return res.data;
    } catch (e) {
      return null;
    }
  };
}
