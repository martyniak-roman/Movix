import type {RootState} from "../store/store.ts";

const selectMoviesState = (state: RootState) => state.movies;

export const selectAllMovies = (state: RootState) => selectMoviesState(state).movies;
export const selectAllGenres = (state: RootState) => selectMoviesState(state).genres;
export const selectSelectedMovie = (state: RootState) => selectMoviesState(state).selectedMovie;
export const selectMoviesPage = (state: RootState) => selectMoviesState(state).page;
export const selectMoviesTotalPages = (state: RootState) => selectMoviesState(state).totalPages;
export const selectMoviesLoading = (state: RootState) => selectMoviesState(state).loading;
export const selectMoviesError = (state: RootState) => selectMoviesState(state).error;
export const selectMoviesStatus = (state: RootState) => selectMoviesState(state).status;