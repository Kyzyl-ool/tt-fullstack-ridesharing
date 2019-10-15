import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import ChatPage from './lib/pages/chat-page';
import { messagesMockData } from './mocks/messages';
import { ThemeProvider } from '@material-ui/styles';
import { MainTheme } from './lib/themes/MainTheme';
import StartingPage from './lib/pages/starting-page';
import AuthPage from './lib/pages/auth-page';
import MapComponent from './lib/components/Map';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { MainContainer } from './lib/containers/MainContainer';

const App: React.FC = () => (
  <div className="App">
    <ThemeProvider theme={MainTheme}>
      <Router>
        <Switch>
          <Route exact path="/" component={StartingPage} />
          <Route exact path="/auth" component={AuthPage} />
          <Route exact path="/map" component={MapComponent} />
          <Redirect to="/"/>
        </Switch>
      </Router>
      <MainContainer heading={'Hello'}>Hello</MainContainer>
      {/*<StartingPage />*/}
      {/*<AuthPage />*/}
      {/*<ChatPage {...messagesMockData} />*/}
    </ThemeProvider>
  </div>
);

export default App;
