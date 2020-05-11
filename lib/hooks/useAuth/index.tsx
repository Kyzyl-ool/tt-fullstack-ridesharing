import UserModel from 'models/UserModel';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAction, setOrganizationsAction, resetUserAction } from 'store/actions/userActions';
import { resetMapAction } from 'store/actions/mapActions';

export const useAuth = (): [
  boolean,
  (phoneNumber: string, password: string) => Promise<boolean>,
  () => void,
  () => Promise<boolean>
] => {
  const { authorized } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const setAuthorized = (state: boolean) => {
    dispatch({
      type: state ? 'SET_AUTHORIZED' : 'SET_UNAUTHORIZED'
    });
  };

  const updateOrganizations = async () => {
    const organizations = await UserModel.getOrganizations();
    dispatch(setOrganizationsAction(organizations));
  };

  const updateUser = async () => {
    const user = await UserModel.getThisUser();
    dispatch(setUserAction(user));
  };

  const auth = async (phoneNumber, password): Promise<boolean> => {
    try {
      const result = await UserModel.login(phoneNumber, password);
      setAuthorized(result);
      if (result) {
        await updateUser();
        await updateOrganizations();
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
    if (result) {
      await updateUser();
      await updateOrganizations();
    }
    return result;
  };

  return [authorized, auth, logout, checkAuth];
};
