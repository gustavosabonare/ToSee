import reducerMatching from 'reducer-matching';
import * as types from '../types/types';

const initialState = {}

const app = (state = initialState, action) => reducerMatching(
  [types.RESET_COMPONENT, resetComponent],
  [types.SEARCH_FETCH, searchFetch],
)(state,action)

function resetComponent(state, action){
  return {...state, list: undefined }
}

function searchFetch(state, action){
  return {...state, list: action.payload}
}

export default app;
