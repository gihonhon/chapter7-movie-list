import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDetail = createAsyncThunk("details/getDetails", async (id) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: {
            api_key: 'a2940e397cdc84f3a8a5619d3d65b9c5',
        },
    }).then((response) => {
        return response.data;
    });
    return response;
});

export const detailSlice = createSlice({
    name: "details",
    initialState: {
        details: [],
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getDetail.pending]: (state) => {
            state.loading = true;
        },

        [getDetail.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.details = payload;
        },

        [getDetail.rejected]: (state) => {
            state.loading = false;
        }
    }
});

export const getActors = createAsyncThunk("details/getActors", async (id) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
        params: {
            api_key: 'a2940e397cdc84f3a8a5619d3d65b9c5',
        }
    }).then((response) => {
        return response.data.cast.splice(0, 10);
    });
    return response;
});

export const actorSlice = createSlice({
    name: "actors",
    initialState: {
        actors: [],
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getActors.pending]: (state) => {
            state.loading = true;
        },

        [getActors.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.actors = payload;
        },

        [getActors.rejected]: (state) => {
            state.loading = false;
        },
    }
});

export const getReviews = createAsyncThunk("details/getReviews", async (id) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews`, {
        params: {
            api_key: 'a2940e397cdc84f3a8a5619d3d65b9c5',
        }
    }).then((response) => {
        return response.data;
    });
    return response;
});

export const reviewSlice = createSlice({
    name: "reviews",
    initialState: {
        reviews: [],
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getReviews.pending]: (state) => {
            state.loading = true;
        },

        [getReviews.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.reviews = payload;
        },

        [getReviews.rejected]: (state) => {
            state.loading = false;
        },
    }
});

export const getTrailers = createAsyncThunk("details/getTrailers", async (id) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
        params: {
            api_key: 'a2940e397cdc84f3a8a5619d3d65b9c5',
        },
    }).then((response) => {
        return response.data.results[0].key;
    });
    return response;
});

export const trailerSlice = createSlice({
    name: "trailers",
    initialState: {
        trailers: [],
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getTrailers.pending]: (state) => {
            state.loading = true;
        },

        [getTrailers.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.trailers = payload;
        },

        [getTrailers.rejected]: (state) => {
            state.loading = false;
        },
    }
});

export const detailsRedux = detailSlice.reducer;
export const actorRedux = actorSlice.reducer;
export const reviewRedux = reviewSlice.reducer;
export const trailerRedux = trailerSlice.reducer;