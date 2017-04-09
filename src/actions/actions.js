import * as types from '../types/types'
import firebase from '../services/firebase';
const child = firebase.database().ref().child('movieslist');

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
  return dispatch => child.on('value', snap => {
    const array = [];
    snap.forEach((childKey) => {
      childKey.forEach((movie) => {
        array.push(movie.val().movie)
      })
    })
    dispatch({
      type: types.GET_MOVIES_LIST,
      moviesList: array
    })
  })
}

export function addToMoviesList(movie){
    return dispatch => child.once('value',snap => {
      if (!snap.child(movie.id).exists())
        child.child(movie.id).push({movie})
      else
        null
    })
}

export function removeFromMoviesList(movie){
    return dispatch => child.once('value',snap => {
      if (snap.child(movie.id).exists())
        child.child(movie.id).remove()
      else
        null
    })
}
