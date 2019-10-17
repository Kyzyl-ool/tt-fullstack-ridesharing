import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import {ThemeProvider} from '@material-ui/styles';
import {MainTheme} from './lib/themes/MainTheme';
import StartingPage from './lib/pages/starting-page';
import AuthPage from './lib/pages/auth-page';
import MapComponent from './lib/components/Map';
import {MainContainer} from './lib/containers/MainContainer';
import {Input} from "@material-ui/core";
import {CreateTripPage} from "./lib/pages/create-trip";
import {SearchTripPage} from "./lib/pages/search-trip";

const App: React.FC = () => (
  <div className="App">
    <ThemeProvider theme={MainTheme}>
        <Router>
          <Switch>
            <Route exact path="/" component={StartingPage}/>
            <Route exact path="/auth" component={AuthPage}/>
            <Route exact path="/map" component={MapComponent}/>
            <Route exact path="/new_trip" component={CreateTripPage}/>
            <Route exact path="/search_trip" component={SearchTripPage}/>
            <Redirect to="/"/>
          </Switch>
        </Router>


      {/*<StartingPage />*/}
      {/*<AuthPage />*/}
      {/*<ChatPage {...messagesMockData} />*/}
    </ThemeProvider>
  </div>
);

export default App;
