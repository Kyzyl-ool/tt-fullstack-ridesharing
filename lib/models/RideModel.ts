import axios from 'axios';
import { IRideCreationInfo } from 'domain/ride';

interface IFindRidesRequest {
  organizationId: string;
  latitude: number;
  longitude: number;
}

export interface IGetActiveRidesResponseBodyEntry {
  car: {
    color: string;
    id: number;
    model: string;
    owner: number;
    registryNumber: string;
  };
  declineReason: string;
  freeSeats: number;
  host: {
    firstName: string;
    id: number;
    lastName: string;
    phoneNumber: string;
    photoUrl: string;
    rating: number;
  };
  hostAnswer: 'ACCEPTED' | 'NO_ANSWER' | 'DECLINED';
  id: number;
  price: number;
  stopAddress: string;
  submitDatetime: string;
}

export interface IGetRidesHistoryResponseBodyEntry {
  host: {
    firstName: string;
    id: number;
    lastName: string;
    phoneNumber: string;
    photoUrl: string;
    rating: number;
  };
  id: number;
  price: number;
  startOrganizationName: string;
  stopAddress: string;
  submitDatetime: string;
}

export interface IHostedRideResponseBodyEntry {
  car: {
    color: string;
    id: number;
    model: string;
    owner: number;
    registryNumber: string;
  };
  declineReason: null;
  freeSeats: number;
  host: {
    firstName: string;
    id: number;
    lastName: string;
    phoneNumber: string;
    photoUrl: string;
    rating: number;
  };
  hostAnswer: null;
  id: number;
  price: number;
  stopAddress: string;
  startOrganizationName: string;
  submitDatetime: string;
}

export default class RideModel {
  static joinRide = async (rideId: number) => {
    const res = await axios.post('/api/ride/join', { id: rideId });
    return res.data;
  };

  static createRide = async (rideInfo: IRideCreationInfo) => {
    const res = await axios.put('/api/ride', { ...rideInfo });
    return res.data;
  };

  static findRides = async ({ organizationId, latitude, longitude }: IFindRidesRequest) => {
    const res = await axios.get('/api/ride/match', {
      params: {
        organizationId,
        latitude,
        longitude
      }
    });
    return res.data;
  };

  static activeRides = async (): Promise<IGetActiveRidesResponseBodyEntry[]> => {
    const res = await axios.get('/api/ride/active');
    return res.data;
  };

  static rideHistory = async (): Promise<IGetRidesHistoryResponseBodyEntry[]> => {
    const res = await axios.get('/api/ride/history');
    return res.data;
  };

  static rideHosted = async (): Promise<IHostedRideResponseBodyEntry[]> => {
    const res = await axios.get('/api/ride/hosted');
    return res.data;
  };
}
