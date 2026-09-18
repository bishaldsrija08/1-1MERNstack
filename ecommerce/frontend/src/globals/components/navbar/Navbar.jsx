import { Link, NavLink, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchMyProfile, logOut } from "../../../store/authSlice"

const navLinkClass = ({ isActive }) =>
  `transition hover:text-yellow-700 ${isActive ? "text-yellow-800 font-semibold" : ""}`

export default function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token) || localStorage.getItem("token")
  const user = useSelector((state) => state.auth.data)
  const isSeller = user && user.userRole === "seller"
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (token && (!user || !user.userRole)) {
      dispatch(fetchMyProfile()).catch(() => {})
    }
  }, [dispatch, token, user])

  const handleLogout = () => {
    localStorage.removeItem("token")
    dispatch(logOut())
    setIsMenuOpen(false)
    navigate("/")
  }

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className="fixed z-20 w-full border-b border-yellow-100 bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="container px-4 mx-auto md:px-8 lg:px-10">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-10">
            <Link to="/" aria-label="Digital Momo home" className="flex items-center gap-2 shrink-0" onClick={closeMenu}>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-xl">🍢</span>
              <span className="text-2xl font-bold text-yellow-900">Digital<span className="text-yellow-700"> Momo</span></span>
            </Link>

            <ul className="hidden items-center gap-8 text-base font-medium text-slate-700 lg:flex">
              <li>
                <NavLink to="/" className={navLinkClass}>
                  Home
                </NavLink>
              </li>
              {!isSeller && (
                <li>
                  <NavLink to="/cart" className={navLinkClass}>
                    Cart
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          <div className="hidden items-center gap-6 lg:flex">
            <div className="h-8 w-px bg-yellow-200" />
            {/* If login show logout button else show login and signup buttons */}
            {token ? (
              <div className="flex items-center gap-5">
                <NavLink to="/profile" className={({ isActive }) => `text-base font-semibold text-yellow-800 transition hover:text-yellow-600 ${isActive ? "underline underline-offset-4" : ""}`}>
                  My profile
                </NavLink>
                {!isSeller && (
                  <>
                    <NavLink to="/orders" className={({ isActive }) => `text-base font-semibold text-yellow-800 transition hover:text-yellow-600 ${isActive ? "underline underline-offset-4" : ""}`}>
                      My orders
                    </NavLink>
                    <NavLink to="/reviews" className={({ isActive }) => `text-base font-semibold text-yellow-800 transition hover:text-yellow-600 ${isActive ? "underline underline-offset-4" : ""}`}>
                      My reviews
                    </NavLink>
                  </>
                )}
                {isSeller && (
                  <NavLink to="/admin/dashboard" className={({ isActive }) => `text-base font-semibold text-yellow-800 transition hover:text-yellow-600 ${isActive ? "underline underline-offset-4" : ""}`}>
                    Admin dashboard
                  </NavLink>
                )}
                <button onClick={handleLogout} className="rounded-full bg-yellow-50 px-5 py-2 text-base font-semibold text-yellow-800 transition hover:bg-yellow-100">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/register" title="Create account" className="text-base font-semibold text-yellow-800 transition hover:text-yellow-600">
                  Sign up
                </Link>
                <Link to="/login" title="Open login" className="rounded-full bg-yellow-300 px-8 py-2.5 text-base font-semibold text-yellow-900 shadow-sm transition hover:bg-yellow-400">
                  Login
                </Link>
              </>
            )}
          </div>

          <button
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span className={`h-0.5 w-6 rounded bg-yellow-900 transition duration-300 ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 rounded bg-yellow-900 transition duration-300 ${isMenuOpen ? "-rotate-45" : ""}`} />
          </button>
        </div>

        {isMenuOpen && (
          <div className="flex flex-col gap-1 pb-6 text-base font-medium text-slate-700 lg:hidden">
            <Link to="/" onClick={closeMenu} className="rounded-lg px-3 py-2 transition hover:bg-yellow-50">Home</Link>
            {!isSeller && <Link to="/cart" onClick={closeMenu} className="rounded-lg px-3 py-2 transition hover:bg-yellow-50">Cart</Link>}
            {token ? (
              <>
                <Link to="/profile" onClick={closeMenu} className="rounded-lg px-3 py-2 font-semibold text-yellow-800 transition hover:bg-yellow-50">My profile</Link>
                {!isSeller && (
                  <>
                    <Link to="/orders" onClick={closeMenu} className="rounded-lg px-3 py-2 font-semibold text-yellow-800 transition hover:bg-yellow-50">My orders</Link>
                    <Link to="/reviews" onClick={closeMenu} className="rounded-lg px-3 py-2 font-semibold text-yellow-800 transition hover:bg-yellow-50">My reviews</Link>
                  </>
                )}
                {isSeller && <Link to="/admin/dashboard" onClick={closeMenu} className="rounded-lg px-3 py-2 font-semibold text-yellow-800 transition hover:bg-yellow-50">Admin dashboard</Link>}
                <button onClick={handleLogout} className="mt-2 rounded-lg bg-yellow-100 px-3 py-2 text-left font-semibold text-yellow-800 transition hover:bg-yellow-200">Logout</button>
              </>
            ) : (
              <>
                <Link to="/register" onClick={closeMenu} className="rounded-lg px-3 py-2 font-semibold text-yellow-800 transition hover:bg-yellow-50">Sign up</Link>
                <Link to="/login" onClick={closeMenu} className="mt-2 rounded-lg bg-yellow-300 px-3 py-2 text-center font-semibold text-yellow-900 transition hover:bg-yellow-400">Login</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}