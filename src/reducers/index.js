import {combineReducers} from 'redux';
import SearchReducer from './reducer_search';

const allReducers = combineReducers({
  searchList: SearchReducer
});

export default allReducers
