import React from 'react';
import {Route, Router, browserHistory} from 'react-router';
import main_component from '../components/main_component';
import search_component from '../components/search_component';
import movies_list_component from '../components/movies_list_component';
import login_component from '../components/login_component';

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={login_component} />
    <Route path="/home" component={main_component} />
    <Route path="/search" component={search_component} />
    <Route path="/list" component={movies_list_component} />
  </Router>
);
