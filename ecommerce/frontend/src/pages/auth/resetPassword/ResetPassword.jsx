import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { resetPassword } from "../../../store/authSlice"
import { STATUSES } from "../../../globals/mis/statuses"

const getErrorMessage = (error) => (
	error.response?.data?.message || "Something went wrong. Please try again."
)

const ResetPassword = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const location = useLocation()
	const status = useSelector((state) => state.auth.forgotPasswordData.status)
	const userEmail = location.state?.userEmail || ""
	const [newPassword, setNewPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [error, setError] = useState("")

	const handleSubmit = async (event) => {
		event.preventDefault()
		setError("")

		if (newPassword.length < 6) {
			setError("Your new password must be at least six characters.")
			return
		}

		if (newPassword !== confirmPassword) {
			setError("The passwords do not match.")
			return
		}

		try {
			await dispatch(resetPassword({ userEmail, newPassword, confirmPassword }))
			navigate("/login", { state: { message: "Password reset successfully. Please log in." } })
		} catch (resetError) {
			setError(getErrorMessage(resetError))
		}
	}

	if (!userEmail) {
		return (
			<main className="flex min-h-screen items-center justify-center bg-yellow-50 px-6 py-16">
				<section className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-xl md:p-12">
					<h1 className="text-3xl font-bold text-yellow-900">Recovery session not found</h1>
					<p className="mt-3 text-gray-600">Verify your OTP before choosing a new password.</p>
					<Link to="/forgot-password" className="mt-8 block rounded-xl bg-yellow-600 px-6 py-3 font-semibold text-white hover:bg-yellow-500">Start again</Link>
				</section>
			</main>
		)
	}

	const isLoading = status === STATUSES.LOADING

	return (
		<main className="flex min-h-screen items-center justify-center bg-yellow-50 px-6 py-16">
			<section className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-xl md:p-12">
				<p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-700">Account recovery</p>
				<h1 className="mt-4 text-3xl font-bold text-yellow-900">Choose a new password</h1>
				<p className="mt-3 text-gray-600">Create a new password for {userEmail}.</p>

				<form onSubmit={handleSubmit} className="mt-8 space-y-5">
					<div>
						<label className="block text-sm font-medium text-gray-700" htmlFor="newPassword">New password</label>
						<input id="newPassword" type="password" minLength={6} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} required className="mt-2 w-full rounded-xl border border-yellow-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700" htmlFor="confirmPassword">Confirm password</label>
						<input id="confirmPassword" type="password" minLength={6} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required className="mt-2 w-full rounded-xl border border-yellow-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
					</div>
					<button type="submit" disabled={isLoading} className="w-full rounded-xl bg-yellow-600 px-6 py-3 font-semibold text-white hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-60">
						{isLoading ? "Resetting..." : "Reset password"}
					</button>
				</form>

				{error && <p className="mt-5 text-sm font-medium text-red-600">{error}</p>}
				<Link to="/login" className="mt-6 block text-center text-sm text-yellow-700 hover:underline">Back to login</Link>
			</section>
		</main>
	)
}

export default ResetPassword
