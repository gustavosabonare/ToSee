import React, {Component} from 'react';
//import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class MoviesList extends Component {

  render(){
    return(
      <div>
      <h1>Movies List</h1>
      <Link to="/">Back</Link>
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
