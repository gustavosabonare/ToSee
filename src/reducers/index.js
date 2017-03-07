import {combineReducers} from 'redux';
import ListReducer from './reducer_list';
import SearchReducer from './reducer_search';

const allReducers = combineReducers({
  list: ListReducer,
  search: SearchReducer
});

export default allReducers
