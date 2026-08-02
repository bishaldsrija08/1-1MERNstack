import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="fixed z-10 w-full bg-white/95 backdrop-blur-sm">
      <div className="container px-4 mx-auto md:px-8 lg:px-10">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-10">
            <Link to="/" aria-label="logo" className="flex items-center space-x-2 shrink-0">
                <img src="https://marketplace.canva.com/EAFaFUz4aKo/3/0/1600w/canva-yellow-abstract-cooking-fire-free-logo-tn1zF-_cG9c.jpg" className="w-12" alt="tailus logo" width="144" height="133" />
                <span className="text-2xl font-bold text-yellow-900">Digital<span className="text-yellow-700"> Momo</span></span>
            </Link>

            <ul className="hidden items-center gap-8 text-base font-medium text-slate-700 lg:flex">
              <li>
                <Link to="/" className="transition hover:text-yellow-700">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cart" className="transition hover:text-yellow-700">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden items-center gap-6 lg:flex">
            <div className="h-12 w-px bg-yellow-300" />
            <Link to="/register" title="Create account" className="text-lg font-semibold text-yellow-800 transition hover:text-yellow-700">
              Sign up
            </Link>
            <Link to="/login" title="Open login" className="rounded-full bg-yellow-300 px-8 py-3 text-lg font-semibold text-yellow-900 transition hover:bg-yellow-200">
              Login
            </Link>
          </div>

          <button aria-label="hamburger" id="hamburger" className="relative h-10 w-10 lg:hidden">
            <div aria-hidden="true" id="line" className="mx-auto h-0.5 w-6 rounded bg-yellow-900 transition duration-300"></div>
            <div aria-hidden="true" id="line2" className="mx-auto mt-2 h-0.5 w-6 rounded bg-yellow-900 transition duration-300"></div>
          </button>
        </div>
      </div>
    </nav>
  )
}