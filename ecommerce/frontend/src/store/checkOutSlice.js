import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../globals/mis/statuses";
import { APIAuth } from "../http";
import { emptyCart } from "./cartSlice";

const checkOutSlice = createSlice({
    name: "checkOut",
    initialState: {
        order: null,
        orders: [],
        status: STATUSES.SUCCESS
    },
    reducers: {
        setOrder(state, action) {
            state.order = action.payload
        },
        setOrders(state, action) {
            state.orders = action.payload || []
        },
        setStatus(state, action) {
            state.status = action.payload
        }
    }
})

export const { setOrder, setOrders, setStatus } = checkOutSlice.actions;

export default checkOutSlice.reducer;

export function placeOrder({ orderItems, totalAmount, shippingAddress, paymentDetails }) {
    return async function placeOrderThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const res = await APIAuth.post("/user/order", {
                orderItems,
                totalAmount,
                shippingAddress,
                paymentDetails
            })
            dispatch(setOrder(res.data.data))
            dispatch(emptyCart())
            dispatch(setStatus(STATUSES.SUCCESS))
            return res.data.data
        } catch (err) {
            console.log(err)
            dispatch(setStatus(STATUSES.ERROR))
            throw err
        }
    }
}

export function fetchMyOrders() {
    return async function fetchMyOrdersThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const res = await APIAuth.get("/user/order")
            dispatch(setOrders(res.data.data || []))
            dispatch(setStatus(STATUSES.SUCCESS))
            return res.data.data || []
        } catch (error) {
            if (error.response?.status === 404) {
                dispatch(setOrders([]))
                dispatch(setStatus(STATUSES.SUCCESS))
                return []
            }
            dispatch(setStatus(STATUSES.ERROR))
            throw error
        }
    }
}

export function updateMyOrder(orderId, data) {
    return async function updateMyOrderThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const res = await APIAuth.patch(`/user/order/${orderId}`, data)
            dispatch(setStatus(STATUSES.SUCCESS))
            return res.data
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
            throw error
        }
    }
}

export function deleteMyOrder(orderId) {
    return async function deleteMyOrderThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const res = await APIAuth.delete(`/user/order/${orderId}`)
            dispatch(setStatus(STATUSES.SUCCESS))
            return res.data
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
            throw error
        }
    }
}
