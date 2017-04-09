import * as types from '../types/types'
import firebase from '../services/firebase';

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

export function resetComponent(){
  return dispatch => dispatch({
    type: types.RESET_COMPONENT
  })
}

export function getMoviesList(){
  const child = firebase.database().ref().child('movieslist');
  return dispatch => child.on('value', snap => {
    const array = []
    snap.forEach((movie) => {
      array.push({
        id: movie.val().id,
        original_title: movie.val().original_title,
        overview: movie.val().overview,
        poster_path: movie.val().poster_path,
        release_date: movie.val().release_date
      })
    })
    dispatch({
      type: types.GET_MOVIES_LIST,
      moviesList: array
    })
  })
}
