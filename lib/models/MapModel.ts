import axios from 'axios';

interface ICoordinates {
  latitude: number;
  longitude: number;
}

interface ILocation {
  address: string;
  gps: ICoordinates;
}

type IForwardGeocodingResponse = ILocation[];
type IReverseGeocodingResponse = ILocation;

export default class MapModel {
  static getNearestOrganization = async ({ latitude, longitude }) => {
    const res = await axios.get(`/api/nearest_organizations`, {
      params: { latitude, longitude },
      withCredentials: true
    });
    return res.data;
  };

  static forwardGeocoding = async (address: string) => {
    const res = await axios.post<IForwardGeocodingResponse>('/api/encode_address', { address });
    console.log(res.data);
    return res.data;
  };

  static reverseGeocoding = async ({ latitude, longitude }: ICoordinates) => {
    const res = await axios.post<IReverseGeocodingResponse>('/api/decode_gps', { latitude, longitude });
    return res.data;
  };
}