import React, { Component } from 'react';
import firebase from 'firebase';
import { Route, Router, browserHistory } from 'react-router';
import HomeScene from '../components/HomeScene';
import SearchScene from '../components/SearchScene';
import ListScene from '../components/ListScene';
import LoginScene from '../components/LoginScene';

const PrivateRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={LoginScene} />
    <Route path="/home" component={HomeScene} />
    <Route path="/search" component={SearchScene} />
    <Route path="/list" component={ListScene} />
  </Router>
);

class RouteConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLogged: undefined,
    };

    this.setRoutes = this.setRoutes.bind(this);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user =>
      this.setState({
        isUserLogged: !!user,
      }),
    );
  }

  setRoutes() {
    switch (this.state.isUserLogged) {
      case true:
        return <PrivateRoutes />;
      default:
        return <LoginScene />;
    }
  }

  render() {
    return (
        this.setRoutes()
    );
  }
}

export default RouteConfig;
