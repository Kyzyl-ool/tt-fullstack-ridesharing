import React, { useEffect } from 'react';
import { Route, Redirect, useHistory, Switch } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { Auth } from 'pages/Auth';
import { Welcome } from 'pages/Welcome';
import { CenteredLoader } from 'components/CenteredLoader';

export const PrivateRoute: React.FC = ({ children, ...rest }) => {
  const [auth, login, , check] = useAuth();
  const history = useHistory();

  const checkAuth = async () => {
    const result = await check();
    if (!result) {
      history.push('/auth');
    } else {
      Notification.requestPermission().then(value => {
        console.log(value);
      });
    }
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
