import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchMyProfile } from "../../../store/authSlice"
import { fetchAdminOrders, fetchAdminProducts, updateAdminOrderStatus } from "../../../store/adminSlice"
import { STATUSES } from "../../../globals/mis/statuses"

const ORDER_STATUSES = ["Pending", "Preparing", "On the way", "Shipped", "Delivered", "Cancelled", "Returned", "Refunded"]

const getErrorMessage = (error) => (
	error.response?.data?.message || "Something went wrong. Please try again."
)

const formatDate = (date) => new Date(date).toLocaleDateString(undefined, {
	year: "numeric",
	month: "short",
	day: "numeric",
})

const AdminDashboard = () => {
	const dispatch = useDispatch()
	const token = useSelector((state) => state.auth.token) || localStorage.getItem("token")
	const { data: user, status: authStatus } = useSelector((state) => state.auth)
	const { products, orders, status } = useSelector((state) => state.admin)

	const [error, setError] = useState("")
	const [updatingOrderId, setUpdatingOrderId] = useState("")

	useEffect(() => {
		if (!token) return
		if (!user || !user.userRole) {
			dispatch(fetchMyProfile()).catch((profileError) => setError(getErrorMessage(profileError)))
		}
	}, [dispatch, token, user])

	useEffect(() => {
		if (!token || user?.userRole !== "seller") return

		Promise.all([dispatch(fetchAdminProducts()), dispatch(fetchAdminOrders())]).catch((fetchError) => {
			setError(getErrorMessage(fetchError))
		})
	}, [dispatch, token, user])

	const stats = useMemo(() => {
		const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0)
		const pendingOrders = orders.filter((order) => order.orderStatus === "Pending").length
		const outOfStock = products.filter((product) => product.productStatus === "out-of-stock").length

		return {
			totalProducts: products.length,
			totalOrders: orders.length,
			pendingOrders,
			totalRevenue,
			outOfStock,
		}
	}, [products, orders])

	const handleStatusChange = async (orderId, orderStatus) => {
		setError("")
		setUpdatingOrderId(orderId)
		try {
			await dispatch(updateAdminOrderStatus(orderId, orderStatus))
			await dispatch(fetchAdminOrders())
		} catch (updateError) {
			setError(getErrorMessage(updateError))
		} finally {
			setUpdatingOrderId("")
		}
	}

	if (!token) {
		return (
			<main className="flex min-h-screen items-center justify-center bg-yellow-50 px-6 py-16">
				<section className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-xl md:p-12">
					<h1 className="text-3xl font-bold text-yellow-900">Log in to view the dashboard</h1>
					<p className="mt-3 text-gray-600">Only sellers can access the admin dashboard.</p>
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
			<div className="mx-auto max-w-6xl">
				<div className="mb-8">
					<p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-700">Admin</p>
					<h1 className="mt-3 text-4xl font-bold text-yellow-900">Admin dashboard</h1>
					<p className="mt-3 text-gray-600">Manage products and orders for the store.</p>
				</div>

				{error && <p className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p>}

				<div className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					<div className="rounded-3xl bg-white p-6 shadow-xl">
						<p className="text-sm font-semibold text-gray-500">Total products</p>
						<p className="mt-2 text-3xl font-bold text-yellow-900">{stats.totalProducts}</p>
					</div>
					<div className="rounded-3xl bg-white p-6 shadow-xl">
						<p className="text-sm font-semibold text-gray-500">Total orders</p>
						<p className="mt-2 text-3xl font-bold text-yellow-900">{stats.totalOrders}</p>
					</div>
					<div className="rounded-3xl bg-white p-6 shadow-xl">
						<p className="text-sm font-semibold text-gray-500">Pending orders</p>
						<p className="mt-2 text-3xl font-bold text-yellow-900">{stats.pendingOrders}</p>
					</div>
					<div className="rounded-3xl bg-white p-6 shadow-xl">
						<p className="text-sm font-semibold text-gray-500">Total revenue</p>
						<p className="mt-2 text-3xl font-bold text-yellow-900">₹{stats.totalRevenue.toFixed(2)}</p>
					</div>
				</div>

				{isLoading && <p className="mb-6 rounded-3xl bg-white p-8 text-center text-gray-600 shadow-xl">Loading dashboard data...</p>}

				<section className="mb-10 rounded-3xl bg-white p-6 shadow-xl md:p-8">
					<h2 className="text-2xl font-bold text-yellow-900">Orders</h2>
					{!isLoading && orders.length === 0 && (
						<p className="mt-4 text-gray-600">No orders have been placed yet.</p>
					)}
					{orders.length > 0 && (
						<div className="mt-6 overflow-x-auto">
							<table className="w-full text-left text-sm">
								<thead>
									<tr className="border-b border-yellow-100 text-gray-500">
										<th className="pb-3 pr-4 font-semibold">Order</th>
										<th className="pb-3 pr-4 font-semibold">Date</th>
										<th className="pb-3 pr-4 font-semibold">Total</th>
										<th className="pb-3 pr-4 font-semibold">Payment</th>
										<th className="pb-3 pr-4 font-semibold">Status</th>
									</tr>
								</thead>
								<tbody>
									{orders.map((order) => (
										<tr key={order._id} className="border-b border-yellow-50">
											<td className="py-3 pr-4 font-semibold text-yellow-900">#{order._id.slice(-8).toUpperCase()}</td>
											<td className="py-3 pr-4 text-gray-600">{formatDate(order.createdAt)}</td>
											<td className="py-3 pr-4 text-gray-600">₹{Number(order.totalAmount || 0).toFixed(2)}</td>
											<td className="py-3 pr-4 text-gray-600">{order.paymentDetails?.method} · {order.paymentDetails?.paymentStatus}</td>
											<td className="py-3 pr-4">
												<select
													value={order.orderStatus}
													disabled={updatingOrderId === order._id}
													onChange={(event) => handleStatusChange(order._id, event.target.value)}
													className="rounded-lg border border-yellow-200 px-3 py-2 text-sm font-semibold text-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
												>
													{ORDER_STATUSES.map((option) => (
														<option key={option} value={option}>{option}</option>
													))}
												</select>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</section>

				<section className="rounded-3xl bg-white p-6 shadow-xl md:p-8">
					<div className="flex flex-wrap items-center justify-between gap-4">
						<h2 className="text-2xl font-bold text-yellow-900">Products</h2>
						<Link to="/admin/products/add" className="rounded-xl bg-yellow-600 px-5 py-2.5 font-semibold text-white transition hover:bg-yellow-500">
							Add product
						</Link>
					</div>
					{!isLoading && products.length === 0 && (
						<p className="mt-4 text-gray-600">No products have been added yet.</p>
					)}
					{products.length > 0 && (
						<div className="mt-6 overflow-x-auto">
							<table className="w-full text-left text-sm">
								<thead>
									<tr className="border-b border-yellow-100 text-gray-500">
										<th className="pb-3 pr-4 font-semibold">Product</th>
										<th className="pb-3 pr-4 font-semibold">Price</th>
										<th className="pb-3 pr-4 font-semibold">Stock</th>
										<th className="pb-3 pr-4 font-semibold">Status</th>
									</tr>
								</thead>
								<tbody>
									{products.map((product) => (
										<tr key={product._id} className="border-b border-yellow-50">
											<td className="py-3 pr-4 font-semibold text-yellow-900">{product.productName}</td>
											<td className="py-3 pr-4 text-gray-600">₹{Number(product.productPrice || 0).toFixed(2)}</td>
											<td className="py-3 pr-4 text-gray-600">{product.productStockQty}</td>
											<td className="py-3 pr-4">
												<span className={`rounded-full px-3 py-1 text-xs font-semibold ${product.productStatus === "in-stock" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
													{product.productStatus}
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</section>

				<section className="rounded-3xl bg-white p-6 shadow-xl md:p-8">
					<div className="flex flex-wrap items-center justify-between gap-4">
						<h2 className="text-2xl font-bold text-yellow-900">Reviews</h2>
						<Link to="/admin/reviews" className="font-semibold text-yellow-800 hover:text-yellow-700">View all reviews →</Link>
					</div>
					<p className="mt-4 text-gray-600">Browse everything customers have said about your products.</p>
				</section>
			</div>
		</main>
	)
}

export default AdminDashboard
