import React from 'react';
import { Route, Router, browserHistory } from 'react-router';
import HomeScene from '../components/HomeScene';
import SearchScene from '../components/SearchScene';
import ListScene from '../components/ListScene';
import LoginScene from '../components/LoginScene';

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={LoginScene} />
    <Route path="/home" component={HomeScene} />
    <Route path="/search" component={SearchScene} />
    <Route path="/list" component={ListScene} />
  </Router>
);
