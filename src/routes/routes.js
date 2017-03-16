import React from 'react';
import {Route, Router, browserHistory} from 'react-router';
import main_component from '../components/main_component';
import search_component from '../components/search_component';
import movies_list_component from '../components/movies_list_component'

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={main_component} />
    <Route path="/search" component={search_component} />
    <Route path="/list" component={movies_list_component} />
  </Router>
);
