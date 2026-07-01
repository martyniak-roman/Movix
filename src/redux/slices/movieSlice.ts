import type { IMovie } from "../../models/IMovie.ts";
import { createAsyncThunk, createSlice, isPending, isRejectedWithValue, type PayloadAction } from "@reduxjs/toolkit";
import type { IGenre } from "../../models/IGenre.ts";
import type { TMDBResponse } from "../../models/TMDBResponse.ts";
import {getGenres, getMovieDetails, getMovies, searchMovies} from "../../services/api.service.ts";
import type {IMovieDetails} from "../../models/IMovieDetails.ts";

type MoviesStatus = "idle" | "loading" | "succeeded" | "failed";

type MoviesState = {
    movies: IMovie[];
    genres: IGenre[];
    selectedMovie: IMovieDetails | null;
    page: number;
    totalPages: number;
    loading: boolean;
    status: MoviesStatus;
    error: string | null;
}

const initialState: MoviesState = {
    movies: [],
    genres: [],
    selectedMovie: null,
    page: 1,
    totalPages: 0,
    loading: false,
    status: "idle",
    error: null,
}

export const getMoviesThunk = createAsyncThunk<TMDBResponse<IMovie>, { page: number, genreId?: string, query?: string }, { rejectValue: string }>(
    "movies/getMovies",
    async ({ page, genreId, query }, thunkAPI) => {
        try {
            if (query?.trim()) {
                return await searchMovies(query, page);
            }
            return await getMovies(page, genreId);
        } catch (e) {
            return thunkAPI.rejectWithValue("Не вдалося завантажити фільми");
        }
    }
);

export const getGenresThunk = createAsyncThunk<IGenre[], void, { rejectValue: string }>(
    "movies/getGenres",
    async (_, thunkAPI) => {
        try {
            const data = await getGenres();
            return data.genres;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не вдалося завантажити жанри");
        }
    }
);

export const getMovieDetailsThunk = createAsyncThunk<IMovieDetails, string, { rejectValue: string }>(
    "movies/getMovieDetails",
    async (id, thunkAPI) => {
        try {
            return await getMovieDetails(id);
        } catch (e) {
            return thunkAPI.rejectWithValue("Не вдалося завантажити деталі фільму");
        }
    }
);

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        clearSelectedMovie: (state) => {
            state.selectedMovie = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMoviesThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.loading = false;
                state.movies = action.payload.results;
                state.totalPages = action.payload.total_pages > 500 ? 500 : action.payload.total_pages;
                state.error = null;
            })
            .addCase(getGenresThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.loading = false;
                state.genres = action.payload;
                state.error = null;
            })
            .addCase(getMovieDetailsThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.loading = false;
                state.selectedMovie = action.payload;
                state.error = null;
            })
            .addMatcher(isPending(getMoviesThunk, getGenresThunk, getMovieDetailsThunk), (state) => {
                state.status = "loading";
                state.loading = true;
                state.error = null;
            })
            .addMatcher(isRejectedWithValue(getMoviesThunk, getGenresThunk, getMovieDetailsThunk), (state, action) => {
                state.status = "failed";
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setPage, clearSelectedMovie } = moviesSlice.actions;
export default moviesSlice.reducer;