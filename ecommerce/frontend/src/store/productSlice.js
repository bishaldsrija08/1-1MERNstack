import {createSlice} from "@reduxjs/toolkit";
import { STATUSES } from "../globals/mis/statuses";
import { API } from "../http";

const productSlice = createSlice({
    name: "product",
    initialState:{
        data: [],
        status: STATUSES.SUCCESS,
        selectedProduct: {}
    },
    reducers:{
        setProducts(state, action){
            state.data = action.payload;
        },
        setStatus(state, action){
            state.status = action.payload;
        },
        setSelectedProduct(state, action){
            state.selectedProduct = action.payload;
        }
    }
})

// actions
export const {setProducts, setStatus, setSelectedProduct} = productSlice.actions;

// reducer
export default productSlice.reducer;


// fetchProduct

// fetchProductDetails
export function fetchProducts(productId){
    return async function fetchProductThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING));
        try{
            const res = await API.get(`/globals/products/${productId}`);
            dispatch(setSelectedProduct(res.data.data));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
            console.log(error);
        }
    }
}