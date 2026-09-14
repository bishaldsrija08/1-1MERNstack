import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { deleteMyOrder, fetchMyOrders, updateMyOrder } from "../../store/checkOutSlice"
import { STATUSES } from "../../globals/mis/statuses"

const getErrorMessage = (error) => (
	error.response?.data?.message || "Unable to load your orders. Please try again."
)

const formatDate = (date) => new Date(date).toLocaleDateString(undefined, {
	year: "numeric",
	month: "short",
	day: "numeric",
})

const MyOrder = () => {
	const dispatch = useDispatch()
	const { orders, status } = useSelector((state) => state.checkOut)
	const token = localStorage.getItem("token")
	const [error, setError] = useState("")
	const [editingOrderId, setEditingOrderId] = useState("")
	const [shippingAddress, setShippingAddress] = useState("")

	useEffect(() => {
		if (!token) return

		dispatch(fetchMyOrders()).catch((orderError) => {
			setError(getErrorMessage(orderError))
		})
	}, [dispatch, token])

	if (!token) {
		return (
			<main className="flex min-h-screen items-center justify-center bg-yellow-50 px-6 py-16">
				<section className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-xl md:p-12">
					<h1 className="text-3xl font-bold text-yellow-900">Log in to view your orders</h1>
					<p className="mt-3 text-gray-600">Your order history is available after signing in.</p>
					<Link to="/login" className="mt-8 block rounded-xl bg-yellow-600 px-6 py-3 font-semibold text-white hover:bg-yellow-500">Go to login</Link>
				</section>
			</main>
		)
	}

	const isLoading = status === STATUSES.LOADING

	const startEditing = (order) => {
		setEditingOrderId(order._id)
		setShippingAddress(order.shippingAddress || "")
		setError("")
	}

	const handleUpdate = async (order) => {
		if (!shippingAddress.trim()) {
			setError("Shipping address is required.")
			return
		}

		setError("")
		try {
			await dispatch(updateMyOrder(order._id, {
				shippingAddress: shippingAddress.trim(),
				orderItems: order.orderItems.map((item) => ({
					productId: item.productId._id || item.productId,
					quantity: item.quantity,
				})),
			}))
			setEditingOrderId("")
			await dispatch(fetchMyOrders())
		} catch (updateError) {
			setError(getErrorMessage(updateError))
		}
	}

	const handleDelete = async (orderId) => {
		if (!window.confirm("Are you sure you want to delete this order?")) return

		setError("")
		try {
			await dispatch(deleteMyOrder(orderId))
			await dispatch(fetchMyOrders())
		} catch (deleteError) {
			setError(getErrorMessage(deleteError))
		}
	}

	return (
		<main className="min-h-screen bg-yellow-50 px-6 py-16">
			<div className="mx-auto max-w-5xl">
				<div className="mb-8">
					<p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-700">Order history</p>
					<h1 className="mt-3 text-4xl font-bold text-yellow-900">My orders</h1>
					<p className="mt-3 text-gray-600">Review your purchases and delivery details.</p>
				</div>

				{error && <p className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p>}
				{isLoading && <p className="rounded-3xl bg-white p-8 text-center text-gray-600 shadow-xl">Loading your orders...</p>}

				{!isLoading && !error && orders.length === 0 && (
					<section className="rounded-3xl bg-white p-10 text-center shadow-xl">
						<h2 className="text-2xl font-bold text-yellow-900">No orders yet</h2>
						<p className="mt-3 text-gray-600">Your completed purchases will appear here.</p>
						<Link to="/" className="mt-8 inline-block rounded-xl bg-yellow-600 px-6 py-3 font-semibold text-white hover:bg-yellow-500">Start shopping</Link>
					</section>
				)}

				{!isLoading && !error && orders.length > 0 && (
					<div className="space-y-6">
						{orders.map((order) => (
							<article key={order._id} className="rounded-3xl bg-white p-6 shadow-xl md:p-8">
								<div className="flex flex-wrap items-start justify-between gap-4 border-b border-yellow-100 pb-5">
									<div>
										<p className="text-sm text-gray-500">Order placed {formatDate(order.createdAt)}</p>
										<h2 className="mt-1 text-lg font-bold text-yellow-900">Order #{order._id.slice(-8).toUpperCase()}</h2>
									</div>
									<span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-800">{order.orderStatus}</span>
								</div>

								<div className="mt-6 grid gap-6 md:grid-cols-[1fr_240px]">
									<div className="space-y-4">
										{order.orderItems.map((item) => {
											const product = item.productId || {}
											return (
												<div key={product._id || item._id} className="flex items-center justify-between gap-4 border-b border-gray-100 pb-4">
													<div>
														<h3 className="font-semibold text-gray-800">{product.productName || "Product"}</h3>
														<p className="mt-1 text-sm text-gray-500">Quantity: {item.quantity}</p>
													</div>
													<p className="font-semibold text-gray-800">Rs. {(product.productPrice || 0) * item.quantity}</p>
												</div>
											)
										})}
									</div>

									<div className="space-y-3 text-sm text-gray-600">
										{editingOrderId === order._id ? (
											<div>
												<label className="font-semibold text-gray-800" htmlFor={`shipping-${order._id}`}>Delivery address</label>
												<textarea id={`shipping-${order._id}`} rows={4} value={shippingAddress} onChange={(event) => setShippingAddress(event.target.value)} className="mt-2 w-full rounded-xl border border-yellow-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500" />
												<div className="mt-3 flex gap-2">
													<button type="button" onClick={() => handleUpdate(order)} disabled={isLoading} className="rounded-xl bg-yellow-600 px-4 py-2 font-semibold text-white hover:bg-yellow-500 disabled:opacity-60">{isLoading ? "Saving..." : "Save"}</button>
													<button type="button" onClick={() => setEditingOrderId("")} className="rounded-xl border border-gray-200 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
												</div>
											</div>
										) : (
											<>
												<p><span className="font-semibold text-gray-800">Total:</span> Rs. {order.totalAmount}</p>
												<p><span className="font-semibold text-gray-800">Payment:</span> {order.paymentDetails?.method || "Not specified"}</p>
												<p><span className="font-semibold text-gray-800">Delivery:</span> {order.shippingAddress}</p>
											</>
										)}
									</div>
								</div>

								{order.orderStatus === "Pending" && editingOrderId !== order._id && (
									<div className="mt-6 flex flex-wrap gap-3 border-t border-yellow-100 pt-5">
										<button type="button" onClick={() => startEditing(order)} className="rounded-xl border border-yellow-300 px-4 py-2 font-semibold text-yellow-800 hover:bg-yellow-50">Update delivery address</button>
										<button type="button" onClick={() => handleDelete(order._id)} disabled={isLoading} className="rounded-xl border border-red-200 px-4 py-2 font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60">Delete order</button>
									</div>
								)}
							</article>
						))}
					</div>
				)}
			</div>
		</main>
	)
}

export default MyOrder
