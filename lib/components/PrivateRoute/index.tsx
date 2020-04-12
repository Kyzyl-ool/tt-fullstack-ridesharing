import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';

export const PrivateRoute: React.FC = ({ children, ...rest }) => {
  const [auth, login, logout] = useAuth();
  return <Route {...rest}>{auth ? <>{children}</> : <Redirect to={'/auth'} />}</Route>;
};
