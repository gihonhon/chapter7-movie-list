import { configureStore } from "@reduxjs/toolkit";
import moviesReduce from '../reducer/movieSlice';
import genresReduce from '../reducer/genres'

export const store = configureStore({
    reducer: {
        movies : moviesReduce,
        genres : genresReduce,
    }
});


