import React from 'react';

const Card=(movie)=> {
    //console.log(movie.info);
    let img_path="https://image.tmdb.org/t/p/w500";
    
    return(
        <>
            <div className="movie">
                <img src={img_path+movie.info.poster_path} alt="" className="poster"></img>
            </div>
        </>
    )
}

export default Card;