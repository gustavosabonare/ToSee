import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../actions/actions'
import {Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

const style = {
  margin: 12,
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card:{
    padding: 10,
    margin:'auto'
  },
  cardHeader:{
    color: '#ef6c00'
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
        <Card  expanded={false} key={movie.imdbID} style={style.card}>
          <CardHeader titleStyle={style.cardHeader} actAsExpander={true} showExpandableButton={true} title={movie.Title + " (" + movie.Year + ")"}></CardHeader>
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
          <AppBar title="Search Movies" onLeftIconButtonTouchTap={() => this.setState({ open: true })} />
          <Drawer
            docked={false}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}>
            <Link to='/'><MenuItem onTouchTap={() => {this.setState({ open: false }); this.props.resetComponent()}}>
              Home
            </MenuItem></Link>
            <Link to='/list' ><MenuItem
              onTouchTap={() => {this.setState({ open: false });this.props.resetComponent()}}>
              Movies List
            </MenuItem></Link>
          </Drawer>
        </div>
        <div>
            {this.displayingFetchedMovies()}
        </div>
        <div style={{textAlign: 'center'}}>
          <div>
            <RaisedButton label="<" disabled={this.buttonConfigPrevious()}  onClick={() => this.props.searchFetch(this.refs.searchText.getValue(),this.props.listMovies.indexPage-1)} primary={true} style={style} />
            <RaisedButton label=">" disabled={this.buttonConfigNext()} onClick={() => this.props.searchFetch(this.refs.searchText.getValue(),this.props.listMovies.indexPage+1)} primary={true} style={style} />
          </div>
          <TextField floatingLabelText="Movie Name" ref='searchText' hintText="Movie Name"/>
          <RaisedButton label="Search" primary={true} style={style}
            onClick={() => this.props.searchFetch(this.refs.searchText.getValue())}/>
          <Link to="/" ><RaisedButton onClick={() => this.props.resetComponent()} label="Back" default={true} style={style}/></Link>
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
