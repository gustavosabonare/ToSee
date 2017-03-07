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

  render(){
    return(
      <div>
      <AppBar title="Search Movies"/>
      <TextField hintText="Movie Name"/>
      <RaisedButton label="Pesquisar" primary={true} style={style}/>
      <Link to="/"><RaisedButton label="Back" default={true} style={style}/></Link>
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
