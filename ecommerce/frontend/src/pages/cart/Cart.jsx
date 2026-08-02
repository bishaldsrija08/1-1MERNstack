import products from "../../data/products"

const cartItems = products.slice(0, 2)
const subtotal = cartItems.reduce((total, product) => total + product.productPrice, 0)
const shippingCost = 4.99
const total = subtotal + shippingCost

const Cart = () => {

  return (
    <div className="min-h-screen pt-20 bg-gray-100">
      <h1 className="mb-10 text-2xl font-bold text-center">Cart Items</h1>
      <div className="justify-center max-w-5xl px-6 mx-auto md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cartItems.map((product) => (
            <div key={product._id} className="justify-between p-6 mb-6 bg-white rounded-lg shadow-md sm:flex sm:justify-start">
              <img src={product.productImage} alt={product.productName} className="object-cover w-full rounded-lg h-36 sm:w-40" />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">{product.productName}</h2>
                  <p className="mt-1 text-sm text-gray-700">{product.productDescription}</p>
                </div>
                <div className="flex justify-between mt-4 sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center border-gray-100">
                    <span className="px-3 py-1 bg-gray-100 rounded-l">-</span>
                    <input
                      className="w-10 h-8 text-xs text-center bg-white border outline-none"
                      type="number"
                      value="1"
                      min="1"
                      readOnly
                    />
                    <span className="px-3 py-1 bg-gray-100 rounded-r">+</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm font-semibold">${product.productPrice.toFixed(2)}</p>
                    <span className="text-sm font-medium text-red-500">Remove</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-full p-6 mt-6 bg-white border rounded-lg shadow-md md:mt-0 md:w-1/3">
          <div className="flex justify-between mb-2">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">${shippingCost.toFixed(2)}</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div>
              <p className="mb-1 text-lg font-bold">${total.toFixed(2)} USD</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <button className="w-full py-1.5 mt-6 font-medium bg-blue-500 rounded-md text-blue-50 hover:bg-blue-600">
            Check out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart