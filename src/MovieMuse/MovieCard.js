import React from "react";
import styles from './MovieMuse.module.css'



const MovieCard = (props) => {
    console.log(props)
    return(
        <section className={styles.selectionSection}>
        <div className={styles.container}>
        <div className={styles.banner}><h1>Your Movie Selection!</h1></div>
        <h2>{props.movieInfo.title}</h2>
        <img src={`https://image.tmdb.org/t/p/w200${props.movieInfo.poster_path}`} alt={props.movieInfo.title}/>
        <div>{props.movieInfo.overview}</div>
        <div>Release Date: {props.movieInfo.release_date}</div>
        <div>Runtime: {props.movieInfo.runtime}m</div>
        <div>Rating: {Math.floor(props.movieInfo.vote_average)} ({props.movieInfo.vote_count})</div>
        {(props.movieInfo.budget !== 0 && props.movieInfo.revenue !== 0)&& <div>Budget ${Intl.NumberFormat().format(props.movieInfo.budget)} </div>}
        {(props.movieInfo.budget !== 0 && props.movieInfo.revenue !== 0) && <div>Revenue: ${Intl.NumberFormat().format(props.movieInfo.revenue)}</div>}
        </div>
        </section>
    )
} 

export default MovieCard;
    
 