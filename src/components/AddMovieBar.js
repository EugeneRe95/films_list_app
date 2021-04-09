import React, {useState} from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '../common/TextField';

import {addMovie} from "../redux/actions"
import Select from '../common/Select';

function AddMovieBar({movieBar, setMovieBar, addMovie, movies}) {
    const [movie,
        setMovie] = useState("")
    const [year,
        setYear] = useState("")
    const [actors,
        setActors] = useState("")
    const [format,
        setFormat] = useState("")
    const [movieExist,
        setError] = useState(false)
    const [helperTextMovie,
        setHelperTextMovie] = useState("")

    function addNewMovie() {
        if (movies.filter(item => item.title.toLowerCase() === movie.toLowerCase()).length === 0 && movie !== "") {
            setError(false)
            addMovie({title: movie, release_date: year, stars: actors, format: format})
            setMovieBar(false)
            setFieldToEmpty()
        } else {
            setError(true)
            setHelperTextMovie(movie === ""
                ? "This field is required"
                : "Movie with such name already exists")
        }
    }

    function setFieldToEmpty() {
        setMovie("")
        setYear("")
        setActors("")
        setFormat("")
    }

    return (
        <div
            id="add-movie-bar"
            className={movieBar
            ? "active"
            : ""}>
            <TextField
                className="text-field"
                label="Movie name"
                name="movie"
                error={movieExist}
                helperText={helperTextMovie}
                value={movie}
                onChange={(e) => setMovie(e.target.value)}
                variant="outlined"/>
            <TextField
                className="text-field"
                label="Year"
                name="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}/>
            <TextField
                className="text-field"
                label="Actors"
                name="actors"
                value={actors}
                onChange={(e) => setActors(e.target.value)}
                variant="outlined"/>
            <Select
                value={format}
                label="Format"
                name="format"
                data={[
                {
                    title: "VHS",
                    value: "VHS"
                }, {
                    title: "DVD",
                    value: "DVD"
                }, {
                    title: "Blu-Ray",
                    value: "Blu-Ray"
                }
            ]}
                onChange={(e) => setFormat(e.target.value)}/>
            <div className="btn-conrtols">
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                    setMovieBar(false)
                }}>Cancel</ Button>
                <Button variant="contained" color="primary" onClick={addNewMovie}>Confirm</ Button>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {movies: state.movies}
}

const mapDispatchToProps = {
    addMovie
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMovieBar)