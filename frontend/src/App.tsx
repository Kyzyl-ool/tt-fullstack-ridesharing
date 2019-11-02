import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import {ThemeProvider} from '@material-ui/styles';
import {MainTheme} from './lib/themes/MainTheme';
import StartingPage from './lib/pages/starting-page';
import AuthPage from './lib/pages/auth-page';
import SearchTripPage from './lib/pages/search-trip';
import MainPage from './lib/pages/MainPage';
import SelectAddressPage from './lib/pages/SelectAddressPage';
import AppDrawer from './lib/containers/Drawer/AppDrawer';
import TripPage from './lib/pages/trip-page';
import CreateTripPage from './lib/pages/create-trip';
import {createStyles, makeStyles, Theme} from '@material-ui/core';
import MainContainer from './lib/containers/MainContainer';
import {RegistrationPage} from './lib/pages/registration-page';
import {OrganizationPage} from './lib/pages/organizations-page';
import {IOrganizationCardProps} from './lib/components/OrganizationItem/OrganizationItem';
import {AddNewOrganizationPage} from './lib/pages/add-new-organization-page';
import {OrganizationCard} from './lib/components/OrganizationCard/OrganizationCard';
import {checkAuth} from './net/auth/auth';
import {connect} from 'react-redux';
import {IOrganization} from './lib/domain/organization';
import organizationsModel from './lib/models/organizationsModel';
import * as actions from './lib/store/actions';
import {ITripProps} from "./lib/containers/MyTrips/MyTrips";
import userModel from "./lib/models/userModel";
import {OrganizationMembersPage} from "./lib/pages/organization-members-page";

const trips: ITripProps[] = [
  {
    name: 'Алексей Кожарин',
    date: new Date(),
    avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
    id: 3
  },
  {
    name: 'Никита Израилев',
    date: new Date(),
    avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
    id: 4
  },
  {
    name: 'Вы',
    date: new Date(),
    avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
    id: 5
  }
];

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
  organizations: IOrganization[];
  myOrganizations: IOrganization[];
  setOrgs: (any) => any;
  setMyOrgs: (any) => any;
  children?: React.ReactNode;
}

const App: React.FC<IApp> = ({organizations, myOrganizations, setOrgs, setMyOrgs, ...props}) => {
  const classes = useStyles(props);
  // TODO MAKE
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
    const fetchOrgs = async () => {
      try {
        const result = await organizationsModel.getOrganizations();
        setOrgs(result);
        const myOrgsResult = await userModel.getUserData();
        setMyOrgs(myOrgsResult.organizations);
      } catch (e) {
      }
    };
    fetchOrgs();
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={MainTheme}>
        <Router>
          {authorized ? <Redirect to="/main" /> : <Redirect to="/" />}
          <Switch>
            {authorized && (
              <MainContainer
                onLogout={() => setAuthorized(false)}
                show={authorized}
                onClick={() => setDrawerOpened(!drawerOpened)}
              >
                <Route exact path="/main" component={MainPage} />
                <Route exact path="/new_trip" component={CreateTripPage} />
                <Route exact path="/select_address" component={SelectAddressPage} />
                <Route exact path="/search_trip" component={SearchTripPage} />
                <Route path="/trip/:tripId" component={() => <TripPage />} />
                <Route exact path="/new_organization" component={() => <AddNewOrganizationPage />} />
                <Route
                  exact
                  path="/organizations"
                  component={() => <OrganizationPage myOrganizations={myOrganizations} organizations={organizations}/>}
                />
                <Route exact path={`/organizations/:orgId/members`} component={() => <OrganizationMembersPage/>} />
                <Route exact path={`/organizations/:orgId`} component={() => <OrganizationCard />} />
              </MainContainer>
            )}
            <Route exact path="/organizations" component={() => <OrganizationPage />} />
            <Route exact path="/" component={StartingPage} />
            <Route exact path="/auth" component={() => <AuthPage onSuccess={() => setAuthorized(true)} />} />
            <Route exact path={'/registration'} component={RegistrationPage} />
          </Switch>
          <AppDrawer open={drawerOpened} onClose={() => setDrawerOpened(false)} />
        </Router>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ...state.org
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setOrgs: orgs => dispatch(actions.setOrganizationsAction(orgs)),
    setMyOrgs: myOrgs => dispatch(actions.setMyOrganizationsAction(myOrgs))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
