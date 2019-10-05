import React from 'react';
import './App.css';
import ChatPage from "./lib/pages/chat-page";
import {messagesMockData} from "./mocks/messages";
import { ThemeProvider } from '@material-ui/styles';
import {MainTheme} from "./lib/themes/MainTheme";
import StartingPage from "./lib/pages/starting-page";
import AuthPage from "./lib/pages/auth-page";

const App: React.FC = () => (
  <div className="App">
    <ThemeProvider theme={MainTheme}>
      {/*<StartingPage />*/}
      {/*<AuthPage />*/}
      <ChatPage {...messagesMockData} />
    </ThemeProvider>
  </div>
);

export default App;
