import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getSearch = createAsyncThunk("search/getSearch", async (que) => {
    const response = await axios.get("https://api.themoviedb.org/3/search/movie", {
        params: {
            api_key: 'a2940e397cdc84f3a8a5619d3d65b9c5',
            query: `${que}`,
        }
    }).then((response) => {
        return response.data.results;
    });
    return response;
});

export const searchSlice = createSlice({
    name: "searchs",
    initialState: {
        searchs: [],
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getSearch.pending]: (state) => {
            state.loading = true;
        },

        [getSearch.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.searchs = payload;
        },

        [getSearch.rejected]: (state) => {
            state.loading = false;
        },
    }
});

export const searchCategory = createAsyncThunk("search/searchCategory", async (category) => {
    const response = await axios.get("https://api.themoviedb.org/3/search/movie", {
        params: {
            api_key: 'a2940e397cdc84f3a8a5619d3d65b9c5',
            query: `${category}`
        }
    }).then((response) => {
        return response.data.results;
    });
    return response;
});

export const searchCategorySlice = createSlice({
    name: "categorys",
    initialState: {
        categorys: [],
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [searchCategory.pending]: (state) => {
            state.loading = true;
        },

        [searchCategory.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.categorys = payload;
        },

        [searchCategory.rejected]: (state) => {
            state.loading = false;
        },
    }
});

export const searchRedux = searchSlice.reducer;
export const searchCategoryRedux = searchCategorySlice.reducer;