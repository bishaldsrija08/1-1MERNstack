import { createSlice } from '@reduxjs/toolkit';
import { STATUSES } from '../globals/mis/statuses';
import { API } from '../http';

const authSlice = createSlice({
    name: "auth",
    initialState:{
        data: null,
        status:STATUSES.SUCCESS,
        token: null
    },
    reducers: {
        setUser(state, action){
            state.data = action.payload;
        },
        setStatus(state, action){
            state.status = action.payload;
        },
        setToken(state,action){
            state.token = action.payload;
        }
    }
})

export const {setUser, setStatus, setToken} = authSlice.actions;


// Thunks to handle async actions
export function registerUser(userData){
    return async function registerUserThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING));
        try{
            const res = await API.post("auth/register", userData);
            dispatch(setUser(res.data.user));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            console.log(error);
        }
    }
}

// login user thunk
export function loginUser(credentials){
    return async function loginUserThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING));
        try{
            const res = await API.post("auth/login", credentials);
            dispatch(setUser(res.data.user));
            dispatch(setToken(res.data.token));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            console.log(error);
        }
    }
}

// forgot password
export function forgotPassword(data){
    return async function forgotPasswordThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING));
        try{
            const res = await API.post("auth/forgot-password", data);
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            console.log(error);
        }
    }
}
export default authSlice.reducer;