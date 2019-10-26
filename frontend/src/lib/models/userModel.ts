import axios from 'axios';
import Cookies from 'js-cookie';

interface ICredentials {
  login: string;
  password: string;
}

export default class UserModel {
  public static authorize = async ({ login, password }: ICredentials): Promise<any> => {
    try {
      const res = await axios.post('http://localhost:5000/login', { login, password }, { withCredentials: true });
      return res.data;
    } catch (e) {
      return null;
    }
  };
  public static getUserData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/get_user_data`, { withCredentials: true });
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
