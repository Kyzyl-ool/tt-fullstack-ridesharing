import axios from 'axios';
import { IRideCreationInfo } from 'domain/ride';

export default class RideModel {
  static joinRide = async (rideId: string) => {
    const res = await axios.post('/api/ride/join', { id: rideId });
    return res.data;
  };

  //{ carId, organizationId, latitude, longitude, amountOfSeats, cost, paymentMethod }
  static createRide = async (rideInfo: IRideCreationInfo) => {
    const res = await axios.put('/api/ride', { ...rideInfo });
    return res.data;
  };
}
