import * as types from '../types/types'
import { moviesListChild } from '../services/firebase';

export function getMoviesList(){
    return dispatch => moviesListChild.on('value', snap => {
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
  
  export function removeFromMoviesList(movie){
      return dispatch => moviesListChild.once('value',snap => {
        if (snap.child(movie.id).exists())
          return moviesListChild.child(movie.id).remove()
        else
          return null
      })
  }
  