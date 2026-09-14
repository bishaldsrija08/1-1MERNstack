import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { verifyOtp } from "../../../store/authSlice"
import { STATUSES } from "../../../globals/mis/statuses"

const getErrorMessage = (error) => (
	error.response?.data?.message || "Something went wrong. Please try again."
)

const VerifyOtp = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const location = useLocation()
	const status = useSelector((state) => state.auth.forgotPasswordData.status)
	const userEmail = location.state?.userEmail || ""
	const [otp, setOtp] = useState("")
	const [message, setMessage] = useState("")
	const [error, setError] = useState("")

	const isLoading = status === STATUSES.LOADING

	const handleVerifyOtp = async (event) => {
		event.preventDefault()
		setError("")
		setMessage("")

		if (!/^\d{6}$/.test(otp)) {
			setError("Enter the six-digit OTP from your email.")
			return
		}

		try {
			await dispatch(verifyOtp({ userEmail, otp }))
			navigate("/reset-password", { state: { userEmail } })
		} catch (verifyError) {
			setError(getErrorMessage(verifyError))
		}
	}

	if (!userEmail) {
		return (
			<main className="flex min-h-screen items-center justify-center bg-yellow-50 px-6 py-16">
				<section className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-xl md:p-12">
					<h1 className="text-3xl font-bold text-yellow-900">Recovery session not found</h1>
					<p className="mt-3 text-gray-600">Start again by requesting a new OTP.</p>
					<Link to="/forgot-password" className="mt-8 block rounded-xl bg-yellow-600 px-6 py-3 font-semibold text-white hover:bg-yellow-500">Request OTP</Link>
				</section>
			</main>
		)
	}

	return (
		<main className="flex min-h-screen items-center justify-center bg-yellow-50 px-6 py-16">
			<section className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-xl md:p-12">
				<p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-700">Account recovery</p>
				<h1 className="mt-4 text-3xl font-bold text-yellow-900">Verify your OTP</h1>
				<p className="mt-3 text-gray-600">Enter the code sent to {userEmail}.</p>

				<form onSubmit={handleVerifyOtp} className="mt-8 space-y-5">
					<label className="block text-sm font-medium text-gray-700" htmlFor="otp">Six-digit OTP</label>
					<input id="otp" type="text" inputMode="numeric" maxLength={6} value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))} required className="w-full rounded-xl border border-yellow-200 bg-white px-4 py-3 tracking-[0.4em] focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="000000" />
					<button disabled={isLoading} className="w-full rounded-xl bg-yellow-600 px-6 py-3 font-semibold text-white hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-60">
						{isLoading ? "Verifying..." : "Verify OTP"}
					</button>
				</form>

				{message && <p className="mt-5 text-sm font-medium text-green-700">{message}</p>}
				{error && <p className="mt-5 text-sm font-medium text-red-600">{error}</p>}
				<Link to="/login" className="mt-6 block text-center text-sm text-yellow-700 hover:underline">Back to login</Link>
			</section>
		</main>
	)
}

export default VerifyOtp
