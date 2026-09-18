import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchMyProfile } from "../../../store/authSlice"
import { createAdminProduct } from "../../../store/adminSlice"
import { STATUSES } from "../../../globals/mis/statuses"

const getErrorMessage = (error) => (
	error.response?.data?.message || "Something went wrong. Please try again."
)

const initialForm = {
	productName: "",
	productDescription: "",
	productStockQty: "",
	productStatus: "in-stock",
	productPrice: "",
}

const AddProduct = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const token = useSelector((state) => state.auth.token) || localStorage.getItem("token")
	const { data: user, status: authStatus } = useSelector((state) => state.auth)

	const [form, setForm] = useState(initialForm)
	const [productImage, setProductImage] = useState(null)
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		if (!token) return
		if (!user || !user.userRole) {
			dispatch(fetchMyProfile()).catch((profileError) => setError(getErrorMessage(profileError)))
		}
	}, [dispatch, token, user])

	if (!token) {
		return (
			<main className="flex min-h-screen items-center justify-center bg-yellow-50 px-6 py-16">
				<section className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-xl md:p-12">
					<h1 className="text-3xl font-bold text-yellow-900">Log in to continue</h1>
					<p className="mt-3 text-gray-600">Only sellers can add products.</p>
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

	const handleChange = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value })
	}

	const handleImageChange = (event) => {
		setProductImage(event.target.files?.[0] || null)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		setError("")
		setSuccess("")

		if (!form.productName || !form.productDescription || !form.productStockQty || !form.productStatus || !form.productPrice) {
			setError("All fields are required.")
			return
		}

		if (!productImage) {
			setError("Product image is required.")
			return
		}

		const formData = new FormData()
		formData.append("productName", form.productName)
		formData.append("productDescription", form.productDescription)
		formData.append("productStockQty", form.productStockQty)
		formData.append("productStatus", form.productStatus)
		formData.append("productPrice", form.productPrice)
		formData.append("productImage", productImage)

		setIsSubmitting(true)
		try {
			await dispatch(createAdminProduct(formData))
			setSuccess("Product added successfully.")
			setForm(initialForm)
			setProductImage(null)
			event.target.reset()
			setTimeout(() => navigate("/admin/dashboard"), 1200)
		} catch (submitError) {
			setError(getErrorMessage(submitError))
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<main className="min-h-screen bg-yellow-50 px-6 pb-16 pt-32">
			<div className="mx-auto max-w-2xl">
				<div className="mb-8">
					<p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-700">Admin</p>
					<h1 className="mt-3 text-4xl font-bold text-yellow-900">Add product</h1>
					<p className="mt-3 text-gray-600">Add a new product to the store catalog.</p>
				</div>

				{error && <p className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p>}
				{success && <p className="mb-6 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">{success}</p>}

				<form onSubmit={handleSubmit} className="space-y-5 rounded-3xl bg-white p-6 shadow-xl md:p-8">
					<div>
						<label htmlFor="productName" className="mb-1 block text-sm font-semibold text-yellow-900">Product name</label>
						<input
							id="productName"
							name="productName"
							value={form.productName}
							onChange={handleChange}
							className="w-full rounded-xl border border-yellow-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
						/>
					</div>

					<div>
						<label htmlFor="productDescription" className="mb-1 block text-sm font-semibold text-yellow-900">Description</label>
						<textarea
							id="productDescription"
							name="productDescription"
							value={form.productDescription}
							onChange={handleChange}
							rows={4}
							className="w-full rounded-xl border border-yellow-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
						/>
					</div>

					<div className="grid gap-5 sm:grid-cols-2">
						<div>
							<label htmlFor="productPrice" className="mb-1 block text-sm font-semibold text-yellow-900">Price</label>
							<input
								id="productPrice"
								name="productPrice"
								type="number"
								min="0"
								step="0.01"
								value={form.productPrice}
								onChange={handleChange}
								className="w-full rounded-xl border border-yellow-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
							/>
						</div>

						<div>
							<label htmlFor="productStockQty" className="mb-1 block text-sm font-semibold text-yellow-900">Stock quantity</label>
							<input
								id="productStockQty"
								name="productStockQty"
								type="number"
								min="0"
								value={form.productStockQty}
								onChange={handleChange}
								className="w-full rounded-xl border border-yellow-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
							/>
						</div>
					</div>

					<div>
						<label htmlFor="productStatus" className="mb-1 block text-sm font-semibold text-yellow-900">Status</label>
						<select
							id="productStatus"
							name="productStatus"
							value={form.productStatus}
							onChange={handleChange}
							className="w-full rounded-xl border border-yellow-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
						>
							<option value="in-stock">In stock</option>
							<option value="out-of-stock">Out of stock</option>
						</select>
					</div>

					<div>
						<label htmlFor="productImage" className="mb-1 block text-sm font-semibold text-yellow-900">Product image</label>
						<input
							id="productImage"
							name="productImage"
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="w-full rounded-xl border border-yellow-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
						/>
					</div>

					<div className="flex items-center gap-4 pt-2">
						<button
							type="submit"
							disabled={isSubmitting}
							className="rounded-xl bg-yellow-600 px-6 py-3 font-semibold text-white transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-60"
						>
							{isSubmitting ? "Adding product..." : "Add product"}
						</button>
						<Link to="/admin/dashboard" className="font-semibold text-yellow-800 hover:text-yellow-700">Back to dashboard</Link>
					</div>
				</form>
			</div>
		</main>
	)
}

export default AddProduct
