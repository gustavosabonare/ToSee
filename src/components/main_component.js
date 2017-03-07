import React, { Component } from 'react';
import {Link} from 'react-router';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Bem Vindo</h1>
        <ul >
          <li><Link to='/search'>Search Movies</Link></li>
          <li><Link to='/list'>Movies List</Link></li>
        </ul>
      </div>
    );
  }
}

export default App;
