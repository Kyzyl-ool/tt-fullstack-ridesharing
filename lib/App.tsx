/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { TripInfo } from './pages/trip-creation/5/TripInfo';
import Cars from './pages/trip-creation/4/Cars';
import { Header } from './components/Header';
import './App.global.scss';

const App = () => {
  return (
    <div>
      <Cars />
      <TripInfo />
      <Header iconType="back" onIconClick={() => {}}>
        ООО
      </Header>
    </div>
  );
};

export default App;
