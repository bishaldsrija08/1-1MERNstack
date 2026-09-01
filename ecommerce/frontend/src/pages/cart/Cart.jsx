import { useDispatch } from "react-redux"
import { deleteCartItem, updateCartItem } from "../../store/cartSlice"
import { useNavigate } from "react-router-dom"

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 border-b border-slate-200 pb-6">
          <p className="text-sm font-semibold tracking-wide text-emerald-700">YOUR BAG</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">Shopping cart</h1>
          <p className="mt-2 text-sm text-slate-500">2 items ready for checkout</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <section className="space-y-4">
          {}
            <article className="grid gap-5 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[140px_1fr] sm:p-5">
              <img
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=480&q=80"
                alt="Linen overshirt"
                className="h-44 w-full rounded-md object-cover sm:h-36"
              />
              <div className="flex min-w-0 flex-col justify-between gap-5">
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Apparel</p>
                    <h2 className="mt-1 text-lg font-bold text-slate-900">Everyday Linen Overshirt</h2>
                    <p className="mt-1 text-sm text-slate-500">Olive / Medium</p>
                  </div>
                  <p className="whitespace-nowrap text-lg font-bold text-slate-900">$74.00</p>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="inline-flex items-center rounded-md border border-slate-200">
                    <button type="button" aria-label="Decrease quantity" className="h-9 w-9 text-lg text-slate-500 hover:bg-slate-50">-</button>
                    <span className="grid h-9 w-9 place-items-center border-x border-slate-200 text-sm font-semibold text-slate-900">1</span>
                    <button type="button" aria-label="Increase quantity" className="h-9 w-9 text-lg text-slate-500 hover:bg-slate-50">+</button>
                  </div>
                  <button type="button" className="text-sm font-semibold text-rose-600 hover:text-rose-700">Remove</button>
                </div>
              </div>
            </article>

            <a href="/" className="inline-block pt-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800">Continue shopping</a>
          </section>

          <aside className="h-fit rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Order summary</h2>
            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between text-slate-600"><span>Subtotal</span><span className="font-medium text-slate-900">$203.00</span></div>
              <div className="flex justify-between text-slate-600"><span>Shipping</span><span className="font-medium text-emerald-700">Free</span></div>
              <div className="flex justify-between border-t border-slate-200 pt-4 text-lg font-bold text-slate-900"><span>Total</span><span>$203.00</span></div>
            </div>
            <button type="button" className="mt-6 w-full rounded-md bg-emerald-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-800">Proceed to checkout</button>
            <p className="mt-4 text-center text-xs text-slate-500">Taxes calculated at checkout.</p>
          </aside>
        </div>
      </div>
    </main>
  )
}
export default Cart