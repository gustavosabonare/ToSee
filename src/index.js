import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';
import {Provider} from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Routes from './routes/routes.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

injectTapEventPlugin();

const store = createStore(allReducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  ));

const muiTheme = getMuiTheme({
  listItem:{
    height: 10000,
  },
})

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Routes />
    </Provider>
    </MuiThemeProvider>,
  document.getElementById('root')
);
