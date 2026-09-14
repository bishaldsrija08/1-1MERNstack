import { createSlice } from '@reduxjs/toolkit';
import { STATUSES } from '../globals/mis/statuses';
import { API, APIAuth } from '../http';

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
        logOut(state) {
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
        dispatch(setForgotPasswordStatus(STATUSES.LOADING));
        try {
            const res = await API.post("auth/forgot-password", data);
            dispatch(setForgotPasswordStatus(STATUSES.SUCCESS));
            return res.data;
        } catch (error) {
            dispatch(setForgotPasswordStatus(STATUSES.ERROR));
            throw error;
        }
    }
}

export function verifyOtp(data) {
    return async function verifyOtpThunk(dispatch) {
        dispatch(setForgotPasswordStatus(STATUSES.LOADING));
        try {
            const res = await API.post("auth/verify-otp", data);
            dispatch(setForgotPasswordStatus(STATUSES.SUCCESS));
            return res.data;
        } catch (error) {
            dispatch(setForgotPasswordStatus(STATUSES.ERROR));
            throw error;
        }
    }
}

export function resetPassword(data) {
    return async function resetPasswordThunk(dispatch) {
        dispatch(setForgotPasswordStatus(STATUSES.LOADING));
        try {
            const res = await API.post("auth/reset-password", data);
            dispatch(setForgotPasswordStatus(STATUSES.SUCCESS));
            return res.data;
        } catch (error) {
            dispatch(setForgotPasswordStatus(STATUSES.ERROR));
            throw error;
        }
    }
}

export function fetchMyProfile() {
    return async function fetchMyProfileThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const res = await APIAuth.get("user/my-profile");
            dispatch(setUser(res.data.data));
            dispatch(setStatus(STATUSES.SUCCESS));
            return res.data.data;
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            throw error;
        }
    }
}

export function updateMyProfile(data) {
    return async function updateMyProfileThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const res = await APIAuth.patch("user/my-profile", data);
            dispatch(setUser(res.data.data));
            dispatch(setStatus(STATUSES.SUCCESS));
            return res.data.data;
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            throw error;
        }
    }
}

export function updateMyPassword(data) {
    return async function updateMyPasswordThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const res = await APIAuth.patch("user/my-profile/update-password", data);
            dispatch(setStatus(STATUSES.SUCCESS));
            return res.data;
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            throw error;
        }
    }
}

export function deleteMyProfile() {
    return async function deleteMyProfileThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const res = await APIAuth.delete("user/my-profile");
            localStorage.removeItem("token");
            dispatch(logOut());
            return res.data;
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            throw error;
        }
    }
}