import { BrowserRouter, Route, Routes } from "react-router-dom"
import Footer from "./globals/components/footer/Footer"
import Navbar from "./globals/components/navbar/Navbar"
import Login from "./pages/auth/login/Login"
import Register from "./pages/auth/register/Register"
import Cart from "./pages/cart/Cart"
import Home from "./pages/home/Home"
import ProductDetails from "./pages/productDetails/ProductDetails"
import {Provider} from "react-redux"
import store from "./store/store"

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/productdetails/:id" element={<ProductDetails />} />
          </Routes>
        <Footer />
    </BrowserRouter>
    </Provider>
  )
}

export default App