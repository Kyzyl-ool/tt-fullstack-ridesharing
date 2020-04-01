import axios from 'axios';

const BACKEND_STAGING_URL = 'http://tt-ridesharing-backend-staging.herokuapp.com';

export interface IUserData {
  firstName: string;
  id: number;
  lastName: string;
  photoUrl: string;
  rating: number;
}

interface IPutCarRequestBody {
  model: string;
  color: string;
  registryNumber: string;
}

interface IPutCarResponseBody {
  id: number;
}

interface IDeleteCarRequestBody {
  id: number;
}
interface IPostCarRequestBody {
  id: number;
  model: string;
  registryNumber: string;
  color: string;
}

interface IPostCarResponseBody {
  id: number;
}

export default class UserModel {
  static login = async () => {
    // TODO implement real authorization logic when authorization will be ready
    try {
      await axios.post(`/api/login`, { login: 'user_23@gmail.com', password: '12345' }, { withCredentials: true });
    } catch (e) {
      console.log(e);
    }
  };

  static getOrganizations = async () => {
    const res = await axios.get('/api/user/organizations');
    return res.data;
  };

  static getCars = async () => {
    const res = await axios.get('/api/car');
    return res.data;
  };

  static getMyProfileInfo = async (): Promise<IUserData> => {
    const res = await axios.get('/api/user');
    return res.data;
  };

  static putCar = async (requestBody: IPutCarRequestBody): Promise<IPutCarResponseBody> => {
    const res = await axios.put('/api/car', requestBody);
    return res.data;
  };

  static deleteCar = async (requestBody: IDeleteCarRequestBody) => {
    const res = await axios.delete('/api/car', {
      data: requestBody
    });
    return res.data;
  };

  static postCar = async (requestBody: IPostCarRequestBody): Promise<IPostCarResponseBody> => {
    const res = await axios.post('/api/car', requestBody);
    return res.data;
  };
}
