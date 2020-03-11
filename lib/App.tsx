/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { Header } from 'components/Header';
import { Backdrop } from 'components/Backdrop';
import { Input } from 'components/Input';
import './App.global.scss';

const App = () => {
  return (
    <div>
      <Backdrop>
        <Header iconType="back" onIconClick={() => {}}>
          Тест
        </Header>
      </Backdrop>
    </div>
  );
};

export default App;
