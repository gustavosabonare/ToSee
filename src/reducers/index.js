import {combineReducers} from 'redux';
import MovieReducer from './reducer_movies';
import ListReducer from './reducer_list';

const allReducers = combineReducers({
  movies: MovieReducer,
  list: ListReducer
});

export default allReducers
