import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import {
  AppBar,
  Snackbar,
  TextField,
  RaisedButton,
  FlatButton,
  Card,
  CardHeader,
  CardMedia,
  CardText,
} from 'material-ui';

// Actions
import * as searchActions from '../actions/searchActions';

class SearchScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openSnack: false,
    };

    this.submitSearch = this.submitSearch.bind(this);
  }

  componentWillUnmount() {
    this.props.actions.resetComponent();
  }

  displayingFetchedMovies() {
    return this.props.searchList.list !== undefined ? this.props.searchList.list
    .map(movie =>
      (<Card
        className="search-scene__movie-card"
        key={movie.id}
      >
        <CardHeader
          avatar={movie.poster_path !== null ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : 'http://www.auro-3d.com/wp-content/uploads/2016/08/no-poster-available.jpg'}
          showExpandableButton
          title={movie.original_title}
          subtitle={movie.release_date !== '' ? movie.release_date.split('-', 1) : 'Date unavailable'}
        >
          <FlatButton
            className="search-scene__card-button"
            label="Add to List"
            primary
            onTouchTap={() => {
              this.props.actions.addToMoviesList(movie);
              this.setState({ openSnack: true });
            }}
          />
          <Snackbar
            open={this.state.openSnack}
            message="Movie Added to List"
            autoHideDuration={1000}
            onRequestClose={() => this.setState({ openSnack: false })}
          />
        </CardHeader>
        <CardMedia
          expandable
          overlay={
            <CardText expandable>
              <h3>Synopses:</h3>
              {movie.overview}
            </CardText>}
        >
          <img
            alt="presentation"
            src={movie.poster_path !== null ?
              `https://image.tmdb.org/t/p/w780${movie.poster_path}` :
              'http://www.auro-3d.com/wp-content/uploads/2016/08/no-poster-available.jpg'}
          />
        </CardMedia>
      </Card>))
    : null;
  }

  buttonConfigNext() {
    if (!this.props.searchList.pages !== 0) {
      if (this.props.searchList.indexPage >= this.props.searchList.pages) { return true; }
    }
    return false;
  }

  buttonConfigPrevious() {
    if (!this.props.searchList.pages !== 0) {
      if (this.props.searchList.indexPage <= 1) { return true; }
    }
    return false;
  }

  submitSearch(e) {
    e.preventDefault();
    this.props.actions.searchFetch(this.refs.searchText.getValue());
  }

  render() {
    return (
      <div className="search-scene">
        <AppBar iconStyleLeft={{ display: 'none' }} title="Search Movies" />
        <div className="search-scene__movies-list">
          {this.displayingFetchedMovies()}
        </div>
        <div className="search-scene__list-nav">
          <RaisedButton
            className="search-scene__list-nav-button"
            label="<"
            disabled={this.buttonConfigPrevious()}
            onClick={() => {
              this.props.actions.searchFetch(
                  this.refs.searchText.getValue(), this.props.searchList.indexPage - 1,
                );
              window.scrollTo(0, 0);
            }}
            primary
          />
          <RaisedButton
            className="search-scene__list-nav-button"
            label=">"
            disabled={this.buttonConfigNext()}
            onClick={() => {
              this.props.actions.searchFetch(
                  this.refs.searchText.getValue(), this.props.searchList.indexPage + 1,
                );
              window.scrollTo(0, 0);
            }}
            primary
          />
        </div>
        <form
          className="search-scene__form"
          onSubmit={this.submitSearch}
        >
          <TextField
            className="search-scene__input"
            floatingLabelText="Movie Name"
            ref="searchText"
            hintText="Movie Name"
          />
          <RaisedButton
            className="search-scene__search-button"
            label="Search"
            primary
            ref="search"
            onClick={() => { this.searchButton.click(); }}
          />

          <button
            style={{ display: 'none' }}
            ref={(refs) => { this.searchButton = refs; }}
          />
        </form>
        <RaisedButton
          className="search-scene__back-button"
          onClick={() => browserHistory.goBack()}
          label="Back"
          default
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchList: state.searchList,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(searchActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchScene);
