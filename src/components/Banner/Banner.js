import React, { useEffect, useState } from "react";
import axios from '../../axios';
import requests from "../../Requests";
import './Banner.css';

function Banner() {
     const [movie, setMovie] = useState([]);

     useEffect(() => {
        async function fetchDb() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1 )
            ]);
            return request;
        } fetchDb();
     }, []);
     console.log(movie);
   //  function truncate(string, nb){
   //    return string.length > nb ? string.substr(0, nb - 1) + '...' : string;
   //  } //fixed it with CSS 
  return (
    <header className="banner"
     style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
     }}>
        <div className='banner-parts'>
           <h1 className='banner-title'>
              {movie.title || movie.name || movie.original_name}
           </h1>
           <h2 className='banner-description'>
         {movie.overview}
            </h2>
           <div className='banner-buttons'>
              <button className='banner-button'>play</button>
              <button className='banner-button'>Explore my list</button>
           </div>
        </div>
        <div className='banner-fadeBottom' />
    </header>
  )
}

export default Banner;