/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import './App.global.scss';
import { Avatar } from './components/Avatar/Avatar';
import { DriverCard } from './components/DriverCard/DriverCard';
import { Button } from './components/Button';
import { TripCreation } from './pages/trip-creation';

const sampleURL = 'https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png';

const App = () => {
  return (
    <div>
      <TripCreation />
    </div>
  );
};

export default App;
