import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/actions'
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
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
  }
}

class MoviesList extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false
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
            avatar={movie.poster_path !== null ? 'https://image.tmdb.org/t/p/w92'+ movie.poster_path : "http://www.auro-3d.com/wp-content/uploads/2016/08/no-poster-available.jpg"}
            titleStyle={style.cardHeader}
            showExpandableButton={true}
            title={movie.original_title}
            subtitle={movie.release_date !== "" ? movie.release_date.split('-',1) : "Date unavailable"}>
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
        <div>
          {console.log(this.props)}
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
  return bindActionCreators({getMoviesList: actions.getMoviesList}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
