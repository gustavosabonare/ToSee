import reducerMatching from 'reducer-matching';
import * as types from '../types/types';

const initialState = {
  list: undefined,
  indexPage: 0,
  pages: 0,
};

const app = (state = initialState, action) => reducerMatching(
  [types.RESET_COMPONENT, () => initialState],
  [types.SEARCH_FETCH, searchFetch],
)(state, action);

function searchFetch(state, action) {
  return {
    ...state,
    list: action.lista,
    indexPage: action.indexPage === undefined ? 1 : action.indexPage,
    pages: action.pages,
  };
}

export default app;
