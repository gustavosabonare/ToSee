import * as types from '../types/types'

export function searchFetch(title){
  return dispatch => {
    fetch('http://www.omdbapi.com/?s=' + title )
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
