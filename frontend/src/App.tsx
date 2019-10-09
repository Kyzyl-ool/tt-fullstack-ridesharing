import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ChatPage from './lib/pages/chat-page';
import { messagesMockData } from './mocks/messages';
import { ThemeProvider } from '@material-ui/styles';
import { MainTheme } from './lib/themes/MainTheme';
import StartingPage from './lib/pages/starting-page';
import AuthPage from './lib/pages/auth-page';
import MapComponent from './lib/components/Map';
import './App.css';

const App: React.FC = () => (
  <div className="App">
    <ThemeProvider theme={MainTheme}>
      {/*<StartingPage />*/}
      <Router>
        <Switch>
          <Route exact path="/" component={StartingPage} />
          <Route exact path="/auth" component={AuthPage} />
          <Route exact path="/map" component={MapComponent} />
        </Switch>
      </Router>
      {/*<AuthPage />*/}
      {/* <ChatPage {...messagesMockData} /> */}
    </ThemeProvider>
  </div>
);

export default App;
