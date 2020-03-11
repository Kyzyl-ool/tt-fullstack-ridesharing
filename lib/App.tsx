/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch, Redirect } from 'react-router-dom';
import { TripCreation } from './pages/trip-creation';
import { JoinRidePage } from './pages/JoinRidePage';
import './App.global.scss';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div>Main page is not ready yet</div>
        </Route>
        <Route exact path="/ride/create">
          <TripCreation />
        </Route>
        <Route exact path="/ride/join">
          <JoinRidePage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
