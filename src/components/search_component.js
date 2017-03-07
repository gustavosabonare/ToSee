import React, {Component} from 'react';
//import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class SearchPage extends Component {

  render(){
    return(
      <div>
      <h1>Movis Search</h1>
      <input type="text"/>
      <button>Buscar Filme</button>
      <br/>
      <Link to="/">Back</Link>
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
