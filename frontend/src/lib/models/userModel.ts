/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';
import { ICredentials } from '../domain/credentials';
import { IUser } from '../domain/user';
import { IUserRegistrationData, IDriverRegistrationData } from '../domain/registration';
import { BACKEND_URL } from '../../config/backend/backend';

export default class UserModel {
  public static authorize = async ({ login, password }: ICredentials): Promise<IUser> => {
    try {
      const res = await axios.post(`${BACKEND_URL}/login`, { login, password }, { withCredentials: true });
      return res.data;
    } catch (e) {
      throw new Error('Login failure');
    }
  };

  public static validateUser = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/get_auth`, { withCredentials: true });
      return res.data;
    } catch (e) {
      return null;
    }
  };

  public static getUserData = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/get_user_info`, { withCredentials: true });
      return res.data;
    } catch (e) {
      return null;
    }
  };
  public static registerUser = async ({ firstName, lastName, email, password, phoneNumber }: IUserRegistrationData) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/register_user`, {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        phone_number: phoneNumber
      });
      return res.data;
    } catch (e) {
      return null;
    }
  };

  public static getUserCars = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/get_my_cars`, { withCredentials: true });
      return res.data;
    } catch (e) {
      return null;
    }
  };

  public static updateEmail = async (name: string, value: string) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/change_email`, { [name]: value }, { withCredentials: true });
      return res.data;
    } catch (e) {
      return null;
    }
  };

  public static updatePhoneNumber = async (name: string, value: string) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/change_phone_number`,
        { phone_number: value },
        { withCredentials: true }
      );
      return res.data;
    } catch (e) {
      return null;
    }
  };

  public static isUserDriver = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/am_i_driver`, { withCredentials: true });
      return res.data.is_driver;
    } catch (e) {
      return null;
    }
  };

  public static registerDriver = async ({ id, license1, license2 }: IDriverRegistrationData) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/register_driver`,
        {
          id,
          license_1: license1,
          license_2: license2
        },
        { withCredentials: true }
      );
      return res.data;
    } catch (e) {
      return null;
    }
  };
}
