import React, {useState} from 'react'
import TextField from '../common/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import {filterByActors, filterByMovie, sortMovies} from '../redux/actions';
import {connect} from 'react-redux';
import AddMovieBar from './AddMovieBar';

function Header({filterByActors, filterByMovie, actorsFilter, moviesFilter, sortMovies}) {
    const [movieBar,
        setMovieBar] = useState(false)

    return (
        <header>
            <TextField
                className="text-field"
                label="Actor"
                value={actorsFilter}
                InputProps={{
                endAdornment: <InputAdornment position="end"><SearchIcon color="disabled"/></InputAdornment>
            }}
                onChange={(e) => {
                filterByActors(e.target.value)
            }}/>
            <TextField
                className="text-field"
                label="Movie"
                value={moviesFilter}
                InputProps={{
                endAdornment: <InputAdornment position="end"><SearchIcon color="disabled"/></InputAdornment>
            }}
                onChange={(e) => {
                filterByMovie(e.target.value)
            }}/>
            <IconButton
                aria-label="Sort"
                title="Sort by Alphabet"
                onClick={() => {
                sortMovies()
            }}>
                <SortByAlphaIcon color="primary"/>
            </IconButton>
            <IconButton
                aria-label="Add-movie"
                title="Add Movie"
                onClick={() => {
                setMovieBar(true)
            }}>
                <AddCircleIcon color="primary" fontSize="large"/>
            </IconButton>
            <AddMovieBar movieBar={movieBar} setMovieBar={setMovieBar}/>
        </header>
    )
}

const mapDispatch = {
    filterByMovie,
    filterByActors,
    sortMovies
}

const mapState = state => {
    return {actorsFilter: state.filterByActors, moviesFilter: state.filterByMovies}
}

export default connect(mapState, mapDispatch)(Header)
