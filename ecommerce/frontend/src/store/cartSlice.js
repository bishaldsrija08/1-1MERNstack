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
            state.items = action.payload || []
        },
        setStatus(state, action) {
            state.status = action.payload
        },
        updateItems(state, action){
            const index = state.items.findIndex(item => (item.product?._id || item._id || item) === action.payload.productId);
            if (index !== -1) {
                if (typeof state.items[index] === 'object' && state.items[index] !== null) {
                    state.items[index].quantity = action.payload.quantity;
                }
            }
        },
        deleteItem(state, action){
            const index = state.items.findIndex(item => (item.product?._id || item._id || item) === action.payload.productId);
            if (index !== -1) {
                state.items.splice(index, 1);
            }
        },
        emptyCart(state){
            state.items = []
        }
    }})
export const { setItems, setStatus, updateItems, deleteItem, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;

export function addToCart(productId){
    return async function addToCartThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try{
            const res = await APIAuth.post(`/user/cart/add/${productId}`)
            if (res.data.data || res.data.cartItems) {
                dispatch(setItems(res.data.data || res.data.cartItems))
            } else {
                dispatch(fetchCartItems())
            }
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
            const res = await APIAuth.get("/user/cart")
            dispatch(setItems(res.data.data || res.data.cartItems || []))
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
            await APIAuth.delete(`/user/cart/remove/${productId}`)
            dispatch(deleteItem({ productId }))
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
            const res = await APIAuth.patch(`/user/cart/update/${productId}`, {quantity})
            if (res.data.cartItems) {
                dispatch(setItems(res.data.cartItems))
            } else {
                dispatch(updateItems({productId, quantity}))
            }
            dispatch(setStatus(STATUSES.SUCCESS))
        }catch(err){
            console.log(err)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}