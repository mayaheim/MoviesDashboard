import React, {useEffect, useState} from 'react';
import {getMovieDetails} from "../../api/api";
import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom';

export function MovieCard(props) {
    const { id } = useParams();
    const movieInit: any = (props.location && props.location.state && props.location.state.movie) || undefined;
    const [movie, setMovie] = useState(movieInit);

    useEffect(() => {
        // Create an scoped async function in the hook
        async function asyncGetMovieDetails() {
            const movieDetails = await getMovieDetails(id);
            setMovie(movieDetails[0]);
        }
        // Execute the created function directly
        if (!movie) {
            asyncGetMovieDetails();
        }
    }, [id, movie]);

    return (
        <div>
            <Link to='/'>
                <button>Back to All</button>
            </Link>
            {movie ?
                (
                    <div>
                        <img src={movie.image} alt={movie.title}/>
                        <div>{movie.title}</div>
                        <div>{movie.released} | {movie.runtime} | {movie.rating}</div>
                        <div>{movie.synopsis}</div>

                    </div>
                ) : (<div>Loading</div>)}
        </div>
    );
};


