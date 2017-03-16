import React, {Component} from 'react';
//import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem'

const style = {
  margin: 12,
}

class MoviesList extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false
    }
  }

  render(){
    return(
      <div>
        <div>
          <AppBar title="Movies List" onLeftIconButtonTouchTap={() => this.setState({ open: true })} />
          <Drawer
            docked={false}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}>
            <Link to='/'><MenuItem onTouchTap={() => this.setState({ open: false })}>
              Home
            </MenuItem></Link>
            <Link to='/search' ><MenuItem
              onTouchTap={() =>this.setState({ open: false })}>
              Search Movies
            </MenuItem></Link>
          </Drawer>
        </div>
        <div  style={{textAlign: 'center'}}>
          <Link to="/"><RaisedButton label="Back" default={true} style={style}/></Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    movies: state.list
  }
}

export default connect(mapStateToProps)(MoviesList);
