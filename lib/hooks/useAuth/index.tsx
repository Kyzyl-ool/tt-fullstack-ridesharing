import { useEffect } from 'react';
import UserModel from 'models/UserModel';
import { useDispatch, useSelector } from 'react-redux';

export const useAuth = (): [boolean, () => void, () => void, () => void] => {
  const { authorized } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const setAuthorized = (state: boolean) => {
    dispatch({
      type: state ? 'SET_AUTHORIZED' : 'SET_UNAUTHORIZED'
    });
  };

  const auth = async () => {
    try {
      setAuthorized(await UserModel.mockLogin());
    } catch (e) {
      console.log(e);
      setAuthorized(false);
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
    setAuthorized(await UserModel.checkAuth());
  };

  return [authorized, auth, logout, checkAuth];
};
