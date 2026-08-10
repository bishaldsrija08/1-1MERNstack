import { createSlice } from '@reduxjs/toolkit';
import { STATUSES } from '../globals/mis/statuses';

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

export default authSlice.reducer;