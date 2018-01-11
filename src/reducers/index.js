import {combineReducers} from 'redux';
import SearchReducer from './reducer_search';
import ListReducer from './reducer_list';

const allReducers = combineReducers({
  searchList: SearchReducer,
  toSeeList: ListReducer
});

export default allReducers
