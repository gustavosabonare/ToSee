import React, { Component } from 'react';
import {Link} from 'react-router';
import {List, ListItem} from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false
    }
  }

  render() {
    return (
      <div>
        <div>
          <AppBar title="Welcome" onLeftIconButtonTouchTap={() => this.setState({ open: true })} />
          <Drawer
            docked={false}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}>
            <Link
              to='/search'>
              <MenuItem
                onTouchTap={() => this.setState({ open: false })}>
              Search Movies
              </MenuItem>
            </Link>
            <Link
              to='/list' >
                <MenuItem
                  onTouchTap={() =>this.setState({ open: false })}>
                  Movies List
                </MenuItem>
            </Link>
          </Drawer>
        </div>
        <div>
          <div style={{textAlign: 'center'}}>
            <List>
              <Link to="/home"><ListItem primaryText={'Home'} /></Link>
              <Link to="/search"><ListItem primaryText={'Search Movies'}/></Link>
              <Link to="/list"><ListItem primaryText={'Movies List'}/></Link>
            </List>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
