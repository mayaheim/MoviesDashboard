import React, {useEffect, useState} from 'react';
import {getMovieDetails} from "../../api/api";
import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom';
import './movie.scss';

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
        <div className='movie-container'>
            <div className='button-container'>
                <Link to='/'>
                    <button className='back-button'>Back to All</button>
                </Link>
            </div>

            {movie ?
                (
                    <div className='movie-details'>
                        <img className='movie-info-image' src={movie.image} alt={movie.title}/>
                        <div className='movie-info'>
                            <div className='title'>{movie.title}</div>
                            <div className='general-info'>{movie.released} | {movie.runtime} | {`${movie.rating} stars`}</div>
                            <div className='movie-desc' dangerouslySetInnerHTML={{__html: movie.synopsis}}></div>
                        </div>

                    </div>
                ) : (<div>Loading</div>)}
        </div>
    );
};


