import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { fetchCartItems } from "../../store/cartSlice"
import { placeOrder } from "../../store/checkOutSlice"
import { STATUSES } from "../../globals/mis/statuses"

const CheckOut = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items: products } = useSelector((state) => state.cart)
  const { status } = useSelector((state) => state.checkOut)

  const [shippingAddress, setShippingAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery")
  const [error, setError] = useState("")

  useEffect(() => {
    dispatch(fetchCartItems())
  }, [dispatch])

  const validProducts = products?.filter((item) => {
    const product = item?.product || item
    return product && product.productName
  }) || []

  const totalAmount = validProducts.reduce((total, item) => {
    const price = item.product?.productPrice ?? item.productPrice ?? 0
    const qty = item.quantity || 1
    return total + price * qty
  }, 0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!shippingAddress.trim()) {
      setError("Please enter a shipping address.")
      return
    }

    if (!validProducts.length) {
      setError("Your cart is empty.")
      return
    }

    const orderItems = validProducts.map((item) => {
      const product = item.product || item
      return {
        productId: product._id || item._id,
        quantity: item.quantity || 1
      }
    })

    try {
      await dispatch(placeOrder({
        orderItems,
        totalAmount,
        shippingAddress,
        paymentDetails: { method: paymentMethod }
      }))
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order. Please try again.")
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 border-b border-slate-200 pb-6">
          <p className="text-sm font-semibold tracking-wide text-emerald-700">FINAL STEP</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">Checkout</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Shipping address</h2>
              <div className="mt-4">
                <label htmlFor="shippingAddress" className="block text-sm font-medium text-slate-700">
                  Full address
                </label>
                <textarea
                  id="shippingAddress"
                  rows={4}
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Street, city, state, postal code"
                  className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h2 className="text-xl font-bold text-slate-900">Payment method</h2>
              <div className="mt-4 space-y-3">
                {["Cash on Delivery", "Khalti"].map((method) => (
                  <label
                    key={method}
                    className={`flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 text-sm font-medium ${
                      paymentMethod === method
                        ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                        : "border-slate-200 text-slate-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 accent-emerald-700"
                    />
                    {method}
                  </label>
                ))}
              </div>
            </div>

            {error && <p className="text-sm font-medium text-rose-600">{error}</p>}

            <button
              type="submit"
              disabled={status === STATUSES.LOADING || !validProducts.length}
              className="w-full rounded-md bg-emerald-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === STATUSES.LOADING ? "Placing order..." : "Place order"}
            </button>
          </form>

          <aside className="h-fit rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Order summary</h2>
            <div className="mt-6 space-y-3 text-sm">
              {validProducts.map((item) => {
                const product = item.product || item
                const productId = product._id || item._id
                const qty = item.quantity || 1
                return (
                  <div key={productId} className="flex justify-between text-slate-600">
                    <span className="pr-2">{product.productName} x{qty}</span>
                    <span className="font-medium text-slate-900 whitespace-nowrap">
                      NPR {((product.productPrice || 0) * qty).toLocaleString()}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 text-lg font-bold text-slate-900">
              <span>Total</span>
              <span>NPR {totalAmount.toLocaleString()}</span>
            </div>
            <Link to="/cart" className="mt-4 inline-block text-sm font-semibold text-emerald-700 hover:text-emerald-800">
              &larr; Back to cart
            </Link>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default CheckOut
