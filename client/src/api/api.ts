import axios from 'axios';


export interface IMovieData {
    id: string;
    title: string;
    image: string;
    synopsis: string;
    rating: string;
    type: string;
    released: string;
    runtime: string;
    largeimage: string;
    unogsdate: string;
    imdbid: string;
    download: string;
}

export const getMoviesList = (): Promise<IMovieData[]> => {
    return axios.get('http://localhost:3000/movies').then(({data}) => data);
};

export const getMoviesListBySearchTerm = (searchTerm: string): Promise<IMovieData[]> => {
    return axios.get(`http://localhost:3000/movies?search=${searchTerm}`).then(({data}) => data);
};

export const getMovieDetails = (
    id: string
): Promise<IMovieData> => {
    return axios.get(`http://localhost:3000/movies/${id}`).then(({data}) => data);
};
