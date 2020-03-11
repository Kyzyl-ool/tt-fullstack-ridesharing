/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch, Redirect } from 'react-router-dom';
import { Avatar } from './components/Avatar/Avatar';
import { DriverCard } from './components/DriverCard/DriverCard';
import { Button } from './components/Button';
import { TripCreation } from './pages/trip-creation';
import { JoinRidePage } from './pages/JoinRidePage';
import './App.global.scss';

const sampleURL = 'https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png';

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
