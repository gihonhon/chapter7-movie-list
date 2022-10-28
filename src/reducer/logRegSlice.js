import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

export const onLogin = createAsyncThunk("login/onLogin", async (values) => {
    // const dataLoad = {
    //     email: values.email,
    //     password: values.password,
    // }; 
    const response = await axios.post("https://notflixtv.herokuapp.com/api/v1/users/login",
    {
        email: values.email,
        password: values.password,
    }
    ).then((response) => {
        return response;
    });
    return response;
});

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [onLogin.pending]: (state) => {
            state.loading = true;
        },

        [onLogin.fulfilled]: (state, { payload }) => {
            state.loading = false;
            localStorage.setItem("token", JSON.stringify(payload.data.data.token));
            localStorage.setItem("name", JSON.stringify(payload.data.data.first_name));
            localStorage.setItem("image", JSON.stringify(payload.data.data.image));
            Swal.fire("Login Success", "Accepted", "success");
            setTimeout(function () {
                window.location.reload(1);
            }, 1500);
        },

        [onLogin.rejected]: (state) => {
            state.loading = false;
        },
    }
});

export const onRegister = createAsyncThunk("register/onRegister", async (values) => {
    const response = await axios.post("https://notflixtv.herokuapp.com/api/v1/users",
    {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
        password_confirmation: values.confirm_password,
    },
    ).then((response) => {
        return response;
    });
    return response;
});

export const registerSlice = createSlice({
    name: "register",
    initialState: {
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [onRegister.pending]: (state) => {
            state.loading = true;
        },

        [onRegister.fulfilled]: (state, { payload }) => {
            state.loading = false;
            Swal.fire("Login Success", "Accepted", "success");
            setTimeout(function () {
                window.location.reload(1);
            }, 1500);
        },

        [onRegister.rejected]: (state) => {
            state.loading = false;
        }
    }
});

export const loginRedux = loginSlice.reducer;
export const registerRedux = registerSlice.reducer;

