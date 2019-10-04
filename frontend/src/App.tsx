import React from 'react';
import './App.css';
import StartingPage from './lib/pages/starting-page';
import AuthPage from "./lib/pages/auth-page";

const App: React.FC = () => (
  <div className="App">
    {/*<StartingPage />*/}
    <AuthPage />
  </div>
);

export default App;
