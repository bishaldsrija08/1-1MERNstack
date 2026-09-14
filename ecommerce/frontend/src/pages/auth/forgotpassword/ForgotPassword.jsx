import { useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { forgotPassword } from "../../../store/authSlice"
import { STATUSES } from "../../../globals/mis/statuses"

const getErrorMessage = (error) => (
	error.response?.data?.message || "Something went wrong. Please try again."
)

const ForgotPassword = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const status = useSelector((state) => state.auth.forgotPasswordData.status)
	const [userEmail, setUserEmail] = useState("")
	const [error, setError] = useState("")

	const isLoading = status === STATUSES.LOADING

	const handleRequestOtp = async (event) => {
		event.preventDefault()
		setError("")

		try {
			await dispatch(forgotPassword({ userEmail }))
			navigate("/verify-otp", { state: { userEmail } })
		} catch (requestError) {
			setError(getErrorMessage(requestError))
		}
	}

	return (
		<main className="flex min-h-screen items-center justify-center bg-yellow-50 px-6 py-16">
			<section className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-xl md:p-12">
				<p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-700">Account recovery</p>
				<h1 className="mt-4 text-3xl font-bold text-yellow-900">Reset your password</h1>
				<p className="mt-3 text-gray-600">Enter your email and we will send you a six-digit OTP.</p>

				<form onSubmit={handleRequestOtp} className="mt-8 space-y-5">
					<label className="block text-sm font-medium text-gray-700" htmlFor="userEmail">Email address</label>
					<input id="userEmail" type="email" value={userEmail} onChange={(event) => setUserEmail(event.target.value)} required className="w-full rounded-xl border border-yellow-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="you@example.com" />
					<button disabled={isLoading} className="w-full rounded-xl bg-yellow-600 px-6 py-3 font-semibold text-white hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-60">
						{isLoading ? "Sending..." : "Send OTP"}
					</button>
				</form>
				{error && <p className="mt-5 text-sm font-medium text-red-600">{error}</p>}
				<Link to="/login" className="mt-6 block text-center text-sm text-yellow-700 hover:underline">Back to login</Link>
			</section>
		</main>
	)
}

export default ForgotPassword
