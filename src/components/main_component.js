import React, { Component } from 'react';
import {Link} from 'react-router';
import {List, ListItem} from 'material-ui/List';
import AppBar from 'material-ui/AppBar';

class App extends Component {
  render() {
    return (
      <div>
        <AppBar title="Welcome"/>
        <List>
          <Link to="/"><ListItem primaryText={'Home'}/></Link>
          <Link to="/search"><ListItem primaryText={'Search Movies'}/></Link>
          <Link to="/list"><ListItem primaryText={'Movies List'}/></Link>
        </List>
      </div>
    );
  }
}


export default App;
