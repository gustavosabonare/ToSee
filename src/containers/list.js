import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class MoviesList extends Component{

  creatingMovieList(){
    return this.props.movies.map((movies) => {return(
        <li key={movies.id}>{movies.name} {movies.language}</li>
      )});
  }

  render(){
    return(
      <div>
        <ul>
          {this.creatingMovieList()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    movies: state.movies
  };
}

export default connect(mapStateToProps)(MoviesList);
