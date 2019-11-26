import React, { useState, useEffect, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserModel from '../../models/userModel';

interface IPrivateRoute {
  children: React.ReactNode;
  rest: any;
}

const PrivateRoute: React.FC<any> = ({ children, ...rest }) => {
  const [isAuth, setIsAuth] = useState(null);
  const isAuthenticated = async () => {
    const res = await UserModel.validateUser();
    if (res) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const checkAuth = async () => {
      const res = await isAuthenticated();
      setIsAuth(res);
    };
    checkAuth();
  }, []);
  return (
    <Fragment>
      {isAuth !== null && (
        <Route
          {...rest}
          render={({ location }) =>
            isAuth ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: '/auth',
                  state: { from: location }
                }}
              />
            )
          }
        />
      )}
    </Fragment>
  );
};

export default PrivateRoute;
