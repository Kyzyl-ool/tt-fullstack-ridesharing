import axios from 'axios';

const BACKEND_STAGING_URL = 'http://tt-ridesharing-backend-staging.herokuapp.com';

export default class MapModel {
  static getNearestOrganization = async ({ latitude, longitude }) => {
    console.log(document.cookie);
    const res = await axios.get(`/api/nearest_organizations`, {
      params: { latitude, longitude },
      withCredentials: true
    });
    // console.log(res.data);
    return res.data;
  };
}
