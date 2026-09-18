import heroImage from "../../../assets/hero.png"

const categories = ["Pizza", "Burgers", "Sushi", "Desserts", "Drinks"]

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden bg-yellow-50">
      {/* decorative background blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-yellow-200/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-40 h-80 w-80 rounded-full bg-red-100/60 blur-3xl" />

      <div className="container relative m-auto px-6 pt-32 md:px-12 lg:pt-[4.8rem] lg:px-7">
        <div className="flex flex-wrap items-center px-2 md:px-0">
          <div className="relative lg:w-6/12 lg:py-24 xl:py-32">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-yellow-800 shadow-sm ring-1 ring-yellow-200">
              🔥 Trusted by 10,000+ hungry foodies
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-yellow-900 md:text-5xl lg:w-11/12">
              Your favorite dishes,
              <span className="block bg-linear-to-r from-yellow-600 to-red-500 bg-clip-text text-transparent">right at your door</span>
            </h1>

            <p className="mt-5 max-w-md text-lg text-gray-600">
              Order from your favorite local restaurants and get it delivered fresh and fast, whenever cravings strike.
            </p>

            <form action="" className="mt-10 w-full max-w-lg">
              <div className="relative flex items-center rounded-full border border-yellow-200 bg-white p-1.5 shadow-lg shadow-yellow-900/5">
                <label htmlFor="domain" className="sr-only">Category</label>
                <select id="domain" name="domain" className="hidden shrink-0 rounded-full bg-transparent p-3 text-sm font-medium text-yellow-800 md:block md:p-4">
                  <option value="design">FastFood</option>
                  <option value="development">Restaurant</option>
                  <option value="marketing">Marketing</option>
                </select>
                <label htmlFor="search" className="sr-only">Search for food</label>
                <input id="search" placeholder="Your favorite food" className="w-full rounded-full p-4 text-gray-800 placeholder:text-gray-400 focus:outline-none" type="text" />
                <button type="button" title="Start buying" className="ml-auto flex items-center gap-2 rounded-full bg-linear-to-b from-yellow-400 to-red-400 px-5 py-3 text-center font-semibold text-white shadow-md transition hover:from-yellow-500 hover:to-red-500 active:scale-95 md:px-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                  <span className="hidden md:block">Search</span>
                </button>
              </div>
            </form>

            <div className="mt-5 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className="rounded-full border border-yellow-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-yellow-800 transition hover:border-yellow-400 hover:bg-white"
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-yellow-200/70 pt-6">
              <div>
                <p className="text-2xl font-bold text-yellow-900">4.8★</p>
                <p className="text-sm text-gray-500">Average rating</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-900">25 min</p>
                <p className="text-sm text-gray-500">Average delivery</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-900">200+</p>
                <p className="text-sm text-gray-500">Partner restaurants</p>
              </div>
            </div>
          </div>

          <div className="relative ml-auto -mb-24 lg:-mb-100 lg:w-6/12">
            <img src={heroImage} className="relative" alt="food illustration" loading="lazy" />

            <div className="absolute left-2 top-10 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl md:flex">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-lg">🚴</span>
              <div>
                <p className="text-sm font-semibold text-gray-900">Free delivery</p>
                <p className="text-xs text-gray-500">On orders above NPR 1000</p>
              </div>
            </div>

            <div className="absolute bottom-16 right-2 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl md:flex">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-lg">⭐</span>
              <div>
                <p className="text-sm font-semibold text-gray-900">4.8/5 rating</p>
                <p className="text-xs text-gray-500">From 2,000+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero