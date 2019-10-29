import axios from 'axios';
import { ICredentials } from '../domain/credentials';
import { IUser } from '../domain/user';

export default class UserModel {
  public static authorize = async ({ login, password }: ICredentials): Promise<IUser> => {
    try {
      const res = await axios.post('http://localhost:5000/login', { login, password }, { withCredentials: true });
      return res.data;
    } catch (e) {
      return null;
    }
  };
  public static getUserData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/get_user_info`, { withCredentials: true });
      return res.data;
    } catch (e) {
      return null;
    }
  };
  public static getOrganizations = async () => {
    try {
      const res = await axios.get('http://localhost:5000/get_all_organizations', { withCredentials: true });
      return res.data;
    } catch (e) {
      return null;
    }
  };
}
