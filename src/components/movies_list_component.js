import React, {Component} from 'react';
//import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton'

const style = {
  margin: 12,
}

class MoviesList extends Component {

  render(){
    return(
      <div>
        <div>
          <AppBar title="Movies To See"/>
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
