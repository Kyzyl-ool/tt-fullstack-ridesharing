import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import { MainTheme } from './lib/themes/MainTheme';
import StartingPage from './lib/pages/starting-page';
import AuthPage from './lib/pages/auth-page';
import { SearchTripPage } from './lib/pages/search-trip';
import MainPage from './lib/pages/MainPage';
import SelectAddressPage from './lib/pages/SelectAddressPage';
import { AppDrawer } from './lib/containers/Drawer/AppDrawer';
import TripPage from './lib/pages/trip-page';
import CreateTripPage from './lib/pages/create-trip';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import MainContainer from './lib/containers/MainContainer';
import { RegistrationPage } from './lib/pages/registration-page';
import { OrganizationPage } from './lib/pages/organizations-page';
import { IOrganizationCardProps } from './lib/components/OrganizationItem/OrganizationItem';
import { AddNewOrganizationPage } from './lib/pages/add-new-organization-page';
import { OrganizationCard } from './lib/components/OrganizationCard/OrganizationCard';
import { checkAuth } from './net/auth/auth';
import { connect } from 'react-redux';
import { IOrganization } from './lib/domain/organization';
import organizationsModel from './lib/models/organizationsModel';
import * as actions from './lib/store/actions';

const tripData = {
  data: {
    name: 'Иван Иванов',
    from: 'ул. Ленинградский проспект, д. 39, к. 1',
    to: 'ул. Первомайская, д. 30 к. 7',
    time: new Date(),
    amountOfFreeSpaces: 3,
    cost: 100
  }
};

const trips = [
  {
    name: 'Алексей Кожарин',
    date: new Date(),
    avatar: 'https://material-ui.com/static/images/avatar/1.jpg'
  },
  {
    name: 'Никита Израилев',
    date: new Date(),
    avatar: 'https://material-ui.com/static/images/avatar/1.jpg'
  },
  {
    name: 'Вы',
    date: new Date(),
    avatar: 'https://material-ui.com/static/images/avatar/1.jpg'
  }
];

const mockAppDrawerProps = {
  email: 'kyzyl.okm@phystced.edu',
  name: 'Кежик',
  trips: trips
};

const mockOrganizations: IOrganizationCardProps[] = [
  {
    name: 'Mail.ru Group',
    address: 'ул. Ленинский проспект, д. 39',
    id: 1
  },
  {
    name: 'Общежитие №7',
    address: 'г. Долгопрудный, ул. Первомайская, д. 30, к. 7',
    id: 2
  },
  {
    name: 'Яндекс',
    address: 'ул. Льва Толстого, д. 16',
    id: 3
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
  setOrgs: (any) => any;
  children?: React.ReactNode;
}

const App: React.FC<IApp> = ({ organizations, setOrgs, ...props }) => {
  const classes = useStyles(props);
  // TODO MAKE
  const [authorized, setAuthorized] = useState(false);
  // const [authorized, setAuthorized] = useState(true);
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
      const result = await organizationsModel.getOrganizations();
      setOrgs(result);
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
                <Route path="/trip/:tripId" component={() => <TripPage {...tripData} />} />
                <Route exact path="/new_organization" component={() => <AddNewOrganizationPage />} />
                <Route
                  exact
                  path="/organizations"
                  component={() => <OrganizationPage organizations={organizations} />}
                />
                {organizations &&
                  organizations.map((value, index) => (
                    <Route
                      key={index}
                      exact
                      path={`/organizations/${value.id}`}
                      component={() => (
                        <OrganizationCard
                          name={value.name}
                          amountOfPeople={value.users.length}
                          amountOfDrivers={0}
                          address={`${value.latitude}`}
                        />
                      )}
                    />
                  ))}
              </MainContainer>
            )}
            <Route exact path="/organizations" component={() => <OrganizationPage />} />
            <Route exact path="/" component={StartingPage} />
            <Route exact path="/auth" component={() => <AuthPage onSuccess={() => setAuthorized(true)} />} />
            <Route exact path={'/registration'} component={RegistrationPage} />
          </Switch>
          <AppDrawer open={drawerOpened} onClose={() => setDrawerOpened(false)} {...mockAppDrawerProps} />
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
    setOrgs: orgs => dispatch(actions.setOrganizationsAction(orgs))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
