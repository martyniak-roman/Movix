import { createAsyncThunk } from '@reduxjs/toolkit';
import type { TMDBResponse } from '../../../models/TMDBResponse.ts';
import type { IMovie } from '../../../models/IMovie.ts';
import type { IGenre } from '../../../models/IGenre.ts';
import type { IMovieDetails } from '../../../models/IMovieDetails.ts';
import {getGenres, getMovieDetails, getMovies, searchMovies,} from '../../../services/api.service.ts';

type GetMoviesArgs = {
    page: number;
    genreId?: number | null;
};

type GetSearchResultsArgs = {
    query: string;
    page: number;
};

export const getMoviesThunk = createAsyncThunk<TMDBResponse<IMovie>, GetMoviesArgs, { rejectValue: string }>(
    'movies/getMovies',
    async ({ page, genreId }, thunkAPI) => {
        try {
            return await getMovies({
                page,
                with_genres: genreId ?? undefined,
            });
        } catch {
            return thunkAPI.rejectWithValue('Failed to load movies');
        }
    }
);

export const getGenresThunk = createAsyncThunk<IGenre[], void, { rejectValue: string }>(
    'movies/getGenres',
    async (_, thunkAPI) => {
        try {
            const data = await getGenres();
            return data.genres;
        } catch {
            return thunkAPI.rejectWithValue('Failed to load genres');
        }
    }
);

export const getSearchResultsThunk = createAsyncThunk<TMDBResponse<IMovie>, GetSearchResultsArgs, { rejectValue: string }>(
    'movies/search',
    async ({ query, page }, thunkAPI) => {
        try {
            return await searchMovies(query, page);
        } catch {
            return thunkAPI.rejectWithValue('Failed to search movies');
        }
    }
);

export const getMovieDetailsThunk = createAsyncThunk<IMovieDetails, string, { rejectValue: string }>(
    'movies/getMovieDetails',
    async (id, thunkAPI) => {
        try {
            return await getMovieDetails(id);
        } catch {
            return thunkAPI.rejectWithValue('Failed to load movie details');
        }
    }
);