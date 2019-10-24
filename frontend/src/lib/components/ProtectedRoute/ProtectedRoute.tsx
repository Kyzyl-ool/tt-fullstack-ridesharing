import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import MapComponent from '../Map';

export const ProtectedRoute: React.FC<{
  authState: boolean;
  path: string;
  component: React.FC;
  exact: boolean;
}> = ({ authState, path, component, exact }) => {
  if (authState) return <Route exact={exact} path={path} component={component} />;
  else {
    return <Redirect to={'/auth'} />;
  }
};
