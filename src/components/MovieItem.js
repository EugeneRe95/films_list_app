import React, {useState} from 'react'
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from "react-redux"
import {deleteMovie} from "../redux/actions"

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  margin: {
    margin: "0px"
  }
}));

function MovieItem({title, format, release_date, stars, deleteMovie}) {
  const classes = useStyles();

  const [info, setInfo] = useState(false)

  return (
    <div className="movie-item">
      <div className="heading">
        <h3>{title}</h3>
        <div className="btn">
          <IconButton
            aria-label="dropdown"
            className={classes.margin}
            title="Movie details"
            onClick={() => {
            setInfo(!info)
          }}>
            <ArrowDropDownCircleIcon
              color="primary"
              className={"dropdown-btn " + (info
              ? "active"
              : "")}/>
          </IconButton>
          <IconButton
            aria-label="delete"
            title="Delete movie"
            className={classes.margin}
            onClick={() => {
            deleteMovie(title)
          }}>
            <DeleteIcon color="secondary"/>
          </IconButton>
        </div>
      </div>
      <div className={"movie-item_info " + (info
        ? "active"
        : "")}>
        <p>
          <strong>Format:</strong>
          {format}</p>
        <p>
          <strong>Release date:</strong>
          {release_date}</p>
        <p>
          <strong>Stars:</strong>
          {stars}</p>
      </div>
    </div>
  )
}

const mapDispatch = {
  deleteMovie
}

export default connect(null, mapDispatch)(MovieItem)
