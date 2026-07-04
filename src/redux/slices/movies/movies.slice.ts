import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './movies.state.ts';
import {getGenresThunk, getMovieDetailsThunk, getMoviesThunk, getSearchResultsThunk,} from './movies.thunks.ts';

const moviesSlice = createSlice({
    name: 'moviesSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMoviesThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getMoviesThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies = action.payload.results;
                state.totalPages =
                    action.payload.total_pages > 500 ? 500 : action.payload.total_pages;
                state.error = null;
            })
            .addCase(getMoviesThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = (action.payload as string) ?? 'Failed to load movies';
            })

            .addCase(getGenresThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getGenresThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.genres = action.payload;
                state.error = null;
            })
            .addCase(getGenresThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = (action.payload as string) ?? 'Failed to load genres';
            })

            .addCase(getSearchResultsThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getSearchResultsThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies = action.payload.results;
                state.totalPages =
                    action.payload.total_pages > 500 ? 500 : action.payload.total_pages;
                state.error = null;
            })
            .addCase(getSearchResultsThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = (action.payload as string) ?? 'Failed to load search results';
            })
            .addCase(getMovieDetailsThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.selectedMovie = null;
            })
            .addCase(getMovieDetailsThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedMovie = action.payload;
                state.error = null;
            })
            .addCase(getMovieDetailsThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = (action.payload as string) ?? 'Something went wrong';
                state.selectedMovie = null;
            })
    },
});

export default moviesSlice.reducer;