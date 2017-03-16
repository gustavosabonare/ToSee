import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import * as actions from '../actions/actions'
import {Card, CardHeader, CardMedia, CardText,} from 'material-ui/Card';

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
      open: false
    }
  }

  displayingFetchedMovies (){
    return this.props.listMovies.list !== undefined ? this.props.listMovies.list
    .map(movie =>
        <Card
          key={movie.id}
          style={style.card}>
          <CardHeader
            avatar={movie.poster_path !== null ? 'https://image.tmdb.org/t/p/w300'+ movie.poster_path : "http://www.auro-3d.com/wp-content/uploads/2016/08/no-poster-available.jpg"}
            titleStyle={style.cardHeader}
            showExpandableButton={true}
            title={movie.original_title}
            subtitle={movie.release_date !== "" ? movie.release_date.split('-',1) : "Date unavailable"}>
            <FlatButton
              label="Add to List"
              primary={true}
              style={style.addToList}/>
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
              'https://image.tmdb.org/t/p/w600'+ movie.poster_path :
              "http://www.auro-3d.com/wp-content/uploads/2016/08/no-poster-available.jpg"}/>
          </CardMedia>
        </Card>)
    : null
  }

  buttonConfigNext(){
    if(this.props.listMovies.pages !== undefined)
    {
      if (this.props.listMovies.indexPage >= this.props.listMovies.pages)
          return true
        else
          return false
    }
    else
      return true
  }

  buttonConfigPrevious(){
    if(this.props.listMovies.pages !== undefined)
    {
      if (this.props.listMovies.indexPage <= 1)
          return true
        else
          return false
    }
    else
      return true
  }

  expandingMovie(){

  }
  render(){
    return(
      <div>
        <div>
          <AppBar
            title="Search Movies"
            onLeftIconButtonTouchTap={() => this.setState({ open: true })} />
          <Drawer
            docked={false}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}>
            <Link
              to='/'>
              <MenuItem
                onTouchTap={() => {this.setState({ open: false }); this.props.resetComponent()}}>
                Home
              </MenuItem>
            </Link>
            <Link
              to='/list'>
              <MenuItem
                onTouchTap={() => {this.setState({ open: false });this.props.resetComponent()}}>
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
              onClick={() => {this.props.searchFetch(this.refs.searchText.getValue(),this.props.listMovies.indexPage-1);window.scrollTo(0, 0)}}
              primary={true}
              style={style} />
            <RaisedButton
              label=">"
              disabled={this.buttonConfigNext()}
              onClick={() => {this.props.searchFetch(this.refs.searchText.getValue(),this.props.listMovies.indexPage+1);window.scrollTo(0, 0)}}
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
            onClick={() => {this.props.searchFetch(this.refs.searchText.getValue());window.scrollTo(0, 0)}}/>
          <Link
            to="/" >
            <RaisedButton
              onClick={() => this.props.resetComponent()}
              label="Back"
              default={true}/>
          </Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    listMovies: state.searchList
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({searchFetch: actions.searchFetch, resetComponent: actions.resetComponent}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
