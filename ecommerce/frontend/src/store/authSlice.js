import { createSlice } from '@reduxjs/toolkit';
import { STATUSES } from '../globals/mis/statuses';
import { API } from '../http';

const authSlice = createSlice({
    name: "auth",
    initialState: {
        data: [],
        status: STATUSES.SUCCESS,
        token: "",
        forgotPasswordData: {
            email: null,
            status: STATUSES.SUCCESS
        }
    },
    reducers: {
        setUser(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
        setEmail(state, action) {
            state.forgotPasswordData.email = action.payload;
        },
        logOut(state, action) {
            state.data = [];
            state.token = "";
            state.status = STATUSES.SUCCESS;
        },
        setForgotPasswordStatus(state, action) {
            state.forgotPasswordData.status = action.payload;
        }
    }
})

export const { setUser, setStatus, setToken, logOut, setEmail, setForgotPasswordStatus } = authSlice.actions;

export default authSlice.reducer;

// Thunks to handle async actions
export function registerUser(userData) {
    return async function registerUserThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const res = await API.post("auth/register", userData);
            if (res.status === 201) {
                alert("Registration successful! Please log in.");
                dispatch(setStatus(STATUSES.SUCCESS));
                dispatch(setUser(res.data.user));
            }else{
                dispatch(setStatus(STATUSES.ERROR));
                alert("Registration failed. Please try again.");
            }
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            console.log(error);
        }
    }
}

// login user thunk
export function loginUser(userData) {
    return async function loginUserThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const res = await API.post("auth/login", userData);
            console.log(res, "hoki kyaho")
            if (res.status == 200) {
                localStorage.setItem("token", res.data.token);
                dispatch(setStatus(STATUSES.SUCCESS));
                dispatch(setUser(res.data.user));
                dispatch(setToken(res.data.token));
            } else {
                dispatch(setStatus(STATUSES.ERROR));
                alert("Invalid email or password. Please try again.");
            }
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            console.log(error);
        }
    }
}

// forgot password
export function forgotPassword(data) {
    return async function forgotPasswordThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const res = await API.post("auth/forgot-password", data);
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            console.log(error);
        }
    }
}