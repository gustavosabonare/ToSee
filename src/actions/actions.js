import * as types from '../types/types'

export function searchFetch(title, page){
  const url = 'http://www.omdbapi.com/?s=';

  return dispatch => {
    fetch(page !== '' ? url + title + '&page=' + page : url + title + '&page=1')
    .then(response=> response.json())
    .then(response => {
      dispatch({
        type: types.SEARCH_FETCH,
        lista: response.Search,
        totalResults: response.totalResults,
        indexPage: page
        })
      }
    )
  }
}

export function resetComponent(){
  return dispatch => dispatch({
    type: types.RESET_COMPONENT,
  })
}
