import React, {Component} from 'react';
//import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
}



class SearchPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      moviesList: []
    }
  }

  componentWillMount(){
    fetch ('http://www.omdbapi.com/?s=Star+Wars').then((response) => response.json())}

  render(){
    return(
      <div>
        <div>
          <AppBar title="Search Movies"/>

        </div>

        <div style={{textAlign: 'center'}}>
          <TextField hintText="Movie Name"/>
          <RaisedButton label="Search" primary={true} style={style}/>
          <Link to="/"><RaisedButton label="Back" default={true} style={style}/></Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    search: state.list
  }
}

export default connect(mapStateToProps)(SearchPage);
