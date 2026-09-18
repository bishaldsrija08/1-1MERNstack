import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchMyProfile } from "../../../store/authSlice"
import { fetchAdminReviews } from "../../../store/adminSlice"
import { STATUSES } from "../../../globals/mis/statuses"

const getErrorMessage = (error) => (
	error.response?.data?.message || "Something went wrong. Please try again."
)

const formatDate = (date) => new Date(date).toLocaleDateString(undefined, {
	year: "numeric",
	month: "short",
	day: "numeric",
})

const AllReviews = () => {
	const dispatch = useDispatch()
	const token = useSelector((state) => state.auth.token) || localStorage.getItem("token")
	const { data: user, status: authStatus } = useSelector((state) => state.auth)
	const { reviews, status } = useSelector((state) => state.admin)

	useEffect(() => {
		if (!token) return
		if (!user || !user.userRole) {
			dispatch(fetchMyProfile())
		}
	}, [dispatch, token, user])

	useEffect(() => {
		if (!token || user?.userRole !== "seller") return
		dispatch(fetchAdminReviews())
	}, [dispatch, token, user])

	if (!token) {
		return (
			<main className="flex min-h-screen items-center justify-center bg-yellow-50 px-6 py-16">
				<section className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-xl md:p-12">
					<h1 className="text-3xl font-bold text-yellow-900">Log in to view reviews</h1>
					<p className="mt-3 text-gray-600">Only sellers can access this page.</p>
					<Link to="/login" className="mt-8 block rounded-xl bg-yellow-600 px-6 py-3 font-semibold text-white hover:bg-yellow-500">Go to login</Link>
				</section>
			</main>
		)
	}

	if (authStatus === STATUSES.LOADING || !user || !user.userRole) {
		return (
			<main className="flex min-h-screen items-center justify-center bg-yellow-50 px-6 py-16">
				<p className="rounded-3xl bg-white p-8 text-center text-gray-600 shadow-xl">Loading...</p>
			</main>
		)
	}

	if (user.userRole !== "seller") {
		return (
			<main className="flex min-h-screen items-center justify-center bg-yellow-50 px-6 py-16">
				<section className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-xl md:p-12">
					<h1 className="text-3xl font-bold text-yellow-900">Access denied</h1>
					<p className="mt-3 text-gray-600">This page is only available to admin (seller) accounts.</p>
					<Link to="/" className="mt-8 block rounded-xl bg-yellow-600 px-6 py-3 font-semibold text-white hover:bg-yellow-500">Back to home</Link>
				</section>
			</main>
		)
	}

	const isLoading = status === STATUSES.LOADING

	return (
		<main className="min-h-screen bg-yellow-50 px-6 pb-16 pt-32">
			<div className="mx-auto max-w-4xl">
				<div className="mb-8 flex flex-wrap items-center justify-between gap-4">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-700">Admin</p>
						<h1 className="mt-3 text-4xl font-bold text-yellow-900">All reviews</h1>
						<p className="mt-3 text-gray-600">Reviews submitted by customers across all products.</p>
					</div>
					<Link to="/admin/dashboard" className="font-semibold text-yellow-800 hover:text-yellow-700">Back to dashboard</Link>
				</div>

				<section className="rounded-3xl bg-white p-6 shadow-xl md:p-8">
					{isLoading && <p className="text-gray-600">Loading reviews...</p>}
					{!isLoading && reviews.length === 0 && (
						<p className="text-gray-600">No reviews have been submitted yet.</p>
					)}
					{!isLoading && reviews.length > 0 && (
						<div className="space-y-4">
							{reviews.map((review) => (
								<article key={review._id} className="rounded-xl border border-yellow-100 p-4">
									<div className="flex flex-wrap items-center justify-between gap-2">
										<p className="font-semibold text-yellow-900">{review.productId?.productName || "Product"}</p>
										<p className="text-sm text-yellow-600">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</p>
									</div>
									<p className="mt-1 text-sm text-gray-500">By {review.userId?.userName || "Customer"} on {formatDate(review.createdAt)}</p>
									<p className="mt-2 text-gray-700">{review.message}</p>
								</article>
							))}
						</div>
					)}
				</section>
			</div>
		</main>
	)
}

export default AllReviews
