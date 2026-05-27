import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Create from "./pages/Create"
import Single from "./pages/Single"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Test from "./pages/Test"

function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/create" element={<Create/>} />
          <Route path="/single" element={<Single/>} />
          <Route path="/test" element ={<Test/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App