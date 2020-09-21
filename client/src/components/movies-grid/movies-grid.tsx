import React, { useState, useEffect } from 'react';
import {getMoviesList, IMovieData, getMoviesListBySearchTerm} from "../../api/api";
import './movies-grid.scss';
import {Link} from 'react-router-dom';
import throttle from 'lodash.throttle';

const MovieBox = (movie : IMovieData) => {
    const toLink = `/movie/${movie.id}`;
    return (
        <Link to={{pathname: toLink, state: { movie } }}>
            <div key={movie.id}>
                <img src={movie.image} alt={movie.title}/>
                <div>title</div>
            </div>
        </Link>
    );
};


export const MoviesGrid = () => {
    let moviesInit: any[] = [];
    const [movies, setMovies] = useState(moviesInit);
    useEffect(() => {
        // Create an scoped async function in the hook
        async function asyncGetMoviesList() {
            const moviesList = await getMoviesList();
            setMovies(moviesList);
        }
        // Execute the created function directly
       asyncGetMoviesList();

    }, []);

    const moviesItems = movies && movies.map((movie) =>
            <MovieBox {...movie}/>
    );
    const delaySearch = throttle(async function(val)  {
        const moviesList = await getMoviesListBySearchTerm(val);
        setMovies(moviesList);
        }, 1500, { 'leading': false });
    const handleSearch = async (evt) => {
        delaySearch(evt.target.value);
    };
    return (
        <div >
            <div>
                <div>
                    <input type="search"
                           id="example-search-input2"
                           style={{width: '20%', position: 'relative', borderRadius: '40px', paddingRight: '110px' }} onChange={handleSearch}>
                    </input>
                </div>
            </div>

            {movies && movies.length ?
                (
                    <div>
                        <div className='grid'>{moviesItems}</div>
                    </div>
                ): (<div>Loading</div>)
            }
        </div>

    );
};

