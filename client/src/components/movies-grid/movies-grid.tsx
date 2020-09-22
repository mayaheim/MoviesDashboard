import React, { useState, useEffect, useCallback } from 'react';
import {getMoviesListBulk, IMovieData, getMoviesListBySearchTerm} from "../../api/api";
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
    const moviesInPort = 20;
    const [movies, setMovies] = useState(moviesInit);
    const [count, setCount] = useState(0);

    const handleInitial = useCallback(async () => {
        const moviesList = await getMoviesListBulk(count, count + 20);
        setMovies(movies => [...movies, ...moviesList]);
    }, [count]);

    useEffect(() => {
        handleInitial();
    }, [handleInitial]);

    const delaySearch = throttle(async function(val)  {
        const moviesList = await getMoviesListBySearchTerm(val);
        setMovies(moviesList);
        }, 1500, { 'leading': false });

    const handleSearch = async (evt) => {
        delaySearch(evt.target.value);
    };

    const loadMore = () => {
        setCount(count + moviesInPort);
    };

    const moviesItems = movies && movies.map((movie) =>
        <MovieBox {...movie}/>
    );

    return (
        <div >
            <div>
                <input type="search"
                       id="example-search-input2"
                       style={{width: '20%', position: 'relative', borderRadius: '40px', paddingRight: '110px' }} onChange={handleSearch}>
                </input>
            </div>

            {movies && movies.length ?
                (
                    <div>
                        <div className='grid'>{moviesItems}</div>
                    </div>
                ): (<div>Loading ...</div>)
            }

            <div className="buttonContainer">
                <button className="buttonStyle" onClick={loadMore}>Load More</button>
            </div>
        </div>

    );
};

