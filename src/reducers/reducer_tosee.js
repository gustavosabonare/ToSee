import reducerMatching from 'reducer-matching';
import * as types from '../types/types';

const initialState = {}

const app = (state = initialState, action) => reducerMatching(
  [types.GET_MOVIES_LIST, getMoviesList]
)(state,action)

function getMoviesList(state, action){
  return {...state, list: action.moviesList}
}

export default app;
