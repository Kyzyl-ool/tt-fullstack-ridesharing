import axios from 'axios';
import { IRideCreationInfo } from 'domain/ride';

interface IFindRidesRequest {
  organizationId: string;
  latitude: number;
  longitude: number;
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
    console.log(latitude, longitude);
    const res = await axios.get('/api/ride/match', {
      params: {
        organizationId,
        latitude,
        longitude
      }
    });
    return res.data;
  };
}
