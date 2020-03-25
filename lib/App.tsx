/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { CreateRidePage } from './pages/CreateRidePage';
import { JoinRidePage } from './pages/JoinRidePage';
import { MainPage } from './pages/MainPage';
import { TripCard } from './components/TripCard/TripCard';
import { sampleDriver, sampleFoundTrips, samplePassengers } from './samples/samples';
import { FoundTrips } from './components/FoundTrips';
import UserModel from 'models/UserModel';
import { CreateOrganizationPage } from 'pages/CreateOrganizationPage';
import { JoinOrganizationPage } from 'pages/JoinOrganizationPage';
import { OrganizationPage } from 'pages/OrganizationPage';
import { Auth } from 'pages/Auth';
import { ActiveRidesPage } from 'pages/ActiveRidesPage';
import { Welcome } from 'pages/Welcome';
import './App.global.scss';

const App = () => {
  //TODO remove when real authorization logic will be implemeneted
  useEffect(() => {
    UserModel.login();
  }, []);

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
        <Route path={'/ride/1'}>
          <TripCard
            from={'Mail.ru Corp. Ленинградский проспект'}
            to={'Российская академия наук'}
            driver={sampleDriver}
            cost={300}
            time={'17:00'}
            passengers={samplePassengers}
            tripId={1}
          />
        </Route>
        <Route path={'/organization/create'}>
          <CreateOrganizationPage />
        </Route>
        <Route path={'/organization/join'}>
          <JoinOrganizationPage />
        </Route>
        <Route path={'/organization/:organizationId'}>
          <OrganizationPage />
        </Route>
        <Route path={'/trips'}>
          <FoundTrips trips={sampleFoundTrips} />w
        </Route>
        <Route path={'/auth'}>
          <Auth />
        </Route>
        <Route path={'/rides'}>
          <ActiveRidesPage />
        </Route>
        <Route path={'/welcome'}>
          <Welcome />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
