import axios from 'axios';

const BACKEND_STAGING_URL = 'http://tt-ridesharing-backend-staging.herokuapp.com';

export default class UserModel {
  static login = async () => {
    // TODO implement real authorization logic when authorization will be ready
    await axios.post(`/api/login`, { login: 'user_23@gmail.com', password: '12345' }, { withCredentials: true });
  };
}
