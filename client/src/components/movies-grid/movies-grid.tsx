import React, { useState, useEffect, useCallback, useRef } from 'react';
import {getMoviesListBulk, IMovieData, getMoviesListBySearchTerm} from "../../api/api";
import './movies-grid.scss';
import {Link} from 'react-router-dom';
import throttle from 'lodash.throttle';

const MovieBox = (movie : IMovieData) => {
    const toLink = `/movie/${movie.id}`;
    return (
        <Link to={{pathname: toLink, state: { movie } }} key={movie.id} className='movie-container'>
            <div>
                <img className='movie-image' src={movie.image} alt={movie.title}/>
                <div className='movie-title'>{movie.title}</div>
            </div>
        </Link>
    );
};


export const MoviesGrid = () => {
    const moviesInit: any[] = [];
    const elementInit: any = undefined;
    const moviesInPort = 20;
    const [movies, setMovies] = useState(moviesInit);
    const count = useRef(0);
    const [element, setElement] = useState(elementInit);

    const observer = useRef(
        new IntersectionObserver(
            entries => {
                const firstEntry = entries[0];

                if (firstEntry.intersectionRatio > 0) {
                    loadMore();
                }
            },
            { threshold: 1 }
        )
    );

    const handleInitial = useCallback(async (count) => {
        const moviesList = await getMoviesListBulk(count, count + 20);
        setMovies(movies => [...movies, ...moviesList]);
    }, []);

    useEffect(() => {
        handleInitial(count.current);
    }, [handleInitial]);

    useEffect(() => {
        const currentElement = element;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [element]);

    const delaySearch = throttle(async function(val)  {
        const moviesList = await getMoviesListBySearchTerm(val);
        setMovies(moviesList);
        }, 1500, { 'leading': false });

    const handleSearch = async (evt) => {
        delaySearch(evt.target.value);
    };

    const loadMore = () => {
        count.current = (count.current + moviesInPort);
        handleInitial(count.current);
    };

    const moviesItems = movies && movies.map((movie) =>
        <MovieBox {...movie}/>
    );

    return (
        <div className='movies-grid-container'>
            <div className='header'>
                <div className='movie-search-box-container'>
                    <input type="search"
                           className='movie-search-box'
                           onChange={handleSearch}
                           placeholder='Search movies...'>
                    </input>
                </div>
            </div>

            {movies && movies.length ?
                (
                    <div>
                        <div className='grid'>{moviesItems}</div>
                    </div>
                ): (<div>Loading ...</div>)
            }

            <div ref={setElement}>
            </div>
        </div>

    );
};

