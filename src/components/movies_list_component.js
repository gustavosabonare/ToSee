import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/actions'
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardHeader, CardMedia, CardText,} from 'material-ui/Card';
import Snackbar from 'material-ui/Snackbar';

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
  removeFromList:{
    float: 'right',
    right: 50,
    marginTop: 5
  }
}

class MoviesList extends Component {
  constructor(props){
    super(props);
    this.state = {
      openDrawer: false,
      openSnack: false
    }
  }

  componentWillMount(){
    this.props.getMoviesList();
  }

  displayingToSeeMovies (){
    return this.props.listMovies.list !== undefined ? this.props.listMovies.list
    .map(movie =>
        <Card
          key={movie.id}
          style={style.card}>
          <CardHeader
            avatar={movie.poster_path ? 'https://image.tmdb.org/t/p/w92'+ movie.poster_path : "http://www.auro-3d.com/wp-content/uploads/2016/08/no-poster-available.jpg"}
            titleStyle={style.cardHeader}
            showExpandableButton={true}
            title={movie.original_title}
            subtitle={movie.release_date ? movie.release_date.split('-',1) : "Date unavailable"}>
            <FlatButton
              label="Remove from List"
              primary={true}
              style={style.removeFromList}
              onTouchTap={() => {this.props.removeFromMoviesList(movie); this.setState({openSnack: true})}}/>
              <Snackbar
              open={this.state.openSnack}
              message='Movie Removed to List'
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
            <img role="presentation" src={movie.poster_path ?
              'https://image.tmdb.org/t/p/w780'+ movie.poster_path :
              "http://www.auro-3d.com/wp-content/uploads/2016/08/no-poster-available.jpg"}/>
          </CardMedia>
        </Card>)
    : null
  }

  render(){
    return(
      <div>
        <div>
          <AppBar title="Movies List" onLeftIconButtonTouchTap={() => this.setState({ openDrawer: true })} />
          <Drawer
            docked={false}
            open={this.state.openDrawer}
            onRequestChange={(open) => this.setState({open})}>
            <Link to='/'>
              <MenuItem
                onTouchTap={() => this.setState({ openDrawer: false })}>
                Home
              </MenuItem>
            </Link>
            <Link to='/search' >
              <MenuItem
                onTouchTap={() =>this.setState({ openDrawer: false })}>
                Search Movies
              </MenuItem>
            </Link>
          </Drawer>
        </div>
        <div style={{width: '70%', margin: 'auto'}}>
            {this.displayingToSeeMovies()}
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
    listMovies: state.toseeList
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({removeFromMoviesList: actions.removeFromMoviesList, getMoviesList: actions.getMoviesList}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
