import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../globals/mis/statuses";
import { API, APIAuth } from "../http";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        products: [],
        orders: [],
        reviews: [],
        status: STATUSES.SUCCESS,
    },
    reducers: {
        setAdminProducts(state, action) {
            state.products = action.payload;
        },
        setAdminOrders(state, action) {
            state.orders = action.payload;
        },
        setAdminReviews(state, action) {
            state.reviews = action.payload;
        },
        setAdminStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const { setAdminProducts, setAdminOrders, setAdminReviews, setAdminStatus } = adminSlice.actions;

export default adminSlice.reducer;

export function fetchAdminProducts() {
    return async function fetchAdminProductsThunk(dispatch) {
        dispatch(setAdminStatus(STATUSES.LOADING));
        try {
            const res = await API.get("/globals/products");
            dispatch(setAdminProducts(res.data.data));
            dispatch(setAdminStatus(STATUSES.SUCCESS));
        } catch (error) {
            dispatch(setAdminStatus(STATUSES.ERROR));
            throw error;
        }
    };
}

export function fetchAdminOrders() {
    return async function fetchAdminOrdersThunk(dispatch) {
        dispatch(setAdminStatus(STATUSES.LOADING));
        try {
            const res = await APIAuth.get("/admin/order");
            dispatch(setAdminOrders(res.data.data));
            dispatch(setAdminStatus(STATUSES.SUCCESS));
        } catch (error) {
            if (error.response?.status === 404) {
                dispatch(setAdminOrders([]));
                dispatch(setAdminStatus(STATUSES.SUCCESS));
                return;
            }
            dispatch(setAdminStatus(STATUSES.ERROR));
            throw error;
        }
    };
}

export function fetchAdminReviews() {
    return async function fetchAdminReviewsThunk(dispatch) {
        dispatch(setAdminStatus(STATUSES.LOADING));
        try {
            const res = await APIAuth.get("/admin/review");
            dispatch(setAdminReviews(res.data.data));
            dispatch(setAdminStatus(STATUSES.SUCCESS));
        } catch (error) {
            if (error.response?.status === 404) {
                dispatch(setAdminReviews([]));
                dispatch(setAdminStatus(STATUSES.SUCCESS));
                return;
            }
            dispatch(setAdminStatus(STATUSES.ERROR));
            throw error;
        }
    };
}

export function updateAdminOrderStatus(orderId, orderStatus) {
    return async function updateAdminOrderStatusThunk() {
        const res = await APIAuth.patch(`/admin/order/${orderId}`, { orderStatus });
        return res.data;
    };
}

export function deleteAdminProduct(productId) {
    return async function deleteAdminProductThunk() {
        const res = await APIAuth.delete(`/admin/product/products/${productId}`);
        return res.data;
    };
}

export function createAdminProduct(formData) {
    return async function createAdminProductThunk() {
        // Let the browser set the multipart boundary; the instance's default JSON header must not be sent.
        const res = await APIAuth.post("/admin/product/create", formData, {
            headers: { "Content-Type": undefined },
        });
        return res.data;
    };
}
