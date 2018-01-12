import React from 'react';
import { Link } from 'react-router';
import { List, ListItem } from 'material-ui/List';
import AppBar from 'material-ui/AppBar';

const HomeScene = () =>
  (<div className="home-scene">
    <AppBar
      className="home-scene__header"
      iconStyleLeft={{ display: 'none' }}
      title="Welcome"
    />
    <div className="home-scene__menu">
      <List>
        <Link className="home-scene__link" to="/search">
          <ListItem primaryText={'Search Movies'} />
        </Link>
        <Link className="home-scene__link" to="/list">
          <ListItem primaryText={'Movies List'} />
        </Link>
      </List>
    </div>
  </div>);


export default HomeScene;
