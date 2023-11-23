import React, { useEffect, useState } from 'react';
import Card from './Card.js';

let API_key="&api_key=cf4d8fb3e32d1f38fd41fa0b0cf96851";
let base_url="https://api.themoviedb.org/3"; //to change this for instance "best movies" url = base_url + actual_url + API_key
let url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;

const Main=()=> {
    const [movieData,setData] = useState([]);
    const [url_set,setUrl] = useState(url);

    useEffect(() => {
        fetch(url_set)
            .then((res) => res.json())
            .then((data) => {
            //console.log(data.results);
                setData(data.results);
        });
    }, [url_set]);

    return(
        <>
            <div className="header">
                <nav>
                    <ul>
                        <li><a href="#">Jotain</a></li>
                        <li><a href="#">Jotain</a></li>
                    </ul>
                </nav>
                <form>
                    <div className="search-btn">
                        <input type="text" placeholder="Elokuvan nimi" className="inputText">
                        </input>
                        <button>Etsi</button>
                    </div>
                </form>
            </div>
            <div className="container">
                {movieData.length === 0 ? (
                <p className="notfound">Not found</p>
                ) : (
                    movieData.map((movie, index) => (
                    <Card info={movie} key={index} />
                ))
                )}
            </div>
        </>
    );
};

export default Main;