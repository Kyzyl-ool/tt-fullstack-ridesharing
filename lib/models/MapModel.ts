import axios from 'axios';

export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export interface ILocation {
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
    return res.data;
  };

  static reverseGeocoding = async ({ latitude, longitude }: ICoordinates) => {
    const res = await axios.post<IReverseGeocodingResponse>('/api/decode_gps', { latitude, longitude });
    return res.data;
  };

  static getDirection = async (start: ICoordinates, finish: ICoordinates) => {
    const res = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start.longitude},${start.latitude};${finish.longitude},${finish.latitude}?geometries=geojson&access_token=${process.env.MAPBOX_TOKEN}`
    );
    return res.data.routes[0].geometry;
  };
}
