import type { RootState } from '../store/store';

export const selectMoviesState = (state: RootState) => state.movies;
export const selectAllMovies = (state: RootState) => selectMoviesState(state).movies;
export const selectAllGenres = (state: RootState) => selectMoviesState(state).genres;
export const selectMoviesError = (state: RootState) => selectMoviesState(state).error;
export const selectMoviesStatus = (state: RootState) => selectMoviesState(state).status;
export const selectTotalPages = (state: RootState) => selectMoviesState(state).totalPages;
export const selectSelectedMovie = (state: RootState) => selectMoviesState(state).selectedMovie;
export const selectMovieDetailsStatus = (state: RootState) => selectMoviesState(state).status;
export const selectMovieDetailsError = (state: RootState) => selectMoviesState(state).error;