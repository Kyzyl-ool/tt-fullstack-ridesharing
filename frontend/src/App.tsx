import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import { MainTheme } from './lib/themes/MainTheme';
import StartingPage from './lib/pages/starting-page';
import AuthPage from './lib/pages/auth-page';
import MapComponent from './lib/components/Map';
import { SearchTripPage } from './lib/pages/search-trip';
import MainPage from './lib/pages/MainPage';
import SelectAddressPage from './lib/pages/SelectAddressPage';
import { AppDrawer } from './lib/containers/Drawer/AppDrawer';
import { TripPage } from './lib/pages/trip-page';
import { CreateTripPage } from './lib/pages/create-trip';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Button, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';
import { PROJECT_NAME } from './config/names';
import MainContainer from './lib/containers/MainContainer';
import { RegistrationPage } from './lib/pages/registration-page';
import Cookies from 'js-cookie';
import {OrganizationPage} from "./lib/pages/organizations-page";
import {IOrganizationCardProps} from "./lib/components/OrganizationItem/OrganizationItem";
import {AddNewOrganizationPage} from "./lib/pages/add-new-organization-page";
import {OrganizationCard} from "./lib/components/OrganizationCard/OrganizationCard";

const tripData = {
  data: {
    name: 'Иван Иванов',
    from: 'От: ул. Ленинградский проспект, д. 39, к. 1',
    to: 'До: ул. Первомайская, д. 30 к. 7',
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
]


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

const App: React.FC = props => {
  const classes = useStyles(props);
  // TODO MAKE
  // const [authorized, setAuthorized] = useState(Cookies.get('remember_token'));
  const [authorized, setAuthorized] = useState(true);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [heading, setHeading] = useState('Heading');

  return (
    <div className="App">
      <ThemeProvider theme={MainTheme}>
        <MainContainer show={authorized} onClick={() => setDrawerOpened(!drawerOpened)} heading={heading}>
          <Router>
            {/*{authorized ? <Redirect to="/new_trip" /> : <Redirect to="/auth" />}*/}
            <Switch>
              {authorized && (
                <>
                  <Route exact path="/main" component={MainPage} />
                  <Route exact path="/new_trip" component={CreateTripPage} />
                  <Route exact path="/select_address" component={SelectAddressPage} />
                  <Route exact path="/search_trip" component={SearchTripPage} />
                  <Route exact path="/trip/1" component={() => <TripPage {...tripData} />} />
                  <Route exact path="/organizations" component={() => <OrganizationPage data={mockOrganizations}/> } />
                  <Route exact path="/new_organization" component={() => <AddNewOrganizationPage/> } />
                  <Route exact path="/organizations/1" component={() => <OrganizationCard {...mockOrganizations[0]} amountOfPeople={42} amountOfDrivers={10}  /> } />
                  <Route exact path="/organizations/2" component={() => <OrganizationCard {...mockOrganizations[1]} amountOfPeople={42} amountOfDrivers={10}  /> } />
                  <Route exact path="/organizations/3" component={() => <OrganizationCard {...mockOrganizations[2]} amountOfPeople={42} amountOfDrivers={10}  /> } />
                </>
              )}
              <Route exact path="/" component={StartingPage} />
              <Route exact path="/auth" component={() => <AuthPage onSuccess={() => setAuthorized(true)} />} />
              <Route exact path={'/registration'} component={RegistrationPage} />
            </Switch>

            <AppDrawer open={drawerOpened} onClose={() => setDrawerOpened(false)} {...mockAppDrawerProps} />
          </Router>
        </MainContainer>

        {/*<StartingPage />*/}
        {/*<AuthPage />*/}
        {/*<ChatPage {...messagesMockData} />*/}
      </ThemeProvider>
    </div>
  );
};

export default App;
