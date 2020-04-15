import UserModel from 'models/UserModel';
import { useDispatch, useSelector } from 'react-redux';

export const useAuth = (): [
  boolean,
  (phoneNumber: string, password: string) => Promise<boolean>,
  () => void,
  () => void
] => {
  const { authorized } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const setAuthorized = (state: boolean) => {
    dispatch({
      type: state ? 'SET_AUTHORIZED' : 'SET_UNAUTHORIZED'
    });
  };

  const updateUser = async () => {
    const user = await UserModel.getMyProfileInfo();
    dispatch({
      type: 'SET_USER',
      userInfo: {
        ...user
      }
    });
  };

  const auth = async (phoneNumber, password): Promise<boolean> => {
    try {
      const result = await UserModel.login(phoneNumber, password);
      setAuthorized(result);
      if (result) {
        await updateUser();
      }
      return result;
    } catch (e) {
      console.log(e);
      setAuthorized(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      setAuthorized(false);
      await UserModel.logout();
    } catch (e) {
      console.log(e);
    }
  };

  const checkAuth = async () => {
    const result = await UserModel.checkAuth();
    setAuthorized(result);
    result && (await updateUser());
  };

  return [authorized, auth, logout, checkAuth];
};
