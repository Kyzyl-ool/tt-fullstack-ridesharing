import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import {ThemeProvider} from '@material-ui/styles';
import {MainTheme} from './lib/themes/MainTheme';
import StartingPage from './lib/pages/starting-page';
import AuthPage from './lib/pages/auth-page';
import MapComponent from './lib/components/Map';
import {CreateTripPage} from "./lib/pages/create-trip";
import {SearchTripPage} from "./lib/pages/search-trip";
import {TripPage} from "./lib/pages/trip-page";
import {AppDrawer} from "./lib/containers/Drawer/AppDrawer";

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

const App: React.FC = () => (
  <div className="App">
    <ThemeProvider theme={MainTheme}>
      <Router>
        <Switch>
          <Route exact path="/" component={StartingPage}/>
          <Route exact path="/auth" component={AuthPage}/>
          <Route exact path="/map" component={MapComponent}/>
          <Route exact path="/new_trip" component={CreateTripPage}/>
          <Route exact path="/search_trip" component={SearchTripPage}/>
          <Route exact path="/trip/1" component={() => <TripPage {...tripData} />}/>
          <Redirect to="/"/>
        </Switch>
      </Router>
      <AppDrawer {...mockAppDrawerProps} />

      {/*<StartingPage />*/}
      {/*<AuthPage />*/}
      {/*<ChatPage {...messagesMockData} />*/}
    </ThemeProvider>
  </div>
);

export default App;
