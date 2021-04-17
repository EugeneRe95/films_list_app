import React, {Component} from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '../common/TextField';

import {addMovie} from "../redux/actions"
import Select from '../common/Select';
import {numberRegExp, wordsRegExp} from './RegularExpressions';

import CheckBoxIcon from '@material-ui/icons/CheckBox';

function actorExist(value) {
    const actorsArray = value.split(",").map(item => item.trim())

    let actorExist = false

    for (let index = 0; index < actorsArray.length-1; index++) {
        if (actorsArray.slice(index + 1, actorsArray.length).find(item => item === actorsArray[index]) !== undefined) {
            actorExist = true
        }
    }

    return actorExist;
}

export class AddMovieBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movie: "",
            year: "",
            actors: "",
            format: "",
            movieError: false,
            yearError: false,
            actorsError: false,
            formatError: false,
            movieHelpertext: "",
            yearHelperText: "",
            actorsHelperText: "",
            notification: false
        }
        this.handleChange = this
            .handleChange
            .bind(this)
        this.addNewMovie = this
            .addNewMovie
            .bind(this)
    }
    handleChange(e) {
        if (e.target.name === "year") {
            this.setState(() => {
                if (e.target.value.match(numberRegExp)) {
                    return {
                        year: e.target.value
                    }
                }
            })
        } else if(e.target.name==="actors"){
            this.setState(() => {
                if (e.target.value.match(wordsRegExp)) {
                    return {
                        actors: e.target.value
                    }
                }
            })
        } else {
            this.setState(() => {
                return {
                    [e.target.name]: e.target.value
                }
            })
        }
    }
    addNewMovie() {
        const actorExistValue = actorExist(this.state.actors)
        const movieExist = this
            .props
            .movies
            .filter(item => item.title === this.state.movie)
            .length === 0
        const yearRange = this.state.year > 1850 && this.state.year <= new Date().getFullYear()

        this.setState((state) => {
            return {
                ...state,
                movieError: movieExist && state.movie !== ""
                    ? false
                    : true,
                yearError: !yearRange || state.year === ""
                    ? true
                    : false,
                actorsError: actorExistValue || state.actors === ""
                    ? true
                    : false,
                formatError: state.format === ""
                    ? true
                    : false,
                actorsHelperText: state.actors === ""
                    ? "This field is required"
                    : "Not allowed to put down actor name more than one time",
                yearHelperText: state.year === ""
                    ? "This field is required"
                    : `Value range must be 1850 - ${new Date().getFullYear()}`,
                movieHelpertext: state.movie === ""
                    ? "This field is required"
                    : "Movie with such name already exists"
            }
        }, () => {
            if (!this.state.movieError && !this.state.yearError && !this.state.actorsError && !this.state.formatError) {
                this
                    .props
                    .addMovie({title: this.state.movie, release_date: this.state.year, stars: this.state.actors, format: this.state.format})
                this.setState((state) => ({
                    ...state,
                    notification: true
                }), () => {
                    setTimeout(() => {
                        this
                            .props
                            .setMovieBar(false)
                        this.setState(() => {
                            return {movie: "", year: "", actors: "", format: "", notification: false}
                        })
                    }, 1000)
                })
            }
        })
    }
    render() {
        const {movieBar, setMovieBar} = this.props
        const {
            movie,
            year,
            actors,
            format,
            movieError,
            movieHelpertext,
            yearHelperText,
            actorsHelperText,
            yearError,
            actorsError,
            formatError,
            notification
        } = this.state
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
                    error={movieError}
                    helperText={movieHelpertext}
                    value={movie}
                    onChange={this.handleChange}
                    variant="outlined"/>
                <TextField
                    className="text-field"
                    label="Year"
                    name="year"
                    error={yearError}
                    value={year}
                    helperText={yearHelperText}
                    onChange={this.handleChange}/>
                <TextField
                    className="text-field"
                    label="Actors"
                    name="actors"
                    error={actorsError}
                    value={actors}
                    helperText={actorsHelperText}
                    onChange={this.handleChange}
                    variant="outlined"/>
                <Select
                    value={format}
                    label="Format"
                    error={formatError}
                    name="format"
                    helperText="This field is required"
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
                    onChange={this.handleChange}/>
                <div className="btn-conrtols">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                        setMovieBar(false)
                    }}>Cancel</ Button>
                    <Button variant="contained" color="primary" onClick={this.addNewMovie}>Confirm</ Button>
                </div>
                <div
                    className={"notifications " + (notification
                    ? "active"
                    : "")}>
                    <h4>Successfuly added
                    </h4>
                    {< CheckBoxIcon size = "large" color = "primary" />}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {movies: state.movies}
}

const mapDispatchToProps = {
    addMovie
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMovieBar)
