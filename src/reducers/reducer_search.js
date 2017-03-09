import reducerMatching from 'reducer-matching';
import * as types from '../types/types';

const initialState = {}

const app = (state = initialState, action) => reducerMatching(
  [types.FETCH_MOVIES, fetchMovies],
  [types.SEARCH_FETCH, searchFetch],
)(state,action)

function fetchMovies(state){
  return {...state }
}

function searchFetch(state, action){
  return {...state, list: action.payload}
}

export default app;
