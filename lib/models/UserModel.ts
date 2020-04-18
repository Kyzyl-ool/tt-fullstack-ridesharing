/* eslint-disable no-empty */
import axios from 'axios';
import { IDriver, IPassenger } from 'domain/driver';

export interface IUserData {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  phoneNumber: string;
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

export interface IGetUserInfoResponseBody {
  firstName: string;
  id: number;
  lastName: string;
  photoUrl: string;
  rating: number;
}

export interface IRegisterUserRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export default class UserModel {
  static checkAuth = async (): Promise<boolean> => {
    try {
      await UserModel.getThisUser();
      return true;
    } catch (e) {
      // console.error(e);
      return false;
    }
  };

  static login = async (phoneNumber: string, password: string): Promise<boolean> => {
    try {
      await axios.post(
        `/api/login`,
        { login: `${phoneNumber}@ridesharing.online`, password },
        { withCredentials: true }
      );
      return true;
    } catch (e) {
      return e.response.data.description === 'Already logged-in';
    }
  };

  static mockLogin = async () => {
    // TODO implement real authorization logic when authorization will be ready
    try {
      const res = await axios.post(
        `/api/login`,
        { login: 'user_67@gmail.com', password: '12345' },
        { withCredentials: true }
      );
      return true;
    } catch (e) {
      return e.response.data.description === 'Already logged-in';
    }
  };

  static logout = async () => {
    try {
      const res = await axios.post('/api/logout');
      return res.data;
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

  static getThisUser = async (): Promise<IPassenger> => {
    const res = await axios.get('/api/user', {
      withCredentials: true
    });
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

  static getUserInfo = async (userId: number): Promise<IGetUserInfoResponseBody> => {
    const res = await axios.get('/api/user', {
      params: {
        id: userId
      }
    });
    return res.data;
  };

  static registerUser = async (registerUserBody: IRegisterUserRequestBody): Promise<{ user_id: number }> => {
    const res = await axios.post('/api/register_user', {
      // eslint-disable-next-line @typescript-eslint/camelcase
      first_name: registerUserBody.firstName,
      // eslint-disable-next-line @typescript-eslint/camelcase
      last_name: registerUserBody.lastName,
      // eslint-disable-next-line @typescript-eslint/camelcase
      phone_number: registerUserBody.phoneNumber,
      password: registerUserBody.password,
      email: `${registerUserBody.phoneNumber}@ridesharing.online`
    });
    return res.data;
  };
}
