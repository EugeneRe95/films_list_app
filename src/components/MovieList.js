import React from 'react'
import {connect} from 'react-redux'
import MovieItem from './MovieItem'
import {v4 as uuidv4} from 'uuid';

function MovieList({movies}) {
    return (
        <section id="movies-list">
            {movies.map(item => <MovieItem
                key={uuidv4()}
                title={item.title}
                format={item.format}
                release_date={item.release_date}
                stars={item.stars}/>)
}
        </section>
    )
}

const mapState = state => {
    return {
        movies: state
            .movies
            .filter(item => item.title.toLowerCase().indexOf(state.filterByMovie.toLowerCase()) !== -1)
            .filter(item => item.stars.toLowerCase().indexOf(state.filterByActors.toLowerCase()) !== -1)
    }
}

export default connect(mapState, null)(MovieList)
