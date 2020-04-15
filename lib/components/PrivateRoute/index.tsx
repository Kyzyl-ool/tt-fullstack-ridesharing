import React, { useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { Auth } from 'pages/Auth';
import { Welcome } from 'pages/Welcome';

export const PrivateRoute: React.FC = ({ children, ...rest }) => {
  const [auth, login, , check] = useAuth();

  useEffect(() => {
    check();
  }, []);
  return (
    <>
      {auth ? (
        <>{children}</>
      ) : (
        <>
          <Route exact path={'/auth'}>
            <Auth />
          </Route>
          <Route exact path={'/welcome'}>
            <Welcome />
          </Route>
          <Redirect to="/auth" />
        </>
      )}
    </>
  );
};
