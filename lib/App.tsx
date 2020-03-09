/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { Button } from './Components/Button';

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
    </div>
  );
};

export default App;
