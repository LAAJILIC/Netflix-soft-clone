import React, { useState, useEffect } from 'react'
import axios from '../../axios';

import './Row.css';

function Row({ title, fetchUrl, isLargeRow}) {
 const [movies, setMovies] = useState([]);

 const base_url = "https://image.tmdb.org/t/p/original/";
 useEffect(() => {
    async function fetchData() {
     const request = await axios.get(fetchUrl);
     setMovies(request.data.results);
     return request;
    }
      fetchData();
 }, [fetchUrl]);
 console.log(movies);

  return (
    <div className='row'>
      <h2 className='row-title'>{title}</h2>
      <div className='row-collection'>
      {
        movies.map(movie => {
            //if iteration below is made in order to prevent any dead links
           if((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) {
            return <img className={`row-image ${isLargeRow && 'row-largeimage'}`}
            key={movie.id}
             src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
            }`} alt={movie.title} />  }})
        
      }
      </div>
    </div>
  )
}

export default Row;