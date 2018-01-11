import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  AppBar,
  Drawer,
  RaisedButton,
  MenuItem,
  FlatButton,
  Card,
  CardHeader,
  CardMedia,
  CardText,
  Snackbar,
} from 'material-ui';

// Actions
import * as listActions from '../actions/listActions';

const style = {
  margin: 12,
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    margin: 'auto',
    clear: 'both',
    overflow: 'hidden',
    maxWidth: '800px',
  },
  cardText: {
    paddingTop: 0,
  },
  removeFromList: {
    float: 'right',
    right: 50,
    marginTop: 5,
  },
};

class MoviesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false,
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
        key={movie.id}
        style={style.card}
      >
        <CardHeader
          avatar={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : 'http://www.auro-3d.com/wp-content/uploads/2016/08/no-poster-available.jpg'}
          titleStyle={style.cardHeader}
          showExpandableButton
          title={movie.original_title}
          subtitle={movie.release_date ? movie.release_date.split('-', 1) : 'Date unavailable'}
        >
          <FlatButton
            label="Remove from List"
            primary
            style={style.removeFromList}
            onTouchTap={() => {
              this.props.actions.removeFromMoviesList(movie);
              this.setState({ openSnack: true });
            }}
          />
        </CardHeader>
        <CardMedia
          style={style.cardMedia}
          expandable
          overlay={
            <CardText
              style={style.cardText}
              expandable
            >
              <h3 style={style.h3}>Synopses:</h3>
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
      <div>
        <div>
          <AppBar
            title="Movies List"
            onLeftIconButtonTouchTap={() => this.setState({ openDrawer: true })}
          />
          <Drawer
            docked={false}
            open={this.state.openDrawer}
            onRequestChange={openDrawer => this.setState({ openDrawer })}
          >
            <Link to="/home">
              <MenuItem
                onTouchTap={() => this.setState({ openDrawer: false })}
              >
                Home
              </MenuItem>
            </Link>
            <Link to="/search" >
              <MenuItem
                onTouchTap={() => this.setState({ openDrawer: false })}
              >
                Search Movies
              </MenuItem>
            </Link>
          </Drawer>
        </div>
        <div style={{ width: '70%', margin: 'auto' }}>
          {this.displayingToSeeMovies()}
        </div>
        <div style={{ textAlign: 'center' }}>
          <RaisedButton
            onClick={() => browserHistory.goBack()}
            label="Back"
            default
            style={style}
          />
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
