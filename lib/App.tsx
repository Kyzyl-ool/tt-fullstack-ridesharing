/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { Header } from './components/Header';
import './App.global.scss';

const App = () => {
  return (
    <div>
      <Header iconType="back" onIconClick={() => {}}>
        ООО
      </Header>
    </div>
  );
};

export default App;
