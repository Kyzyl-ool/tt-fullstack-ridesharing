/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { CreateRidePage } from 'pages/CreateRidePage';
import { JoinRidePage } from 'pages/JoinRidePage';
import { MainPage } from 'pages/MainPage';
import { CreateOrganizationPage } from 'pages/CreateOrganizationPage';
import { JoinOrganizationPage } from 'pages/JoinOrganizationPage';
import { OrganizationPage } from 'pages/OrganizationPage';
import { ActiveRidesPage } from 'pages/ActiveRidesPage';
import { RidesHistoryPage } from 'pages/RidesHistory';
import { ProfilePage } from 'pages/ProfilePage';
import { Backdrop } from 'components/Backdrop';
import IncomingRequestsPage from 'pages/IncomingRequestsPage';
import { UserPage } from 'pages/UserPage';
import { PrivateRoute } from 'components/PrivateRoute';
import { UserRequestPage } from 'pages/UserRequestPage';
import './App.global.scss';
import './App.scss';

const AnimatedRouting = () => {
  const location = useLocation();
  return (
    // <TransitionGroup>
    // <CSSTransition key={location.key} classNames={'fade'} timeout={300} mountOnEnter unmountOnExit={false}>
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
      <Route exact path={'/organization/create'}>
        <CreateOrganizationPage />
      </Route>
      <Route exact path={'/organization/join'}>
        <JoinOrganizationPage />
      </Route>
      <Route exact path={'/organization/:organizationId'}>
        <OrganizationPage />
      </Route>
      <Route exact path={'/ride/active'}>
        <ActiveRidesPage />
      </Route>
      <Route exact path={'/profile'}>
        <ProfilePage />
      </Route>
      <Route exact path={'/ride/history'}>
        <RidesHistoryPage />
      </Route>
      <Route exact path={'/user'}>
        <UserPage />
      </Route>
      <Route exact path={'/user/:userId'}>
        <UserPage />
      </Route>
      <Route exact path="/ride/:rideId/requests">
        <IncomingRequestsPage />
      </Route>
      <Route exact path="/ride/:rideId/requests/:userId">
        <UserRequestPage />
      </Route>
      <Redirect to={'/'} />
    </Switch>
    // </CSSTransition>
    // </TransitionGroup>
  );
};

const App = () => {
  return (
    <Backdrop>
      <Router>
        <PrivateRoute>
          <AnimatedRouting />
        </PrivateRoute>
      </Router>
    </Backdrop>
  );
};

export default App;
