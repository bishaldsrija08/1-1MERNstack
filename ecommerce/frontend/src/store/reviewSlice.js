import { createSlice } from "@reduxjs/toolkit"
import { API, APIAuth } from "../http"
import { STATUSES } from "../globals/mis/statuses"

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    productReviews: [],
    myReviews: [],
    status: STATUSES.SUCCESS,
  },
  reducers: {
    setProductReviews(state, action) {
      state.productReviews = action.payload || []
    },
    setMyReviews(state, action) {
      state.myReviews = action.payload || []
    },
    setStatus(state, action) {
      state.status = action.payload
    },
    removeReview(state, action) {
      state.productReviews = state.productReviews.filter((review) => review._id !== action.payload)
      state.myReviews = state.myReviews.filter((review) => review._id !== action.payload)
    },
  },
})

export const { setProductReviews, setMyReviews, setStatus, removeReview } = reviewSlice.actions
export default reviewSlice.reducer

export function fetchProductReviews(productId) {
  return async function fetchProductReviewsThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING))
    try {
      const res = await API.get(`/user/review/all-reviews/${productId}`)
      dispatch(setProductReviews(res.data.data || []))
      dispatch(setStatus(STATUSES.SUCCESS))
      return res.data.data || []
    } catch (error) {
      if (error.response?.status === 404) {
        dispatch(setProductReviews([]))
        dispatch(setStatus(STATUSES.SUCCESS))
        return []
      }
      dispatch(setStatus(STATUSES.ERROR))
      throw error
    }
  }
}

export function createReview(productId, data) {
  return async function createReviewThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING))
    try {
      const res = await APIAuth.post(`/user/review/create/${productId}`, data)
      dispatch(setStatus(STATUSES.SUCCESS))
      return res.data
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR))
      throw error
    }
  }
}

export function fetchMyReviews() {
  return async function fetchMyReviewsThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING))
    try {
      const res = await APIAuth.get("/user/review/myreview")
      dispatch(setMyReviews(res.data.data || []))
      dispatch(setStatus(STATUSES.SUCCESS))
      return res.data.data || []
    } catch (error) {
      if (error.response?.status === 404) {
        dispatch(setMyReviews([]))
        dispatch(setStatus(STATUSES.SUCCESS))
        return []
      }
      dispatch(setStatus(STATUSES.ERROR))
      throw error
    }
  }
}

export function deleteReview(reviewId) {
  return async function deleteReviewThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING))
    try {
      const res = await APIAuth.delete(`/user/review/delete/${reviewId}`)
      dispatch(removeReview(reviewId))
      dispatch(setStatus(STATUSES.SUCCESS))
      return res.data
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR))
      throw error
    }
  }
}
