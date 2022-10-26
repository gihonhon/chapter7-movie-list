import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState={
    popular:[],
    loading: false,
};

export const getPopular = createAsyncThunk("movies/getPopular", async () => {
    const response = await axios.get("https://api.themoviedb.org/3/movie/popular", {
        params: {
            api_key: 'a2940e397cdc84f3a8a5619d3d65b9c5',
        },
    }).then((response) => {
        return response.data.results;
    });
    return response;
});

export const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: {
        [getPopular.pending]: (state) => {
            state.loading = true;
        },
        
        [getPopular.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.popular = payload;
        },

        [getPopular.rejected]: (state) => {
            state.loading = false;
        }
    }
});

export default movieSlice.reducer;