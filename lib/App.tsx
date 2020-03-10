/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { Button } from './Components/Button';
import { TripInfo } from './pages/trip-creation/5/TripInfo';

const App = () => {
  return (
    <div>
      <Button filled={true} onClick={() => {}}>
        Отменить поиск
      </Button>
      <Button disabled={true} onClick={() => {}}>
        Применить промокод
      </Button>
      <Button onClick={() => {}}>Применить промокод</Button>
      <Button filled={true} disabled={true} onClick={() => {}}>
        Отправка запроса...
      </Button>

      <TripInfo />
    </div>
  );
};

export default App;
