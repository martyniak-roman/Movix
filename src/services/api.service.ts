import type {IMovieDetails} from "../models/IMovieDetails.ts";
import type {IGenre} from "../models/IGenre.ts";
import type {TMDBResponse} from "../models/TMDBResponse.ts";
import type {IMovie} from "../models/IMovie.ts";
import {axiosInstance} from "./api.config.ts";

export const getMovies = async (page = 1, genreId?: string): Promise<TMDBResponse<IMovie>> => {
    const response = await axiosInstance.get('/discover/movie', {
        params: {
            page,
            with_genres: genreId
        }
    });
    return response.data;
};

export const getGenres = async (): Promise<{ genres: IGenre[] }> => {
    const response = await axiosInstance.get('/genre/movie/list');
    return response.data;
};

export const getMovieDetails = async (id: string): Promise<IMovieDetails> => {
    const response = await axiosInstance.get(`/movie/${id}`);
    return response.data;
};

export const searchMovies = async (query: string, page = 1): Promise<TMDBResponse<IMovie>> => {
    const response = await axiosInstance.get('/search/movie', {
        params: {
            query,
            page
        }
    });
    return response.data;
};