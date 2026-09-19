import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { API } from "../../../http"

export default function Product() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")

    // debounce the search input so we don't hit the API on every keystroke
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 400)
        return () => clearTimeout(timer)
    }, [searchTerm])

    useEffect(() => {
        let isCancelled = false
        const fetchProducts = async () => {
            setIsLoading(true)
            try {
                const response = await API.get("/globals/products", {
                    params: debouncedSearch ? { search: debouncedSearch } : {},
                })
                if (!isCancelled && response.status === 200) {
                    setProducts(response.data.data)
                }
            } finally {
                if (!isCancelled) setIsLoading(false)
            }
        }
        fetchProducts()
        return () => { isCancelled = true }
    }, [debouncedSearch])

    return (
        <div className="relative w-full bg-white">
            <div className="container px-6 py-20 m-auto md:px-12 lg:px-7">
                <div className="max-w-xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-700">Menu highlights</p>
                    <h1 className="mt-3 text-3xl font-bold text-yellow-900 md:text-4xl">Our Popular Foods</h1>
                    <p className="mt-3 text-gray-600">Freshly prepared favorites loved by our customers, ready to be delivered to your door.</p>
                </div>

                <div className="mt-8 max-w-md">
                    <input
                        type="search"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Search for momos, sauces, sides..."
                        aria-label="Search products"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>

                {isLoading && (
                    <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="overflow-hidden bg-white border border-gray-100 rounded-2xl shadow-sm animate-pulse">
                                <div className="w-full h-48 bg-gray-200" />
                                <div className="p-4 space-y-3">
                                    <div className="w-3/4 h-4 bg-gray-200 rounded" />
                                    <div className="w-full h-3 bg-gray-200 rounded" />
                                    <div className="w-1/2 h-4 bg-gray-200 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!isLoading && products.length === 0 && (
                    <div className="mt-10 rounded-2xl border border-dashed border-gray-200 py-16 text-center text-gray-500">
                        {debouncedSearch ? `No products found for "${debouncedSearch}".` : "No products available right now. Check back soon!"}
                    </div>
                )}

                {!isLoading && products.length > 0 && (
                    <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product) => {
                            const inStock = product.productStatus === "in-stock"
                            return (
                                <Link to={`/productdetails/${product._id}`} key={product._id} className="group">
                                    <div className="relative flex flex-col h-full overflow-hidden transition duration-300 bg-white border border-gray-100 rounded-2xl shadow-sm group-hover:-translate-y-1 group-hover:shadow-xl">
                                        <div className="relative overflow-hidden">
                                            <img className="object-cover w-full h-48 transition duration-300 group-hover:scale-105" src={product.productImageUrl} alt={product.productName} />
                                            <span className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                                {inStock ? "In stock" : "Out of stock"}
                                            </span>
                                        </div>
                                        <div className="flex flex-col flex-1 p-4">
                                            <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">{product.productName}</h2>
                                            <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.productDescription}</p>
                                            <div className="flex items-center justify-between gap-3 pt-4 mt-auto border-t border-gray-100">
                                                <p className="text-lg font-bold text-yellow-900">NPR {Number(product.productPrice || 0).toLocaleString()}</p>
                                                <span className="text-sm font-semibold text-yellow-700 transition group-hover:translate-x-1">View details →</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}