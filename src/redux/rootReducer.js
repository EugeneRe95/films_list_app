import {
    ADD_MOVIE,
    DELETE_MOVIE,
    LOAD_MOVIES,
    SEARCH_BY_ACTORS,
    SEARCH_BY_MOVIE,
    SORT_MOVIES,
    TOGGLE_SPINNER
} from "./types";


const initialState = {
    movies: [],
    filterByActors: "",
    filterByMovie: "",
    spinner: true
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_MOVIE:
            return {
                ...state,
                movies: [action.payload].concat(state.movies)
            };

        case DELETE_MOVIE:
            return {
                ...state,
                movies: state
                    .movies
                    .filter(item => item.title !== action.payload)
            };

        case SEARCH_BY_ACTORS:
            return {
                ...state,
                filterByActors: action.payload
            }

        case SEARCH_BY_MOVIE:
            return {
                ...state,
                filterByMovie: action.payload
            }

        case SORT_MOVIES:
            return {
                ...state,
                movies: state
                    .movies
                    .sort((a, b) => a.title < b.title
                        ? -1
                        : 1)
            }

        case LOAD_MOVIES:
            return {
                ...state,
                movies: action.payload
            }
        case TOGGLE_SPINNER:
            return {
                ...state,
                spinner: action.payload
            }

        default:
            return state;
    }
}