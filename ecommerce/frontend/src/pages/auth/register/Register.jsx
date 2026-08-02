const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-6 py-16 bg-white">
      <div className="w-full max-w-xl p-8 bg-yellow-50 rounded-3xl shadow-xl md:p-12">
        <p className="text-sm font-semibold tracking-[0.3em] text-yellow-700 uppercase">Create Account</p>
        <h2 className="mt-4 text-3xl font-bold text-yellow-900 md:text-4xl">Join Digital Momo today</h2>
        <p className="mt-4 text-gray-600">A clean sign-up UI for your food delivery frontend.</p>

        <div className="grid gap-4 mt-10 md:grid-cols-2">
          <input type="text" placeholder="First name" className="w-full px-4 py-3 bg-white border border-yellow-200 rounded-xl focus:outline-none" />
          <input type="text" placeholder="Last name" className="w-full px-4 py-3 bg-white border border-yellow-200 rounded-xl focus:outline-none" />
          <input type="email" placeholder="Email address" className="w-full px-4 py-3 bg-white border border-yellow-200 rounded-xl focus:outline-none md:col-span-2" />
          <input type="password" placeholder="Password" className="w-full px-4 py-3 bg-white border border-yellow-200 rounded-xl focus:outline-none" />
          <input type="password" placeholder="Confirm password" className="w-full px-4 py-3 bg-white border border-yellow-200 rounded-xl focus:outline-none" />
        </div>

        <button className="w-full px-6 py-3 mt-8 font-semibold text-white bg-yellow-600 rounded-xl hover:bg-yellow-500">
          Create account
        </button>
      </div>
    </div>
  )
}

export default Register