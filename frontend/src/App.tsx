import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import {ThemeProvider} from '@material-ui/styles';
import {MainTheme} from './lib/themes/MainTheme';
import StartingPage from './lib/pages/starting-page';
import AuthPage from './lib/pages/auth-page';
import MapComponent from './lib/components/Map';
import {SearchTripPage} from "./lib/pages/search-trip";
import {AppDrawer} from "./lib/containers/Drawer/AppDrawer";
import {TripPage} from "./lib/pages/trip-page";
import {CreateTripPage} from "./lib/pages/create-trip";
import MenuIcon from '@material-ui/icons/Menu';
import {AppBar, Button, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography} from "@material-ui/core";
import {PROJECT_NAME} from "./config/names";
import {MainContainer} from "./lib/containers/MainContainer";
import {RegistrationPage} from "./lib/pages/registration-page";

const tripData = {
  data: {
    name: 'Иван Иванов',
    from: 'От: ул. Ленинградский проспект, д. 39, к. 1',
    to: 'До: ул. Первомайская, д. 30 к. 7',
    time: new Date(),
    amountOfFreeSpaces: 3,
    cost: 100
  }
}

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
]
const mockAppDrawerProps = {
  email: 'kyzyl.okm@phystced.edu',
  name: 'Кежик',
  trips: trips
}

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
    },
  }),
);


const App: React.FC = props => {
  const classes = useStyles(props)
  const [authorized, setAuthorized] = useState(false)
  const [drawerOpened, setDrawerOpened] = useState(false)
  const [heading, setHeading] = useState('Heading')

  return (
    <div className="App">
      <ThemeProvider theme={MainTheme}>
        <MainContainer show={authorized} onClick={() => setDrawerOpened(!drawerOpened)} heading={heading} >
        <Router>
          {authorized ? <Redirect to='/new_trip' /> : <Redirect to={'/'} />}
          <Switch>
            {authorized && <>
                <Route exact path="/new_trip" component={CreateTripPage}/>
                <Route exact path="/map" component={MapComponent}/>
                <Route exact path="/search_trip" component={SearchTripPage}/>
                <Route exact path="/trip/1" component={() => <TripPage {...tripData} />}/>
                </>}
            <Route exact path="/" component={StartingPage}/>
            <Route exact path="/auth" component={() => <AuthPage onSuccess={() => setAuthorized(true)}/>}/>
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
}

export default App;
