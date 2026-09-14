import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Footer from "./globals/components/footer/Footer"
import Navbar from "./globals/components/navbar/Navbar"
import Login from "./pages/auth/login/Login"
import ForgotPassword from "./pages/auth/forgotpassword/ForgotPassword"
import Register from "./pages/auth/register/Register"
import ResetPassword from "./pages/auth/resetPassword/ResetPassword"
import VerifyOtp from "./pages/auth/verifyOtp/VerifyOtp"
import Cart from "./pages/cart/Cart"
import CheckOut from "./pages/checkout/CheckOut"
import Home from "./pages/home/Home"
import ProductDetails from "./pages/productDetails/ProductDetails"
import MyProfile from "./pages/profile/MyProfile"
import MyOrder from "./pages/order/MyOrder"
import MyReviews from "./pages/reviews/MyReviews"
import {Provider} from "react-redux"
import { useSelector } from "react-redux"
import store from "./store/store"

function PublicOnly({ children }) {
  const token = useSelector((state) => state.auth.token) || localStorage.getItem("token")

  return token ? <Navigate to="/" replace /> : children
}

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/login" element={<PublicOnly><Login /></PublicOnly>} />
            <Route path="/forgot-password" element={<PublicOnly><ForgotPassword /></PublicOnly>} />
            <Route path="/verify-otp" element={<PublicOnly><VerifyOtp /></PublicOnly>} />
            <Route path="/reset-password" element={<PublicOnly><ResetPassword /></PublicOnly>} />
            <Route path="/register" element={<PublicOnly><Register /></PublicOnly>} />
            <Route path="/productdetails/:id" element={<ProductDetails />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/orders" element={<MyOrder />} />
            <Route path="/reviews" element={<MyReviews />} />
          </Routes>
        <Footer />
    </BrowserRouter>
    </Provider>
  )
}

export default App