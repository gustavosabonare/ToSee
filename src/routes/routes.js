import React from 'react';
import { Route, Router, browserHistory } from 'react-router';
import mainComponent from '../components/main_component';
import searchComponent from '../components/search_component';
import moviesListComponent from '../components/movies_list_component';
import loginComponent from '../components/login_component';

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={loginComponent} />
    <Route path="/home" component={mainComponent} />
    <Route path="/search" component={searchComponent} />
    <Route path="/list" component={moviesListComponent} />
  </Router>
);
