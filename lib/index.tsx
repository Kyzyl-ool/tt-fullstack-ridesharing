import React, { Suspense } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { rootReducer } from 'store/reducers';
import App from './App';
import * as serviceWorker from './service-worker.js';

const composeEnhancers = (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) || compose;

// eslint-disable-next-line @typescript-eslint/no-empty-function
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

console.log(process.env.NODE_ENV, process.env.PUBLIC_URL, 'INDEX');

window.addEventListener('beforeinstallprompt', e => {
  console.log(e);
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
