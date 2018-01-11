import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {
  AppBar,
  Drawer, 
  MenuItem, 
  Snackbar, 
  TextField, 
  RaisedButton, 
  FlatButton, 
  Card,
  CardHeader, 
  CardMedia, 
  CardText
} from 'material-ui';

// Actions
import * as searchActions from '../actions/searchActions'

const style = {
  margin: 12,
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card:{
    margin:'auto',
    clear: 'both',
    overflow:'hidden',
    maxWidth: '800px'
  },
  cardText:{
    paddingTop: 0
  },
  addToList:{
    float: 'right',
    right: 50,
    marginTop: 5
  }
}

class SearchPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      openDrawer: false,
      openSnack: false
    }
  }

  onComponentWillUnmount() {
    this.props.actions.resetComponent();
  }

  displayingFetchedMovies (){
    return this.props.searchList.list !== undefined ? this.props.searchList.list
    .map(movie =>
        <Card
          key={movie.id}
          style={style.card}>
          <CardHeader
            avatar={movie.poster_path !== null ? 'https://image.tmdb.org/t/p/w92'+ movie.poster_path : "http://www.auro-3d.com/wp-content/uploads/2016/08/no-poster-available.jpg"}
            titleStyle={style.cardHeader}
            showExpandableButton={true}
            title={movie.original_title}
            subtitle={movie.release_date !== "" ? movie.release_date.split('-',1) : "Date unavailable"}>
            <FlatButton
              label="Add to List"
              primary={true}
              style={style.addToList}
              onTouchTap={() => {this.props.actions.addToMoviesList(movie); this.setState({openSnack: true})}}/>
            <Snackbar
            open={this.state.openSnack}
            message='Movie Added to List'
            autoHideDuration={1000}
            onRequestClose={() => this.setState({ openSnack: false})}/>
          </CardHeader>
          <CardMedia
            style={style.cardMedia}
            expandable={true}
            overlay={
              <CardText
                style={style.cardText}
                expandable={true}>
                <h3 style={style.h3}>Synopses:</h3>
                {movie.overview}
              </CardText>}>
            <img role="presentation" src={movie.poster_path !== null ?
              'https://image.tmdb.org/t/p/w780'+ movie.poster_path :
              "http://www.auro-3d.com/wp-content/uploads/2016/08/no-poster-available.jpg"}/>
          </CardMedia>
        </Card>)
    : null
  }

  buttonConfigNext(){
    if(!this.props.searchList.pages !== 0)
    {
      if (this.props.searchList.indexPage >= this.props.searchList.pages)
        return true
    }
    return false
  }

  buttonConfigPrevious(){
    if(!this.props.searchList.pages !== 0)
    {
      if (this.props.searchList.indexPage <= 1)
        return true
    }
    return false
  }

  render(){
    return(
      <div>
        <div>
          <AppBar
            title="Search Movies"
            onLeftIconButtonTouchTap={() => this.setState({ openDrawer: true })} />
          <Drawer
            docked={false}
            open={this.state.openDrawer}
            onRequestChange={(openDrawer) => this.setState({openDrawer})}>
            <Link
              to='/home'>
              <MenuItem
                onTouchTap={() => {this.setState({ openDrawer: false });}}>
                Home
              </MenuItem>
            </Link>
            <Link
              to='/list'>
              <MenuItem
                onTouchTap={() => {this.setState({ openDrawe: false });this.props.actions.resetComponent()}}>
                Movies List
              </MenuItem>
            </Link>
          </Drawer>
        </div>
        <div style={{width: '70%', margin: 'auto'}}>
            {this.displayingFetchedMovies()}
        </div>
        <div style={{textAlign: 'center'}}>
          <div>
            <RaisedButton
              label="<"
              disabled={this.buttonConfigPrevious()}
              onClick={() => {this.props.actions.searchFetch(this.refs.searchText.getValue(),this.props.searchList.indexPage-1);window.scrollTo(0, 0)}}
              primary={true}
              style={style} />
            <RaisedButton
              label=">"
              disabled={this.buttonConfigNext()}
              onClick={() => {this.props.actions.searchFetch(this.refs.searchText.getValue(),this.props.searchList.indexPage+1);window.scrollTo(0, 0)}}
              primary={true}
              style={style} />
          </div>
          <TextField
            floatingLabelText="Movie Name"
            ref='searchText'
            hintText="Movie Name"/>
          <RaisedButton
            label="Search"
            primary={true}
            style={style}
            onClick={() => {this.props.actions.searchFetch(this.refs.searchText.getValue());window.scrollTo(0, 0)}}/>
          <RaisedButton
            onClick={() => browserHistory.goBack()}
            label="Back"
            default={true}
            />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  searchList: state.searchList
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(searchActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
