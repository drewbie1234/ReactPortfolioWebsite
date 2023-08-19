import React, { useEffect } from "react";
import { useState } from "react";
import MovieCard from "./MovieCard";
import styles from './MovieMuse.module.css'


function MovieMuse() {
  const tmdbKey = "3a42bd5b948fcdb92efd5ad830e46e6e";
  const tmdbBaseUrl = "https://api.themoviedb.org/3/";

  // Retrieve genres list from API
  useEffect( () => {
    const getGenres = async () => {
      const genreRequestEndpoint = "genre/movie/list";
      const requestParams = "?api_key=" + tmdbKey;
      const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
    
      try {
        const response = await fetch(urlToFetch, { method: "GET" });
        if (response.ok) {
          const jsonResponse = await response.json();
          const genres = jsonResponse.genres;
          return genres;
        }
        throw new Error("Request Failed");
      } catch (error) {
        console.log(error);
      }
    };

    // Populate dropdown menu with all the available genres
    const populateGenreDropdown = (genres) => {
      const select = document.getElementById('genres')

      for (const genre of genres) {
          let option = document.createElement("option");
          option.value = genre.id;
          option.text = genre.name;
          select.appendChild(option);
      }
    };
    getGenres().then(populateGenreDropdown);
  }, [])


  // Returns the current genre selection from the dropdown menu
  const getSelectedGenre = () => {
    const selectedGenre = document.getElementById('genres').value;
    return selectedGenre;
  };

  //Retrieve list of movies that have selected genre 
  const getMovies = async () => {
    const selectedGenre = getSelectedGenre();
    const discoverMovieEndpoint = "discover/movie?page=100&";
    const requestParams = `api_key=${tmdbKey}&with_genres=${selectedGenre}`;
    const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
  
    try {
      const response = await fetch(urlToFetch, { method: "GET" });
      if (response.ok) {
        const jsonResponse = await response.json();
        const movies = jsonResponse.results;
        return movies;
      }
      throw new Error("Request Failed");
    } catch (error) {
      console.log(error);
    }
  };

  const getRandomMovie = (movies) => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    return randomMovie;
  };

 

  //Retrieve info of randomly selected movie with seelcted genre

  const getMovieInfo = async (movie) => {
    const movieId = movie.id
    const movieEndpoint = `/movie/${movieId}`
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
  
    try {
      const response = await fetch(urlToFetch, { method: "GET" });
      if (response.ok) {
        const jsonResponse = await response.json();
        const movieInfoResponse = jsonResponse ;
        return movieInfoResponse;
      }
      throw new Error("Request Failed");
    } catch (error) {
      console.log(error);
    }
  };
  const [ movieInfo, setMovieInfo ] = useState('')
  const handleClick = async () =>{
    const movies = await getMovies()
    const movie = getRandomMovie(movies);
    setMovieInfo(await getMovieInfo(movie));
    }

  return(
      <body>
      <header>
        <h1 id="appTitle">🍿Film Finder🍿</h1>
      </header>
      <div stl>
        <form id="genreForm">
          <label>Choose a genre:</label>
          <br/><br/>
          <select name="genres" id="genres"></select>
        </form>
        <br/>
        <button id="playBtn" onClick={handleClick}>Let's Play!</button>
        <br/><br/>
        <MovieCard movieInfo={movieInfo} />
      </div>
    </body>

  )
}

export default MovieMuse