import axios from 'axios';

const BACKEND_STAGING_URL = 'http://tt-ridesharing-backend-staging.herokuapp.com';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  avatarSrc: string;
  rating: number;
}

export default class UserModel implements User {
  firstName: string;
  lastName: string;
  id: number;
  avatarSrc: string;
  rating: number;

  constructor(data: User) {
    this.id = data.id;
    this.lastName = data.lastName;
    this.firstName = data.firstName;
    this.avatarSrc = data.avatarSrc;
    this.rating = data.rating;
  }

  async initialize() {
    // const response = await axios.get('/user')
  }

  static login = async () => {
    // TODO implement real authorization logic when authorization will be ready
    await axios.post(`/api/login`, { login: 'user_23@gmail.com', password: '12345' }, { withCredentials: true });
  };
}
