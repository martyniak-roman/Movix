import {configureStore} from "@reduxjs/toolkit";
import moviesReducer from "../slices/movieSlice.ts";

export const store = configureStore({
    reducer: {
        movies: moviesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;