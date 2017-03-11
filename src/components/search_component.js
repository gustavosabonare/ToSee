import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../actions/actions'
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const style = {
  margin: 12,
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    margin: 0,
    padding: 10,
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    padding: 0,
    width: 210,
    color: 'rgb(0, 188, 212)',
  },
}

class SearchPage extends Component {

  displayingFetched (){
    return this.props.listMovies.list !== undefined ? this.props.listMovies.list
    .map(movie =>
      <GridTile style={style.titleStyle} key={ movie.imdbID} title={movie.Title } actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>} >
        { movie.Poster !== 'N/A' ? <img alt={movie.imdbID} src={movie.Poster}/> : <img alt={movie.imdbID} src='http://www.grescid.com/wp-content/uploads/2016/09/image-not-found.jpg'/> }
      </GridTile> )
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

  render(){
    return(

      <div>
        {console.log(this.props)}
        <div>
          <AppBar title="Search Movies"/>
        </div>
        <div>
          <GridList ref='gridList' style={style.gridList} cols={2.2} >
            {this.displayingFetched()}
          </GridList>
        </div>
        <div style={{textAlign: 'center'}}>
          <div ref='pageButtons'>
            <RaisedButton label="<<" disabled={this.buttonConfigPrevious()}  onClick={() => this.props.searchFetch(this.refs.searchText.getValue(),this.props.listMovies.indexPage-1)} primary={true} style={style} />
            <RaisedButton label=">>" disabled={this.buttonConfigNext()} onClick={() => this.props.searchFetch(this.refs.searchText.getValue(),this.props.listMovies.indexPage+1)} primary={true} style={style} />
          </div>
          <TextField ref='searchText' hintText="Movie Name"/>
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
