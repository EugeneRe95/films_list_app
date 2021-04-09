import {
    ADD_MOVIE,
    DELETE_MOVIE,
    LOAD_MOVIES,
    SEARCH_BY_ACTORS,
    SEARCH_BY_MOVIE,
    SORT_MOVIES,
    TOGGLE_SPINNER
} from "./types";
import axios from "axios"

export function loadMovies() {
    return(dispatch) => {
        axios
            .get("http://eugenere95.github.io/films_list_app/movies.json")
            .then(res => {
                dispatch({type: TOGGLE_SPINNER, payload: false})
                dispatch({type: LOAD_MOVIES, payload: res.data})
            })
            .catch((e) => {
                dispatch({type: TOGGLE_SPINNER, payload: false})
                console.log(e)
            })
    }
}

export function addMovie(payload) {
    return {type: ADD_MOVIE, payload}
}

export function deleteMovie(payload) {
    return {type: DELETE_MOVIE, payload}
}

export function sortMovies() {
    return {type: SORT_MOVIES}
}

export function filterByMovie(payload) {
    return {type: SEARCH_BY_MOVIE, payload}
}
export function filterByActors(payload) {
    return {type: SEARCH_BY_ACTORS, payload}
}

export function toggleCicularProg(payload){
    return {type: TOGGLE_SPINNER, payload}
}