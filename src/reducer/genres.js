import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    genres: [],
    loading: false
};

export const getGenres = createAsyncThunk("genres/getGenres", async () => {
    const response = await axios.get("https://api.themoviedb.org/3/genre/movie/list", {
        params: {
            api_key: 'a2940e397cdc84f3a8a5619d3d65b9c5',
        }
    }).then((response) => {
        return response.data.genres;
    });
    return response;
});

export const genreSliece = createSlice({
    name: "genres",
    initialState,
    reducers: {},
    extraReducers: {
        [getGenres.pending]: (state) => {
            state.loading = true;
        },

        [getGenres.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.genres = payload
        },

        [getGenres.rejected]: (state) => {
            state.loading = false;
        }
    }
});

export default genreSliece.reducer