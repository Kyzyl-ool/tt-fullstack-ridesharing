import React, { Suspense } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { rootReducer } from 'store/reducers';
import { Container, Loader, Segment, Grid } from 'semantic-ui-react';
const App = React.lazy(() => import('./App'));
import * as serviceWorker from './serviceWorker';

const composeEnhancers = (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) || compose;

// eslint-disable-next-line @typescript-eslint/no-empty-function
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Suspense
      fallback={
        <Grid container relaxed={'very'}>
          <Grid.Column>
            <Grid.Row color={'grey'}>&nbsp;</Grid.Row>
            <Grid.Row color={'grey'}>&nbsp;</Grid.Row>
            <Grid.Row color={'grey'}>&nbsp;</Grid.Row>
            <Grid.Row color={'grey'}>&nbsp;</Grid.Row>
            <Grid.Row color={'grey'}>&nbsp;</Grid.Row>
            <Grid.Row color={'grey'}>&nbsp;</Grid.Row>
            <Grid.Row color={'grey'}>&nbsp;</Grid.Row>
            <Grid.Row color={'grey'}>&nbsp;</Grid.Row>
            <Grid.Row color={'grey'}>&nbsp;</Grid.Row>
            <Grid.Row color={'grey'}>&nbsp;</Grid.Row>
            <Grid.Row color={'grey'}>&nbsp;</Grid.Row>
            <Grid.Row color={'grey'}>&nbsp;</Grid.Row>
            <Grid.Row color={'grey'}>&nbsp;</Grid.Row>
            <Grid.Row>
              <Segment padded compact raised secondary attached={'bottom'}>
                <Loader size={'medium'} inline={'centered'} active as={'div'}>
                  Подождите, приложение загружается...
                </Loader>
              </Segment>
            </Grid.Row>
            <Grid.Row color={'grey'}>&nbsp;</Grid.Row>
          </Grid.Column>
        </Grid>
      }
    >
      <App />
    </Suspense>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
