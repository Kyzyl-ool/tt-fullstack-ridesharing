import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { MainTheme } from './lib/themes/MainTheme';
import StartingPage from './lib/pages/starting-page';
import AuthPage from './lib/pages/auth-page';
import SearchTripPage from './lib/pages/search-trip';
import MainPage from './lib/pages/MainPage';
import AppDrawer from './lib/containers/Drawer/AppDrawer';
import TripPage from './lib/pages/trip-page';
import CreateTripPage from './lib/pages/create-trip';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import MainContainer from './lib/containers/MainContainer';
import { RegistrationPage } from './lib/pages/registration-page';
import OrganizationPage from './lib/pages/organizations-page';
import UserProfilePage from './lib/pages/user-profile-page';
import Notifications from './lib/components/Notifications';
import AddNewOrganizationPage from './lib/pages/add-new-organization-page';
import { OrganizationCard } from './lib/components/OrganizationCard/OrganizationCard';
import { checkAuth } from './net/auth/auth';
import { OrganizationMembersPage } from './lib/pages/organization-members-page';
import PrivateRoute from './lib/components/PrivateRoute';
import WithInitialization from './lib/components/WithInitialization';
import './App.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // flexGrow: 1,
    },
    menuButton: {
      // marginRight: theme.spacing(2),
    },
    title: {
      // flexGrow: 1,
    }
  })
);

interface IApp {
  children?: React.ReactNode;
}

const App: React.FC<IApp> = props => {
  const classes = useStyles(props);
  const [authorized, setAuthorized] = useState(false);
  const [drawerOpened, setDrawerOpened] = useState(false);

  useEffect(() => {
    checkAuth()
      .then(value => {
        setAuthorized(value);
      })
      .catch(() => {
        setAuthorized(false);
      });
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={MainTheme}>
        <Router>
          <Switch>
            <Route exact path="/" component={!authorized ? StartingPage : () => <Redirect to="/main" />} />
            <Route exact path="/auth" component={() => <AuthPage onSuccess={() => setAuthorized(true)} />} />
            <Route
              exact
              path={'/registration'}
              component={() => <RegistrationPage onAuth={() => setAuthorized(true)} />}
            />
            <MainContainer
              onLogout={() => setAuthorized(false)}
              show={authorized}
              onClick={() => setDrawerOpened(!drawerOpened)}
            >
              <PrivateRoute exact path="/main">
                <WithInitialization>
                  <MainPage />
                </WithInitialization>
              </PrivateRoute>
              <PrivateRoute exact path="/new_trip">
                <WithInitialization>
                  <CreateTripPage />
                </WithInitialization>
              </PrivateRoute>
              <PrivateRoute exact path="/search_trip">
                <WithInitialization>
                  <SearchTripPage />
                </WithInitialization>
              </PrivateRoute>
              <PrivateRoute exact path="/profile">
                <WithInitialization>
                  <UserProfilePage />
                </WithInitialization>
              </PrivateRoute>
              <PrivateRoute exact path="/organizations">
                <WithInitialization>
                  <OrganizationPage />
                </WithInitialization>
              </PrivateRoute>
              <PrivateRoute exact path="/trip/:tripId">
                <WithInitialization>
                  <TripPage />
                </WithInitialization>
              </PrivateRoute>
              <PrivateRoute exact path="/new_organization">
                <WithInitialization>
                  <AddNewOrganizationPage />
                </WithInitialization>
              </PrivateRoute>
              <PrivateRoute exact path="/organizations/:orgId/members">
                <WithInitialization>
                  <OrganizationMembersPage />
                </WithInitialization>
              </PrivateRoute>
              <PrivateRoute exact path="/organizations/:orgId">
                <WithInitialization>
                  <OrganizationCard />
                </WithInitialization>
              </PrivateRoute>
            </MainContainer>
          </Switch>
          <AppDrawer open={drawerOpened} onClose={() => setDrawerOpened(false)} />
        </Router>
        <div className="notification-group">
          <Notifications />
        </div>
      </ThemeProvider>
    </div>
  );
};

export default App;
