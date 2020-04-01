import axios from 'axios';

const BACKEND_STAGING_URL = 'http://tt-ridesharing-backend-staging.herokuapp.com';

export default class UserModel {
  static login = async () => {
    // TODO implement real authorization logic when authorization will be ready
    try {
      await axios.post(`/api/login`, { login: 'user_23@gmail.com', password: '12345' }, { withCredentials: true });
    } catch (e) {}
  };

  static getOrganizations = async () => {
    const res = await axios.get('/api/user/organizations');
    return res.data;
  };

  static getCars = async () => {
    const res = await axios.get('/api/car');
    return res.data;
  };
}
