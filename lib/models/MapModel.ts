import axios from 'axios';

const BACKEND_STAGING_URL = 'http://tt-ridesharing-backend-staging.herokuapp.com';

interface ICoordinates {
  latitude: number;
  longitude: number;
}

interface IGeocodingResponse {
  address: string;
  gps: ICoordinates;
}

export default class MapModel {
  static getNearestOrganization = async ({ latitude, longitude }) => {
    const res = await axios.get(`/api/nearest_organizations`, {
      params: { latitude, longitude },
      withCredentials: true
    });
    // console.log(res.data);
    return res.data;
  };

  static forwardGeocoding = async (address: string) => {
    const res = await axios.post<IGeocodingResponse>('/api/encode_address', {
      params: { address }
    });
    return res.data;
  };

  static reverseGeocoding = async ({ latitude, longitude }: ICoordinates) => {
    const res = await axios.post<IGeocodingResponse>('/api/encode_address', {
      params: { latitude, longitude }
    });
    return res.data;
  };
}
