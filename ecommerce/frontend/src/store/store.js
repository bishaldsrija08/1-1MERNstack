import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import checkOutSlice from "./checkOutSlice";
import reviewSlice from "./reviewSlice";
import adminSlice from "./adminSlice";

const store = configureStore({
    reducer:{
        auth: authSlice,
        product: productSlice,
        cart: cartSlice,
        checkOut: checkOutSlice
        ,review: reviewSlice
        ,admin: adminSlice
    }
})

export default store;