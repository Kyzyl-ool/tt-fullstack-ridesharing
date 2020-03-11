/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch, Redirect } from 'react-router-dom';
import { CreateRidePage } from './pages/CreateRidePage';
import { JoinRidePage } from './pages/JoinRidePage';
import { MainPage } from './pages/MainPage';
import './App.global.scss';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route exact path="/ride/create">
          <CreateRidePage />
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
