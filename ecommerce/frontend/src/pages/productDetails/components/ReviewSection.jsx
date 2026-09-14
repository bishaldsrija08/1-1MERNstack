import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { createReview, fetchProductReviews } from "../../../store/reviewSlice"
import { STATUSES } from "../../../globals/mis/statuses"

const ReviewSection = ({ productId }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token) || localStorage.getItem("token")
  const { productReviews, status } = useSelector((state) => state.review)
  const [rating, setRating] = useState(5)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductReviews(productId))
    }
  }, [dispatch, productId, token])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")
    setSuccess("")

    if (!token) {
      navigate("/login")
      return
    }

    if (!message.trim()) {
      setError("Please write a review before submitting.")
      return
    }

    try {
      await dispatch(createReview(productId, { rating: Number(rating), message: message.trim() }))
      setMessage("")
      setRating(5)
      await dispatch(fetchProductReviews(productId))
      setSuccess("Review added successfully.")
    } catch (reviewError) {
      setError(reviewError.response?.data?.message || "Unable to create review.")
    }
  }

  return (
    <section className="container px-5 pb-16 mx-auto lg:w-4/5">
      <div className="border-t border-gray-200 pt-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Customer reviews</h2>
            <p className="mt-2 text-sm text-gray-500">{productReviews.length} review{productReviews.length === 1 ? "" : "s"}</p>
          </div>
          {!token && <Link to="/login" className="text-sm font-semibold text-red-600 hover:underline">Log in to review</Link>}
        </div>

        {status === STATUSES.LOADING && <p className="mt-6 text-sm text-gray-500">Loading reviews...</p>}
        {status !== STATUSES.LOADING && productReviews.length === 0 && <p className="mt-6 text-sm text-gray-500">No reviews yet. Be the first to review this product.</p>}

        <div className="mt-6 space-y-4">
          {productReviews.map((review) => (
            <article key={review._id} className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="font-semibold text-gray-900">{review.userId?.userName || "Customer"}</p>
                <p className="text-sm text-yellow-600">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</p>
              </div>
              <p className="mt-2 text-gray-600">{review.message}</p>
            </article>
          ))}
        </div>

        {token && (
          <form onSubmit={handleSubmit} className="mt-8 max-w-xl space-y-4 rounded-xl bg-yellow-50 p-5">
            <h3 className="font-bold text-gray-900">Write a review</h3>
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
              <select id="rating" value={rating} onChange={(event) => setRating(event.target.value)} className="mt-2 rounded-lg border border-yellow-200 bg-white px-3 py-2">
                {[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} / 5</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="reviewMessage" className="block text-sm font-medium text-gray-700">Review</label>
              <textarea id="reviewMessage" rows={4} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Share your experience" className="mt-2 w-full rounded-lg border border-yellow-200 bg-white px-3 py-2" />
            </div>
            <button type="submit" disabled={status === STATUSES.LOADING} className="rounded-lg bg-red-500 px-5 py-2 font-semibold text-white hover:bg-red-600 disabled:opacity-60">Submit review</button>
          </form>
        )}
        {success && <p className="mt-4 text-sm font-medium text-green-700">{success}</p>}
        {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}
      </div>
    </section>
  )
}

export default ReviewSection
