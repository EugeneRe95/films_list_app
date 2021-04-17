import {
    ADD_MOVIE,
    DELETE_MOVIE,
    LOAD_MOVIES,
    SEARCH_BY_ACTORS,
    SEARCH_BY_MOVIE,
    SHOW_ERROR,
    SORT_MOVIES,
    TOGGLE_SPINNER,
    SUCCESS_MESSAGE
} from "./types";

const initialState = {
    movies: [],
    filterByActors: "",
    filterByMovie: "",
    sortByAlphabet: true,
    spinner: true,
    error: false,
    movieAddedMes: false
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_MOVIE:
            return {
                ...state,
                movies: [action.payload].concat(state.movies)
            };

        case DELETE_MOVIE:
            const deleteItem = window.confirm(`Are you sure of deleting "${action.payload}" movie?`)
            if (deleteItem) {
                return {
                    ...state,
                    movies: state
                        .movies
                        .filter(item => item.title !== action.payload)
                }
            } else {
                return {
                    ...state
                }
            }

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
                movies: state.sortByAlphabet
                    ? state
                        .movies
                        .sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
                    : state
                        .movies
                        .sort((a, b) => b.title.toLowerCase().localeCompare(a.title.toLowerCase())),
                sortByAlphabet: !state.sortByAlphabet

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

        case SHOW_ERROR:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}