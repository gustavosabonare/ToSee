import * as types from '../types/types'

export function searchFetch(title, page){
  const url = 'http://www.omdbapi.com/?s=';

  return dispatch => {
    fetch(page !== '' ? url + title + '&page=' + page : url + title)
    .then(response=> response.json())
    .then(response => {
      dispatch({
        type: types.SEARCH_FETCH,
        payload: response
        })
      }
    )
  }
}
