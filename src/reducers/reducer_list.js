import * as types from '../types/types';
import reducerMatching from 'reducer-matching';


const list = (state = [], action = {}) => reducerMatching(
  [types.BUSCARFILMES, BUSCARFILMES]
)(state, action);

function BUSCARFILMES(state, action){
  return state;
}

export default list;
