import React, { useEffect } from 'react';
import { Route, Redirect, useHistory, Switch } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { Auth } from 'pages/Auth';
import { Welcome } from 'pages/Welcome';
import { CenteredLoader } from 'components/CenteredLoader';

export const PrivateRoute: React.FC = ({ children, ...rest }) => {
  const [auth, login, , check] = useAuth();

  const checkAuth = async () => {
    await check();
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      {auth ? (
        <>{children}</>
      ) : (
        <>
          <Switch>
            <Route exact path={'/auth'}>
              <Auth />
            </Route>
            <Route exact path={'/welcome'}>
              <Welcome />
            </Route>
            <Route path={'*'}>
              <CenteredLoader />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
};
