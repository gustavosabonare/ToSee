import {combineReducers} from 'redux';
import SearchReducer from './reducer_search';
import ToSeeReducer from './reducer_tosee';

const allReducers = combineReducers({
  searchList: SearchReducer,
  toseeList: ToSeeReducer
});

export default allReducers
