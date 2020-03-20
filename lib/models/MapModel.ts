import axios from 'axios';

const BACKEND_STAGING_URL = 'http://tt-ridesharing-backend-staging.herokuapp.com';

export default class MapModel {
  static getNearestOrganization = async ({ latitude, longitude }) => {
    const res = await axios.get(`${BACKEND_STAGING_URL}/nearest_organizations`, { params: { latitude, longitude } });
    // console.log(res.data);
    return res.data;
  };
}
