import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../globals/mis/statuses";
import { APIAuth } from "../http";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        status: STATUSES.SUCCESS
    },
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },
        setStatus(state, action) {
            state.status = action.payload
        },
        updateItems(state, action){
            
        },
        deleteItem(state, action){

        },
        emptyCart(state, action){
            state.items = []
        }
    }})
export const { setItems, setStatus, updateItems, deleteItem, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;

export function addToCart(productId){
    return async function addToCartThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try{
            const res = await APIAuth.post(`/cart/add/${productId}`)
            dispatch(setItems(res.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        }catch(err){
            console.log(err)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function fetchCartItems(){
    return async function fetchCartItemsThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try{
            const res = await APIAuth.get("/cart")
            dispatch(setItems(res.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        }catch(err){
            console.log(err)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function deleteCartItem(productId){
    return async function deleteCartItemThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try{
            const res = await APIAuth.delete(`/cart/delete/${productId}`)
            dispatch(deleteItem(res.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        }catch(err){
            console.log(err)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function updateCartItem(productId, quantity){
    return async function updateCartItemThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try{
            const res = await APIAuth.put(`/cart/update/${productId}`, {quantity})
            dispatch(updateItems({productId, quantity}))
            dispatch(setStatus(STATUSES.SUCCESS))
        }catch(err){
            console.log(err)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}