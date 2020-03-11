/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import './App.global.scss';
import { Avatar } from './components/Avatar/Avatar';
import { DriverCard } from './components/DriverCard/DriverCard';

const sampleURL = 'https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png';

const App = () => {
  return (
    <div>
      <DriverCard
        mark={10}
        avatarSrc={sampleURL}
        car={'Audi Q8'}
        cost={1000}
        destination={'Дикси продуктовый магазин'}
        firstName={'Алексей'}
        secondName={'Кожарин'}
        time={'17:00'}
        tripId={1}
        vacations={3}
        waiting
      />
    </div>
  );
};

export default App;
