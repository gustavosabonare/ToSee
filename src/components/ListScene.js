import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  AppBar,
  RaisedButton,
  FlatButton,
  Card,
  CardHeader,
  CardMedia,
  CardText,
  Snackbar,
} from 'material-ui';

// Actions
import * as listActions from '../actions/listActions';

class ListScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openSnack: false,
    };
  }

  componentWillMount() {
    if (!this.props.listMovies.list) {
      this.props.actions.getMoviesList();
    }
  }

  displayingToSeeMovies() {
    return this.props.listMovies.list !== undefined ? this.props.listMovies.list

    .map(movie =>
      (<Card
        className="list-scene__movie-card"
        key={movie.id}
      >
        <CardHeader
          avatar={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : 'http://www.auro-3d.com/wp-content/uploads/2016/08/no-poster-available.jpg'}
          showExpandableButton
          title={movie.original_title}
          subtitle={movie.release_date ? movie.release_date.split('-', 1) : 'Date unavailable'}
        >
          <FlatButton
            className="list-scene__card-button"
            label="Remove from List"
            primary
            onTouchTap={() => {
              this.props.actions.removeFromMoviesList(movie);
              this.setState({ openSnack: true });
            }}
          />
        </CardHeader>
        <CardMedia
          expandable
          overlay={
            <CardText className="list-scene__card-synopses"expandable>
              <h3>Synopses:</h3>
              {movie.overview}
            </CardText>}
        >
          <img
            alt="presentation"
            src={movie.poster_path ?
              `https://image.tmdb.org/t/p/w780${movie.poster_path}` :
              'http://www.auro-3d.com/wp-content/uploads/2016/08/no-poster-available.jpg'}
          />
        </CardMedia>
      </Card>))
    : null;
  }

  render() {
    return (
      <div className="list-scene">
        <AppBar iconStyleLeft={{ display: 'none' }} title="Movies List" />
        <div className="list-scene__movies-list">
          {this.displayingToSeeMovies()}
        </div>
        <RaisedButton
          className="list-scene__back-buttom"
          onClick={() => browserHistory.goBack()}
          label="Back"
          default
        />
        <Snackbar
          open={this.state.openSnack}
          message="Movie Removed to List"
          autoHideDuration={1000}
          onRequestClose={() => this.setState({ openSnack: false })}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  listMovies: state.toSeeList,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(listActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListScene);
