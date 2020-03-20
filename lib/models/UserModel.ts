import axios from 'axios';

const BACKEND_STAGING_URL = 'http://tt-ridesharing-backend-staging.herokuapp.com';

export default class UserModel {
  static login = async () => {
    // TODO implement real authorization logic when authorization will be ready
    await axios.post(`${BACKEND_STAGING_URL}/login`, { login: 'admin@gmail.com', password: '12345' });
  };
}
