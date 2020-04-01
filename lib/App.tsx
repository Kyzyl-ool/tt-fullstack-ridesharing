/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { CreateRidePage } from 'pages/CreateRidePage';
import { JoinRidePage } from 'pages/JoinRidePage';
import { MainPage } from 'pages/MainPage';
import UserModel from 'models/UserModel';
import { CreateOrganizationPage } from 'pages/CreateOrganizationPage';
import { JoinOrganizationPage } from 'pages/JoinOrganizationPage';
import { OrganizationPage } from 'pages/OrganizationPage';
import { Auth } from 'pages/Auth';
import { ActiveRidesPage } from 'pages/ActiveRidesPage';
import { Welcome } from 'pages/Welcome';
import { RidesHistoryPage } from 'pages/RidesHistory';
import './App.global.scss';
import { ProfilePage } from 'pages/ProfilePage';
import { Backdrop } from 'components/Backdrop';

const App = () => {
  //TODO remove when real authorization logic will be implemeneted
  useEffect(() => {
    try {
      UserModel.login();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <Backdrop>
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
          <Route path={'/organization/create'}>
            <CreateOrganizationPage />
          </Route>
          <Route path={'/organization/join'}>
            <JoinOrganizationPage />
          </Route>
          <Route path={'/organization/:organizationId'}>
            <OrganizationPage />
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
          <Route path={'/profile'}>
            <ProfilePage />
          </Route>
          <Route path={'/ride/history'}></Route>
          <RidesHistoryPage />
          <Redirect to="/" />
        </Switch>
      </Router>
    </Backdrop>
  );
};

export default App;
