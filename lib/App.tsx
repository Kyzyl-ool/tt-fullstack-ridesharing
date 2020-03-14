/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { CreateRidePage } from './pages/CreateRidePage';
import { JoinRidePage } from './pages/JoinRidePage';
import { MainPage } from './pages/MainPage';
import './App.global.scss';
import { TripCard } from './components/TripCard/TripCard';
import { sampleDriver, sampleFoundTrips, samplePassengers } from './samples/samples';
import { FoundTrips } from './components/FoundTrips';
import { SearchingPage } from 'pages/Searching';
import { PaymentPage } from 'pages/PaymentPage';

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
        <Route path={'/trips'}>
          <FoundTrips trips={sampleFoundTrips} />
        </Route>
        <Route path={'/Searching'}>
          <SearchingPage from={'Mail.ru Corp'} to={'Российская академия наук'} />
        </Route>
        <Route path={'/payment'}>
          <PaymentPage amountToPay={300} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
