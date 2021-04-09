import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {loadMovies} from '../redux/actions'
import Header from './Header'
import MovieList from './MovieList'
import { LinearProgress } from '@material-ui/core'

function MainPage({loadMovies, spinner}) {
    useEffect(() => {
        loadMovies()
    }, [])
    return (
        <section id="main-page">
            <Header/> {spinner
                ? <LinearProgress id="linear-progress"/>
                : <MovieList/>}
        </section>
    )
}

const mapDispatch = {
    loadMovies
}

const mapState = state => {
    return {spinner: state.spinner}
}

export default connect(mapState, mapDispatch)(MainPage)
