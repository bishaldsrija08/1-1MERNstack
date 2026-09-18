const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com/digitalmomo",
    path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/digitalmomo",
    path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/digitalmomo",
    path: "M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.5-3a1 1 0 100 2 1 1 0 000-2z",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/digitalmomo",
    path: "M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65V23h-4V8z",
  },
]

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Cart", href: "/cart" },
  { label: "My orders", href: "/orders" },
  { label: "My reviews", href: "/reviews" },
]

const supportLinks = [
  { label: "Help center", href: "#" },
  { label: "Contact us", href: "#" },
  { label: "FAQs", href: "#" },
  { label: "Terms & privacy", href: "#" },
]

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-yellow-100 bg-yellow-50 font-sans dark:border-gray-800 dark:bg-gray-900">
      <div className="container px-6 py-14 mx-auto">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <a href="/" className="flex items-center gap-2">
              <span className="text-2xl">🍢</span>
              <span className="text-2xl font-bold text-yellow-900 dark:text-white">Digital<span className="text-yellow-700"> Momo</span></span>
            </a>
            <p className="mt-4 max-w-sm text-gray-600 dark:text-gray-300">
              Bringing your favorite dishes from local restaurants straight to your door, fresh and fast.
            </p>

            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-800 dark:text-white">Follow us <span className="font-normal text-yellow-700">@digitalmomo</span></p>
              <div className="flex gap-3 mt-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    title={`@digitalmomo on ${social.name}`}
                    aria-label={`Digital Momo on ${social.name}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-yellow-800 shadow-sm ring-1 ring-yellow-200 transition hover:bg-yellow-600 hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-800 dark:text-white">Quick links</p>
            <div className="flex flex-col items-start gap-2 mt-5">
              {quickLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-gray-600 transition-colors duration-300 hover:text-yellow-700 hover:underline dark:text-gray-300 dark:hover:text-yellow-400">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-800 dark:text-white">Support</p>
            <div className="flex flex-col items-start gap-2 mt-5">
              {supportLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-gray-600 transition-colors duration-300 hover:text-yellow-700 hover:underline dark:text-gray-300 dark:hover:text-yellow-400">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="my-8 border-yellow-200 dark:border-gray-700" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-600 dark:text-gray-300">© {new Date().getFullYear()} Digital Momo. All rights reserved.</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Made with 🧡 by <span className="font-semibold text-yellow-800 dark:text-yellow-400">@digitalmomo</span></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer