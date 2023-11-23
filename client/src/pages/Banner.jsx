import React, {useState, useEffect} from 'react';
import './banner.css';
import MovieSwiper from '../Components/MovieSwiper';
import MovieContent from '../Components/MovieContent';

function Banner() {
    const [movies, setMovies] = useState ([])

    const fetchData = ()=> {
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=cf4d8fb3e32d1f38fd41fa0b0cf96851")
        .then(res => res.json())
        .then(json => setMovies(json.results))
        .catch(e=>console.log(e.message));
    };
    
    useEffect(()=>{
        fetchData()
    }, []);

    const handleSlideChange = (id) => {
        const newMovies = movies.map((movie) => {
            movie.active = false;
            if (movie.id === id) {
                movie.active = true;
            }
            return movie;
        });
    
        setMovies(newMovies);
    };

    return (<div className="banner">
        {
            movies && movies.length>0 && movies.map(movie => (
                <div className="movie" key={movie.id}>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt="Background Image"
                    className={`bgImg ${movie.active ? 'active' : undefined}`}
                />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <MovieContent movie={movie}/>
                        </div>
                        <div className="col-lg-6 col-md-12">
                        
                        </div>
    
                    </div>
                </div>
            </div>
            ))

        }

        {movies && movies.length>0 && <MovieSwiper slides={movies} slideChange={handleSlideChange} />}
    </div>
    );
}

export default Banner;