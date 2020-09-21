import React, { useState, useEffect } from 'react';
import {getMoviesList, IMovieData} from "../../api/api";
import './movies-grid.scss';
import {Link} from 'react-router-dom';

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
    return (
        <div >
            {movies && movies.length ?
                (
                    <div>
                        <div>
                            <div>
                                <input type="search"
                                       id="example-search-input2"
                                       style={{width: '100%', position: 'relative', borderRadius: '40px', paddingRight: '110px' }}>
                                </input>
                                <button
                                    style={{ backgroundColor: '#d1af4e', color: '#000', borderRadius: '40px', position: 'absolute', top: '1px', right: '1px'}}
                                    type="button"> search
                                </button>
                            </div>
                        </div>

                        <div className='grid'>{moviesItems}</div>
                    </div>
                ): (<div>Loading</div>)
            }
        </div>

    );
};

