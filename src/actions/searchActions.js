import * as types from '../types/types'
import { moviesListChild } from '../services/firebase';

export function searchFetch(title, page){
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=14b2eb59c74a4f2b6647e5e13109e5cc&query=';

  return dispatch => {
    fetch(page !== '' ? url + title + '&page=' + page : url + title + '&page=1')
    .then(response=> response.json())
    .then(response => {
      dispatch({
        type: types.SEARCH_FETCH,
        lista: response.results,
        totalResults: response.total_results,
        indexPage: page,
        pages: response.total_pages
        })
      }
    )
  }
}

export function addToMoviesList(movie){
  return dispatch => moviesListChild.once('value',snap => {
    if (!snap.child(movie.id).exists())
      return moviesListChild.child(movie.id).push({movie})
    else
      return null
  })
}

export function resetComponent(){
  return dispatch => dispatch({
    type: types.RESET_COMPONENT
  })
}