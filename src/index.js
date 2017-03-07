import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';
import {Provider} from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Routes from './routes/routes.js';

const store = createStore(allReducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  ));


ReactDOM.render(
    <Provider store={store}>
      <Routes />
    </Provider>,
  document.getElementById('root')
);
