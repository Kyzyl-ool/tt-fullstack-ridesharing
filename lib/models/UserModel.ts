import axios from 'axios';

const BACKEND_STAGING_URL = 'http://tt-ridesharing-backend-staging.herokuapp.com';

export default class UserModel {
  static login = async () => {
    // TODO implement real authorization logic when authorization will be ready
    try {
      const res = await axios.post(
        `/api/login`,
        { login: 'user_66@gmail.com', password: '12345' },
        { withCredentials: true }
      );
      return res.data;
    } catch (e) {}
  };

  static getMyself = async () => {
    const res = await axios.get('/api/user');
    return res.data;
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
