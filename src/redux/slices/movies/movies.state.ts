import type {IMovie} from "../../../models/IMovie.ts";
import type {IGenre} from "../../../models/IGenre.ts";
import type {IMovieDetails} from "../../../models/IMovieDetails.ts";

export type MoviesStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface MoviesState {
    movies: IMovie[];
    genres: IGenre[];
    selectedMovie: IMovieDetails | null;
    totalPages: number;
    status: MoviesStatus;
    error: string | null;
}

export const initialState: MoviesState = {
    movies: [],
    genres: [],
    selectedMovie: null,
    totalPages: 0,
    status: 'idle',
    error: null,
};