import React, { useEffect, useState } from 'react'

function Movie() {

        const [movieList,setMovieList] = useState([])

        const getMovie = ()=>{
            fetch("https://api.themoviedb.org/3/discover/movie?api_key=cf4d8fb3e32d1f38fd41fa0b0cf96851")
            .then(res => res.json())
            .then(json => setMovieList(json.results))
        }

        useEffect(()=>{
            getMovie()
        },[])

        console.log(movieList)

    return (
      <div>
        {movieList.map((movie)=>(
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
        ))}
      </div>
    );
  }
  
  export default Movie;
  