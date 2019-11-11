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
  public static getUserData = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/get_user_info`, { withCredentials: true });
      return res.data;
    } catch (e) {
      return null;
    }
  };
  public static registerUser = async ({ firstName, lastName, email, password }: IUserRegistrationData) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/register_user`, {
        first_name: firstName,
        last_name: lastName,
        email,
        password
      });
      return res.data;
    } catch (e) {
      return null;
    }
  };
  public static registerDriver = async ({
    id,
    passportUrl1,
    passportUrl2,
    passportUrlSelfie,
    license1,
    license2
  }: IDriverRegistrationData) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/register_driver`,
        {
          id,
          passport_url_1: passportUrl1,
          passport_url_2: passportUrl2,
          passport_url_selfie: passportUrlSelfie,
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
