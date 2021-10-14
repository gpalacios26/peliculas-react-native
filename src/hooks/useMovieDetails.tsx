import { useEffect, useState } from 'react';
import movieDB from '../api/movieDB';
import { MovieFull } from '../interfaces/movieInterface';
import { CreditsResponse, Cast } from '../interfaces/creditsInterface';

interface MovieDetails {
    movieFull?: MovieFull;
    cast: Cast[];
}

export const useMovieDetails = (movieId: number) => {

    const [isLoading, setIsLoading] = useState(true);
    const [movieState, setMovieState] = useState<MovieDetails>({
        movieFull: undefined,
        cast: []
    });

    const getMovieDetails = async () => {
        const movieDetailsPromise = movieDB.get<MovieFull>(`/${movieId}`);
        const castPromise = movieDB.get<CreditsResponse>(`/${movieId}/credits`);

        const [movieDetailsResp, castPromiseResp] = await Promise.all([movieDetailsPromise, castPromise]);

        setMovieState({
            movieFull: movieDetailsResp.data,
            cast: castPromiseResp.data.cast
        });

        setIsLoading(false);
    }

    useEffect(() => {
        getMovieDetails();
    }, []);

    return {
        ...movieState,
        isLoading
    }
}
