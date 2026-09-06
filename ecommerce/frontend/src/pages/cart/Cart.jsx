import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteCartItem, updateCartItem, fetchCartItems } from "../../store/cartSlice"
import { useNavigate, Link } from "react-router-dom"

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items: products } = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(fetchCartItems())
  }, [dispatch])

  // Filter out any broken/null cart items
  const validProducts = products?.filter((item) => {
    const product = item?.product || item
    return product && product.productName
  }) || []

  const totalItemsInCart = validProducts.reduce((total, item) => (item.quantity || 1) + total, 0)
  const totalAmountOfCart = validProducts.reduce((total, item) => {
    const price = item.product?.productPrice ?? item.productPrice ?? 0
    const qty = item.quantity || 1
    return total + price * qty
  }, 0)

  const handleQuantityChange = (productId, newQuantity, stockQty) => {
    if (newQuantity < 1) return
    if (stockQty && newQuantity > stockQty) {
      alert(`Only ${stockQty} items available in stock.`)
      return
    }
    dispatch(updateCartItem(productId, newQuantity))
  }

  const handleDeleteItem = (productId) => {
    dispatch(deleteCartItem(productId))
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 border-b border-slate-200 pb-6">
          <p className="text-sm font-semibold tracking-wide text-emerald-700">YOUR BAG</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">Shopping cart</h1>
          <p className="mt-2 text-sm text-slate-500">{totalItemsInCart} {totalItemsInCart === 1 ? 'item' : 'items'} ready for checkout</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <section className="space-y-4">
            {validProducts && validProducts.length > 0 ? (
              validProducts.map((item) => {
                const product = item.product || item
                const quantity = item.quantity || 1
                const productId = product._id || item._id

                return (
                  <article key={productId} className="grid gap-5 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[140px_1fr] sm:p-5">
                    <img
                      src={product.productImageUrl || "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=480&q=80"}
                      alt={product.productName || "Product image"}
                      className="h-44 w-full rounded-md object-cover sm:h-36"
                    />
                    <div className="flex min-w-0 flex-col justify-between gap-5">
                      <div className="flex justify-between gap-4">
                        <div>
                          <h2 className="mt-1 text-lg font-bold text-slate-900">{product.productName}</h2>
                          <p className="mt-1 text-sm text-slate-500 line-clamp-2">{product.productDescription}</p>
                        </div>
                        <p className="whitespace-nowrap text-lg font-bold text-slate-900">NPR {product.productPrice?.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                        <div className="inline-flex items-center rounded-md border border-slate-200">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => handleQuantityChange(productId, quantity - 1, product.productStockQty)}
                            className="h-9 w-9 text-lg text-slate-500 hover:bg-slate-50"
                          >
                            -
                          </button>
                          <span className="grid h-9 w-9 place-items-center border-x border-slate-200 text-sm font-semibold text-slate-900">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => handleQuantityChange(productId, quantity + 1, product.productStockQty)}
                            className="h-9 w-9 text-lg text-slate-500 hover:bg-slate-50"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteItem(productId)}
                          className="text-sm font-semibold text-rose-600 hover:text-rose-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                )
              })
            ) : (
              <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
                <p className="text-slate-600 font-medium">Your cart is currently empty.</p>
                <Link to="/" className="mt-4 inline-block text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                  Continue shopping &rarr;
                </Link>
              </div>
            )}

            {validProducts && validProducts.length > 0 && (
              <Link to="/" className="inline-block pt-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                Continue shopping
              </Link>
            )}
          </section>

          <aside className="h-fit rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Order summary</h2>
            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900">NPR {totalAmountOfCart.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="font-medium text-emerald-700">Free</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-4 text-lg font-bold text-slate-900">
                <span>Total</span>
                <span>NPR {totalAmountOfCart.toLocaleString()}</span>
              </div>
            </div>
            <button
              type="button"
              disabled={!validProducts || validProducts.length === 0}
              onClick={() => navigate("/checkout")}
              className="mt-6 w-full rounded-md bg-emerald-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Proceed to checkout
            </button>
            <p className="mt-4 text-center text-xs text-slate-500">Taxes calculated at checkout.</p>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default Cart