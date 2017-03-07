import React, { Component } from 'react';
import {Link} from 'react-router';
import {Nav, NavItem} from 'react-bootstrap';



class App extends Component {
  render() {
    return (
      <div>
        <h1>Welcome</h1>
          <Link to="/">Home</Link>
          <Link to="/search">Search Movies</Link>
          <Link to="/list">Movies List</Link>
      </div>
    );
  }
}

export default App;
