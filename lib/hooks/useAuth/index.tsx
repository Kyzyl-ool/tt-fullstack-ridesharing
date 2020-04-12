import { useEffect, useState } from 'react';
import UserModel from 'models/UserModel';

export const useAuth = () => {
  const [authorized, setAuthorized] = useState<boolean>(false);

  const auth = async () => {
    try {
      setAuthorized(await UserModel.login());
    } catch (e) {
      console.log(e);
      setAuthorized(false);
    }
  };

  const logout = async () => {
    try {
      await UserModel.logout();
      setAuthorized(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    auth();
  }, []);

  return [authorized, auth, logout];
};
