import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { deleteReview, fetchMyReviews } from "../../store/reviewSlice"
import { STATUSES } from "../../globals/mis/statuses"

const MyReviews = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem("token")
  const { myReviews, status } = useSelector((state) => state.review)
  const [error, setError] = useState("")

  useEffect(() => {
    if (token) {
      dispatch(fetchMyReviews()).catch((reviewError) => {
        setError(reviewError.response?.data?.message || "Unable to load your reviews.")
      })
    }
  }, [dispatch, token])

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return
    setError("")
    try {
      await dispatch(deleteReview(reviewId))
    } catch (reviewError) {
      setError(reviewError.response?.data?.message || "Unable to delete review.")
    }
  }

  if (!token) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-yellow-50 px-6 py-16">
        <section className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-xl md:p-12">
          <h1 className="text-3xl font-bold text-yellow-900">Log in to view your reviews</h1>
          <Link to="/login" className="mt-8 block rounded-xl bg-yellow-600 px-6 py-3 font-semibold text-white">Go to login</Link>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-yellow-50 px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-700">Your feedback</p>
        <h1 className="mt-3 text-4xl font-bold text-yellow-900">My reviews</h1>
        <p className="mt-3 text-gray-600">Manage reviews you have written.</p>
        {error && <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
        {status === STATUSES.LOADING && <p className="mt-8 text-gray-500">Loading reviews...</p>}
        {status !== STATUSES.LOADING && myReviews.length === 0 && <p className="mt-8 rounded-3xl bg-white p-8 text-center text-gray-500 shadow-xl">You have not written any reviews yet.</p>}
        <div className="mt-8 space-y-5">
          {myReviews.map((review) => (
            <article key={review._id} className="rounded-3xl bg-white p-6 shadow-xl">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-yellow-900">{review.productId?.productName || "Product"}</h2>
                  <p className="mt-2 text-yellow-600">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</p>
                </div>
                <button type="button" onClick={() => handleDelete(review._id)} disabled={status === STATUSES.LOADING} className="rounded-xl border border-red-200 px-4 py-2 font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60">Delete review</button>
              </div>
              <p className="mt-4 text-gray-600">{review.message}</p>
              {review.productId?._id && <Link to={`/productdetails/${review.productId._id}`} className="mt-4 inline-block text-sm font-semibold text-red-600 hover:underline">View product</Link>}
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}

export default MyReviews
