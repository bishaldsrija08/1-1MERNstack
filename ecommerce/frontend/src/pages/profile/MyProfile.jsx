import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
	deleteMyProfile,
	fetchMyProfile,
	updateMyPassword,
	updateMyProfile,
} from "../../store/authSlice"
import { STATUSES } from "../../globals/mis/statuses"

const getErrorMessage = (error) => (
	error.response?.data?.message || "Something went wrong. Please try again."
)

const MyProfile = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { data: user, status } = useSelector((state) => state.auth)
	const token = localStorage.getItem("token")
	const [profileForm, setProfileForm] = useState({
		userName: "",
		userEmail: "",
		userPhoneNumber: "",
	})
	const [passwordForm, setPasswordForm] = useState({
		oldPassword: "",
		newPassword: "",
	})
	const [message, setMessage] = useState("")
	const [error, setError] = useState("")

	useEffect(() => {
		if (!token) return

		dispatch(fetchMyProfile()).catch((profileError) => {
			setError(getErrorMessage(profileError))
		})
	}, [dispatch, token])

	useEffect(() => {
		if (!user || !user.userEmail) return

		setProfileForm({
			userName: user.userName || "",
			userEmail: user.userEmail || "",
			userPhoneNumber: user.userPhoneNumber || "",
		})
	}, [user])

	const handleProfileChange = (event) => {
		setProfileForm({ ...profileForm, [event.target.name]: event.target.value })
	}

	const handlePasswordChange = (event) => {
		setPasswordForm({ ...passwordForm, [event.target.name]: event.target.value })
	}

	const handleProfileSubmit = async (event) => {
		event.preventDefault()
		setMessage("")
		setError("")

		try {
			await dispatch(updateMyProfile(profileForm))
			setMessage("Profile updated successfully.")
		} catch (profileError) {
			setError(getErrorMessage(profileError))
		}
	}

	const handlePasswordSubmit = async (event) => {
		event.preventDefault()
		setMessage("")
		setError("")

		if (passwordForm.newPassword.length < 6) {
			setError("Your new password must be at least six characters.")
			return
		}

		try {
			await dispatch(updateMyPassword(passwordForm))
			setPasswordForm({ oldPassword: "", newPassword: "" })
			setMessage("Password updated successfully.")
		} catch (passwordError) {
			setError(getErrorMessage(passwordError))
		}
	}

	const handleDelete = async () => {
		if (!window.confirm("Are you sure you want to delete your account?")) return

		setMessage("")
		setError("")

		try {
			await dispatch(deleteMyProfile())
			navigate("/", { replace: true })
		} catch (deleteError) {
			setError(getErrorMessage(deleteError))
		}
	}

	if (!token) {
		return (
			<main className="flex min-h-screen items-center justify-center bg-yellow-50 px-6 py-16">
				<section className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-xl md:p-12">
					<h1 className="text-3xl font-bold text-yellow-900">Log in to view your profile</h1>
					<p className="mt-3 text-gray-600">Your profile is available after signing in.</p>
					<Link to="/login" className="mt-8 block rounded-xl bg-yellow-600 px-6 py-3 font-semibold text-white hover:bg-yellow-500">Go to login</Link>
				</section>
			</main>
		)
	}

	const isLoading = status === STATUSES.LOADING

	return (
		<main className="min-h-screen bg-yellow-50 px-6 py-16">
			<div className="mx-auto max-w-4xl">
				<div className="mb-8">
					<p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-700">Account</p>
					<h1 className="mt-3 text-4xl font-bold text-yellow-900">My profile</h1>
					<p className="mt-3 text-gray-600">Manage your personal details and account security.</p>
				</div>

				{message && <p className="mb-5 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">{message}</p>}
				{error && <p className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p>}

				<div className="grid gap-8 lg:grid-cols-2">
					<section className="rounded-3xl bg-white p-6 shadow-xl md:p-8">
						<h2 className="text-2xl font-bold text-yellow-900">Personal details</h2>
						<form onSubmit={handleProfileSubmit} className="mt-6 space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700" htmlFor="userName">Name</label>
								<input id="userName" name="userName" value={profileForm.userName} onChange={handleProfileChange} required className="mt-2 w-full rounded-xl border border-yellow-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700" htmlFor="userEmail">Email</label>
								<input id="userEmail" name="userEmail" type="email" value={profileForm.userEmail} onChange={handleProfileChange} required className="mt-2 w-full rounded-xl border border-yellow-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700" htmlFor="userPhoneNumber">Phone number</label>
								<input id="userPhoneNumber" name="userPhoneNumber" value={profileForm.userPhoneNumber} onChange={handleProfileChange} required className="mt-2 w-full rounded-xl border border-yellow-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
							</div>
							<button type="submit" disabled={isLoading} className="w-full rounded-xl bg-yellow-600 px-6 py-3 font-semibold text-white hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-60">
								{isLoading ? "Saving..." : "Save profile"}
							</button>
						</form>
					</section>

					<section className="rounded-3xl bg-white p-6 shadow-xl md:p-8">
						<h2 className="text-2xl font-bold text-yellow-900">Change password</h2>
						<form onSubmit={handlePasswordSubmit} className="mt-6 space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700" htmlFor="oldPassword">Current password</label>
								<input id="oldPassword" name="oldPassword" type="password" value={passwordForm.oldPassword} onChange={handlePasswordChange} required className="mt-2 w-full rounded-xl border border-yellow-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700" htmlFor="newPassword">New password</label>
								<input id="newPassword" name="newPassword" type="password" minLength={6} value={passwordForm.newPassword} onChange={handlePasswordChange} required className="mt-2 w-full rounded-xl border border-yellow-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
							</div>
							<button type="submit" disabled={isLoading} className="w-full rounded-xl bg-yellow-600 px-6 py-3 font-semibold text-white hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-60">
								{isLoading ? "Updating..." : "Update password"}
							</button>
						</form>

						<div className="mt-10 border-t border-yellow-100 pt-6">
							<h2 className="text-lg font-bold text-red-700">Delete account</h2>
							<p className="mt-2 text-sm text-gray-600">This permanently removes your account and cannot be undone.</p>
							<button type="button" onClick={handleDelete} disabled={isLoading} className="mt-4 rounded-xl border border-red-200 px-5 py-3 font-semibold text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60">
								Delete my account
							</button>
						</div>
					</section>
				</div>
			</div>
		</main>
	)
}

export default MyProfile
